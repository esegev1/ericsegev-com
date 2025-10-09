import { cardsObj } from './cards.js';

function handleInputs() {
    const category = document.querySelector('#category').value;
    const size = document.querySelector('#grid-size').value;

    setBoard(category, size);
}


function resolveAfter2Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, 1500);
    });
}

function flipping(element) {
    return new Promise((resolve) => {
        element.classList.toggle('flipped');
        setTimeout(() => {
            resolve("resolved");
        }, 500);
    });
}

/**************************************************************
 *    Handles clicks and finds the card that was clicked
 *    Once two cards clicked checks if they match or not   
 *    if all cards are complete, reset board.
 **************************************************************/
const handleClicks = async (event) => {
    // console.log(`event at id: ${event.target.id}`);

    const board = document.querySelector('.board');

    //Use target element to traverse up to card div and get its id
    const target = event.target;
    let element = target;
    while (!element.classList.contains(`card`)) {
        element = element.parentElement;
    }
    console.log(`after traverse, element: ${element.classList}`);

    if (element.classList.contains(`complete`) === false) {
        //flip card and mark as part of the current set
        await flipping(element);


        element.classList.toggle('current-set');

        const cardSet = document.querySelectorAll('.current-set');

        //remove after testing is complete
        let c = 0;
        cardSet.forEach(card => {
            console.log(`${c}: ${card.id}`);
            c++;
        });

        const cardCount = cardSet.length;

        if (cardCount === 2) {
            const firstCard = cardSet[0];
            const secondCard = cardSet[1];

            console.log(`pair open`);

            console.log(`0: ${firstCard.id}, 1: ${secondCard.id} `);

            //if the two cards match
            if (firstCard.id === secondCard.id) {
                console.log(`Match!: ${1}`);

                //mark cards complete
                firstCard.classList.toggle('complete');
                secondCard.classList.toggle('complete');

                //add gray tint
                firstCard.style.filter = "grayscale(100%) brightness(0.6)";
                secondCard.style.filter = "grayscale(100%) brightness(0.6)";

                //check if all items are now complete
                const completeCount = document.querySelectorAll('.complete').length;
                const boardSize = document.querySelectorAll('.card').length

                if (completeCount === boardSize) {
                    alert(`You did it!!!!`);
                    //reset the board
                    const category = document.querySelector('#category').value;
                    const size = document.querySelector('#grid-size').value;
                    setBoard(category, size);
                }

            } else {

                //disable board events before flipping cards back over
                board.removeEventListener('click', handleClicks);
                await resolveAfter2Seconds();
                board.addEventListener('click', handleClicks);

                //flip cards over
                firstCard.classList.toggle('flipped');
                secondCard.classList.toggle('flipped');
            }

            //remove current designation, cleaning out the set
            firstCard.classList.toggle('current-set');
            secondCard.classList.toggle('current-set');
        }
    }
}

/*****************************************************  
 * 
 *   create html for a card
 *     accepts image name and category
*****************************************************/
function createCard(category, imageName, imageNum) {
    //create front image
    const frontImg = document.createElement('img');
    frontImg.src = `./images/${category}/${imageName}`;
    frontImg.id = `_${imageNum + 1}`; //+1 to convert from usedCards array position to image number

    //crete front of card div
    const frontFace = document.createElement('div');
    frontFace.classList.add(`card-face`, `card-front`);
    frontFace.appendChild(frontImg);

    //create back image
    const backImg = document.createElement('img');
    backImg.src = `./images/back.png`;

    //crete back of card div
    const backFace = document.createElement('div');
    backFace.classList.add(`card-face`, `card-back`);
    backFace.appendChild(backImg);

    //create the card div
    const card = document.createElement('div');
    card.classList.add(`card`, `flipped`);
    card.id = `_${imageNum + 1}`; //+1 to convert from usedCards array position to image number

    card.appendChild(frontFace);
    card.appendChild(backFace);

    //create the card container div
    const cardContainer = document.createElement('div');
    cardContainer.className = `card-container`;
    cardContainer.appendChild(card)

    return cardContainer;
}


/*****************************************************  
 * 
 *   Create 50 cards for baord
 *       accepts category to pick image folder
*****************************************************/

function setBoard(category, size) {

    const board = document.querySelector('.board');
    board.addEventListener('click', handleClicks);

    //clear out existing board
    board.innerHTML = '';

    //Define size of board
    const boardHeight = size[0];
    const boardWidth = size[2];
    const boardSize = boardHeight * boardWidth;
    const usedCards = [];

    let imageNum = 0

    //create array of random 50 numbers
    while (usedCards.length < boardSize) {
        imageNum = Math.round(Math.random() * ((boardSize / 2) - 1));
        let count = usedCards.filter(item => item === imageNum);

        if (count.length < 2) {
            usedCards.push(imageNum);
        }
    }

    console.log(`usedCards: ${JSON.stringify(usedCards)}`);

    //Loop through rows of board
    let itemCounter = 0;
    for (let x = 0; x < boardHeight; x++) {
        // console.log(`1. usedCards: ${usedCards.length}`);
        const row = document.createElement('div');
        row.className = `row`;
        for (let i = 0; i < boardWidth; i++) {
            //fetch random image
            const itemNum = usedCards[itemCounter];
            const imageName = cardsObj[category][itemNum];

            const cardContainer = createCard(category, imageName, itemNum);
            row.appendChild(cardContainer);

            itemCounter++;
        }
        board.appendChild(row);
    }
}

const inputElements = document.querySelector("#inputs");
inputElements.addEventListener('change', handleInputs)

const category = document.querySelector('#category').value;
const size = document.querySelector('#grid-size').value;

setBoard(category, size);