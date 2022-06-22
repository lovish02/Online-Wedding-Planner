// const https = require("https");
// const express = equire("express");
// const app = express();

// app.get("/", function(req, res){
// 	res.render("")
// })

// app.listen(3000, function(req, res){
// 	console.log("Listening at port 3000");
// })


// index.js

// Require Puppeteer.
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