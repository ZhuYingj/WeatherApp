const API_KEY = process.env['API_KEY'] || ''
export const weatherApi = (lat: string, long: string) => 
    `https://api.openweathermap.org/data/2.5/weather?lat=${(lat)}&lon=${long}&units=metric&appid=` + API_KEY;
export const getApiUrl = (city: string) => 
    `https://api.openweathermap.org/geo/1.0/direct?q=${(city)}&appid=${API_KEY}`;

export const hourlyWeatherApiUrl = (lat:string, long:string) => 
    `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${(lat)}&lon=${long}&units=metric&cnt=18&appid=` + API_KEY;

export const dailyWeatherApiUrl = (lat:string, long:string) => 
    `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${(lat)}&lon=${long}&units=metric&cnt=7&appid=` + API_KEY;
