import { Component, OnInit } from '@angular/core';
import { ConfigService ,AuthService} from 'app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  constructor(
    private config: ConfigService,
    private auth: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  
  closeSideBar(){ this.config.hideMenu() }

  logout() {    
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
