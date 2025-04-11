import {
  issueBook,
  returnBook,
  getIssuedBookCount,


  getIssuedBooks,
  getIssuedBooksdetails
} from "../Controllers/IssuedBook.Controller.js";

import express from "express";

const router = express.Router();

router.post("/issuebook", issueBook);
router.put("/returnbook/:id", returnBook);
router.get("/issuedbookcount", getIssuedBookCount);


router.get("/getissuedbooks", getIssuedBooks);
router.get("/overduebooks", getIssuedBooksdetails);

export default router;
