function checkHighestTempPerDay(weatherEntry, obj) {
    // grab temp and day to compare

    const date = new Date(weatherEntry.dt * 1000).getDay();
    const temp = weatherEntry.main.temp;

    if (!obj.hasOwnProperty(date)) {
      obj[date] = weatherEntry;
    } else {
      if (temp > obj[date].main.temp) {
        obj[date] = weatherEntry;
      }

      // console.log("yes exist");
      // }

      //run the function here and append all the data to new obj ot boil it down
    }
  }

  export default checkHighestTempPerDay;