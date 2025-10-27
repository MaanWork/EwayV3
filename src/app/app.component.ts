import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {  Observable, Subject } from 'rxjs';
import { CustomLoadingService } from './demo/shared/custom-loading.service';
import { SharedService } from './_services/shared.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentChecked {
    defaultLanguage:any = new Subject<string>()
    public loading$!: Observable<any>;
    constructor(private primengConfig: PrimeNGConfig,public customLoder: CustomLoadingService,
        private cdr: ChangeDetectorRef,
        public _sharedService: SharedService,
        public router:Router) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        const language =  sessionStorage.getItem('language');
        if(language) this.setLanguage(language);
        else this.setLanguage('en');
    }
    
    ngAfterContentChecked() {
        this.loading$ = this.customLoder.loader;
        this.cdr.detectChanges();
    }
    private _navigationInterceptor(event: RouterEvent): void {
      
      if (event instanceof NavigationEnd) {
      window.scrollTo({
        top: 0
      });
      }
    }
    getLanguage(): Observable<any[]>{
      return this.defaultLanguage.asObservable();
    }
    setLanguage(value){
      this.defaultLanguage.next(value);
    }
    
}
