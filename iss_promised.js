const request = require("request-promise-native");

const fetchMyIp = function() {
  return request("https://api.ipify.org?format=json");
};
const fetchCoordsByIp = function(body) {
  const ip = JSON.parse(body).ip;
  return request(
    `https://api.freegeoip.app/json/${ip}?apikey=7fe74600-3df7-11ec-8463-61dd25f4dc60`
  );
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(
    `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

const printPassTimes = function(passTimes) {
  console.log(passTimes);
};

module.exports = { nextISSTimesForMyLocation, printPassTimes };
