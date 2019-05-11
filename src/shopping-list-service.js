const ShoppingListService = {
    getList(knex) {
        return knex.select('*').from('shopping_list')
    },
    addShoppingListItem(knex, itemDetails) {
        return knex.into('shopping_list').insert(itemDetails).returning('*').then(rows => rows[0]);
    },
    updateShoppingListItem(knex, product_id, newItemDetails) {
        return knex.into('shopping_list').where({ product_id }).update(newItemDetails)
    },
    deleteShoppingListItem(knex, product_id) {
        return knex.from('shopping_list').where({ product_id }).delete()
    }
}

module.exports = ShoppingListService;