buttonColors = ["red", "blue", "green", "yellow"]

gamePattern  = []

userClickedPattern = []
level = 0
// generating random number
// using the random number to get a color from the list buttonColors and adding it the gamePattern array 
// using jQuery to locate the button with id of the random color that was picked and displating somne feedback to the user using a flash
// and the sound of the color picked

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed")
    setTimeout(function (){$("#"+currentColor).removeClass("pressed")},100)
}


function nextSequence() { 
    userClickedPattern = []
    level ++ 
    $("h1").text("Level "+ level)
    var randomNumber = Math.floor(Math.random() * 4) 

    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    

    $("#" + randomChosenColor).fadeOut("fast").fadeIn("fast")
    playSound(randomChosenColor)
}

//listening for button clicks
$(".btn").click(function() {
   var userChosenColor = this
   var colorID = $(userChosenColor).attr("id")
   userClickedPattern.push(colorID)
  
   playSound(colorID)
   animatePress(colorID)
   checkAnswer(userClickedPattern.length - 1)
   
})
// listening for keybaord to start game 

$(document).on("keypress", function (){
    if (level === 0) {
        $("h1").text("Level 0")
        nextSequence()
    }
})
// checking answers
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {        

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000)
        }
    } else {
        level = 0
        gamePattern = []        
        playSound("wrong")
        $("h1").text("Game over, Press any key to restart")
        $("body").addClass("game-over")
        setTimeout(function() { $("body").removeClass("game-over")}, 500)
    }
    }
