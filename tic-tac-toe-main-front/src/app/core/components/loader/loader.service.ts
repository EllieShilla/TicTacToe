import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoaderVisible$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoaderVisible$: Observable<boolean> = this.isLoaderVisible$$.asObservable();

  showLoader(): void {
    this.isLoaderVisible$$.next(true);
  }

  hideLoader(): void {
    this.isLoaderVisible$$.next(false);
  }
}
