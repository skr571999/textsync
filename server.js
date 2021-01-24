const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8000;
const DATA = {
  lastUpdate: new Date().toString(),
  value: "",
};

// app.use(express.static(path.join(__dirname, "website", "build")));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "website", "build", "index.html"));
// });

// app.listen(9000);

app.get("/api", async (req, res) => {
  res.send({ message: "Server Running ..." });
});

app.post("/api/sync", async (req, res) => {
  console.log("Body : ", req.body);

  const lastUpdate = req.body.lastUpdate;
  const value = req.body.value;

  if (Date.parse(DATA.lastUpdate) < Date.parse(lastUpdate)) {
    DATA.value = value;
    DATA.lastUpdate = lastUpdate;
  }
  res.send({ message: "success", data: DATA });
});

app.listen(PORT, () => console.log(`Serving on ${PORT}`));
