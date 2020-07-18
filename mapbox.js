require("dotenv").config();

const mbxGeocdoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocdoding({
    accessToken: process.env.MAPBOX_TOKEN,
});

async function geocoder(location) {
    try {
        let response = await geocodingClient
            .forwardGeocode({
                query: location,
                limit: 1,
            })
            .send();
        console.log(response.body.features[0].geometry.coordinates);
    } catch (e) {
        console.log(e.message);
    }
}

geocoder("India");
