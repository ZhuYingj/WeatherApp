import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-introduction-page',
  imports: [SearchBarComponent],
  templateUrl: './introduction-page.component.html',
  styleUrl: './introduction-page.component.css',

})
export class IntroductionPageComponent {
  routerService = inject(Router);
  weatherService = inject(ApiService);
  info: any;
  cities: string[] = [];

  getInfo(location:any) {
    this.weatherService.getWeather(location).subscribe({
      next: (info:any) => {
        this.info = info;
        //this.info = Math.round(info.main.temp) + " °C";
        console.log(info);
      }
    });
  }

}
