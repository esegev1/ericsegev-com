import { generateHomePage } from './app.js';
// import { openF1Queries } from `./objects.js`;

function generateApiRequest(request) {
    return new Promise((resolve) => {
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
                console.log(`data: ${JSON.stringify(data)}`);
                // Handle the retrieved data
                // console.log(`data: ${data}`);
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


    const dateToday = new Date();
    const startDate = `${dateToday.getFullYear() - 1}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`;
    
    let meeting_key = 0;
    const openF1Queries = [
        {
            url: `https://api.openf1.org/v1/sessions?date_start>=${startDate}`,
            fields: [`session_key`, `meeting_key`, `date_start`, `date_end`, `session_type`,
                `session_name`, `circuit_key`, `circuit_short_name`, `gmt_offset`]
        },
        // {
        //     url: `https://api.openf1.org/v1/session_result?session_key>=${meeting_key}`,
        //     fields: [`position`, `driver_number`, `number_of_laps`, `points`,
        //         `dnf`, `dns`, `dsq`, `gap_to_leader`, `meeting_key`, `session_key`]
        // }
    ];

    console.log(`openF1Queries[0].url: ${openF1Queries[0].url}`);
    const request = openF1Queries[0].url;

    //create a table
    const data = await generateApiRequest(request);
    // const dataString = JSON.stringify(data, null, 2);
    console.log(`fetch: ${JSON.stringify(data, null, 2)}`);

    console.log(data);

    console.log(`openF1Queries[0].fields: ${openF1Queries[0].fields}`)
    const headingArr = openF1Queries[0].fields;

    console.log(`headingArr: ${headingArr[0]}`);
    const dataArr = [];

    console.log(`dataArr: ${typeof dataArr}`);

    for(const row of data) {
       
        console.log(`row: ${JSON.stringify(row, null, 2)}, row.length: ${row.length}`);
        const tempArr = [];
        for(let d=0;d<Object.keys(row).length;d++) {
            console.log(`field: ${headingArr[d]}, value: ${row[headingArr[d]]}`);
            tempArr.push(row[headingArr[d]]);
        }

        dataArr.push(tempArr);
    }

     console.log(`dataArr: ${JSON.stringify(dataArr, null, 2)}`);
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

    const headingsArr = openF1Queries[0].fields;

    // const headingsArr = [
    //     // `meeting_key`, 
    //     // `circuit_key`, 
    //     `circuit_short_name`,
    //     // `meeting_code`,
    //     `location`,
    //     // `country_key`, 
    //     // `country_code`, 
    //     `country_name`,
    //     `meeting_name`,
    //     `meeting_official_name`,
    //     // `gmt_offset`, 
    //     // `date_start`, 
    //     `year`
    // ]

    for (const heading of headingsArr) {
        const th = document.createElement('th');
        th.innerText = heading;
        headingTr.appendChild(th);
    }

    const tbody = document.createElement('tbody');

    //create data table
    for (const arr of dataArr) {
        const tr = document.createElement('tr');
        console.log(`row type: ${typeof arr}, arr data: ${arr}`);
        for (const cell of arr) {
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
