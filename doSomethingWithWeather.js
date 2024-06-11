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

  createHTML(city, "p", root); //fix this as createHTML mod has changed and no loneger includes parent
  createHTML(country, "p", root);

  //empty obj to hold highest temp per day
  const highestTempPerDay = [];   
  const days = [];                //could think of better way to get highest temp directly in array rather than moving to highest obj then creating array from that. but too far in now and involces refactoring the whole of this module.


  //retrieve weather info
  for (let i = 0; i < result.list.length; i++) {
    const weatherEntry = result.list[i];
    checkHighestTempPerDay(weatherEntry, highestTempPerDay);
  }
  //then loop over new obj containing highest temps per day.
  for (const [key] in highestTempPerDay) {
    //destructure result obj and grab relevant data
    let {
      dt: timestamp,
      main: { temp },
      weather,
    } = highestTempPerDay[key];
    const { main, icon } = weather[0];
    temp = Math.round(temp - 273.15);
    const date = new Date(timestamp * 1000);
    const obj = {timestamp, date, temp, main, icon};
    days.push(obj)
  }
  
//loop over final days array, sort and create html
console.log(days)

}


export default doSomethingWithWeather;

//     //convert temp and add to highestTemp obj

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
//       "january",
//       "february",
//       "march",
//       "april",
//       "may",
//       "june",
//       "july",
//       "august",
//       "september",
//       "october",
//       "november",
//       "december",
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
