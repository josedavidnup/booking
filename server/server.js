const { PORT } = require("./utils/config");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// conn.sync({ alter: true }).then(async () => {
server.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
// });
