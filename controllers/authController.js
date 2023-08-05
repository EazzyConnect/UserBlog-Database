const {User} = require ("../database/db");
const {asyncErrorhandler} = require("../errorHandler/asyncerrhandler");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken")
require("dotenv").config();



// Create new user route
module.exports.signUp = asyncErrorhandler(async(req,res)=>{
 // Destructing req.body
 const {password, ...others} = req.body
 // Stating the password requirements
 if(password.length < 6 || password.length >15) return res.json({message: "password length must be between 6-15", success: false})
 // generating salt round
 const salt = await bcrypt.genSalt(10);
 // hashing password
 const hashedPassword = await bcrypt.hash(password, salt);
 // creating a new user
 const newUser = await User.create({...others, password: hashedPassword});
 // Generating a token
 const token = jwt.sign({_id : newUser._id}, process.env.SecretKey)
 res.cookie("authorization", token)
 return res.json({data: newUser, message: " New user created succesfully", success: true})
})


// Login route
module.exports.login = asyncErrorhandler(async(req,res)=>{
 const {username,password} = req.body;
 const user = await User.findOne({username})
 if(!user) return res.json({data: null, message:"User not found!"})
 const check = await bcrypt.compare(password, user.password)
 if (!check){return res.json({data: null, message:"Authentication failed!!!"})}
{
 const token = jwt.sign({_id : user._id}, process.env.SecretKey)
 res.cookie("authorization", token)
 // const token = encryptJWT({user: user.username}, 120);
 // res.cookie("authorization", token, {expire: 120 + Date.now()})
 return res.json({data: user, message: "Welcome, login successful",success: true})
}
}
)

// Logout route
module.exports.logout = asyncErrorhandler(async function(_, res){
 res.cookie("authorization", "", {maxAge : 1})
 return res.json({message: "You have successfully logged out", success: true})
})


// Change Password
module.exports.changePassword = asyncErrorhandler(async function(req,res){
if(req.body.password.length < 6) return res.status(401).json({message: "Password must be greater than 6", success: false})
const hashedPassword = await bcrypt.hash (req.body.password, 10);
await User.updateOne ({_id: req.user._id}, {password: hashedPassword, createdOn: Date.now()})
return res.status(200).json({message: "Password successfully updated", success: true})
})

// // Alternative route for login without hashing password

// module.exports.login = asyncErrorhandler(async(req,res)=>{
// const {username,password} = req.body;
// const user = await User.findOne({username})
// if(!user) return res.json({data: null, message:"User not found!"})
// if(user.password == password){
// return res.json({data: user, message:"Login successful"})
// }else{return res.json({data: null, message:"Authentication failed!!"})}
// })


// // Alternative route for signing up without hashed password

// module.exports.signUp = asyncErrorhandler(async (req,res)=>{
//  const newUser = await User.create(req.body);
//  return res.json({data: newUser, message: " New user created succesfully", success: true})
// })
