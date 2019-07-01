const axios = require ('axios');
const cheerio = require ('cheerio');
const db = require ('../models');


app.get("/scrape", (req, res) => {
    for (let i = 0; i < 1; i++) {
        axios.get('https://www.nytimes.com/section/sports' + i).then(response => {
            const $ = cheerio.load(response.data);
            // Save an empty result object
            let result = {};
            
            // Add the text and href of every link, and save them as properties of the result object
            $('a.articleTitle').each((i, element) => {
                const title = $(element).find('h3').find()
            })
        })
    }
})