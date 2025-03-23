import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    required: true,
    trim: true,
    type: String,
  },
  quantity: {
    required: true,
    type: Number,
  },
});

const Book = mongoose.model("Book", BookSchema);
export default Book;
