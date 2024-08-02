import express from "express";
import authentication from "./modules/authentication/authenticationRoutes.js";

const router = express.Router();

router.use("/authentication", authentication);

export default router;
