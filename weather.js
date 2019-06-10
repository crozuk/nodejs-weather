require('dotenv').config();
const apiKey = process.env.api_key;

const request = require('request');

module.exports = {
getWeather :    
    function getWeather(input, callback){
        //var input = "Bristol";
        let city = input;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
        request(url, function (err, response, body) {
            if(err){
              console.log('Error, please try again');
            } else {
              let weather = JSON.parse(body)
              if(weather.main == undefined){
                console.log('Error, please try again');
                let data = "Error";
              } else {
                let data = weather;
                return callback(data);
              }
            }
        });
    }
}