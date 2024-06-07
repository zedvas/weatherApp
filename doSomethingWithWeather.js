import createHTML from "./createHTML.js";

function doSomethingWithWeather(result) {

  //retrieve location info
  const {
    city: { name: city, country },
  } = result;

  createHTML(city, "p", root);
  createHTML(country, "p", root);

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

    //convert temp
temp = Math.round(temp - 273.15);

//get highest temp per day


//format date
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
let dateString = new Date(dateTimestamp * 1000);

dateString = `${days[dateString.getDay()]} ${dateString.getDate()} ${months[dateString.getMonth()]}`;

    //create HTML
    createHTML(dateString, "p", root)
    createHTML(temp, "h1", root)
    createHTML(description, "h2", root)
    // decide what to do with icon
    //append these to correct parents. decide where to declare parents.
    //loop through 

  }
}

export default doSomethingWithWeather;

/*
reduce down object - what are theoptions?  */