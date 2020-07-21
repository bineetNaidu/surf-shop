mapboxgl.accessToken =
    "pk.eyJ1IjoiYmluZWV0bmFpZHUiLCJhIjoiY2tjcmRncHN4MG96eDMwbWdyajB1OGJkdiJ9.osACZLXZrpFZ1zSOX7IzHA";

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center: post.coordinates,
    zoom: 5,
});

// create a HTML element for post location/marker
var el = document.createElement("div");
el.className = "marker";

// make a marker for  location and add to the map
new mapboxgl.Marker(el)
    .setLngLat(post.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML("<h3>" + post.title + "</h3><p>" + post.location + "</p>")
    )
    .addTo(map);

// toggle edit review form
$(".toggle-edit-form").on("click", function () {
    // toogle the idit btn text on click
    $(this).text() === "Edit" ? $(this).text("Cancel") : $(this).text("Edit");
    // toogle visiblity of edit form
    $(this).siblings(".edit-review-form").toggle();
});

// add click lisnter for clear the rating
$(".clear-rating").click(function () {
    $(this).siblings(".input-no-rate").click();
});
