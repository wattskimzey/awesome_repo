// Declare necessary variables
var searchInput = "";
var song1 = "";
var song2 = "";
var song3 = "";
var song4 = "";
var song5 = "";
var fart = ["art", "bart", "cart", "carte", "chart", "dart", "dartt", "foart", "gart", "hardt", "hart", "harte", "hartt", "mahrt", "mart", "marte", "part", "parte", "schardt", "smart", "smartt", "start", "tart", "tarte", "tartt", "vazrt"]
var farts = ["arts", "barts", "carts", "cartes", "charts", "darts", "dartts", "foarts", "garts", "hardts", "harts", "hartes", "hartts", "mahrts", "marts", "martes", "parts", "partes", "schardts", "smarts", "smartts", "starts", "tarts", "tartes", "tartts", "vazrts"]



// Submit button on-click event to grab song lyrics or artist
$(document).on("click", "#submit", function() {
    searchInput = $("#search-input").val().trim();
    console.log(searchInput);


    // AJAX pull for lyrics/artist
        // If 'By lyrics' selected
    var lyricsSearchURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_lyrics=" + lyricsSearchInput + "&f_lyrics_language=en&f_has_lyrics=1&page_size=5&apikey=0f78df19f6a6884e6d61e22842b3c761";
    $.ajax({
        url: lyricsSearchURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.track_id);
        theTrackId = response.track_id
        song1 = response.message.body[1];
    });
    var lyricSearchURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + theTrackId + "&apikey=0f78df19f6a6884e6d61e22842b3c761";
    $.ajax({
        url: lyricSearchURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.lyrics_body);
        lyrics = response.lyrics_body
    });
        // If 'By artist' selected
    var artistSearchURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_artist=" + searchInput + "&f_lyrics_language=en&f_has_lyrics=1&page_size=5&apikey=0f78df19f6a6884e6d61e22842b3c761";
    $.ajax({
      url: artistSearchURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.track_id);
      theTrackId = response.track_id
    });
    var lyricSearchURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + theTrackId + "&apikey=0f78df19f6a6884e6d61e22842b3c761";
    $.ajax({
      url: lyricSearchURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.lyrics_body);
      lyrics = response.lyrics_body
    });



    // Update page to show top 5 songs to be picked by radio button
    song1 = 



);

// When radio button for a song is clicked, display lyrics of that song


// When "Rhymify" button is clicked, display rhymes of last word in each line


// When "Fartify" button is clicked, update all single-syllable rhymes of "fart"

