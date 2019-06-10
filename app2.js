//HTTP Server Module
var http = require('http');
//Express Web Framwork      
const express = require('express');
const app = express();
//Body Parser
const bodyParser = require('body-parser');
//Weather App
//var weather = require('./weather.js');
//Temp App
var temperature = require('./temperature.js');

//Express Config
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
//Render Oage
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

//POST Function
app.post('/', function (req, res) {
  let city = req.body.city;
  temperature.getTemp(city, function(response){
    //console.log(response);
        let data = response;
        //console.log(response);
        var report = data; 
        res.render('index', {weather: report, error: null});
    });   
});


//Node Web Server
//app.listen(8080, function () {
//  console.log('Example app listening on port 8080!')
//})

//HTTP Web Server    
http.createServer(app, function(){}).listen(8081);
console.log('HTTP Server Running on Port 8081');