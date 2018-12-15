const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'secret', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  
});


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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  let Person = sequelize.define( 'person', {
    firstName: {type:Sequelize.STRING, allowNull:false, validate:{len: [2,30]}},
    lastName: {type:Sequelize.STRING, allowNull:false, validate:{len: [2,30]}},
    age: Sequelize.INTEGER,
    profession: Sequelize.STRING,    
    annualEarnings: Sequelize.DOUBLE    
  });

  Person.sync({force:true}).then( () => {
    Person.create({
        firstName: 'Jean',
        lastName: 'Dupont',
        age:43,    
        profession : "CEO",
        annualEarnings:300000.00
    });

    Person.bulkCreate([
        { firstName: 'Lara',
        lastName: 'Finnegan',
        age:21,    
        profession : "Web Developer",
        annualEarnings:45000.00 },
        { firstName: 'Jeremy',
        lastName: 'Stanley',
        age:56,    
        profession : "Tech Lead",
        annualEarnings:90000.00}       
    ]).then(() => { 
        return Person.findAll();
    }).then(people => {
        console.log(people) 
    });

    return null;
  });
  