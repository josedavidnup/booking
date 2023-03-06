const Room = require("../schemas/room.schema");
const fs = require("fs");

const create = async (req, res) => {
  // console.log("req.files", req.files);
  // console.log("req.fields", req.fields);
  try {
    let fields = req.fields;
    let files = req.files;

    const room = new Room(fields);
    room.postedBy = req.user._id;

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
  try {
    const all = await Room.find({})
      .limit(24)
      .select("-image.data")
      .populate("postedBy", "_id name")
      .exec();

    res.json(all);
  } catch (error) {
    console.log(error);
  }
};

const image = async (req, res) => {
  const room = await Room.findById(req.params.roomId).exec();
  if (room && room.image && room.image.data !== null) {
    res.set("Content-Type", room.image.contentType);
    return res.send(room.image.data);
  }
};

const sellerRooms = async (req, res) => {
  const all = await Room.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  return res.send(all);
};

const remove = async (req, res) => {
  const removed = await Room.findByIdAndDelete(req.params.roomId)
    .select("-image.data")
    .exec();

  return res.json(removed);
};

const read = async (req, res) => {
  const room = await Room.findById(req.params.roomId)
    .select("-image.data")
    .exec();
  console.log(room);
  return res.json(room);
};

module.exports = {
  create,
  rooms,
  image,
  sellerRooms,
  remove,
  read,
};
