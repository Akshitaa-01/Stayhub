const Listing = require("../models/listing.js");

module.exports.home=async (req, res) => {
  const allListings = await Listing.find();
  res.render("./listings/home.ejs", { allListings });
};

module.exports.createListing=async (req, res,next) => {
  const listing = req.body.listing;
  let listing1 = new Listing(listing);
  listing1.owner = req.user._id;
  await listing1.save();
  req.flash("success","New Listing successfully created!!");
  res.redirect("./listings");
};

module.exports.createForm=(req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.editForm=async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id);

  res.render("./listings/edit.ejs", { listing });
};

module.exports.updateListing=async (req, res) => {
  let Id = req.params.id;
  await Listing.findByIdAndUpdate(Id, { ...req.body.listing });
  req.flash("success"," Listing updated successfully!!");
  res.redirect("/listings");
};

module.exports.showListing=async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id).populate({
    path:"reviews",
    populate:"author",
  }).populate("owner");
  if (!listing){
    req.flash("error"," Listing you requested for does not exist!!");
    res.redirect("/listings");
  }else {
    res.render("./listings/show.ejs", { listing });
  }
};

module.exports.destroyListing=async (req, res) => {
  let Id = req.params.id;
  await Listing.findByIdAndDelete(Id);
  req.flash("success","Listing deleted successfully!!");
  res.redirect("/listings");
}
