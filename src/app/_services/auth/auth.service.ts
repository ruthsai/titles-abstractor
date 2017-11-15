import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { HttpService } from '../http/http.service';
import { ConfigService, } from '../config/config.service';
import { SocketService } from '../socket/socket.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  constructor(
    private http: HttpService,
    private cookies: CookieService,
    private config: ConfigService,
    private socket: SocketService
  ) { }

  getToken(): string {
    if (this.cookies.getObject('pippinTitleAdm')) return this.cookies.getObject('pippinTitleAdm')['token'];
    return null;
  }

  isLoggedIn(): boolean {
    if (this.getToken()) return true;
    else return false;
  }

  canActivate(): any {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.getToken() });
    let options = new RequestOptions({ headers: headers });

    if (this.isLoggedIn())
      return this.http.get(this.config.getBasePath() + '/users/admin/isLoggedIn', options)
        .map((response) => response,
        (error) => Observable.throw(error));

    return Observable.throw(false);
  }

  login(loginData: any) {
    let username: string = loginData.Email_Address;
    let password: string = loginData.User_Password;

    let access_token: string = this.config.getAccessToken();
    let headers = new Headers();

    headers.append("Authorization", "Basic " + btoa(username + ":" + password));

    return this.http.post(this.config.getBasePath() + '/auth/admin/login', { access_token: access_token, }, { headers: headers })
      .map((response: Response) => {
        console.log("Login User info:", response);
        var cookieObj = response.json();
        if (response.json() && response.json().token) {
          cookieObj['user']['User_Code'] = cookieObj['user']['User_Status'];
          delete cookieObj['user']['User_Status'];
          // create a cookies for newuser 
          this.cookies.put('pippinTitleAbstr', JSON.stringify(cookieObj));
        }
        return cookieObj;
      })
      .catch((error) => Observable.throw(error.json()));
  }

  logout(): void {
    this.endSession();
    this.cookies.remove('pippinTitleAbstr');
  }

  endSession() {
    if (this.getToken()) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.getToken() });
      let options = new RequestOptions({ headers: headers });
      let url = this.config.getBasePath() + '/auth/admin/logout';
      this.http.post(url, { token: this.getToken() }, options)
        .subscribe((data) => {
          console.log("data:", data);
        }, (err) => {
          console.log("err", err);
        })
    }
  }

}
