const request = require("request");

const geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else if (body.status === "ZERO_RESULTS") {
          reject("Unable to find that address.");
        } else if (body.status === "INVALID_REQUEST") {
          reject("Enter an address!");
        } else if (body.status === "OK") {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
      }
    );
  });
};

geocodeAddress("1750 Sofia")
  .then(location => {
    console.log(JSON.stringify(location, undefined, 4));
  })
  .catch(error => console.log(error));
