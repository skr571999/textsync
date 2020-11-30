const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8000;
const DATA = {
  lastUpdate: new Date().toString(),
  content: "",
};

// app.get("/", async (req, res) => {
//   res.send({ message: "Server Running ..." });
// });

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/website/build/index.html"));
});

app.post("/api/sync", async (req, res) => {
  console.log("Body : ", req.body);
  const lastUpdate = req.body.lastUpdate;
  const content = req.body.content;
  if (Date.parse(DATA.lastUpdate) < Date.parse(lastUpdate)) {
    console.log("Updating");
    DATA.content = content;
    DATA.lastUpdate = lastUpdate;
  }
  res.send({ message: "success", data: DATA });
});

app.listen(PORT, () => console.log(`Serving on ${PORT}`));
