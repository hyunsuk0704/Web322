var express = require('express');
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
