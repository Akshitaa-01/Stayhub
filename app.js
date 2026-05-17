const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Joi = require("joi");

const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let port = 8080;

main()
  .then((res) => {
    console.log("db connection established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/stayhub");
}

app.listen(port, () => {
  console.log("server is working");
});

//root 
app.get("/", (req, res) => {
  res.send("root is working ");
});

//validatelisting on server side (middleware)
const validateListing = (req, res,next) => {
  let {error} = listingSchema.validate(req.body,{ abortEarly: false });
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(" , ");
    return next(new ExpressError(400, errMsg));
  }
  next();
};

//validateReview for server side (middleware)
const validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body,{ abortEarly: false});
  if (error){
    let errMsg = error.details.map((el) => el.message).join(" , ");
    return next(new ExpressError(400, errMsg));
  }
  next();
}


//home route
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find();
  res.render("./listings/home.ejs", { allListings });
}));

//post route
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res,next) => {
    const listing = req.body.listing;
    let listing1 = new Listing(listing);
    await listing1.save();

    res.redirect("./listings");
}));

//new route
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id);

  res.render("./listings/edit.ejs", { listing });
}));

//update route
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let Id = req.params.id;
    await Listing.findByIdAndUpdate(Id, { ...req.body.listing });

    res.redirect("/listings");
  }),
);

//show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id).populate("reviews");

  res.render("./listings/show.ejs", { listing });
}));

//DELETE route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let Id = req.params.id;
  await Listing.findByIdAndDelete(Id);
  res.redirect("/listings");
}));
 
//Reviews
//review Post route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async (req,res)=>{
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
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
  let {id,reviewId} = req.params;

  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
}));

//middlewares
//page not found error 
app.use((req, res, next) => {
  next(new ExpressError(404, "page not found!!"));  //next(err) means send to error handling middleware
}); 

//error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!!" } = err;
  res.status(statusCode).render("error.ejs",{message});
});

