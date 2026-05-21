const express = require("express") ;
const router = express.Router() ;
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");


//validatelisting on server side (middleware)
const validateListing = (req, res,next) => {
  let {error} = listingSchema.validate(req.body,{ abortEarly: false });
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(" , ");
    return next(new ExpressError(400, errMsg));
  }
  next();
};

//home route
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find();
  res.render("./listings/home.ejs", { allListings });
}));

//post route
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res,next) => {
    const listing = req.body.listing;
    let listing1 = new Listing(listing);
    await listing1.save();

    res.redirect("./listings");
}));

//new route
router.get("/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id);

  res.render("./listings/edit.ejs", { listing });
}));

//update route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let Id = req.params.id;
    await Listing.findByIdAndUpdate(Id, { ...req.body.listing });

    res.redirect("/listings");
  }),
);

//show route
router.get("/:id", wrapAsync(async (req, res) => {
  let Id = req.params.id;
  const listing = await Listing.findById(Id).populate("reviews");

  res.render("./listings/show.ejs", { listing });
}));

//DELETE route
router.delete("/:id", wrapAsync(async (req, res) => {
  let Id = req.params.id;
  await Listing.findByIdAndDelete(Id);
  res.redirect("/listings");
}));

module.exports=router;