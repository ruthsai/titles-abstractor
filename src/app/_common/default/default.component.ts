import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/_services';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(
    private router      : Router, 
    private auth        : AuthService
  ) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()) this.router.navigate(['home']);
    else this.router.navigate(['login']);
  }

}
