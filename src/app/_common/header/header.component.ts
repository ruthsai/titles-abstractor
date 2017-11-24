import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService,AuthService } from '../../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {  

  constructor(
    private auth: AuthService,
    private router: Router,
    private config: ConfigService
  ) { }

  ngOnInit() {
  }

  openSideBar(event){ this.config.showMenu(event) }

  isLoggedIn(){ return this.auth.isLoggedIn()}

}
