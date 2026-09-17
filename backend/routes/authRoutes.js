const express = require("express");

const {
  registerUser,
  loginUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getCurrentUser);

router.post(
  "/forgot-password",
  forgotPassword
);

// Reset Password
router.post(
  "/reset-password",
  resetPassword
);

module.exports = router;