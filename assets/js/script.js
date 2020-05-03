var todayTemp = document.querySelector('#temperature'); //icon of todays weather
var todayConditions = document.querySelector('#conditions');//todays conditions
var forecast = document.querySelector('#forecastDiv'); //forecast
var todayImage = document.querySelector('#todayWeatherIcon');
var weatherApiKey =  '7f0033f9d596986b6d7fb538906b12a7';

//utility functions
var clearDiv =function(targetDiv){
    targetDiv.innerHTML='';
    //clears the div passed to it.
}

//creates URL from weather object
var iconUrl = function(code){
    var icode=code + '@2x.png';
    var urlstring = 'https://openweathermap.org/img/wn/' + icode;
    return(urlstring);
}

//takes text of float, converts to int.  Rounds. Converts back to text and returns
var roundTemp = function (tempString){
    var x = parseFloat(tempString);
    console.log(x);
    var x = Math.round(x);
    return(x.toString());

}
//takes unit time and returns Day of the week
var getDay =function (objdt){
    console.log(objdt);
    var a = new Date(objdt*1000);
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayOfWeek = days[a.getDay()];
    return(dayOfWeek);
}


//populates html with data from weather fetch
var displayWeather  = function(weatherObj){
    console.log(weatherObj);
    
    clearDiv(todayTemp);
    clearDiv(todayConditions);
    clearDiv(todayImage);
    clearDiv(forecast);
    
    
    var iconsrc =iconUrl(weatherObj.current.weather[0].icon); 
    var todayIcon = document.createElement('img')
    todayIcon.setAttribute('src', iconsrc);
    todayIcon.setAttribute('id', 'todayTemp');
    todayImage.appendChild(todayIcon);
    todayTemp.innerText= roundTemp(weatherObj.current.temp) +' F';
    todayConditions.innerText=  weatherObj.current.weather[0].main ;

    var foreUl = document.createElement('ul');
    foreUl.setAttribute('style', 'list-style-type: none;');
    foreUl.className='foreCastUl';
        for(var i =1;i<4; i++){
        var li0 = document.createElement('li');
        var liImg = document.createElement('img');
        liImg.setAttribute('src',iconUrl(weatherObj.daily[i].weather[0].icon));
        li0.appendChild(liImg);
        var liP =document.createElement('p');
        liP.innerText= getDay(weatherObj.daily[i].dt) + ' ' + roundTemp(weatherObj.daily[i].temp.min) + '/' + roundTemp(weatherObj.daily[i].temp.max) +' F';
        li0.appendChild(liP);// 
        foreUl.appendChild(li0);
        }
    forecast.appendChild(foreUl);
}

var fetchLatLon = function (zipC){
    

    var endpointurl = "https://api.openweathermap.org/data/2.5/forecast?zip=" +zipC+"&appid="+weatherApiKey;

    
    fetch(endpointurl)
    .then(function(responce){ 
	return responce.json();
    })
    .then(function(responce){
        
        var citylat =  responce.city.coord.lat;
        var citylon =  responce.city.coord.lon;
	fetchWeather(citylat, citylon);
    })
    .catch (function(error){
    console.log(error) 
    })
}

var fetchWeather =function(lat, lon){
    
    var parkLat =lat;
    var parkLon = lon;
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?";
    
    var weatherQ = '';
    
    weatherQ = weatherApiUrl +'lat=' + parkLat + '&lon=' + parkLon + '&appid=' + weatherApiKey +'&units=imperial';
   
   
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

