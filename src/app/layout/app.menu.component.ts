import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/layout.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../app.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    private readonly ApiUrl1: string = environment.ApiUrl1;
    isMenuExpanded = true;
    model: any[] = [];
    productName: string;
    userDetails: any;
    typeValue: string;
    loginId: any;
    insuranceid: any = null;
    productId: any;
    loginType: any = null;
    userType: any;
    productname: any = null;
    customerCode: any = null;
    customerName: any = null;
    menuSection: boolean = true;
    menu: any[] = [];
    typeList: any[] = [];
    parentSection: boolean = true;
    submenuList: any[] = [];
    typeName: any;
    b2cType: any = null;
    lang: any = null;
    branchValue: any;
    branchList: any[] = [];
    branchName: any;
    RequestReferenceNo: string;
    location: any;
    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private translate: TranslateService,
        private appComp: AppComponent,
    ) {
        this.productName = sessionStorage.getItem('productName');
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        this.typeValue = sessionStorage.getItem('typeValue');
        this.loginId = this.userDetails.Result.LoginId;
        this.productId = this.userDetails.Result.ProductId;
        this.userType = this.userDetails.Result.UserType;
        this.productname = this.userDetails.Result.ProductName;
        if (this.userDetails.Result.LoginType)
            this.loginType = this.userDetails.Result.LoginType;
        if (this.userType != 'Issuer') {
            this.customerCode = this.userDetails.Result.CustomerCode;
            this.customerName = this.userDetails.Result.UserName;
        }
        const type = sessionStorage.getItem('typeValue');
        if (type) this.typeValue = type;
        this.insuranceid =
            this.userDetails.Result.LoginBranchDetails[0].InsuranceId;
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
        this.getTypeList();
    }
    getTypeList() {
      const urlLink = `${this.ApiUrl1}dropdown/subusertype`;
      const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        if (userDetails) {
          const ReqObj = {
                InsuranceId: userDetails?.Result?.InsuranceId,
                LoginId: userDetails?.Result?.LoginId,
                BranchCode: userDetails?.Result?.BranchCode,
                UserType: userDetails?.Result?.UserType,
            };
            this.layoutService
                .onPostMethodBearerSync(urlLink, ReqObj)
                .subscribe(
                    (data: any) => {
                        console.log(data);
                        if (data.Result) {
                            this.typeList = data?.Result;

                            if (
                                this.typeValue == undefined ||
                                this.typeValue == 'undefined'
                            ) {
                                this.typeValue = this.typeList[0].CodeDesc;

                                sessionStorage.setItem(
                                    'typeValue',
                                    this.typeValue,
                                );
                                //this.getMenuList();
                            }
                            const types = this.typeList.filter(
                                (ele) =>
                                    ele.CodeDesc == this.typeValue ||
                                    ele.DisplayName == this.typeValue,
                            );
                            console.log(
                                'Filtered Types',
                                types,
                                this.typeList,
                                this.typeValue,
                            );
                            if (types) {
                                this.finaliseTypeValue(types[0], 'direct');
                            }
                        }
                    },
                    (err: any) => {
                        console.log(err);
                    },
                );
        }
    }
    finaliseTypeValue(types, changeType) {
        if (types.CodeDesc != 'B2C Broker') this.typeValue = types.CodeDesc;
        this.typeName = types.DisplayName;
        console.log('Setted Type Value', this.typeValue);
        //$("#subUserTypes").hide();
        this.onTypeChange(changeType);
    }
    onTypeChange(changeType) {
        let type = sessionStorage.getItem('typeValue');
        console.log('1', type);
        if (type != undefined) {
            sessionStorage.setItem('typeValue', this.typeValue);
            type = sessionStorage.getItem('typeValue');
            console.log('2', type);
            this.getMenuList(changeType);
        } else {
            sessionStorage.setItem('typeValue', this.typeValue);
            this.getMenuList(changeType);
        }
        if (changeType == 'direct') {
            this.getBranchList();
        } else {
            this.router.navigate(['/']);
        }
    }
    getBranchList() {
        const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        const branchList: any[] = userDetails.Result.LoginBranchDetails;
        if (this.userType == 'Issuer') {
            this.branchValue = userDetails?.Result?.BranchCode;
        } else {
            this.branchValue = userDetails?.Result?.BrokerBranchCode;
        }
        this.branchList = branchList;
        if (this.userType == 'Issuer') {
            const branch = this.branchList.filter(
                (ele) => ele.BranchCode == this.branchValue,
            );
            if (branch) this.finaliseBranchValue(branch[0], 'direct');
        } else {
            const branch = this.branchList.filter(
                (ele) => ele.BrokerBranchCode == this.branchValue,
            );
            if (branch) this.finaliseBranchValue(branch[0], 'direct');
        }
    }
    finaliseBranchValue(branch, type) {
        if (this.userType == 'Issuer') {
            this.branchValue = branch.BranchCode;
            this.branchName = branch.BranchName;
            this.onBranchChange(type);
        } else {
            this.branchValue = branch.BrokerBranchCode;
            this.branchName = branch.BrokerBranchName;
            this.onBranchChange(type);
        }
    }
    onBranchChange(type) {
        if (this.branchValue != '' && this.branchValue != undefined) {
            const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
            if (this.userType == 'Issuer') {
                userDetails.Result['BranchCode'] = this.branchValue;
                const branchData: any = this.branchList.find(
                    (ele) => ele.BranchCode == this.branchValue,
                );
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                sessionStorage.setItem(
                    'Userdetails',
                    JSON.stringify(userDetails),
                );
            } else {
                userDetails.Result['BrokerBranchCode'] = this.branchValue;
                const branchData: any = this.branchList.find(
                    (ele) => ele.BrokerBranchCode == this.branchValue,
                );
                userDetails.Result['BranchCode'] = branchData?.BranchCode;
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                sessionStorage.setItem(
                    'Userdetails',
                    JSON.stringify(userDetails),
                );
            }

            if (type == null) {
                this.router.navigate(['/product']);
            }
        }
    }
    getMenuList(changeType) {
      console.log(changeType);
      
        const urlLink = `${this.CommonApiUrl}admin/getmenulist`;
        const ReqObj = {
            LoginId: this.loginId,
            UserType: this.userType,
            SubUserType: this.typeValue,
            InsuranceId: this.insuranceid,
            ProductId: this.productId,
        };
        this.layoutService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
            (data: any) => {
                console.log(data);
                if (data.Result) {
                    if (this.productId == '45') {
                        if (this.typeValue == 'low') {
                            const obj: any[] = [
                                {
                                    link: '/Home/life-risk-details',
                                    title: 'Illustrate',
                                    icon: 'fas fa-clipboard-list',
                                    id: '331',
                                    parent: '99999',
                                    orderby: 2,
                                    IsDesti: false,
                                    children: null,
                                },
                            ];
                            data.Result = obj.concat(data.Result);
                        }
                    }
                    this.layoutService.menuList = data?.Result;
                    this.layoutService.MenuMasterList =
                        data?.Result[3]?.children;
                    const userDetails = JSON.parse(
                        sessionStorage.getItem('Userdetails'),
                    );
                    if (userDetails) {
                        userDetails.Result['menuList'] = data.Result;
                        userDetails.Result['MenuMasterList'] =
                            data.Result[3].children;
                        sessionStorage.setItem(
                            'Userdetails',
                            JSON.stringify(userDetails),
                        );
                        this.setMenuSection(data.Result);
                    }
                }
            },

            (err: any) => {
                console.log(err);
            },
        );
    }

    setMenuSection(menuList) {
        this.b2cType = sessionStorage.getItem('b2cType');
        if (this.b2cType !== 'guest') {
            if (menuList.length != 0) {
                const menus = [];
                let i = 0;
                for (const menu of menuList) {
                    menu['CodeDesc'] = menu.title;
                    menu['CodeDescLocal'] = menu.titleLocal;
                    if (this.lang == 'en') menu.title = menu.CodeDesc;
                    else menu.title = menu.CodeDescLocal;
                    const entry: any = {
                        label: menu.title,
                        icon: 'pi pi-car',
                        routerLink: [menu.link],
                        CodeDesc: menu.CodeDesc,
                    };
                    if (
                        menu.children &&
                        menu.CodeDesc != 'Quote Register' &&
                        menu.CodeDesc != 'CRM' &&
                        menu.CodeDesc != 'Renewal' &&
                        menu.CodeDesc != 'Surveyor' &&
                        menu.CodeDesc != 'Credit Controller' &&
                        menu.CodeDesc != 'Login Creation' &&
                        menu.CodeDesc != 'Referral' &&
                        menu.CodeDesc != 'Portfolio' &&
                        menu.CodeDesc != 'Referal Management' &&
                        menu.CodeDesc != 'Masters' &&
                        menu.CodeDesc != 'Tira Status'  &&
                         menu.CodeDesc!= 'Workflow'
                    ) {
                        entry['items'] = [];
                        let j = 0;
                        for (const child of menu.children) {
                            if (
                                child.title == 'Tira Vehicle Search' &&
                                this.insuranceid == '100044'
                            ) {
                                child.link = '/yakeenSearch';
                            }
                            const subEntry = {
                                label: child.title,
                                faIcon: child.icon,
                                link: child.link,
                            };
                            entry.items.push(subEntry);
                            j += 1;
                            if (j == menu.children.length) {
                                menus.push(entry);
                                i += 1;
                                if (i == menuList.length) {
                                    this.model = [
                                        {
                                            label: 'UI Components',
                                            items: menus,
                                        },
                                    ];
                                    this.menuSection = true;
                                    this.parentSection = true;
                                    this.submenuList = [];
                                }
                            }
                        }
                    } else {
                        entry['icon'] = menu.icon;
                        if (menu.CodeDesc == 'Quote Register')
                            entry['routerLink'] = ['/quotation'];
                        else if (menu.CodeDesc == 'Login Creation')
                            entry['routerLink'] = ['/logincreation'];
                        else if (menu.CodeDesc == 'Customer')
                            entry['routerLink'] = ['/customer'];
                        else if (menu.CodeDesc == 'New Quote') {
                            if(this.productId=='5') entry['routerLink'] = ['/policyDetails'];
                           else entry['routerLink'] = ['/quotation/plan/quote-details'];
                        } else if (menu.CodeDesc == 'Referal Management')
                            entry['routerLink'] = ['/referralCases'];
                        else if(menu.CodeDesc=='Workflow') entry["routerLink"] =  ['/workFlow']
                        else if (menu.CodeDesc == 'Referral')
                            entry['routerLink'] = ['/referral'];
                        else if (menu.CodeDesc == 'Portfolio')
                            entry['routerLink'] = ['/portfolio'];
                        else if (menu.CodeDesc == 'Copy Quote')
                            entry['routerLink'] = [
                                '/quotation/plan/copy-quote',
                            ];
                        else if (menu.CodeDesc == 'Short Quote')
                            entry['routerLink'] = [
                                '/quotation/plan/shortQuote',
                            ];
                        else if (menu.CodeDesc == 'Report')
                            entry['routerLink'] = ['/report'];
                        else if (menu.CodeDesc == 'CRM')
                            entry['routerLink'] = ['/crmHome'];
                        else if (menu.CodeDesc == 'Renewal')
                            entry['routerLink'] = ['/renewal'];
                        else if (menu.CodeDesc == 'Search')
                            entry['routerLink'] = ['/Search'];
                        else if (menu.CodeDesc == 'Masters')
                            entry['routerLink'] = ['/Admin/bankMaster'];
                        else if (
                            menu.CodeDesc == 'Credit Controller' &&
                            this.insuranceid == '100004'
                        )
                            entry['routerLink'] = ['/Home/credit-controller'];
                        else if (
                            menu.CodeDesc == 'Surveyor' &&
                            this.insuranceid == '100004'
                        )
                            entry['routerLink'] = ['/Home/surveyor'];
                        else if (
                            menu.CodeDesc == 'Tira Vehicle Search' &&
                            this.insuranceid == '100002'
                        ) {
                            entry['routerLink'] = ['/tira-search'];
                        } else if (
                            menu.CodeDesc == 'Tira Vehicle Search' &&
                            this.insuranceid == '100044'
                        ) {
                            entry['routerLink'] = ['/yakeenSearch'];
                        } else if (menu.CodeDesc == 'Tira Status') {
                            entry['routerLink'] = ['/tirastatus'];
                        } else entry['routerLink'] = [menu.link];
                        if (
                            this.userType == 'Issuer' &&
                            this.typeValue == 'high'
                        ) {
                            if (menu.CodeDesc == 'Portfolio')
                                entry['routerLink'] = [
                                    '/Home/ApproverPortfolio',
                                ];
                        }
                        entry['link'] = menu.link;
                        if (this.lang == 'en') menu.title = menu.CodeDesc;
                        else menu.title = menu.CodeDescLocal;
                        menus.push(entry);
                        i += 1;
                        if (i == menuList.length) {
                            this.menuSection = true;
                            this.model = [
                                {
                                    label: 'UI Components',
                                    items: menus,
                                },
                            ];
                            this.menu = menus;
                            this.parentSection = true;
                            this.submenuList = [];
                        }
                    }
                }
            }
            else {
                this.menuSection = false;
                this.menu = [];
                this.parentSection = true;
                this.submenuList = [];
            }
        }
        console.log('Final Menu 2', this.model);
    }
    ngOnInit() {
        console.log('Final Menu', this.model);
    }
    setItemId(rowData) {
        console.log(rowData);
        return String(rowData.title).replaceAll(' ', '');
    }
}
