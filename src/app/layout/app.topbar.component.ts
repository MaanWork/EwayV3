import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/layout.service';
import { Router } from '@angular/router';
import { LoginService } from '../demo/components/auth/login/login.service';
import { AuthService } from '../demo/components/auth/Auth/auth.service';
import { SharedService } from '../_services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

interface BookmarkCard {
    id: string;
    title: string;
    subtitle?: string;
    icon: string;
    route: string;
    bgColor: string;
    isAddNew?: boolean;
}

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    @Output() selectedBranch = new EventEmitter<any>();
    @ViewChild('bookmarkInput') bookmarkInput!: ElementRef;
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
     private readonly CRMApiUrl: string = environment.CRMApiUrl;
    branches!: MenuItem[];
    userOptions!: any[];
    selectedOption!: '';
    productName: any = null;
    userDetails: any = null;
    loginId: any = null;
    productId: any = null;
    userType: any = null;
    productname: any = null;
    branchName: any = null;
    @Input() typeList: any[] = [];
    @Input() typeValue: any = null;
    @Output() typeValueChange = new EventEmitter();
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    branchValue: any = null;
    branchList: any[] = [];
    typeName: any = null;
    loginType: any = null;
    customerCode: any = null;
    customerName: any = null;
    insuranceid: any;
    b2cType: any = null;
    langList: any[] = [];
    lang: string;
     productType: string;
    header = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => this.onHomeRedirect()
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => this.onDashboardRedirect()
        },
    ];
    newBookmarkTitle = '';
    bookmarks: BookmarkCard[] = [];
    iconPool = ['setup-icon', 'claim-icon', 'customer-icon', 'BI-setup-icon', 'crm-admin-icon'];
    validInsuranceIds = ["100046", "100047", "100048", "100049", "100050"];
    showBtn: boolean = false;
    showCRMbtn: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private loginService: LoginService,
        private appComp: AppComponent,
        private authService: AuthService,
        private cookieService: CookieService,
        private SharedService: SharedService,
    ) {
        this.productName = sessionStorage.getItem('productName');
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        console.log(this.userDetails);

        this.branches = this.userDetails?.Result?.LoginBranchDetails;
        this.loginId = this.userDetails?.Result?.LoginId;
        this.userType = this.userDetails?.Result?.UserType;
        this.b2cType = sessionStorage.getItem('b2cType');
        const language = sessionStorage.getItem('language');
        this.lang = language ?? 'en';
        this.appComp.setLanguage(language ?? 'en');

        if (this.userDetails?.Result?.LoginBranchDetails?.length > 0)
            this.insuranceid =
                this.userDetails?.Result?.LoginBranchDetails[0]?.InsuranceId;

        if (sessionStorage.getItem('Userdetails')) {
            this.productName = sessionStorage.getItem('productName');
            this.userDetails = JSON.parse(
                sessionStorage.getItem('Userdetails'),
            );
            this.typeValue = sessionStorage.getItem('typeValue');
            this.loginId = this.userDetails.Result.LoginId;
            this.productId = this.userDetails.Result.ProductId;
            this.userType = this.userDetails.Result.UserType;
            if (this.SharedService.ProductName) {
                this.productname = this.SharedService.ProductName;
            } else {
                if (this.lang == 'en') {
                    const entry = this.typeList.find((ele) => (ele.CodeDesc = this.typeValue));
                    if (entry == 'low') {
                        this.typeList['label'] = 'Quotation';
                    }
                    this.productname = this.userDetails.Result.ProductName;
                } 
                else if (this.lang == 'po') {
                    const entry = this.typeList.find((ele) => (ele.CodeDesc = this.typeValue));
                    if (entry == 'low') {
                        this.typeList['label'] = 'Quotation';
                    }
                    this.productname = this.userDetails.Result.ProductName;
                } 
                else {
                    this.productname =
                        this.userDetails.Result.BrokerCompanyProducts[0].ProductNameLocal;
                }


            }
            if (this.userDetails?.Result?.LoginType)
                this.loginType = this.userDetails?.Result?.LoginType;
            if (this.userType != 'Issuer') {
                this.customerCode = this.userDetails?.Result?.CustomerCode;
                this.customerName = this.userDetails?.Result?.UserName;
            }
        } else this.router.navigate(['/auth/login']);

          if((((this.userDetails?.Result?.SubUserType == 'low' || this.userDetails?.Result?.SubUserType == 'both') && this.userType == 'Issuer') || (this.userDetails?.Result?.SubUserType == 'Sales' && this.userType == 'Broker')) && (this.productId != '5')){
            this.showCRMbtn = true;
        } 
        const insuranceIds = Array.isArray(this.insuranceid)
            ? this.insuranceid
            : [this.insuranceid];

        const CompanyCheck = insuranceIds.some(entry =>
            typeof entry == 'string'
                ? this.validInsuranceIds.includes(entry)
                : this.validInsuranceIds.includes(entry?.InsuranceId)
        );
        if (CompanyCheck && this.userType == 'Issuer') {
            this.showBtn = true;
            this.loginService.productId$.subscribe(id => {
                this.productType = sessionStorage.getItem('ProductId');
            });
            if (this.productType == '0') {
                this.productName = "All Product";
            }
        }
        console.log(this.showBtn);
    }

    ngOnInit() {

         const savedBookMarks: any = sessionStorage.getItem('bookmarks') || [];
        if (savedBookMarks.length > 0) {
            this.bookmarks = JSON.parse(savedBookMarks);
        }

        this.getBranchList();
        if (this.insuranceid == '100027' || this.insuranceid == '100048') {
            this.langList = [
                {
                    Code: 'en',
                    CodeDesc: 'English',
                    CodeDescPor: 'Inglês',
                    CodeDescFr: 'Anglais',
                },
                {
                    Code: 'po',
                    CodeDesc: 'Portuguese',
                    CodeDescPor: 'Português',
                    CodeDescFr: 'Portugais',
                },
            ];
        } else {
            this.langList = [
                {
                    Code: 'en',
                    CodeDesc: 'English',
                    CodeDescPor: 'Inglês',
                    CodeDescFr: 'Anglais',
                },
                {
                    Code: 'fr',
                    CodeDesc: 'French',
                    CodeDescPor: 'Francês',
                    CodeDescFr: 'Français',
                },
            ];
        }
        if (this.lang == 'en') {
            this.userOptions = [
                {
                    label: 'Logout',
                    value: 'logout',
                    icon: 'pi pi-power-off',
                    command: () => {
                        this.setLogout();
                    },
                },
            ];
        } else if (this.lang == 'fr') {
            this.userOptions = [
                {
                    label: 'Se déconnecter',
                    value: 'logout',
                    icon: 'pi pi-power-off',
                    command: () => {
                        this.setLogout();
                    },
                },
            ];
        }
        else if (this.lang == 'po') {
            this.userOptions = [
                {
                    label: 'Terminar sessão',
                    value: 'logout',
                    icon: 'pi pi-power-off',
                    command: () => {
                        this.setLogout();
                    },
                },
            ];
        }
    }

    onProductRedirect() {
        if (this.typeValue == 'B2C Broker')
            this.router.navigate(['/customerProducts']);
        else this.router.navigate(['/auth/login/product']);
    }
    getLangCodeDesc(entry) {
        if (this.lang == 'en') return entry.CodeDesc;
        else if (this.lang == 'po') return entry.CodeDescPor;
        else if (this.lang == 'fr') return entry.CodeDescFr;
    }

    getBranchList() {
        const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        const branchList: any[] = userDetails?.Result?.LoginBranchDetails;
        this.branchValue = this.userType === 'Issuer' ? userDetails?.Result?.BranchCode : userDetails?.Result?.BrokerBranchCode;

        if (branchList.length > 0) {
            this.branchList = branchList.map(branch => ({
                ...branch,
                label: this.lang === 'en' ? branch.BranchName : branch.BrokerBranchNameLocal
            }));
            const branch = this.branchList.filter(
                (ele) => this.userType == 'Issuer' ? ele.BranchCode === this.branchValue : ele.BrokerBranchCode === this.branchValue,
            );

            
            
            if (branch.length > 0) {
                console.log("sss branch : ", branch);
                this.onSelectBranch(branch[0]);
            } else {
                this.onSelectBranch(branchList[0]);
            }
        } else {
            this.onSelectBranch(branchList[0]);
        }
    }

    // onSelectBranch(branch) {
    //     const isIssuer = this.userType === 'Issuer';
    //     const selectedBranch = isIssuer ? branch.BranchCode : branch.BrokerBranchCode;

    //     if (selectedBranch) {
    //         const userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
    //         const branchData: any = this.branches.find((ele) =>
    //             isIssuer ? ele.BranchCode === selectedBranch : ele.BrokerBranchCode === selectedBranch
    //         );

    //         userDetails.Result = {
    //             ...userDetails.Result,
    //             BrokerBranchCode: isIssuer ? null : branchData?.BrokerBranchCode,
    //             BranchCode: branchData?.BranchCode,
    //             CurrencyId: branchData?.CurrencyId,
    //             InsuranceId: branchData?.InsuranceId,
    //         };

    //         sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
    //         console.log(userDetails);
    //     }
    // }

    onSelectBranch(branch, type = 'direct') {
        console.log("branch : ", branch);
        
        if (type == 'change') {
            branch = this.branchList.find((ele) => ele.BranchName === this.branchName);
        }
        const isIssuer = this.userType === 'Issuer';
        this.branchValue = isIssuer ? branch?.BranchCode : branch?.BrokerBranchCode;
        this.branchName = branch?.BranchName;
        if (this.branchValue) {
            const userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
            const branchData: any = this.branches.find((ele:any) =>
                isIssuer ? ele.BranchCode === this.branchValue : ele.BrokerBranchCode === this.branchValue
            );
            userDetails.Result = {
                ...userDetails.Result,
                BrokerBranchCode: isIssuer ? null : branchData?.BrokerBranchCode,
                BranchCode: branchData?.BranchCode,
                CurrencyId: branchData?.CurrencyId,
                InsuranceId: branchData?.InsuranceId,
            };
            console.log(userDetails);
            this.selectedBranch.emit(userDetails)
        }
        if (type == 'change') {
            this.router.navigate(['/auth/login/product']);
        }
        sessionStorage.setItem('selectedBranchCode', this.branchValue);
    }

    finaliseTypeValue(types, changeType) {
        if (types == null)
            types = this.typeList.find(
                (ele) => (ele.CodeDesc = this.typeValue),
            );
        else if (types.CodeDesc != 'B2C Broker')
            this.typeValue = types.CodeDesc;
        this.typeName = types.DisplayName;
        this.onTypeChange(changeType);
    }

    onTypeChange(changeType) {
        let type = sessionStorage.getItem('typeValue');
        if (type != undefined) {
            sessionStorage.setItem('typeValue', this.typeValue);
            type = sessionStorage.getItem('typeValue');
            this.typeValueChange.emit('change');
        } else {
            sessionStorage.setItem('typeValue', this.typeValue);
            this.typeValueChange.emit('change');
        }
        if (changeType == 'direct') {
            this.getBranchList();
        } else {
            if (this.typeValue == 'high') {
                const url = String(window.location.href).split('#');
                if (url[1] != '/') {
                    sessionStorage.setItem('reloadOnce', 'true');
                    this.router.navigate(['/']);
                } else window.location.reload();
            } else this.router.navigate(['/auth/login/product']);
        }
    }
    onRedirect() {
        if (this.loginId != 'guest') {
            if (this.typeValue == 'SuperAdmin') {
                this.router.navigate(['/']);
            } else {
                this.router.navigate(['/']);
            }
        } else {
            sessionStorage.clear();
            this.cookieService.delete(
                'XSRF-TOKEN',
                '/',
                'domain name',
                true,
                'None',
            );
            //window.location.href='https://apps.alliance.co.tz/';
        }
    }
    setLanguage(value) {
        this.lang = value;
        sessionStorage.setItem('language', value);
        this.appComp.setLanguage(value);
        window.location.reload();
    }

    showUserDetails() {
        if (this.router.url == '/auth/login/product') return false;
        else return true;
    }

    setLogout() {
        const Req = {
            LoginId: this.loginId,
            Token: this.loginService.getToken(),
        };
        const urlLink = `${this.CommonApiUrl}authentication/logout`;
        this.SharedService.onPostMethodSync(urlLink, Req).subscribe(
            (data: any) => {
                console.log(data);
                this.cookieService.delete(
                    'XSRF-TOKEN',
                    '/',
                    'domain name',
                    true,
                    'None',
                );
                sessionStorage.clear();
                this.authService.logout();
                this.router.navigate(['/auth/login']);
            },
            (err: any) => {
                console.log(err);
                sessionStorage.clear();
                this.cookieService.delete(
                    'XSRF-TOKEN',
                    '/',
                    'domain name',
                    true,
                    'None',
                );
                this.authService.logout();
                this.router.navigate(['/login']);
            },
        );
    }
     CRM(){
        sessionStorage.removeItem('reloadDone');
        sessionStorage.removeItem('quoteReferenceNo');
        sessionStorage.removeItem('quoteNo');
        const token = sessionStorage.getItem('UserToken');
           if (token && localStorage.getItem('TokenExpired') != 'Expired') {
            const apiUrl = "http://192.168.1.247:3000/";
            let userData = JSON.parse(sessionStorage.getItem('Userdetails'));
            const brokerBranchCode = userData?.Result?.BrokerBranchCode == "None" ?  null : userData?.Result?.BrokerBranchCode;
            const branchCode = userData?.Result?.BranchCode;
            const url = `${this.CRMApiUrl}navigationPage?token=${token}&path=${this.router.url}&productId=${this.productId}&branchCode=${branchCode}&brokerBranchCode=${brokerBranchCode}`;
            window.open(url, '_self');
        }
    }
     onHomeRedirect() {
        if (this.router.url == 'home') {
            return false;
        }
        else {
            // const userDetails = JSON.parse(
            //     sessionStorage.getItem('Userdetails') as any,
            // );
            // userDetails.Result['ProductId'] = '0';
            // userDetails.Result['ProductName'] = 'All Product';
            // sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
            // localStorage.setItem('ProductId', '0');
             if(this.showBtn && this.userType == 'Issuer'){  
                 this.loginService.setProductId('0');}
            // this.productName = "All Product";
            // this.productname = "All Product";
            this.router.navigate(['home']);
        }
    }

    onDashboardRedirect() {
        if (this.router.url == 'dashbaord') {
            return false;
        }
        else {
            const userDetails = JSON.parse(
                sessionStorage.getItem('Userdetails') as any,
            );
            userDetails.Result['ProductId'] = '0';
            userDetails.Result['ProductName'] = 'All Product';
            sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
            localStorage.setItem('ProductId', '0');
            this.loginService.setProductId('0');
            this.productName = "All Product";
            this.productname = "All Product";
            this.router.navigate(['dashboard']);
        }
    }

    addBookmark() {
        if (!this.newBookmarkTitle.trim()) return;
        const newBookmark: BookmarkCard = {
            id: Date.now().toString(),
            title: this.newBookmarkTitle.trim(),
            icon: this.getRandomIcon(),
            route: this.router.url,
            bgColor: '#062aa2',
        };        
        this.bookmarks.push(newBookmark);
        this.newBookmarkTitle = '';
        sessionStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        this.SharedService.refreshUpdateBookmarkList();
    }
    getRandomIcon(): string {
        const index = Math.floor(Math.random() * this.iconPool.length);
        // if(this.bookmarks.length>0){
        if(this.iconPool[index] != this.bookmarks[this.bookmarks.length-1]?.icon) return this.iconPool[index];
        else return this.getRandomIcon();
        // }
    }

    onMenuOpened() {
        setTimeout(() => {
            this.bookmarkInput.nativeElement.focus();
        });
    }
    Salvage() {
        const token = sessionStorage.getItem('UserToken');
        if (token && localStorage.getItem('TokenExpired') != 'Expired') {
            const userData = JSON.parse(sessionStorage.getItem('Userdetails'));
            const secretKey = 'secret-key-salvage-123';
            const encryptedData = sessionStorage.getItem('LoginUserDetails');
            if (encryptedData) {
                try {
                    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
                    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
                    userData.LoginUserData = JSON.parse(decryptedString);
                } catch (e) {
                    userData.LoginUserData = null;
                }
            }

            userData.URL = window.location.href;
            console.log(userData.URL);
            sessionStorage.setItem('Userdetails', JSON.stringify(userData));
            // const url = `${apiUrl}?branchCode=${branchCode}&CountryId=${countryId}&InsuranceId=${insuranceId}&emailId=${LoginUserData.emailId}&pwd=${LoginUserData.password}`;
            // window.open(url, '_self');
            let encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(userData), 'secret key 456').toString());
            window.open(`http://192.168.1.172:4202/#/bidder-dashboard?e=${encryptInfo}`, '_self');
        }
    }
}
