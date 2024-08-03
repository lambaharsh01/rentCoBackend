import express from "express";
import authenticateRequest from "./middleware/authenticateRequest.js";
import authentication from "./modules/authentication/authenticationRoutes.js";
import groups from "./modules/groups/groupRoutes.js";

const router = express.Router();

router.use("/authentication", authentication);
router.use("/group", authenticateRequest, groups);

export default router;
