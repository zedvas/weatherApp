//loop through unique dates and set active property on the date in parameter
export default function setCurrentDay(obj, activeDate) {
  for (const key in obj) {
      if (key == activeDate) {
          obj[key].active = true;
      }
      else {
          obj[key].active = false;
      }
  }   
  return obj
}
