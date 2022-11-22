import { Component } from '@angular/core';
import { RouterLinks } from '../../../app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly routerLink: typeof RouterLinks = RouterLinks;
}
