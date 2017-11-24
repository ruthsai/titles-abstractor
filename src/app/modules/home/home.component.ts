import { Component, OnInit } from '@angular/core';
import { AuthService, ConfigService,OrdersService } from '../../_services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  orders: any = []
  
  
  constructor(
    private auth: AuthService,
    private router: Router,    
    private config: ConfigService,
    private orderService: OrdersService,  
  ) {
   
  }

  ngOnInit() {
    
  }

  
}

