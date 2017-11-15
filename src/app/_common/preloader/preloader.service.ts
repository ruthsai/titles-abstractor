import { Injectable } from '@angular/core';

@Injectable()
export class PreloaderService {

 public static loadingCount: number = 0;
  public static searchCount: number = 0;
  public static searchSpinner: boolean = false;

 getPreloaderCount(): number {
      return PreloaderService.loadingCount;    
 }

 showPreloader(): void {
      if(PreloaderService.searchSpinner) PreloaderService.searchCount++;
      else PreloaderService.loadingCount++;
  }

 hidePreloader(): void {
      if(PreloaderService.searchSpinner) PreloaderService.searchCount--;
      else PreloaderService.loadingCount--;
      if(PreloaderService.searchCount == 0) PreloaderService.searchSpinner = false;
  }

 getSearchCount(): number {
      return PreloaderService.searchCount;    
 }

 setSearchSpin(): void{
    PreloaderService.searchSpinner = true;
  }

 unsetSearchSpin(): void{
    PreloaderService.searchSpinner = false;
  }

}