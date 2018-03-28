/********************************
/
/ /components/attractions.js
/ builds out each requested attraction module with data from the themeparks npm package
/
********************************/

function Attractions(data, container) {
  var module = build(data);

  render(module, container);

	function build(data) {
	  return "<div class='attractions-head'><strong>" + data.name + "</strong></div>" + 
	    "<div class='attractions-body'>" + data.waitTime + " minutes" + "</div>" + 
      "<div class='close-attractions-button'><strong>[ close ]</strong></div>";;
	}

  function render(newHtml, container) {
    container.innerHTML = newHtml;
  }
}