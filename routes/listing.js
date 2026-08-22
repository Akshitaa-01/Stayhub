const express = require("express") ;
const router = express.Router() ;
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner ,validateListing} = require("../middleware.js");
const listingController=require("../controllers/listings.js");

//home & post route
router
  .route("/")
  .get( wrapAsync(listingController.home))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing));

//new route
router.get("/new", isLoggedIn,listingController.createForm);

//update & show & delete route
router
 .route("/:id")
 .put(
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
 )
 .get( wrapAsync(listingController.showListing))
 .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.editForm));

module.exports=router;