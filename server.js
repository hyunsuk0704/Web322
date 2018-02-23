
/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students. *
* Name: _____Hyonseok Gang_________________ Student ID: ____117622167__________ Date: _______Feb/23/2018_________ *
* Online (Heroku) Link: ___________https://fierce-waters-38049.herokuapp.com/_______________________
* ********************************************************************************/




var express = require('express');
var multer = require('multer');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var dataService = require('./data-service');
var employees = require('./data/employees.json');
var departments = require('./data/departments.json');

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
})

app.get('/employees', (req, res) => {
    dataService.getAllEmployees()
    .then((data) => {
        res.json(data);
    })
});

// This route will return a JSON formatted string containing all the employees whose isManager property is set to true.
app.get('/managers', (req, res) => {
    dataService.getManagers()
    .then((data) => res.json(data));
});

app.get('/departments', (req, res) => {
    dataService.getDepartments()
    .then((data) => res.json(data));
})

app.get('/employees/add', (req, res) => {
    res.sendFile(__dirname + '/views/addEmployee.html');
})

app.get('/images/add', (req, res) => {
    res.sendFile(__dirname + '/views/addImage.html');
})

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req, file, cb) {
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});

app.post('/images/add',upload.single("imageFile"),(req, res) => {
    res.redirect('/images');
})

app.get("/images", (req, res) => {
    fs.readdir("./public/images/uploaded", function(err, imageFile){
        res.json(imageFile);
    })
})

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/employees/add', function(req, res) {
    data.addEmployee(req.body);
    res.redirect('/employees');
}) 



app.get('*', (req, res) => {
    res.send("Page Not Found");
    res.status(404);
})

dataService.initialize()
.then((data) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
})
.catch(() => {
    console.log("There was an error initializing");
})

