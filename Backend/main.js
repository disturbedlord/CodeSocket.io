require("dotenv").config();
const express = require("express");
const path = require("path");
const users = require("./controller/Users");
const codes = require("./controller/Codes");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");

server.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
  })
);

const socket1 = require("socket.io");
const http = require("http");
const codeServer = http.createServer(server);
const socketCode = socket1(codeServer);
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
// server.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "https://rtcode.me");
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin, X-Requested-With, Content-Type, Accept"
//   // );
//   next();
// });

server.get("/", (req, res) => {
  console.log(path.resolve(__dirname + "/../Frontend/rtcfrontend/dist"));

  res.sendFile(path.resolve(__dirname + "/../Frontend/rtcfrontend/dist"));
});

const socketCache = {
  sockets: {},
};

socketCode.on("connection", (socket) => {
  //console.log("User Connected with Id: ", socket.id);
  // socket.join("U79z7-pBQj");

  socket.on("join-code", (roomCode) => {
    console.log("ROOM : ", roomCode);
    const { room, from, userId } = roomCode;
    console.log("JOIN_CODE called from ", from, socket.id, userId);
    socket.leaveAll();
    socket.join(room);
    socketCache.sockets.userId = socket.id;

    console.log("ALL CLIENTS : ", socket.adapter.rooms.get(room));
  });

  socket.on("code-change", (event) => {
    const { roomCode, data } = event;
    console.log("CODE_CHANGE:", roomCode, data, event, socket.id);
    socket.join(event[0]);

    socket.broadcast.to(event[0]).emit("code-update", event[1]);
    console.log(
      "ALL CLIENTS CODECHANGE: ",
      socket.adapter.rooms.get(event[0]),
      socketCache
    );
  });
});

codeServer.listen("3000", () => {
  console.log(`Example app1 listening on port ${3000}`);
});
