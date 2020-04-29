var fullNameCode = [];

var parkList = [
   {
      "fullname": "Birmingham Civil Rights National Monument",
      "states": "AL",
      "parkCode": "bicr",
      "longitude": "-86.8146667480469",
      "latitude": "33.5154266357422"
   },
   {
      "fullname": "Freedom Riders National Monument",
      "states": "AL",
      "parkCode": "frri",
      "longitude": "-85.9064331054688",
      "latitude": "33.6352691650391"
   },
   {
      "fullname": "Horseshoe Bend National Military Park",
      "states": "AL",
      "parkCode": "hobe",
      "longitude": "-85.73413589",
      "latitude": "32.97668879"
   },
   {
      "fullname": "Little River Canyon National Preserve",
      "states": "AL",
      "parkCode": "liri",
      "longitude": "-85.61734327",
      "latitude": "34.41461863"
   },
   {
      "fullname": "Muscle Shoals National Heritage Area",
      "states": "AL",
      "parkCode": "mush",
      "longitude": "-87.4196395874023",
      "latitude": "34.6414527893066"
   },
   {
      "fullname": "Natchez Trace National Scenic Trail",
      "states": "AL",
      "parkCode": "natt",
      "longitude": "-88.7100104093552",
      "latitude": "34.3302903330188"
   }
]

var getFullNameParkCode = function() {
   var fullName, parkCode;
   for (var i = 0; i <= parkList.length; i++) {
      fullNameCode[i].fullName = parkList[i].fullName;
      fullNameCode[i].parkCode = parkList[i].parkCode;
   }
   console.log(fullNameCode);
}