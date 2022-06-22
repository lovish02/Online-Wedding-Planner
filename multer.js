const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });


const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send(req.file);
  console.log(req.file);
})

app.listen(3000, function(req, res){
	console.log("Listening at port 3000");
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/form.html");
})