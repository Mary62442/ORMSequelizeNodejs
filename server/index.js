const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');


const app = express();
const allowCrossDomain = function (req, res, next) {      
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, csrf-token, Custom-Auth-Step1, Custom-Auth-Step2, Custom-Auth-Step3, Custom-Auth-Step4');
    if ('OPTIONS' == req.method) {res.sendStatus(200); }
    else { next(); }
}

app.use(allowCrossDomain);
app.use(bodyParser.json());