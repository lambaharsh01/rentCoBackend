import express from "express";
const router = express.Router();
import { getPendingVisits, addVisit } from "./visitController.js";

router.post("/addVisit", addVisit);
router.get("/getPendingVisits", getPendingVisits);

export default router;
