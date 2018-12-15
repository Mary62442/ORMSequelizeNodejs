const server = require('../server/index.js');
const sequelizeMethods = require('../server/sequelizeMethods.js');
const expect   = require("chai").expect;


describe("Sequelize products methods", () => {
    let product;
    before(async() => {
        product = await sequelizeMethods.createProductSchema();
        await sequelizeMethods.syncTable(product);
        await sequelizeMethods.createProduct(product);  
    });
    it("Products table to have a count of 3", async () => {            
        let count = await product.count();
        expect(count).to.equal(3);
    });
    it("A product with property isOnOffer = true should become false when calling changeIsOnOfferStatus with parameter false", async () => {
        let skuProductOnOffer = await product.findOne({where:{isOnOffer:true}});   
        await sequelizeMethods.changeIsOnOfferStatus(product, skuProductOnOffer.sku, false);   
        let isOnOfferAfter = await product.findOne({where:{sku:skuProductOnOffer.sku}}).then(pr => pr.isOnOffer);
        expect(isOnOfferAfter).to.equal(false);
    })
});