import { Component, inject, ViewChild } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ApiService } from '../../services/api-service.service';
import { NgClass } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ForecastHoursComponent } from '../../components/forecast-hours/forecast-hours.component';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-introduction-page',
  imports: [SearchBarComponent, NgClass, MatProgressBarModule, CommonModule, ForecastHoursComponent],
  templateUrl: './introduction-page.component.html',
  styleUrl: './introduction-page.component.css',

})
export class IntroductionPageComponent {
  private clickSubject = new Subject<void>();
  private weatherService = inject(ApiService);
  private utilsService = inject(UtilsService);
  private currentIndex = 0;
  private images = [
    'url(./assets/hellokitty2.jpg)',
    'url(./assets/hellokitty1.jpg)',
    'url(./assets/hellokitty3.jpg)',
    'url(./assets/hellokitty4.jpg)',
    'url(./assets/hellokitty6.jpg)',
    'url(./assets/hellokitty7.jpg)',
    'url(./assets/hellokitty8.jpg)',
    'url(./assets/hellokitty9.jpg)',
  ];
  
  info: any;
  currentTemp: number = 0;
  todayMaxTemp: number = 0;
  todayMinTemp: number = 0;
  currentFeelsLike: number = 0;
  currentFeelText: string = "";
  currentTempCondition: string = "";
  fadingDoneGif: boolean = false;
  fadingDoneReset: boolean = false;
  next7Days: string[] = [];
  listTemp7Days: any[] = [];
  dayForecastHours: any[] = [];

  constructor() {
    this.clickSubject.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.reset();
    });
  }

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  reset() {
    this.fadingDoneReset = true;
    setTimeout(() => {
      this.info = undefined;
      this.searchBar.resetInput();
      this.fadingDoneGif = false;
      this.fadingDoneReset = false;
    }, 300)
  }
  
  onDebouncedClick() {
    this.clickSubject.next();
  }

  get nextBackground() {
    return this.images[this.currentIndex % this.images.length];
  }

  updateBackground() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

   searchWithIcon() {
    if(this.searchBar.location !== "") {
      this.getInfoWeather(this.searchBar.location);
      this.searchBar.resetInput();
    } 
  }

  getInfoWeather(location:string) {
    this.next7Days = this.utilsService.getNextSevenDays();
    if(this.fadingDoneGif) {
      this.updateBackground();
    }
    this.weatherService.getCityCoord(location).subscribe({
      next: (info:any) => {
        let lat = info[0].lat;
        let long = info[0].lon;
        this.weatherService.getCurrentCityWeather(lat,long).subscribe({
          next: (weatherInfo:any) => {
            this.getCurrentCityWeather(weatherInfo,lat,long);
          }
        });
      }
    });
  }

  getCurrentCityWeather(weatherInfo:any, lat:string, long:string) {
    this.info = weatherInfo;
      this.currentTemp = Math.round(weatherInfo.main.temp);
      this.currentTempCondition = this.info.weather[0].main;
      this.currentFeelsLike = Math.round(weatherInfo.main.feels_like);
      if(this.currentFeelsLike > this.currentTemp) {
        this.currentFeelText = "The perceived temperature is warmer."
      } else if( this.currentFeelsLike === this.currentTemp ) {
        this.currentFeelText = "The perceived temperature is the same as the real temperature."
      } else {
        this.currentFeelText = "The perceived temperature is colder."
      }
      this.getDailyAndHourlyForecast(lat,long);
  }

  getDailyAndHourlyForecast(lat:string, long:string) {
    setTimeout(() => {
      this.fadingDoneGif = true;
      this.weatherService.getHourlyForecastWeather(lat,long).subscribe({
        next: (hourlyWeatherInfo:any) => {
          this.dayForecastHours = hourlyWeatherInfo.list;
        }
      })

      this.weatherService.getDailyForecastWeather(lat,long).subscribe({
        next: (dailyForecastInfo:any) => {
          this.todayMaxTemp = Math.round(dailyForecastInfo.list[0].temp.max);
          this.todayMinTemp = Math.round(dailyForecastInfo.list[0].temp.min);
          for(let i = 0; i < 7; i++) {
            this.listTemp7Days[i] = dailyForecastInfo.list[i];
          }
        }
      })
    }, 300);
  }
}