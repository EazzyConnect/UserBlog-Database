const {User} = require("../database/db");
const jwt = require("jsonwebtoken");
const {asyncErrorhandler} = require("../errorHandler/asyncerrhandler");


module.exports.authorized = asyncErrorhandler(async function(req,res,next){
    // check if token exist
    const token = req.cookies.authorization
    if(!token) return res.status(401).json({message : "Authentication failed, please log in", success : true, data : null})
      // check if token is valid
      const decodedeData = jwt.verify(token, process.env.SecretKey)
      // fetching back the user contained in the token
      const user = await User.findById(decodedeData._id).populate("userBlogs")
      const iat = decodedeData.iat * 1000;
      const update = new Date(user.createdOn).getTime()
      // console.log(iat, update, user);
      if(iat < update) return res.status(401).json({message: "Authorization failed!!!", success: false})
      // check if user exists
      if(!user) return res.json({data: user, message : "No user found", success : false})
    // if they all checks out call next
        req.user = user;
    next()
    // if not we want to respond with an error
})
