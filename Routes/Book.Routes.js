import {
  addBook,
  getBooks,
  getBookCount,
  getBookForDashboard,
  deleteBook,
  TopChoices,
  BookNames
} from "../Controllers/Books.Controller.js";
import express from "express";

const router = express.Router();

router.post("/addbook", addBook);
router.get("/books", getBooks);
router.get("/bookcount", getBookCount);
router.get("/bookdashboard", getBookForDashboard);
router.delete("/deletebook/:id", deleteBook);
router.get("/topchoices", TopChoices);
router.get("/booknames", BookNames);
export default router;
