const cardsList = document.querySelectorAll('.card');
const cardsArr = [...cardsList];
const deck = document.getElementById('deck');

const counter = document.querySelector(".moves");
let moves = 0;

const timer = document.querySelector('.timer');
let sec = 0;
let min = 0;
let timing;

const stars = document.querySelectorAll('.fa-cube');
const starsP = document.querySelectorAll('.star-p');

let cardsOpen = [];
let matchesArr = [];

// const blocker = document.getElementById('blocker');

const reset = document.querySelector('.restart');

const endPopup = document.getElementById('popFinish');

//timer functionality
function timerStart() {
    timing = setInterval(function () {
        timer.textContent = `${min}:${sec}`;
        sec++;
        if (sec < 10) {
            sec = "0" + sec;
        }
        if (sec === 60) {
            min++;
            sec = 0;
        }
    }, 1000);
}

//move counter
function moveCount() {
    moves++;
    counter.innerHTML = moves;
}

//stars rating
function starRating() {
    if (moves === 15) {
        stars[2].style.visibility = 'hidden';
        starsP[2].style.visibility = 'hidden';
    }
    else if (moves === 25) {
        stars[1].style.visibility = 'hidden';
        starsP[1].style.visibility = 'hidden';
    }
}

//restart game with reset button
reset.addEventListener('click', start);

function gameEnd() {
    //save gametime
    const gameTime = timer.textContent;
    clearInterval(timing);
    //show gamemover screen
    endPopup.classList.toggle('pShow');
    //set stats
    document.getElementById('moveStats').innerHTML = moves;
    document.getElementById('timeStats').innerHTML = gameTime;
    gameRetry();
    gameClose();
}

//handle play again button
function gameRetry() {
    const retry = document.getElementById('retry');
    retry.addEventListener('click', start);
}

//handle close button
function gameClose() {
    const close = document.querySelector('.close');
    close.addEventListener('click', function () {
        endPopup.classList.remove('pShow')
    });
}

function disableCard() {
    for (let card of cardsArr) {
        card.classList.add('blockClick');
    }
}

function enableCard() {
    setTimeout(function () {
        for (let card of cardsArr) {
            card.classList.remove('blockClick');
        }
    }, 310);
    setTimeout(function () {
        for (let card of matchesArr) {
            card.classList.add('blockClick');
        }
    }, 312);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.onload = start();

function start() {
    endPopup.classList.remove('pShow');
    matchesArr = [];
    shuffle(cardsArr);
    deck.innerHTML = '';
    for (let card of cardsArr) {
        deck.appendChild(card);
        card.classList.remove('open', 'show', 'match', 'blockClick');
        card.addEventListener('click', gameplay);
    }
    //timer reset
    timer.innerHTML = '0:00';
    sec = 0;
    min = 0;
    clearInterval(timing);
    //moves reset
    moves = 0;
    counter.innerHTML = moves;
    setTimeout(timerStart(), 2000);
    //stars reset
    for (let i = 1; i < 3; i++) {
        stars[i].removeAttribute('style');
        starsP[i].removeAttribute('style');
    }
}


//gameplay engine
function gameplay() {
    //open card
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('blockClick');
    cardsOpen.push(this);

    //if 2 cards open, match them
    if (cardsOpen.length === 2) {
        //prevent clicking more than 2 cards
        disableCard();
        moveCount();
        starRating();
        //matching cards
        if (cardsOpen[0].isEqualNode(cardsOpen[1])) {
            cardsOpen[0].classList.toggle('match');
            cardsOpen[1].classList.toggle('match');
            cardsOpen[0].classList.remove('show', 'open');
            cardsOpen[1].classList.remove('show', 'open');
            matchesArr.push(cardsOpen[0], cardsOpen[1]);
            cardsOpen = [];

            //gameover screen display
            if (matchesArr.length === 16) {
                gameEnd();
            }
            enableCard();
        }
        else {
            //if no match, flip cards back after some time
            setTimeout(function () {
                cardsOpen[0].classList.remove('show', 'open');
                cardsOpen[1].classList.remove('show', 'open');
                cardsOpen = [];
                enableCard();
            }, 1000);
        }
    }
}

/*    Todo:
 *    +replace stars
 *    +responsivness
 *    +meta
 *    +license and readme, assets and code cleanup
 *    +check req udacity
 *    +icons git, photo game assets and screens, mc regular font http://fontsforweb.com/font/show?id=1412 , Minecraft 3 - "Asherz08", "MadPixel", "Ashley Denham"
 */
