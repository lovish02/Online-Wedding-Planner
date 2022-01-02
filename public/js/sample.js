const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
app.use(express.static("public"));
const transporter = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: "lovishagrawal@outlook.com",
		pass: "Jungle05@"
	}
});


function sendEmail(){
	const data = {
		from: "lovishagrawal@outlook.com",
		to: email,
		subject: "Regarding wedding invitation",
		text: "this is a simple check"
	}

	transporter.sendMail(data, function(err, info){
		if(err){
			console.log(err);
			return;
		}
		console.log("sent:" + info.response);
	});
}

app.get("/event", function(req, res){
	res.sendFile(__dirname + "/event.html");
})

app.listen(3000, function(req, res){
	console.log("Listening at port 3000");
})