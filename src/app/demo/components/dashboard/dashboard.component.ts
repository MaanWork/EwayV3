import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../_models/product.model';
import { ProductService } from '../../../_services/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from '@app/layout/service/layout.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../_services/shared.service';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../auth/login/login.service';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    items!: MenuItem[];
    rangeValue: any = 1;
    lang: any;
    products!: Product[];
    rangeList: any[] = [];
    chartData: any;
    chart2Data: any;
    chartOptions: any;
    subscription!: Subscription;
    userDetails: any = null;
    agencyCode: any = null;
    insuranceId: any = null;
    branchCode: any = null;
    productId: any = null;
    loginId: any = null;
    PackageYn: any = null;
    countList: any[] = [];
    rangeEndtValue: any = 1;
    endorsementList: any[] = [];
    userType: any = null;
    subuserType: any = null;
    countryId: any = null;
    brokerbranchCode: any = null;
    notificationList: any;
    rangeNotifyValue: any = 1;
    columns: any[] = [];
    productType: string;
    constructor(
        private productService: ProductService,
        private datePipe: DatePipe,
        private appComp: AppComponent,
        private translate: TranslateService,
        private sharedService: SharedService,
        public layoutService: LayoutService,
        private loginService: LoginService
    ) {
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        console.log('UserDetails', this.userDetails);
        this.loginId = this.userDetails.Result.LoginId;
        this.userType = this.userDetails?.Result?.UserType;
        this.agencyCode = this.userDetails.Result.OaCode;
        this.branchCode = this.userDetails.Result.BranchCode;
        this.countryId = this.userDetails.Result.CountryId;
        this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
        this.productId = this.userDetails.Result.ProductId;
        this.PackageYn = this.userDetails.Result.PackageYn;
        this.insuranceId = this.userDetails.Result.InsuranceId;
        this.subuserType = sessionStorage.getItem('typeValue');

        if (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') {
            this.loginService.productId$.subscribe(id => {
                this.productType = sessionStorage.getItem('ProductId');
            });
        }

        // this.subscription = this.layoutService.configUpdate$.subscribe(() => {
        //     this.initChart();
        // });
        const entry = sessionStorage.getItem('reloadOnce');
        if (entry) {
            sessionStorage.removeItem('reloadOnce');
            window.location.reload();
        }
        this.rangeList = [
            {
                Code: 1,
                CodeDesc: 'Last 30 Days',
                CodeDescLocal: 'Les 30 derniers jours',
            },
            {
                Code: 2,
                CodeDesc: 'Last 60 Days',
                CodeDescLocal: 'Les 60 derniers jours',
            },
            {
                Code: 3,
                CodeDesc: 'Last 90 Days',
                CodeDescLocal: 'Les 90 derniers jours',
            },
            {
                Code: 4,
                CodeDesc: 'Last 120 Days',
                CodeDescLocal: 'Les 120 derniers jours',
            },
        ];
    }

    ngOnInit() {
        //this.showSuccessToast();
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary',
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');
        //this.initChart();
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));
        this.columns = ['Email', 'PhoneNo', 'Date', 'Content'];
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
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
        this.getCountDetails();
        this.getQuoteOverview();
        this.getEndorsementRecordList();
        this.getNotificationList();
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }
    //For Date Based Policy, Quote Counts
    getCountDetails() {
        let startDate = null,
            endDate = null;
        const backDate = new Date();
        const d = backDate;
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        startDate = this.datePipe.transform(
            new Date(year, month - 1, day),
            'dd/MM/yyyy',
        );
        endDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
        const ReqObj = {
            InsuranceId: this.insuranceId,
            BranchCode: this.branchCode,
            ProductId: this.productId,
            LoginId: this.loginId,
            UserType: this.userType,
            SubUserType: this.subuserType,
            StartDate: startDate,
            EndDate: endDate,
        };
        const urlLink = `${this.CommonApiUrl}api/dashboard/v1/count`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.countList = data.Result;
                }
            });
    }
    getDisplayName() {
        if (this.lang == 'en') return 'CodeDesc';
        else return 'CodeDescLocal';
    }
    getQuoteOverview() {
        const documentStyle = getComputedStyle(document.documentElement);
        let startDate = null,
            endDate = null;
        const backDate = new Date();
        const d = backDate;
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        startDate = this.datePipe.transform(
            new Date(year, month - this.rangeValue, day),
            'dd/MM/yyyy',
        );
        endDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
        const ReqObj = {
            InsuranceId: this.insuranceId,
            BranchCode: this.branchCode,
            ProductId: this.productId,
            LoginId: this.loginId,
            UserType: this.userType,
            SubUserType: this.subuserType,
            StartDate: startDate,
            EndDate: endDate,
        };
        const urlLink = `${this.CommonApiUrl}api/dashboard/v1/chart`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    const chartList = data.Result;
                    if (chartList.length != 0) {
                        let i = 0;
                        const labels: any[] = [],
                            labels2: any[] = [],
                            quoteCount: any[] = [],
                            quote2Count: any[] = [],
                            policyCount: any[] = [];
                        for (const chart of chartList) {
                            if (chart.Date != null && chart.Date != '') {
                                if (chart.QuoteCount != 0) {
                                    const Date = this.datePipe.transform(
                                        chart.Date,
                                        'dd/MM/yyyy',
                                    );
                                    if (labels.some((ele) => ele == Date)) {
                                        const index = labels.findIndex(
                                            (ele) => ele == Date,
                                        );
                                        quoteCount[index] =
                                            quoteCount[index] +
                                            chart.QuoteCount;
                                    } else {
                                        labels.push(
                                            this.datePipe.transform(
                                                chart.Date,
                                                'dd/MM/yyyy',
                                            ),
                                        );
                                        quoteCount.push(chart.QuoteCount);
                                    }
                                }
                                if (
                                    chart.QuoteCount != 0 ||
                                    chart.PolicyCount != 0
                                ) {
                                    const Date = this.datePipe.transform(
                                        chart.Date,
                                        'dd/MM/yyyy',
                                    );
                                    if (labels2.some((ele) => ele == Date)) {
                                        const index = labels2.findIndex(
                                            (ele) => ele == Date,
                                        );
                                        quote2Count[index] =
                                            quote2Count[index] +
                                            chart.QuoteCount;
                                        policyCount[index] =
                                            policyCount[index] +
                                            chart.PolicyCount;
                                    } else {
                                        labels2.push(
                                            this.datePipe.transform(
                                                chart.Date,
                                                'dd/MM/yyyy',
                                            ),
                                        );
                                        quote2Count.push(chart.QuoteCount);
                                        policyCount.push(chart.PolicyCount);
                                    }
                                }
                                i += 1;
                                if (i == chartList.length) {
                                    this.chartData = {
                                        labels: labels,
                                        datasets: [
                                            {
                                                label: this.getLabelname(
                                                    'Quotes',
                                                ),
                                                data: quoteCount,
                                                fill: false,
                                                backgroundColor:
                                                    documentStyle.getPropertyValue(
                                                        '--bluegray-700',
                                                    ),
                                                borderColor:
                                                    documentStyle.getPropertyValue(
                                                        '--bluegray-700',
                                                    ),
                                                tension: 0.4,
                                            },
                                        ],
                                    };
                                    this.chart2Data = {
                                        labels: labels2,
                                        datasets: [
                                            {
                                                label: this.getLabelname(
                                                    'Quotes',
                                                ),
                                                data: quote2Count,
                                                fill: false,
                                                backgroundColor:
                                                    documentStyle.getPropertyValue(
                                                        '--bluegray-700',
                                                    ),
                                                borderColor:
                                                    documentStyle.getPropertyValue(
                                                        '--bluegray-700',
                                                    ),
                                                tension: 0.4,
                                            },
                                            {
                                                label: this.getLabelname(
                                                    'Policies',
                                                ),
                                                data: policyCount,
                                                fill: false,
                                                backgroundColor:
                                                    documentStyle.getPropertyValue(
                                                        '--green-600',
                                                    ),
                                                borderColor:
                                                    documentStyle.getPropertyValue(
                                                        '--green-600',
                                                    ),
                                                tension: 0.4,
                                            },
                                        ],
                                    };
                                }
                            }
                        }
                    }
                }
            });
    }
    getEndorsementRecordList() {
        let startDate = null,
            endDate = null;
        const backDate = new Date();
        const d = backDate;
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        startDate = this.datePipe.transform(
            new Date(year, month - this.rangeEndtValue, day),
            'dd/MM/yyyy',
        );
        endDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
        const ReqObj = {
            InsuranceId: this.insuranceId,
            BranchCode: this.branchCode,
            ProductId: this.productId,
            LoginId: this.loginId,
            UserType: this.userType,
            SubUserType: this.subuserType,
            StartDate: startDate,
            EndDate: endDate,
        };
        const urlLink = `${this.CommonApiUrl}api/dashboard/v1/endorsement`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.endorsementList = data.Result;
                    for (const entry of this.endorsementList) {
                        if (this.lang == 'en') {
                            entry['Label'] = entry.EndorsementDesc;
                        } else if (this.lang == 'fr') {
                            entry['Label'] = entry.CodeDescLocal;
                        }
                    }
                }
            });
    }
    getLabelname(type) {
        if (type == 'Quotes') {
            if (this.lang == 'en') return 'Quotes';
            else if (this.lang == 'fr') return 'Devis';
            else if (this.lang == 'po') return 'Citações';
        } else if (type == 'Policies') {
            if (this.lang == 'en') return 'Policies';
            else if (this.lang == 'fr') return 'Police';
            else if (this.lang == 'po') return 'Políticas';
        }
    }
    getNotificationList() {
        let startDate = null,
            endDate = null;
        const backDate = new Date();
        const d = backDate;
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        startDate = this.datePipe.transform(
            new Date(year, month - this.rangeNotifyValue, day),
            'dd/MM/yyyy',
        );
        endDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
        const ReqObj = {
            InsuranceId: this.insuranceId,
            BranchCode: this.branchCode,
            ProductId: this.productId,
            LoginId: this.loginId,
            UserType: this.userType,
            SubUserType: this.subuserType,
            StartDate: startDate,
            EndDate: endDate,
        };
        const urlLink = `${this.CommonApiUrl}api/dashboard/v3/chart`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.notificationList = data.Result;
                }
            });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    showSuccessToast() {
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success Message',
        //   detail: 'Operation completed successfully'
        // });
    }
}
