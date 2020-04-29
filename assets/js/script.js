// Variables
var theState = "al";
var parkURL = "https://developer.nps.gov/api/v1/parks?stateCode="+ theState +"&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo&limit=500"
var campgroundURL = "https://developer.nps.gov/api/v1/campgrounds?parkCode=bibe&api_key=VJ0LDmOeUdXZOUVYzYzkBagof6QaIk44zhLQ4jMo"
var natParks = [];
var writeLine = "";


var getPark = function() {
    fetch(parkURL)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        natParks = data.data;
                        console.log(data.data.length);

                        
                        
                        for (var i = 0; i < natParks.length; i++) {
                            
                            writeLine = "{'fullname': '" + natParks[i].fullName + "', 'states': '" + natParks[i].states + "', 'parkCode': '" + natParks[i].parkCode + "', 'longitude': '" + natParks[i].longitude + "', 'latitude': '" + natParks[i].latitude + "', 'postalCode': '";
                            if (natParks[i].addresses.length === 0) {
                                writeLine += natParks[i].addresses.length;//natParks[i].addresses;
                            } else {
                                writeLine += natParks[i].addresses[0].postalCode;
                            }
                            writeLine +=  "'},";
                            console.log(writeLine);
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


getPark();
