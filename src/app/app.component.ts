import { Component } from '@angular/core';
import { ConfigService, AuthService } from './_services';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app'; 
  
  constructor(    
    private router: Router,
    private config: ConfigService,
    private auth: AuthService
  ) {    
    router.events
    .filter(event => event instanceof NavigationEnd)
    .pairwise().subscribe(e => {
      let previousUrl = Object.assign({}, e[0]);
      this.config.setPrevUrl(previousUrl);
    });
  }
  
  isLoggedIn(){ return this.auth.isLoggedIn()}

  getMenu(){ return this.config.getMenu()}

}
