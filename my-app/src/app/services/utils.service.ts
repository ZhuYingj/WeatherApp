import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    getNextSevenDays(): string[] {
    const days: string[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      days.push(dayName);
    }
    return days;
    }
}
