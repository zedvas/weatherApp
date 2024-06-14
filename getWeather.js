import handleWeather from "./handleWeather.js";
import { API_KEY } from "./secrets.js";
import { entriesContainerRef, infoContainerRef, linksContainerRef, resultsContainerRef } from "./domReferences.js";

//refactor to make this also accept a search term,
export default async function getWeather(lat, lon, searchTerm) {
  //if search term was passed through, use the geocoding api to get co-ords
    if (!lat && !lon && !searchTerm) {
    lat = 0;
    lon = 0;
  }
else if (searchTerm) {
    let result = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm},gb&limit=5&appid=${API_KEY}`
    );
    console.log("runnign from search");

    result = await result.json();
    [lat, lon] = [result[0].lat, result[0].lon];
    console.log(lat, lon, searchTerm)
  }

  //second defence against no coords from geolocation api

  //fetch data
  try {
    console.log("main fetch")
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    let result = await fetch(url);
    console.log("runnign from geolocation");

    result = await result.json();

    handleWeather(result);
    console.log(result);
  } 
  
  catch (e) {
    console.log(e);
  }
}
