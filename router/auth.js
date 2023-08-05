const express = require ("express");
const {login, signUp, logout, changePassword} = require ("../controllers/authController");
const { authorized } = require("../middleware/midAuth");
const router = express.Router();

router.use(express.json())


// Login route
router.post("/login", login);

// Sign up route
router.post("/signup", signUp);

// Logout route
router.post("/logout", logout);

// Change Password route
router.post("/changepassword", authorized, changePassword);

module.exports = router;