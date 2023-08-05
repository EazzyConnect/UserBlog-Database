const express = require("express");
const app = express();
const {User, Blog} = require("./database/db");
const userRouter = require ("./router/user");
const blogRouter = require ("./router/blogs");
const authRouter = require ("./router/auth");
const bcrypt = require ("bcrypt");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const jwt = require("jsonwebtoken")
const cors = require("colors")



const newUser = require("./model/user");
const newBlog = require("./model/blog");




app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/auth", authRouter);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
 console.log("server is running on 4000");
})
