const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser =require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.use(express.static('./public'));
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


/*
const transporter = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: "lovishagrawal@outlook.com",
		pass: "Jungle05@"
	}
});

function sendEmail(email){
	const data = {
		from: "lovishagrawal@outlook.com",
		to: email,
		subject: "Invitation for the wedding ceremony",
		html:
		`<h2>You're Invited</h2>
		<p>You have been invited for the ceremony</p>`
	}

	transporter.sendMail(data, function(err, info){
		if(err){
			console.log(err);
			return;
		}
		console.log("sent:" + info.response);
	});
}
*/

app.listen(3000, function(req, res){
	console.log("Listening at port 3000");
});

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = {
	name: String,
	email: String,
	password: String
};

const User = new mongoose.model("user", userSchema);

const photographerSchema = {
	name: String,
	email: String,
	mobile_no: String,
	about: String,
	city: String,
	state: String,
	exp: String,
	time: String,
	piccnt: String,
	pricing: [{
		title: String,
		price: String
	}],
	imgUrl: String
};


const panditSchema = {
	name: String,
	email: String,
	mobile_no: String,
	about: String,
	city: String,
	state: String,
	exp: String,
	time: String,
	culture: String,
	pricing: [{
		title: String,
		price: String
	}],
	imgUrl: String
};

const jewellerSchema = {
	name: String,
	email: String,
	mobile_no: String,
	about: String,
	city: String,
	state: String,
	time: String,
	imgUrl: String
};

const makeupSchema = {
	name: String,
	email: String,
	mobile_no: String,
	about: String,
	city: String,
	state: String,
	exp: String,
	time: String,
	mkpcnt: String,
	pricing: [{title: String, price: String}],
	imgUrl: String
};

const catererSchema = {
	name: String,
	email: String,
	mobile_no: String,
	about: String,
	city: String,
	state: String,
	exp: String,
	time: String,
	maxcap: String,
	mincap: String,
	pricing: [{
		title: String,
		price: String,
	}],
	imgUrl: String
};

const invitationcardSchema = {
	name: String,
	email: String,
	mobile_no: String,
	about: String,
	city: String,
	state: String,
	exp: String,
	time: String,
	min: String,
	max: String,
	price: String,
	imgUrl: String
};

const guestSchema = {
	name: String,
	noOfAttendees: Number,
	contactNumber: String,
	emailId: String
};
const eventSchema = {
	name: String,
	date: String,
	startTime: String,
	endTime: String,
	message: String,
	guest: [guestSchema]
};

const entertainmentSchema = {
	name: String,
	email: String,
	mobile_no: String,
	about: String,
	city: String,
	state: String,
	exp: String,
	time: String,
	pricing: String, 
	imgUrl: String
};


const Guest = mongoose.model("Guest", guestSchema);
const Event = mongoose.model("Event", eventSchema);


const Entertainment = mongoose.model("Entertainment", entertainmentSchema);
const Photographer = mongoose.model("Photographer", photographerSchema);
const Pandit = mongoose.model("Pandit", panditSchema);
const Jeweller = mongoose.model("Jeweller", jewellerSchema);
const Makeup = mongoose.model("Makeup", makeupSchema);
const Caterer = mongoose.model("Caterer", catererSchema);
const InvitatonCard = mongoose.model("InvitationCard", invitationcardSchema);

app.get("/login", function(req, res){
	res.sendFile(__dirname + "/login.html");
});

app.post("/register", function(req, res){
	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	newUser.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/");
		}
	});
});

// app.get("/", function(req, res){
// 	res.sendFile(__dirname + "/index.html");
// })

app.post("/login", function(req, res){
	const username = req.body.email;
	const password = req.body.password;

	User.findOne({email: username}, function(err, foundUser){
		if(err){
			console.log(err);
		}
		else{
			if(foundUser){
				if(foundUser.password === password){
					res.redirect("/");
				}
			}
		}
	});
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
})

app.get("/photographers", function(req, res){
	//console.log(req.originalUrl);
	Photographer.find({}, function(err, foundPhotographers){
		if(!err){
			res.render("photograph.ejs", {photographer: foundPhotographers, source: req.originalUrl});
		}
	})
});

app.post("/photographers", function(req, res){
	// console.log("Entered!!");
	const showId = req.body.id;
	Photographer.findOne({_id: showId}, function(err, foundPhotographer){
		if(!err){
			//console.log(foundPhotographer);
			res.render("photographer.ejs", {photographer: foundPhotographer});
		}
	})
});

app.get("/pandits", function(req, res){

	Pandit.find({}, function(err, foundPandits){
		if(!err){
			res.render("photograph.ejs", {photographer: foundPandits, source: req.originalUrl});
		}
	})
});

app.post("/pandits", function(req, res){
	const showId = req.body.id;
	Pandit.findOne({_id: showId}, function(err, foundPandit){
		if(!err){
			res.render("pandit.ejs", {pandit: foundPandit});
		}
	})
});


app.get("/jewellers", function(req, res){
	Jeweller.find({}, function(err, foundJewellers){
		if(!err){
			res.render("photograph.ejs", {photographer: foundJewellers, source: req.originalUrl});
		}
	})
});

app.post("/jewellers", function(req, res){
	const showId = req.body.id;
	Jeweller.findOne({_id: showId}, function(err, foundJeweller){
		if(!err){
			res.render("jeweller.ejs", {jeweller: foundJeweller});
		}
	})
})

app.get("/makeup", function(req, res){
	Makeup.find({}, function(err, foundMakeups){
		if(!err){
			res.render("photograph.ejs", {photographer: foundMakeups, source: req.originalUrl});
		}
	})
});

app.post("/makeup", function(req, res){
	const showId = req.body.id;
	Makeup.findOne({_id: showId}, function(err, foundMakeup){
		if(!err){
			res.render("makeup.ejs", {makeup: foundMakeup});
		}
	})
});

app.get("/caterer", function(req, res){
	Caterer.find({}, function(err, foundCaterers){
		if(!err){
			res.render("photograph.ejs", {photographer: foundCaterers, source: req.originalUrl});
		}
	})
});

app.post("/caterer", function(req, res){
	const showId = req.body.id;
	Caterer.findOne({_id: showId}, function(err, foundCaterer){
		if(!err){
			res.render("caterer.ejs", {caterer: foundCaterer});
		}
	})
});

app.get("/invitation-card", function(req, res){
	InvitatonCard.find({}, function(err, foundInvitationCards){
		if(!err){
			res.render("photograph.ejs", {photographer: foundInvitationCards, source: req.originalUrl});
		}
	})
});

app.post("/invitation-card", function(req, res){
	const showId = req.body.id;
	InvitatonCard.findOne({_id: showId}, function(err, foundInvitationCard){
		if(!err){
			res.render("invitationcard.ejs", {card: foundInvitationCard});
		}
	})
})

app.get("/entertainment", function(req, res){
	Entertainment.find({}, function(err, foundEntertainment){
		if(!err){
			res.render("photograph.ejs", {photographer: foundEntertainment, source: req.originalUrl});
		}
	})
});

app.post("/entertainment", function(req, res){
	const showId = req.body.id;
	Entertainment.findOne({_id: showId}, function(err, foundEntertainment){
		if(!err){
			res.render("entertainment.ejs", {entertainment: foundEntertainment});
		}
	})
})

app.get("/e-invite", function(req, res){
	Event.find({}, function(err, foundEvents){
		if(!err){
			//console.log(foundEvents.length);
			res.render("event_list.ejs", {events: foundEvents});
		}
	});
});

app.post("/e-invite", function(req, res){
	const event = new Event({
		name: req.body.eventName,
		date: req.body.eventDate,
		startTime: req.body.startTime,
		endTime: req.body.endTime,
		message: req.body.message
	});
	console.log(req.body);
	event.save();
	res.redirect("/e-invite");
});

app.get("/blog", function(req, res){
	res.sendFile(__dirname + "/Blog.html");
})

app.get("/blog/blog1", function(req, res){
	res.sendFile(__dirname + "/Blogs/Blog1.html")
})

app.get("/blog/blog2", function(req, res){
	res.sendFile(__dirname + "/Blogs/Blog2.html");
})

app.get("/e-invite/:eventName", function(req, res){
	Event.findOne({name: req.params.eventName}, function(err, foundEvent){
		if(!err){
			if(foundEvent){
				res.render("guest_list.ejs", {event: foundEvent});
			}
		}
	})
	// console.log(res);
});

app.post("/e-invite/:eventName", function(req, res){
	Event.findOne({name: req.params.eventName}, function(err, foundEvent){
		if(!err){
			if(foundEvent){
				const guest = new Guest({
					name: req.body.name,
					noOfAttendees: req.body.attendees,
					contactNumber: req.body.mob_no,
					emailId: req.body.email
				});
				foundEvent.guest.push(guest);
				foundEvent.save();
				// console.log(req.url);
				res.redirect(req.url);
			}
		}
	})
})

const transporter = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: "vivaahweddingevents@outlook.com",
		pass: "Vivaah@123"
	}
});
function sendEmail(email,imageID,req){
	console.log(req);
	const data = {
		from: "vivaahweddingevents@outlook.com",
		to: email,
		subject:req.eventTitle,
		html:`<h3>You're being invited!!</h3> <br> <img src="cid:card"/> <br>`,
		/*<h4>req.eventDate</h4>
		 <h4>Start time : req.startTime</h4>
		 <br>
		 <h4>End Time: req.endTime </h4>    */
		
        attachments:[
			{
				filename:imageID,
				path:__dirname+'/uploads/'+imageID,
				cid:"card"
			}
		] 
	}

	transporter.sendMail(data, function(err, info){
		if(err){
			console.log(err);
			return;
		}
		console.log("sent:" + info.response);
	});
}

// app.post("/e-invite/:eventName/send-mail", function(req, res){
// 	console.log("Entered in mail sending...");
// 	console.log(req.params.eventName);
// 	console.log(req.body);
// 	// console.log(req.files)
// 	// Event.findOne({name: req.params.eventName}, function(err, foundEvent){
// 	// 	if(!err){
// 	// 		const email = [];
// 	// 		for(var i = 0; i < foundEvent.guest.length; i++){
// 	// 			email.push(foundEvent.guest[i].emailId);
// 	// 		}
// 	// 		sendEmail(email);
// 	// 		res.redirect("/e-invite");
// 	// 	}
// 	// })

// })
app.post('/e-invite/abc/sendMail', upload.single('avatar'), function (req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	//res.send(req.file);
    //console.log(req.body);
	Event.findOne({name: req.body.eventName}, function(err, foundEvent){
		if(!err){
			var email = [];
			// console.log(foundEvent);
			for(var i = 0; i < foundEvent.guest.length; i++){
				email.push(foundEvent.guest[i].emailId);
			}
			// console.log("***********");
			// for(var i=0;i<email.length;i++)
			// {
			// 	console.log(email[i]);
			// }
			// console.log("***");
			sendEmail(email,req.file.filename,req.body);
			res.redirect("/e-invite");
		}
	})
	//sendEmail('swapnil.kanade2001@gmail.com',req.file.filename);
  })
