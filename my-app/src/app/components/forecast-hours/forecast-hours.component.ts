import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-forecast-hours',
  imports: [CommonModule],
  templateUrl: './forecast-hours.component.html',
  styleUrl: './forecast-hours.component.css'
})
export class ForecastHoursComponent implements AfterViewInit, OnChanges {
  @Input() listForecast: any[] = [];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  private initialized = false;
  isDown = false;
  startX = 0;
  scrollLeft = 0;

  ngAfterViewInit() {
    this.tryInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['listForecast'] && this.listForecast.length > 0) {
      // Give Angular time to render the forecast list
      setTimeout(() => this.tryInit(), 0);
    }
  }

  private tryInit() {
    if (!this.scrollContainer || this.initialized) return;
    const slider = this.scrollContainer.nativeElement as HTMLElement;
    if (!slider) return;

    this.initialized = true;

    slider.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDown = true;
      this.startX = e.pageX - slider.getBoundingClientRect().left;
      this.scrollLeft = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
      this.isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseleave', () => {
      this.isDown = false;
    });

    slider.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.getBoundingClientRect().left;
      const walk = (x - this.startX) * 2;
      slider.scrollLeft = this.scrollLeft - walk;
    });
  }
}
