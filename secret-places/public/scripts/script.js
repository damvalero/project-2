// const locationsAvailable = document.getElementById('locationList');

let markers = []
let mapMarker = []

let mapContainer = document.getElementById('map');
let container = document.querySelector(".row");
let filter = document.getElementsByClassName("filter-btn")

//Add Event Listener

for(let i=0; i< filter.length; i++){
  filter[i].addEventListener('click', event => {
    console.log(filter[i].name)
    let result = filter[i].name;
    clearMarkers()
    markers = []
    mapMarker = []  
    getPlaces(result)	 
  });
}

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
    center: { lat: 38.732733, lng: -9.149165 },
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false,
    fullScreenControl: false
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
    <div class="col-sm-4 my-4">
      <div class="card place-info shadow-lg">
        <div class="card-body">
          <img class='placeImg card-img-top' src="${place.image}" alt="place">
          <h5 class="card-title placeName">${place.name}</h5>
           <p class="placeDescription card-text">${place.description}</p>
           <a href="placeDetail/${place._id}">See More</a>
        </div>
      </div>
    </div>
    </div>`;
   }
 }
 
getPlaces();


// <p class="placeTime font-italic font-weight-bold">${place.time}</p>