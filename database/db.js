const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
  title : {type: String, required: true, unique: true},
  body: {type: String, required: true},
  createdby: {type: mongoose.Schema.ObjectId, ref: "user"},
  createdOn: {type: Date, default: Date.now} 
});

const userSchema = new mongoose.Schema({
    name : {type: String, require: true},
    username : {type : String, required : [true, "username must be provided"], unique : true},
    password : {type : String, required : [true, "password must be provided"]},
    userBlogs: [{type: mongoose.Schema.ObjectId, ref: "blog"}],
    createdOn:  {type: Date, default: Date.now}
});


    

const Blog = new mongoose.model("blog", blogSchema);
const User = new mongoose.model("user", userSchema);

mongoose.connect("mongodb://127.0.0.1:27017/blog")
.then(() => console.log("database is running"));

module.exports = {Blog, User}