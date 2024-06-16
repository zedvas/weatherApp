import createHTML from "./createHTML.js";
import {
  containerRef,
  entriesContainerRef,
  infoContainerRef,
  linksContainerRef,
  resultsContainerRef,
} from "./domReferences.js";
import updateHTML from "./updateHTML.js";
import setCurrentDay from "./setCurrentDay.js";

export default function handleWeather(result) {

  //clear all existing results
  [linksContainerRef, infoContainerRef].forEach((node) => {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    };
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

    //create new object of results with date as key and hourly data info as value
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

  //create link for each unique date
  for (const uniqueDate of datesSet) {
    const linkRef = createHTML(uniqueDate, "a", "link");
    linkRef.href = "#";
    linksContainerRef.append(linkRef);
    //add property of active to the clicked link and sned obj into updateHTML func
    linkRef.addEventListener("click", (e) => {
      setCurrentDay(weatherObj, e.target.innerText);
      updateHTML(weatherObj)

    });
  }    
  //set default active day to first date in set
  setCurrentDay(weatherObj, Array.from(datesSet)[0]);
    updateHTML(weatherObj)
}

