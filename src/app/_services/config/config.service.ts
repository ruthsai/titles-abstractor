import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable()
export class ConfigService {
    private basePath: string;
    private access_token: string;
    private numberOfRecords:number = 10;
    private viewMenu: boolean;
    private previousUrl: any = {};

    constructor() { }

    getBasePath(): string {
        return environment.basePath;
    }

    isProductionEnv(): boolean {
        return environment.production;
    }

    getAccessToken() {
        return environment.access_token;       
    }

    getNumRecordsPerPage(){
        return this.numberOfRecords;
    }

    getMenu(): boolean {
        return this.viewMenu;
    }

    showMenu(event) {
        this.viewMenu = !this.viewMenu;
        event.stopPropagation();
    }

    hideMenu() {
        this.viewMenu = false;
    }

    getPrevUrl() {
        return this.previousUrl.url;
    }
    
    setPrevUrl(url) {
        this.previousUrl = url;
    }
}
