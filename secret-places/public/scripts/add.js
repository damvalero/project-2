let locationButton = document.getElementById("location-btn");
let currentLocation = document.getElementById("location-input");

locationButton.addEventListener('click', event => {
  console.log('Hi')
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    currentLocation.value = lat + ',' + lng ;
  });
});


