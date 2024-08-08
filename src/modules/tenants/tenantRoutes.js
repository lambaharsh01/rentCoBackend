import express from "express";
const router = express.Router();
import {
  addTenant,
  deleteTenant,
  getTenantInfo,
  editTenant,
} from "./tenantController.js";

router.post("/addTenant", addTenant);
router.delete("/deleteTenant/:tenantId", deleteTenant);
router.get("/getTenantInfo", getTenantInfo);
router.put("/editTenant", editTenant);

export default router;
