const request = require("request");

const config = {
    APPID: 'c552545411bf2c7f8fab0277f5d16069',
    units: "metric",
    lang: "pt"
};

module.exports = {
    getCurrentWeatherByCityName: function (name) {
        return new Promise((resolve, reject) => {
            request.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=${config.units}&APPID=${config.APPID}&lang=${config.lang}`,
                (err, data) => {
                    resolve(JSON.parse(data.body));
                }
            );
        });
    }
}
