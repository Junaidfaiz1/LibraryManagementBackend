import IssuedBook from "../Models/IssuedBook.Model";



export const issueBook = async (req, res) => {
    try {
        const { bookId, userId, issueDate, returnDate } = req.body;
        const newIssuedBook = new IssuedBook({
            bookId,
            userId,
            issueDate,
            returnDate
        });
        await newIssuedBook.save();
        res.status(200).json({
            message: "Book issued successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getIssuedBookCount = async (req, res) => {
    try {
        const count = await IssuedBook.countDocuments({ issueDate: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } });
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const overdueBook = async (req, res) => {
    try {
        const issuedBooks = await IssuedBook.find({ returnDate: { $lt: new Date() } });
        res.status(200).json(issuedBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const payFine = async (req, res) => {
    try {
        const id = req.params.id;
        const issuedBook = await IssuedBook.findById(id);
        if (issuedBook.overdue === "paid") {
            return res.status(400).json({ message: "Fine already paid" });
        }
        issuedBook.overdue = "paid";
        await issuedBook.save();
        res.status(200).json({ message: "Fine paid successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const fine = async (req, res) => {
    try {
        const fines = await IssuedBook.find({ returnDate: { $lt: new Date() } });
        if (fines.length === 0) {
            return res.status(404).json({ message: "No fines available" });
        }
        const fineDetails = fines.map(book => {
            if (book.overdue === "paid") {
                return {
                    bookId: book.bookId,
                    userId: book.userId,
                    overdueDays: 0,
                    fineAmount: 0,
                    message: "Fine already paid"
                };
            }
            const overdueDays = Math.ceil((new Date() - new Date(book.returnDate)) / (1000 * 60 * 60 * 24));
            const fineAmount = overdueDays * 30; 
            return {
                bookId: book.bookId,
                userId: book.userId,
                overdueDays,
                fineAmount
            };
        });

        res.status(200).json(fineDetails);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
