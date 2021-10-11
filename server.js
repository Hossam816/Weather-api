// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()

//Dependecies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cor = require('cors')
app.use(cor())

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

/*spin up the server*/

const server = app.listen(port, function listening(){
    console.log('server is now running')
    console.log(`server is running at localhost:${port}`)
})
//init route with callback func

app.get('/all', callBack)


//our callback fun to complete get and post 

function callBack(req, res){
    res.send(projectData);
    console.log(projectData)
}
//post route
const data = []

app.post('/add', addData)
function addData(req, res){
    data.push(req.body)
    projectData = req.body;
    console.log(req.body)
    newEntry = {
        date: req.body.data,
        temp: req.body.temp,
        content: req.body.content
    }
    
}