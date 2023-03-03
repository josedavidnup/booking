const Room = require("../schemas/room.schema");
const fs = require("fs");

const create = async (req, res) => {
  // console.log("req.files", req.files);
  // console.log("req.fields", req.fields);
  try {
    let fields = req.fields;
    let files = req.files;

    const room = new Room(fields);

    if (files.image) {
      room.image.data = fs.readFileSync(files.image.path);
      room.image.contentType = files.image.type;
    }

    room.save((err, result) => {
      if (err) {
        console.log("saving room error");
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const rooms = async (req, res) => {
  const all = await Room.find({}).limit(24).select("-image.data");
};

module.exports = {
  create,
  rooms,
};
