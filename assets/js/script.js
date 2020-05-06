var todayTemp = document.querySelector('#temperature'); //icon of todays weather
var todayConditions = document.querySelector('#conditions');//todays conditions
var forecast = document.querySelector('#forecastDiv'); //forecast
var todayImage = document.querySelector('#todayWeatherIcon');
var divToDos = document.getElementById("info-box-to-do");
var divParkDescription = document.getElementById("parkDescription");
var weatherApiKey =  '7f0033f9d596986b6d7fb538906b14a7';

var alertDiv = document.querySelector('#alertList');


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
    var icode=code + '@4x.png';
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
    

    var endpointurl = "https://api.openweathermap.org/data/4.5/forecast?zip=" +zipC+"&appid="+weatherApiKey;

    
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
    var weatherApiUrl = "https://api.openweathermap.org/data/4.5/onecall?";
    
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

var displayAlerts = function(alertObj){
    console.log(alertObj);
    clearDiv(alertDiv);
    if (alertObj.data.length == 0){
        var noAlerts = document.createElement('h4')
        noAlerts.innerText="No Alerts found.";
        alertDiv.appendChild(noAlerts);
    }else {
        for (var x = 0; x < alertObj.data.length; x++){
        var alertUl = document.createElement('ul');
        alertUl.className='campUl';
        var alertli = document.createElement('li');
        var alertName = document.createElement('h5');
        alertName.innerText=alertObj.data[x].title;
        alertli.appendChild(alertName);
        alertUl.appendChild(alertli);
        var alertdesrcli = document.createElement('li');
        alertdesrcli.innerText = alertObj.data[x].description;
        alertUl.appendChild(alertdesrcli);

        alertDiv.appendChild(alertUl);
        var seperator  = document.createElement('hr');
        alertDiv.appendChild(seperator);
        }
    }

}


var displayCampGround =function(campObj){
    clearDiv(campGroundDiv);
    
    //console.log(campObj);
    if (campObj.data.length == 0){
        var noInfo = document.createElement('h4')
        noInfo.innerText="No campground information available.";
        campGroundDiv.appendChild(noInfo);
    }else {
        
        for (var i=0; i < campObj.data.length; i++){
            var campul =document.createElement('ul');
            campul.className='campUl';
            var campNameLi = document.createElement('li');
            var campName = document.createElement('h5');
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
            var seperator  = document.createElement('hr');
            campGroundDiv.appendChild(seperator);
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
                        if (natParks.images.length > 0) {
                            $('body').css("background-image", "linear-gradient(to right, rgba(80,133,165,0.5), rgba(80,133,165,0.8)), url(" + data.data[0].images[0].url + ")");
                        }
                        /******************
                         * use the natParks object to create an entry and display a list of activities
                         * ****************/
                        
                        // clear the current parkDescription div

                        //console.log(natParks);
                        // gather the park information for display purposes
                        clearDiv(divParkDescription);
                        divParkDescription.classList = "callout rounded";
                        //divParkDescription.classList = "info-box";

                        var h4El = document.createElement("h4");
                        h4El.innerHTML = natParks.fullName;
                        divParkDescription.append(h4El);
                        //console.log(natParks.fullName);
                        if (natParks.addresses.length > 0) {
                            for (var i = 0; i < natParks.addresses.length; i++) {
                                if (natParks.addresses[i].type === "Physical") {
                                    var address1 = document.createElement("div");
                                    address1.classList = "";
                                    address1.textContent = natParks.addresses[i].line1;
                                    divParkDescription.append(address1);
                                    //console.log(natParks.addresses[i].line1);
                                    // there might not be an address 2, so check
                                    if (natParks.addresses[i].line2 !== "") {
                                        var address2 = document.createElement("div");
                                        address2.classList = "";
                                        address2.textContent = natParks.addresses[i].line2;
                                        divParkDescription.append(address2);
                                        // console.log(natParks.addresses[i].line4);
                                    }
                                    if (natParks.addresses[i].line3 !== "") {
                                        var address3 = document.createElement("div");
                                        address3.classList = "";
                                        address3.textContent = natParks.addresses[i].line3;
                                        divParkDescription.append(address3);
                                        // console.log(natParks.addresses[i].line3);
                                    }
                                    var postalInfo = document.createElement("div");
                                    postalInfo.id = "cityStateZip";
                                    postalInfo.classList = "";
                                    divParkDescription.append(postalInfo);
                                    var parkCity = document.createElement("span");
                                    parkCity.classList = "";
                                    parkCity.textContent = natParks.addresses[i].city + ", ";
                                    postalInfo.append(parkCity);
                                    //console.log(natParks.addresses[i].city);
                                    var parkState = document.createElement("span");
                                    parkState.classList = "";
                                    parkState.textContent = natParks.addresses[i].stateCode + " ";
                                    postalInfo.append(parkState);
                                    //console.log(natParks.addresses[i].stateCode);
                                    var postZip = document.createElement("span");
                                    postZip.classList = "";
                                    postZip.textContent = natParks.addresses[i].postalCode;
                                    postalInfo.append(postZip);
                                    //console.log(natParks.addresses[i].postalCode);
                                }
                            }
                        }
                        
                        if (natParks.contacts.phoneNumbers.length > 0) {
                            for (var i = 0; i < natParks.contacts.phoneNumbers.length; i++) {
                                if (natParks.contacts.phoneNumbers[i].type === "Voice") {
                                    var divPhoneNum = document.createElement("div");
                                    divPhoneNum.classList = "";
                                    divPhoneNum.textContent = "Phone: " + natParks.contacts.phoneNumbers[i].phoneNumber;
                                    divParkDescription.append(divPhoneNum);
                                    //console.log(natParks.contacts.phoneNumbers[i].phoneNumber);
                                }
                            }
                        }
                        if (natParks.url !== "") {
                            var divURL = document.createElement("div");
                            divParkDescription.append(divURL);
                            //console.log(natParks.url);
                            var aLink = document.createElement("a")
                            aLink.classList = "button";
                            aLink.href = natParks.url;
                            aLink.target = "_blank";
                            aLink.innerHTML = "Park Website";
                            divURL.append(aLink);
                        }
                        //console.log(natParks.url);

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
                  .then(function(data4) {
                     displayCampGround(data4);
                  });
           }
        });
        var alertUrl = "https://developer.nps.gov/api/v1/alerts?" + parkCode + "&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo";
        fetch(alertUrl)
        .then(function(response) {
            if (response.ok) {
               response.json()
                   .then(function(data2) {
                       
                       displayAlerts(data2);
                   });
            }
         });
            
        
           

}

/*var alertUrl = "https://developer.nps.gov/api/v1/alerts?" + parkCode + "&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo";
var alertFetch - function(){

}*/

/*****
 * this was being used with the Next button on the state-modal
 *   it is being commented out for removal later
 */

/*
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
*/

// listen to the 'Next' button on the stateModal form and fire stateModalHandler
//stateModal.addEventListener("click", stateModalHandler);