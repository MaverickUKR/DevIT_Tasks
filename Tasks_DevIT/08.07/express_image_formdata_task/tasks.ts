import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "photos/");
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

if (!fs.existsSync("photos")) {
  fs.mkdirSync("photos");
}

app.post(
  "/photos",
  upload.single("image"),
  function (req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const fileUrl = `http://localhost:${port}/photos/${req.file.filename}`;
    res.json({ message: "Ура! Файл загружен", url: fileUrl });
  }
);

app.use("/photos", express.static(path.join(__dirname, "photos")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
