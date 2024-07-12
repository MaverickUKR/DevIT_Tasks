// TASK 1 - Записать содержимое переменной sysInfo с помощью Stream
// TASK 2 - Реализовать програму LS, данные выводятся в формате JSON
const fs = require("fs");
// TASK 1

const writeSysInfoWithStream = () => {
  const writable = fs.createWriteStream(sysInfoFile);
  writable.write(sysInfo, "utf8");
  writable.end();
};

writeSysInfoWithStream();

// TASK 2

// Конвертування прав доступу з числового формату у формат rwx
// const convertModeToRWX = (mode) => {
//   const types = ["d", "-", "l", "b", "c", "p", "s"];
//   const type = types[(mode >> 12) & 15] || "-";
//   const perms = ["---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"];
//   return (
//     type + perms[(mode >> 6) & 7] + perms[(mode >> 3) & 7] + perms[mode & 7]
//   );
// };

// const ls = async (dir) => {
//   try {
//     const files = await fsPromises.readdir(dir);
//     const filesInfo = await Promise.all(
//       files.map(async (file) => {
//         const filePath = path.join(dir, file);
//         const stats = await fsPromises.stat(filePath);
//         const permissions = convertModeToRWX(stats.mode);
//         const changedDate = new Date(stats.ctimeMs);
//         const modifiedDate = new Date(stats.mtimeMs);
//         return {
//           name: file,
//           size: stats.size,
//           permissions: permissions,
//           owner: stats.uid,
//           group: stats.gid,
//           changed: changedDate.toLocaleString(),
//           modified: modifiedDate.toLocaleString(),
//         };
//       })
//     );

//     console.log(filesInfo);
//   } catch (error) {
//     console.error("Error reading directory:", error);
//   }
// };

// ls(process.argv[2] || CURR_DIR);
