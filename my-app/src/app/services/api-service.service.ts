import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dailyWeatherApiUrl, getApiUrl, hourlyWeatherApiUrl, weatherApi } from './../environnement';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  
  getCityCoord(city:string) {
    return this.http.get(getApiUrl(city));
  }

  getCurrentCityWeather(lat:string, long:string) {
    return this.http.get(weatherApi(lat,long));
  }

  getHourlyForecastWeather(lat:string, long:string) {
    return this.http.get(hourlyWeatherApiUrl(lat,long));
  }

  getDailyForecastWeather(lat:string, long:string) {
    return this.http.get(dailyWeatherApiUrl(lat,long));
  }

}
