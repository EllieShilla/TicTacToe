import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services';
import { Request_Url } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { securityToken, refreshToken } = this.tokenService.getSecurityToken();
    const isAuthReq = this.isAuthRequest(request.url);
    const isRefreshReq = this.isRefreshTokenRequest(request.url);
    let tokenHeader;

    this.tokenService.refreshToken();

    if (isRefreshReq) {
      tokenHeader = this.setToken(request, refreshToken);
    }

    if (securityToken && !isAuthReq) {
      tokenHeader = this.setToken(request, securityToken);
    }

    const modifiedReq = tokenHeader ? tokenHeader : {};

    const header = request.clone(modifiedReq);
    return next.handle(header);
  }

  private isAuthRequest(url: string): boolean {
    return url.includes(Request_Url.signUp)
      || url.includes(Request_Url.signIn)
      || url.includes(Request_Url.resetPassword)
      || url.includes(Request_Url.sentEmailForResetPassword);
  }

  private isRefreshTokenRequest(url: string) : boolean {
    return url.includes(Request_Url.refreshToken);
  }

  private setToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    const bearer = `Bearer ${token}`;
    const header = { Authorization: bearer };
    return request.clone({ setHeaders: header});
  }
}
