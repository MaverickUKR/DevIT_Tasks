// TASK 1

import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";

const PORT = 3000;
const DATA_DIR = path.join(__dirname, "data");

const findFile = async (
  dir: string,
  fileName: string
): Promise<string | null> => {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const result = await findFile(fullPath, fileName);
      if (result) return result;
    } else if (entry.name === fileName) {
      return fullPath;
    }
  }

  return null;
};

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const fileName = req.url === "/" ? "index.html" : req.url!.slice(1);

    try {
      const filePath = await findFile(DATA_DIR, fileName);

      if (!filePath) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
        return;
      }

      if (!filePath.startsWith(DATA_DIR)) {
        res.writeHead(403, { "Content-Type": "text/plain" });
        res.end("Access denied");
        return;
      }

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal server error");
        } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(data);
        }
      });
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal server error");
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// TASK 2

// import http, { IncomingMessage, ServerResponse } from "http";
// import fs from "fs";
// import path from "path";
// import { exec } from "child_process";
// import querystring from "querystring";

// const PORT = 3000;

// const server = http.createServer(
//   (req: IncomingMessage, res: ServerResponse) => {
//     if (req.method === "GET" && req.url === "/") {
//       const filePath = path.join(__dirname, "public", "index.html");
//       fs.readFile(filePath, (err, data) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "text/plain" });
//           res.end("Internal Server Error");
//           return;
//         }
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(data);
//       });
//     } else if (req.method === "POST" && req.url === "/result") {
//       let body = "";
//       req.on("data", (chunk) => {
//         body += chunk.toString();
//       });
//       req.on("end", () => {
//         const { command } = querystring.parse(body) as { command?: string };

//         if (!command || !command.startsWith("ls")) {
//           res.writeHead(400, { "Content-Type": "text/plain" });
//           res.end('Invalid command. Only "ls" is allowed.');
//           return;
//         }

//         exec(command, (err, stdout, stderr) => {
//           if (err) {
//             res.writeHead(500, { "Content-Type": "text/plain" });
//             res.end(`Error executing command: ${stderr}`);
//             return;
//           }

//           res.writeHead(200, { "Content-Type": "text/plain" });
//           res.end(stdout);
//         });
//       });
//     } else {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.end("Not Found");
//     }
//   }
// );

// server.listen(PORT, () => {
//   console.log(`Server is listening on http://localhost:${PORT}`);
// });
