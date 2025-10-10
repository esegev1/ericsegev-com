import { cardsObj } from './cards.js';
const imagePath = `./images/home/`;

function handleInputs() {
    const category = document.querySelector('#category').value;
    const size = document.querySelector('#grid-size').value;

    setBoard(category, size);
}


function resolveAfter2Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, 750);
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

    //clear out existing board
    board.innerHTML = '';

    //Define size of board
    const dimensions = size.split("_");
    const boardHeight = dimensions[0];
    const boardWidth = dimensions[1];
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

/**************************************************************
 *    Generate HTML elements for the title, user inputs
 *    and comtainer for board  
 *    
 **************************************************************/
function createHeader() {
    const body = document.querySelector('body');
    //create  grid size options
    const sizeOption1 = document.createElement('option');
    sizeOption1.value = '4_4';
    sizeOption1.text = '4 x 4';

    const sizeOption2 = document.createElement('option');
    sizeOption2.value = '2_4';
    sizeOption2.text = '2 x 4';

    const sizeOption3 = document.createElement('option');
    sizeOption3.value = '4_6';
    sizeOption3.text = '4 x 6';

    const sizeOption4 = document.createElement('option');
    sizeOption4.value = '5_4';
    sizeOption4.text = '5 x 4';

    const sizeOption5 = document.createElement('option');
    sizeOption5.value = '5_10';
    sizeOption5.text = '5 x 10';


    //create grid size select
    const gridSizeSelect = document.createElement('select');
    gridSizeSelect.className = 'modern-select filled';
    gridSizeSelect.id = 'grid-size';
    gridSizeSelect.name = 'selectedOption'; //Maybe can remove

    gridSizeSelect.appendChild(sizeOption1);
    gridSizeSelect.appendChild(sizeOption2);
    gridSizeSelect.appendChild(sizeOption3);
    gridSizeSelect.appendChild(sizeOption4);
    gridSizeSelect.appendChild(sizeOption5);

    //create category select label
    const gridSizeLabel = document.createElement('label');
    gridSizeLabel.setAttribute('for', 'grid-size');
    gridSizeLabel.innerText = 'Choose Category'

    //create grid size div
    const gridSizeDiv = document.createElement('div');
    gridSizeDiv.classList.toggle('input-container')

    gridSizeDiv.appendChild(gridSizeLabel)
    gridSizeDiv.appendChild(gridSizeSelect)

    //create category options
    const categoryOption1 = document.createElement('option');
    categoryOption1.value = 'cars';
    categoryOption1.text = 'Cars';

    const categoryOption2 = document.createElement('option');
    categoryOption2.value = 'dogs';
    categoryOption2.text = 'Dogs';

    const categoryOption3 = document.createElement('option');
    categoryOption3.value = 'foods';
    categoryOption3.text = 'Foods';

    //create category select
    const categorySelect = document.createElement('select');
    categorySelect.className = 'modern-select filled';
    categorySelect.id = 'category';
    categorySelect.name = 'selectedOption'; //Maybe can remove

    categorySelect.appendChild(categoryOption1);
    categorySelect.appendChild(categoryOption2);
    categorySelect.appendChild(categoryOption3);

    //create category select label
    const categoryLabel = document.createElement('label');
    categoryLabel.setAttribute('for', 'category');
    categoryLabel.innerText = 'Choose Category'

    //create category div
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.toggle('input-container')

    categoryDiv.appendChild(categoryLabel);
    categoryDiv.appendChild(categorySelect);

    //create inputs section
    const inputsSection = document.createElement('section');
    inputsSection.id = 'inputs';
    inputsSection.addEventListener('change', handleInputs)

    inputsSection.appendChild(gridSizeDiv);
    inputsSection.appendChild(categoryDiv);

    //create game title element
    const h1 = document.createElement('h1');
    h1.innerText = 'Memory Game by Category'


    //create header element
    const topSection = document.createElement('section');
    topSection.classList.toggle('top-section');

    topSection.appendChild(h1);
    topSection.appendChild(inputsSection);

    //create board section
    const board = document.createElement('section');
    board.classList.toggle('board');
    board.addEventListener('click', handleClicks);

    //create game container section
    const gameContainer = document.createElement('section');
    gameContainer.classList.toggle('game-container');

    gameContainer.appendChild(board);

    //create back button
    const backButton = document.createElement('button');
    backButton.innerText = `Back`;

    backButton.addEventListener('click', generateHomePage);

    //add it all to the body
    body.appendChild(topSection);
    body.appendChild(gameContainer);
    body.appendChild(backButton);
}



/**************************************************************
 *    Generate HTML elements 
 *    and set the cards on the board 
 *    
 **************************************************************/
function initializeBoard() {
    //create HTML elements for game
    const body = document.querySelector('body')
    body.replaceChildren();
    console.log('test');

    //
    createHeader();

    //create the game board
    const category = 'cars';
    const size = '4_4';
    setBoard(category, size);
}

//BELOW IS JS FOR THER FULL WEBSITE, ABOVE IT THE GAME 
/**************************************************************
 *    handles when someone clicks a project
 *     this finds the right project to open for the user
 *    
 **************************************************************/
const projectHandler = (event) => {
    console.log(`currentTarget: ${event.target.id}`);
    const project = event.target.id;

    switch (project) {
        case 'memory-game': initializeBoard();
    }


}
/**************************************************************
 *    Generate HTML structure for header
 *     
 *    
 **************************************************************/
function generateHeader() {
    const socialObj = {
        email: [`mailto:esegev1@gmail.com`, `emailLogo.png`],
        gitHub: [`https://github.com/esegev1`, `gitHubLogo.png`],
        linkedIn: [`https://www.linkedin.com/in/ericsegev/`, `linkedInLogo.png`],
    }

    //create proffesional social link container
    const socialLinks = document.createElement('div');
    socialLinks.classList.toggle('social-links');

    //loop through socialObj to create links
    for (const social in socialObj) {
        const a = document.createElement('a');
        a.href = socialObj[social][0];
        a.target = `_blank`

        const img = document.createElement('img');
        img.src = `${imagePath}${socialObj[social][1]}`;

        a.appendChild(img);

        socialLinks.appendChild(a);
    }

    //creat logo div
    const myLogo = document.createElement('div')
    myLogo.classList.toggle('my-logo');

    //create site header
    const header = document.createElement('header');
    header.classList.toggle('header');

    header.appendChild(myLogo);
    header.appendChild(socialLinks);

    return header;
}


/**************************************************************
 *    Generate HTML structure for the intro section
 *     
 *    
 **************************************************************/
function generateIntro() {
    //create title
    const title = document.createElement('h1');
    title.id = 'hello';
    title.innerText = 'Hello!'

    //create summary language
    const p1 = document.createElement('p');
    p1.id = 'p1';
    p1.innerText = `I’m Eric, I’m a data driven Ops and Product leader with \
                    'big tech' experience.`;

    const p2 = document.createElement('p');
    p2.id = 'p2';
    p2.innerHTML = `Above all else, <span id="builder">I'm a builder</span>, \
                    check out my projects below!`;

    //create intro section
    const intro = document.createElement('section');
    intro.classList.toggle('intro');

    intro.appendChild(title);
    intro.appendChild(p1);
    intro.appendChild(p2);

    return intro;

}
/**************************************************************
 *    Generate HTML structure for the experience 
 *     section
 *    
 **************************************************************/
function generateExperience() {

    const experienceObj = {
        google: `${imagePath}google.png`,
        salesforce: `${imagePath}salesforce.png`,
        facebook: `${imagePath}facebook.png`,
        nielsen: `${imagePath}nielsen.png`,
    }

    //create experiences container
    const experience = document.createElement('section');
    experience.classList.toggle('experience');

    //create each company section and its logo img
    for (const exp in experienceObj) {
        //create img element and pull image link from obj
        const img = document.createElement('img');
        img.src = experienceObj[exp];

        //create container div for the img
        const div = document.createElement('div');
        div.classList.toggle('employer');

        div.appendChild(img);

        experience.appendChild(div)
    }

    return experience;
}

function generateEric() {
    //create avatar img
    const ericLogo = document.createElement('img');
    ericLogo.src = `${imagePath}ericlogo.png`;

    //create avatar div
    const ericDiv = document.createElement('div');
    ericDiv.classList.toggle('eric')

    ericDiv.appendChild(ericLogo);

    return ericDiv
}


/**************************************************************
 *    Generate HTML structure for education section
 *     
 *    
 **************************************************************/
function generateEducation() {
    //create education section
    //NEW YORK LAW SCHOOL
    const nylsLogo = document.createElement('img');
    nylsLogo.src = `${imagePath}nyls.png`;

    const nyls = document.createElement('div');
    nyls.classList.toggle('school');

    nyls.appendChild(nylsLogo);

    //BINGHAMTON UNIVERSITY
    const buLogo = document.createElement('img');
    buLogo.src = `${imagePath}bu.png`;

    const bu = document.createElement('div');
    bu.classList.toggle('school');

    bu.appendChild(buLogo);

    //create education section
    const education = document.createElement('section');
    education.classList.toggle('education');

    education.appendChild(nyls);
    education.appendChild(bu);

    return education;

}

/**************************************************************
 *    Generate HTML structure for background section
 *     
 *    
 **************************************************************/
function generateBackground() {
    //create background title
    const backgroundTitle = document.createElement('h2');
    backgroundTitle.id = 'background-title';
    backgroundTitle.innerText = 'Background';

    //create background div
    const background = document.createElement('div')
    background.classList.toggle('background');

    //create experience and education sections
    const experience = generateExperience();
    const education = generateEducation();

    background.appendChild(backgroundTitle);
    background.appendChild(experience);
    background.appendChild(education);

    return background;
}

/**************************************************************
 *    Generate HTML structure for main section
 *     
 *    
 **************************************************************/
function generateMain() {
    const intro = generateIntro();
    const ericDiv = generateEric();
    const background = generateBackground();

    //create about me section
    const aboutMe = document.createElement('section');
    aboutMe.classList.toggle('about-me');

    aboutMe.appendChild(intro);
    aboutMe.appendChild(ericDiv);
    aboutMe.appendChild(background);

    const projects = generateProjects();

    //create main section - for flex purposes
    const main = document.createElement('section');
    main.classList.toggle('main');

    //add everything to the body
    main.appendChild(aboutMe);
    main.appendChild(projects);

    return main;

}

/**************************************************************
 *    Generate HTML structure for projects section
 *     
 *    
 **************************************************************/
function generateProjects() {
    //create projects section
    const projects = document.createElement('section');
    projects.classList.toggle('projects');

    //create projects title
    const projectsTitle = document.createElement('h2');
    projectsTitle.id = 'projects-title';
    projectsTitle.innerText = 'Projects';

    projects.appendChild(projectsTitle);

    //create list of projects
    const ul = document.createElement('ul');

    const li = document.createElement('li');
    li.innerText = 'Memory Game';
    li.id = "memory-game";

    ul.appendChild(li);

    projects.appendChild(ul);

    //add click listenere to the projects section
    projects.addEventListener('click', projectHandler);


    return projects;

}


/**************************************************************
 *    Generate HTML structure for home page
 *     
 *    
 **************************************************************/
function generateHomePage() {
    const body = document.querySelector('body');
    body.replaceChildren()

    const header = generateHeader();
    const main = generateMain();

    body.appendChild(header);
    body.appendChild(main);


}

generateHomePage()

// initializeBoard();