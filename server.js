// require express, mongoose, cheerio, axios
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// require models + port
var db = require("./models");
var PORT = 3000;

// Initialize Express
var app = express()

// Configure middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Connect to mongo

mongoose.connect("mongodb://localhost/unit18Populater", {useNewUrlParser: true})
// Get routes
    // Scraping
app.get("/scrape", function(req,res){
    axios.get("https://www.amctheatres.com/movies").then(function(response){
        var $ = cheerio.load(response.data);

        $(".MoviePostersGrid-text a").each(function(i, element){
            var result = {};

            result.movie = $(this).children("h3").text()
            console.log(result)

            db.Movies.create(result)
            .then(function (dbMovies){
                console.log(dbMovies)
            })
            .catch(function(err){
                console.log(err)
            });
        });
        res.send("Scrape Complete")
    })
})
    // Getting Info from DB

app.get("/Movies", function(req,res){
    db.Movies.find({})
    .then(function(dbMovies) {
        res.json(dbMovies)
    }).catch(function (err){
        res.json(err)
    })
})



// Start Server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });