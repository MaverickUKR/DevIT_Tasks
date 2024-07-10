// TASK 1

// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const PORT = 3000;
// const DATA_DIR = path.join(__dirname, "data");

// // Функция для рекурсивного поиска файла в каталоге и его подкаталогах
// const findFile = async (dir, fileName) => {
//   const entries = await fs.promises.readdir(dir, { withFileTypes: true }); // возвращает массив объектов

//   for (let i = 0; i < entries.length; i++) {
//     const entry = entries[i];
//     const fullPath = path.join(dir, entry.name);
//     if (entry.isDirectory()) {
//       const result = await findFile(fullPath, fileName);
//       if (result) return result;
//     } else if (entry.name === fileName) {
//       return fullPath;
//     }
//   }

//   return null;
// };

// const server = http.createServer(async (req, res) => {
//   // Извлечение имени файла из URL
//   const fileName = req.url === "/" ? "index.html" : req.url.slice(1);

//   try {
//     // Поиск файла в каталоге и его подкаталогах
//     const filePath = await findFile(DATA_DIR, fileName);

//     // Если файл не найден
//     if (!filePath) {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.end("File not found");
//       return;
//     }

//     // Проверка, что путь безопасный и находится в DATA_DIR
//     if (!filePath.startsWith(DATA_DIR)) {
//       res.writeHead(403, { "Content-Type": "text/plain" });
//       res.end("Access denied");
//       return;
//     }

//     // Чтение и отправка файла
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         res.end("Internal server error");
//       } else {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end(data);
//       }
//     });
//   } catch (error) {
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end("Internal server error");
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server is listening on http://localhost:${PORT}`);
// });

// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const PORT = 3000;
// const DATA_DIR = path.join(__dirname, "data");

// const server = http.createServer((req, res) => {
//   // Извлечение имени файла из URL
//   const fileName = req.url === "/" ? "index.html" : req.url;
//   const filePath = path.join(DATA_DIR, fileName);

//   // Проверка, что путь безопасный и находится в DATA_DIR
//   if (!filePath.startsWith(DATA_DIR)) {
//     res.writeHead(403, { "Content-Type": "text/plain" });
//     res.end("Access denied");
//     return;
//   }

//   // Чтение и отправка файла
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       if (err.code === "ENOENT") {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("File not found");
//       } else {
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         res.end("Internal server error");
//       }
//     } else {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end(data);
//     }
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is listening on http://localhost:${PORT}`);
// });

// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const PORT = 3000;
// const DATA_DIR = path.join(__dirname, "data");

// // Функция для рекурсивного поиска файла в каталоге и его подкаталогах
// const findFile = async (dir, fileName) => {
//   const files = await fs.promises.readdir(dir, { withFileTypes: true });
//   for (const file of files) {
//     const fullPath = path.join(dir, file.name);
//     if (file.isDirectory()) {
//       const found = await findFile(fullPath, fileName);
//       if (found) return found;
//     } else if (file.name === fileName) {
//       return fullPath;
//     }
//   }
//   return null;
// };

//TASK 2

// const http = require("http");
// const { exec } = require("child_process");
// const querystring = require("querystring");

// const PORT = 3000;

// const server = http.createServer((req, res) => {
//   if (req.method === "GET" && req.url === "/") {
//     const html = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Interactive Console</title>
//       </head>
//       <body>
//           <h1>Interactive Console</h1>
//           <form action="/result" method="post">
//               <input type="text" name="command" id="command" placeholder="Enter ls command" required>
//               <button type="submit">Send</button>
//           </form>
//       </body>
//       </html>
//     `;
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(html);
//   } else if (req.method === "POST" && req.url === "/result") {
//     let body = [];
//     req.on("data", (chunk) => {
//       body.push(chunk);
//       console.log(body);
//     });
//     req.on("end", () => {
//       body = Buffer.concat(body).toString();
//       console.log(body);
//       const { command } = querystring.parse(body);

//       // Валидация команды
//       if (!command.startsWith("ls")) {
//         res.writeHead(400, { "Content-Type": "text/plain" }); // 400 - Bad Request
//         res.end('Only "ls" command allowed');
//         return;
//       }

//       // Выполнение команды
//       exec(command, (err, stdout, stderr) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "text/plain" }); // 500 Internal Server Error, stdin lssadasdas
//           res.end(`Error executing command: ${stderr}`);
//           return;
//         }

//         res.writeHead(200, { "Content-Type": "text/plain" }); // 200 Sucess
//         res.end(stdout);
//       });
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" }); // 404 Page not found
//     res.end("Not Found");
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server is listening on http://localhost:${PORT}`);
// });
//________________________________________________________________
// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const { exec } = require("child_process");
// const querystring = require("querystring");

// const PORT = 3000;

// const server = http.createServer((req, res) => {
//   if (req.method === "GET" && req.url === "/") {
//     const filePath = path.join(__dirname, "public", "index.html");
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         res.writeHead(500, { "Content-Type": "text/plain" }); //
//         res.end("Internal Server Error");
//         return;
//       }
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     });
//   } else if (req.method === "POST" && req.url === "/result") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       const { command } = querystring.parse(body);

//       // Валидируем комманду
//       if (!command.startsWith("ls")) {
//         res.writeHead(400, { "Content-Type": "text/plain" });
//         res.end('Invalid command. Only "ls" is allowed.');
//         return;
//       }

//       // Выполняем комманду
//       exec(command, (err, stdout, stderr) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "text/plain" });
//           res.end(`Error executing command: ${stderr}`);
//           return;
//         }

//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end(stdout);
//       });
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Not Found");
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server is listening on http://localhost:${PORT}`);
// });
// ______________________________________________ Lena's code____________________
// const http = require("node:http");
// const url = require("node:url");
// const path = require("node:path");
// const { spawn } = require("node:child_process");
// const fsPromises = require("node:fs/promises");

// const LS = "ls";
// const CURR_DIR = __dirname;
// const DATA_DIR = path.resolve(CURR_DIR, "data");
// const FORBIDDEN_OPTIONS = ["&&", ";", "|", "`", ",", "'", '"'];
// const ALLOWED_SHORT_OPTIONS = "aAbBcCdDfFgGhHiIlLmMnNoOpPqQrRsStTuUvVwWxX1Z";
// const ALLOWED_LONG_OPTIONS = [
//   "--all",
//   "--almost-all",
//   "--author",
//   "--escape",
//   "--block-size",
//   "--ignore-backups",
//   "--directory",
//   "--dired",
//   "--classify",
//   "--file-type",
//   "--format",
//   "--full-time",
//   "--group-directories-first",
//   "--no-group",
//   "--human-readable",
//   "--si",
//   "--dereference-command-line",
//   "--dereference-command-line-symlink-to-dir",
//   "--hide",
//   "--hyperlink",
//   "--indicator-style",
//   "--inode",
//   "--ignore",
//   "--kibibytes",
//   "--literal",
//   "--hide-control-chars",
//   "--show-control-chars",
//   "--quote-name",
//   "--quoting-style",
//   "--reverse",
//   "--recursive",
//   "--size",
//   "--sort",
//   "--time",
//   "--time-style",
//   "--tabsize",
//   "--width",
//   "--context",
//   "--zero",
//   "--help",
//   "--version",
// ];

// async function createHTML(content = "", error = "") {
//   let template = await fsPromises.readFile(
//     path.resolve(CURR_DIR, "index.html"),
//     "utf-8"
//   );

//   if (error) {
//     template = template.replace("<!-- error -->", `<p>${error}</p>`);
//   }

//   if (content) {
//     template = template.replace("<!-- content -->", `<pre>${content}</pre>`);
//   }

//   return template;
// }

// function validateCommand(command) {
//   const parts = command.trim().split(" ");

//   if (parts[0] !== LS) {
//     return false;
//   }

//   for (let i = 1; i < parts.length; i++) {
//     for (const forbidden of FORBIDDEN_OPTIONS) {
//       if (parts[i].includes(forbidden)) {
//         return false;
//       }
//     }

//     if (parts[i].startsWith("--")) {
//       if (!ALLOWED_LONG_OPTIONS.includes(parts[i])) {
//         return false;
//       }
//     } else if (parts[i].startsWith("-")) {
//       for (let j = 1; j < parts[i].length; j++) {
//         if (!ALLOWED_SHORT_OPTIONS.includes(parts[i][j])) {
//           return false;
//         }
//       }
//     } else {
//       continue;
//     }
//   }

//   return true;
// }

// async function checkIfPathExist(dirPath) {
//   try {
//     await fsPromises.access(dirPath);
//     return true;
//   } catch {
//     return false;
//   }
// }

// async function checkIfDirectory(dirPath) {
//   const stat = await fsPromises.stat(dirPath);
//   return stat.isDirectory();
// }

// async function performLsCommand(command) {
//   return new Promise(async (resolve, reject) => {
//     const commandOptions = command.split(" ").slice(1);
//     const dirPath =
//       commandOptions.find((option) => !option.startsWith("-")) || DATA_DIR;

//     if (!(await checkIfPathExist(dirPath))) {
//       return reject(
//         new HTTPError(await createHTML("", "Dir or file does not exist"), 400)
//       );
//     }

//     if (!(await checkIfDirectory(dirPath))) {
//       return reject(
//         new HTTPError(
//           await createHTML("", "Invalid path or not a directory"),
//           400
//         )
//       );
//     }

//     const ls = spawn(LS, commandOptions);

//     let dataRes = "";
//     let errRes = "";

//     ls.stdout.on("data", (data) => {
//       dataRes += data;
//     });

//     ls.stderr.on("data", (err) => {
//       errRes += err;
//     });

//     ls.on("exit", async () => {
//       if (errRes) {
//         reject(await createHTML("", errRes));
//       } else {
//         resolve(await createHTML(dataRes));
//       }
//     });
//   });
// }

// function response(res, html = "", code = 200) {
//   res.writeHead(code);
//   res.end(html);
// }

// function successResponse(res, html = "") {
//   return response(res, html);
// }

// function errResponse(res, html = "", code = 500) {
//   return response(res, html, code);
// }

// const requestListener = async (req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   const { pathname, query } = parsedUrl;

//   if (req.method === "GET" && pathname === "/") {
//     return await createHTML();
//   } else if (req.method === "GET" && pathname === "/result") {
//     const command = query.command || "";

//     if (!validateCommand(command)) {
//       const html = await createHTML(
//         "",
//         'Invalid command. Only "ls" commands are allowed and no special characters.'
//       );
//       throw new HTTPError(html, 400);
//     }

//     return await performLsCommand(command);
//   } else {
//     throw new HTTPError("404 Not Found", 404);
//   }
// };

// function wrapper(requestHandler) {
//   return async function (req, res) {
//     try {
//       const html = await requestHandler(req, res);
//       successResponse(res, html);
//     } catch (err) {
//       if (err instanceof HTTPError) {
//         errResponse(res, err.message, err.status);
//       } else {
//         errResponse(res, err.message || "unknown", 500);
//       }
//     }
//   };
// }

// const server = http.createServer(wrapper(requestListener));

// server.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

// class HTTPError extends Error {
//   status = 500;

//   constructor(message = "", status) {
//     super(message);
//     this.status = status || this.status;
//   }
// }
//_____________________________________________________________________2_______
// const http = require("node:http");
// const url = require("node:url");
// const path = require("node:path");
// const { spawn } = require("node:child_process");
// const fsPromises = require("node:fs/promises");

// const LS = "ls";
// const CURR_DIR = __dirname;
// const DATA_DIR = path.resolve(CURR_DIR, "data");
// const FORBIDDEN_OPTIONS = ["&&", ";", "|", "`", ",", "'", '"'];
// const ALLOWED_SHORT_OPTIONS = "aAbBcCdDfFgGhHiIlLmMnNoOpPqQrRsStTuUvVwWxX1Z";
// const ALLOWED_LONG_OPTIONS = [
//   "--all",
//   "--almost-all",
//   "--author",
//   "--escape",
//   "--block-size",
//   "--ignore-backups",
//   "--directory",
//   "--dired",
//   "--classify",
//   "--file-type",
//   "--format",
//   "--full-time",
//   "--group-directories-first",
//   "--no-group",
//   "--human-readable",
//   "--si",
//   "--dereference-command-line",
//   "--dereference-command-line-symlink-to-dir",
//   "--hide",
//   "--hyperlink",
//   "--indicator-style",
//   "--inode",
//   "--ignore",
//   "--kibibytes",
//   "--literal",
//   "--hide-control-chars",
//   "--show-control-chars",
//   "--quote-name",
//   "--quoting-style",
//   "--reverse",
//   "--recursive",
//   "--size",
//   "--sort",
//   "--time",
//   "--time-style",
//   "--tabsize",
//   "--width",
//   "--context",
//   "--zero",
//   "--help",
//   "--version",
// ];

// async function createHTML(content = "", error = "") {
//   let template = await fsPromises.readFile(
//     path.resolve(CURR_DIR, "index.html"),
//     "utf-8"
//   );

//   if (error) {
//     template = template.replace("<!-- error -->", `<p>${error}</p>`);
//   }

//   if (content) {
//     template = template.replace("<!-- content -->", `<pre>${content}</pre>`);
//   }

//   return template;
// }

// function validateCommand(command) {
//   const parts = command.trim().split(" ");

//   if (parts[0] !== LS) {
//     return false;
//   }

//   for (let i = 1; i < parts.length; i++) {
//     for (const forbidden of FORBIDDEN_OPTIONS) {
//       if (parts[i].includes(forbidden)) {
//         return false;
//       }
//     }

//     if (parts[i].startsWith("--")) {
//       if (!ALLOWED_LONG_OPTIONS.includes(parts[i])) {
//         return false;
//       }
//     } else if (parts[i].startsWith("-")) {
//       for (let j = 1; j < parts[i].length; j++) {
//         if (!ALLOWED_SHORT_OPTIONS.includes(parts[i][j])) {
//           return false;
//         }
//       }
//     } else {
//       continue;
//     }
//   }

//   return true;
// }

// async function checkIfPathExist(dirPath) {
//   try {
//     await fsPromises.access(dirPath);
//     return true;
//   } catch {
//     return false;
//   }
// }

// async function checkIfDirectory(dirPath) {
//   const stat = await fsPromises.stat(dirPath);
//   return stat.isDirectory();
// }

// async function performLsCommand(command) {
//   return new Promise(async (resolve, reject) => {
//     const commandOptions = command.split(" ").slice(1);
//     const dirPath =
//       commandOptions.find((option) => !option.startsWith("-")) || DATA_DIR;

//     if (!(await checkIfPathExist(dirPath))) {
//       return reject(
//         new HTTPError(await createHTML("", "Dir or file does not exist"), 400)
//       );
//     }

//     if (!(await checkIfDirectory(dirPath))) {
//       return reject(
//         new HTTPError(
//           await createHTML("", "Invalid path or not a directory"),
//           400
//         )
//       );
//     }

//     const ls = spawn(LS, commandOptions);

//     let dataRes = "";
//     let errRes = "";

//     ls.stdout.on("data", (data) => {
//       dataRes += data;
//     });

//     ls.stderr.on("data", (err) => {
//       errRes += err;
//     });

//     ls.on("exit", async () => {
//       if (errRes) {
//         reject(await createHTML("", errRes));
//       } else {
//         resolve(await createHTML(dataRes));
//       }
//     });
//   });
// }

// function response(res, html = "", code = 200) {
//   res.writeHead(code, { "Content-Type": "text/html" });
//   res.end(html);
// }

// function successResponse(res, html = "") {
//   return response(res, html);
// }

// function errResponse(res, html = "", code = 500) {
//   return response(res, html, code);
// }

// const requestListener = async (req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   const { pathname, query } = parsedUrl;

//   if (req.method === "GET" && pathname === "/") {
//     const html = await createHTML();
//     return successResponse(res, html);
//   } else if (req.method === "GET" && pathname === "/result") {
//     const command = query.command || "";

//     if (!validateCommand(command)) {
//       const html = await createHTML(
//         "",
//         'Invalid command. Only "ls" commands are allowed and no special characters.'
//       );
//       throw new HTTPError(html, 400);
//     }

//     return await performLsCommand(command);
//   } else {
//     throw new HTTPError("404 Not Found", 404);
//   }
// };

// function wrapper(requestHandler) {
//   return async function (req, res) {
//     try {
//       const html = await requestHandler(req, res);
//       successResponse(res, html);
//     } catch (err) {
//       if (err instanceof HTTPError) {
//         errResponse(res, err.message, err.status);
//       } else {
//         errResponse(res, err.message || "unknown", 500);
//       }
//     }
//   };
// }

// const server = http.createServer(wrapper(requestListener));

// server.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

// class HTTPError extends Error {
//   status = 500;

//   constructor(message = "", status) {
//     super(message);
//     this.status = status || this.status;
//   }
// }
// _____________________________________________________3_______________________

// const http = require("node:http");
// const url = require("node:url");
// const path = require("node:path");
// const { spawn } = require("node:child_process");
// const fsPromises = require("node:fs/promises");

// const LS = "ls";
// const CURR_DIR = __dirname;
// const DATA_DIR = path.resolve(CURR_DIR, "data");
// const FORBIDDEN_OPTIONS = ["&&", ";", "|", "`", ",", "'", '"'];
// const ALLOWED_SHORT_OPTIONS = "aAbBcCdDfFgGhHiIlLmMnNoOpPqQrRsStTuUvVwWxX1Z";
// const ALLOWED_LONG_OPTIONS = [
//   "--all",
//   "--almost-all",
//   "--author",
//   "--escape",
//   "--block-size",
//   "--ignore-backups",
//   "--directory",
//   "--dired",
//   "--classify",
//   "--file-type",
//   "--format",
//   "--full-time",
//   "--group-directories-first",
//   "--no-group",
//   "--human-readable",
//   "--si",
//   "--dereference-command-line",
//   "--dereference-command-line-symlink-to-dir",
//   "--hide",
//   "--hyperlink",
//   "--indicator-style",
//   "--inode",
//   "--ignore",
//   "--kibibytes",
//   "--literal",
//   "--hide-control-chars",
//   "--show-control-chars",
//   "--quote-name",
//   "--quoting-style",
//   "--reverse",
//   "--recursive",
//   "--size",
//   "--sort",
//   "--time",
//   "--time-style",
//   "--tabsize",
//   "--width",
//   "--context",
//   "--zero",
//   "--help",
//   "--version",
// ];

// async function createHTML(content = "", error = "") {
//   let template = await fsPromises.readFile(
//     path.resolve(CURR_DIR, "index.html"),
//     "utf-8"
//   );

//   if (error) {
//     template = template.replace("<!-- error -->", `<p>${error}</p>`);
//   }

//   if (content) {
//     template = template.replace("<!-- content -->", `<pre>${content}</pre>`);
//   }

//   return template;
// }

// function validateCommand(command) {
//   const parts = command.trim().split(" ");

//   if (parts[0] !== LS) {
//     return false;
//   }

//   for (let i = 1; i < parts.length; i++) {
//     for (const forbidden of FORBIDDEN_OPTIONS) {
//       if (parts[i].includes(forbidden)) {
//         return false;
//       }
//     }

//     if (parts[i].startsWith("--")) {
//       if (!ALLOWED_LONG_OPTIONS.includes(parts[i])) {
//         return false;
//       }
//     } else if (parts[i].startsWith("-")) {
//       for (let j = 1; j < parts[i].length; j++) {
//         if (!ALLOWED_SHORT_OPTIONS.includes(parts[i][j])) {
//           return false;
//         }
//       }
//     } else {
//       continue;
//     }
//   }

//   return true;
// }

// async function checkIfPathExist(dirPath) {
//   try {
//     await fsPromises.access(dirPath);
//     return true;
//   } catch {
//     return false;
//   }
// }

// async function checkIfDirectory(dirPath) {
//   const stat = await fsPromises.stat(dirPath);
//   return stat.isDirectory();
// }

// async function performLsCommand(command) {
//   return new Promise(async (resolve, reject) => {
//     const commandOptions = command.split(" ").slice(1);
//     const dirPath =
//       commandOptions.find((option) => !option.startsWith("-")) || DATA_DIR;

//     if (!(await checkIfPathExist(dirPath))) {
//       throw new Error("Dir or file does not exist");
//     }

//     if (!(await checkIfDirectory(dirPath))) {
//       throw new Error("Invalid path or not a directory");
//     }

//     const ls = spawn(LS, commandOptions);

//     let dataRes = "";
//     let errRes = "";

//     ls.stdout.on("data", (data) => {
//       dataRes += data;
//     });

//     ls.stderr.on("data", (err) => {
//       errRes += err;
//     });

//     ls.on("exit", async () => {
//       if (errRes) {
//         reject(errRes);
//       } else {
//         resolve(dataRes);
//       }
//     });
//   });
// }

// function response(res, html = "", code = 200) {
//   if (!res.headersSent) {
//     res.writeHead(code, { "Content-Type": "text/html" });
//     res.end(html);
//   }
// }

// function successResponse(res, html = "") {
//   return response(res, html);
// }

// function errResponse(res, html = "", code = 500) {
//   return response(res, html, code);
// }

// const requestListener = async (req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   const { pathname, query } = parsedUrl;

//   if (req.method === "GET" && pathname === "/") {
//     const html = await createHTML();
//     return successResponse(res, html);
//   } else if (req.method === "GET" && pathname === "/result") {
//     const command = query.command || "";

//     if (!validateCommand(command)) {
//       const html = await createHTML(
//         "",
//         'Invalid command. Only "ls" commands are allowed and no special characters.'
//       );
//       return errResponse(res, html, 400);
//     }

//     try {
//       const result = await performLsCommand(command);
//       const html = await createHTML(result);
//       return successResponse(res, html);
//     } catch (err) {
//       const html = await createHTML("", err);
//       return errResponse(res, html, 400);
//     }
//   } else {
//     const html = await createHTML("", "404 Not Found");
//     return errResponse(res, html, 404);
//   }
// };

// function wrapper(requestHandler) {
//   return async function (req, res) {
//     try {
//       await requestHandler(req, res);
//     } catch (err) {
//       if (err instanceof HTTPError) {
//         const html = await createHTML("", err.message);
//         errResponse(res, html, err.status);
//       } else {
//         const html = await createHTML("", err.message || "unknown");
//         errResponse(res, html, 500);
//       }
//     }
//   };
// }

// const server = http.createServer(wrapper(requestListener));

// server.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

// class HTTPError extends Error {
//   status = 500;

//   constructor(message = "", status) {
//     super(message);
//     this.status = status || this.status;
//   }
// }
// _____________________________________________________4_______________________
const http = require("node:http");
const url = require("node:url");
const path = require("node:path");
const { spawn } = require("node:child_process");
const fsPromises = require("node:fs/promises");
const WebSocket = require("ws");

const LS = "ls";
const CURR_DIR = __dirname;
const DATA_DIR = path.resolve(CURR_DIR, "data");
const FORBIDDEN_OPTIONS = ["&&", ";", "|", "`", ",", "'", '"'];
const ALLOWED_SHORT_OPTIONS = "aAbBcCdDfFgGhHiIlLmMnNoOpPqQrRsStTuUvVwWxX1Z";
const ALLOWED_LONG_OPTIONS = [
  "--all",
  "--almost-all",
  "--author",
  "--escape",
  "--block-size",
  "--ignore-backups",
  "--directory",
  "--dired",
  "--classify",
  "--file-type",
  "--format",
  "--full-time",
  "--group-directories-first",
  "--no-group",
  "--human-readable",
  "--si",
  "--dereference-command-line",
  "--dereference-command-line-symlink-to-dir",
  "--hide",
  "--hyperlink",
  "--indicator-style",
  "--inode",
  "--ignore",
  "--kibibytes",
  "--literal",
  "--hide-control-chars",
  "--show-control-chars",
  "--quote-name",
  "--quoting-style",
  "--reverse",
  "--recursive",
  "--size",
  "--sort",
  "--time",
  "--time-style",
  "--tabsize",
  "--width",
  "--context",
  "--zero",
  "--help",
  "--version",
];

async function createHTML(content = "", error = "") {
  let template = await fsPromises.readFile(
    path.resolve(CURR_DIR, "index.html"),
    "utf-8"
  );

  if (error) {
    template = template.replace("<!-- error -->", `<p>${error}</p>`);
  }

  if (content) {
    template = template.replace("<!-- content -->", `<pre>${content}</pre>`);
  }

  return template;
}

function validateCommand(command) {
  const parts = command.trim().split(" ");

  if (parts[0] !== LS) {
    return false;
  }

  for (let i = 1; i < parts.length; i++) {
    for (const forbidden of FORBIDDEN_OPTIONS) {
      if (parts[i].includes(forbidden)) {
        return false;
      }
    }

    if (parts[i].startsWith("--")) {
      if (!ALLOWED_LONG_OPTIONS.includes(parts[i])) {
        return false;
      }
    } else if (parts[i].startsWith("-")) {
      for (let j = 1; j < parts[i].length; j++) {
        if (!ALLOWED_SHORT_OPTIONS.includes(parts[i][j])) {
          return false;
        }
      }
    }
  }

  return true;
}

async function checkIfPathExist(dirPath) {
  try {
    await fsPromises.access(dirPath);
    return true;
  } catch {
    return false;
  }
}

async function checkIfDirectory(dirPath) {
  const stat = await fsPromises.stat(dirPath);
  return stat.isDirectory();
}

async function performLsCommand(command) {
  const commandOptions = command.split(" ").slice(1);
  const dirPath =
    commandOptions.find((option) => !option.startsWith("-")) || DATA_DIR;

  if (!(await checkIfPathExist(dirPath))) {
    throw new Error("Dir or file does not exist");
  }

  if (!(await checkIfDirectory(dirPath))) {
    throw new Error("Invalid path or not a directory");
  }

  return new Promise((resolve, reject) => {
    const ls = spawn(LS, commandOptions);

    let dataRes = "";
    let errRes = "";

    ls.stdout.on("data", (data) => {
      dataRes += data;
    });

    ls.stderr.on("data", (err) => {
      errRes += err;
    });

    ls.on("exit", () => {
      if (errRes) {
        reject(new Error(errRes));
      } else {
        resolve(dataRes);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  console.log(`HTTP request for: ${pathname}`);

  if (pathname === "/" && req.method === "GET") {
    const html = await createHTML();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  }
});

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  ws.on("message", async (message) => {
    console.log("Received message:", message);
    const { command } = JSON.parse(message);

    if (!validateCommand(command)) {
      ws.send(
        JSON.stringify({
          error:
            'Invalid command. Only "ls" commands are allowed and no special characters.',
        })
      );
      return;
    }

    try {
      const result = await performLsCommand(command);
      ws.send(JSON.stringify({ content: result }));
    } catch (err) {
      ws.send(JSON.stringify({ error: err.message }));
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

server.on("upgrade", (request, socket, head) => {
  console.log("HTTP upgrade request");
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
