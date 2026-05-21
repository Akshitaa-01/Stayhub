const express = require("express");
const router = express.Router({ mergeParams:true });
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//validateReview for server side (middleware)
const validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body,{ abortEarly: false});
  if (error){
    let errMsg = error.details.map((el) => el.message).join(" , ");
    return next(new ExpressError(400, errMsg));
  }
  next();
};

//review Post route
router.post("/",validateReview,wrapAsync(async (req,res)=>{
  let Id = req.params.id;
  const listing1 = await Listing.findById(Id);

  const review = req.body.review;
  let newReview = new Review(review);

  listing1.reviews.push(newReview);

  await newReview.save();
  await listing1.save();

  res.redirect(`/listings/${Id}`);
}));

//review delete route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
  let {id,reviewId} = req.params;

  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
}));


module.exports=router;