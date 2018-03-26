const express = require('express');
const mongoose = require('mongoose');
const session = require('cookie-session');
const aothRouter = require('./routs/aoth-routs.js');
const bodyParser = require('body-parser');
const mainRouter = require('./routs/main-routs.js');
const cartRouter = require('./routs/cart.js');
const passport = require('passport');
const googleSetup = require('./passport-conf/google');



const app = express();
mongoose.connect("mongodb://localhost/fullstack3");

app.use(session({
    maxAge: 24* 60*60*1000,
    keys: ["tarekdemachkie"]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(mainRouter);
app.use(cartRouter);
app.use('/aoth', aothRouter);


app.listen(3000, ()=> {console.log('listening on port 3000')});