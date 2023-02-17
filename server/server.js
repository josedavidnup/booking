const { conn } = require("./src/db.js");
const server = require("./src/app.js");
const { port } = require("./utils/config");

conn.sync({ alter: true }).then(async () => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
