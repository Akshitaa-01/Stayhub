const User = require("../models/user.js");

module.exports.signupForm=(req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser= new User({email,username});
        let registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if (err){
                return next(err);
            }
            req.flash("success","Welcome to StayHub");
            res.redirect("/listings");
        })  
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm=(req,res)=>{
    res.render("./users/login.ejs");
};

module.exports.login=(req, res) => {
    req.flash("success", "Welcome back to Stayhub!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((error)=>{
        if (error){
            return next(error);
        }
        req.flash("success","You successfully logged out!!");
        res.redirect("/listings");
    }
)};