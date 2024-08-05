import express from "express";
const router = express.Router();
import { validTenant } from "./tenantController.js";

router.post("/validTenant", validTenant);

export default router;
