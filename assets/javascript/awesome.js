// Production

// Declare necessary variables
var searchInput = "";
var searchType = "";
var songs = [];
var currentLyrics = "";
var fart = ["art", "bart", "cart", "carte", "chart", "dart", "dartt", "foart", "gart", "hardt", "hart", "harte", "hartt", "heart", "mahrt", "mart", "marte", "part", "parte", "schardt", "smart", "smartt", "start", "tart", "tarte", "tartt", "vazrt"];
var farts = ["arts", "barts", "carts", "cartes", "charts", "darts", "dartts", "foarts", "garts", "hardts", "harts", "hartes", "hartts", "hearts", "mahrts", "marts", "martes", "parts", "partes", "schardts", "smarts", "smartts", "starts", "tarts", "tartes", "tartts", "vazrts"];


// Submit button on-click event to grab song lyrics or artist
$(document).on("click", "#submit", function() {
    searchInput = $("#search-input").val().trim();
    searchType = $("input[name=search-type]:checked").val();
    songs = [];
    lyrics = [];
    lyricSearch(songs);
});

// AJAX pulls for lyrics/artist search
function lyricSearch(songs) {
    // If 'By lyrics' selected
    if (searchType==="lyrics") {
        var lyricsSearchURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_lyrics=" + searchInput + "&f_lyrics_language=en&f_has_lyrics=1&page_size=10&apikey=0f78df19f6a6884e6d61e22842b3c761";

        $.ajax({
            url: lyricsSearchURL,
            jsonp: "callback",
            dataType: "jsonp",
            method: "GET",
        }).done(function(response) {
            for (var a = 0; a < response.message.body.track_list.length; a++) {
                songs[a] = {artist: response.message.body.track_list[a].track.artist_name, title: response.message.body.track_list[a].track.track_name, trackID: response.message.body.track_list[a].track.track_id};
            }
            showResults();
        });
    }

    // If 'By artist' selected
    if (searchType==="artist") {
        var lyricsSearchURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_artist=" + searchInput + "&f_lyrics_language=en&f_has_lyrics=1&page_size=10&apikey=0f78df19f6a6884e6d61e22842b3c761";

        $.ajax({
            url: lyricsSearchURL,
            jsonp: "callback",
            dataType: "jsonp",
            method: "GET",
        }).done(function(response) {
            for (var a = 0; a < response.message.body.track_list.length; a++) {
                songs[a] = {artist: response.message.body.track_list[a].track.artist_name, title: response.message.body.track_list[a].track.track_name, trackID: response.message.body.track_list[a].track.track_id};
            }
            showResults();
        });
    }

    // If 'By song title' selected
    if (searchType==="title") {
        var lyricsSearchURL = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=" + searchInput + "&f_lyrics_language=en&f_has_lyrics=1&page_size=10&apikey=0f78df19f6a6884e6d61e22842b3c761";
    
        $.ajax({
            url: lyricsSearchURL,
            jsonp: "callback",
            dataType: "jsonp",
            method: "GET",
        }).done(function(response) {
            for (var a = 0; a < response.message.body.track_list.length; a++) {
                songs[a] = {artist: response.message.body.track_list[a].track.artist_name, title: response.message.body.track_list[a].track.track_name, trackID: response.message.body.track_list[a].track.track_id};
                }
            showResults();
        });
    }
};

// Update page to show top songs to be picked by radio button
function showResults() {
    $("#song-results").empty();
    var songResults = $("#song-results");

    for (var c = 0; c < 10; c++) {
        var button = $("<input>");
        button.attr("type", "radio");
        button.attr("name", "song-result");
        var temp1 = songs[c].trackID;
        button.attr("id", temp1);
        button.addClass("song-result");
        var label = $("<label>");
        label.attr("for", temp1);
        var temp2 = songs[c].artist + " - " + songs[c].title;
        label.text(temp2);
        var br = $("<br>");
        songResults.append(button, label, br);
    }
}

// When radio button for a song is clicked, display lyrics of that song
$(document).on("click", ".song-result", function() {
    $("#fun-buttons").empty();
    $("#lyrics-display").empty();
    var thisTrackID = $(this).attr("id");
    var trackIDSearchURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + thisTrackID + "&apikey=0f78df19f6a6884e6d61e22842b3c761";

    $.ajax({
        url: trackIDSearchURL,
        jsonp: "callback",
        dataType: "jsonp",
        method: "GET"
    }).done(function(response) {
        currentLyrics = response.message.body.lyrics.lyrics_body;
        $("#lyrics-display").text(currentLyrics);
    });

    var rhymify = $("<button>");
    rhymify.addClass("rhymify");
    rhymify.text("Rhymify!");

    var fartify = $("<button>");
    fartify.addClass("fartify");
    fartify.text("Fartify!");

    $("#fun-buttons").append(rhymify, fartify);
});

// Function to take lyrics from a continuous string and return an array of the last word in each line
// Lines must be separated by '\n'
function lastWords(str) {
    var lastWords = [];
    var punct = [".", ",", "?", "!", "(", "[", "{", "¿", "¡", ")", "]", "}", "/", "-", "\""];
    var lines = str.split('\n');

    for (var i = 0; i < lines.length; i++) {
        lineWords = lines[i].split(' ');
        if (lineWords != "") {
            var newLast = lineWords[lineWords.length-1];
            for (var j = 0; j < punct.length; j++) {
                while (newLast[newLast.length-1]==punct[j]||newLast[0]==punct[j]) {
                    newLast = newLast.slice(0, newLast.length - 1);
                }
            }
            if (newLast==="you're") {
                newLast = "your";
            }
            if (newLast==="I'm") {
                newLast = "time";
            }
            if ((!newLast.includes("****"))&&(newLast!="")) {
                lastWords.push(newLast);
            }
        }
    }
    return lastWords;
}

// Function to take lyrics from a continuous string and return an array of the last word in each line
// Lines must be separated by '\n'
// function rhymify(str) {
//     var tempArray = [];
//     var punct = [".", ",", "?", "!", "(", "[", "{", "¿", "¡", ")", "]", "}", "/", "-"];
//     var words = str.split(' ');

//     for (var i = 0; i < words.length; i++) {
//         lineWords = lines[i].split(' ');
//         if (lineWords != "") {
//             for (var j = 0; j < lineWords.length; j++) {
            
//                 var tempWord = lineWords[j];
//                 for (var k = 0; k < punct.length; k++) {
//                     while (newLast[newLast.length-1]==punct[j]||newLast[0]==punct[k]) {
//                         newLast = newLast.slice(0, newLast.length - 1);
//                     }
//                 }
//                 if ((!newLast.includes("****"))&&(newLast!="")) {
//                     lastWords.push(newLast);
//                 }
//             }
//         }
//     }
//     return lastWords;
// }


function displayRhymes(rhymes) {
    console.log(rhymes);
    var rhymesBlock = $("#rhymes-display");
    var rhymesText = "";
    var rhymesLine = "";
    for (var q = 0; q < rhymes.length; q++) {
        console.log(rhymes[q]);
        for (var r = 0; r < rhymes[q].length; r++) {
            console.log(rhymes[q][r]);
            rhymesLine = rhymesLine + rhymes[q][r] + " ";
        }
        rhymesLine = rhymesLine + "\n";
        rhymesText = rhymesText + rhymesLine;
    }
    console.log(rhymesText);
    rhymesBlock.text(rhymesText);
}

// When "Rhymify" button is clicked, display rhymes of last word in each line
$(document).on("click", ".rhymify", function () {
    var lasts = lastWords(currentLyrics);
    console.log(lasts);
    var rhymes = [];
    var temp = [];
    for (var z = 0; z < lasts.length; z++) {
        var toRhyme = lasts[z];
        var rhymeSearchURL = "https://api.datamuse.com/words?rel_rhy=" + toRhyme;

        $.ajax({
            url: rhymeSearchURL,
            method: "GET"
        }).done(function(response) {
            for (var a = 0; a < Math.min(15, response.length); a++) {
                if (typeof(response[a].word)!="undefined") {
                    temp.push(response[a].word);
                }
            }
            rhymes.push(temp);
            temp = [];
        });
    }
    displayRhymes(rhymes);
});

// When "Fartify" button is clicked, update all single-syllable rhymes of "fart" or "farts"
$(document).on("click", ".fartify", function () {
    var splitWords = currentLyrics.split(' ');
    for (var e = 0; e < splitWords.length; e++) {
        for (var f = 0; f < fart.length; f++) {
            if (splitWords[e].includes(fart[f])) {
                splitWords[e].replace(fart[f], "fart");
            }
            if (splitWords[e].includes(farts[f])) {
                splitWords[e].replace(farts[f], "farts");
            }
        }
    }
    console.log(splitWords);
});

var heart = "heart";
console.log(heart.includes("heart"));