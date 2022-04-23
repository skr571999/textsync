const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const {
  addNewRoom,
  getRoomData,
  isRoomExists,
  addUserToRoom,
  getRoomUsers,
  removeUserFromRoom,
  updateRoomData,
  store,
} = require("./server/store");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send({ message: "Server Running ..." });
});

const server = app.listen(PORT, () => console.log(`Serving on ${PORT}`));

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  const roomId = addNewRoom();

  socket.join(roomId);
  socket.roomId = roomId;

  socket.emit("response", {
    status: "success",
    data: getRoomData(roomId),
  });

  socket.on("updateText", (data) => {
    const _roomId = updateRoomData(data);

    socket.broadcast.to(_roomId).emit("response", {
      status: "success",
      data: getRoomData(_roomId),
    });
  });

  socket.on("getText", (data) => {
    const _roomId = data.room;
    if (!_roomId) return;

    // Check here if we can use socket Id to send back
    io.to(_roomId).emit("response", {
      status: "success",
      data: getRoomData(_roomId),
    });
  });

  socket.on("join", (_roomId) => {
    console.log("Join ", _roomId);

    if (!isRoomExists(_roomId)) {
      console.log("Room not exists ", _roomId);
      return;
    }

    socket.leave(socket._roomId);
    socket.join(_roomId);
    socket.roomId = _roomId;

    addUserToRoom(_roomId);

    io.to(_roomId).emit("response", {
      status: "success",
      users: getRoomUsers(_roomId),
      data: getRoomData(_roomId),
    });
  });

  socket.on("room", () => {
    socket.emit("response", { status: "success", room_id: socket.roomId });
  });

  socket.on("disconnect", () => {
    const _roomId = socket.roomId;
    if (isRoomExists(_roomId)) {
      removeUserFromRoom(_roomId);
      io.to(_roomId).emit("response", {
        status: "success",
        users: getRoomUsers(_roomId),
      });
    }
    console.log("Client disconnected from room", _roomId);
  });
});
