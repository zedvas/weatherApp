import createHTML from "./createHTML.js";
import { containerRef, entriesContainerRef } from "./domReferences.js";
export default function updateHTML(weatherEntry, timestamp, date) {

  const weatherEntryContainerRef = createHTML(
    null,
    "div",
    "weatherEntryContainer"
  );

  if (weatherEntry.activeDay) {

  // const timestamp = new Date(weatherEntry.dt * 1000);
  // const date = timestamp.getDate();

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
    const _dataPoint = createHTML(dataPoint, "span");
    weatherEntryContainerRef.append(_dataPoint);
  });
  entriesContainerRef.append(weatherEntryContainerRef);  }
}
