import createHTML from "./createHTML.js";
import checkHighestTempPerDay from "./checkHighestTempPerDay.js";
import {
  containerRef,
  entriesContainerRef,
  infoContainerRef,
  linksContainerRef,
  resultsContainerRef,
} from "./domReferences.js";
import updateHTML from "./updateHTML.js";

function handleWeather(result) {
    [linksContainerRef, infoContainerRef, entriesContainerRef].forEach (node => {
node.innerHTML = ""
    })

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
containerRef.append(resultsContainerRef);

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
    linksContainerRef.append(linkRef);

    //add event listener to link and set class of 'active' on all timestamps for that day
    linkRef.addEventListener("click", (e) => {
      entriesContainerRef.innerHTML = "";

      const clickedDate = e.target.innerText;

      result.list.forEach((weatherEntry) => {
        const timestamp = new Date(weatherEntry.dt * 1000);
        const date = timestamp.getDate();
        if (date == clickedDate) {
          weatherEntry.activeDay = true;

        } else {
          weatherEntry.activeDay = false;
        }
        updateHTML(weatherEntry, timestamp, date);

      });
      //updatehtml here?

    });

  }

  //retrieve info and create dom elems for all results
  result.list.forEach((weatherEntry) => {

    const timestamp = new Date(weatherEntry.dt * 1000);
    const date = timestamp.getDate();
    if (date === Array.from(datesSet)[0]) {
      weatherEntry.activeDay = true;    
    }

updateHTML(weatherEntry, timestamp, date);
  });
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

//make sure order of appending is all correct

//by default make the first date be active
//move event handler funcs to seperate file
