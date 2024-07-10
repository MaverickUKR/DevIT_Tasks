// const { createServer } = require("node:http");

// const hostname = "0.0.0.0";
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   console.log(req.url, req.method);
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

// server.listen(port, hostname, (error) => {
//   error
//     ? console.log(error)
//     : console.log(`Server running at http://${hostname}:${port}/`);
// });

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DATA_DIR = path.join(__dirname, "data");

const server = http.createServer((req, res) => {
  // Create the full path to the file
  const filePath = path.resolve(DATA_DIR, "." + req.url);

  // Check if the path is safe (prevents going outside the DATA_DIR)
  if (!filePath.startsWith(DATA_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Access denied");
    return;
  }

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
