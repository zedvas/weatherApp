export default function setCurrentDay(obj, activeDate) {
  for (const key in obj) {
      if (key == activeDate) {
          // console.log(obj[key])
          obj[key].active = true;
      }
      else {
          obj[key].active = false;
      }
  }   
  return obj
}
