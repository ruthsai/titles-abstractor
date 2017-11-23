import { Component, OnInit } from '@angular/core';
import { AuthService, PagerService, ConfigService, 
  OrdersService } from '../../_services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  orders: any = []
  orderStatus: any = {};
  ordersToDisplay: any;
  totalCount: number;
  pager: any = {}; 
  filterBy: any = [];   
  sortField: string;
  orderBy: string;
  pageNum: number;
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private pagerService: PagerService,
    private config: ConfigService,
    private orderService: OrdersService,  
  ) {
    this.pager.pages = [];
    this.pageNum = 1;
    this.orderBy = 'ASC';
    this.sortField = 'Order_Creation_Date';    
  }

  ngOnInit() {
    this.getOrders();
  }

  setPage(page: number) {    
    if (page < 1 || page > this.pager.totalPages)  return;
    this.pageNum = page;
    this.setDisplayOrders();
    this.getOrders();
    this.pager = this.pagerService.getPager(this.totalCount, this.pageNum);    
  }

  setSort(field: string) {
    this.pageNum = 1;
    if (field == this.sortField) {
      if (this.orderBy == 'ASC') this.orderBy = 'DESC';
      else this.orderBy = 'ASC';
    } else {
      this.sortField = field;
      this.orderBy = 'ASC';
    }
    this.getOrders();
  }

  setDisplayOrders() {
    let start = ((this.pageNum - 1) * this.config.getNumRecordsPerPage());
    this.ordersToDisplay = this.orders.slice(start, this.totalCount);
    if (this.ordersToDisplay.length > this.config.getNumRecordsPerPage()) 
    this.ordersToDisplay = this.ordersToDisplay.slice(0, this.config.getNumRecordsPerPage());
  }

  getOrders() {    
    this.orderService.getNewOrders(this.pageNum, this.sortField, this.orderBy, 
      '', this.filterBy)
      .subscribe((result) => {
        if (result) {
         this.loadCards(result);
         this.pager = this.pagerService.getPager(this.totalCount, this.pageNum);          
        }
      }, (err) => {})
  }

  loadCards(data){
    this.orders = data.rows;
    this.totalCount = data.count;
    console.log("Total orders: ", this.totalCount)
    this.setDisplayOrders();
  }
}

