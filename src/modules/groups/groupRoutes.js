import express from "express";
const router = express.Router();
import {
  createGroup,
  getAllGroups,
  getGroupInfo,
  deleteGroup,
  updateGroup,
} from "./groupController.js";

router.post("/createGroup", createGroup);
router.get("/getAllGroups", getAllGroups);
router.get("/getGroupInfo", getGroupInfo);
router.delete("/deleteGroup/:groupId", deleteGroup);
router.put("/updateGroup", updateGroup);

export default router;
