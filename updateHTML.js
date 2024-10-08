import createHTML from "./createHTML.js";
import { entriesContainerRef } from "./domReferences.js";
import { bodyRef } from "./domReferences.js";
import { linksContainerRef } from "./domReferences.js";

export default function updateHTML(weatherObj) {
  //remove existing HTML
  entriesContainerRef.innerHTML = "";
  for (const day in weatherObj) {
    //pull out key with active property
    if (weatherObj[day].active) {
      const activeDay = weatherObj[day];

      let highestTemp;
      const highestTempContainerRef = createHTML(
        null,
        "div",
        "highestTempContainer"
      );
      const highestTempInfoRef = createHTML(null, "div", "highestTempInfo");

      //loop through hourly entries for the active day and grab temp
      for (const hourlyWeatherData of activeDay) {
        const hourlyWeatherTemp = hourlyWeatherData.main.temp;

        //create variable which stores highest temp of the day
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

        //loop through all hourly data and grab the entry which matches the temp stored in highestTemp variable
        //for that entry add property of highestTemp
        if (highestTemp === hourlyWeatherTemp) {
          hourlyWeatherData.highestTemp = true;
        }
      }

      //loop through all hours. extract and format relevant info
      for (const hourlyData of activeDay) {
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

        //add active class to link
        const links = linksContainerRef.children;
        const linkIndex = Array.from(links).findIndex(
          (link) => link.innerHTML === date.toString()
        );
        links[linkIndex].classList.add("active");

        //remove active class from other links
        Array.from(links).forEach((link, index) => {
          if (index !== linkIndex) {
            link.classList.remove("active");
          }
        });

        if (hourlyData.highestTemp) {
          const dateStringContainer = createHTML(
            null,
            "div",
            "dateStringContainer"
          );
          const image = document.createElement("img");
          image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          highestTempInfoRef.append(image);

          //depending on icon, add class to body to change colour theme
          let weatherType = "";
          const iconCode = icon.slice(0, 2);

          switch (iconCode) {
            case "01":
            case "02":
              weatherType = "sunnyDay";
              break;
            case "03":
            case "04":
              weatherType = "cloudyDay";
              break;
            case "09":
            case "10":
            case "11":
              weatherType = "rainyDay";
              break;
            case "13":
            case "50":
              weatherType = "snowyDay";
              break;
          }
          // if (icon.startsWith("01") || icon.startsWith("02")) {
          //   weatherType = "sunnyDay";
          // }
          // if (icon.startsWith("03") || icon.startsWith("04")) {
          //   weatherType = "cloudyDay";
          // }
          // if (
          //   icon.startsWith("09") ||
          //   icon.startsWith("10") ||
          //   icon.startsWith("11")
          // ) {
          //   weatherType = "rainyDay";
          // }
          // if (icon.startsWith("13") || icon.startsWith("50")) {
          //   weatherType = "snowyDay";
          // }
          //remove any existing class
          bodyRef.classList = [];

          bodyRef.classList.add(weatherType);

          //create DOM nodes
          const mainDay = createHTML(day, "span", "day");
          const mainDate = createHTML(date, "span", "date");
          const mainMonth = createHTML(month, "span", "month");
          dateStringContainer.append(mainDay);
          dateStringContainer.append(mainDate);
          dateStringContainer.append(mainMonth);
          highestTempInfoRef.append(dateStringContainer);

          const mainTemp = createHTML(temp, "h2", "temp");
          const mainDesc = createHTML(desc, "p", "desc");
          highestTempInfoRef.append(mainTemp);
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
          "wind:",
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
      highestTempContainerRef.prepend(highestTempInfoRef);
      entriesContainerRef.prepend(highestTempContainerRef);
    }
  }
}
