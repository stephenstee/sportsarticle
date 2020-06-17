var express = require("express");
var app = express()
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var methodOverride = require('method-override');
var Sport = require("./models/sports");
var User = require("./models/user");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var LocalStrategy = require("passport-local");
var userRoutes = require("./routes/user");
var sportRoutes = require("./routes/article");

// mongoose.connect("mongodb://localhost/sports", {useNewUrlParser:true, useUnifiedTopology:true});
// console.log(process.env.DATABASEURL);
// mongoose.connet(process.env.DATABASEURL,{useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connect("mongodb+srv://hariharan:hariharan1999@cluster0-wsv1s.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true});
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use(require("express-session")({
	secret: "i am the legend",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.NewUser = req.user;
	next();
})


app.use(userRoutes);
app.use(sportRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("server is started");
})
