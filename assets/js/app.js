// movie suggestions
var topics = [
"The Matrix", 
"White Chicks", 
"Star Wars", 
"The Notebook", 
"Mean Girls", 
"The Dark Knight", 
"Inception", 
"The Avengers"
];


// Get info from form
// Push it into an array
// Turn It Into a Button
$("#addMovie").on("click", function(){
	$("#moviesButton").empty();
	var newMovie = $("#movie-input").val().trim();
	topics.unshift(newMovie);
	console.log(topics);
	$("#movie-input").val("");
	renderButtons();
	giphyAPIRequest();
	return false;
});

// Clear GIFs Buttons
$("#clearButton").on("click", function() {
	$(".moviesButton").empty();
});


// function to make buttons
function renderButtons() {
	$(".moviesButton").empty();
	$(".moviesButton").append("<h3>Movies Suggestions</h3>");
	for (var i = 0; i < topics.length; i++){
		var newButton = $("<button>").attr("data-movie", topics[i]).attr("class", "movieButton" + [i]).html(topics[i]);
		$(".moviesButton").append(newButton);

	}
}

// Animate/Still
function playPauseButton() {
	$(".gifImg").on("click", function(){
		var selectedState = $(this).attr("data-state"); 
		console.log(this);
		console.log(selectedState);

		if (selectedState === "still"){
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
			$(this).siblings(".playButton").hide();
			console.log($("this"));

		}else{
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
			$(this).siblings(".playButton").show();
		}

	});
}

// Getting information from GIPHY API
function giphyAPIRequest() {
$("button").on("click", function() {
        var movie = $(this).data("movie");
        console.log(this);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    //clearing the old gifs
	$(".moviesGIF").empty();

	// AJAX function
    $.ajax({
     	url: queryURL,
		method: "GET"
            })
            .done(function(response) {
                var results = response.data;
                console.log(results);

                // getting gifs from giphy and putting them in the page
                for (var i = 0; i < results.length; i++) {

                	var newGifDiv = $("<div class='item'>");
                	var gifStillImg = $("<img class='gifImg'>").attr("src", response.data[i].images.fixed_height_still.url);
                	gifStillImg.attr("data-still", response.data[i].images.fixed_height_still.url).attr("data-animate", response.data[i].images.fixed_height.url).attr("data-state", "still");
                	var gifRating = $("<p class='rating'>").html("Rating: " + response.data[i].rating);
                	var playButtonImg = $("<img class='playButton'>").attr("src", "assets/images/playButton.png");

                	newGifDiv.append(playButtonImg);
                	newGifDiv.append(gifStillImg);
                	newGifDiv.append(gifRating);
                	$('.moviesGIF').prepend(newGifDiv);
                }
                playPauseButton()

            });
    });    
}

// when opening the page
$("document").ready(function() {
	renderButtons();
	giphyAPIRequest();

});