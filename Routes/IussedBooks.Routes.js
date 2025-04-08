import {
  issueBook,
  returnBook,
  getIssuedBookCount,
  overdueBook,
  payFine,
  fine,
} from "../Controllers/IssuedBook.Controller.js";

import express from "express";

const router = express.Router();

router.post("/issuebook", issueBook);
router.put("/returnbook/:id", returnBook);
router.get("/issuedbookcount", getIssuedBookCount);
router.get("/overduebook", overdueBook);
router.put("/payfine/:id", payFine);
router.get("/fine", fine);

export default router;
