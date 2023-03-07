const User = require("../schemas/user.schema");
const amadeus = require("../utils/amadeus");

// const getHotelByCity = async (req, res) => {
//   try {
//     const hotelCity = await amadeus.referenceData.locations.hotels.byCity.get({
//       cityCode: "JFK",
//     });
//     console.log(hotelCity.data);
//     return res.json(hotelCity.data);
//   } catch (err) {
//     console.log("CREATE USER FAILED", err);
//     return res.status(400).send("Error. Try again.");
//   }
// };

const getHotelByCity = async (req, res) => {
  amadeus.referenceData.locations.hotels.byCity
    .get({
      cityCode: "LON",
    })
    .then(function (hotelsList) {
      // 2. Hotel Search API to get the price and offer id
      return amadeus.shopping.hotelOffersSearch.get({
        hotelIds: hotelsList.data[0].hotelId,
        adults: 1,
        checkInDate: "2023-10-10",
        checkOutDate: "2023-10-12",
      });
    })
    .then(function (pricingResponse) {
      // Finally, Hotel Booking API to book the offer
      console.log(pricingResponse);
      //   console.log(pricingResponse.data[0].offers[0].id);
      //   return amadeus.booking.hotelBookings.post(
      //     JSON.stringify({
      //       data: {
      //         offerId: pricingResponse.data[0].offers[0].id,
      //         guests: [
      //           {
      //             id: 1,
      //             name: {
      //               title: "MR",
      //               firstName: "BOB",
      //               lastName: "SMITH",
      //             },
      //             contact: {
      //               phone: "+33679278416",
      //               email: "bob.smith@email.com",
      //             },
      //           },
      //         ],
      //         payments: [
      //           {
      //             id: 1,
      //             method: "creditCard",
      //             card: {
      //               vendorCode: "VI",
      //               cardNumber: "4151289722471370",
      //               expiryDate: "2022-08",
      //             },
      //           },
      //         ],
      //       },
      //     })
      //   );
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      console.error(response);
    });
};
// const getHotelByCity = async (req, res) => {
//   try {
//     amadeus.referenceData.locations.hotels.byCity
//       .get({
//         cityCode: "LON",
//       })
//       .then(function (hotelsList) {
//         // 2. Hotel Search API to get the price and offer id
//         return amadeus.shopping.hotelOffersSearch.get({
//           hotelIds: hotelsList.data[0].hotelId,
//           adults: 1,
//           checkInDate: "2023-10-10",
//           checkOutDate: "2023-10-12",
//         });
//       })
//       .then(function (pricingResponse) {
//         // Finally, Hotel Booking API to book the offer
//         return amadeus.booking.hotelBookings.post(
//           JSON.stringify({
//             data: {
//               offerId: pricingResponse.data[0].offers[0].id,
//               guests: [
//                 {
//                   id: 1,
//                   name: {
//                     title: "MR",
//                     firstName: "BOB",
//                     lastName: "SMITH",
//                   },
//                   contact: {
//                     phone: "+33679278416",
//                     email: "bob.smith@email.com",
//                   },
//                 },
//               ],
//               payments: [
//                 {
//                   id: 1,
//                   method: "creditCard",
//                   card: {
//                     vendorCode: "VI",
//                     cardNumber: "4151289722471370",
//                     expiryDate: "2022-08",
//                   },
//                 },
//               ],
//             },
//           })
//         );
//       })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (response) {
//         console.error(response);
//       });
//   } catch (err) {
//     console.log("CREATE USER FAILED", err);
//     return res.status(400).send("Error. Try again.");
//   }
// };

module.exports = {
  getHotelByCity,
};
