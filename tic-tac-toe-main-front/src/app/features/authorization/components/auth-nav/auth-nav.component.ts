import { Component, OnInit } from '@angular/core';
import { RouterLinks } from '../../../../app.config';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})
export class AuthNavComponent implements OnInit {
  readonly routerLinks: typeof RouterLinks = RouterLinks;

  constructor() { }

  ngOnInit(): void {
  }

}
