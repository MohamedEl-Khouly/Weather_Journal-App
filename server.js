/**
 *script responsible for setting up the server
 *and handling server side code
 *
 * Dependencies: -express
 *               -body-parser
 *               -cors
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 * @author Mohamed El-Khouly <msirag95@gmail.com>
*/

/**
 *Global Variables
 *
*/
require('dotenv').config();

/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/*Express setup */
const express = require('express'),
      app     = express();

/* Dependencies */
const fs = require('fs')
fs.writeFileSync(
  `${__dirname}/website/env.js`,
  `var config = '${process.env.API_KEY}';`
)
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Cors*/
const cors = require('cors');
app.use(cors());

/*Initializing the main project folder */
app.use(express.static('website'))
/* Spinning up the server*/

const port = 3000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

/*Route Initialization */
/**
* @description setting up a /all route with a http GET request to return all the data in the project end point, the arrow callback function handles returning data
*
*/
app.get('/all',(req,res)=>{
    console.log(projectData);
    res.send(projectData);
});
/**
* @description setting up a '/addTemperature route with a http POST request to add user data to the end point
*
*/
app.post('/addTemperature',(req,res)=>{
    let newEntry = {
        date: req.body.date,
        temperature: req.body.temperature,
        feeling : req.body.feeling
    };
    projectData = newEntry;
    console.log(newEntry);
});
