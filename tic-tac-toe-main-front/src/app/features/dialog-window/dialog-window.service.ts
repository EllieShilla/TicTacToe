import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogWindowService {
  isRedirectToSignUp: boolean = false;
  isRedirectToSignIn: boolean = false;
}
