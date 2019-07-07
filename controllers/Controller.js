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
/* scraping router */
// router.get('/scrape',(req, res) => {
//      request('https://www.mlb.com/news', (error, response) => {
//           const $ = cheerio.load(html);
//           const titleArray = [];

//           $('.article-item__headline').each((i, element) => {
//                let result = {};

//                result.title = $(this)
//                .children('a')
//                .text();
               
//                result.link = $(this)
//                .children('a')
//                .attr('href');

//                if(result.title !== '' && result.link !== ''){
//                     if (titleArray.indexOf(result.title) === -1) {
//                          titleArray.push(result.title);

//                          Article.count({ title: result.title }, (err, test) => {
//                               if(test === 0) {
//                                    let entry = new Article(result);

//                                    entry.save((err, doc) => {
                                        
//                                    })
//                               }
//                          })
//                     } else {
//                          console.log('Article already exists');
//                     }
//                } else {
//                     console.log('Not saved to DB. Missing Data.');
                    
//                }
//           })
//      })
// });

router.get("/scrape", (req, res) => {
     axios.get("https://mlb.com/news/").then((response) => {
 
         let $ = cheerio.load(response.data);
 
         //save an empty result object 
         let result = {};
 
         $("article.article-item--article").each((i, element) => {
             
                 //add the title and excerpt of every article, and save them as properties of the result
                 result.title = $(this).find("h1.article-item__headline").text();
                 result.excerpt = $(this).find("article-item__preview.p").text();
                 result.link = $(this).find("div").attr("onclick").replace(/location.href='/, "").slice(0, -1);
             
                     Article.create(result)
                     .then((dbArticle) => {
                         //view the added result in the console
                         console.log(dbArticle);
                     })
                     .catch(function (err) {
                         console.log(err);
                     });
         });
         res.redirect('/');
     })
 });

