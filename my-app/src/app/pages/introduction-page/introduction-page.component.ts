import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ApiService } from '../../services/api-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-introduction-page',
  imports: [SearchBarComponent, NgClass],
  templateUrl: './introduction-page.component.html',
  styleUrl: './introduction-page.component.css',

})
export class IntroductionPageComponent {
  routerService = inject(Router);
  weatherService = inject(ApiService);
  info: any;
  currentTemp: number = 0;
  todayMaxTemp: number = 0;
  todayMinTemp: number = 0;
  currentTempCondition: string = "";
  fadingDone: boolean = false;

  getInfoWeather(location:any) {
    setTimeout(() => {
      this.fadingDone = true;
    }, 300);
    setTimeout(()=>{
      this.weatherService.getCityCoord(location).subscribe({
        next: (info:any) => {
          let lat = info[0].lat;
          let long = info[0].lon;
          this.weatherService.getCurrentCityWeather(lat,long).subscribe({
            next: (weatherInfo:any) => {
              console.log(weatherInfo)
              this.info = weatherInfo;
              this.currentTemp = Math.ceil(weatherInfo.main.temp);
              this.currentTempCondition = this.info.weather[0].main;
            }
          });
          this.weatherService.getHourlyForecastWeather(lat,long).subscribe({
            next: (hourlyWeatherInfo:any) => {
              console.log(hourlyWeatherInfo);
            }
          })

          this.weatherService.getDailyForecastWeather(lat,long).subscribe({
            next: (dailyForecastInfo:any) => {
              this.todayMaxTemp = Math.ceil(dailyForecastInfo.list[0].temp.max);
              this.todayMinTemp = Math.ceil(dailyForecastInfo.list[0].temp.min);
              console.log(dailyForecastInfo);
            }
          })
        }
      });
    },450);
  }
  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  reset() {
    this.info = undefined;
    this.searchBar.resetInput();
    this.fadingDone = false;
  }

}
