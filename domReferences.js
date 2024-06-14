import createHTML from "./createHTML.js";
const rootRef = document.getElementById("root");
const containerRef = document.getElementsByClassName("container")[0];
let linksContainerRef = createHTML("", "div", "linksContainer");
let infoContainerRef = createHTML("", "div", "infoContainer");
let entriesContainerRef = createHTML("", "div", "entriesContainer");
let resultsContainerRef = createHTML("", "div", "resultsContainer");
function test(){

//container
//results container
//links info entries

containerRef.append(resultsContainerRef);
resultsContainerRef.append(linksContainerRef);
resultsContainerRef.append(infoContainerRef);
resultsContainerRef.append(entriesContainerRef);
console.log(resultsContainerRef)}
console.log("links",linksContainerRef,
    "info",infoContainerRef,
    "entries",entriesContainerRef,
    "results",resultsContainerRef,
    "wooohooooooonumber2"
)
test()
export {
  rootRef,
  containerRef,
  linksContainerRef,
  infoContainerRef,
  entriesContainerRef,
  resultsContainerRef,
};
