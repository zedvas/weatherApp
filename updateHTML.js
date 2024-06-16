import createHTML from "./createHTML.js";
import { entriesContainerRef } from "./domReferences.js";

export default function updateHTML(weatherObj) {
  entriesContainerRef.innerHTML = "";
  for (const day in weatherObj) {
    if (weatherObj[day].active) {
      const activeDay = weatherObj[day];
      let highestTemp;
      const highestTempContainerRef = createHTML(
        null,
        "div",
        "highestTempContainer"
      );

      for (const hourlyWeatherData of activeDay) {
        const hourlyWeatherTemp = hourlyWeatherData.main.temp;

        if (highestTemp) {
          if (hourlyWeatherTemp > highestTemp) {
            highestTemp = hourlyWeatherTemp;
          }
        } else {
          highestTemp = hourlyWeatherTemp;
        }
      }
      for (const hourlyWeatherData of activeDay) {
        const hourlyWeatherTemp = hourlyWeatherData.main.temp;

        if (highestTemp === hourlyWeatherTemp) {
          hourlyWeatherData.highestTemp = true;
        }
      }

      for (const hourlyData of activeDay) {
        console.log(hourlyData);

        let {
          dt,
          main: { temp, humidity },
          weather,
          wind: { speed: windspeed },
        } = hourlyData;
        const { description: desc, icon } = weather[0];
        let rain = hourlyData.rain || 0;
        if (rain) {
          rain = rain["3h"];
        }
        temp = Math.round(temp - 273.15);
        const dateTimestamp = new Date(dt * 1000);
        const days = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ];
        const months = [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ];
        const day = days[dateTimestamp.getDay()];
        const date = dateTimestamp.getDate();
        const month = months[dateTimestamp.getMonth()];
        const hours = dateTimestamp.getHours();

        if (hourlyData.highestTemp) {
          const dateStringContainer = createHTML(
            null,
            "div",
            "dateStringContainer"
          );
          const mainDay = createHTML(day, "span", "day");
          const mainDate = createHTML(date, "span", "date");
          const mainMonth = createHTML(month, "span", "month");
          dateStringContainer.append(mainDay);
          dateStringContainer.append(mainDate);
          dateStringContainer.append(mainMonth);
          highestTempContainerRef.append(dateStringContainer);

          const mainTemp = createHTML(temp, "h2", "tempp");
          const mainDesc = createHTML(desc, "p", "desc");
          highestTempContainerRef.append(mainTemp);
          highestTempContainerRef.append(mainDesc);
        }
        const weatherEntryContainerRef = createHTML(
          null,
          "div",
          "weatherEntryContainer"
        );

        const hourlyOverviewRef = createHTML(null, "div", "hourlyOverview");
        weatherEntryContainerRef.append(hourlyOverviewRef);

        const time = createHTML(`${hours}:00`, "h2", "time");
        hourlyOverviewRef.append(time);
        const _desc = createHTML(desc, "p", "desc");
        hourlyOverviewRef.append(_desc);

        const hourlyDetailsRef = createHTML(null, "div", "hourlyDetails");
        const _temp = createHTML(temp, "span", "temp");
        const tempContainer = createHTML("temp:", "p", "tempContainer");
        tempContainer.append(_temp);
        hourlyDetailsRef.append(tempContainer);

        const _humidity = createHTML(humidity, "span", "humidity");
        const humidityContainer = createHTML(
          "humidity:",
          "p",
          "humidityContainer"
        );
        humidityContainer.append(_humidity);
        hourlyDetailsRef.append(humidityContainer);

        const _windspeed = createHTML(windspeed, "span", "windspeed");
        const windspeedContainer = createHTML(
          "windspeed:",
          "p",
          "windspeedContainer"
        );
        windspeedContainer.append(_windspeed);
        hourlyDetailsRef.append(windspeedContainer);
        if (rain) {
          const _rain = createHTML(rain, "span", "rain");
          const rainContainer = createHTML("rain:", "p", "rainContainer");
          rainContainer.append(_rain);
          hourlyDetailsRef.append(rainContainer);
        }

        weatherEntryContainerRef.append(hourlyDetailsRef);

        entriesContainerRef.append(weatherEntryContainerRef);
      }

      entriesContainerRef.prepend(highestTempContainerRef);
    }
  }
}
