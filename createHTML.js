//function to create html prgramatically w params(text, el, parent)
function createHTML(text, element) {
    let _text = document.createTextNode(text);
    let _element = document.createElement(element);
    _element.append(_text);
    return;
  }

  export default createHTML;