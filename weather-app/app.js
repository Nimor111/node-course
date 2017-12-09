// const yargs = require("yargs");

// const geocode = require("./geocode/geocode.js");

// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: "address",
//       describe: "Address to fetch weather for",
//       string: true
//     },
//   })
//   .help()
//   .alias("help", "h").argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 4));
//   }
// });

// cc978ee35343e17560d0655825af7277

const request = require("request");

request(
  {
    url:
      "https://api.darksky.net/forecast/cc978ee35343e17560d0655825af7277/42.6607789,23.372194",
    json: true
  },
  (error, response, body) => {
    if (error) {
      console.log("Unable to connect to darksky.net api!");
    } else if (response.statusCode === 400) {
      console.log("Unable to fetch weather!");
    } else if (response.statusCode === 403) {
      console.log("Invalid api key!");
    } else if (response.statusCode === 200) {
      console.log(Math.round((body.currently.temperature - 32) * 5 / 9));
    }
  }
);
