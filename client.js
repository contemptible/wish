/********************************
/
/ client.js
/ handles all button clicks and informational requests on the app's main page
/
********************************/


// the current number of attraction modules on the screen
var CURRENT_ATTRACTION_NUMBER = 1;


// refreshes the default orlando weather
function handleRefreshOrlando() {
  $('main').on('click', '.refresh-orlando-button', function(event) {
    event.preventDefault();

    $(this).parent('div').html("<div class='loader'></div>");

    API('/weather/32830')
        .then(data => {
            return new Weather(data, document.getElementById('florida'));
        })
        .catch(err => {
          $(this).parent('div').parent('div').children('div.weather-head').html("<span class='error'>The weather for that zip code is not loading. Please try again!</span>");
        });
  });
}


// when the submit button is pressed in a weather module, the weather for a valid zip code is loaded
function handleZipCode() {
  $('main').on('click', '.zip-code-button', function(event) {
    event.preventDefault();

    const zipCode = $('.zip-code').val();

    if (isNaN(zipCode) || (zipCode < 0) || (zipCode > 99999)) {
      $(this).parent('div').parent('div').children('div.weather-head').html("<span class='error'>That is not a valid zip code. Please try again!</span>")
    }
    else {
      $(this).parent('div').parent('div').children('div.weather-head').html("<div class='loader'></div>");

      API('/weather/' + zipCode)
        .then(data => {
            return new Weather(data, document.getElementById('userWeather'));
        })
        .catch(err => {
          $(this).parent('div').parent('div').children('div.weather-head').html("<span class='error'>The weather for that zip code is not loading. Please try again!</span>");
        });
    }
  });
}


// if the user presses enter instead of clicking submit, the weather search is still conducted
function handleZipCodeEnterException() {
  $('main').on('keyup', '.zip-code', function(event) {
    event.preventDefault();

    if (event.keyCode == 13) {
      $('.zip-code-button').click();
    }
  });
}


// resets the weather module
function handleRemoveWeatherModule() {
  $('main').on('click', '.close-weather-button', function(event) {
    event.preventDefault();

    $('#userWeather').html('<div class="weather-head"></div><div class="weather-body"><input class="zip-code" placeholder="Enter your zip code!" /><button type="submit" name="zip-code-button" class="btn zip-code-button">Compare Weather</button></div>');

  });
}


// listens for a click of the "Add Attraction" button and displays a pulldown menu
// disables the "Add Attraction" button after 20 modules are on screen
function handleAddAttractionModule() {
  $('main').on('click', '.attractions-button', function(event) {
    event.preventDefault();

    CURRENT_ATTRACTION_NUMBER++;

    var newBlankModule = "<div class='attractions-module' id='attraction" + CURRENT_ATTRACTION_NUMBER + "'>" + 
    "<div class='attractions-head'><strong>Select a ride:</strong></div>" + 
    "<div class='attractions-main'><select name='chosen-attraction' class='chosen-attraction'>" + 
    "<option selected disabled>Click here!</option>" + 
    "<optgroup label='Magic Kingdom'>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010192'>Splash Mountain</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010110'>Big Thunder Mountain</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010177'>Pirates of the Caribbean</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010153'>Jungle Cruise</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010210'>Magic Carpets of Aladdin</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_16124144'>Enchanted Tiki Room</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010208'>Haunted Mansion</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_16767284'>Seven Dwarfs Mine Train</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010176'>Peter Pan\'s Flight</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010117'>Prince Charming Regal Carrousel</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_16491297'>The Barnstormer</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010213'>The Many Adventures of Winnie the Pooh</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_16767263'>Journey of The Little Mermaid</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010170'>Mickey\'s Philharmagic</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010129'>Dumbo the Flying Elephant</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010149'>it\'s a small world</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010162'>Mad Tea Party</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_167672762'>Enchanted Tales With Belle</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010190'>Space Mountain</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010222'>Tomorrowland Speedway</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010107'>Astro Orbiter</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_136550'>Monsters Inc. Laugh Floor</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010224'>Tomorrowland Transit Authority PeopleMover</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80010114'>Buzz Lightyear\'s Space Ranger Spin</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80069748'>Country Bear Jamboree</option>" + 
      "<option value='WaltDisneyWorldMagicKingdom_80069754'>The Hall of Presidents</option>" + 
    "</optgroup>" + 
    "<optgroup label='Epcot'>" + 
      "<option value='WaltDisneyWorldEpcot_80010191'>Spaceship Earth</option>" + 
      "<option value='WaltDisneyWorldEpcot_20194'>Soarin\' Around the World</option>" + 
      "<option value='WaltDisneyWorldEpcot_80010173'>Mission: Space</option>" + 
      "<option value='WaltDisneyWorldEpcot_80010199'>Test Track</option>" + 
      "<option value='WaltDisneyWorldEpcot_18375495'>Frozen Ever After</option>" + 
      "<option value='WaltDisneyWorldEpcot_62992'>Turtle Talk With Crush</option>" + 
      "<option value='WaltDisneyWorldEpcot_107785'>The Seas With Nemo and Friends</option>" + 
      "<option value='WaltDisneyWorldEpcot_80010152'>Journey Into Imagination With Figment</option>" + 
      "<option value='WaltDisneyWorldEpcot_207395'>Gran Fiesta Tour</option>" + 
      "<option value='WaltDisneyWorldEpcot_80010145'>Impressions de France</option>" + 
      "<option value='WaltDisneyWorldEpcot_80010174'>O Canada!</option>" + 
      "<option value='WaltDisneyWorldEpcot_80010180'>Reflections of China</option>" + 
      "<option value='WaltDisneyWorldEpcot_80010200'>The American Adventure</option>" + 
    "</optgroup>" + 
    "<optgroup label='Disney&#39;s Hollywood Studios'>" + 
      "<option value='WaltDisneyWorldHollywoodStudios_80010218'>Tower of Terror</option>" + 
      "<option value='WaltDisneyWorldHollywoodStudios_80010182'>Rock \'n\' Roller Coaster</option>" + 
      "<option value='WaltDisneyWorldHollywoodStudios_80010193'>Star Tours</option>" + 
      "<option value='WaltDisneyWorldHollywoodStudios_209857'>Toy Story Midway Mania</option>" + 
    "</optgroup>" + 
    "<optgroup label='Animal Kingdom'>" + 
      "<option value='WaltDisneyWorldAnimalKingdom_18665186'>Avatar Flight of Passage</option>" + 
      "<option value='WaltDisneyWorldAnimalKingdom_18665185'>Na\'vi River Journey</option>" + 
      "<option value='WaltDisneyWorldAnimalKingdom_26068'>Expedition Everest</option>" + 
      "<option value='WaltDisneyWorldAnimalKingdom_80010123'>Dinosaur</option>" + 
      "<option value='WaltDisneyWorldAnimalKingdom_80010157'>Kilimanjaro Safaris</option>" + 
      "<option value='WaltDisneyWorldAnimalKingdom_80010154'>Kali River Rapids</option>" + 
      "<option value='WaltDisneyWorldAnimalKingdom_80010178'>Primeval Whirl</option>" + 
      "<option value='WaltDisneyWorldAnimalKingdom_800102280'>TriceraTop Spin</option>" + 
      "<option value='WaltDisneyWorldAnimalKingdom_80010150'>It\'s Tough to be a Bug</option>" + 
    "</optgroup>" + 
    "<optgroup label='Universal Studios Florida'>" + 
      "<option value='UniversalStudiosFlorida_13221'>Harry Potter and the Escape From Gringotts</option>" + 
      "<option value='UniversalStudiosFlorida_10858'>Revenge of the Mummy</option>" + 
      "<option value='UniversalStudiosFlorida_10860'>Shrek 4D</option>" + 
      "<option value='UniversalStudiosFlorida_1085'>Men in Black Alien Attack</option>" + 
      "<option value='UniversalStudiosFlorida_10841'>Hollywood Rip Ride Rockit</option>" + 
      "<option value='UniversalStudiosFlorida_10838'>E.T. Adventure</option>" + 
      "<option value='UniversalStudiosFlorida_10875'>The Simpsons Ride</option>" + 
      "<option value='UniversalStudiosFlorida_10879'>Woody Woodpecker\'s Nuthouse Coaster</option>" + 
      "<option value='UniversalStudiosFlorida_10877'>Transformers: The Ride - 3D</option>" + 
      "<option value='UniversalStudiosFlorida_10135'>Despicable Me Minion Mayhem</option>" + 
      "<option value='UniversalStudiosFlorida_10852'>Kang & Kodos\' Twirl \'n\' Hurl</option>" + 
      "<option value='UniversalStudiosFlorida_143482'>Race Through New York Starring Jimmy Fallon™</option>" + 
    "</optgroup>" + 
    "<optgroup label='Universal&#39;s Islands of Adventure'>" + 
      "<option value='UniversalIslandsOfAdventure_10842'>Jurassic Park</option>" + 
      "<option value='UniversalIslandsOfAdventure_10857'>Pteranodon Flyers®</option>" + 
      "<option value='UniversalIslandsOfAdventure_10840'>Harry Potter and the Forbidden Journey</option>" + 
      "<option value='UniversalIslandsOfAdventure_10839'>Flight of the Hippogriff</option>" + 
      "<option value='UniversalIslandsOfAdventure_10862'>The Incredible Hulk Coaster®</option>" + 
      "<option value='UniversalIslandsOfAdventure_10831'>The Amazing Adventures of Spider-Man</option>" + 
      "<option value='UniversalIslandsOfAdventure_13799'>Skull Island: Reign of Kong™</option>" + 
      "<option value='UniversalIslandsOfAdventure_10835'>Doctor Doom\'s Fearfall</option>" + 
      "<option value='UniversalIslandsOfAdventure_10837'>Dudley Do-Right\'s Ripsaw Falls</option>" + 
      "<option value='UniversalIslandsOfAdventure_10832'>Caro-Seuss-el</option>" + 
      "<option value='UniversalIslandsOfAdventure_10859'>The High in the Sky Seuss Trolley Train Ride!™</option>" + 
      "<option value='UniversalIslandsOfAdventure_10833'>The Cat in the Hat</option>" + 
      "<option value='UniversalIslandsOfAdventure_10855'>One Fish, Two Fish, Red Fish, Blue Fish™</option>" + 
      "<option value='UniversalIslandsOfAdventure_10856'>Popeye & Bluto\'s Bilge-Rat Barges®</option>" + 
      "<option value='UniversalIslandsOfAdventure_10861'>Storm Force Accelatron®</option>" + 
    "</optgroup>" + 
    "</select></div>" + 
    "<div class='attractions-foot'><button type='submit' name='submit-button' class='submit-button'>Submit</button> <button type='submit' name='close-button' class='close-button'>Close</button></div></div>";

    $('#attractions').append(newBlankModule);

    $('html, body').animate({ scrollTop: $('#attraction' + CURRENT_ATTRACTION_NUMBER).offset().top }, 500, 'linear');

    if (CURRENT_ATTRACTION_NUMBER === 20) {
      $('.attractions-button').prop('disabled', true);
    }
  });
}


// when the submit button is pressed in an attraction module, the wait time is loaded
function handleRide() {
  $('main').on('click', '.submit-button', function(event) {
    event.preventDefault();

    const currentRide = $(this).parent('div').parent('div').children('div.attractions-main').children('select.chosen-attraction').val();

    if (currentRide) {

      $(this).parent('div').parent('div').children('div.attractions-head').html("<div class='loader'></div>");

      API('/attractions/' + currentRide)
        .then(data => {
          if (!(currentRide.indexOf("MagicKingdom") == -1)) {
            $(this).parent('div').parent('div').addClass('magic');
          }
          else if (!(currentRide.indexOf("Epcot") == -1)) {
            $(this).parent('div').parent('div').addClass('epcot');
          }
          else if (!(currentRide.indexOf("Hollywood") == -1)) {
            $(this).parent('div').parent('div').addClass('hollywood');
          }
          else if (!(currentRide.indexOf("Animal") == -1)) {
            $(this).parent('div').parent('div').addClass('animal');
          }
          else if (!(currentRide.indexOf("StudiosFlorida") == -1)) {
            $(this).parent('div').parent('div').addClass('universal');
          }
          else if (!(currentRide.indexOf("Islands") == -1)) {
            $(this).parent('div').parent('div').addClass('islands');
          }
          else if (!(currentRide.indexOf("Seaworld") == -1)) {
            $(this).parent('div').parent('div').addClass('seaworld');
          }

          return new Attractions(data, $(this).parent('div').parent('div')[0]);
        })
        .catch(err => {
          $(this).parent('div').children('div.attractions-head').html("<span class='error'>This ride is not currently available. Please try another!</span>");
        });

      }
      else {
        $(this).parent('div').parent('div').children('div.attractions-head').html("<span class='error'>Please choose a ride.</span>");
      }
  });
}


// removes an attraction module
function handleRemoveAttractionModule() {
  $('main').on('click', '.close-attractions-button', function(event) {
    event.preventDefault();

    $(this).parent('div').remove();

    CURRENT_ATTRACTION_NUMBER--;
    $('.attractions-button').prop('disabled', false);
  });
}


function main() {
  API('/weather/32830')
    .then(data => {
      return new Weather(data, document.getElementById('florida'));
    })
    .then(() => {
      API('/attractions/WaltDisneyWorldMagicKingdom_80010177') // pirates
        .then(data => {
          return new Attractions(data, document.getElementById('first-attraction'));
        })
        .catch(err => {
          $('#first-attraction').html("<span class='error'>This ride is not currently available.</span>");
        });
    })
    .then(() => {
       handleRefreshOrlando();
       handleZipCode();
       handleZipCodeEnterException();
       handleRemoveWeatherModule();
       handleAddAttractionModule();
       handleRide();
       handleRemoveAttractionModule();
    });
}

$(main);