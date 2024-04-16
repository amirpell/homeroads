const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
    region:{  type:String,
 
       
      },
});


const Regions = mongoose.model("regions",regionSchema);

module.exports = Regions;