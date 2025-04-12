import IssuedBook from "../Models/IssuedBook.Model.js";

export const issueBook = async (req, res) => {
  try {
    const { bookId, userId, issueDate, returnDate } = req.body;
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
    const issuedBooks = await IssuedBook.find({ status: "issued" })
      .populate("bookId", "title") // Only get book title
      .populate("userId", "name") // Only get user name
      .select("bookId userId issueDate returnDate")
      .sort({ issueDate: -1 }) // Sort by issue date in descending order
      .limit(4);

    const formattedData = issuedBooks.map((book) => ({
      id: book._id,
      bookTitle: book.bookId.title,
      userName: book.userId.name,
      issueDate: book.issueDate.toISOString().split("T")[0],
      returnDate: book.returnDate.toISOString().split("T")[0],
    }));

    if (issuedBooks.length === 0) {
      return res.status(404).json({ message: "No issued books found" });
    }
    res.status(200).json(formattedData);
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

export const getIssuedBookCount = async (req, res) => {
  try {
    const count = await IssuedBook.countDocuments({
      issueDate: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    });
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const overduebooks = async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.find({ returnDate: { $lt: new Date() }, status: "issued", overdue: "unpaid" })
      .populate("bookId", "title author") 
      .populate("userId", "name") 
      .select("bookId userId status overdue")
      .sort({ issueDate: -1 })
      .limit(4);

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
    res.status(200).json(formattedData);
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
}


export const totalIssuedBooks = async (req, res) => {
  try {
    const count = await IssuedBook.countDocuments({ status: "issued"});
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const totaloverduebooks = async (req, res) => {
  try {
    const count = await IssuedBook.countDocuments({ overdue: "unpaid" });
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



