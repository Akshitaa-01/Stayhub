const express = require("express");
const router = express.Router({ mergeParams:true });
const wrapAsync=require("../utils/wrapAsync.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview} = require("../middleware.js");

const reviewController=require("../controllers/reviews.js");

//review Post route
router.post("/",validateReview,wrapAsync(reviewController.reviewPost));

//review delete route
router.delete("/:reviewId",wrapAsync(reviewController.destroyReviews));


module.exports=router;