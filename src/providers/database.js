const mysql = require('mysql');
const moment = require('moment');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'smarkio.guy',
    password: '123456789',
    database: 'smarkio-cities'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Banco de dados conectado!')
});

module.exports = {
    setCity: (cidade) => {
        const dataAtual = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const sql = 'CALL setCity('+cidade.id+',"'+cidade.name+'","'+dataAtual+'")';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    },
    getTopResults: () => {
        const sql = 'SELECT * FROM gettopresults';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }
};
