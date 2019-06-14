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
var weather = require('./weather.js');

//Express Config
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
//Render Oage
app.get('/', function (req, res) {
  res.render('index', {thescore: null});
})

//POST Function
app.post('/', function (req, res) {
  let city = req.body.city;
  weather.getWeather(city, function(response){
    //console.log(response);
        let data = response;
        var thescore = data;
        //console.log(response);
        if(data == undefined){
            var errorOutput = "Error, city not found.";
        }else{
            var conditions = response.weather[0].main;
            var temp = response.main.temp
            var location = response.name + ", " + response.sys.country;
            //var locationCountry = response.sys.country;
            var output = location;
        };
        res.render('index', {thescore: thescore, weather: conditions, location: location, error: errorOutput, temperature: temp});
    });   
});


//Node Web Server
//app.listen(8080, function () {
//  console.log('Example app listening on port 8080!')
//})

//HTTP Web Server    
http.createServer(app, function(){}).listen(8081);
console.log('HTTP Server Running on Port 8081');