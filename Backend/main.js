require("dotenv").config();
const express = require("express");
const path = require("path");
const users = require("./controller/Users");
const codes = require("./controller/Codes");
const bodyParser = require("body-parser");
const server = express();
const socket = require("socket.io");
const http = require("http");
const codeServer = http.createServer(server);
const socketCode = socket(codeServer);
const cookieParser = require("cookie-parser");

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(
  express.static(path.resolve(__dirname + "/../Frontend/rtcfrontend/dist"))
);
// server.use(express.static(path.resolve(__dirname + '/../../node_modules/')));
server.use(users);
server.use(codes);
// server.use(code);
// server.use(userCode);

/**
 * CORS Control
 *
 * @author Guilherme da Silva Martin
 */
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://rtcode.me");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.get("/", (req, res) => {
  console.log(path.resolve(__dirname + "/../Frontend/rtcfrontend/dist"));

  res.sendFile(path.resolve(__dirname + "/../Frontend/rtcfrontend/dist"));
});

socketCode.on("connection", (socket) => {
  console.log("User Connected");
});

codeServer.listen("3000", () => {
  console.log(`Example app1 listening on port ${3000}`);
});
