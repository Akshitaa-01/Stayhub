const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2023/10/21/11/46/sunset-8331285_1280.jpg",
    set: (v) =>
      v === ""
        ? "https://cdn.pixabay.com/photo/2023/10/21/11/46/sunset-8331285_1280.jpg"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
