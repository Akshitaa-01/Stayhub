const Listing = require("../models/listing.js");

module.exports.home=async (req, res) => {
  const {category} = req.query;
  let allListings;
  if (category){
    allListings = await Listing.find({category});
  }else {
    allListings = await Listing.find();
  }

  res.render("./listings/home.ejs", { allListings,category });
};

module.exports.createListing=async (req, res,next) => {
  let url=req.file.path;
  let filename=req.file.filename;
  const listing = req.body.listing;
  let listing1 = new Listing(listing);
  listing1.image.url = url;
  listing1.image.filename = filename;
  listing1.owner = req.user._id;
  await listing1.save();
  req.flash("success","New stay successfully created!!");
  res.redirect("./listings");
};

module.exports.createForm=(req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.editForm=async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id);
  if (!listing){
    req.flash("error","Stay does not exist!");
    res.redirect("./listings");
  }
  let originalImageUrl=listing.image.url;
  res.render("./listings/edit.ejs", { listing,originalImageUrl });
};

module.exports.updateListing=async (req, res) => {
  let Id = req.params.id;
  let listing1 = await Listing.findByIdAndUpdate(Id, { ...req.body.listing });
 
  if (req.file){
    let filename=req.file.filename;
    let url=req.file.path;
    listing1.image = {url,filename} ;
    await listing1.save();
  }
  
  req.flash("success","Stay updated successfully!!");
  res.redirect(`/listings/${Id}`);
};

module.exports.showListing=async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id).populate({
    path:"reviews",
    populate:"author",
  }).populate("owner");
  if (!listing){
    req.flash("error"," Stay you requested for does not exist!!");
    res.redirect("/listings");
  }else {
    res.render("./listings/show.ejs", { listing });
  }
};

module.exports.destroyListing=async (req, res) => {
  let Id = req.params.id;
  await Listing.findByIdAndDelete(Id);
  req.flash("success","Stay deleted successfully!!");
  res.redirect("/listings");
}
