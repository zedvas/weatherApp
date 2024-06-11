function checkHighestTempPerDay(weatherEntry, obj) {

//grab date and temp
  const date = new Date(weatherEntry.dt * 1000).getDay();
  const temp = weatherEntry.main.temp;

//if date doesn't exist in obj, create new key
  if (!obj.hasOwnProperty(date)) {
    obj[date] = weatherEntry;
  }

//if object exists, compare current temp to obj temp, if higher then replace
  else {
    if (temp > obj[date].main.temp) {
      obj[date] = weatherEntry;
    }
  }
  return obj;
}

export default checkHighestTempPerDay;
