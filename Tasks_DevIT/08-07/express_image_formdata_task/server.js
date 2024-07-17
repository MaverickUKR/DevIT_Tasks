const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const uuid = require("uuid");

const app = express();
const port = 3000;
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photos/");
  },
  filename: function (req, file, cb) {
    cb(null, `uuid.v4() + ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

if (!fs.existsSync("photos")) {
  fs.mkdirSync("photos");
}

app.post("/photos", upload.single("image"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  if (err instanceof multer.MulterError) {
    return res.json({ message: "Multer ERROR" });
  }
  const fileUrl = `http://localhost:${port}/photos/${req.file.filename}`;
  res.json({ message: "Ура! Файл загружен", url: fileUrl });
});

app.use("/photos", express.static(path.join(__dirname, "photos")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
