import express from "express";
const router = express.Router();
import {
  getVisits,
  addVisit,
  getVisitInfo,
  getLastVisitInfo,
} from "./visitController.js";

router.post("/addVisit", addVisit);
router.get("/getVisits", getVisits);
router.get("/getVisitInfo", getVisitInfo);
router.get("/getLastVisitInfo", getLastVisitInfo);

export default router;
