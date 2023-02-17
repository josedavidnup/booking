const express = require("express");
const { readdirSync } = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

// app
const server = express();

//middlewares
server.use(cors());
server.use(morgan("dev"));
server.use(express.json({ limit: "50mb" }));

//Routes middlewares
readdirSync(path.join(__dirname, "./routes")).map((route) =>
  server.use("/api", require(`./routes/${route}`))
);

module.exports = server;
