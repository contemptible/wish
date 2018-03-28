/********************************
/
/ api.js
/ a helper function that sends a GET request to the provided route and returns a promise
/
********************************/

var baseUrl = "https://wish-you-were-here-api.herokuapp.com";

function API(route) {
  return new Promise( function(resolve, reject) {
    $.ajax({
      method: 'GET',
      url: baseUrl + route,
      dataType: 'json',
      contentType: 'application/json',
      success: resolve,
      error: reject
    });
  })
}