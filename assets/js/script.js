// Variables
var parkURL = "https://developer.nps.gov/api/v1/parks?stateCode=tx&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo"
var campgroundURL = "https://developer.nps.gov/api/v1/campgrounds?stateCode=tx&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo"
var natParks = [];


var getPark = function() {
    fetch(parkURL)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        console.log(data);
                    });
            }
        });
      
   fetch(campgroundURL)
        .then(function(response) {
           if (response.ok) {
              response.json()
                  .then(function(data2) {
                     console.log(data2);
                  });
           }
        });
}


getPark();
