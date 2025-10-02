import express from "express";
import { register, login, getProfile } from "../controller/authController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile); 
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ success: true, message: "Welcome Admin!" });
});

export default router;
