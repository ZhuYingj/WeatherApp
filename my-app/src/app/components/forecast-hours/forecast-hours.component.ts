import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-forecast-hours',
  imports: [CommonModule],
  templateUrl: './forecast-hours.component.html',
  styleUrl: './forecast-hours.component.css'
})
export class ForecastHoursComponent implements AfterViewInit {
  @Input() listForecast: any[] = [];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  isDown = false;
  startX = 0;
  scrollLeft = 0;

  ngAfterViewInit() {
    const slider = this.scrollContainer.nativeElement as HTMLElement;

    slider.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDown = true;
      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', () => this.isDown = false);
    slider.addEventListener('mouseup', () => this.isDown = false);

    slider.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - this.startX) * 2;
      slider.scrollLeft = this.scrollLeft - walk;
    });
  }
}
