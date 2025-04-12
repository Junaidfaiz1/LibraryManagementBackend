import {
  issueBook,
  returnBook,
  getIssuedBookCount,
  overduePaid,
  getIssuedBooks,
  overduebooks,
  totalIssuedBooks,
  totaloverduebooks
} from "../Controllers/IssuedBook.Controller.js";

import express from "express";

const router = express.Router();

router.post("/issuebook", issueBook);
router.put("/returnbook/:id", returnBook);
router.get("/issuedbookcount", getIssuedBookCount);
router.put("/overduepaid/:id", overduePaid);
router.get("/totalissuedbooks", totalIssuedBooks);
router.get("/totaloverduebooks", totaloverduebooks);
router.get("/getissuedbooks", getIssuedBooks);
router.get("/overduebooks", overduebooks);

export default router;
