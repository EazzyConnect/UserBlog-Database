const express = require("express");
const router = express.Router();
const {getAllBlogs, getABlog, addABlog, updateBlog}= require ("../controllers/blogController");
const {authorized} = require("../middleware/midAuth")

router.use(express.json());

// all blogs route
router.get("/", getAllBlogs);

//one blog route
router.get("/:id", getABlog);

// add new blog route
router.post("/addblog", authorized, addABlog);

// update blog route
router.patch("/updateblog/:id", authorized, updateBlog);


module.exports = router;