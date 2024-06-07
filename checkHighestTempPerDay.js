function checkHighestTempPerDay (day, temp, obj) {
    if (obj.hasOwnProperty(day)) {
      if (temp > obj[day]) {obj[day] = temp}
    }
    else {
      obj[day] = temp
    }
    return obj;
  }

  export default checkHighestTempPerDay;