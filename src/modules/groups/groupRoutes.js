import express from "express";
const router = express.Router();
import {
  createGroup,
  getAllGroups,
  getGroupInfo,
  deleteGroup,
} from "./groupController.js";

router.post("/createGroup", createGroup);
router.get("/getAllGroups", getAllGroups);
router.get("/getGroupInfo", getGroupInfo);
router.delete("/deleteGroup/:groupId", deleteGroup);

export default router;
