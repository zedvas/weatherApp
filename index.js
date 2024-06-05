const root = document.getElementById("root");

//test: add elements programatically
const headingText = document.createTextNode("my weather app");
const heading = document.createElement("h1");
heading.append(headingText);

root.append(heading);

//obtain geolocation from user
const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 };
navigator.geolocation.getCurrentPosition(success, error, options);

//handle response from geolocation and obtain user coords
function success({ coords: { latitude: lat }, coords: { longitude: long } }) {
  console.log(lat, long);
  getWeather(lat, long);
}
function error(err) {
  console.log(err);
}

let city;
let country;

//plug coords into fetch to weather api and extract relevant info;
async function getWeather(lat, long) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=fd0964bf9dd0b68ad3c6c68136f8c483`;
  let result = await fetch(url);
  result = await result.json();

  //retrieve relevant data - create function later if the code gets too long
  const {
    city: { name: city, country },
  } = result;
  createHTML(city, "p", root);
  createHTML(country, "p", root);
  console.log(result.list[1]);
  for (let i = 0; i < result.list.length; i++) {
    const listObject = result.list[i];
    const {dt_txt:date,
      main: { temp, feels_like },
      weather,
    } = listObject;
    const { icon, description } = weather[0];
[date, temp, feels_like, icon, description].forEach(data=> {
    createHTML(data, "p", root);
})
  }
}

//function to create html prgramatically w params(text, el, parent)
function createHTML(text, element, parent) {
  let _text = document.createTextNode(text);
  let _element = document.createElement(element);
  _element.append(_text);
  parent.append(_element);
  return;
}

//display location
