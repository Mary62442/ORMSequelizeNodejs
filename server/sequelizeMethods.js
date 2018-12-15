const config = require('./config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: config.db.storage
}); 
const Op = Sequelize.Op;



exports.syncTable = (tableNametoSync) => {
    return tableNametoSync.sync({force:true}).catch((err) => console.log(err));     
}

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