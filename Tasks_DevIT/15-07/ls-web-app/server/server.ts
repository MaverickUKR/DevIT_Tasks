import * as http from "node:http";
import url from "node:url";
import * as path from "node:path";
import { spawn } from "node:child_process";
import * as fsPromises from "node:fs/promises";
import WebSocket, { WebSocketServer } from "ws";

const LS = "ls";
const CURR_DIR = __dirname;
const DATA_DIR = path.resolve(CURR_DIR, "/data");
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

async function createHTML(content = "", error = ""): Promise<string> {
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

function validateCommand(command: string): boolean {
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

async function checkIfPathExist(dirPath: string): Promise<boolean> {
  try {
    await fsPromises.access(dirPath);
    return true;
  } catch {
    return false;
  }
}

async function checkIfDirectory(dirPath: string): Promise<boolean> {
  const stat = await fsPromises.stat(dirPath);
  return stat.isDirectory();
}

async function performLsCommand(command: string): Promise<string> {
  const commandOptions = command.split(" ").slice(1);
  const dirPath =
    commandOptions.find((option) => !option.startsWith("-")) || DATA_DIR;

  if (!(await checkIfPathExist(dirPath))) {
    throw new Error(`Dir or file does not exist: ${dirPath}`);
  }

  if (!(await checkIfDirectory(dirPath))) {
    throw new Error(`Invalid path or not a directory: ${dirPath}`);
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
  const parsedUrl = url.parse(req.url!, true);
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

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws: WebSocket) => {
  console.log("WebSocket connection established");

  ws.on("message", async (message: WebSocket.RawData) => {
    console.log("Received message:", message);
    const { command } = JSON.parse(message.toString());

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
      ws.send(JSON.stringify({ error: (err as Error).message }));
    }
  });

  ws.on("error", (error: Error) => {
    console.error("WebSocket error:", error);
  });
});

const PORT = 4000;

server.on("upgrade", (request, socket, head) => {
  console.log("HTTP upgrade request");
  wss.handleUpgrade(request, socket as unknown as any, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
