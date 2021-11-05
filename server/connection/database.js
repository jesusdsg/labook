const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'labook'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log('Ups!', err)
    }
    else {
        console.log('Database is connected')
    }
});

module.exports = mysqlConnection;