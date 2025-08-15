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
  fadingDone: boolean = false;

  getInfoWeather(location:any) {
    setTimeout(() => {
      this.fadingDone = true;
    }, 300);
    this.weatherService.getCityCoord(location).subscribe({
      next: (info:any) => {
        let lat = info[0].lat;
        let long = info[0].lon;
        this.weatherService.getCityWeather(lat,long).subscribe({
          next: (weatherInfo:any) => {
            console.log(weatherInfo)
            this.info = weatherInfo;
            this.currentTemp = Math.ceil(weatherInfo.main.temp);
          }
        })
      }
    });
  }
  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  reset() {
    this.info = undefined;
    this.searchBar.resetInput();
    this.fadingDone = false;
  }

}
