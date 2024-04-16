const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const app = express();
const port = 27017;
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

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
        ,bedrooms,proptags,imagespack,regiontags,youtube
    
    } = req.body;
  
    
  
      //create a new user
      const newHome = new Homes({

         name, images ,title,price,description
         ,street,region,state,serialnum,
         propetysquremeter,homesquremeter,baths,
         bedrooms,proptags,imagespack,regiontags,youtube

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
const Regions = require("./models/regions");

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

    //  const isMatch = await bcrypt.compare(req.body.password , user.password);
      if (user.password !== req.body.password) {
        return res.status(404).json({ message: "Invalid password" });
      }
      if (user.verified===false) {
        return res.status(404).json({ message: "please verify your email" });
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
app.post('/adminlogin' , async (req,res) => {
  try{
      const user  = await User.findOne({ email : req.body.email}) 

      if(!user){
          return res.status(200).send({message : " User not exist" , success : false});

      }

    //  const isMatch = await bcrypt.compare(req.body.password , user.password);
      if (user.password !== req.body.password) {
        return res.status(404).json({ message: "Invalid password" });
      }
      if (user.verified===false) {
        return res.status(404).json({ message: "please verify your email" });
      }
      if (user.admin===false) {
        return res.status(404).json({ message: "access denied" });
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

app.post("/register", async (req, res) => {
  try {
    const {email, password  , firstname , phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //create a new user
    const newUser = new User({ 
       email, password , firstname , phone });

    
    //generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the  user to the database
    await newUser.save();

    //send the verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "error registering user" });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transporter

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amirpb87@gmail.com",
      pass: "zuzihuzontqijepr",
    },
  });

  //compose the email message
  const mailOptions = {
    from: "TripLink",
    to: email,
    subject: "Email Verification",
    text: `Hi there! Thank you for signing up for TripLink,to get started, we need to verify your email address.
    simply click the link to verify your email address: http://10.0.0.10:27017/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error sending email", error);
  }
};


app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error getting token", error);
    res.status(500).json({ message: "Email verification failed" });
  }
});

const sendPasswordToken= async (email, changepass) => {
  //create a nodemailer transporter

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amirpb87@gmail.com",
      pass: "zuzihuzontqijepr",
    },
  });
    //compose the email message

  const mailOptions = {
    from: "TripLink",
    to: email,
    subject: "Email Verification",
    text: `  your secret key to reset password : ${changepass}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error sending email", error);
  }
};
app.post('/forgotpassword', async (req, res) => {
  try {
     
      const user= await User.findOne({email : req.body.email})
      if(!user) return res.status(400).send({ message: "Email not found" });
     await  User.updateOne
     ({email : user.email } ,{ changepass: crypto.randomBytes(2).toString("hex")}
     , 
     
     sendPasswordToken(user.email, user.changepass)
     
     )
 
     

      res.status(200).json({ message: "Email sent successfully",success: true });
      console.log(user.email)
      console.log(user.changepass)

  } catch (error) {
    console.log("error getting token", error);
    res.status(500).json({ message: "Email verification failed" });
  }
});

app.post('/entertoken', async (req, res) => {
  try {
     
      const user= await User.findOne({email : req.body.email})
      console.log(" reset" ,user.email )

      const resetcode = user.changepass;
      
      const inputresetcode = req.body.changepass
    

      if(resetcode == inputresetcode){
         res.status(200).json({ message: "success" ,success: true });
          await User.updateOne({email : user.email ,changepass: null } )

  
      }
      else {
          res.status(404).json({ message: "code fail" ,success: false });

      }
  } catch (error) {
  

    res.status(500).json({ message: "Email verification failed" });
  }
});

app.post('/updatepassword', async (req, res) => {
  try {
     
      const user= await User.findOne({email : req.body.email})
      const newpassword = req.body.newpassword
      const newpasswordagain = req.body.newpasswordagain
    //  const salt = await bcrypt.genSalt(10);


      if(newpassword == newpasswordagain){
          res.status(200).json({ message: "password changed" ,success: true });

        //  const hashedPassword= await bcrypt.hash(newpassword , salt);
       //   req.body.password = hashedPassword;
          await User.updateOne({email : user.email ,password: newpassword } )

      }
      else {
          res.status(200).json({ message: "password dosnt match" ,success: false });

      }
  } catch (error) {
    console.log("error getting token", error);
    console.log(" reset" ,resetcode )
    console.log(inputresetcode ," resetinput"  )

    res.status(500).json({ message: "Email verification failed" });
  }
});







app.post("/addregion", async (req, res) => {
  try {
    const { 

      region
  
  } = req.body;

  

    //create a new user
    const newRegion = new Regions({

      region

      });

    
    //generate and store the verification token

    //save the  user to the database
    await newRegion.save();


    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "error registering user" });
  }
});

app.get("/get-regions", async (req, res) => {

  try {
    const regions = await Regions.find()
      .populate("region")
      .sort({ createdAt: -1 });

    res.status(200).json(regions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while getting the regions" });
  }
});
