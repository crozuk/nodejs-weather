require('dotenv').config();
const apiKey = process.env.api_key;

const request = require('request');

module.exports = {
getTemp :    
    function getTemp(input, callback){
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
                let data = "City not found.";
                return callback(data);
              } else {
                let data = weather.main.temp + "°C";
                return callback(data);
              }
            }
        });
    }
}