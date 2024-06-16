import createHTML from "./createHTML.js";
import { containerRef, entriesContainerRef } from "./domReferences.js";

export default function updateHTML2(weatherObj) {
  for (const day in weatherObj) {
    if (weatherObj[day].active) {
      const activeDay = weatherObj[day];
      let highestTemp;




      for (const hourlyWeatherData of activeDay) {
        const hourlyWeatherTemp = hourlyWeatherData.main.temp;

        if (highestTemp) {
          if (hourlyWeatherTemp > highestTemp) {
            highestTemp = hourlyWeatherTemp;
          }
        } else {
          highestTemp = hourlyWeatherTemp;
        }

        console.log(highestTemp, hourlyWeatherTemp, hourlyWeatherData);

      }
      for (const hourlyWeatherData of activeDay) {
        const hourlyWeatherTemp = hourlyWeatherData.main.temp;

      if (highestTemp === hourlyWeatherTemp) {
        hourlyWeatherData.highestTemp = true;
      }}




      
      console.log(activeDay);
    }
  }
}
//   const weatherEntryContainerRef = createHTML(
//     null,
//     "div",
//     "weatherEntryContainer"
//   );

//   //filter down to select only results with activeDay:true
//   if (weatherEntry.activeDay) {
//     let {
//       main: { temp, humidity },
//       weather,
//       wind: { speed: windspeed },
//     } = weatherEntry;
//     const { description: desc, icon } = weather[0];
//     let rain = weatherEntry.rain || 0;
//     if (rain) {
//       rain = rain["3h"];
//     }
//     temp = Math.round(temp - 273.15);
//     //

//     //
//     [      date,

//       timestamp.getHours(),timestamp.getMinutes(), "hours", "humidity:",
//       humidity,"temp",
//       temp,"windspeed",
//       windspeed,
//       desc,
//       icon,"rain",
//       rain,
//     ].forEach((dataPoint) => {
//       const _dataPoint = createHTML(dataPoint, "span");
//       weatherEntryContainerRef.append(_dataPoint);
//     });
//     entriesContainerRef.append(weatherEntryContainerRef);
//   }
// }

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
