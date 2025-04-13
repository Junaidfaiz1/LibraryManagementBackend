import Book from "../Models/Books.Model.js";
import IssuedBook from "../Models/IssuedBook.Model.js";

export const issueBook = async (req, res) => {
  try {
    const { bookId, userId, issueDate, returnDate } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    book.quantity -= 1;
    await book.save();

    const newIssuedBook = new IssuedBook({
      bookId,
      userId,
      issueDate,
      returnDate,
    });
    await newIssuedBook.save();
    res.status(200).json({
      message: "Book issued successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIssuedBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    //  Step 1: Clean up invalid records
    await IssuedBook.deleteMany({
      $or: [{ bookId: null }, { userId: null }],
    });

    // Get total valid records
    const totalCount = await IssuedBook.countDocuments({ status: "issued" });

    //  Paginated and populated fetch
    const issuedBooks = await IssuedBook.find({ status: "issued" })
      .populate("bookId", "title")
      .populate("userId", "name")
      .select("bookId userId issueDate returnDate")
      .sort({ issueDate: -1 })
      .skip(skip)
      .limit(limit);

    //  Format response
    const formattedData = issuedBooks.map((book) => ({
      id: book._id,
      bookTitle: book.bookId?.title || "Book Removed",
      userName: book.userId?.name || "Student Removed",
      issueDate: book.issueDate.toISOString().split("T")[0],
      returnDate: book.returnDate.toISOString().split("T")[0],
    }));

    //  Handle empty data
    if (issuedBooks.length === 0) {
      return res.status(404).json({ message: "No issued books found" });
    }

    // Return paginated response
    res.status(200).json({
      formattedData,
      pages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const id = req.params.id;
    const issuedBook = await IssuedBook.findById(id);
    if (issuedBook.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }
    issuedBook.status = "returned";
    await issuedBook.save();
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const overduebooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const totalCount = await IssuedBook.countDocuments({
      $and: [{ returnDate: { $lt: new Date() } }, { overdue: "unpaid" }],
    });

    const issuedBooks = await IssuedBook.find({
      $and: [
        { returnDate: { $lt: new Date() } },
        { status: "issued" },
        { overdue: "unpaid" },
      ],
    })
      .populate("bookId", "title author")
      .populate("userId", "name")
      .select("bookId userId status overdue")
      .sort({ issueDate: -1 })
      .limit(limit)
      .skip(skip);

    const formattedData = issuedBooks.map((book) => ({
      id: book._id,
      bookTitle: book.bookId.title,
      userName: book.userId.name,
      status: book.status,
      overdue: book.overdue,
      author: book.bookId.author,
    }));

    if (issuedBooks.length === 0) {
      return res.status(404).json({ message: "No issued books found" });
    }
    res.status(200).json({
      formattedData,
      pages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const overduePaid = async (req, res) => {
  try {
    const id = req.params.id;
    const issuedBook = await IssuedBook.findById(id);
    if (issuedBook.overdue === "paid") {
      return res.status(400).json({ message: "Overdue already paid" });
    }
    issuedBook.overdue = "paid";
    await issuedBook.save();
    res.status(200).json({ message: "Overdue paid successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const totalIssuedBooks = async (req, res) => {
  try {
    const count = await IssuedBook.countDocuments({ status: "issued" });
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const totaloverduebooks = async (req, res) => {
  try {
    const count = await IssuedBook.countDocuments({
      $and: [{ returnDate: { $lt: new Date() } }, { overdue: "unpaid" }],
    });
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
