const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride = require('method-override')
 
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let port=8080;

main()
 .then((res)=>{
    console.log("db connection established");
 })
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/stayhub');
}

app.listen(port,()=>{
    console.log("server is working");
});

app.get("/",(req,res)=>{
  res.send("root is working ");
});

//home route
app.get("/listings",async (req,res)=>{
  const allListings= await Listing.find();
  res.render("./listings/home.ejs",{allListings});
});

//create route
app.post("/listings", async (req,res)=>{
  const listing=req.body.listing;
  let listing1= await Listing.insertOne(listing);
  listing1.save();
  res.redirect("./listings");
});

//new route
app.get("/listings/new",(req,res)=>{
  res.render("./listings/new.ejs");
});

//edit route
app.get("/listings/:id/edit", async(req,res)=>{
  let Id=req.params.id;
  const listing= await Listing.findById(Id);
  res.render("./listings/edit.ejs",{listing});
});

//update route 
app.put("/listings/:id",async (req,res)=>{
  let Id=req.params.id;
  await Listing.findByIdAndUpdate(Id,{...req.body.listing});
  res.redirect("/listings");
});

//show route
app.get("/listings/:id", async (req,res)=>{
  let Id=req.params.id;
  const listing= await Listing.findById(Id);
  res.render("./listings/show.ejs",{listing});
});







// app.get("/testListing", async (req,res)=>{
//   const listing1= new Listing({
//     title:"my villa",
//     description:"dlbk9ulci",
//     price:1100,
//     location:"goa",
//     country:"india"
//   });

//   await listing1.save();
//   res.send("sample listing successfull");
//   console.log("db works");
// });
