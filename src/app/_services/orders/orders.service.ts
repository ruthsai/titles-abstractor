import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'
import { Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable()
export class OrdersService {

  constructor(
    private router: Router,
    private auth: AuthService,
    private config: ConfigService,
    private http: HttpService    
  ) { }

  getNewOrders(pageNum, sortBy, orderBy, searchStr, filterBy) {
    var data = { filterBy: filterBy };
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let options = new RequestOptions({ headers: headers });
    let url = this.config.getBasePath() + '/orders/admin/' + this.auth.getUserId() + '/neworder';
    url = url + '/page/' + pageNum + '/size/' + this.config.getNumRecordsPerPage();
    if (sortBy != '') url = url + '/sort/' + sortBy + '/order/' + orderBy;
    if (searchStr) url = url + '/search/' + searchStr;
    return this.http.post(url, data, options)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

}
