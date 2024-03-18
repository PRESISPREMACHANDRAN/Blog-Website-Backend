const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config()
const bcrypt = require("bcryptjs");
const { userModel } = require("./Model/UserModel");
const { postModel } = require("./Model/PostModel");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

//connect to mongoDB
mongoose.connect(process.env.mongoDBURL);

//Route for register  (Sign Up)
app.post("/register",async(req,res)=>{
  var data=req.body

let user = await userModel.findOne({
    email: data.email,
  });
  if (!user) {

  var hashedPassword = await hashPassword(data.password);
  data.password = hashedPassword;
  let register = new userModel(data);
  let result = await register.save();
  res.json({ status: "success", data: result });

  } else {
    res.json({status:"email id already exist"})
  }


})

//Route for login
app.post("/login",async(req,res)=>{
  var data=req.body
  
  let user = await userModel.findOne({
    email: data.email,
  });
  if (!user) {
    res.json({ status: "no user found"});
  } else {
    const isMatch=await bcrypt.compare(data.password,user.password)
    if (!isMatch) {
      res.json({ status: "invalid password" });
    } else {
      res.json({ status: "success" ,userID:user._id});
    }
  }

})


//route for CREATE POST
app.post("/createPost", async (req, res) => {
  var data = req.body;
  let post=new postModel(data)
  let result=await post.save()
  res.json({ status: "success", "data": result });
});



//route for VIEW ALL POST
app.post("/viewAll",async(req,res)=>{
   let result=await postModel.find()
    res.json({"status":"success","data":result})
})


//route for VIEW MY POST
app.post("/viewMyPost",async (req, res) => {
  var data = req.body;
    let result=await postModel.find()
  res.json({ status: "success", data: result});
});


app.listen(4000, () => {
  console.log("server starts running.....");
});
