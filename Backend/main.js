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

const http = require("http");
const codeServer = http.createServer(server);
const socketCode = require("socket.io")(codeServer, {
  cors: {
    origin: "*",
  },
});
//const socketCode = socket1(codeServer);
const cookieParser = require("cookie-parser");
const { util } = require("./services/CodesService");
const Util = require("./util/utils");
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

class Rooms {
  client = class Client {
    constructor(idx, ord) {
      this.id = idx;
      this.order = ord;
      this.position = { lineNumber: 1, column: 2 };
    }
  };

  constructor() {
    this.rooms = {};
  }
}

/*

Rooms = {
  this.rooms = {
    roomCode: {
      id: Client {
        position: {lineNumber , column}
      }
    }
  }
}

socketCache = {
  roomCode1: {
  id: {
    position: {lineNumber: 1 , column: 2}
    }
    socket.id2,
    socket.id3
  ],
  roomCode2: [
  socket.id1
}
}
*/
const socketCache = {};
const roomsObj = new Rooms();

const joinRoom = (roomCode, socket) => {
  console.log("SSOCKET : ", socket.adapter.rooms.get(roomCode));
  if (
    socket.adapter.rooms.get(roomCode) &&
    socket.adapter.rooms.get(roomCode).size > 2
  ) {
    console.log(`${roomCode} already has 3 members`);
  } else {
    socket.leaveAll();
    socket.join(roomCode);
    console.log("SSOCKET1 : ", socketCache);

    if (roomsObj.rooms[roomCode]) {
      // Room Already Exist
      roomsObj.rooms[roomCode][socket.id] = new roomsObj.client(
        socket.id,
        Object.keys(roomsObj.rooms[roomCode]).length + 1
      );
    } else {
      roomsObj.rooms[roomCode] = {};
      roomsObj.rooms[roomCode][socket.id] = new roomsObj.client(
        socket.id,
        Object.keys(roomsObj.rooms[roomCode]).length + 1
      );
    }

    // if (roomCode in socketCache) {
    //   if (!(socket.id in socketCache[roomCode])) {
    //     socketCache[roomCode][socket.id] = {
    //       position: { lineNumber: 1, column: 1 },
    //     };
    //   }
    // } else {
    //   socketCache[roomCode] = {};
    //   socketCache[roomCode][socket.id] = {
    //     position: { lineNumber: 1, column: 1 },
    //   };
    // }
    console.log("SSOCKET1 : ", JSON.stringify(roomsObj));
  }
};

socketCode.on("connection", (socket) => {
  console.log("User Connected with Id: ", socket.id);

  socket.on("join-code", (roomCode) => {
    console.log("ROOM : ", roomCode);
    const { code } = roomCode;
    joinRoom(code, socket);
    console.log("ALL CLIENTS : ", socket.adapter.rooms.get(roomCode.code));
  });

  socket.on("code-change", (event) => {
    const { roomCode, changeText, cursorPosition } = event;
    console.log(
      "CODE_CHANGE:",
      roomCode,
      changeText,
      cursorPosition,
      socket.id
    );
    console.warn("BEFORE: ", socket.adapter.rooms);
    const allMembers = socket.adapter.rooms.get(roomCode);
    console.log(typeof allMembers, allMembers);

    if (allMembers && !allMembers.has(socket.id)) {
      joinRoom(roomCode, socket);
    }

    //update the cursor position
    if (roomsObj.rooms[roomCode] && roomsObj.rooms[roomCode][socket.id])
      roomsObj.rooms[roomCode][socket.id]["position"] = cursorPosition;
    const response = {
      message: changeText,
      sender: socket.id,
      roomDetails: roomsObj.rooms[roomCode],
    };

    console.log("RES : ", response, response.roomDetails);

    socket.broadcast.to(roomCode).emit("code-change", response);
    console.log(
      "ALL CLIENTS CODECHANGE: ",
      socket.adapter.rooms.get(roomCode),
      socketCache
    );
  });

  socket.on("disconnect", () => {
    socket.leaveAll();
  });
});

codeServer.listen("3000", "localhost", () => {
  console.log(`Example app1 listening on port ${3000}`);
});
