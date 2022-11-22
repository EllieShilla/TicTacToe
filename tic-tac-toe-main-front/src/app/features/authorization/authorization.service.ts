import { Injectable } from '@angular/core';
import { AuthorizationApiService, TokenService } from '../../core/services';
import {
  CREATE_NEW_PASSWORD_FORM_VALUE,
  SIGN_IN_REQUEST_BODY,
  SIGN_UP_REQUEST_BODY,
  TOKEN_OBJ
} from '../../core/models/authorization.models';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private isLoggedIn$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn$$.asObservable();

  constructor(
    private authorizationApiService: AuthorizationApiService,
    private tokenService: TokenService
  ) { }

  signUp(body: SIGN_UP_REQUEST_BODY): Observable<unknown> {
    return this.authorizationApiService.signUp(body).pipe(
      take(1)
    );
  }

  signIn(body: SIGN_IN_REQUEST_BODY): Observable<TOKEN_OBJ> {
    return this.authorizationApiService.signIn(body).pipe(
      tap((response: TOKEN_OBJ) => this.tokenService.saveTokenData(response)),
      take(1),
    );
  }

  initResetPassword(email: string): Observable<unknown> {
    return this.authorizationApiService.sentEmailForResetPassword(email).pipe(
      take(1)
    )
  }

  createNewPassword(createNewPasswordFormValue: CREATE_NEW_PASSWORD_FORM_VALUE): Observable<unknown> {
     return this.authorizationApiService.createNewPassword(createNewPasswordFormValue)
  }

  isLoggedIn(): boolean {
    return this.isLoggedIn$$.value;
  }

  logIn(): void {
    this.isLoggedIn$$.next(true);
  }

  logOut(): void {
    this.isLoggedIn$$.next(false);
  }
}
