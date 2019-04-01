var userGuesses = document.getElementById("userGuesses");
var userAnswer = document.getElementById("userAnswer");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var directions = document.getElementById("directions");
var img = document.getElementById(picture);
var message = document.getElementById("message");
var inputField = document.getElementById("textInput");

var gamePlay = {
    guessesLeft: 10,
    wins: 0,
    losses: 0,
    wordsList: ["OUTER SPACE", "EARTH", "GALAXIES", "MOON", "SHOOTING STARS", "BLACK HOLE", "UNIVERSE", "SOLAR ECLIPSE", "ASTEROIDS"]
    imgList: ["outerspace.jpg", "earth.jpg", "galaxies.jpg", "shootingstars.jpg", "blackhole.jpg", "universe.jpeg", "solareclipse.jpg", "asteroids.jpg"]
    answers: "",
    imgSrc: "",
    wordDisplay: [],
    wrongGuess: [],
    rightGuess: [],

    gameStart: false,

    gameReset: function() {
        
    }
}