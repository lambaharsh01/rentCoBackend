import express from "express";
const router = express.Router();
import { createGroup, getAllGroups, getGroupInfo } from "./groupController.js";

router.post("/createGroup", createGroup);
router.get("/getAllGroups", getAllGroups);
router.get("/getGroupInfo", getGroupInfo);

export default router;
