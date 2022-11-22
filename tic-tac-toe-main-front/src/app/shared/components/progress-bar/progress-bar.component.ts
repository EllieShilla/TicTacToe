import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';
import { takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() duration: number = 0;
  progressBarValue: number = 0;
  timerValue: number = 0;

  constructor(
    private progressBarService: ProgressBarService
  ) {
  }

  ngOnInit(): void {
    this.progressBarService.startProgressBar(this.duration).pipe(
      tap(({progress, timerValue}) => {
        this.progressBarValue = progress;
        this.timerValue = timerValue;
      }),
      takeWhile(() => this.timerValue !== this.duration)
    ).subscribe();
  }
}
