import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/_services/shared.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-renewal',
    templateUrl: './renewal.component.html',
    styles: [
        `
            .form-container input,
            p-dropdown {
                min-width: 20rem;
            }
        `,
    ],
})
export class RenewalComponent implements OnInit {
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    items: MenuItem[] | undefined;
    startdate: any;
    branchValue: any;
    public quoteData: any[] = [];
    innerColumnHeader: any[] = [];
    customerData: any[] = [];
    userDetails: any;
    loginId: any;
    userType: any;
    agencyCode: any;
    countryId: any;
    brokerbranchCode: any;
    productId: any;
    PackageYn: any;
    insuranceId: any;
    branchList: any;
    updateComponent: any;
    loginType: any;
    enddate: any;
    showgrid: any = false;

    Currency: any;
    brokerList: any[] = [];
    brokerCode: any;
    btype: any;
    buisnessList: any[] = [];
    columns: any[] = [];
    lang: any = null;
    RenewalListData: any[] = [];

    constructor(
        private router: Router,
        private sharedService: SharedService,
        private datePipe: DatePipe,
        private appComp: AppComponent,
        private translate: TranslateService,
    ) {
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        console.log('UserDetails', this.userDetails);
        this.loginId = this.userDetails.Result.LoginId;
        this.userType = this.userDetails?.Result?.UserType;
        this.agencyCode = this.userDetails.Result.OaCode;
        this.countryId = this.userDetails.Result.CountryId;
        this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
        this.productId = this.userDetails.Result.ProductId;
        this.PackageYn = this.userDetails.Result.PackageYn;
        this.insuranceId = this.userDetails.Result.InsuranceId;
        this.loginType = this.userDetails.Result.LoginType;
        const typeValue = sessionStorage.getItem('typeValue');
        if (typeValue != 'high') {
            this.router.navigate(['/renewal/RenewalDetails']);
        }
        if (this.userType != 'Issuer') this.brokerCode = this.loginId;
    }

    ngOnInit(): void {
        this.appComp.getLanguage().subscribe((res: any) => {
            if (res) this.lang = res;
            else this.lang = 'en';
            this.translate.setDefaultLang(this.lang);
        });
        if (!this.lang) {
            if (sessionStorage.getItem('language'))
                this.lang = sessionStorage.getItem('language');
            else this.lang = 'en';
            sessionStorage.setItem('language', this.lang);
            this.translate.setDefaultLang(sessionStorage.getItem('language'));
        }
        this.columns = [
            'S.No',
            'Transaction Id',
            'Re-Trigger',
            'Requested time',
            'Total No.Of Renewal',
            'Pending',
            'Success',
            'Converted',
        ];
        this.getBranchList();
    }

    getBranchList() {
        const ReqObj = {
            InsuranceId: this.insuranceId,
        };
        const urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.branchList = data?.Result;
                }
            });
    }
    getDisplayName() {
        if (this.lang == 'en') return 'CodeDesc';
        else return 'CodeDescLocal';
    }

    getsearch() {
        this.showgrid = true;
        this.getQuotes();
    }

    getQuotes() {
        this.RenewalListData = [];
        const startdate = this.datePipe.transform(this.startdate, 'dd/MM/yyyy');
        const enddate = this.datePipe.transform(this.enddate, 'dd/MM/yyyy');
        const ReqObj = {
            BranchCode: this.branchValue,
            InsuranceId: this.insuranceId,
            StartDate: startdate,
            EndDate: enddate,
        };
        const urlLink = `${this.CommonApiUrl}post/renewal/transaction`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.RenewalListData = data?.Result;
                }
            });
    }
}
