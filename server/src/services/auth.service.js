var Amadeus = require("amadeus");

var amadeus = new Amadeus({
  clientId: "RnxgyQRUMuqHNkVoPdacoTuoYKE1ODp0",
  clientSecret: "RR02NCidadpfgeAI",
});

exports.gethotel = (req, res) => {
  amadeus.referenceData.locations.hotels.byCity
    .get({
      cityCode: "VVI",
    })
    .then(function (response) {
      console.log(response);
      res.json(response);
    })
    .catch(function (response) {
      console.error(response);
    });
};
