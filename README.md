# 🌤️ Weather App

A beautiful, modern weather application built with vanilla HTML, CSS, and JavaScript. Features real-time weather data, city search, loading states, error handling, and recent searches functionality.

## ✨ Features

- 🔍 **City Search** - Search for weather in any city worldwide
- 🌡️ **Real-time Data** - Fetch live weather data from OpenWeatherMap API
- ⏳ **Loading States** - Smooth loading animations while fetching data
- ❌ **Error Handling** - Comprehensive error handling for various scenarios
- 📝 **Recent Searches** - Automatically saves your last 5 searches
- ⚡ **Debounce** - Optional debounced search input (bonus feature)
- 🎨 **Modern UI** - Beautiful dark theme with glassmorphism effects
- 📱 **Responsive** - Works perfectly on all devices

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and gradients
- **JavaScript** - Async/await, Fetch API, LocalStorage
- **WeatherAPI.com** - Weather data provider

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- WeatherAPI.com API key (free)

### Installation

1. **Clone or download this repository**
2. **Get your API key**

   - Visit [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
   - Sign up for a free account
   - Copy your API key from the dashboard
3. **Configure the app**

   - Open `app.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:

   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```
4. **Run the app**

   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

## 📖 Usage

1. **Search for a city**

   - Type a city name in the search box
   - Click the "Search" button or press Enter
   - Wait for the weather data to load
2. **View weather details**

   - Temperature (°C)
   - Weather description
   - Humidity
   - Wind speed
   - Feels like temperature
   - Atmospheric pressure
3. **Use recent searches**

   - Click on any recent search to quickly load that city's weather
   - Clear all recent searches with the "Clear All" button

## 🎯 What This Project Tests

- ✅ **Fetch API** - Making HTTP requests to external APIs
- ✅ **Async/Await** - Handling asynchronous operations
- ✅ **Error Handling** - Try/catch blocks and user-friendly error messages
- ✅ **API Data Handling** - Parsing and displaying JSON data
- ✅ **LocalStorage** - Persisting data in the browser
- ✅ **DOM Manipulation** - Dynamic content updates
- ✅ **Event Handling** - User interactions and input events
- ✅ **Debouncing** - Optimizing API calls (bonus feature)

## 🎨 Design Features

- **Dark Theme** - Easy on the eyes
- **Glassmorphism** - Modern frosted glass effect
- **Gradient Accents** - Beautiful color transitions
- **Smooth Animations** - Engaging micro-interactions
- **Responsive Layout** - Mobile-first design
- **Loading States** - Visual feedback during data fetching

## 📁 Project Structure

```
weather-app/
├── index.html          # Main HTML file
├── index.css           # Styles and animations
├── app.js              # JavaScript logic
└── README.md           # Documentation
```

## 🔧 Configuration Options

### Debounced Search (Optional)

To enable live search as you type, uncomment this code in `app.js`:

```javascript
const debouncedSearch = debounce((city) => {
    if (city.length >= 3) {
        fetchWeatherData(city);
    }
}, DEBOUNCE_DELAY);

cityInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value.trim());
});
```

### Customize Settings

In `app.js`, you can modify:

- `MAX_RECENT_SEARCHES` - Number of recent searches to save (default: 5)
- `DEBOUNCE_DELAY` - Delay for debounced search (default: 500ms)

## 🐛 Troubleshooting

**"City not found"**

- Check the spelling of the city name
- Try using the full city name

**"Invalid API key"**

- Verify your API key is correct
- Make sure your API key is activated (can take a few minutes)

**Weather data not loading**

- Check your internet connection
- Verify the API key is valid
- Check browser console for errors

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
