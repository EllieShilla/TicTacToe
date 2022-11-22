import { Component, OnInit } from '@angular/core';
import { RouterLinks } from '../../../app.config';
import { AuthorizationService } from '../../../features/authorization/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  readonly routerLinks: typeof RouterLinks = RouterLinks;

  isLoggedIn$!: Observable<boolean>;

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.initIsLoggedIn();
  }

  private initIsLoggedIn(): void {
    this.isLoggedIn$ = this.authorizationService.isLoggedIn$;
  }
}
