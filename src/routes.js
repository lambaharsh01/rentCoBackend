import express from "express";
import authenticateRequest from "./middleware/authenticateRequest.js";
import authentication from "./modules/authentication/authenticationRoutes.js";


const router = express.Router();

router.use("/authentication", authentication);

export default router;
