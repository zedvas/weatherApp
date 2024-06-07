import getWeather from "./getWeather.js";

const root = document.getElementById("root");

//obtain geolocation from user
const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 };
navigator.geolocation.getCurrentPosition(success, error, options);

//handle response from geolocation and obtain user coords
function success({ coords: { latitude: lat }, coords: { longitude: lon } }) {

  //plug coords into fetch to weather api and extract relevant info;
  getWeather(lat, lon);
}

function error(err) {
  console.log(err);
}

//set default values to 0,0?