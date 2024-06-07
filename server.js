const fs = require("fs");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

const routes = JSON.parse(fs.readFileSync("./routes.json"));
server.use(jsonServer.rewriter(routes));

server.use("/api", router);

const startJsonServer = () => {
  const jsonServerPort = process.env.JSON_SERVER_PORT || 3002;
  server.listen(jsonServerPort, () => {
    console.log(`JSON Server is running on port ${jsonServerPort}`);
  });
};

module.exports = { startJsonServer };
