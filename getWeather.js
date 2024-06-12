import doSomethingWithWeather from "./doSomethingWithWeather.js";
import { API_KEY } from "./secrets.js";

//refactor to make this also accept a search term,
async function getWeather(lat, lon, searchTerm) {
  //if search term was passed through, use the geocoding api to get co-ords
  if (searchTerm) {
    let result = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm},gb&limit=5&appid=${API_KEY}`
    );
    result = await result.json();
    [lat, lon] = [result[0].lat, result[0].lon];
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  //results[0].lat,lon
  try {
    let result = await fetch(url);
    result = await result.json();
    console.log(result);
    doSomethingWithWeather(result);
  } catch (e) {
    console.log(e);
  }
}

export default getWeather;

//http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm},gb&limit=5&appid=fd0964bf9dd0b68ad3c6c68136f8c483
