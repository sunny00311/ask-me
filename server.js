// server.js
const http = require("http");
const handleRequest = require("./router");

const server = http.createServer(handleRequest);

server.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
