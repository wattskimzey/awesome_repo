// Declare necessary variables
var searchInput = "";
var song1 = "";
var song2 = "";
var song3 = "";
var song4 = "";
var song5 = "";
var fart = ["art", "bart", "cart", "carte", "chart", "dart", "dartt", "foart", "gart", "hardt", "hart", "harte", "hartt", "mahrt", "mart", "marte", "part", "parte", "schardt", "smart", "smartt", "start", "tart", "tarte", "tartt", "vazrt"];
var farts = ["arts", "barts", "carts", "cartes", "charts", "darts", "dartts", "foarts", "garts", "hardts", "harts", "hartes", "hartts", "mahrts", "marts", "martes", "parts", "partes", "schardts", "smarts", "smartts", "starts", "tarts", "tartes", "tartts", "vazrts"];
var theTrackId = "";
var lyrics = "";



// Submit button on-click event to grab song lyrics or artist
$(document).on("click", "#submit", function() {
    searchInput = $("#search-input").val().trim();
    console.log(searchInput);


    // AJAX pull for lyrics/artist
        // If 'By lyrics' selected


    var lyricsSearchURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_lyrics=" + searchInput + "&f_lyrics_language=en&f_has_lyrics=1&page_size=5&apikey=0f78df19f6a6884e6d61e22842b3c761";

    var lyricsSearchURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_lyrics=" + lyricsSearchInput + "&f_lyrics_language=en&f_has_lyrics=1&page_size=5&apikey=0f78df19f6a6884e6d61e22842b3c761";
    $.ajax({
        url: lyricsSearchURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        theTrackId = response.track_id;
        console.log(theTrackId);
        
        song1 = response.message.body[1];
        console.log(song1);
    });
    var lyricSearchURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + theTrackId + "&apikey=0f78df19f6a6884e6d61e22842b3c761";
    $.ajax({
        url: lyricSearchURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        lyrics = response.lyrics_body;
        console.log(lyrics);
        
    });
        // If 'By artist' selected
    var artistSearchURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_artist=" + searchInput + "&f_lyrics_language=en&f_has_lyrics=1&page_size=5&apikey=0f78df19f6a6884e6d61e22842b3c761";
    $.ajax({
      url: artistSearchURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      console.log(response.track_id);
      theTrackId = response.track_id;
    });
    var lyricSearchURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + theTrackId + "&apikey=0f78df19f6a6884e6d61e22842b3c761";
    $.ajax({
      url: lyricSearchURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      console.log(response.lyrics_body);
      lyrics = response.lyrics_body;
    });



        // If 'By artist' selected






    // Update page to show top 5 songs to be picked by radio button
    var title1 = $("<input>");
    title1.attr("type", "radio");
    title1.attr("id", "song1");
    title1.addClass("song-result");
    // title1.text([Insert Artist and Song name]);

    var title2 = $("<input>");
    title2.attr("type", "radio");
    title1.attr("id", "song2");
    title1.addClass("song-result");
    // title2.text([Insert Artist and Song name]);

    var title3 = $("<input>");
    title3.attr("type", "radio");
    title1.attr("id", "song2");
    title1.addClass("song-result");
    // title3.text([Insert Artist and Song name]);

    var title4 = $("<input>");
    title4.attr("type", "radio");
    title1.attr("id", "song4");
    title1.addClass("song-result");
    // title4.text([Insert Artist and Song name]);

    var title5 = $("<input>");
    title5.attr("type", "radio");
    title1.attr("id", "song5");
    title1.addClass("song-result");
    // title5.text([Insert Artist and Song name]);

    var songResults = $("#song-results");
    songResults.append(song1, song2, song3, song4, song5);


});

// When radio button for a song is clicked, display lyrics of that song
$(document).on("click", ".song-result", function() {
    var clickedSong = $(this).attr("id");
    if (clickedSong == "song1") {
        // $("#lyrics-display").text([lyrics]);
    }
    else if (clickedSong == "song2") {
        // $("#lyrics-display").text([lyrics]);
    }
    else if (clickedSong == "song3") {
        // $("#lyrics-display").text([lyrics]);
    }
    else if (clickedSong == "song4") {
        // $("#lyrics-display").text([lyrics]);
    }
    else if (clickedSong == "song5") {
        // $("#lyrics-display").text([lyrics]);
    }

    var rhymify = $("<button>");
    rhymify.addClass("rhymify");

    var fartify = $("<button>");
    fartify.addClass("fartify");

    $("#fun-buttons").append(rhymify, fartify);
});



// Function to take lyrics from a continuous string and return an array of the last word in each line
// Lines muse be separated by '\n'
function lastWords(str) {
    var lastWords = [];
    var punct = [".", ",", "?", "!", "(", "[", "{", "¿", "¡", ")", "]", "}", "/", "-"];
    var words = str.split(' ');
    console.log(words);
    for (var i = 0; i < words.length; i++) {
        var matchIndex = words[i].indexOf('\n');
        if (matchIndex != -1) {
            var newLast = words[i].slice(0, matchIndex);
            for (var j = 0; j < punct.length; j++) {
                while (newLast[newLast.length-1]==punct[j]||newLast[0]==punct[j]) {
                    newLast = newLast.slice(0, newLast.length - 1);
                }
            }
            lastWords.push(newLast);
        }
    }
    return lastWords;
}

console.log("lastWords: " + lastWords("Ah, come on\nOoh, who me?\nCome on, uh\n\nI saw you outside\nGetting out your ride\nA CLK 430, you've got style\nAs soon as I checked you out\nA ladies man no doubt\nFrom head to toe you're all style I like it\n\nHow bout you buy me a rose 'cause I think\nThis is gonna get a little interesting\nLet's see where this conversation goes\nI'm not sure that I want you to know\n\nI wish I could right now\nWish that I could show you how\nI'm feeling you (I'm feelin' you)\nBoy I try I can't hide (can't hide)\nHow badly I want you tonight\nI've gotta fight it\n\nIf you take me home\nGet me all alone\nNothing could happen it's just too soon\nI'm just being upfront"));

// When "Rhymify" button is clicked, display rhymes of last word in each line
$(document).on("click", ".rhymify", function () {

});

// When "Fartify" button is clicked, update all single-syllable rhymes of "fart"
$(document).on("click", ".fartify", function () {

});

// this is secret change to trigger a push.  maybe.  