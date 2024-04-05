const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const app = express();
const port = 27017;
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");

app.use(cors(

));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const Homes = require("./models/homes");

mongoose
  .connect("mongodb+srv://someone1969tor:Amirp2404@homeroads.4b3ymiq.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDB");
  });

app.listen(port, () => {
  console.log("server is running on 27017");
});
app.post("/addhome", async (req, res) => {
    try {
      const { 

        name, images ,title,price
        ,description
        ,street,region,state,serialnum,propetysquremeter,homesquremeter,baths
        ,bedrooms,proptags
    
    } = req.body;
  
    
  
      //create a new user
      const newHome = new Homes({

         name, images ,title,price,description
         ,street,region,state,serialnum,
         propetysquremeter,homesquremeter,baths,
         bedrooms,proptags

        });
  
      
      //generate and store the verification token
  
      //save the  user to the database
      await newHome.save();
  
  
      res.status(200).json({ message: "Registration successful" });
    } catch (error) {
      console.log("error registering user", error);
      res.status(500).json({ message: "error registering user" });
    }
  });

  
const multer = require("multer");
const { resolve } = require("path");

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/"); // Specify the desired destination folder
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/get-homes", async (req, res) => {

    try {
      const homes = await Homes.find()
        .populate("name")
        .sort({ createdAt: -1 });
  
      res.status(200).json(homes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while getting the homes" });
    }
  });

  
app.post('/login' , async (req,res) => {
  try{
      const user  = await User.findOne({ email : req.body.email}) 

      if(!user){
          return res.status(200).send({message : " User not exist" , success : false});

      }

      const isMatch = await bcrypt.compare(req.body.password , user.password);
      if(!isMatch){
          return res.status(200).send({message : " Password is incorrect" , success : false});         

          
      }

      else{
          const token = jwt.sign({userId: user._id}, "12345" ,{
              expiresIn: "1d"
          })
          res.send({message:"login successful", success:true , data:token});

      }

  } catch(error){
      console.log(error)
      res.status(500).send({message : "error loggin in" , success: false ,error })
  }
})



// user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
   // const post = await User.findById(userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error while getting the profile" });
  }
});