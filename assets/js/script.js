// Variables
var campgroundURL = "https://developer.nps.gov/api/v1/campgrounds?parkCode=bibe&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo"
var natParks = [];
var writeLine = "";
var eventEl = document.getElementById("info-box-activities");
var stateModal = document.getElementById("choose-state");
var chosenState = document.getElementsByName("state");


var getPark = function(parkCode) {
    var parkURL = "https://developer.nps.gov/api/v1/parks?parkCode="+ parkCode +"&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo&limit=500";

    $('#park-modal').foundation('close');


    
    fetch(parkURL)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        natParks = data.data;
                        console.log(data.data[0].images[0].url);
                        var theBody = document.getElementsByTagName("body");
                        //theBody.style = "background-image: url(" + data.data[0].images[0].url + ") no-repeat center center fixed;";
                        $('body').css("background-image", "url(" + data.data[0].images[0].url + ")");
                        //var theHeader = document.getElementsByTagName("header");
                        //theHeader.style = "background-image: url(" + data.data[0].images[0].url +");";
                    });
            }
        });
        

    var eventURL = "https://developer.nps.gov/api/v1/events?ParkCode=" + parkCode + "&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo";
    fetch(eventURL)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        console.log(data.total);
                        if (data.total === '0') {
                            document.querySelector(".fi-mountains").innerHTML = "There are no events planned at this time."
                        }
                    });
            }
        });
/*      
   fetch(campgroundURL)
        .then(function(response) {
           if (response.ok) {
              response.json()
                  .then(function(data2) {
                     console.log(data2);
                  });
           }
        });
*/
}




var stateModalHandler = function(event) {
    // cycle through all of the states and ...
    for (var i = 0; i < chosenState.length; i++) {
        // find out which one is maked and then...
        if (chosenState[i].checked) {
            // run the pullParksByState routine to populate the next modal
            pullParksByState(chosenState[i].value);
        }
    }
}

//getPark();
// listen to the 'Next' button on the stateModal form and fire stateModalHandler
stateModal.addEventListener("click", stateModalHandler);