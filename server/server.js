const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DATA = {
  lastUpdate: new Date().toString(),
  value: "",
  users: 0,
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
  DATA.users++;

  socket.broadcast.emit("success", { status: "success", data: DATA });

  socket.on("updateText", (data) => {
    const lastUpdate = data.lastUpdate;
    const value = data.value;
    // console.log("UPDATED : ", DATA.value);

    if (Date.parse(DATA.lastUpdate) < Date.parse(lastUpdate)) {
      DATA.value = value;
      DATA.lastUpdate = lastUpdate;
    }
    socket.broadcast.emit("success", { status: "success", data: DATA });
  });

  socket.on("getText", () => {
    socket.emit("success", { status: "success", data: DATA });
  });

  socket.on("disconnect", () => {
    DATA.users--;
    socket.broadcast.emit("success", { status: "success", data: DATA });
    console.log("Client disconnected");
  });
});
