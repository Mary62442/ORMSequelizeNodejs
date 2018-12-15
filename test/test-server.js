const server = require('../server/index.js');
const expect   = require("chai").expect;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let person;
before(async() => {
    person = await server.sequelizePeopleTable();
})

describe('generic', () => {
    it("String has specified length", () => {
        expect("hello".length).to.equal(5);
    })
});

describe("Sequelize methods", () => {
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