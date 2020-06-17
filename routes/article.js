var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Sport = require("../models/sports");

router.get("/",function(req,res){
	res.render("front");
});

//index page

router.get("/home",isLoggedIn,function(req,res){
	Sport.find({},function(err,addsport){
		if(err){
			console.log(err);
		}
		else{
			console.log(addsport);
			res.render("home", {sport:addsport})
		}
	})
	
})
//

// contactus
router.get("/home/contactus",function(req,res){
	res.render("contactus");
})
router.get("/home/aboutus",function(req,res){
	res.render("aboutus")
})



//create
router.post("/home",function(req,res){
	var title = req.body.title;
	var image = req.body.image;
	var description = req.body.description;
	var newarticle = {title:title, image:image, description :description };
	Sport.create(newarticle,function(err,uploadsport){
		if(err){
			console.log(err);
		}
		else{
			console.log(uploadsport);
			res.redirect("/home");
		}
	})
})
//

//admin form
router.get("/home/admin",function(req,res){
	res.render("admin");
})
//

//admin allow page
router.post("/home/admin",function(req,res){
	var userans = "admin";
	var passans = "123";
	var username = req.body.username;
	var password = req.body.password;
	if(userans === username && passans === password )
		{
			res.render("option");
		}
	else{
		res.redirect("/home/admin");
	}
})
//

//new 
router.get("/home/admin/create",function(req,res){
	res.render("new");
})
//

//edit

router.get("/home/edit",function(req,res){
	Sport.find({},function(err, editarticle){
		if(err){
			console.log("error");
		}else{
	          res.render("displayhome", {sport: editarticle});		
		}
	})
	
})

//

//show
router.get("/home/:id",function(req,res){
	 Sport.findById(req.params.id,function(err, newpage){
	 	if(err){
	 		console.log(err);
	 	}
		else{
			console.log(newpage);
	 		res.render("show",{games: newpage});
	 	}
	 })
	
})
//

//edit form
router.get("/home/:id/edit",function(req,res){
	Sport.findById(req.params.id,function(err, editarticle){
		if(err){
			console.log("error");
		}
		else{
	        res.render("edit",{games: editarticle});		
		}
	})
	
})

router.put("/home/:id",function(req,res){
	Sport.findByIdAndUpdate(req.params.id, req.body.sport,function(err, editarticle){
		if(err){
			console.log("error");
		}
		else{
			res.redirect("/home/edit");
		}
	})
})

router.delete("/home/:id",function(req,res){
	Sport.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log("error");
		}
		else{
			res.redirect("/home/edit");
		}
	})
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;