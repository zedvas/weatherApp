import createHTML from "./createHTML.js";
import getWeather from "./getWeather.js";
import {rootRef, containerRef} from './domReferences.js'

//create input field
const inputRef = document.createElement("input");
inputRef.type="text";
inputRef.placeholder = "search a city here";
const formRef = document.createElement("form");

formRef.append(inputRef);
containerRef.append(formRef);
rootRef.append(containerRef)

//add event listener to input
let searchTerm, lat, lon;
formRef.addEventListener("submit", e=> {
e.preventDefault();
searchTerm = e.target[0].value;
console.log(searchTerm)
getWeather(lat, lon, searchTerm);
e.target[0].value = "";
})

//obtain geolocation from user
const options = { enableHighAccuracy: true, timeout: 100000, maximumAge: 60000 };
navigator.geolocation.getCurrentPosition(success, error, options);

//handle response from geolocation and obtain user coords
function success({ coords: { latitude: lat, longitude: lon } }) {
  //plug coords into fetch to weather api and extract relevant info;
  getWeather(lat, lon, searchTerm);
}

function error(err) {
  console.log(err);
}

//might need to do something to make sure there's no race condition (?) between search and navigation
//checek what order everything is being appended