const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DATA = {
  room_id: {
    value: "",
    lastUpdate: "",
    users: 0,
  },
};

const PORT = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  res.send({ message: "Server Running ..." });
});

const server = app.listen(PORT, () => console.log(`Serving on ${PORT}`));

const generateRandomText = (length) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  const roomId = generateRandomText(6);

  if (!DATA[roomId]) {
    DATA[roomId] = {
      value: "",
      lastUpdate: "",
      users: 1,
    };
  }

  socket.join(roomId);
  socket.roomId = roomId;

  socket.emit("response", {
    status: "success",
    data: DATA[roomId],
  });

  socket.on("updateText", (data) => {
    const lastUpdate = data.lastUpdate;
    const value = data.value;
    const room = data.room;
    if (!room) return;

    if (DATA[room].lastUpdate < lastUpdate) {
      DATA[room].value = value;
      DATA[room].lastUpdate = lastUpdate;
    }

    socket.broadcast.to(room).emit("response", {
      status: "success",
      data: DATA[room],
    });
  });

  socket.on("getText", (data) => {
    const room = data.room;
    if (!room) return;

    io.to(room).emit("response", {
      status: "success",
      data: DATA[room],
    });
  });

  socket.on("join", (roomId) => {
    console.log("JOin ", roomId);
    if (!DATA[roomId]) {
      DATA[roomId] = {
        value: "",
        lastUpdate: "",
        users: 0,
      };
    }
    ++DATA[roomId].users;
    socket.leave(socket.roomId);
    socket.join(roomId);
    socket.roomId = roomId;
    io.to(roomId).emit("response", {
      status: "success",
      users: DATA[roomId].users,
      data: DATA[roomId],
    });
  });

  socket.on("room", () => {
    socket.emit("response", { status: "success", room_id: socket.roomId });
  });

  socket.on("disconnect", () => {
    const id = socket.roomId;
    if (DATA[id]) {
      --DATA[id].users;
      io.to(id).emit("response", { status: "success", users: DATA[id].users });
    }
    console.log("Client disconnected from room", id);
  });
});
