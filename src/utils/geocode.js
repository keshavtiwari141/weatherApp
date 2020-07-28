const request = require ('request');


const geoCode = (address, callback) => {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoia2VzaGF2LXRpd2FyaSIsImEiOiJja2NpMWR5M3AxNXd1MnRvODd1M2V3bGRuIn0.sS-IR0eXAD6sgpneeqUe3Q'
    request({ url: URL, json: true}, (error, response) => {
        if (error){
            callback('Unable to connect to Internet');
        } else if(response.body.features.length === 0){
            callback('Please provide valid place');
        } else{
            callback(undefined, {
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1]
            })
        }   
    })
}

// geoCode('LosAngles', (error, data) => {
//     console.log(error ,'error');
//     console.log(data ,'data');
// })

module.exports = geoCode;