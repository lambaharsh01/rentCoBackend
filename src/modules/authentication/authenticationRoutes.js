import express from "express";
const router = express.Router();
import {
  sendVerificationCode,
  verifyUserEmail,
  setUserPassword,
  loginAuthentication,
} from "./authenticationController.js";

router.post("/sendVerificationCode", sendVerificationCode);
router.post("/verifyUserEmail", verifyUserEmail);
router.put("/setUserPassword", setUserPassword);
router.post("/loginAuthentication", loginAuthentication);

export default router;
