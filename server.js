var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");

var app = express();

//  Returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({extended:false}));
// Returns middleware that only parses json
app.use(bodyParser.json());
app.use(express.static('public'));


var server = app.listen(8080, function() {
	console.log('server open', server.address().port);
})


app.get('/index.html', function(req, res) {
	console.log(req.url);
	//
	res.sendFile(__dirname+'/'+'index.html');
})

app.get('/getcontacts', function(req, res) {
	console.log(req.url);
	//
	var readList = require('./json/contact_list.json');
	console.log('reading json done');
	var sendData = {
			"data":readList
		};
	res.end(JSON.stringify(sendData));
})