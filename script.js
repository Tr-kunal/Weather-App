const API_KEY = 'f89060a8336a45c59d2185517260201';
const API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';
const RECENT_SEARCHES_KEY = 'weatherAppRecentSearches';
const MAX_RECENT_SEARCHES = 5;
const DEBOUNCE_DELAY = 500;

const cityInput = document.getElementById('cityInput');
const recentSearchesContainer = document.getElementById('recentSearches');
const recentList = document.getElementById('recentList');
const searchError = document.getElementById('searchError');
const loadingState = document.getElementById('loadingState');
const weatherDisplay = document.getElementById('weatherDisplay');

const cityName = document.getElementById('cityName');
const country = document.getElementById('country');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const feelsLike = document.getElementById('feelsLike');
const pressure = document.getElementById('pressure');

const searchBtn = document.getElementById('searchBtn');
const clearRecentBtn = document.getElementById('clearRecent');

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function showError(message){
    searchError.textContent = message;
    searchError.style.display = 'block';
    setTimeout(()=>{
        searchError.textContent='';
        searchError.style.display = 'none';
    },5000);
}

function showLoading(){
    loadingState.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    searchError.textContent = '';
}

function hideLoading(){
    loadingState.classList.add('hidden');
}

function getRecentSearches(){
    try {
        const searches = localStorage.getItem(RECENT_SEARCHES_KEY);
        return searches ? JSON.parse(searches) : [];
    } catch (error) {
        console.error('Error reading recent searches:',error);
        return [];
    }
}

function saveRecentSearch(cityName){
    try {
        let searches = getRecentSearches();
        searches = searches.filter(city => city.toLowerCase !== cityName.toLowerCase());
        searches.unshift(cityName);

        if(searches.length> MAX_RECENT_SEARCHES){
            searches = searches.slice(0,MAX_RECENT_SEARCHES);
        }
        localStorage.setItem(RECENT_SEARCHES_KEY,JSON.stringify(searches));
        displayRecentSearches();
    } catch (error) {
        console.error('Error saving recent search:',error);
    }
}

function displayRecentSearches(){
    const searches = getRecentSearches();
    
    if(searches.length === 0){
        recentSearchesContainer.classList.add('hidden');
        return
    }
    
    recentSearchesContainer.classList.remove('hidden');
    recentList.innerHTML = '';
    
    searches.forEach(city => {
        const recentItem = document.createElement('div');
        recentItem.className = 'recent-Item';
        recentItem.textContent = city;
        recentItem.addEventListener('click',()=>{
            cityInput.value = city;
            fetchWeatherData(city);
        });
        recentList.appendChild(recentItem);
    })
}

function clearRecentSearches(){
    try {
        localStorage.removeItem(RECENT_SEARCHES_KEY);
        displayRecentSearches();
    } catch (error) {
        console.error('Error clearing recent searches:',error);
    }
}

async function fetchWeatherData(city){
    if(!city || city.trim === ''){
        showError('Please Enter a city name');
        return;
    }

    showLoading();

    try {
        const url = `${API_BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
        const response = await fetch(url);
        const data = await response.json();

        if(data.error){
            if(data.error.code === 1006){
                throw new Error('City not found. Please try Again');
            }else if(data.error.code === 2006){
                throw new Error('Invalid API key');
            }else{
                throw new Error(data.error.message || 'Failed to fetch weather data. Please try again.');
            }

        }

        displayWeatherData(data);
        saveRecentSearch(data.location.name);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(error.message || 'An error occured while fetching weather data')
        hideLoading();
    }
}

function displayWeatherData(data){
    hideLoading();

    cityName.textContent = data.location.name;
    country.textContent = data.location.country;
    temperature.textContent = Math.round(data.current.temp_c);

    weatherIcon.src = `https:${data.current.condition.icon}`;
    weatherIcon.alt = data.current.condition.text;

    weatherDescription.textContent = data.current.condition.text;

    humidity.textContent = `${data.current.humidity}%`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
    feelsLike.textContent = `${Math.round(data.current.feelslike_c)}°C`;
    pressure.textContent = `${data.current.pressure_mb} mb`;

    weatherDisplay.classList.remove('hidden');

}

searchBtn.addEventListener('click',()=>{
    const city = cityInput.value.trim();
    fetchWeatherData(city);
});

cityInput.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        const city = cityInput.value.trim();
        fetchWeatherData(city);
    }
});

clearRecentBtn.addEventListener('click',()=>{
    if(confirm('Are you sure you want to clear all recent searches?')){
        clearRecentSearches();
    }
});

function init(){
    displayRecentSearches();    
}

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded',init);
}else{
    init();
}
