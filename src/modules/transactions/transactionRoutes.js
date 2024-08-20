import express from "express";
const router = express.Router();
import {
  addTransaction,
  getTransactions,
  getTransactionInfo,
} from "./transactionController.js";

router.post("/addTransaction", addTransaction);
router.get("/getTransactions", getTransactions);
router.get("/getTransactionInfo", getTransactionInfo);

export default router;
