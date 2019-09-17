// window.addEventListener('load', () => {
// }, false);

const $mapContainer = document.getElementById('map');
let map;
function init() {
  map = new google.maps.Map($mapContainer, {
    center: { lat: 39, lng: -9.75 },
    zoom: 8
  });

  // geocodeAddress(geocoder, map);
}
 

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function getPlaces() {
  axios.get("/places")
   .then( res => {
    // console.log(res.data.places)
    placePlaces(res.data.places);
     
   })
   .catch(error => {
     console.log(error);
   })
 }

//  public/javascripts/main.js
function placePlaces(places){
  places.forEach(function(place){
    
    const center = {
      lat: place.coordinates[1],
      lng: place.coordinates[0]
    };
    console.log(center)
    const marker = new google.maps.Marker({
      position: center,
      map : map
      // title: place.name
    });
    // markers.push(marker);
  });
}

getPlaces();