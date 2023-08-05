const {Blog, User} = require("../database/db");
const {asyncErrorhandler} = require("../errorHandler/asyncerrhandler");
const jwt = require("jsonwebtoken")

// Get all blogs
module.exports.getAllBlogs = asyncErrorhandler(async (req,res)=>{
 const allBlogs = await Blog.find({});
 return res.json({data: allBlogs, message: "This is the list of all blogs"});
})

// get One blog
module.exports.getABlog = asyncErrorhandler(async (req,res)=>{
 const id = req.params.id;
 const blog = await Blog.findOne({_id: id}).populate("createdby", "-password");
 // .populate("createdby") returns every user data
 return res.json({data: blog, message: "This is a blog"});
})

// Add a blog
module.exports.addABlog = asyncErrorhandler(async (req,res)=>{
 const newBlog = await Blog.create({...req.body, createdby: req.user.id});
 await User.updateOne({_id: req.user.id}, {$push: {userBlogs: newBlog.id}})
 return res.json({message: "New blog added", success: true})
})

// Add a blog
// module.exports.addABlog = asyncErrorhandler(async (req,res)=>{
//  const newBlog = await Blog.create(req.body);
//  await User.updateOne({_id: req.body.createdby}, {$push: {userBlogs: newBlog.id}})
//  return res.json({message: "New blog added", success: true})
// })


// Update a blog
module.exports.updateBlog = asyncErrorhandler(async(req,res)=>{
 const blog = await Blog.findOne({_id: req.params.id, createdby: req.user.id})
 if (!blog) return res.json({message: "You are unathorized to perform this action", success: false})
 await Blog.updateOne({_id: req.params.id}, req.body);
 return res.json({message: "Blog updated succesfully", success: true})
})

// // Update a blog
// module.exports.updateBlog = asyncErrorhandler(async(req,res)=>{
//  await Blog.updateOne({_id: req.params.id}, req.body);
//  return res.json({message: "Blog updated succesfully", success: true})
// })
