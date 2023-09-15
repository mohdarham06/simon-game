



let gameStarted = false;
let level = 0;

let gameSequence = [];
let userSequence = [];

let btns = ['green', 'red', 'yellow', 'blue'];

let h2 = document.querySelector('h2');
let startBtn = document.querySelector('.start-btn');


function saveHighestScore(score) {
    localStorage.setItem("scoreData", score);
    console.log('highest score saved in localStorage.');
}
function importHighestScore() {
    highestScore = localStorage.getItem("scoreData");
    if (highestScore == null) {
        highestScore = 0;
    }
}


let scoreElement = document.querySelector('.current-score');
let highestScoreElement = document.querySelector('.highest-score');

let displayScoreLength = userSequence.length;
scoreElement.innerText = `score: ${displayScoreLength}`

let highestScore;
importHighestScore();
highestScoreElement.innerText = `highest: ${highestScore}`

function scoreUpdation() {
    let currentScore = userSequence.length;
    if (currentScore > displayScoreLength) {
        displayScoreLength = currentScore;
        scoreElement.innerText = `score: ${displayScoreLength}`
    }
    scoreElement.innerText = `score: ${displayScoreLength}`

    if (displayScoreLength > highestScore) {
        highestScore = displayScoreLength;
        saveHighestScore(highestScore)
        highestScoreElement.innerText = `highest: ${highestScore}`
    }
}


startBtn.addEventListener('click', function () {
    if (gameStarted == false) {

        gameStarted = true;
        levelUp();
    }
})




function greenFlash(btn) {
    btn.classList.add('green-flash');
    setTimeout(() => {
        btn.classList.remove('green-flash')
        // console.log('flash removed')
    }, 400);
}
function redFlash(btn) {
    btn.classList.add('red-flash');
    setTimeout(() => {
        btn.classList.remove('red-flash')
        // console.log('flash removed')
    }, 400);
}
function yellowFlash(btn) {
    btn.classList.add('yellow-flash');
    setTimeout(() => {
        btn.classList.remove('yellow-flash')
        // console.log('flash removed')
    }, 400);
}
function blueFlash(btn) {
    btn.classList.add('blue-flash');
    setTimeout(() => {
        btn.classList.remove('blue-flash')
        // console.log('flash removed')
    }, 400);
}

function btnFlash(btn) {
    if (btn.getAttribute("id") == 'green') { greenFlash(btn) }
    if (btn.getAttribute("id") == 'red') { redFlash(btn) }
    if (btn.getAttribute("id") == 'yellow') { yellowFlash(btn) }
    if (btn.getAttribute("id") == 'blue') { blueFlash(btn) }
}



function levelUp() {
    gameInProgress = true;
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`

    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIndex];
    // let randomBtn = document.querySelector(`.${randomColor}`)

    gameSequence.push(randomColor);
    // console.log(gameSequence);

    for (let i = 0; i <= gameSequence.length - 1; i++) {
        setTimeout(() => {
            let flashSequenceBtn = document.querySelector(`.${gameSequence[i]}`);

            btnFlash(flashSequenceBtn);
        }, 500 * i)
    }

    setTimeout(() => {
        gameInProgress = false;
        // console.log('leveling up stop')
    }, (500 * gameSequence.length) - 85);
}

let correctSound = new Audio('assets/correct.mp3');
let wrongSound = new Audio('assets/wrong.mp3');

function checkResponse(index) {
    if (userSequence[index] === gameSequence[index]) {
        scoreUpdation();
        if (userSequence.length == gameSequence.length) {
            gameInProgress = true;
            correctSound.play();
            setTimeout(levelUp, 1000)
        }
    } else {
        gameInProgress = true;
        wrongSound.play();
        document.querySelector('.root').classList.add('game-over')
        setTimeout(function () {
            document.querySelector('.root').classList.remove('game-over')
            h2.innerHTML = `Game Over! Press START to play again`
        }, 1500)
        resetGame();
    }
}


function btnPress() {
    if (!gameInProgress) {
        let btn = this;
        let userColor = btn.getAttribute("id");

        btnFlash(btn);
        userSequence.push(userColor)
        checkResponse(userSequence.length - 1);
    }
}
let allBtns = document.querySelectorAll('.btn')
for (btn of allBtns) {
    btn.addEventListener('click', btnPress)
}


function resetGame() {
    gameStarted = false;
    gameSequence = [];
    userSequence = [];
    scoreElement.innerText = `score: ${userSequence.length}`
    level = 0;
}

