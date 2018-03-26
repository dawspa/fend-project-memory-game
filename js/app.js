let temp = document.querySelectorAll('.card');
const cardsArr = [...temp];
const deck = document.getElementById('deck');

const counter = document.querySelector(".moves");
let moves = 0;

const timer = document.querySelector('.timer');
let sec = 0;
let min = 0;
let timing;

const stars = document.querySelectorAll('.fa-star');

let cardsOpen = [];

//timer functionality - maybe after card open
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

//move counter - call in clicking
function moveCount() {
    moves++;
    counter.innerHTML = moves;
}

//stars rating - call in clicking
function starRating() {
    if (moves === 15) {
        stars[2].style.visibility = 'hidden';
    }
    if (moves === 25) {
        stars[1].style.visibility = 'hidden';
    }
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
    shuffle(cardsArr);
    deck.innerHTML = '';
    for (let card of cardsArr) {
        deck.appendChild(card);
        card.classList.remove('open', 'show', 'match', 'blockClick');
        card.addEventListener('click', gameplay);
    }
    //timer reset
    sec = 0;
    min = 0;
    clearInterval(timing);
    //moves reset
    moves = 0;
    counter.innerHTML = moves;
    setTimeout(timerStart(), 2000);
}

function gameplay() {
    console.log('click');
}
/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
