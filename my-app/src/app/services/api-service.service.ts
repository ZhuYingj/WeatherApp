import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getApiUrl } from './../environnement';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  
  getWeather(city:string) {
    return this.http.get(getApiUrl(city));
  }

}
