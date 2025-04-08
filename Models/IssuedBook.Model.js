
import mongoose from "mongoose";


const IssuedBookSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["issued", "returned"],
        default: "issued"
    },
    overdue:{
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid",
    },
});

const IssuedBook = mongoose.model("IssuedBook", IssuedBookSchema);
export default IssuedBook;