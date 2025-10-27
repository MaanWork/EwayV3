import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-renewal-details',
    templateUrl: './renewal-details.component.html',
    styleUrls: ['./renewal-details.component.scss'],
})
export class RenewalDetailsComponent implements OnInit {
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
    tabIndex: any = 0;
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
    subusertype: any = null;
    RenewalListData: any[] = [];
    PendingListData: any[] = [];
    ExpiredListData: any[] = [];
    BusinessLossListData: any[] = [];
    viewRenewalDetails: boolean = false;
    columnC: any[] = [];

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
        //this.branchCode = this.userDetails.Result.BranchCode;
        this.countryId = this.userDetails.Result.CountryId;
        this.branchValue = this.userDetails.Result.BranchCode;
        this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
        this.productId = this.userDetails.Result.ProductId;
        this.PackageYn = this.userDetails.Result.PackageYn;
        this.insuranceId = this.userDetails.Result.InsuranceId;
        this.loginType = this.userDetails.Result.LoginType;
        if (this.userType != 'Issuer') this.brokerCode = this.loginId;
        this.subusertype = sessionStorage.getItem('typeValue');
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
            'Insured Name',
            'Old Policy No ',
            'Old Quote No',
            'New Reference No',
            'Start Date',
            'End Date',
            'View',
            'Convert',
        ];
        this.columnC = [
            'S.No',
            'Insured Name',
            'Old Policy No ',
            'Old Quote No',
            'New Reference No',
            'Start Date',
            'End Date',
            'View',
        ];
        this.getPendingList();
    }
    onTabClicked(event) {
        const index = event.index;
        this.tabIndex = index;
        if (this.tabIndex == 0) this.getPendingList();
        if (this.tabIndex == 1) this.getCompletedList();
        if (this.tabIndex == 2) this.getExpiredList();
    }
    onViewRenewalDetails() {
        this.viewRenewalDetails = true;
    }
    onConvertRenewalData(rowData) {
        const urlLink = `${this.CommonApiUrl}post/renewal/renewalCopyQuote`;
        let brokerbranch = null;
        if (this.brokerbranchCode == null) brokerbranch = 'None';
        else brokerbranch = this.brokerbranchCode;
        const ReqObj = {
            PolicyNo: rowData.OldPolicyNo,
            RiskId: '1',
            InsuranceId: this.insuranceId,
            ProductId: this.productId,
            LoginId: this.loginId,
            ApplicationId: '1',
            UserType: this.userType,
            SubUserType: this.subusertype,
            BranchCode: this.branchValue,
            BrokerBranchCode: brokerbranch,
        };
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data) {
                    if (data.RequestReferenceNo) {
                        sessionStorage.setItem(
                            'quoteReferenceNo',
                            data.RequestReferenceNo,
                        );
                        if (this.productId == '5') {
                            sessionStorage.setItem('QuoteType', 'Renewal');
                            this.router.navigate(['/policyDetails']);
                        }
                    }
                }
            });
    }
    getPendingList() {
        const urlLink = `${this.CommonApiUrl}post/renewal/pending`;
        const ReqObj = {
            BranchCode: this.branchValue,
            InsuranceId: this.insuranceId,
            ApplicationId: '1',
            LoginId: this.loginId,
            UserType: this.userType,
            ProductId: this.productId,
        };
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    if (data.Result?.RenewalPolicyList) {
                        if (data.Result?.RenewalPolicyList.length != 0) {
                            this.PendingListData =
                                data.Result.RenewalPolicyList;
                        }
                    }
                }
            });
    }
    getCompletedList() {
        const urlLink = `${this.CommonApiUrl}post/renewal/completed`;
        const ReqObj = {
            BranchCode: this.branchValue,
            InsuranceId: this.insuranceId,
            ApplicationId: '1',
            LoginId: this.loginId,
            UserType: this.userType,
            ProductId: this.productId,
        };
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    if (data.Result?.RenewalPolicyList) {
                        if (data.Result?.RenewalPolicyList.length != 0) {
                            this.RenewalListData =
                                data.Result.RenewalPolicyList;
                        }
                    }
                }
            });
    }
    getExpiredList() {
        const urlLink = `${this.CommonApiUrl}post/renewal/expired`;
        const ReqObj = {
            BranchCode: this.branchValue,
            InsuranceId: this.insuranceId,
            ApplicationId: '1',
            LoginId: this.loginId,
            UserType: this.userType,
            ProductId: this.productId,
        };
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    if (data.Result?.RenewalPolicyList) {
                        if (data.Result?.RenewalPolicyList.length != 0) {
                            this.RenewalListData =
                                data.Result.RenewalPolicyList;
                        }
                    }
                }
            });
    }
}
