
// const locationsAvailable = document.getElementById('locationList');
// navigator.geolocation.getCurrentPosition(function(position) {
//   let lat = position.coords.latitude
//   let long = position.coords.longitude
//   console.log(lat, long)
// });

const markers = []

const $mapContainer = document.getElementById('map');
let map;
function init() {
  map = new google.maps.Map($mapContainer, {
    center: { lat: 39, lng: -9.75 },
    zoom: 8
  });
}
 
function getPlaces() {
  axios.get("/places")
   .then( res => {
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
    const marker = new google.maps.Marker({
      position: center,
      map : map,
      label: place.name
    });
  });
}

getPlaces();