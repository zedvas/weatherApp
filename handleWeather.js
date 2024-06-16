import createHTML from "./createHTML.js";
import {
  containerRef,
  infoContainerRef,
  linksContainerRef,
  resultsContainerRef,
} from "./domReferences.js";
import updateHTML from "./updateHTML.js";
import setCurrentDay from "./setCurrentDay.js";

function handleWeather(result) {
  //clear all existing results
  [linksContainerRef, infoContainerRef].forEach((node) => {
    node.innerHTML = "";
  });

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

  //create set of unique dates from results list and loop over to create links
  const datesSet = new Set();
  const weatherObj = {};
  result.list.forEach((weatherEntry) => {
    const timestamp = new Date(weatherEntry.dt * 1000);
    const date = timestamp.getDate();
    datesSet.add(date);

    for (const uniqueDate of datesSet) {
      if (uniqueDate === date) {
        if (weatherObj.hasOwnProperty(uniqueDate)) {
          weatherObj[uniqueDate].push(weatherEntry);
        } else {
          weatherObj[uniqueDate] = [weatherEntry];
        }
      }
    }
  });
  for (const uniqueDate of datesSet) {
    const linkRef = createHTML(uniqueDate, "a", "link");
    linkRef.href = "#";
    linksContainerRef.append(linkRef);
    linkRef.addEventListener("click", (e) => {
      setCurrentDay(weatherObj, e.target.innerText);
      updateHTML(weatherObj)

    });
  }    setCurrentDay(weatherObj, Array.from(datesSet)[0]);
    updateHTML(weatherObj)

}
//     //add event listener to links and add key of active on all timestamps for that day
//     linkRef.addEventListener("click", (e) => {
//       //clear out info in html
//       entriesContainerRef.innerHTML = "";

//       const clickedDate = e.target.innerText;

//       result.list.forEach((weatherEntry) => {
//         const timestamp = new Date(weatherEntry.dt * 1000);
//         const date = timestamp.getDate();
//         if (date == clickedDate) {
//           weatherEntry.activeDay = true;
//         } else {
//           weatherEntry.activeDay = false;
//         }
//         updateHTML(weatherEntry, timestamp, date);
//       });
//     });
//   }

//   result.list.forEach((weatherEntry) => {
//     const timestamp = new Date(weatherEntry.dt * 1000);
//     const date = timestamp.getDate();
//     if (date === Array.from(datesSet)[0]) {
//       weatherEntry.activeDay = true;
//     }

//     updateHTML(weatherEntry, timestamp, date);
//   });

export default handleWeather;
