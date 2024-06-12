import createHTML from "./createHTML.js";
import checkHighestTempPerDay from "./checkHighestTempPerDay.js";
import {
  containerRef,
  infoContainerRef,
  linksContainerRef,
} from "./domReferences.js";

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
    linksContainerRef.append(linkRef);

    //add event listener to link and set class of 'active' on all timestamps for that day
    linkRef.addEventListener("click", (e) => {
      const clickedDate = e.target.innerText;

      result.list.forEach((weatherEntry) => {
        const timestamp = new Date(weatherEntry.dt * 1000);
        const date = timestamp.getDate();
        if (date == clickedDate) {
          weatherEntry.activeDay = true;
        } else {
          weatherEntry.activeDay = false;
        }
      });
      console.log(result.list);
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
      if (weatherEntry.activeDay) {
        weatherEntryContainerRef.classList.add("activeDay")
      }
    });
  });
  containerRef.append(weatherEntryContainerRef);
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
