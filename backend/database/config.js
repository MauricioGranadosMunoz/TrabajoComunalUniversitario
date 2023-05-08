const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TrabajoComunalDB'
});

const dbConnectionCheck = async () => {
    try {
        dbConnection.connect((err) => {
            if (err) throw new Error(err);
            console.log('BASE DE DATOS CONECTADA!');
        });
    } catch (err) {
        console.log(err)
        throw new Error('DB ERROR CONNECTION');
    }
}

module.exports = {
    dbConnection,
    dbConnectionCheck
}