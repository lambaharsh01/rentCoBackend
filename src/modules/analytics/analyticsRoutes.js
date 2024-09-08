import express from "express";
const router = express.Router();
import { getConsolidatedReport } from "./analyticsController.js";

router.get("/getConsolidatedReport", getConsolidatedReport);

export default router;
