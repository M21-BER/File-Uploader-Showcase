const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./db/db");
const cors = require("cors");
const app = express();
const FileRoute = require("./routes/file");
const Files = require("./model/file");

sequelize
  .sync()
  .then((result) => console.log())
  .catch((e) => console.log(e));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(FileRoute);

app.listen(process.env.PORT || 4000, () =>
  console.log("connected on port 4000")
);
