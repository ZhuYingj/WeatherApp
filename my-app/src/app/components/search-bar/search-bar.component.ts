import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import cities from 'cities.json';
@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{
    @Output() placeChange: EventEmitter<string> = new EventEmitter<string>();
    location = "";
    suggestion: string = '';
    cityList: string[] = [];

    ngOnInit() {
      const citiesArray = cities as any[];
      this.cityList = citiesArray.map((city: any) => city.name);
    }

    onPlaceInput(value: string) {
      if(this.location !== "") {
        this.placeChange.emit(value);
        this.location = "";
        this.suggestion = ""
      }
    }

    onSearchChange(searchTerm: string) {
      if (searchTerm.length < 2) {
        this.suggestion = '';
        return;
      }
      
      const term = searchTerm.toLowerCase();
      const match = this.cityList.find((cityName: string) => 
        cityName.toLowerCase().startsWith(term)
      );
      
      if (match && match.toLowerCase() !== term) {
        this.suggestion = searchTerm + match.slice(searchTerm.length);
      } else {
        this.suggestion = '';
      }
    }

    acceptSuggestion(event: any) {
      if (this.suggestion) {
        event.preventDefault();
        this.location = this.suggestion;
        this.suggestion = '';
      }
    }

    resetInput() {
      this.location = "";
    }

    simulateIconClickEffect() {
      const icon = document.getElementById('search-icon');
      if (!icon) return;

      icon.classList.add('active');

      setTimeout(() => {
        icon.classList.remove('active');
      }, 200);
    }
}
