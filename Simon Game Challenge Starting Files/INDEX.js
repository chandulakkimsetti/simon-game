var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern=[];
var lastAnsIndex=0;
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(lastAnsIndex);
    lastAnsIndex++;    
})
function nextSequence(){
    lastAnsIndex=0;
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4); 
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("level "+level);
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
      }, 200);

}
var level=0;
var gameStart=false;

$(document).keypress(function(){
    
    if(gameStart==false){
        nextSequence();
        gameStart=true;
    }
    
    $("h1").text("level "+level);
}
);

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]!=gamePattern[currentLevel]){
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);
          startOver();

    }
    if(level==currentLevel+1){
        setTimeout(function(){
            nextSequence()
        },1000)
    }
}

function startOver(){
    gamePattern=[];
    level=0;
    gameStart=false;
}



