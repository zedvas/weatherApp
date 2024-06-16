import createHTML from "./createHTML.js";

const rootRef = document.getElementById("root");
const bodyRef = document.getElementsByTagName("body")[0];
const containerRef = document.getElementsByClassName("container")[0];
let linksContainerRef = createHTML("", "div", "linksContainer");
let infoContainerRef = createHTML("", "div", "infoContainer");
let entriesContainerRef = createHTML("", "div", "entriesContainer");
let resultsContainerRef = createHTML("", "div", "resultsContainer");

containerRef.append(resultsContainerRef);
resultsContainerRef.append(linksContainerRef);
resultsContainerRef.append(infoContainerRef);
resultsContainerRef.append(entriesContainerRef);

export {
  bodyRef,
  rootRef,
  containerRef,
  linksContainerRef,
  infoContainerRef,
  entriesContainerRef,
  resultsContainerRef,
};
