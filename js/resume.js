/**
 * Resume View Generator
 *
 * Creates a card-based resume layout
 */

const imagePath = `./images/home/`;

const resumeData = {
    name: 'Eric Segev',
    title: 'Builder & Operator',
    summary: 'Builder and operator with 15 years of experience across Google, Salesforce, and Facebook. From launching internal tools and API migrations to leading data-driven planning processes at scale. Equally comfortable writing code and aligning cross-functional stakeholders.',
    contact: {
        email: 'esegev1@gmail.com',
        github: 'https://github.com/esegev1',
        linkedin: 'https://www.linkedin.com/in/ericsegev/'
    },
    skills: {
        languages: ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Python', 'SQL'],
        apis: ['Node.js', 'REST APIs', 'Meta Graph', 'OpenAI', 'Google Cloud Functions'],
        databases: ['PostgreSQL', 'MongoDB', 'BigQuery'],
        tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Supabase', 'Claude Code']
    },
    experience: [
        {
            company: 'Google',
            location: 'New York, NY',
            roles: [
                {
                    title: 'Product Lead - YouTube',
                    dates: 'Sep 2021 - Oct 2025',
                    bullets: [
                        'Oversaw an API migration to leverage a new internal contracting tool (over 1,000 users migrated), working with cross functional product and business stakeholder teams to ensure a flawless migration',
                        'Introduced a new tool to capture crucial business terms from over 4,000 contracts into a searchable database used by the operations team to track YouTube\'s rights and obligations to content partners',
                        'Launched a new contracting workflow to Partner Managers, representing 6,000 partners, to support new monetization features on the YouTube platform'
                    ]
                },
                {
                    title: 'Strategy Lead - Google Cloud',
                    dates: 'Nov 2018 - Aug 2021',
                    bullets: [
                        'Built & launched a Forecasting tool to 250+ Sales managers, the tool was used for our bi-weekly forecast process and won a Sales Ops quarterly award for innovation',
                        'Supported the company\'s annual planning process with extensive data modeling and executive alignment sessions'
                    ]
                }
            ]
        },
        {
            company: 'Salesforce',
            location: 'San Francisco, CA',
            roles: [
                {
                    title: 'Sr. Manager, Quota & Capacity Planning',
                    dates: 'Jun 2017 - Oct 2018',
                    bullets: [
                        'Led the global Quota function at Salesforce; Oversaw a team of 12 Analyst/Mgrs in charge of supporting Sales Leaders across all market segments with a sales force of over 10,000 reps',
                        'Obtained $650,000 in internal funding from department EVP and CIO to oversee the building of a home brewed quota setting tool for our annual planning cycle',
                        'Improved the team\'s completion rate on monthly plan maintenance to 95% (+20% YoY)'
                    ]
                },
                {
                    title: 'Manager, QCP',
                    dates: 'Aug 2016 - May 2017',
                    bullets: [
                        'Built and led the team\'s Business Tools group which implemented the Anaplan Platform as part of a company wide project to improve Quota and Crediting functions'
                    ]
                },
                {
                    title: 'Sr. Analyst, QCP',
                    dates: 'Jun 2015 - Jul 2016',
                    bullets: [
                        'Owned the team\'s global capacity planning model used to define quota targets to the sales team'
                    ]
                }
            ]
        },
        {
            company: 'Facebook',
            location: 'Menlo Park, CA',
            roles: [
                {
                    title: 'Sales Operations Analyst',
                    dates: 'Jun 2014 - May 2015',
                    bullets: [
                        'Supported sales teams across multiple verticals (responsible for $500m annual revenue) with weekly forecasting reports and ad hoc market analysis'
                    ]
                }
            ]
        },
        {
            company: 'The Nielsen Co.',
            location: 'New York, NY',
            roles: [
                {
                    title: 'Associate - Emerging Growth/Product Development',
                    dates: 'Aug 2010 - Jun 2014',
                    bullets: [
                        'Built partnerships with data focused startups in the entertainment sector'
                    ]
                }
            ]
        }
    ],
    education: [
        { school: 'General Assembly', degree: 'Eng. Bootcamp', year: '2025', location: 'Remote' },
        { school: 'New York Law School', degree: 'JD', year: '2010', location: 'New York, NY' },
        { school: 'SUNY - Binghamton', degree: 'B.S. Finance', year: '2007', location: 'Binghamton, NY' }
    ]
};

/**
 * Creates a resume card element
 */
function createCard(title, content) {
    const card = document.createElement('div');
    card.classList.add('resume-card');

    if (title) {
        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('resume-card-title');
        cardTitle.textContent = title;
        card.appendChild(cardTitle);
    }

    if (typeof content === 'string') {
        const p = document.createElement('p');
        p.textContent = content;
        card.appendChild(p);
    } else if (content instanceof HTMLElement) {
        card.appendChild(content);
    }

    return card;
}

/**
 * Creates the profile/header card with photo
 */
function generateProfileCard() {
    const card = document.createElement('div');
    card.classList.add('resume-card', 'resume-profile-card');

    const photoContainer = document.createElement('div');
    photoContainer.classList.add('resume-photo-container');

    const photo = document.createElement('img');
    photo.src = `${imagePath}profile.jpg`;
    photo.alt = 'Eric Segev';
    photo.classList.add('resume-photo');
    photoContainer.appendChild(photo);

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('resume-profile-info');

    const name = document.createElement('h1');
    name.classList.add('resume-name');
    name.textContent = resumeData.name;

    const title = document.createElement('p');
    title.classList.add('resume-title');
    title.textContent = resumeData.title;

    const summary = document.createElement('p');
    summary.classList.add('resume-summary');
    summary.textContent = resumeData.summary;

    // Contact links
    const contactLinks = document.createElement('div');
    contactLinks.classList.add('resume-contact-links');

    const emailLink = document.createElement('a');
    emailLink.href = `mailto:${resumeData.contact.email}`;
    emailLink.innerHTML = `<img src="${imagePath}emailIcon.svg" alt="Email"> ${resumeData.contact.email}`;

    const githubLink = document.createElement('a');
    githubLink.href = resumeData.contact.github;
    githubLink.target = '_blank';
    githubLink.innerHTML = `<img src="${imagePath}gitHubLogo.png" alt="GitHub"> GitHub`;

    const linkedinLink = document.createElement('a');
    linkedinLink.href = resumeData.contact.linkedin;
    linkedinLink.target = '_blank';
    linkedinLink.innerHTML = `<img src="${imagePath}linkedInLogo.png" alt="LinkedIn"> LinkedIn`;

    const downloadLink = document.createElement('a');
    downloadLink.href = './files/Eric_Segev_Resume.pdf';
    downloadLink.download = 'Eric_Segev_Resume.pdf';
    downloadLink.innerHTML = `<img src="${imagePath}downloadIcon.svg" alt="Download"> Download PDF`;
    downloadLink.classList.add('resume-download-link');

    contactLinks.appendChild(emailLink);
    contactLinks.appendChild(githubLink);
    contactLinks.appendChild(linkedinLink);
    contactLinks.appendChild(downloadLink);

    infoContainer.appendChild(name);
    infoContainer.appendChild(title);
    infoContainer.appendChild(summary);
    infoContainer.appendChild(contactLinks);

    card.appendChild(photoContainer);
    card.appendChild(infoContainer);

    return card;
}

/**
 * Creates the skills card
 */
function generateSkillsCard() {
    const content = document.createElement('div');
    content.classList.add('resume-skills-content');

    const categories = [
        { label: 'Languages', items: resumeData.skills.languages },
        { label: 'APIs', items: resumeData.skills.apis },
        { label: 'Databases', items: resumeData.skills.databases },
        { label: 'Tools', items: resumeData.skills.tools }
    ];

    for (const category of categories) {
        const row = document.createElement('div');
        row.classList.add('resume-skill-row');

        const label = document.createElement('span');
        label.classList.add('resume-skill-label');
        label.textContent = category.label;

        const tags = document.createElement('div');
        tags.classList.add('resume-skill-tags');

        for (const skill of category.items) {
            const tag = document.createElement('span');
            tag.classList.add('resume-skill-tag');
            tag.textContent = skill;
            tags.appendChild(tag);
        }

        row.appendChild(label);
        row.appendChild(tags);
        content.appendChild(row);
    }

    return createCard('Technical Skills', content);
}

/**
 * Creates an experience card for a company
 */
function generateExperienceCard(exp) {
    const card = document.createElement('div');
    card.classList.add('resume-card', 'resume-experience-card');

    const header = document.createElement('div');
    header.classList.add('resume-exp-header');

    const companyName = document.createElement('h2');
    companyName.classList.add('resume-card-title');
    companyName.textContent = exp.company;

    const location = document.createElement('span');
    location.classList.add('resume-exp-location');
    location.textContent = exp.location;

    header.appendChild(companyName);
    header.appendChild(location);
    card.appendChild(header);

    for (const role of exp.roles) {
        const roleDiv = document.createElement('div');
        roleDiv.classList.add('resume-role');

        const roleHeader = document.createElement('div');
        roleHeader.classList.add('resume-role-header');

        const roleTitle = document.createElement('h3');
        roleTitle.classList.add('resume-role-title');
        roleTitle.textContent = role.title;

        const dates = document.createElement('span');
        dates.classList.add('resume-role-dates');
        dates.textContent = role.dates;

        roleHeader.appendChild(roleTitle);
        roleHeader.appendChild(dates);
        roleDiv.appendChild(roleHeader);

        const bulletList = document.createElement('ul');
        bulletList.classList.add('resume-bullets');

        for (const bullet of role.bullets) {
            const li = document.createElement('li');
            li.textContent = bullet;
            bulletList.appendChild(li);
        }

        roleDiv.appendChild(bulletList);
        card.appendChild(roleDiv);
    }

    return card;
}

/**
 * Creates the education card
 */
function generateEducationCard() {
    const content = document.createElement('div');
    content.classList.add('resume-education-content');

    for (const edu of resumeData.education) {
        const eduItem = document.createElement('div');
        eduItem.classList.add('resume-edu-item');

        const schoolRow = document.createElement('div');
        schoolRow.classList.add('resume-edu-row');

        const school = document.createElement('span');
        school.classList.add('resume-edu-school');
        school.textContent = edu.school;

        const year = document.createElement('span');
        year.classList.add('resume-edu-year');
        year.textContent = edu.year;

        schoolRow.appendChild(school);
        schoolRow.appendChild(year);

        const degreeRow = document.createElement('div');
        degreeRow.classList.add('resume-edu-degree-row');

        const degree = document.createElement('span');
        degree.classList.add('resume-edu-degree');
        degree.textContent = edu.degree;

        const location = document.createElement('span');
        location.classList.add('resume-edu-location');
        location.textContent = edu.location;

        degreeRow.appendChild(degree);
        degreeRow.appendChild(location);

        eduItem.appendChild(schoolRow);
        eduItem.appendChild(degreeRow);
        content.appendChild(eduItem);
    }

    return createCard('Education', content);
}

/**
 * Creates the compact sticky header that appears on scroll
 */
function generateStickyHeader() {
    const header = document.createElement('div');
    header.classList.add('resume-scroll-header');

    const inner = document.createElement('div');
    inner.classList.add('resume-scroll-header-inner');

    const left = document.createElement('div');
    left.classList.add('resume-scroll-header-left');

    const photo = document.createElement('img');
    photo.src = `${imagePath}profile.jpg`;
    photo.alt = 'Eric Segev';
    photo.classList.add('resume-scroll-header-photo');

    const name = document.createElement('span');
    name.classList.add('resume-scroll-header-name');
    name.textContent = resumeData.name + ',';

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('resume-scroll-header-title');
    titleSpan.textContent = resumeData.title;

    left.appendChild(photo);
    left.appendChild(name);
    left.appendChild(titleSpan);

    const pdfButton = document.createElement('a');
    pdfButton.href = './files/Eric_Segev_Resume.pdf';
    pdfButton.target = '_blank';
    pdfButton.classList.add('resume-scroll-header-pdf');

    const pdfIcon = document.createElement('img');
    pdfIcon.src = `${imagePath}downloadIcon.svg`;
    pdfIcon.alt = 'Download';
    pdfIcon.classList.add('resume-scroll-header-pdf-icon');
    pdfButton.appendChild(pdfIcon);
    pdfButton.appendChild(document.createTextNode('Resume PDF'));

    inner.appendChild(left);
    inner.appendChild(pdfButton);
    header.appendChild(inner);

    return header;
}

/**
 * Generates the full resume view
 */
export function generateResumeView() {
    const container = document.createElement('div');
    container.classList.add('resume-container');

    // Sticky scroll header
    const stickyHeader = generateStickyHeader();
    document.body.appendChild(stickyHeader);

    // Profile card wrapped in sticky container
    const profileCard = generateProfileCard();
    const stickyWrapper = document.createElement('div');
    stickyWrapper.classList.add('resume-sticky-wrapper');
    stickyWrapper.appendChild(profileCard);
    container.appendChild(stickyWrapper);

    // Show/hide sticky header based on profile card visibility
    const observer = new IntersectionObserver(
        ([entry]) => {
            stickyHeader.classList.toggle('visible', !entry.isIntersecting);
        },
        { threshold: 0 }
    );
    observer.observe(stickyWrapper);

    // Two column layout for skills and education
    const sideSection = document.createElement('div');
    sideSection.classList.add('resume-side-section');

    const skillsCard = generateSkillsCard();
    const educationCard = generateEducationCard();

    sideSection.appendChild(skillsCard);
    sideSection.appendChild(educationCard);
    container.appendChild(sideSection);

    // Experience section title
    const expTitle = document.createElement('h2');
    expTitle.classList.add('resume-section-title');
    expTitle.textContent = 'Professional Experience';
    container.appendChild(expTitle);

    // Experience cards
    for (const exp of resumeData.experience) {
        const expCard = generateExperienceCard(exp);
        container.appendChild(expCard);
    }

    return container;
}
