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

        // If 'By artist' selected


    // Update page to show top 5 songs to be picked by radio button
    song1 = 



});

// When radio button for a song is clicked, display lyrics of that song


// When "Rhymify" button is clicked, display rhymes of last word in each line


// When "Fartify" button is clicked, update all single-syllable rhymes of "fart"

