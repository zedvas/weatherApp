//function to create html prgramatically w params(text, el, parent)
function createHTML(text, element, parent) {
    let _text = document.createTextNode(text);
    let _element = document.createElement(element);
    _element.append(_text);
    parent.append(_element);
    return;
  }

  export default createHTML;