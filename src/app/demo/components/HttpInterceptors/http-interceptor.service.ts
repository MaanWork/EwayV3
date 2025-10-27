import { Injectable, Injector } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CustomLoadingService } from '../../shared/custom-loading.service';
import Swal from 'sweetalert2';
import { SharedService } from '../../../_services/shared.service';
import { AuthService } from '../auth/Auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
    service_count = 0;
    totalRequests = 0;
    completedRequests = 0;
    submitted = false;
    userType: any;
    lang: any = null;
    loginSection: boolean = false;
    branchList: any[] = [];
    invalidIssuer = false;
    branchValue: any;
    public Proceed = false;
    auth: AuthService;

    constructor(
        public router: Router,
        private _injector: Injector,
        private loader: CustomLoadingService,
        private sharedService: SharedService,
        private translate: TranslateService,
        // private logincomponent:LoginComponent
    ) {
        this.lang = sessionStorage.getItem('language');
        if(!this.lang) this.lang = 'en';
        if (this.lang == undefined || this.lang == null) this.lang = 'en';
        this.translate.setDefaultLang(sessionStorage.getItem('language'));
        setTimeout(() => {
            this.auth = this._injector.get(AuthService);
        });
    }
    get http() {
        return this._injector.get(HttpClient);
    }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (!sessionStorage.getItem('loadingType')) {
            this.loader.show();
        } else this.loader.hide();
        this.totalRequests++;
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('error', this.router.url, req);
                    if (
                        this.router.url == '/login' ||
                        this.router.url == '/auth/login'
                    ) {
                        // this.loginResponse(event.body, req);
                    } else {
                        this.openResponse(event.body);
                    }
                }
                return event;
            }),
            finalize(() => {
                this.completedRequests++;
                if (this.completedRequests === this.totalRequests) {
                    this.loader.hide();
                    this.sharedService.clearTimeOut();
                    this.completedRequests = 0;
                    this.totalRequests = 0;
                }
            }),
            catchError((err) => {
                console.log('Error', err);
                if ([401, 403, 0].includes(err.status)) {
                     localStorage.setItem('TokenExpired', 'Expired');
                    const ulList = `<li class="list-group-item">
          <div style="color: darkgreen;">Field<span class="mx-2">:</span>LogOut Happened</div>
           <div style="color: red;">Message<span class="mx-2">:</span>From Another Device</div>
         </li>`;
                    Swal.fire({
                        title: '<strong>Session Error</strong>',
                        icon: 'info',
                        html: `<ul class="list-group errorlist">
               ${ulList}
           </ul>`,
                        showCancelButton: false,
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Cancel',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            sessionStorage.clear();
                            if (this.router.url != '/b2clogin')
                                this.router.navigate(['/auth/login']);
                        }
                    });
                } else if ([500].includes(err.status)) {
                    const ulList = `<li class="list-group-item">
          <div style="color: primary;font-size:10px">Url:&nbsp;<b>${req.url}</b></div>
          <div style="color: red;font-size:12px;"><b>Internal Server Error</b></div>
         </li>`;
                    Swal.fire({
                        title: '<strong>Error</strong>',
                        icon: 'info',
                        html: `<ul class="list-group errorlist">
               ${ulList}
              </ul>`,
                        showCancelButton: false,
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Okay!',
                    });
                } else if ([400].includes(err.status)) {
                    console.log('Request', req.url);
                    const ulList = `<li class="list-group-item">
          <div style="color: primary;font-size:10px">Url:&nbsp;<b>${req.url}</b></div>
          <div style="color: red;font-size:12px;"><b>Bad Request Error</b></div>
         </li>`;
                    Swal.fire({
                        title: '<strong>Error</strong>',
                        icon: 'info',
                        html: `<ul class="list-group errorlist">
               ${ulList}
              </ul>`,
                        showCancelButton: false,
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Okay!',
                    });
                } else if (err instanceof HttpErrorResponse) {
                    const errorList: any[] = err.error.ErrorMessage;
                    if (errorList.length > 0) {
                        this.openError(errorList);
                    }
                }
                const error = err.error?.message || err.statusText;
                console.error(err);
                return throwError(() => error);
            }),
        );
    }

    onBranchProceed() {
        this.Proceed = true;
        if (this.branchValue != '' && this.branchValue != undefined) {
            const userDetails = JSON.parse(
                sessionStorage.getItem('Userdetails'),
            );
            if (this.userType == 'Issuer') {
                const branchData: any = this.branchList.find(
                    (ele) => ele.BranchCode == this.branchValue,
                );
                userDetails.Result['BrokerBranchCode'] = null;
                userDetails.Result['BranchCode'] = branchData.BranchCode;
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                sessionStorage.setItem(
                    'Userdetails',
                    JSON.stringify(userDetails),
                );
                this.router.navigate(['/product']);
            } else {
                const branchData: any = this.branchList.find(
                    (ele) => ele.BrokerBranchCode == this.branchValue,
                );
                userDetails.Result['BrokerBranchCode'] =
                    branchData.BrokerBranchCode;
                userDetails.Result['BranchCode'] = branchData.BranchCode;
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                sessionStorage.setItem(
                    'Userdetails',
                    JSON.stringify(userDetails),
                );
                this.router.navigate(['/product']);
            }
        }
    }

    openResponse(res: any) {
        const loadingType = sessionStorage.getItem('loadingType');
        if (
            res?.ErrorMessage &&
            res?.ErrorMessage.length > 0 &&
            loadingType != 'motorSearch'
        ) {
            const errorList: any[] =
                res.ErrorMessage || res?.Result?.ErrorMessage;
            let ulList: any = '';

            for (let index = 0; index < errorList.length; index++) {
                const element = errorList[index];
                let field = null,
                    message = null,
                    fieldDesc = null,
                    messageDesc = null,
                    errorCode = null,
                    errorCodeDesc = null;
                    if (this.lang == 'en') {
                        (field = 'Field'),
                            (message = 'Message'),
                            (errorCode = 'Error Code'),
                            (fieldDesc = element?.Field),
                            (messageDesc = element?.Message),
                            (errorCodeDesc = element?.Code);
                    } else if (this.lang == 'fr') {
                        (field = 'Champ'),
                            (message = 'Message'),
                            (errorCode = "Code d'erreur"),
                            (fieldDesc = element?.FieldLocal),
                            (messageDesc = element?.MessageLocal),
                            (errorCodeDesc = element?.Code);
                    } else if (this.lang == 'po') {
                    (field = 'Campo'),
                        (message = 'Mensagem'),
                        (fieldDesc = element?.FieldLocal),
                        (messageDesc = element?.MessageLocal);
                }
                ulList += `<li class="list-group-login-field">
        <div style="color: darkgreen;">
           ${field}
        <span class="mx-2">:</span> ${fieldDesc}</div>
         <div style="color: red;">
        ${errorCode}
        <span class="mx-2">:</span>${errorCodeDesc}</div>
        <div style="color: red;">
        ${message}
        <span class="mx-2">:</span>${messageDesc}</div>
      </li>`;
            }
            let formValidation = null;
            if (this.lang == 'en') {
                formValidation = 'Form Validations';
            } else if (this.lang == 'fr') {
                formValidation = 'Validation du formulaire';
            } else if (this.lang == 'po') {
                formValidation = 'Validação de formulário';
            }
            //sssss
            Swal.fire({
                title: `<strong>${formValidation}</strong>`,
                icon: 'info',
                html: `<ul class="list-group errorlist">
           ${ulList}
        </ul>`,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-down"></i> Errors!',
                confirmButtonAriaLabel: 'Thumbs down, Errors!',
            });
        }
    }

    openError(res: any) {
        const errorList: any[] = res || [];

        if (errorList.length > 0) {
            console.log(errorList);
            let ulList: any = '';
            let name1 = null,name2=null;
            if(this.lang==='en'){name1='Errors!',name2=''}
            for (let index = 0; index < errorList.length; index++) {
                const element = errorList[index];
                ulList += `<li class="list-group-login-field">
         <div style="color: darkgreen;"> 
         <ng-container *ngIf="lang==='en'">Field</ng-container> 
         <!-- <ng-container *ngIf="lang==='fr'">Champ</ng-container>
         <ng-container *ngIf="lang==='po'">Campo</ng-container> -->
         <span class="mx-2">:</span>
         <ng-container *ngIf="lang==='en'"> ${element?.Field}</ng-container>
        <!-- <ng-container *ngIf="lang!=='en'"> ${element?.FieldLocal}</ng-container> -->
         </div>
         <div style="color: red;">
         <ng-container *ngIf="lang==='en'">Message</ng-container> 
         <!-- <ng-container *ngIf="lang==='fr'">Message</ng-container>
         <ng-container *ngIf="lang==='po'">Mensagem</ng-container> -->
         <span class="mx-2">:</span>
         <ng-container *ngIf="lang==='en'">${element?.Message}</ng-container>
         <!-- <ng-container *ngIf="lang!=='en'"> ${element?.MessageLocal}</ng-container> -->
         </div>
       </li>`;
            }
            Swal.fire({
                title: `<strong>
          <ng-container *ngIf="lang==='en'">Errors</ng-container> 
          <!--<ng-container *ngIf="lang==='fr'">Erreurs!</ng-container>
          <ng-container *ngIf="lang==='po'">Erros!</ng-container> -->
          </strong>`,
                icon: 'info',
                html: `<ul class="list-group errorlist">
           ${ulList}
        </ul>`,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: `<i class="fa fa-thumbs-down"></i> 
                <ng-container *ngIf="this.lang==='en'">Errors!</ng-container> 
                <!--<ng-container *ngIf="this.lang==='fr'">Erreurs!</ng-container>
                <ng-container *ngIf="this.lang==='po'">Erros!</ng-container> -->`,
                confirmButtonAriaLabel: 'Thumbs down, Errors!',
            });
        }
    }
}
