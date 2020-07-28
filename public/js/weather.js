const weatherform = document.querySelector('form');
const search = document.querySelector('#location');
const messageOne = document.querySelector('#message-01');
const messagetwo = document.querySelector('#message-02');
// console.log(search.value);
weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()
     
    const location = search.value;

    // console.log(location);

    messageOne.textContent = 'Loading....';
    messagetwo.textContent = '';

    fetch('http://localhost:3000/weather?location=' + location).then((res) => {
        res.json().then((data) => {
            console.log(data);
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = location;
                messagetwo.textContent = 'Temperature of ' +location + ' is ' + data.weatherData.temp + '. Wind speed ' + data.weatherData.wind_speed + ' and '+data.weatherData.weather_descriptions+' in '+ location;
            }
        })
    })

})
