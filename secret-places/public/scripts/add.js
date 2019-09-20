let currentLocation = document.getElementById("location-input");
let locationButton = document.getElementById("locationButton")
let spinner = document.getElementsByClassName('spinner-border')

locationButton.addEventListener('click', event => {
  spinner[0].classList.remove('hidden');
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    currentLocation.value = lat + ',' + lng;
    spinner[0].classList.add('hidden');
  });
});




