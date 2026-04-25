const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

main()
  .then((res) => {
    console.log("db connection established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/stayhub");
}

const dbInit = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("db is initialized");
};

dbInit();
