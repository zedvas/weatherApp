import createHTML from "./createHTML.js";
import checkHighestTempPerDay from "./checkHighestTempPerDay.js";

/*handle api result takes in result from fetch 
loops through result and for each entry
it checks against external object for highest highestTemp
the obj gets returned
loop over object, modify data to display as you wish and create html */

function doSomethingWithWeather(result) {
  //retrieve location info
  const {
    city: { name: city, country },
  } = result;

  createHTML(city, "p", root);
  createHTML(country, "p", root);

  //empty obj to hold highest temp per day
  const highestTempPerDay = {};

  //retrieve weather info
  for (let i = 0; i < result.list.length; i++) {
    const weatherEntry = result.list[i];
    checkHighestTempPerDay(weatherEntry, highestTempPerDay);
  };

}


export default doSomethingWithWeather;

//then loop over new obj and do teh below.

//destructure result obj and grab relevant data
//     //convert temp and add to highestTemp obj
//     temp = Math.round(temp - 273.15);

//     //format date
//     const days = [
//       "sunday",
//       "monday",
//       "tuesday",
//       "wednesday",
//       "thursday",
//       "friday",
//       "saturday",
//     ];
//     const months = [
//       "jan",
//       "feb",
//       "mar",
//       "apr",
//       "may",
//       "jun",
//       "jul",
//       "aug",
//       "sep",
//       "oct",
//       "nov",
//       "dec",
//     ];
//     let dateString = new Date(dateTimestamp * 1000);

//     const day = days[dateString.getDay()];
//     const date = dateString.getDate()
// const month = months[dateString.getMonth()];

//     dateString = `${day} ${date} ${month} ${dateString.getHours()}`;

//     //create HTML
//     createHTML(dateString, "p", root);
//     createHTML(temp, "h1", root);
//     createHTML(description, "h2", root);
//     // decide what to do with icon
//     //append these to correct parents. decide where to declare parents.
//     //loop through
