const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");

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

app.get("/testListing", async (req,res)=>{
  const listing1= new Listing({
    title:"my villa",
    description:"dlbk9ulci",
    price:1100,
    location:"goa",
    country:"india"
  });

  await listing1.save();
  res.send("sample listing successfull");
  console.log("db works");
});