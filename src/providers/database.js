const mysql = require('mysql');
const moment = require('moment');// biblioteca para formatação de datas

// Informações para realizar a conexão da aplicação com o banco de dados
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
    setCity: (cidade) => { // insere ou atualiza cidade no banco de dados atraves da procedure setCity
        const dataAtual = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const sql = 'CALL setCity('+cidade.id+',"'+cidade.name+'","'+dataAtual+'")';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    },
    getTopResults: () => { // Retorna as top 5 cidades atraves da view gettopresults
        const sql = 'SELECT * FROM gettopresults';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }
};
