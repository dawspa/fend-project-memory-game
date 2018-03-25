let temp = document.getElementsByClassName('card');
const cardsArr = [...temp];
const deck = document.getElementById('deck');

let moveCount = document.getElementsByClassName('.moves');
let moves = 0;

const timer = document.querySelector('.timer');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
    }
    //timer reset
    sec = 0;
    min = 0;
    timer.textContent = '0:00';
    clearInterval(timing);
}

//timer functionality
let sec = 0;
let min = 0;
let timing;

function timerStart() {
    timing = setInterval(function () {
        timer.textContent = '${min}:${sec}';
        sec++;
        if (sec === 60) {
            min++;
            sec = 0;
        }
    }, 1000);
}

//move counter



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
