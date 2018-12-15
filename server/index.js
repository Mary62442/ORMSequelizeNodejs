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
  }  
});
const Op = Sequelize.Op;

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

//To check the connection is active, uncomment this
/* sequelize.authenticate().then(() => {
console.log('Connection has been established successfully.');
}).catch(err => {
console.error('Unable to connect to the database:', err);
}); */
 

let syncTable =  (tableNametoSync) => {
    return tableNametoSync.sync({force:true}).catch((err) => console.log(err));     
}
//To be used in testing:
exports.syncTable = (tableNametoSync) => {
    return tableNametoSync.sync({force:true}).catch((err) => console.log(err));     
}

//********************People table*******************
let createPeopleTableValues = (tableName) => {
   return tableName.bulkCreate([
        {
            firstName: 'Jean',
            lastName: 'Dupont',
            age:43,    
            profession : "CEO",
            annualEarnings:300000.00
        },
        { 
            firstName: 'Lara',
            lastName: 'Finnegan',
            age:21,    
            profession : "Web Developer",
            annualEarnings:45000.00 
        },
        { 
            firstName: 'Jeremy',
            lastName: 'Stanley',
            age:56,    
            profession : "Tech Lead",
            annualEarnings:90000.00
        }       
    ]).catch((err) => console.log(err));    
}
exports.sequelizePeopleTable = async () => {
    let Person = sequelize.define( 'person', {
        firstName: {type:Sequelize.STRING, allowNull:false, validate:{len: [2,30]}},
        lastName: {type:Sequelize.STRING, allowNull:false, validate:{len: [2,30]}},
        age: Sequelize.INTEGER,
        profession: Sequelize.STRING,    
        annualEarnings: Sequelize.DOUBLE    
    }); 
    await syncTable(Person);
    await createPeopleTableValues(Person); 
    return Person;
};

//*******************End of people table************

//****************Product table*************************
exports.createProductSchema = () => {
    return sequelize.define( 'product', {
        sku: {type:Sequelize.STRING, allowNull:false},
        name: {type: Sequelize.STRING,  allowNull:false,validate:{len: [2,30]}},
        description: {type:Sequelize.STRING, allowNull:true, validate:{len: [0,500]}},
        subTitle : {type: Sequelize.STRING, allowNull:true,},
        unitPrice: {type: Sequelize.DOUBLE,  allowNull:false,},
        isOnOffer: {type:Sequelize.BOOLEAN,  allowNull:true,},
        quantityOnOffer: {type:Sequelize.INTEGER,  allowNull:true,},
        offerPrice: {type:Sequelize.DOUBLE,  allowNull:true,},        
        category: {type:Sequelize.STRING, allowNull:true,},
        imageUrl: {type:Sequelize.STRING, allowNull:false,},
        notes: {type:Sequelize.STRING, allowNull:true, validate:{len: [0, 500]}}
    })
};

exports.createProduct = (tableName) => {
    return tableName.bulkCreate([
        {
            sku: "web1",
            name: "Presentation Website",
            description: "Website for representation with basic navigation and description.",
            subTitle : "Basic Website for representation.",
            unitPrice: 1000,
            isOnOffer: true,
            quantityOnOffer: 2,
            offerPrice: 1800,            
            category: "IT",
            imageUrl: "web1.com",
            notes: ""
        },
        { 
            sku: "web2",
            name: "Login Register Website",
            description: "Website with account login.",
            subTitle : "Website with account login.",
            unitPrice: 4000,
            isOnOffer: false,
            quantityOnOffer: null,
            offerPrice: null,           
            category: "IT",
            imageUrl: "web2.com",
            notes: ""
        },
        { 
            sku: "web3",
            name: "High Transactional Website",
            description: "Website for hight transactional purposes.",
            subTitle : "Website for hight transactional purposes.",
            unitPrice: 10000,
            isOnOffer: false,
            quantityOnOffer: null,
            offerPrice: null,           
            category: "IT",
            imageUrl: "web3.com",
            notes: ""
        }       
    ]).catch((err) => console.log(err));    
}


exports.changeIsOnOfferStatus = (tableName, sku, status) => {
    return  tableName.update({isOnOffer:status}, {where:{sku:sku}});   
}
