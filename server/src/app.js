const express = require("express");
// const fs = require("fs");
const { readdirSync } = require("fs");
const path = require("path");
const morgan = require("morgan");

const server = express();

readdirSync(path.join(__dirname, "./routes")).map((route) =>
  server.use("/api", require(`./routes/${route}`))
);

module.exports = server;
