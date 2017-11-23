import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { SocketIoConfig, SocketIoModule } from 'ng-socket-io';
import { CookieModule, CookieService } from 'ngx-cookie';
import {  MatButtonModule,  MatInputModule, MatSidenavModule, 
  MatCardModule} from '@angular/material';

import { environment } from 'environments/environment';
import { PreloaderService } from 'app/_common/preloader/preloader.service';
import { HttpService, ConfigService, AuthService, AuthGuardService, 
  SocketService,PagerService, OrdersService } from 'app/_services';

import { AppComponent } from './app.component';
import { PreloaderComponent } from './_common/preloader/preloader.component';
import { DefaultComponent } from './_common/default/default.component';
import { HeaderComponent } from './_common/header/header.component';
import { FooterComponent } from './_common/footer/footer.component';
import { SidebarComponent } from './_common/sidebar/sidebar.component';
import { LoginComponent } from './modules/user/login/login.component';
import { HomeComponent } from './modules/home/home.component';

const appRoutes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuardService] },

  { path: '**', redirectTo: '' }
];

const configSocket: SocketIoConfig = { url: environment.basePath, options: {} };
const routing = RouterModule.forRoot(appRoutes);

export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions,
  preloaderService: PreloaderService, cookieService: CookieService, router: Router) {
  return new HttpService(backend, defaultOptions, preloaderService,  cookieService, router);
}

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    DefaultComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    MatButtonModule, MatInputModule,MatSidenavModule,MatCardModule,
    CookieModule.forRoot(),
    SocketIoModule.forRoot(configSocket),
    FormsModule, ReactiveFormsModule, HttpModule, routing, RouterModule
  ],
  providers: [
    CookieService,
    ConfigService,
    PreloaderService,
    AuthService,
    AuthGuardService,
    SocketService,
    PagerService, 
    OrdersService,
    HttpService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, PreloaderService, CookieService, Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
