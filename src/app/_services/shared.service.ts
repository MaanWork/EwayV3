declare const $: any;
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, throwError, timer } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { AuthService } from '../demo/components/auth/Auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    public errorApiMsg: string = '';
    public successApiMsg: string = '';
    public Token: any;
    timeoutHandle: any = null;
    redirectSection: boolean = false;
    timeLimit: Subscription;
    public value: number;
    userDetails: any;
    ProductName: any = null;
    loginId: any;
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    private updateBookmarkList = new Subject<void>();
    refresh$ = this.updateBookmarkList.asObservable();

    private skipSection = new Subject<void>();
    skipSectionMethod$ = this.skipSection.asObservable();
    packageType: any;
    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private cookieService: CookieService,
        private router: Router,
    ) { }

    refreshUpdateBookmarkList() {
        this.updateBookmarkList.next();
    }


    getToken() {
        this.authService.isloggedToken.subscribe((event: any) => {
            if (event !== undefined && event !== '' && event != null) {
                this.Token = event;
            } else {
                this.Token = sessionStorage.getItem('UserToken');
            }
        });
        return this.Token;
    }

    async onPostMethodAsync(
        UrlLink: any,
        ReqObj: any,
    ): Promise<Observable<any[]>> {
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return await this.http
            .post<any>(UrlLink, ReqObj, { headers: headers })
            .pipe(catchError(this.handleError));
    }
    async onPostMethodUnAuthAsync(
        UrlLink: any,
        ReqObj: any,
    ): Promise<Observable<any[]>> {
        const headers = new HttpHeaders();
        return await this.http
            .post<any>(UrlLink, ReqObj, { headers: headers })
            .pipe(retry(1), catchError(this.handleError));
    }
    async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return await this.http
            .get<any>(UrlLink, { headers: headers })
            .pipe(catchError(this.handleError));
    }
    onGetMethod(UrlLink: any): Observable<any[]> {
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .get<any>(UrlLink, { headers: headers })
            .pipe(catchError(this.handleError));
    }
    onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .post<any>(UrlLink, ReqObj, { headers: headers })
            .pipe(catchError(this.handleError));
    }
    onGetMethodSync(UrlLink: string): Observable<any[]> {
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .get<any>(UrlLink, { headers: headers })
            .pipe(catchError(this.handleError));
    }
    onGetMethodPreexceptionAsync(UrlLink: string): Observable<any[]> {
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .get<any>(UrlLink, { headers: headers })
            .pipe(retry(1), catchError(this.handleError));
    }
    onPostDocumentMethodSync(
        UrlLink: string,
        ReqObj: any,
        file: File,
    ): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('File', file);
        formData.append('Req ', JSON.stringify(ReqObj));
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .post<any>(UrlLink, formData, { headers: headers })
            .pipe(catchError(this.handleError));
    }
    onPostDocumentMethodSyncNoReqObj(
        UrlLink: string,
        file: File,
    ): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .post<any>(UrlLink, formData, { headers: headers })
            .pipe(catchError(this.handleError));
    }
    onPostExcelDocumentMethodSync(
        UrlLink: string,
        ReqObj: any,
        file: File,
    ): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('uploadReq', JSON.stringify(ReqObj));
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');

        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .post<any>(UrlLink, formData, { headers: headers })
            .pipe(catchError(this.handleError));
    }
    onPostCoverDocumentMethodSync(
        UrlLink: string,
        ReqObj: any,
        file: File,
    ): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('uploadReq', JSON.stringify(ReqObj));
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .post<any>(UrlLink, formData, { headers: headers })
            .pipe(catchError(this.handleError));
    }
    clearTimeOut() {
        console.log('Clear Time Out');
        const redirectStatus = sessionStorage.getItem('redirectStatus');
        console.log('Router url', this.router.url);
        if (redirectStatus == undefined && this.router !== undefined) {
            if (
                this.router.url !== '/' &&
                this.router.url !== '/Login/Home' &&
                this.router.url !== '/Login/sessionRedirect' &&
                this.router.url !== '/Login/Officer' &&
                this.router.url !== '/Login/Assessor' &&
                this.router.url !== '/Login/Garage'
            ) {
                window.clearTimeout(this.timeoutHandle);
                this.setTimeOutSection();
            }
        }
        return true;
    }
    setTimeOutSection() {
        this.timeoutHandle = setTimeout(
            () => this.showAlert(this.redirectSection, this.router),
            5 * 60 * 1000,
        );
    }

    showAlert(redirectSection, router) {
        const redirectStatus = sessionStorage.getItem('redirectStatus');
        // tslint:disable-next-line: triple-equals
        if (redirectStatus == undefined && router != undefined) {
            // tslint:disable-next-line: triple-equals
            if (
                this.router.url != '/' &&
                this.router.url != '/Login/Home' &&
                this.router.url != '/Login/sessionRedirect' &&
                this.router.url != '/Login/Officer' &&
                this.router.url != '/Login/Assessor' &&
                this.router.url != '/Login/Garage'
            ) {
                sessionStorage.setItem('redirectStatus', 'started');

                const startValue: any = 1 * 60 + 5;

                this.timeLimit = timer(0, 1000)
                    .pipe(
                        take(startValue + 1),
                        map((value: any) => startValue - value),
                    )
                    .subscribe(
                        (value) => (this.value = value),
                        null,
                        () => (this.timeLimit = null),
                    );
                console.log(
                    'Alert Time Out',
                    router,
                    this.redirectSection,
                    this.timeLimit,
                );
            }
        }
    }

    onProceed(type) {
        if (type == 'Yes') {
            this.userDetails = JSON.parse(
                sessionStorage.getItem('Userdetails'),
            );
            this.loginId = this.userDetails.Result.LoginId;

            const ReqObj = {
                LoginId: this.loginId,
            };
            const urlLink = `${this.CommonApiUrl}authentication/tokenregenrate`;
            this.onPostMethodSync(urlLink, ReqObj).subscribe(
                (data: any) => {
                    if (data) {
                        const Token = data?.Result?.Token;
                        this.authService.UserToken(Token);
                        sessionStorage.setItem('UserToken', Token);
                        sessionStorage.removeItem('redirectStatus');
                    }
                },
                (err) => {
                    console.log('Error :', err);
                },
            );
        } else if (type == 'No') {
            sessionStorage.clear();
            this.cookieService.delete(
                'XSRF-TOKEN',
                '/',
                'domain name',
                true,
                'None',
            );
            this.router.navigate(['/Login/Home']);
        }
    }

    redirectRouting() {
        console.log('Redirect Time Out');
    }
    // Error handling
    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

    //Toast Display Method
    /*Error Message*/
    fnToastMoveHover(msg: any) {
        $('.toastDisplay').stop();
        $('.toastDisplay').fadeIn();
        $('.toastDisplay span').html(msg);
        this.errorApiMsg = msg;
        this.fnToastMoveOut();
    }

    fnOnToastCloseClick() {
        $('.toastDisplay').stop();
        $('.toastDisplay').hide();
    }
    fnToastMoveOut() {
        $('.toastDisplay').fadeOut(10000);
    }
    /*Success Message*/
    fnOnSuccessToastCloseClick() {
        $('.toastDisplaySuccess').hide();
    }

    fnToastMoveHoverSuccess(msg: any) {
        $('.toastDisplaySuccess').stop();
        $('.toastDisplaySuccess').fadeIn();
        $('.toastDisplaySuccess span').html(msg);
        this.successApiMsg = msg;
        this.fnToastMoveOutSuccess();
    }

    fnToastMoveOutSuccess = function () {
        $('.toastDisplaySuccess').fadeOut(10000);
    };
    onPostFilePathDocumentMethodSync(
        UrlLink: string,
        filePath: any,
    ): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('FilePath', filePath);
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .post<any>(UrlLink, formData, { headers: headers })
            .pipe(catchError(this.handleError));
    }

    SkipSection(type) {
        this.packageType = type;
        this.skipSection.next();
    }
    onPostDocumentMethodSynQuote(
        UrlLink: string,
        ReqObj: any,
        file: File,
    ): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('QuoteNo ', ReqObj);
        this.cookieService.set(
            'XSRF-TOKEN',
            this.getToken(),
            1,
            '/',
            'localhost',
            false,
            'Strict',
        );
        let headers = new HttpHeaders();
        headers = headers.append(
            'Cache-Control',
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        );
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        headers = headers.append('X-XSRF-TOKEN', this.getToken());
        return this.http
            .post<any>(UrlLink, formData, { headers: headers })
            .pipe(catchError(this.handleError));
    }

    public groupFields(fields: any[]): any[] {
    const grouped: any[] = [];
    const visibleFields = fields.filter(field => !field.hide);
    const newLineFields = ['IndemnityPeriod']; // Fields that must always start a new line
    let tempGroup: any[] = [];
    for (let i = 0; i < visibleFields.length; i++) {
      const field = visibleFields[i];
      if (newLineFields.includes(field.key)) {
        // Push any existing group before adding new-line field
        if (tempGroup.length > 0) {
          grouped.push(tempGroup);
          tempGroup = [];
        }
        grouped.push([field]); // Push IndemnityPeriod alone
      } else {
        // Pair fields together
        if (tempGroup.length === 0 || tempGroup.length === 1) {
          tempGroup.push(field);
        }
        if (tempGroup.length === 2) {
          grouped.push(tempGroup);
          tempGroup = [];
        }
      }
    }
    // Push remaining group if not empty
    if (tempGroup.length > 0) {
      grouped.push(tempGroup);
    }
    console.log(grouped);
    return grouped;
  }
}
