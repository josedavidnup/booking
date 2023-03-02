import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const roomSchema = new Schema({
  title: {
    type: String,
    required: "Title is required",
  },
  content: {
    type: String,
    required: "Content is required",
    maxLength: 10000,
  },
  location: {
    type: String,
  },
  price: {
    type: String,
    required: "Content is required",
  },
});
