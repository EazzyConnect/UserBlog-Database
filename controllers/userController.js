const {User} = require("../database/db");
const {asyncErrorhandler} = require("../errorHandler/asyncerrhandler");


// Get all users
module.exports.getAllUsers = asyncErrorhandler(async function(req, res){
const allUser = await User.find({}, "-password");
res.json({data : allUser, success : true, message: "This is list of all users found"})
})

// Get one user
module.exports.getOneUser = asyncErrorhandler(async function(req, res){
const id = req.params.id;
const oneUser = await User.findById({_id: id}, "-password").populate("userBlogs");
res.json({data : oneUser, success : true, message: "one user found"})
})

// Update one user
module.exports.updateAUser = asyncErrorhandler(async function(req, res){
// const id = req.params.id;
const updateUser = await User.updateOne({_id : req.params.id}, req.body);
res.json({data : updateUser, message: "update successful" ,success : true})
})

// Delete a user
module.exports.deleteUser = asyncErrorhandler(async function (req, res){
 const deleteUser = await User.deleteOne({_id: req.params.id})
 res.json({data : deleteUser, message: "User deleted successfully" ,success : true})
})