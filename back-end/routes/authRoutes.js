const express = require("express");
const router = express.Router();
const { googleAuth, googleCallback } = require("../controllers/login/authController");

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback);

module.exports = router;
