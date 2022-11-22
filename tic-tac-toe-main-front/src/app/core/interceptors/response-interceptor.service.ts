import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import { InfoDialogComponent } from '../../shared/components/modals/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../components/loader/loader.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private dialog: MatDialog,
    private loaderService: LoaderService
    ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8',
        })
      });
    this.loaderService.showLoader();
    return next.handle(clonedRequest).pipe(
      catchError((err: any) => {
        this.dialog.open(InfoDialogComponent, {
          hasBackdrop: false,
          data: {
            content: err.error,
            description: 'Please try again',
            type: 'ERROR'
          }
        })
        return EMPTY;
      }),
      finalize(() => this.loaderService.hideLoader())
    );
  }
}
