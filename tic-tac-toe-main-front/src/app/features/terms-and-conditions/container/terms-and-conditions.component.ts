import { Component } from '@angular/core';
import { ButtonName, RouterLinks } from '../../../app.config';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {
  readonly routerLink: typeof RouterLinks = RouterLinks;
  readonly fixedButtonVisibleHeight: number = 300;
  readonly fixedButtonVisibleWidth: number = 800;
  readonly buttonName: typeof ButtonName = ButtonName;
  readonly linkForButton = ['/', RouterLinks.gameRoom, RouterLinks.start]

  onUpBtn(): void {
    const nav = document.querySelector('.nav')!;
    nav.scrollIntoView();
  }
}
