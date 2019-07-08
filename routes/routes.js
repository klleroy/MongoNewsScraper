/* ROUTER SETUP */
const express = require("express");
const router = express.Router();

// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

/* HTML ROUTES */
// Homepage route
router.get('/', (req,res) => {
    res.render('index');
});

// route to saved articles page
router.get('/saved', (req, res) => {
    res.render('saved');
});

// =========================
// API ROUTES (scrape)
// =========================

// scrape route to collect data from MLB Site
router.get("/api/scrape", (req, res) => {
    axios.get("https://www.mlb.com")
        .then((response) => {

            // Load the HTML into cheerio and save it to a variable
            const $ = cheerio.load(response.data);

            // scrape HTML fro headline links
            $("a.p-headline-stack__link").each((i, element) => {

                const title = $(element).text();
                const link = $(element).attr("href");


                db.Article.update({ "title": title }, //Find with the unique identifier
                    {
                        title: title,
                        link: link
                    },
                    { upsert: true }
                )
                    .then((result) => {
                        // View the added result in the console
                        console.log(result);
                    })
                    .catch((err) => {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });
        })
        .catch((err) => {
            // If an error occurred, log it
            console.log(err);
        });
    res.send("Scrape Complete");
});

// delete articles in collection
router.get("/api/clear", (req, res) => {
    db.Article.deleteMany({})
        .then((dbArticle) => {
            // View the added result in the console
            console.log(dbArticle);
            console.log("documents deleted");
            res.json(dbArticle);
        })
        .catch((err) => {
            // If an error occurred, log it
            console.log(err);
        });
});

// Route for grabbing a specific Article by id
router.get("/api/articles/:id", (req, res) => {

    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        .then((dbArticle) => {
            console.log(dbArticle);


            // save article to SavedArticles collection
            db.SavedArticle.updateOne({ "title": dbArticle.title }, //Find with the unique identifier
                {
                    title: dbArticle.title,
                    link: dbArticle.link
                },
                { upsert: true }
            )
                .then((result) => {
                    // View the added result in the console
                    console.log(result);
                })
                .catch((err) => {
                    // If an error occurred, log it
                    console.log(err);
                });
        })
        .catch((err) => {
            // If an error occurred, send it to the client
            console.log(err);
        });
    res.send("Article Saved");
});

// Route for getting all Articles from the db
router.get("/api/articles", (req, res) => {
    db.Article.find({})
        .then((dbArticle) => {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch((err) => {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// ==========================
// API ROUTES (saved)
// ==========================

// get all saved articles in collection
router.get("/api/saved/", (req, res) => {
    db.SavedArticle.find({})
        .then((dbArticle) => {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch((err) => {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// delete all saved articles in collection
router.get("/api/saved/clear", (req, res) => {
    db.SavedArticle.deleteMany({})
        .then((dbArticle) => {
            // View the added result in the console
            console.log(dbArticle);
            console.log("documents deleted");
            res.json(dbArticle);
        })
        .catch((err) => {
            // If an error occurred, log it
            console.log(err);
        });
});

// delete one saved articles in collection
router.delete("/api/saved/clear/:id", function (req, res) {

    db.SavedArticle.deleteOne({ _id: req.params.id })
        .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
            console.log("Article deleted");
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
        });
});

// ==========================
// API ROUTES (notes)
// ==========================

// Route for saving/updating an Article's associated Note
router.post("/api/notes/:id", (req, res) => {
    // Create a new note and pass the req.body to the entry
    db.Note.updateOne(
        { _id: req.params.id },
        req.body,
        { upsert: true })
        .then((dbNote) => {
            console.log("data returned from updateOne");
            const $id = dbNote.upserted[0]._id;
            console.log($id);

            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.SavedArticle.findOneAndUpdate({ _id: req.params.id }, { note: $id }, { new: true });
        })
        .then((dbArticle) => {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch((err) => {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/api/saved/:id", (req, res) => {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.SavedArticle.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then((dbArticle) => {
            // If we were ablnoe to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch((err) => {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

module.exports = router;