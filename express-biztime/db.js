/** Database setup for BizTime. */

const { Pool } = require('pg')
const fs = require('fs')

const db = new Pool({
    user: 'biztimeAdmin',
    host: 'localhost',
    database: 'biztime',
    password: 'password',
    port: 5432,
})

const dataSql = fs.readFileSync('./data.sql', 'utf8')

db.query(dataSql, (err, result) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Initial data loaded successfully')
    }
})

module.exports = db