const http = require("node:http");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { Server } = require("socket.io");
const fsPromises = require("node:fs/promises");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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

app.get("/", async (req, res) => {
  const html = await createHTML();
  res.send(html);
});

io.on("connection", (socket) => {
  console.log("WebSocket connection established");

  socket.on("command", async (message) => {
    console.log("Received message:", message);
    const { command } = message;

    if (!validateCommand(command)) {
      socket.emit("response", {
        error:
          'Invalid command. Only "ls" commands are allowed and no special characters.',
      });
      return;
    }

    try {
      const result = await performLsCommand(command);
      socket.emit("response", { content: result });
    } catch (err) {
      socket.emit("response", { error: err.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("WebSocket connection closed");
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
