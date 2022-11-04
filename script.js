'use strict'
let burgerBtn =document.querySelector('#check')
burgerBtn.addEventListener('click',(e)=>{
    document.querySelector('.burger-content').classList.toggle('active');
});

let search = document.querySelector('.search-input')
let background = document.querySelector('.bground')
let content = document.querySelector('.boxs')
let data;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
const d = new Date();

(async function(){
    await getWeatherByCountryName()
    await displayData(data)    
})()
search.addEventListener('keydown',async (e)=>{
    if(e.code == 'NumpadEnter' && search.value != ''){
        await getWeatherByCountryName(search.value)
        await displayData(data)
    }else if(e.code == 'NumpadEnter' && search.value == ''){
        await getWeatherByCountryName()
        await displayData(data)
    }
})
async function getWeatherByCountryName(countryName = 'cairo'){
    let getApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=20584636844843f1aa9194424220411&q=${countryName}&days=3`)
    let getdata = await getApi.json()
    data = getdata        
                  
}
function displayData(data){
    if(data.location == undefined){
        content.innerHTML =`<h1 style="padding:0 10%;"> ${data.error.message} </h1>`
    }else{
        content.innerHTML =`<div class="box">
                                <div class="top">
                                    <h2 class="day">${weekday[d.getDay()]}</h2>
                                    <h2 class="date">${d.getDate()},${months[d.getMonth()]}</h2>
                                </div>
                                <h3 class="country">${data.location.country},${data.location.name}</h3>
                                <div class="temp">
                                    <span class="degree">${data.current.temp_c}&#8451;</span>
                                    <img src="https:${data.current.condition.icon}" alt="">
                                </div>
                                <p>${data.current.condition.text}</p>
                                <div class="icons">
                                    <span><i class="fa-solid fa-umbrella"></i>${data.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                                    <span><i class="fa-solid fa-wind"></i>${data.current.wind_kph}km/h</span>
                                    <span><i class="fa-regular fa-compass"></i>${data.current.wind_dir}</span>
                                </div>
                            </div>
                            <div class="box">
                                <div class="top">
                                    <h2 class="day">${d.getDay() == 6 ? weekday[0] :weekday[d.getDay() + 1]}</h2>
                                </div>
                                <div class="temp">
                                    <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="">
                                    <span class="degree">${data.forecast.forecastday[1].day.avgtemp_c}&#8451;</span>
                                    <p>${data.forecast.forecastday[1].day.condition.text}</p>
                                </div>
                            </div>
                            <div class="box">
                                <div class="top">
                                    <h2 class="day">${d.getDay() == 6 ? weekday[1] : d.getDay() == 5?weekday[0] : weekday[d.getDay() + 2]}</h2>
                                </div>
                                <div class="temp">
                                <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="">
                                <span class="degree">${data.forecast.forecastday[2].day.avgtemp_c}&#8451;</span>
                                <p>${data.forecast.forecastday[2].day.condition.text}</p>
                                </div>
                            </div>`
    }
    
}

