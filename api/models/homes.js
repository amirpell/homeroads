const mongoose = require("mongoose");

const homesSchema = new mongoose.Schema({
  name: {type: String, },
  price: { type: String},
  title: { type: String },
  joindDate: { type: Date, default: Date.now },
  description: { type: String }, 
  images: { type:String}, 

  bedrooms: { type: String}, 
  baths: { type: String}, 
  homesquremeter: { type: String}, 
  propetysquremeter: { type: String}, 
  videos: { type: String}, 
  serialnum: { type: String}, 
  state: { type: String}, 
  region: { type: String}, 
  street: { type: String}, 
  googlemaps: { type: String}, 
  proptags:{  type:Array,
 
    default: [],
  }
  
});


const Homes = mongoose.model("homes",homesSchema);

module.exports = Homes;