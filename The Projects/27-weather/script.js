const pos = document.querySelector('.loc');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const temp = document.querySelector('.temp');
const feelslike = document.querySelector('.feelslike');
const upd = document.querySelector('.upd');
const searchForm = document.getElementById('search');
const searchInput = document.getElementById('searchInput');

searchForm.addEventListener('submit', getWeatherData);

async function getWeatherData(e) {
    e.preventDefault();
    try {
        const city = searchInput.value.trim();
        if (!city) return;

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5f91ceb1afd14310a2334331230111&q=${city}&aqi=yes`);
        const data = await response.json();
        console.log(data);

        pos.innerHTML = `${data.location.name}, ${data.location.region}`;
        wind.innerHTML = `Wind: ${data.current.wind_kph} kmph / ${data.current.wind_mph} mph`;
        humidity.innerHTML = `Humidity: ${data.current.humidity} %`;
        temp.innerHTML = `${data.current.temp_c} °C / ${data.current.temp_f} °F`;
        feelslike.innerHTML = `Feels like: ${data.current.feelslike_c} °C / ${data.current.feelslike_f} °F`;
        upd.innerHTML = `Last updated at: ${data.current.last_updated}`;
    } catch (error) {
        console.error('There was a problem fetching the weather data: ', error);
    } finally {
        searchInput.value = ""
    }
}
