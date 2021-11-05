const {
  nextISSTimesForMyLocation,
  printPassTimes,
} = require("./iss_promised.js");

nextISSTimesForMyLocation().then((passTimes) => {
  printPassTimes(passTimes);
});
