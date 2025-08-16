import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ApiService } from '../../services/api-service.service';
import { NgClass } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-introduction-page',
  imports: [SearchBarComponent, NgClass, MatProgressBarModule, CommonModule],
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
  currentFeelsLike: number = 0;
  currentFeelText: string = "";
  currentTempCondition: string = "";
  fadingDoneGif: boolean = false;
  next7Days: string[] = [];
  listTemp7Days: any[] = [];

  getInfoWeather(location:string) {
    this.next7Days = this.getNextSevenDays();
    this.weatherService.getCityCoord(location).subscribe({
      next: (info:any) => {
        let lat = info[0].lat;
        let long = info[0].lon;
        this.weatherService.getCurrentCityWeather(lat,long).subscribe({
          next: (weatherInfo:any) => {
            //console.log(weatherInfo)
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
            setTimeout(() => {
              this.fadingDoneGif = true;
              this.weatherService.getHourlyForecastWeather(lat,long).subscribe({
                next: (hourlyWeatherInfo:any) => {
                  //console.log(hourlyWeatherInfo);
                }
              })

              this.weatherService.getDailyForecastWeather(lat,long).subscribe({
                next: (dailyForecastInfo:any) => {
                  this.todayMaxTemp = Math.round(dailyForecastInfo.list[0].temp.max);
                  this.todayMinTemp = Math.round(dailyForecastInfo.list[0].temp.min);
                  for(let i = 0; i < 7; i++) {
                    this.listTemp7Days[i] = dailyForecastInfo.list[i].temp;
                  }
                  console.log(dailyForecastInfo);
                }
              })

            }, 300);
          }
        });
      }
    });
  }
  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  reset() {
    this.info = undefined;
    this.searchBar.resetInput();
    this.fadingDoneGif = false;
  }

  searchWithIcon() {
    if(this.searchBar.location !== "") {
      this.getInfoWeather(this.searchBar.location);
      this.searchBar.resetInput();
    } 
  }

  getNextSevenDays(): string[] {
    const days: string[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      days.push(dayName);
    }
    console.log(days)
    return days;
  }

}
