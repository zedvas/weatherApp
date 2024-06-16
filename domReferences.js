import createHTML from "./createHTML.js";

const rootRef = document.getElementById("root");
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
  rootRef,
  containerRef,
  linksContainerRef,
  infoContainerRef,
  entriesContainerRef,
  resultsContainerRef,
};
