import express from "express";
const router = express.Router();
import { getVisits, addVisit, getVisitInfo } from "./visitController.js";

router.post("/addVisit", addVisit);
router.get("/getVisits", getVisits);
router.get("/getVisitInfo", getVisitInfo);

export default router;
