const db = require('../database/dbConfig.js')

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
 return db('users')
   .select('id', 'username', 'password')
}

function findBy(filter) {
   return db('users')
   .where(filter)
   .first() // without this I was getting an object in an array
}

function add(user) {
    return db('users')
    .insert(user)
    .then( ids => {
        const [id] = ids;
        return findById(id)
    });
}

function findById(id) {
    return db('users')
    .where ({id})
    .first()
}