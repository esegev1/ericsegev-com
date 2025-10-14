export const openF1Queries = [
        // {url: `https://api.openf1.org/v1/meetings?date_start>=${startDate}`, 
        //     fields:[`meeting_key`, `session_key`, `circuit_short_name`, `location`, `country_name`, `meeting_name`, 
        //     `meeting_official_name`, `date_start`] 
        // },

        {url: `https://api.openf1.org/v1/sessions?date_start%3E=2024-10-10`, 
            fields:[`meeting_key`, `session_key`, `date_start`, `date_end`, `session_type`, 
            `session_name`, `circuit_key`, `circuit_short_name`, `gmt_offset`]
        },
            
        // {url: `https://api.openf1.org/v1/position?session_key=9896`, 
        //     fields:[`session_key`, `meeting_key`, `driver_number`, `position`] 
        // },
        
        {url: `https://api.openf1.org/v1/session_result?session_key=9896`, 
            fields:[`position`, `driver_number`, `number_of_laps`, `points`, 
                `dnf`, `dns`, `dsq`, `gap_to_leader`,`meeting_key`, `session_key`] 
        }
    ]

    


export const cardsObj = {
    dogs: [
        'dog1.jpg',
        'dog2.webp',
        'dog3.webp',
        'dog4.jpg',
        'dog5.avif',
        'dog6.jpg',
        'dog7.png',
        'dog8.jpeg',
        'dog9.jpg',
        'dog10.jpg',
        'dog11.webp',
        'dog12.jpeg',
        'dog13.jpeg',
        'dog14.jpg',
        'dog15.jpeg',
        'dog16.jpg',
        'dog17.jpg',
        'dog18.jpg',
        'dog19.jpg',
        'dog20.jpg',
        'dog21.jpg',
        'dog22.jpg',
        'dog23.webp',
        'dog24.jpeg',
        'dog25.avif',
    ],

    cars: [
        'cars1.jpg',
        'cars2.jpg',
        'cars3.webp',
        'cars4.webp',
        'cars5.jpg',
        'cars6.jpg',
        'cars7.jpeg',
        'cars8.jpg',
        'cars9.jpeg',
        'cars10.webp',
        'cars11.jpeg',
        'cars12.webp',
        'cars13.avif',
        'cars14.jpg',
        'cars15.webp',
        'cars16.avif',
        'cars17.jpg',
        'cars18.webp',
        'cars19.webp',
        'cars20.jpg',
        'cars21.webp',
        'cars22.png',
        'cars23.avif',
        'cars24.jpg',
        'cars25.avif',


    ],

    foods: [
        'foods1.jpg',
        'foods2.avif',
        'foods3.jpg',
        'foods4.jpg',
        'foods5.jpg',
        'foods6.jpg',
        'foods7.avif',
        'foods8.webp',
        'foods9.jpeg',
        'foods10.webp',
        'foods11.jpeg',
        'foods12.webp',
        'foods13.jpeg',
        'foods14.avif',
        'foods15.jpg',
        'foods16.jpeg',
        'foods17.avif',
        'foods18.jpg',
        'foods19.avif',
        'foods20.jpg',
        'foods21.avif',
        'foods22.webp',
        'foods23.webp',
        'foods24.webp',
        'foods25.webp',
    ]
}
