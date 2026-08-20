const express = require("express");
const router = express.Router();
const passport=require("passport");

const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const {savedRedirectUrl} = require("../middleware.js");

const userController=require("../controllers/users.js");

router.get("/signup",userController.signupForm)
  
router.post("/signup",wrapAsync(userController.signup));

router.get("/login",userController.loginForm);

router.post(
    "/login",
    savedRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
);
router.get("/logout",userController.logout);

module.exports=router;