const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review.js");
const User= require("./user.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    url:String,
    filename:String
  },
  price: Number,
  location: String,
  country: String,
  reviews:[{ 
    type: Schema.Types.ObjectId,
    ref: 'Review'
   }],
   owner:{
    type: Schema.Types.ObjectId,
    ref: 'User'
   },
   category:{
    type:[String],
    enum:["Amazing Pools","Mountain View","Beach nearby","BedRoom","Castles","Forest Cabin","Snowy Escape","Camping Sites","Farm Stay","Cental Hub","Airport Near","Gym Included"]
   }
});

listingSchema.post("findOneAndDelete", async (deletedListing) => {
  if (deletedListing) {
    await Review.deleteMany({
      _id: { $in: deletedListing.reviews },
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
