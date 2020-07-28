const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const weatherCode = require('./utils/weather')

const app = express();


const hbsPath = path.join(__dirname, '../templates/view')
const partialPath = path.join(__dirname, '../templates/partials')
const staticPath = path.join(__dirname, '../public')
// console.log(partialPath);

app.set ('view engine', 'hbs');
app.set('views', hbsPath);
hbs.registerPartials(partialPath);

app.use(express.static(staticPath))

app.get('', (req, res)=>{
    // console.log(req.query);
    res.render('index');
})

app.get('/help', (req, res) => {
    res.render ('help')
})

app.get ('/about', (req, res) => {
    res.render ('about')
})

app.get('/api', (req,res) =>{
    // console.log(req.query);
    res.send ({
        Name: 'Keshav Tiwari',
        Age: 24,
        Location: req.query.location
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.location){
        return res.send({
            error: 'Please provide a valid location'
        })
    }
    
    geoCode(req.query.location, (error, data) => {
    // console.log(data, 'data');
    // console.log(process.argv[2].title, process.argv);
    if(error){
        return res.send({
            error: error
        });
    }else {
        weatherCode(data.latitude, data.longitude, (error, weatherData) => {
            if(error){
                return res.send({
                    error: error
                });
            }else {
                return res.send({
                    weatherData : weatherData
                });
            }
        })
    }
})

})
app.get ('/help/*', (req, res) => {
    res.send ('Help page not found')
})

app.get ('*', (req, res) => {
    res.send ('Page Not Found')
})

// const address = fetch('http://localhost:3000/?location='+ location ).then(res) => {

// }

// geoCode(address, (error, data) => {
//     // console.log(data, 'data');
//     // console.log(process.argv[2].title, process.argv);
//     if(error){
//         console.log(error ,'error');
//     }else {
//         weatherCode(data.longitude, data.latitude, (error, weatherData) => {
//             if(error){
//                 console.log(error);
//             }else {
//                 console.log(weatherData);
//             }
//         })
//     }
// })

app.listen(3000,(req,res) => {
    console.log('server is running at 3000 port')
})