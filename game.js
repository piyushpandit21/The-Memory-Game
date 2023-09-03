//button colors array
var buttonColours = ["red", "blue", "green", "yellow"];

//empty array game pattern
var gamePattern = [];

//empty array for user responded
var userClickedPattern=[];

//only start when key is pressed
var started = false;

//show level
var level=0;

//detect keypress
$(document).keypress(function() {
  if (!started) {

    //change h1 to show level 
    $("#level-title").text("Level " + level);
    
    //call next sequence function
    nextSequence();

    //set started to true to know that game has been started 
    started = true;
  }
});

//click function
$( ".btn" ).click(function() {

  //name of color
  var userChosenColour = $(this).attr("id");

  //push in empty ser of user response
  userClickedPattern.push(userChosenColour);

  //play sound for user click
  playSound(userChosenColour);
  
  //animation function
  animatePress(userChosenColour);

  //check answer function
  checkAnswer(userClickedPattern.length-1)

} );

//function to check ans
function checkAnswer(currentLevel) {

  //check if user ans matchs with last sequence
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //if recent ans matchs go to next sequence
    if (userClickedPattern.length === gamePattern.length){

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    
    //play sound
    playSound("wrong");

    //apply gameover class to body
    $("body").addClass("game-over");

    //set timeout
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    //change h1
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //restart function when wrong
    startOver();

  }
}


// function for next sequence
function nextSequence() {

  //reset user clicked pattern for next level use
  userClickedPattern=[];

  //increase level after each success
  level++;

  //change h1
  $("#level-title").text("Level " + level);

  //random number btw 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  //random choosen color using random value and array color
  var randomChosenColour = buttonColours[randomNumber];

  //pushing random color in empty array
  gamePattern.push(randomChosenColour);

  //select random color and flash animation
  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //play audio of random chosen
  playSound(randomChosenColour);

}

// function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//add animation of pressed to color selected
function animatePress(currentColor) {

//add pressed class
 $("#" + currentColor).addClass("pressed");

 //delay of 100ms
 setTimeout(function() {
  $("#" + currentColor).removeClass("pressed");
 }, 100);
}

//startover function
function startOver() {

 //reset level,gamepattern to 0 & started to false
  level=0;
  gamePattern=[];
  started=false;
}