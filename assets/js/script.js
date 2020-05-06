var todayTemp = document.querySelector('#temperature'); //icon of todays weather
var todayConditions = document.querySelector('#conditions');//todays conditions
var forecast = document.querySelector('#forecastDiv'); //forecast
var todayImage = document.querySelector('#todayWeatherIcon');
var divToDos = document.getElementById("info-box-to-do");
var weatherApiKey =  '7f0033f9d596986b6d7fb538906b12a7';

// add current day at top of calendar
(function() {
    var now = moment().format('dddd, MMMM Do');
    var displayMoment = document.getElementById('currentDay');
    displayMoment.innerHTML = now;
  
    console.log(now);
  })();

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

$(document).foundation();

// Variables
// var campgroundURL = "https://developer.nps.gov/api/v1/campgrounds?parkCode=bibe&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo"
var natParks = [];
var writeLine = "";
var eventEl = document.getElementById("info-box-activities");
var stateModal = document.getElementById("choose-state");
var chosenState = document.getElementsByName("state");
var divRightSide = document.getElementById("right-side");

var campGroundDiv = document.getElementById("campgroundInfo");

var displayCampGround =function(campObj){
    campGroundDiv.innerHTML='';
    console.log(campObj);
    if (campObj.data.length == 0){
        var noInfo = document.createElement('h4')
        noInfo.innerText="No campground information available.";
        campGroundDiv.appendChild(noInfo);
    }else {
        
        for (var i=0; i < campObj.data.length; i++){
            var campul =document.createElement('ul');
            campul.className='campUl';
            var campNameLi = document.createElement('li');
            var campName = document.createElement('h4');
            campName.innerText=campObj.data[i].name;
            campNameLi.appendChild(campName);
            campul.appendChild(campNameLi);
            campGroundDiv.appendChild(campul);
            var campdesc = document.createElement('li');
            campdesc.innerText = campObj.data[i].description;
            campul.appendChild(campdesc);
            var campfee = document.createElement('li');
            campfee.innerText= "Fees: " + campObj.data[i].fees[0].cost;
            campul.appendChild(campfee);
            console.log(campObj.data[i].reservationsurl)
            var campRes = document.createElement('li')
            if (campObj.data[i].reservationsurl == '' ){
                campRes.innerText = 'Reservation Link: Not available.';
                campul.appendChild(campRes);
            }
            else{
            var campRes = document.createElement('li');
              
            var liLink = document.createElement('a');
            var link = document.createTextNode("Reservation");
            liLink.appendChild(link);
            
            liLink.href = campObj.data[i].reservationsurl;
            liLink.setAttribute('target', "_blank");
            campRes.appendChild(liLink);
            
            campul.appendChild(campRes);

            }
        }

    }
}
var getPark = function(parkCode) {
    var parkURL = "https://developer.nps.gov/api/v1/parks?parkCode="+ parkCode +"&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo&limit=500";

    // force the park list closed
    $('#park-modal').foundation('close');

    // before we get the park info, start the pull for the weather
    checkLatLon(parkCode);

    // clear out the list of parks on next pull
    removeDiv(document.getElementById("parks"));
    removeDiv(document.getElementById("todos"));

    
    fetch(parkURL)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        natParks = data.data[0];
                        
                        // use one of the supplied background images to display a picture of the park
                        $('body').css("background-image", "linear-gradient(to right, rgba(80,133,165,0.5), rgba(80,133,165,0.8)), url(" + data.data[0].images[0].url + ")");

                        /******************
                         * use the natParks object to create an entry and display a list of activities
                         * ****************/


                        //console.log(natParks);
                        // gather the park information for display purposes (place in console.log tags right now)
                        console.log(natParks.fullName);
                        if (natParks.addresses.length > 0) {
                            for (var i = 0; i < natParks.addresses.length; i++) {
                                if (natParks.addresses[i].type === "Physical") {
                                    console.log(natParks.addresses[i].line1);
                                    if (natParks.addresses[i].line2) {
                                        console.log(natParks.addresses[i].line2);
                                    }
                                    if (natParks.addresses[i].line3 !== "") {
                                        console.log(natParks.addresses[i].line3);
                                    }
                                    console.log(natParks.addresses[i].city);
                                    console.log(natParks.addresses[i].stateCode);
                                    console.log(natParks.addresses[i].postalCode);
                                }
                            }
                        }
                        
                        if (natParks.contacts.phoneNumbers.length > 0) {
                            for (var i = 0; i < natParks.contacts.phoneNumbers.length; i++) {
                                if (natParks.contacts.phoneNumbers[i].type === "Voice") {
                                    console.log(natParks.contacts.phoneNumbers[i].phoneNumber);
                                }
                            }
                        }
                        if (natParks.url !== "") {
                            console.log(natParks.url);
                        }
                        console.log(natParks.weatherInfo);
                        console.log(natParks.description);

                        // only create the info-box if there is something to display
                        if (natParks.activities.length > 0) {
                            clearDiv(divToDos);
                            var h4ElToDo = document.createElement("h4");
                            divToDos.append(h4ElToDo);
                            var spanToDo = document.createElement("span");
                            spanToDo.innerHTML = "Things To Do";
                            h4ElToDo.append(spanToDo);
                            var nestTodo = document.createElement("div");
                            nestTodo.id = "todos";
                            nestTodo.classList = "events-nest";
                            divToDos.append(nestTodo);
                            //console.log(natParks.activities.length);
                            var divRow = document.createElement("div");
                            divRow.classList = "row";
                            divToDos.append(divRow);
                            for (var i = 0; i < natParks.activities.length; i++) {
                                var divColumn = document.createElement("div");
                                if (i+1 === natParks.activities.length) {
                                    divColumn.classList = "columns small-6 end";
                                } else {
                                    divColumn.classList = "columns small-6";
                                }
                                divColumn.textContent = natParks.activities[i].name;
                                divRow.append(divColumn);
                            }
                        } else {
                            clearDiv(divToDos);
                            h4ElToDo = document.createElement("h4");
                            h4ElToDo.innerHTML = "Things To Do";
                            divToDos.append(h4ElToDo);
                            nestTodo = document.createElement("div");
                            nestTodo.id = "todos";
                            nestTodo.classList = "events-nest";
                            nestTodo.innerHTML = "There are no activities being returned by the server.";
                            divToDos.append(nestTodo);
                        }
                    });
            }
        });
        

    var eventURL = "https://developer.nps.gov/api/v1/events?ParkCode=" + parkCode + "&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo";
    fetch(eventURL)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        //console.log(data.total);
                        if (data.total === '0') {
                            document.querySelector(".fi-mountains").innerHTML = "There are no events planned at this time."
                        }
                    });
            }
        });
   var name = "https://developer.nps.gov/api/v1/campgrounds?parkCode=" + parkCode + "&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo";
   fetch(name)
        .then(function(response) {
           if (response.ok) {
              response.json()
                  .then(function(data2) {
                     displayCampGround(data2);
                  });
           }
        });

}




var stateModalHandler = function(event) {
    removeDiv(document.getElementById("parks"));
    // cycle through all of the states and ...
    for (var i = 0; i < chosenState.length; i++) {
        // find out which one is marked and then...
        if (chosenState[i].checked) {
            // run the pullParksByState routine to populate the next modal
            pullParksByState(chosenState[i].value);
        }
    }
}

//getPark();
// listen to the 'Next' button on the stateModal form and fire stateModalHandler
stateModal.addEventListener("click", stateModalHandler);