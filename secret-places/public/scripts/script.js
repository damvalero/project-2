// const locationsAvailable = document.getElementById('locationList');

let markers = []
let mapMarker = []

const mapContainer = document.getElementById('map');
let categoryButton = document.getElementById('category-filter-btn');
let selectButton = document.getElementById("category-filter");
let locationButton = document.getElementById("location-btn");
let currentLocation = document.getElementById("location-input");
const container = document.querySelector(".places-container");

categoryButton.addEventListener('click', event => {
  let result = selectButton.options[selectButton.selectedIndex].value;
  clearMarkers()
  markers = []
  mapMarker = []  
  getPlaces(result)	 
});

locationButton.addEventListener('click', event => {
  console.log('Hi')
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    currentLocation.value = lat + ',' + lng ;
  });
});

// Gets Markers from Database
function getPlaces(result) {
  axios.get("/places")
   .then( res => {
    let placesArr = res.data.places
    if(!result){
      for(let place of placesArr){
        markers.push(place)
      }
      placePlaces(markers);
    }
    else {
      placesArr.filter(place => {
        if(place.category.toLowerCase().split(' ').join('') === result)
        markers.push(place)
      });
      console.log(markers)
      placePlaces()
    }
   })
   .catch(error => {
     console.log(error);
   })
 }

let map;
function init() {
  map = new google.maps.Map(mapContainer, {
    center: { lat: 39, lng: -9.75 },
    zoom: 8
  });
}

function clearMarkers() {
  setMapOnAll(null);
}

function setMapOnAll(map) {
  for (var i = 0; i < mapMarker.length; i++) {
    mapMarker[i].setMap(map);
  }
}

function placePlaces(){
  markers.forEach(function(place){
    const splitLoc = place.location.split(',');
    const center = {
      lat: parseFloat(splitLoc[0]),
      lng: parseFloat(splitLoc[1])
    };
    const marker = new google.maps.Marker({
      position: center,
      map : map,
      label: place.name
    });
    mapMarker.push(marker)
  });
  displayPlaces()
}

function displayPlaces(){
  container.innerHTML = "";
  for(let place of markers){
    container.innerHTML += `
    <div class="character-info">
      <h1 class="placeName">${place.name}</h1>
      <p class="placeDescription">${place.description}</p>
      <p class="placeTime font-italic"> Time Posted: ${place.time}</p>
    </div>`;
  }
}

getPlaces();