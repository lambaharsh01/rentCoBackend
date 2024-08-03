import express from "express";
const router = express.Router();
import { createGroup } from "./groupController.js";

router.post("/createGroup", createGroup);

export default router;
