var fullNameCode = [];

var parkList = [
   {'fullname': 'Birmingham Civil Rights National Monument', 'states': 'AL', 'parkCode': 'bicr', 'longitude': '-86.8146667480469', 'latitude': '33.5154266357422', 'postalCode': '0'},
   {'fullname': 'Freedom Riders National Monument', 'states': 'AL', 'parkCode': 'frri', 'longitude': '-85.9064331054688', 'latitude': '33.6352691650391', 'postalCode': '36202'},
   {'fullname': 'Horseshoe Bend National Military Park', 'states': 'AL', 'parkCode': 'hobe', 'longitude': '-85.73413589', 'latitude': '32.97668879', 'postalCode': '36256'},
   {'fullname': 'Little River Canyon National Preserve', 'states': 'AL', 'parkCode': 'liri', 'longitude': '-85.61734327', 'latitude': '34.41461863', 'postalCode': '35967'},
   {'fullname': 'Muscle Shoals National Heritage Area', 'states': 'AL', 'parkCode': 'mush', 'longitude': '-87.4196395874023', 'latitude': '34.6414527893066', 'postalCode': '35630'},
   {'fullname': 'Natchez Trace National Scenic Trail', 'states': 'AL,MS,TN', 'parkCode': 'natt', 'longitude': '-88.7100104093552', 'latitude': '34.3302903330188', 'postalCode': '38804'},
   {'fullname': 'Natchez Trace Parkway', 'states': 'AL,MS,TN', 'parkCode': 'natr', 'longitude': '-89.03092439', 'latitude': '33.78002293', 'postalCode': '38804'},
   {'fullname': 'Russell Cave National Monument', 'states': 'AL', 'parkCode': 'ruca', 'longitude': '-85.81560314', 'latitude': '34.97402063', 'postalCode': '35740'},
   {'fullname': 'Selma To Montgomery National Historic Trail', 'states': 'AL', 'parkCode': 'semo', 'longitude': '-86.72823702', 'latitude': '32.27082092', 'postalCode': '36040'},
   {'fullname': 'Trail Of Tears National Historic Trail', 'states': 'AL,AR,GA,IL,KY,MO,NC,OK,TN', 'parkCode': 'trte', 'longitude': '', 'latitude': '', 'postalCode': '87504'},
   {'fullname': 'Tuskegee Airmen National Historic Site', 'states': 'AL', 'parkCode': 'tuai', 'longitude': '-85.67983321', 'latitude': '32.45538671', 'postalCode': '36083'},
   {'fullname': 'Tuskegee Institute National Historic Site', 'states': 'AL', 'parkCode': 'tuin', 'longitude': '-85.70488498', 'latitude': '32.42962115', 'postalCode': '36088'},


]

var getFullNameParkCode = function() {
   var fullName, parkCode;
   for (var i = 0; i <= parkList.length; i++) {
      fullNameCode[i].fullName = parkList[i].fullName;
      fullNameCode[i].parkCode = parkList[i].parkCode;
   }
   console.log(fullNameCode);
}

//getFullNameParkCode();