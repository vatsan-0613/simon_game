var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$("div[type='button']").on("click", function () {
    animatePress(this.id);
    var userChosenColor = this.id;
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
})

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () { nextSequence(); }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()
    }

}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}

$("body").keypress(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});
