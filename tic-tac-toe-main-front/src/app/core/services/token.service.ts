import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';

import { TOKEN_OBJ } from '../models/authorization.models';
import { AuthorizationApiService } from './authorization-api.service';
import { TOKEN_OBJECT } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  readonly TOKEN_TIME = 10 * 60 * 1000;

  constructor(private authorizationApiService: AuthorizationApiService) {
  }

  saveTokenData({securityToken, refreshToken, accessToken}: TOKEN_OBJ): void {
    const tokenCreatingTime = Date.now();
    const tokenObject = {securityToken, createdTime: tokenCreatingTime, refreshToken, accessToken}
    const normalizedTokenObject = JSON.stringify(tokenObject);
    window.localStorage.setItem(TOKEN_OBJECT, normalizedTokenObject)
  }

  getSecurityToken(): TOKEN_OBJ {
    const tokenObject = window.localStorage.getItem(TOKEN_OBJECT);
    return  tokenObject ? JSON.parse(tokenObject): {};
  }

  refreshToken(): void {
    const token = this.getSecurityToken();
    if (this.isTokenExpired()) {
      this.authorizationApiService.refreshToken(token).pipe(
        tap((res) => this.saveTokenData(res as TOKEN_OBJ)),
        take(1),
      ).subscribe()
    }
  }

  isTokenExpired(): boolean {
    const { createdTime } = this.getSecurityToken();
    return Date.now() - Number(createdTime) > this.TOKEN_TIME;
  }
}
