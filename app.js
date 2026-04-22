const express=require("express");
const app=express();
const mongoose=require("mongoose");

let port=8080;

main()
 .then((res)=>{
    console.log("db connection established");
 })
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

app.listen(port,()=>{
    console.log("server is working");
})