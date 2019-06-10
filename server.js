require('dotenv').config();

var http = require('http');
      
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = process.env.api_key;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let temp = weather.main.temp;
        let conditions = (weather.weather[0].main);
        let location = weather.name;
        let locationCountry = weather.sys.country;
        let tempText = `It's currently ${temp}°C in ${location}, ${locationCountry}. -`;
        let conditionsText = `current conditions - ${conditions}`;
        let outputText = `${tempText}  ${conditionsText}`;
        res.render('index', {weather: outputText, error: null});

        console.log(temp + "°C " + weather.name);
        console.log(conditionsText);
      }
    }
  });
})


//app.listen(8080, function () {
//  console.log('Example app listening on port 8080!')
//})
    
http.createServer(app, function(){}).listen(8081);
console.log('HTTP Server Running on Port 8081');