let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 18.4760215,
            lng: -70.004159
        },
        zoom: 18,
    });
}