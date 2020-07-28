const request = require ('request')

const weatherCode = (lat, lon, callback) => {
    const URL = 'http://api.weatherstack.com/current?access_key=1b49596c3358dff1b56761d9c2918bb0&query='+ lat + ',' + lon +'&units=f';
    request({url: URL, json: true}, (error, response) =>{
        if(error){
            callback('Unablr to connect to Internet', undefined);
        }else if(response.body.error){
            callback('Please provide a valid input', undefined)
        }else
        callback(undefined, {
            weather_descriptions: response.body.current.weather_descriptions[0],
            temp: response.body.current.temperature,
            wind_speed: response.body.current.wind_speed

        });
    })
}

// weatherCode( 'ggjhu18.975','72dfd.826', (error, data) => {
//     console.log(error, 'error')
//     console.log(data, 'data');
// })
module.exports = weatherCode;
