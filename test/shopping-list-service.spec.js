const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('ShoppingListService object', function () {
    let db;

    let testList = [
        {
            name: "Test Item 1",
            //WHY A STRINGGGGGGG?????
            price: '5.00',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false,
            category: "Main",
            product_id: 1,
        },
        {
            name: "Test Item 2",
            price: '15.00',
            date_added: new Date('2028-01-22T16:28:32.615Z'),
            checked: true,
            category: "Breakfast",
            product_id: 2,
        },
        {
            name: "Test Item 3",
            price: '25.00',
            date_added: new Date('2027-01-22T16:28:32.615Z'),
            checked: false,
            category: "Snack",
            product_id: 3,
        }
    ];

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })









    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => {
        db.destroy();
    })

    context("Given 'shopping-list' table has data", () => {
        beforeEach(() => {
            return db.into('shopping_list').insert(testList);
        });
        it("getList() resolves all items from 'shopping-list'", () => {
            return ShoppingListService.getList(db).then(result => {
                expect(result).to.eql(testList)
            })
        })
    })
})