const server = require('../server/index.js');
const expect   = require("chai").expect;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

describe('generic', () => {
    it("String hello has length equal to 5", () => {
        expect("hello".length).to.equal(5);
    })
});

describe("Sequelize people methods", () => {
    let person;
    before(async() => {
        person = await server.sequelizePeopleTable();
    });
    it("People table to have a count of 3", async () => {        
        let count = await person.count();
        expect(count).to.equal(3);
    });
    it("People table to have a total annualEarnings of 435000", async () => {
        let totalEarnings = await person.sum("annualEarnings");
        expect(totalEarnings).to.equal(435000);
    });
    it("People who earn less than 100000 a year should only be 2", async() => {
        let EarningLess100 = await person.findAll({
            where:{
                annualEarnings:{
                    [Op.lt]:100000
                }
            }
        });  
        let count = EarningLess100.length;        
        expect(count).to.equal(2);
    })
});

describe("Sequelize products methods", () => {
    let product;
    before(async() => {
        product = await server.createProductSchema();
        await server.syncTable(product);
        await server.createProduct(product);  
    });
    it("Products table to have a count of 3", async () => {            
        let count = await product.count();
        expect(count).to.equal(3);
    });
    it("A product with property isOnOffer = true should become false when calling changeIsOnOfferStatus with parameter false", async () => {
        let skuProductOnOffer = await product.findOne({where:{isOnOffer:true}});   
        await server.changeIsOnOfferStatus(product, skuProductOnOffer.sku, false);   
        let isOnOfferAfter = await product.findOne({where:{sku:skuProductOnOffer.sku}}).then(pr => pr.isOnOffer);
        expect(isOnOfferAfter).to.equal(false);
    })
});