/********************************
/
/ /components/weather.js
/ builds out each weather instance with data from the Weather Underground API
/
********************************/

function Weather(data, container) {
  var module = build(data);
  render(module, container);

  function build(data) {
    // build a weather module
    if (data.current_observation.display_location.zip === "32830") {
      return "<div class='weather-head'><strong>" + data.current_observation.display_location.city + ", " + data.current_observation.display_location.state + "</strong></div>" + 
        "<div>" + data.current_observation.temp_f + "&deg; and " + data.current_observation.weather.toLowerCase() + "</div>" + 
        "<div class='refresh-orlando-button'><strong>[ refresh ]</strong></div>";
    }
    else {
      return "<div class='weather-head'><strong>" + data.current_observation.display_location.city + ", " + data.current_observation.display_location.state + "</strong></div>" + 
        "<div>" + data.current_observation.temp_f + "&deg; and " + data.current_observation.weather.toLowerCase() + "</div>" + 
        "<div class='close-weather-button'><strong>[ reset your zip code ]</strong></div>";
    }
  }

  function render(newHtml, container) {
    container.innerHTML = newHtml;
  }
}