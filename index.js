const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });
// fetchCoordsByIP("70.66.169.dd", (err, data) => {
//   console.log(data);
//   console.log(err);
// });

// fetchISSFlyOverTimes(
//   { latitude: "49.27670", longitude: "-123.13000" },
//   (err, response) => {
//     console.log(response);
//   }
// );

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
