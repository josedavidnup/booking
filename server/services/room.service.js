const User = require("../schemas/user.schema");
const Room = require("../schemas/room.schema");
const Order = require("../schemas/order.schema");
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
    const all = await Room.find({ from: { $gte: new Date() } })
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
    .populate("postedBy")
    .select("-image.data")
    .exec();
  return res.json(room);
};

const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;
      data.image = image;
    }

    const updated = await Room.findByIdAndUpdate(req.params.roomId, data, {
      new: true,
    }).select("image.data");

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const userRoomBookings = async (req, res) => {
  const all = await Order.find({ orderedBy: req.user._id })
    .select("session")
    .populate("room", "-image.data")
    .populate("orderedBy", "_id name")
    .exec();
  return res.json(all);
};

const isAlreadyBooked = async (req, res) => {
  const { roomId } = req.params;
  const userOrders = await Order.find({ orderedBy: req.user._id })
    .select("room")
    .exec();

  let ids = [];

  for (let i = 0; i < userOrders.length; i++) {
    ids.push(userOrders[i].room.toString());
  }

  return res.json({
    ok: ids.includes(roomId),
  });
};

module.exports = {
  create,
  rooms,
  image,
  sellerRooms,
  remove,
  read,
  update,
  userRoomBookings,
  isAlreadyBooked,
};
