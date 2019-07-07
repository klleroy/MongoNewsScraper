// Initial dependencies
const express = require('express');
const router = express.Router();
const path = require('path');

// scraping dependencies
const request = require('request');
const cheerio = require('cheerio');

// declare models
const Article = require('../models/Article');
const Comment = require('../models/Comment');

router.get('/',(req, res) => {
     res.redirect('/articles');
});

router.get('/scrape',(req, res) => {
     request('https://www.mlb.com/news', (error, response) => {
          const $ = cheerio.load(html);
          const titleArray = [];

          $('.article-item__headline').each((i, element) => {
               let result = {};

               result.title = $(this)
               .children('a')
               .text();
               
               result.link = $(this)
               .children('a')
               .attr('href');

               if(result.title !== '' && result.link !== ''){
                    
               }
          })
     })
});

