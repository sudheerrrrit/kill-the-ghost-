var nickNameScreen = document.getElementById('nicknamescreen');

var menu = document.getElementById('menu');
var screen = document.getElementById('screen');
var ghost = document.getElementById('ghost');
var score = document.getElementById('score');
var timeleft = document.getElementById('timeleft');
var scoreNumber = 0;
var scoreboard = document.getElementById('scoreboard');
var finalScoreScreen = document.getElementById('finalscore');
var helpmenu = document.getElementById('helpmenu');


var intervalGhost; //interval between the changes of the ghost
var intervalTimeLeft;




//gets the properties of the window - width and height - directly from the CSS
var screenWidth = parseFloat(getComputedStyle(screen).getPropertyValue('width')); 
var screenHeight = parseFloat(getComputedStyle(screen).getPropertyValue('height'));


//gets the ghost width/height and border values, so the ghost doesn't overflow off the screen
var ghostWidth = parseFloat(getComputedStyle(ghost).getPropertyValue('width'));
var ghostHeight = parseFloat(getComputedStyle(ghost).getPropertyValue('height'));
var screenBorder = parseFloat(getComputedStyle(screen).getPropertyValue('border-width'));

//this will change the movement range of the ghost - so the ghost doesn't overflow anymore
//works like a transform(-100%, -100%) + the border;
screenHeight -= (ghostHeight + (screenBorder * 2));  //*2 because there's 2 borders
screenWidth -= (ghostWidth + (screenBorder * 2));



function loadMenu(){
    menu.style.display = 'block';
    nickNameScreen.style.display = 'none';
}

//function to start the game
function start(){
    score.innerHTML = 'Score: ' + 0;
    scoreNumber = 0;
    menu.style.display = 'none';
    ghost.style.display = 'block';
    score.style.display = 'block';
    timeleft.style.display ='block';

    intervalGhost = setInterval(newPosition, 500); //interval to update the ghost position
    startCountdown();

    setTimeout(stop,  60 * 1000); //this makes the game end - at 1 minute
    
}

//I need to find a better way to do this countdown
function startCountdown(){
    let seconds = 59;
    timeleft.innerHTML = '0:' + seconds;
    intervalTimeLeft = setInterval(function(){
        seconds--;
        if(seconds >= 10){
            timeleft.innerHTML = '0:' + seconds;
        }
        else{
            timeleft.innerHTML = '0:0' + seconds;
        }
    }, 1000);
}

function stop(){
    clearInterval(intervalGhost);
    clearInterval(intervalTimeLeft);
    ghost.style.display = 'none';
    timeleft.style.display = 'none';
    score.style.display = 'none';
    
    finalScoreScreen.style.display = 'block';
    setTimeout(fadeIn, 20) //timeout to the fade in work - because it had display none, so it will bug it

    storeScore();
}

function fadeIn(){
    let yourFinalScore = document.getElementById('yourscore');
    yourFinalScore.innerHTML = 'Your Score: ' + scoreNumber;
    finalScoreScreen.style.opacity = '1';
}





// function that calculates randomly the position of the ghost
function newPosition(){
    let newPos_width = Math.random() * screenWidth;
    let newPos_height = Math.random() * screenHeight;

    ghost.style.left = newPos_width;
    ghost.style.top = newPos_height;

}



//when you click the ghost, this function scores and move the ghost to a next direction, aswell as reanitialize the interval


function scoreIt(){
    scoreNumber += 1;
    score.innerHTML = 'Score: ' + scoreNumber;
    newPosition();
    clearInterval(intervalGhost);
    intervalGhost = setInterval(newPosition, 500);
}



function showScoreboard(){
    menu.style.display = 'none';
    scoreboard.style.display = 'grid';

    finalScoreScreen.style.display = 'none';
    updateScoreboard();
}

function returnToMenu(){
    menu.style.display = 'block';
    scoreboard.style.display = 'none';
    helpmenu.style.display = 'none';
}


function showHelp(){
    helpmenu.style.display = 'grid';
    menu.style.display = 'none';
}


