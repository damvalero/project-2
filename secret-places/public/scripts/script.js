window.addEventListener('load', () => {
  console.log('Ironmaker app started successfully!');
}, false);

const $mapContainer = document.getElementById('map');

let map;

function init() {
  map = new google.maps.Map($mapContainer, {
    center: { lat: 39, lng: -9.75 },
    zoom: 8
  });

}