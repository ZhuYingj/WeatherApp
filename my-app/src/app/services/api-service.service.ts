import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getApiUrl, weatherApi } from './../environnement';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  
  getCityCoord(city:string) {
    return this.http.get(getApiUrl(city));
  }

  getCityWeather(lat:string, long:string) {
    return this.http.get(weatherApi(lat,long));
  }

}
