import express from "express";
const router = express.Router();
import { addTransaction, getTransactions } from "./transactionController.js";

router.post("/addTransaction", addTransaction);
router.get("/getTransactions", getTransactions);

export default router;
