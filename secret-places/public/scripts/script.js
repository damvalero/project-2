
// // const locationsAvailable = document.getElementById('locationList');
// // navigator.geolocation.getCurrentPosition(function(position) {
// //   let lat = position.coords.latitude
// //   let long = position.coords.longitude
// //   console.log(lat, long)
// // });


// let markers = []

// let categoryButton = document.getElementById('category-filter-btn');
// let selectButton = document.getElementById("category-filter");


// categoryButton.addEventListener('click', event => {
//   let result = selectButton.options[selectButton.selectedIndex].value;
//   getPlaces(result)	 
// });

// //Gets Markers from Database
// function getPlaces(result) {
//   axios.get("/places")
//    .then( res => {
//      let placesArr = res.data.places
//     //  for(let item of placesArr){
//     //    console.log(item.category)
//     //  }
//     if(!result){
//       for(let place of placesArr){
//         markers.push(place)
//       }
//       placePlaces(markers);
//     }
//     else {
//       placesArr.filter(place => {
//         if(place.category.toLowerCase().split(' ').join('') === result)
//         markers.push(place)
//       });
//       placePlaces(markers)
//     }
//    })
//    .catch(error => {
//      console.log(error);
//    })
//  }

// const $mapContainer = document.getElementById('map');
// let map;
// function init() {
//   map = new google.maps.Map($mapContainer, {
//     center: { lat: 39, lng: -9.75 },
//     zoom: 8
//   });
// }
 
// function clearMarkers() {
//   setMapOnAll(null);
// } 



// //  public/javascripts/main.js
// function placePlaces(places){
//   places.forEach(function(place){
//     const center = {
//       lat: place.coordinates[1],
//       lng: place.coordinates[0]
//     };
//     const marker = new google.maps.Marker({
//       position: center,
//       map : map,
//       label: place.name
//     });
//   });
// }

// getPlaces();



const locationsAvailable = document.getElementById('locationList');



let markers = []
let mapMarker = []

const $mapContainer = document.getElementById('map');
let categoryButton = document.getElementById('category-filter-btn');
let selectButton = document.getElementById("category-filter");
let locationButton = document.getElementById("location-btn");
let currentLocation = document.getElementById("location-input");

//Event Listeners
categoryButton.addEventListener('click', event => {
  let result = selectButton.options[selectButton.selectedIndex].value;
  clearMarkers()
  markers = []
  mapMarker = []
  getPlaces(result)	 
});

locationButton.addEventListener('click', event => {
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    currentLocation.value = lat + ',' + lng;
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
      placePlaces(markers)
    }
   })
   .catch(error => {
     console.log(error);
   })
 }


let map;
function init() {
  map = new google.maps.Map($mapContainer, {
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

// Place a draggable marker on the map
var marker = new google.maps.Marker({
  position: {lat: 38.736946, lng: -9.142685},
  map: map,
  draggable:true,
  title:"Drag me!"
});



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
    mapMarker.push(marker)
  });
}

getPlaces();