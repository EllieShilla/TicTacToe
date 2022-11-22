import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CREATE_NEW_PASSWORD_FORM_VALUE,
  SIGN_IN_REQUEST_BODY,
  SIGN_UP_REQUEST_BODY,
  TOKEN_OBJ
} from '../models/authorization.models';
import { Request_Url } from '../../app.config';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthorizationApiService {

  constructor(
    private http: HttpClient
  ) { }

  signUp(body: SIGN_UP_REQUEST_BODY): Observable<unknown> {
    return this.http.post(`${BASE_URL}${Request_Url.signUp}`, body)
  }

  signIn(body: SIGN_IN_REQUEST_BODY): Observable<TOKEN_OBJ> {
    return this.http.post<TOKEN_OBJ>(`${BASE_URL}${Request_Url.signIn}`, body)
  }

  sentEmailForResetPassword(email: string): Observable<unknown> {
    return this.http.get(`${BASE_URL}${Request_Url.sentEmailForResetPassword}/${email}`)
  }

  createNewPassword(body: CREATE_NEW_PASSWORD_FORM_VALUE): Observable<unknown> {
    return this.http.post(`${BASE_URL}${Request_Url.resetPassword}`, body)
  }

  refreshToken({securityToken, accessToken, refreshToken}: TOKEN_OBJ): Observable<unknown> {
    const requestBody = {securityToken, accessToken, refreshToken}
    return this.http.post(`${BASE_URL}${Request_Url.refreshToken}`, requestBody)
  }
}
