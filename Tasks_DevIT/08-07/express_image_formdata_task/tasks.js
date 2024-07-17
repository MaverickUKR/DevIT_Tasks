"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = require("multer");
var fs_1 = require("fs");
var path_1 = require("path");
var cors_1 = require("cors");
var uuid_1 = require("uuid");
var app = (0, express_1.default)();
var port = 3000;
app.use((0, cors_1.default)());
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "photos/");
    },
    filename: function (req, file, cb) {
        cb(null, "".concat((0, uuid_1.v4)(), "-").concat(file.originalname));
    },
});
var upload = (0, multer_1.default)({ storage: storage });
if (!fs_1.default.existsSync("photos")) {
    fs_1.default.mkdirSync("photos");
}
app.post("/photos", upload.single("image"), function (req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    var fileUrl = "http://localhost:".concat(port, "/photos/").concat(req.file.filename);
    res.json({ message: "Ура! Файл загружен", url: fileUrl });
});
app.use("/photos", express_1.default.static(path_1.default.join(__dirname, "photos")));
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
