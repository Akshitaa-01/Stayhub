const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Joi = require("joi");
const session = require('express-session');

const ExpressError = require("./utils/ExpressError.js")
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const sessionOptions={
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(session(sessionOptions));
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

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews );

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