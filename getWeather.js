import handleWeather from "./handleWeather.js";
import { API_KEY } from "./secrets.js";

export default async function getWeather(lat, lon, searchTerm) {
  //default values if geolocation fails
  if (!lat && !lon && !searchTerm) {
    lat = 0;
    lon = 0;
  }
  //if search term was passed through, use the geocoding api to get co-ords
  else if (searchTerm) {
    let result = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm},gb&limit=5&appid=${API_KEY}`
    );

    result = await result.json();
    [lat, lon] = [result[0].lat, result[0].lon];
  }

  //fetch data
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    let result = await fetch(url);
    result = await result.json();
    handleWeather(result);
  } catch (e) {
    console.log(e);
  }
}
