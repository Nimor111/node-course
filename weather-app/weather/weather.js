// cc978ee35343e17560d0655825af7277

const request = require("request");

const getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/cc978ee35343e17560d0655825af7277/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to darksky api!");
      } else if (response.statusCode === 400) {
        callback("Unable to fetch weather!");
      } else if (response.statusCode === 403) {
        callback("Invalid api key!");
      } else if (response.statusCode === 200) {
        callback(undefined, {
          temperature: Math.round((body.currently.temperature - 32) * 5 / 9),
          apparentTemperature: Math.round(
            (body.currently.apparentTemperature - 32) * 5 / 9
          )
        });
      }
    }
  );
};

module.exports = {
  getWeather
};
