import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'app/_services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private config: ConfigService
  ) { }

  ngOnInit() {
  }
  
  closeSideBar(){
    this.config.hideMenu()
  }

}
