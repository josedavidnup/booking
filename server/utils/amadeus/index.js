const Amadeus = require("amadeus");
const { amadeus_api_key, amadeus_api_secret } = require("../config");
amadeus_api_secret;

const amadeus = new Amadeus({
  clientId: amadeus_api_key,
  clientSecret: amadeus_api_secret,
});

module.exports = amadeus;
