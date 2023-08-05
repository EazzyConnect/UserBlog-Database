const express = require("express");
const router = express.Router();
const {getAllUsers, getOneUser, updateAUser, deleteUser}= require ("../controllers/userController");
const {authorized} = require ("../middleware/midAuth")

router.use(express.json());


// Get all user route
router.get("/", authorized, getAllUsers);

// Get one user route
router.get("/:id", authorized, getOneUser);

// Update route
router.patch("/update/:id", authorized, updateAUser);

// Delete route
router.delete("/delete/:id", authorized, deleteUser);

module.exports = router;