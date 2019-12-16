const express = require('express');
const router = express.Router();
const openWeatherMap = require('./../providers/open-weather-map.js')
const database = require('./../providers/database.js');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/search', (req, res, next) => {
    res.status(400).send({errors: 'Digite o nome de uma cidade!'});
});

router.get('/search/:cityName', (req, res, next) => {
    openWeatherMap.getCurrentWeatherByCityName(req.params.cityName).then((data) => {
        if(data.cod && data.cod === '404') {
            res.status(404).send({errors: 'Cidade não encontrada!'});
        }
        res.status(200).send(data);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

router.get('/getTopResults', (req, res, next) => {
    database.getTopResults().then((data) => {
        res.status(200).send(data);
    }).catch(function (err) {
        res.status(404).send(err);
    });
});

router.get('/city/:id', (req, res, next) => {
    openWeatherMap.getCurrentWeatherByCityId(req.params.id).then((data) => {
        if(data.cod && data.cod === '404') {
            res.status(404).send({errors: 'Cidade não encontrada!'});
        }
        database.setCity(data).then((data) => {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(404).send(err);
        });
    }).catch(function (err) {
        res.status(500).send(err);
    });

});

module.exports = router;
