const express = require("express") ;
const router = express.Router() ;
const wrapAsync=require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner ,validateListing} = require("../middleware.js");
const listingController=require("../controllers/listings.js");

//home route
router.get("/", wrapAsync(listingController.home));

//post route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing));

//new route
router.get("/new", isLoggedIn,listingController.createForm);

//edit route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.editForm));

//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);

//show route
router.get("/:id", wrapAsync(listingController.showListing));

//DELETE route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports=router;