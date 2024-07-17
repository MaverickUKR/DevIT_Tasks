"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("node:http");
const socket_io_1 = require("socket.io");
const path = require("node:path");
const node_child_process_1 = require("node:child_process");
const fsPromises = require("node:fs/promises");
const express = require("express");
const LS = "ls";
const CURR_DIR = __dirname;
const DATA_DIR = path.resolve(CURR_DIR, "data");
const CLIENT_BUILD_PATH = path.resolve(CURR_DIR, "public");
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
        }
        else if (parts[i].startsWith("-")) {
            for (let j = 1; j < parts[i].length; j++) {
                if (!ALLOWED_SHORT_OPTIONS.includes(parts[i][j])) {
                    return false;
                }
            }
        }
        else {
            continue;
        }
    }
    return true;
}
function checkIfPathExist(dirPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fsPromises.access(dirPath);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
function checkIfDirectory(dirPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const stat = yield fsPromises.stat(dirPath);
        return stat.isDirectory();
    });
}
function performLsCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const commandOptions = command.split(" ").slice(1);
            const dirPath = commandOptions.find((option) => !option.startsWith("-")) || DATA_DIR;
            if (!(yield checkIfPathExist(dirPath))) {
                return reject(new Error("Dir or file does not exist"));
            }
            if (!(yield checkIfDirectory(dirPath))) {
                return reject(new Error("Invalid path or not a directory"));
            }
            const ls = (0, node_child_process_1.spawn)(LS, commandOptions, { cwd: dirPath });
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
                    reject(errRes);
                }
                else {
                    resolve(dataRes);
                }
            });
        }));
    });
}
function response(socket, event, data) {
    socket.emit(event, data);
}
function successResponse(socket, data) {
    return response(socket, "content", data);
}
function errorResponse(socket, data) {
    return response(socket, "error", data);
}
function socketWrapper(handlerFunction) {
    return function (socket) {
        socket.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield handlerFunction(socket, data);
                successResponse(socket, response);
            }
            catch (err) {
                if (err instanceof SocketError) {
                    errorResponse(socket, err.message);
                }
                else {
                    errorResponse(socket, "unknown");
                }
            }
        }));
    };
}
const app = express();
const server = http.createServer(app);
/*
app.use(express.static(CLIENT_BUILD_PATH));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(CLIENT_BUILD_PATH, "index.html"));
});
*/
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    handleLsCommand(socket);
});
const handleLsCommand = socketWrapper((socket, command) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validateCommand(command)) {
        throw new SocketError('Invalid command. Only "ls" commands are allowed and no special characters.', 400);
    }
    return yield performLsCommand(command);
}));
server.listen(3001, () => {
    console.log("Server is listening on port 3001");
});
class SocketError extends Error {
    constructor(message = "", status) {
        super(message);
        this.status = 500;
        this.status = status || this.status;
    }
}
