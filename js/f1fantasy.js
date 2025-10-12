import { generateHomePage } from './app.js';

function loadContent() {
    return new Promise((resolve) => {
        const dateToday = new Date();

        const startDate = `${dateToday.getFullYear() - 1}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`;

        const request = `https://api.openf1.org/v1/meetings?date_start>=${startDate}`;

        fetch(request)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the response body as JSON
                return response.json();
            })
            .then(data => {
                // Handle the retrieved data
                console.log(`data: ${data}`);
                resolve(data);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('Error fetching data:', error);
            });

    });

}

async function fetchData() {
    //create HTML elements for game
    const main = document.querySelector('.main')

    //create a table
    const data = await loadContent();
    // const dataString = JSON.stringify(data, null, 2);
    // console.log(`fetch: ${JSON.stringify(data, null, 2)}`);

    //format data into table
    const dataArr = [];
    for (const row of data) {
        console.log(`row: ${JSON.stringify(row, null, 2)}`);
        const rowArr = [
            // row.meeting_key,
            // row.circuit_key,
            row.circuit_short_name,
            // row.meeting_code,
            row.location,
            // row.country_key,
            // row.country_code,
            row.country_name,
            row.meeting_name,
            row.meeting_official_name,
            // row.gmt_offset,
            // row.date_start,
            row.year
        ];

        dataArr.push(rowArr);
    }

    //create article element
    const article = document.createElement('article');
    article.classList.toggle('data-container');

    //create table element
    const table = document.createElement('table');
    table.classList.toggle('data-table');

    //crete column headings
    const thead = document.createElement('thead');
    const headingTr = document.createElement('tr');

    thead.appendChild(headingTr);

    const headingsArr = [
        // `meeting_key`, 
        // `circuit_key`, 
        `circuit_short_name`, 
        // `meeting_code`,
        `location`, 
        // `country_key`, 
        // `country_code`, 
        `country_name`, 
        `meeting_name`,
        `meeting_official_name`, 
        // `gmt_offset`, 
        // `date_start`, 
        `year`
    ]

    for(const heading of headingsArr){
        const th = document.createElement('th');
        th.innerText = heading;
        headingTr.appendChild(th);
    }

    const tbody = document.createElement('tbody');

    //create data table
    for (const row of dataArr) {
        const tr = document.createElement('tr');
        for (const cell of row) {
            const td = document.createElement('td');
            td.innerText = cell;
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    article.appendChild(table)

    main.appendChild(article);

}


export function initializeFantasy() {
    //create HTML elements for game
    const main = document.querySelector('.main')
    main.replaceChildren();

    //create back button
    const backButton = document.createElement('button');
    backButton.classList.toggle('back-button');
    backButton.innerText = `Back`;

    //create back button container
    const backButtonContainer = document.createElement('div');
    backButtonContainer.classList.toggle('back-button-container');

    backButtonContainer.appendChild(backButton);

    backButton.addEventListener('click', generateHomePage);

    main.appendChild(backButtonContainer);
    // console.log(`artocle ${article}`);

    fetchData();


}
