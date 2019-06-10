var http = require('http');
      
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var weather = require('./weather.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  weather.getWeather(city, function(response){
    //console.log(response);
        let conditions = response.weather[0].main;
        let temp = response.main.temp
        let location = response.name;
        let locationCountry = response.sys.country;
        //console.log(response);
        var report = location + ", " + locationCountry +  " Temp:" + temp + " Conditions - " + conditions; 
        res.render('index', {weather: report, error: null});
    });   
});



//app.listen(8080, function () {
//  console.log('Example app listening on port 8080!')
//})
    
http.createServer(app, function(){}).listen(8081);
console.log('HTTP Server Running on Port 8081');