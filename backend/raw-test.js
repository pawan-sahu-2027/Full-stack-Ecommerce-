import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("RAW NODE SERVER WORKING");
});

server.listen(9000, "0.0.0.0", () => {
  console.log("Raw server listening on port 9000");
});
