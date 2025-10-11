import { initializeBoard } from './memorygame.js';
const imagePath = `./images/home/`;

/**************************************************************
 *    handles when someone clicks a project
 *     this finds the right project to open for the user
 *    
 **************************************************************/
const projectHandler = (event) => {
    console.log(`currentTarget: ${event.currentTarget}, target.id: ${event.target.id}`);

    const target = event.target.closest('li');

    const project = target.id;

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
    const socialInfo = [
        { link: `mailto:esegev1@gmail.com`, image: `emailLogo.png` },
        { link: `https://github.com/esegev1`, image: `gitHubLogo.png` },
        { link: `https://www.linkedin.com/in/ericsegev/`, image: `linkedInLogo.png` },
    ]

    //create proffesional social link container
    const socialLinks = document.createElement('div');
    socialLinks.classList.toggle('social-links');

    //loop through socialObj to create links
    for (const social of socialInfo) {
        console.log(`social: ${social.link}`)
        const a = document.createElement('a');
        a.href = social.link;
        a.target = `_blank`

        const img = document.createElement('img');
        img.src = `${imagePath}${social.image}`;

        a.appendChild(img);

        socialLinks.appendChild(a);
    }

    //creat logo div
    const myLogo = document.createElement('div')
    myLogo.classList.toggle('my-logo');
    myLogo.innerText = 'ES';

    //create a nav element
    const nav = document.createElement('nav');

    nav.appendChild(myLogo);
    nav.appendChild(socialLinks);

    //create site header
    const header = document.createElement('header');
    header.classList.toggle('header');

    header.appendChild(nav)

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
                    deep tech industry experience.`;

    const p2 = document.createElement('p');
    p2.id = 'p2';
    p2.innerHTML = `But above all else, <span id="builder">I'm a builder</span>, \
                    check out my projects below!`;

    //create intro section
    const intro = document.createElement('section');
    intro.classList.toggle('intro');

    // const background = generateBackground();

    intro.appendChild(title);
    intro.appendChild(p1);
    intro.appendChild(p2);
    // intro.appendChild(background);

    return intro;

}
/**************************************************************
 *    Generate HTML structure for the experience 
 *     section
 *    
 **************************************************************/
function generateExperience() {

    const experienceInfo = [
        { google: `${imagePath}google.png` },
        { salesforce: `${imagePath}salesforce.png` },
        { facebook: `${imagePath}facebook.png` },
        { nielsen: `${imagePath}nielsen.png` },
    ]

    //create experiences container
    const experience = document.createElement('section');
    experience.classList.toggle('experience');

    //create each company section and its logo img
    for (const exp of experienceInfo) {
        //create img element and pull image link from obj
        const img = document.createElement('img');
        const key = Object.keys(exp);

        img.src = exp[key];

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
    // const education = generateEducation();

    background.appendChild(backgroundTitle);
    background.appendChild(experience);
    // background.appendChild(education);

    return background;
}

/**************************************************************
 *    Generate HTML structure for About me section
 *     
 *    
 **************************************************************/
function generateAboutMe() {
    //get components for about me section
    const intro = generateIntro();
    const ericDiv = generateEric();
    // const background = generateBackground();

    //create about me section
    const aboutMe = document.createElement('section');
    aboutMe.classList.toggle('about-me');

    aboutMe.appendChild(intro);
    aboutMe.appendChild(ericDiv);
    // aboutMe.appendChild(background);

    //create about me container for grid background effect
    const aboutMeContainer = document.createElement('section');
    aboutMeContainer.classList.toggle('about-me-container');

    aboutMeContainer.appendChild(aboutMe);

    return aboutMeContainer
}

/**************************************************************
 *    Generate HTML structure for projects section
 *     
 *    
 **************************************************************/
function generateProjects() {

    //array with list of projects to display
    const projectsArr = [
        { name: 'Memory Game', icon: `${imagePath}memorygame.png` },
        { name: 'F1 Fantasy', icon: `${imagePath}f1fantasy.png` }
    ];

    //create projects container
    const projectsContainer = document.createElement('section');
    projectsContainer.classList.toggle('projects-container');


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

    projects.appendChild(ul);

    //add click listenere to the projects section
    projects.addEventListener('click', projectHandler);

    projectsContainer.appendChild(projects);

    //create project tiles by looping through projectsArr
    for (const project of projectsArr) {
        console.log(project);
        //add project icon
        const projectIcon = document.createElement('img');
        projectIcon.src = project.icon

        //create tile for the project
        const tile = document.createElement('div');
        tile.classList.toggle('project-tile');

        tile.appendChild(projectIcon);

        //create project title
        const projectTitle = document.createElement('h3');
        projectTitle.innerText = project.name;

        //create list item element
        const li = document.createElement('li');
        li.class = 'project-container';


        li.appendChild(tile);
        li.appendChild(projectTitle);

        ul.appendChild(li);
    }

    return projectsContainer;
}

/**************************************************************
 *    Generate HTML structure for main section
 *     
 *    
 **************************************************************/
function generateMain() {

    const aboutMeContainer = generateAboutMe();
    const projectsContainer = generateProjects();

    //create main section - for flex purposes
    const main = document.createElement('section');
    main.classList.toggle('main');

    //add everything to the body
    main.appendChild(aboutMeContainer);
    main.appendChild(projectsContainer);

    return main;

}

/**************************************************************
 *    Generate HTML structure for home page
 *     
 *    
 **************************************************************/
export function generateHomePage() {
    const body = document.querySelector('body');
    body.replaceChildren()

    const header = generateHeader();
    const main = generateMain();

    body.appendChild(header);
    body.appendChild(main);


}

generateHomePage();

// initializeBoard();