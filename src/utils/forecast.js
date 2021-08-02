const request = require('request');

const forecast = (lat, long, callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=45710e43c9dba5c1fed6235f75c9f3c1&query='+lat+','+long+'&units=f';

    request({url, json: true},(error, {body} = {}) => {
        if (error)
        {
            callback('Unable to connect to weather service', undefined);
        }
        else if (body.error)
        {
            callback(body.error.info, undefined);
        }
        else
        {
            const current = body.current;
            callback(undefined, {
                description: current.weather_descriptions[0],
                temperature: current.temperature,
                feelslike: current.feelslike
            });
        }
    });
}

module.exports = forecast;