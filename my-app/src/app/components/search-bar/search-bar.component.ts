import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
    @Output() placeChange: EventEmitter<string> = new EventEmitter<string>();
    location = "";
    onPlaceInput(value: string) {
      if(this.location !== "") {
        this.placeChange.emit(value);
        this.location = "";
      }
    }

    resetInput() {
      this.location = "";
    }
}
