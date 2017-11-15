import { Component } from '@angular/core';
import { ConfigService } from './_services';
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
    private config: ConfigService
  ) {
    
    router.events
    .filter(event => event instanceof NavigationEnd)
    .pairwise().subscribe(e => {
      let previousUrl = Object.assign({}, e[0]);
      this.config.setPrevUrl(previousUrl);
    });
  }

  hideMenu(){
    this.config.hideMenu();
  }
}
