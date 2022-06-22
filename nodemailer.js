const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
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

app.get("/event", function(req, res){
	res.sendFile(__dirname + "/event.html");
});

app.post("/event", function(req, res){
	const email = req.body.email;
	console.log(email);
	sendEmail(email);
	res.redirect("/event");
});


app.listen(8000, function(req, res){
	console.log("Listening at port 3000");
})

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

const puppeteer = require('puppeteer');

async function generatePDF() {
	// Launch a new browser session.
	const browser = await puppeteer.launch();
	// Open a new Page.
	const page = await browser.newPage();

	// Go to our invoice page that we serve on `localhost:8000`.
	await page.goto('http://localhost:8000');
	// Store the PDF in a file named `invoice.pdf`.
	await page.pdf({ path: 'invoice.pdf', format: 'A4' });

	await browser.close();
}


// //API use
// const apiKey = "41565c11bcfa4759a8e3b2ff7ffd7344";
// const url = "https://api.apiflash.com/v1/urltoimage?param1=value1&param2=value2";
// const options = {

// }

// app.get("/invite", function(req, res){
		
// });





