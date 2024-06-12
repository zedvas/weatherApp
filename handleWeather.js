import createHTML from "./createHTML.js";
import checkHighestTempPerDay from "./checkHighestTempPerDay.js";
import {
  containerRef,
  infoContainerRef,
  linksContainerRef,
} from "./domReferences.js";

/*handle api result takes in result from fetch 
loops through result and for each entry
it checks against external object for highest highestTemp
the obj gets returned
loop over object, modify data to display as you wish and create html */

function handleWeather(result) {
  //retrieve location info and add to dom
  const {
    city: { name: city, country },
  } = result;

  const cityPTag = createHTML(city, "p", "city");
  const countryPTag = createHTML(country, "p", "country");
  const locationDivTag = createHTML(null, "div", "location");
  locationDivTag.append(cityPTag);
  locationDivTag.append(countryPTag);
  infoContainerRef.append(locationDivTag);
  containerRef.append(infoContainerRef);

  //create set fo unique dates from results list and use to create links
  const datesSet = new Set();

  result.list.forEach((weatherEntry) => {
    const timestamp = new Date(weatherEntry.dt * 1000);
    const date = timestamp.getDate();
    datesSet.add(date);
  });

  for (const date of datesSet) {
    const linkRef = createHTML(date, "a", "link");
    linkRef.href = "#";

    //add event listener to link and set class of 'active' on all timestamps for that day
    linkRef.addEventListener("click", (e) => {
      const clickedDate = e.target.innerText;
      linksContainerRef.append(linkRef);
    });
  }

  //retrieve info and create dom elems for all results
      const weatherEntryContainerRef = createHTML(
      null,
      "div",
      "weatherEntryContainer"
    );
result.list.forEach((weatherEntry) => {
    const timestamp = new Date(weatherEntry.dt * 1000);
    const date = timestamp.getDate();

    let {
      main: { temp, humidity },
      weather,
      wind: { speed: windspeed },
    } = weatherEntry;
    const { description: desc, icon } = weather[0];
    let rain = weatherEntry.rain || 0;
    if (rain) {
      rain = rain["3h"];
    }
    temp = Math.round(temp - 273.15);

    [
      timestamp,
      timestamp.getTime(),
      date,
      humidity,
      temp,
      windspeed,
      desc,
      icon,
      rain,
    ].forEach((dataPoint) => {
      const _dataPoint = createHTML(dataPoint, "p");
      weatherEntryContainerRef.append(_dataPoint);
    });
  });
  containerRef.append(weatherEntryContainerRef)

  //empty obj to hold highest temp per day
  const highestTempPerDay = [];
  const days = []; //could think of better way to get highest temp directly in array rather than moving to highest obj then creating array from that. but too far in now and involces refactoring the whole of this module.

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
    const obj = { timestamp, date, temp, main, icon };
    days.push(obj);
  }

  //loop over final days array, sort and create html
}

export default handleWeather;

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

//make sure order of appending is all correct

//by default make the first date be active