import createHTML from "./createHTML.js";

const fakeResults = [
  {
    timestamp: 1718550000,
    date: "2024-06-16T15:00:00.000Z",
    temp: 15,
    main: "Rain",
    icon: "10d",
  },
  {
    timestamp: 1718128800,
    date: "2024-06-11T18:00:00.000Z",
    temp: 13,
    main: "Rain",
    icon: "10d",
  },
  {
    timestamp: 1718193600,
    date: "2024-06-12T12:00:00.000Z",
    temp: 14,
    main: "Rain",
    icon: "10d",
  },
  {
    timestamp: 1718280000,
    date: "2024-06-13T12:00:00.000Z",
    temp: 14,
    main: "Clouds",
    icon: "04d",
  },
  {
    timestamp: 1718377200,
    date: "2024-06-14T15:00:00.000Z",
    temp: 16,
    main: "Rain",
    icon: "10d",
  },
  {
    timestamp: 1718452800,
    date: "2024-06-15T12:00:00.000Z",
    temp: 15,
    main: "Rain",
    icon: "10d",
  },
];

fakeResults.sort((a,b)=> {
    if (a.timestamp < b.timestamp) {return -1}
})

fakeResults.forEach(result => {
console.log(result)
})

console.log(fakeResults)
