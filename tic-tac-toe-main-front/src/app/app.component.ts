import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/components/loader/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Space game';
  isLoaderVisible$!: Observable<Boolean>;

  constructor(
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.initLoader();
  }

  private initLoader(): void {
    this.isLoaderVisible$ = this.loaderService.isLoaderVisible$;
  }
}
