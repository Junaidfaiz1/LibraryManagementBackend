import {
  issueBook,
  returnBook,
  overduePaid,
  getIssuedBooks,
  overduebooks,
  totalIssuedBooks,
  totaloverduebooks,
  AllIssuedBooks,
  Alloverduebooksdetails
} from "../Controllers/IssuedBook.Controller.js";

import express from "express";

const router = express.Router();

router.post("/issuebook", issueBook);
router.put("/returnbook/:id", returnBook);
router.get("/allissuedbooks", AllIssuedBooks);
router.put("/overduepaid/:id", overduePaid);
router.get("/totalissuedbooks", totalIssuedBooks);
router.get("/totaloverduebooks", totaloverduebooks);
router.get("/getissuedbooks", getIssuedBooks);
router.get("/overduebooks", overduebooks);
router.get("/alloverduebooksdetails", Alloverduebooksdetails);
export default router;
