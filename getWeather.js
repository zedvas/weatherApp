import doSomethingWithWeather from "./doSomethingWithWeather.js";

async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fd0964bf9dd0b68ad3c6c68136f8c483`;
  try {
    let result = await fetch(url);
    result = await result.json();
    doSomethingWithWeather(result);
  } catch (e) {
    throw new Error(e);       //check if error handling is correct here
  }

  
}

export default getWeather;
