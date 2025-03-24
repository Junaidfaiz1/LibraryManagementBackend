import Book from "../Models/Books.Model.js";
import cloudinary from "../config/cloudinary.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, quantity, image } = req.body;

    // Check for file first
    if (!image) {
      return res.status(400).json({ message: "Please provide an image" });
    }

    // Upload to cloudinary using the file path
    const result = await cloudinary.uploader.upload(image, {
      folder: "BookStore",
      resource_type: "auto",
    });

    const newBook = new Book({
      title,
      image: result.secure_url,
      author,
      quantity,
    });

    await newBook.save();
    res.status(200).json({
      newBook,
      message: "Book added successfully",
    });
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
    const books = await Book.find({}).limit(4);

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const TopChoices = async (req, res) => {
  try {
    const Bookimg = await Book.find({}).select("image author").limit(10);
    res.status(200).json(Bookimg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
