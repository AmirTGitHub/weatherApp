const express = require('express')
const exphbs = require("express-handlebars");
const routes = require('./routes/index');


//set the app use the variable environment
require('dotenv').config({ path: 'variable.env' })

//initials the app
const app = express()


// tell the app that we are using handlebar for templating engine 
app.use(express.static(__dirname + '/public'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//all the routing happened in the router folder in index.js file
app.use('/api', routes)


const port = process.env.PORT || 3535
app.listen(port, () => console.log(`Express is running on ${port}`))