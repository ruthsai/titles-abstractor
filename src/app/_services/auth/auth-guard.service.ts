import { Injectable } from '@angular/core';
import { Router, CanActivate ,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
      private router: Router,
      private auth: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){      
      return this.auth.canActivate()
      .map(loggedIn => {
        return true;
      })
      .catch(err => {
        this.auth.logout();
        this.router.navigate(['/login'],{ queryParams: { returnUrl: state.url }});
        return new Promise((resolve, reject) => resolve(err));
      });          
   }    

}