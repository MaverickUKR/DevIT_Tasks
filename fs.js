const process = require("node:process");
const os = require("node:os");
const path = require("node:path");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const { error } = require("node:console");

const CURR_DIR = __dirname;
// const DATA_DIR = path.join(CURR_DIR, "..", "data"); // '../data'
const DATA_DIR = path.resolve(CURR_DIR, "data"); // '/data'
// при работе с файлами лучше испол. resolve чем join он более точный

// console.log("process", process);

// console.log("os", os.totalmem());

// console.log("__dirname", __dirname);

// console.log("process.argv", process.argv);

// console.log("process.env.PWD", process.env.PWD); // динамическая (может менятся)

console.log("DATA_DIR", DATA_DIR);

const sysInfo = JSON.stringify(process);

const sysInfoFilename = "sysinfo.json";
// const sysInfoFilename2 = "sysinfo2.json";
const sysInfoFile = path.resolve(DATA_DIR, sysInfoFilename);
// const sysInfoFile2 = path.resolve(DATA_DIR, sysInfoFilename2);

// const readableStream = fs.createReadStream(sysInfoFile);
// const writableStream = fs.createWriteStream(sysInfoFile2);

// fs.writeFileSync(sysInfoFile, sysInfo);

// fs.rmSync(sysInfoFile);

// const fileInfo = fs.statSync(sysInfoFile);

// console.log(sysInfoFile);

// readableStream.pipe(writableStream);

// // write new file
// // fs.writeFileSync(sysInfoFile, sysInfo);

//   // get info of the new file
//   const fileInfo = fs.statSync(sysInfoFile);

//   console.log(fileInfo);
// });

// const main = async () => {
//   // delete file
//   try {
//     await fsPromises.rm(sysInfoFile);
//   } catch (e) {}

//   // write new file
//   await fsPromises.writeFile(sysInfoFile, sysInfo);

//   // get info of new file
//   const fileInfo = await fsPromises.stat(sysInfoFile);

//   console.log(fileInfo);
// };

// main().catch(console.warn);

// TASK 1 - Записать содержимое переменной sysInfo с помощью Stream
// TASK 2 - Реализовать програму LS, данные выводятся в формате JSON

// TASK 1

// const writeSysInfoWithStream = () => {
//   const writable = fs.createWriteStream(sysInfoFile);
//   writable.write(sysInfo, "utf8");
//   writable.end();
// };

// writeSysInfoWithStream();

// TASK 2

// Конвертування прав доступу з числового формату у формат rwx
const convertModeToRWX = (mode) => {
  const types = ["d", "-", "l", "b", "c", "p", "s"];
  const type = types[(mode >> 12) & 15] || "-";
  const perms = ["---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"];
  return (
    type + perms[(mode >> 6) & 7] + perms[(mode >> 3) & 7] + perms[mode & 7]
  );
};

const ls = async (dir) => {
  try {
    const files = await fsPromises.readdir(dir);
    const filesInfo = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dir, file);
        const stats = await fsPromises.stat(filePath);
        const permissions = convertModeToRWX(stats.mode);
        const changedDate = new Date(stats.ctimeMs);
        const modifiedDate = new Date(stats.mtimeMs);
        return {
          name: file,
          size: stats.size,
          permissions: permissions,
          owner: stats.uid,
          group: stats.gid,
          changed: changedDate.toLocaleString(),
          modified: modifiedDate.toLocaleString(),
        };
      })
    );

    process.stdout.write(JSON.stringify(filesInfo, null, 2));
  } catch (error) {
    console.error("Error reading directory:", error);
  }
};

ls(process.argv[2] || CURR_DIR).catch(console.warn);
