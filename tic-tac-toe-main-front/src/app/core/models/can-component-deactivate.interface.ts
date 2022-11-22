import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean | UrlTree> |
    boolean |
    UrlTree
}
