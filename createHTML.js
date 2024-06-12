//function to create html prgramatically w params(text, el, parent)
function createHTML(text, element, className) {
  let _element = document.createElement(element);
  if (text) {
    let _text = document.createTextNode(text);
    _element.append(_text);
  }
  if (className) {
    _element.classList.add(className);
  }
  return _element;
}

export default createHTML;
