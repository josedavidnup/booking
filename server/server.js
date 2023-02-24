const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const { readdirSync } = require("fs");
const { port } = require("./utils/config");
const path = require("path");
const { mongoUri } = require("./utils/config");

// app
const server = express();

//db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUri)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

//middlewares
server.use(cors());
server.use(morgan("dev"));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());

//Routes middlewares
readdirSync(path.join(__dirname, "./routes")).map((route) =>
  server.use("/api", require(`./routes/${route}`))
);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
