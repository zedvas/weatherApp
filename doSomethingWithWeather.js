import createHTML from "./createHTML.js";
import checkHighestTempPerDay from "./checkHighestTempPerDay.js";

function doSomethingWithWeather(result) {
  //retrieve location info
  const {
    city: { name: city, country },
  } = result;

  createHTML(city, "p", root);
  createHTML(country, "p", root);

  //empty obj to hold highest temp per day
  const highestTemp = {};

  //retrieve weather info
  for (let i = 0; i < result.list.length; i++) {
    const listObject = result.list[i];

    //destructure result obj and grab relevant data
    let {
      dt: dateTimestamp,
      main: { temp },
      weather,
    } = listObject;

    let { icon, description } = weather[0];

    //convert temp and add to highestTemp obj
    temp = Math.round(temp - 273.15);

    //format date
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    let dateString = new Date(dateTimestamp * 1000);

    const day = days[dateString.getDay()];
    const date = dateString.getDate()
const month = months[dateString.getMonth()];

    dateString = `${day} ${date} ${month} ${dateString.getHours()}`;


    //check date
    //if date is nto in obj, append it as key and set value to temp
    //if date is in obj, check if temp is higher than current ubj value
    //if yes, replace tha value in obj with current temp
    //if not, return?


checkHighestTempPerDay(day, temp, highestTemp);

    //create HTML
    createHTML(dateString, "p", root);
    createHTML(temp, "h1", root);
    createHTML(description, "h2", root);
    // decide what to do with icon
    //append these to correct parents. decide where to declare parents.
    //loop through
  }
  console.log(highestTemp)

}

export default doSomethingWithWeather;

/*
reduce down object - what are theoptions?  */
