var weatherApiKey =  '7f0033f9d596986b6d7fb538906b12a7';
var parkLat ='';
var parkLon = '';
var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?";



var displayWeather  = function(weatherObj){
    console.log(weatherObj)
}



var fetchWeather function(){
    
    var weatherQ = weatherApiUrl +'lat=' + parkLat + '&lon=' + parkLon + '&appid=' + weatherApiKey +'&units=imperial';
    fetch(weatherQ)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
        displayWeather(res);
    })
    .catch (function(error){
        console.log(error);
       })
}

