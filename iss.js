/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const req = require("request");

const fetchMyIP = function(callback) {
  const url = "https://api.ipify.org?format=json";
  req(url, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { ip } = JSON.parse(body);
    callback(null, ip);
  });
  // use request to fetch IP address from JSON API
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://api.freegeoip.app/json/${ip}?apikey=7fe74600-3df7-11ec-8463-61dd25f4dc60`;
  req(url, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coardinates by IP`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  req(url, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times`;
      callback(Error(msg), null);
      return;
    }
    const flyOvers = JSON.parse(body).response;
    callback(null, flyOvers);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      callback(err, null);
      return;
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        callback(err, null);
        return;
      }
      fetchISSFlyOverTimes(coords, callback);
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
