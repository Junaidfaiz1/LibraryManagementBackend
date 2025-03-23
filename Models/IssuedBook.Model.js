import e from "express";
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
        enum: ["issued", "returned"],
        default: "issued"
    },
    fine: {
        type: Number,
        default: 0
    }

});

const IssuedBook = mongoose.model("IssuedBook", IssuedBookSchema);
export default IssuedBook;