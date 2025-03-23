import Book from "../Models/Books.Model.js";
import cloudinary from "../config/cloudinary.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, quantity } = req.body;

    // Check for file first
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    // Upload to cloudinary using the file path
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "BookStore",
    });

    const newBook = new Book({
      title,
      image: result.secure_url,
      author,
      quantity,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookCount = async (req, res) => {
  try {
    const count = await Book.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookForDashboard = async (req, res) => {
  try {
    const books = await Book.find({}).limit(4);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
