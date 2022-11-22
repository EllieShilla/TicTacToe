import { Injectable } from '@angular/core';
import { interval, map, Observable, take } from 'rxjs';
import { ProgressBarModels } from './progress-bar.models';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  progressBarValue: number = 0;
  timerValue: number = 0;

  startProgressBar(duration: number): Observable<ProgressBarModels> {
    return  interval(1000).pipe(
      map(() => {
          return {
            progress: this.progressBarValue+=(100/duration),
            timerValue: this.timerValue+=1
          }
        }
      )
    )
  }

  refreshTimer(): void {
    this.timerValue = 0;
    this.progressBarValue = 0;
  }
}
