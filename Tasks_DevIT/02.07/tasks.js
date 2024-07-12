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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("node:http");
var path = require("node:path");
var spawn = require("node:child_process").spawn;
var Server = require("socket.io").Server;
var fsPromises = require("node:fs/promises");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = new Server(server);
var LS = "ls";
var CURR_DIR = __dirname;
var DATA_DIR = path.resolve(CURR_DIR, "data");
var FORBIDDEN_OPTIONS = ["&&", ";", "|", "`", ",", "'", '"'];
var ALLOWED_SHORT_OPTIONS = "aAbBcCdDfFgGhHiIlLmMnNoOpPqQrRsStTuUvVwWxX1Z";
var ALLOWED_LONG_OPTIONS = [
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
function createHTML() {
    return __awaiter(this, arguments, void 0, function (content, error) {
        var template;
        if (content === void 0) { content = ""; }
        if (error === void 0) { error = ""; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fsPromises.readFile(path.resolve(CURR_DIR, "index.html"), "utf-8")];
                case 1:
                    template = _a.sent();
                    if (error) {
                        template = template.replace("<!-- error -->", "<p>".concat(error, "</p>"));
                    }
                    if (content) {
                        template = template.replace("<!-- content -->", "<pre>".concat(content, "</pre>"));
                    }
                    return [2 /*return*/, template];
            }
        });
    });
}
function validateCommand(command) {
    var parts = command.trim().split(" ");
    if (parts[0] !== LS) {
        return false;
    }
    for (var i = 1; i < parts.length; i++) {
        for (var _i = 0, FORBIDDEN_OPTIONS_1 = FORBIDDEN_OPTIONS; _i < FORBIDDEN_OPTIONS_1.length; _i++) {
            var forbidden = FORBIDDEN_OPTIONS_1[_i];
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
            for (var j = 1; j < parts[i].length; j++) {
                if (!ALLOWED_SHORT_OPTIONS.includes(parts[i][j])) {
                    return false;
                }
            }
        }
    }
    return true;
}
function checkIfPathExist(dirPath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fsPromises.access(dirPath)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, true];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function checkIfDirectory(dirPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fsPromises.stat(dirPath).isDirectory()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function performLsCommand(command) {
    return __awaiter(this, void 0, void 0, function () {
        var commandOptions, dirPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commandOptions = command.split(" ").slice(1);
                    dirPath = commandOptions.find(function (option) { return !option.startsWith("-"); }) || DATA_DIR;
                    return [4 /*yield*/, checkIfPathExist(dirPath)];
                case 1:
                    if (!(_a.sent())) {
                        throw new Error("Dir or file does not exist");
                    }
                    return [4 /*yield*/, checkIfDirectory(dirPath)];
                case 2:
                    if (!(_a.sent())) {
                        throw new Error("Invalid path or not a directory");
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var ls = spawn(LS, commandOptions);
                            var dataRes = "";
                            var errRes = "";
                            ls.stdout.on("data", function (data) {
                                dataRes += data;
                            });
                            ls.stderr.on("data", function (err) {
                                errRes += err;
                            });
                            ls.on("exit", function () {
                                if (errRes) {
                                    reject(new Error(errRes));
                                }
                                else {
                                    resolve(dataRes);
                                }
                            });
                        })];
            }
        });
    });
}
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createHTML()];
            case 1:
                html = _a.sent();
                res.send(html);
                return [2 /*return*/];
        }
    });
}); });
io.on("connection", function (socket) {
    console.log("WebSocket connection established");
    socket.on("command", function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var command, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Received message:", message);
                    command = message.command;
                    if (!validateCommand(command)) {
                        socket.emit("response", {
                            error: 'Invalid command. Only "ls" commands are allowed and no special characters.',
                        });
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, performLsCommand(command)];
                case 2:
                    result = _a.sent();
                    socket.emit("response", { content: result });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    socket.emit("response", { error: err_1.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    socket.on("disconnect", function () {
        console.log("WebSocket connection closed");
    });
});
server.listen(3000, function () {
    console.log("Server is listening on port 3000");
});
