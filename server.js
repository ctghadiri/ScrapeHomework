// require express, mongoose, cheerio, axios
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// require models + port
var db = require("./models");
var PORT = process.env.PORT || 3000;

// Heroku connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });

// Initialize Express
var app = express()

// Configure middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Connect to mongo

// mongoose.connect("mongodb://localhost/unit18Populater", {useNewUrlParser: true});

// Get routes

// Scraping
app.get("/scrape", function(req,res){
    axios.get("https://www.amctheatres.com/movies").then(function(response){
        var $ = cheerio.load(response.data);

        $(".MoviePostersGrid-text a").each(function(i, element){
            var result = {};
            // console.log(i);
            // console.log("====================================");
            // console.log(element);

            result.movie = $(this).children("h3").text();
            result.link = "https://www.amctheatres.com" + $(this).attr("href");
            console.log(result.link)

            if (result.movie !== ""){
                
                console.log(result)

                db.Movies.create(result)
                .then(function (dbMovies){

                    console.log(dbMovies)
                })
                .catch(function(err){

                    console.log(err)
                });

            }
        });
        res.send("Scrape Complete")
    });
});
    
// Getting Info from DB

app.get("/movies", function(req,res){
    db.Movies.find({})
    .then(function(dbMovies) {
        res.json(dbMovies);
    })
    .catch(function (err){
        res.json(err)
    });
});

// Grabs specific movie and populates note

app.get("/movies/:id", function(req,res){
    
    db.Movies.findOne({_id: req.params.id})
    .populate("note")
    .then(function(dbMovies){
        res.json(dbMovies);
    })
    .catch(function(err){
        res.json(err)
    });

});

// Route for saving and updating note associated with movie

app.post("/movies/:id", function(req,res){

    db.Notes.create(req.body)
    .then(function (dbNote){
        return db.Movies.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true})
    })
    .then(function (dbMovies){
        res.json(dbMovies);
    })
    .catch(function(err){
        res.json(err)
    })
})

// Grabs all notes

app.get("/allnotes", function (req,res){

    db.Notes.find({})
    .then(function(dbNotes){
        res.json(dbNotes)
    })
    .catch(function(err){
        res.json(err)
    })
})

app.get("/clear", function (req, res) {
    mongoose.connection.collections['movies'].drop(function (err) {
        console.log('collection dropped');
    });
});
// Start Server

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });