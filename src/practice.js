require('dotenv').config();

const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

console.log(process.env.DB_URL)

function searchItem(searchTerm) {
    knexInstance
        .from('shopping_list')
        .select('*')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

searchItem('Fish')

function paginate(page) {
    productPerPage = 6
    offset = productPerPage * (page - 1)
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(productPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}
paginate(3)

function getProductsAfter(daysAgo) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result)
        })
}

getProductsAfter(6)

function getCostPerCategory() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum('price as total')
        .then(result => {
            console.log(result)
        })
}

getCostPerCategory()

// knexInstance
//     .from('amazong_products')
//     .select('product_id', 'name', 'price', 'category')
//     .where('name', 'ILIKE', `% ${ searchTerm } % `)
//     .then(result => {
//         console.log(result)
//     })

// function paginateProducts(page) {
//     const productsPerPage = 10
//     const offset = productsPerPage * (page - 1)
//     knexInstance
//         .select('product_id', 'name', 'price', 'category')
//         .from('amazong_products')
//         .limit(productsPerPage)
//         .offset(offset)
//         .then(result => {
//             console.log(result)
//         })
// }

// // paginateProducts(2)

// function getProductsWithImages() {
//     knexInstance
//         .select('product_id', 'name', 'price', 'category', 'image')
//         .from('amazong_products')
//         .whereNotNull('image')
//         .then(result => {
//             console.log(result)
//         })
// }

// getProductsWithImages()


// function mostPopularVideosForDays(days) {
//     knexInstance
//         .select('video_name', 'region')
//         .count('date_viewed AS views')
//         .where(
//             'date_viewed',
//             '>',
//             knexInstance.raw(`now() - '?? days':: INTERVAL`, days)
//         )
//         .from('whopipe_video_views')
//         .groupBy('video_name', 'region')
//         .orderBy([
//             { column: 'region', order: 'ASC' },
//             { column: 'views', order: 'DESC' },
//         ])
//         .then(result => {
//             console.log(result)
//         })
// }

// mostPopularVideosForDays(30)