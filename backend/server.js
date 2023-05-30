const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const { PythonShell } = require("python-shell");
require("dotenv").config({ path: "./config.env" });
const prediction = require("./routes/prediction");

const mongoose = require("mongoose");

//build database connection
const connectDB = require("./conn/db");
dotenv.config();
connectDB();

//getting port number
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});

//server starting to listning
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.white.bold)
);
if (server) {
  console.log("Success".green.bold);
}

app.use("/api/prediction", prediction);

