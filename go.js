var weather = require('./weather.js');

var city = "Bristol";

weather.getWeather(city, function(response){
    //console.log(response);
    
    let conditions = response.weather[0].main;
    let temp = response.main.temp
    let location = response.name;
    let locationCountry = response.sys.country;
    
    console.log(location);
    console.log(locationCountry);
    console.log(temp);
    console.log(conditions);
    //console.log(response);
    
});   