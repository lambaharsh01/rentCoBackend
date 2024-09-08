import express from "express";
import authenticateRequest from "./middleware/authenticateRequest.js";
import authentication from "./modules/authentication/authenticationRoutes.js";
import groups from "./modules/groups/groupRoutes.js";
import tenants from "./modules/tenants/tenantRoutes.js";
import visits from "./modules/visits/visitRoutes.js";
import transactions from "./modules/transactions/transactionRoutes.js";
import analytics from "./modules/analytics/analyticsRoutes.js";

const router = express.Router();

router.use("/authentication", authentication);
router.use("/group", authenticateRequest, groups);
router.use("/tenant", authenticateRequest, tenants);
router.use("/visit", authenticateRequest, visits);
router.use("/transaction", authenticateRequest, transactions);
router.use("/analytics", authenticateRequest, analytics);

export default router;
