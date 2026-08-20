const express = require("express");
const router = express.Router({ mergeParams:true });
const wrapAsync=require("../utils/wrapAsync.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview} = require("../middleware.js");

//review Post route
router.post("/",validateReview,wrapAsync(async (req,res)=>{
  let Id = req.params.id;
  const listing1 = await Listing.findById(Id);

  const review = req.body.review;
  let newReview = new Review(review);

  listing1.reviews.push(newReview);

  await newReview.save();
  await listing1.save();
  req.flash("success","New Review successfully created!!");
  res.redirect(`/listings/${Id}`);
}));

//review delete route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
  let {id,reviewId} = req.params;

  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review successfully deleted!!");
  res.redirect(`/listings/${id}`);
}));


module.exports=router;