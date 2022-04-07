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

app.get("/api", async (req, res) => {
  res.send({ message: "Server Running ..." });
});

app.get("/api/data", async (req, res) => {
  res.send({ status: "success", data: DATA });
});

app.post("/api/data", async (req, res) => {
  console.log("Body : ", req.body);

  DATA.value = req.body.value;
  DATA.lastUpdate = req.body.lastUpdate;

  res.send({ status: "success", data: DATA });
});

const server = app.listen(PORT, () => console.log(`Serving on ${PORT}`));

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
  // DATA.users = io.engine.clientsCount;

  if (!DATA[socket.id]) {
    DATA[socket.id] = {
      value: "",
      lastUpdate: "",
      users: 1,
    };
  }

  // socket.broadcast.emit("success", { status: "success", data: DATA });
  io.to(socket.id).emit("success", {
    status: "success",
    data: DATA[socket.id],
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

    io.to(room).emit("success", {
      status: "success",
      data: DATA[room],
    });

    // socket.broadcast.emit("success", { status: "success", data: DATA });
  });

  socket.on("getText", (data) => {
    const room = data.room;
    if (!room) return;
    // socket.emit("success", { status: "success", data: DATA });
    io.to(room).emit("success", {
      status: "success",
      data: DATA[room],
    });
  });

  socket.on("join", (id) => {
    console.log("JOin ", id);
    ++DATA[id].users;
    socket.join(id);
    io.to(id).emit("user", DATA[id].users);
  });

  socket.on("room", () => {
    socket.emit("room", socket.id);
  });

  socket.on("disconnect", () => {
    DATA.users = io.engine.clientsCount;
    // socket.broadcast.emit("success", { status: "success", data: DATA });
    console.log("Client disconnected");
  });
});
