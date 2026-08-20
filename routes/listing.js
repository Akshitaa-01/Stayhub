const express = require("express") ;
const router = express.Router() ;
const wrapAsync=require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner ,validateListing} = require("../middleware.js");

//home route
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find();
  res.render("./listings/home.ejs", { allListings });
}));

//post route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res,next) => {
    const listing = req.body.listing;
    let listing1 = new Listing(listing);
    listing1.owner = req.user._id;
    await listing1.save();
    req.flash("success","New Listing successfully created!!");
    res.redirect("./listings");
}));

//new route
router.get("/new", isLoggedIn,(req, res) => {
  res.render("./listings/new.ejs");
});

//edit route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id);

  res.render("./listings/edit.ejs", { listing });
}));

//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let Id = req.params.id;
    await Listing.findByIdAndUpdate(Id, { ...req.body.listing });
    req.flash("success"," Listing updated successfully!!");
    res.redirect("/listings");
  }),
);

//show route
router.get("/:id", wrapAsync(async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id).populate("reviews").populate("owner");
  if (!listing){
    req.flash("error"," Listing you requested for does not exist!!");
    res.redirect("/listings");
  }else {
    res.render("./listings/show.ejs", { listing });
  }
}));

//DELETE route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
  let Id = req.params.id;
  await Listing.findByIdAndDelete(Id);
  req.flash("success","Listing deleted successfully!!");
  res.redirect("/listings");
}));

module.exports=router;