const express = require('express');
const router = express.Router();
const openWeatherMap = require('./../providers/open-weather-map.js')

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/search', (req, res, next) => {
    res.send({errors: 'Digite o nome de uma cidade!'});
});

router.get('/search/:cityName', (req, res, next) => {
    console.log('looking for: ', req.params.cityName);
    openWeatherMap.getCurrentWeatherByCityName(req.params.cityName).then((data) => {
        if(data.cod && data.cod === '404') {
            res.send({errors: 'Cidade não encontrada!'});
        }
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
});

module.exports = router;
