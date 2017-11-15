import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import { PreloaderService } from '../../_common/preloader/preloader.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable()
export class HttpService extends Http {

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              private preloaderService: PreloaderService,
              private cookieService:CookieService,
              private router:Router
              ) {
    super(backend, defaultOptions);
  }

  /**
   * Performs any type of http request.
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // console.log("request url: ", url);
    return super.request(url, options);
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @param preloaderType
   * @returns {Observable<>}
   */
  //get(url: string, options?: RequestOptionsArgs, preloaderType?: string): Observable<any> {
  get(url: string, options?: RequestOptionsArgs): Observable<any> {

    this.requestInterceptor();
    
    let fullUrl = this.getFullUrl(url);
   
    return super.get(fullUrl, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
       
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        
        this.onSubscribeError(error);
      })
      .finally(() => {
        
        this.onFinally();
      });
  }

  /**
   * Performs a request with `post` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    // console.log("post url: ", this.getFullUrl(url));
    this.requestInterceptor();
    let fullUrl = this.getFullUrl(url);

    return super.post(fullUrl, body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    // console.log("put url: ", this.getFullUrl(url));
    this.requestInterceptor();

    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `delete` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    // console.log("delete url: ", this.getFullUrl(url));
    this.requestInterceptor();

    return super.delete(this.getFullUrl(url), options)
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: Error) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  //

  /**
   * Build full URL for request.
   * @param str
   * @returns {string}
   */
  private getFullUrl(str): string {
    // return this.configService.getBasePath() + '/' + str;
    return str;
  }

  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    return options;
  }

  /**
   * Request interceptor.
   */
  //private requestInterceptor(preloaderType = 'full'): void {
  private requestInterceptor(): void {
    this.preloaderService.showPreloader();
  }

  /**
   * Response interceptor.
   */
  //private responseInterceptor(preloaderType = 'full'): void {
  private responseInterceptor(): void {
    this.preloaderService.hidePreloader();
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any): Observable<any> {
    // console.log('onCatch');
    return Observable.throw(error);
  }

  /**
   * onSubscribeSuccess
   * @param res
   */
  private onSubscribeSuccess(res: Response): void {
    // console.log("Response URL: ", res.url)
  }

  /**
   * onSubscribeError
   * @param error
   */
  private onSubscribeError(error: any): void {    
    if(error.status == 401 && this.cookieService.getObject('user') ){
      this.cookieService.remove('user');  
      this.router.navigate(['/login']);      
    }
  }

  /**
   * onFinally
   */
 // private onFinally(preloaderType = 'full'): void {
  private onFinally(): void {
    this.responseInterceptor();
  }
}