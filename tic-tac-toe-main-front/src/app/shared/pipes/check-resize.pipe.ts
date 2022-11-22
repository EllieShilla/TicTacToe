import { Pipe, PipeTransform } from '@angular/core';
import { fromEvent, Observable, of, switchMap } from 'rxjs';

@Pipe({
  name: 'checkViewportWidth'
})
export class CheckViewportWidthPipe implements PipeTransform {

  transform(comparedValue: number): Observable<boolean> {
    return of(window.innerWidth > comparedValue ? true : false);
  }

}
