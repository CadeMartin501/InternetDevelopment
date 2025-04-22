(function() {
    'use strict';

    const codeMap = new Map([
        [0, 'Clear sky'],
        [1, 'Mainly clear'], [2, 'Partly cloudy'], [3, 'Overcast'],
        [45, 'Fog'], [48, 'Depositing rime fog'],
        [51, 'Drizzle: light'], [53, 'Drizzle: moderate'], [55, 'Drizzle: heavy'],
        [61, 'Rain: light'], [63, 'Rain: moderate'], [65, 'Rain: heavy'],
        [66, 'Freezing rain: light'], [67, 'Freezing rain: heavy'],
        [71, 'Snow fall: slight'], [73, 'Snow fall: moderate'], [75, 'Snow fall: heavy'],
        [77, 'Snow grains'],
        [80, 'Rain showers: slight'], [81, 'Rain showers: moderate'], [82, 'Rain showers: violent'],
        [95, 'Thunderstorm: slight or moderate'],
        [96, 'Thunderstorm with slight hail'], [99, 'Thunderstorm with heavy hail']
    ]);
    window.addEventListener('load', init);

    function init() {
        
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=34.1209&longitude=-93.0538&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch'
        fetch(url)
        .then(statusCheck)
        .then((response) => response.json())
        .then(addWeather)
        .catch(weatherError);
    }
        
    function addWeather(response) {
        const weatherList = id('weather');

        const dates = response.daily.time;
        const minTemps = response.daily.temperature_2m_min;
        const maxTemps = response.daily.temperature_2m_max;
        const weatherCodes = response.daily.weather_code;
        for (let i=0; i<dates.length; i++) {
            const newLI = document.createElement('li');
            newLI.textContent = `${dates[i]}: ${Math.round(maxTemps[i])}/${Math.round(minTemps[i])} ${codeMap.get(weatherCodes[i])}`;
            weatherList.appendChild(newLI);
        }
    }

    function weatherError(error) {
        console.log(error);
    }

    /////////////////////////////////////////////////////////////////////
    // Helper functions
    /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} res - response to check for success/error

    * @return {object} - valid response if response was successful, otherwise rejected
    *                    Promise result
    */
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();