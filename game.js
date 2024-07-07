var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);

    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    var chosenColourId = "#"+randomChosenColour;
    $(chosenColourId).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}


$(document).keypress(function(){
    if(!start){
        $("h1").text("Level "+level);
        nextSequence();
        start = true;
    }
    
})

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        // console.log("Success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        // console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
