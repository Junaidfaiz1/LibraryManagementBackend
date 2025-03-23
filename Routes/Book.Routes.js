import {
  addBook,
  getBooks,
  getBookCount,
  getBookForDashboard,
  deleteBook,
} from "../Controllers/Books.Controller.js";
import express from "express";

const router = express.Router();

router.post("/addbook", addBook);
router.get("/books", getBooks);
router.get("/bookcount", getBookCount);
router.get("/bookdashboard", getBookForDashboard);
router.delete("/deletebook/:id", deleteBook);

export default router;
