import express from "express";
const router = express.Router();
import {
  addTenant,
  deleteTenant,
  getTenantInfo,
  editTenant,
  getAllTenants,
} from "./tenantController.js";

router.post("/addTenant", addTenant);
router.delete("/deleteTenant/:tenantId", deleteTenant);
router.get("/getTenantInfo", getTenantInfo);
router.put("/editTenant", editTenant);
router.get("/getAllTenants", getAllTenants);

export default router;
