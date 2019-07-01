const axios = require ('axios');
const cheerio = require ('cheerio');
const db = require ('../models');

module.exports = function (app) {
    app.get("/scrape", (req, res) => {
        for (let i = 0; i < 1; i++) {
            axios.get('https://www.nytimes.com/section/sports' + i).then(response => {
                const $ = cheerio.load(response.data);

                let result = {};

                $('a.articleTitle').each((i, element) => {
                    const title = $(element).find('h3').find()
                })
            })
        }
    })
}