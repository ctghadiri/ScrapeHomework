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

// Get routes
    // Scraping
    // Getting Info from DB

// Start Server