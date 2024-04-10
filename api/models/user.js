const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joindDate: { type: Date, default: Date.now },
  


  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  verified: {
    type: Boolean,
    default: false,
  },
  changepass :
  {
      type:String 
     
  },
   
  admin: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
});


const User = mongoose.model("User",userSchema);

module.exports = User;