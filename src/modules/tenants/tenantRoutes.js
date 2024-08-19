import express from "express";
const router = express.Router();
import {
  addTenant,
  deleteTenant,
  getTenantInfo,
  editTenant,
  getAllTenants,
  getAllTenantsWithImage,
} from "./tenantController.js";

router.post("/addTenant", addTenant);
router.delete("/deleteTenant/:tenantId", deleteTenant);
router.get("/getTenantInfo", getTenantInfo);
router.put("/editTenant", editTenant);
router.get("/getAllTenants", getAllTenants);
router.get("/getAllTenantsWithImage", getAllTenantsWithImage);

export default router;
