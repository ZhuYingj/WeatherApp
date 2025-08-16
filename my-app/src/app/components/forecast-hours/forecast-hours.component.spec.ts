import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastHoursComponent } from './forecast-hours.component';

describe('ForecastHoursComponent', () => {
  let component: ForecastHoursComponent;
  let fixture: ComponentFixture<ForecastHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastHoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
