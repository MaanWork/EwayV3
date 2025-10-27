import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/_services/shared.service';
import { CustomerProduct } from '@app/_models';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-customer-products',
    templateUrl: './customer-products.component.html',
    styleUrls: ['./customer-products.component.scss'],
})
export class CustomerProductsComponent {
    products: CustomerProduct[];
    private readonly ApiUrl1: string = environment.ApiUrl1;
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    branchselection: boolean;
    branchList: any[] = [];
    branchValue: any;
    errorSection: boolean;
    errorList: any;
    insuranceid = '100002';
    encryptedValue: any;
    userType: string;
    selectedBranch: any;
    branches: any;
    serDetails: any;
    userResponse: any;
    loginId: any;
    userTypes: any;
    productList: any;
    selectedProduct: any[] = [];
    userDetails: any;
    companyList: any[] = [];
    loginType: any;
    constructor(
        private _formBuilder: FormBuilder,
        private loginService: LoginService,
        private authService: AuthService,
        private router: Router,
        private shared: SharedService,
    ) {
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        this.userResponse = this.userDetails?.Result;
        this.loginId = this.userDetails.Result.LoginId;
        this.userType = this.userDetails.Result.UserType;
        //this.userTypes = this.userDetails.Result.BranchCode;
        this.userTypes = this.userDetails.Result.BrokerBranchName;
        this.insuranceid = this.userDetails.Result.InsuranceId;
        this.productList = this.userDetails.Result.BrokerCompanyProducts;
        if (this.userDetails.Result.LoginType)
            this.loginType = this.userDetails.Result.LoginType;
        this.getCompanyList();
        //this.getDecryptData();
    }
    async getDecryptData() {
        
        const urlLink = `${this.CommonApiUrl}authentication/doauth`;
        const ReqObj = {
            e: this.encryptedValue,
        };
        (await this.shared.onPostMethodUnAuthAsync(urlLink, ReqObj)).subscribe(
            (data: any) => {
                if (data.Result) {
                    this.errorSection = false;
                    if (data.AdditionalInfo) {
                        const details = data.AdditionalInfo;
                        console.log(details, 'detailsdetails');

                        if (
                            details.QuoteNo != 'null' &&
                            details.QuoteNo != null
                        ) {
                            sessionStorage.setItem('quoteNo', details?.QuoteNo);
                        }
                        const custRefNo = details?.CustomerRefNo;
                        if (
                            custRefNo != '' &&
                            custRefNo != 'null' &&
                            custRefNo != null &&
                            custRefNo != undefined
                        ) {
                            sessionStorage.setItem(
                                'customerReferenceNo',
                                custRefNo,
                            );
                        }
                        const refNo = details?.RefNo;
                        if (
                            refNo != '' &&
                            refNo != 'null' &&
                            refNo != null &&
                            refNo != undefined
                        ) {
                            sessionStorage.setItem('quoteReferenceNo', refNo);
                        }

                        const result = data.Result;
                        const insuranceId = details?.InsuranceId;
                        if (
                            insuranceId != '' &&
                            insuranceId != 'null' &&
                            insuranceId != null &&
                            insuranceId != undefined
                        ) {
                            result['InsuranceId'] = insuranceId;
                        }
                        const productId = details?.ProductId;
                        if (
                            productId != '' &&
                            productId != 'null' &&
                            productId != null &&
                            productId != undefined
                        ) {
                            result['ProductId'] = productId;
                        }
                        const branchCode = details?.BranchCode;
                        if (
                            branchCode != '' &&
                            branchCode != 'null' &&
                            branchCode != null &&
                            branchCode != undefined
                        ) {
                            result['BranchCode'] = branchCode;
                        }
                        const Token = data?.Result?.Token;
                        this.authService.login(data);
                        this.authService.UserToken(Token);
                        sessionStorage.setItem('UserToken', Token);
                        if (data?.Result?.LoginBranchDetails) {
                            if (data?.Result?.LoginBranchDetails.length != 0) {
                                if (
                                    data.Result?.BranchCode == null ||
                                    data.Result?.BranchCode == undefined ||
                                    data.Result?.BranchCode == ''
                                )
                                    data.Result['BranchCode'] =
                                        data?.Result?.LoginBranchDetails[0].BranchCode;
                                if (
                                    data.Result?.BrokerBranchCode == null ||
                                    data.Result?.BrokerBranchCode ==
                                        undefined ||
                                    data.Result?.BrokerBranchCode == ''
                                )
                                    data.Result['BrokerBranchCode'] =
                                        data?.Result?.LoginBranchDetails[0].BrokerBranchCode;
                                data.Result['CurrencyId'] =
                                    data?.Result?.LoginBranchDetails[0].CurrencyId;
                            }
                        }
                        console.log('Final Setted Data', data);
                        sessionStorage.setItem(
                            'Userdetails',
                            JSON.stringify(data),
                        );
                        const branchList: any[] =
                            data?.Result?.LoginBranchDetails;
                        if (branchList.length != 0 && branchList.length > 1) {
                            console.log('Entered Branch', branchList);
                            // this.router.navigate(['/branch']);
                            this.branchselection = true;
                            this.branchList = branchList;
                        } else if (branchList.length != 0) {
                            this.branchList = branchList;
                            this.branchValue = branchList[0].BrokerBranchCode;
                            const branchData: any = this.branchList.find(
                                (ele) =>
                                    ele.BrokerBranchCode == this.branchValue,
                            );
                            const userDetails = JSON.parse(
                                sessionStorage.getItem('Userdetails') as any,
                            );
                            this.userDetails = userDetails;
                            userDetails.Result['BrokerBranchCode'] =
                                this.branchValue;
                            userDetails.Result['BranchCode'] =
                                branchData.BranchCode;
                            userDetails.Result['CurrencyId'] =
                                branchData?.CurrencyId;
                            userDetails.Result['InsuranceId'] =
                                branchData?.InsuranceId;
                            userDetails.Result['LoginType'] = 'B2CFlow';
                            sessionStorage.setItem('b2cType', 'guest');
                            sessionStorage.setItem(
                                'Userdetails',
                                JSON.stringify(userDetails),
                            );
                            sessionStorage.removeItem('customerReferenceNo');
                            this.productList =
                                this.userDetails.Result.BrokerCompanyProducts;
                        }
                        if (details?.PageType) {
                            if (details.PageType == 'RP') {
                                sessionStorage.setItem(
                                    'QuoteStatus',
                                    'AdminRP',
                                );
                            }
                        }
                    }
                } else if (data.ErrorMessage) {
                    if (data.ErrorMessage.length != 0) {
                        this.errorSection = true;
                        this.errorList = data.ErrorMessage;
                    }
                }
            },
        );
    }
    getCompanyList() {
        const ReqObj = {
            BrokerCompanyYn: 'N',
            LoginId: '',
            Limit: '0',
            Offset: '',
        };
        const urlLink = `${this.ApiUrl1}master/getallinscompanydetails`;
        this.shared.onPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
            console.log(data);
            if (data.Result) {
                this.companyList = data.Result.filter(
                    (ele) => ele.Status != 'N' && (ele.InsuranceId=='100046' || ele.InsuranceId=='100047' || ele.InsuranceId=='100048' || ele.InsuranceId=='100049' || ele.InsuranceId=='100050'),
                );
                    this.insuranceid='100046';this.onChangeCompany();
                
            }
        });
    }
    selectProduct(product) {
        this.selectedProduct = product.ProductId;
        const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));

        userDetails.Result['ProductId'] = product.ProductId;
        userDetails.Result['ProductName'] = product.ProductName;
        userDetails.Result['ProductId'] = product.ProductId;
        this.shared.ProductName = product.ProductName;
        sessionStorage.setItem('reloadType', 'YES');

        userDetails.Result['PackageYn'] = product.PackageYn;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        console.log('Products', product, userDetails.Result);
        this.router.navigate(['/policyDetails']);
        //this.router.navigate(['/quotation/plan/shortQuote']);
    }
    getProductUrl(product) {
        if (product.ProductId == '5') return './assets/layout/images/motor.png';
        else if (product.ProductId == '59')
            return './assets/layout/images/domestic.png';
        else if (product.ProductId == '57')
            return './assets/layout/images/group_pa.svg';
        else if (product.ProductId == '56')
            return './assets/layout/images/health.png';
        else if (product.ProductId == '6')
            return './assets/layout/images/fireAllied.png';
        else if (product.ProductId == '4')
            return './assets/layout/images/travel1.png';
        else if (product.ProductId == '1')
            return './assets/layout/images/Burglary1.png';
        else if (product.ProductId == '14')
            return './assets/layout/images/employers.png';
        else if (product.ProductId == '13')
            return './assets/layout/images/personalacc.png';
        else if (product.ProductId == '15')
            return './assets/layout/images/workmens.png';
        else if (product.ProductId == '2')
            return './assets/layout/images/All-risk.png';
        else if (product.ProductId == '19')
            return './assets/layout/images/corporate.webp';
        else if (product.ProductId == '32')
            return './assets/layout/images/fireAllied.png';
        else if (product.ProductId == '39')
            return './assets/layout/images/machinery.jpg';
        else if (product.ProductId == '42')
            return './assets/layout/images/Cyber.png';
        else if (product.ProductId == '43')
            return './assets/layout/images/Medical_Mal.png';
        else if (product.ProductId == '16')
            return './assets/layout/images/money.webp';
        else if (product.ProductId == '26')
            return './assets/layout/images/plantrisk.avif';
        else if (product.ProductId == '21')
            return './assets/layout/images/risk2.png';
        else if (product.ProductId == '25')
            return './assets/layout/images/electronicequipment.jpg';
        else if (product.ProductId == '27')
            return './assets/layout/images/publicliablity.png';
        else if (product.ProductId == '45')
            return './assets/layout/images/LifeIns.webp';
        else if (product.ProductId == '46')
            return './assets/layout/images/shortTerm.png';
        else if (product.productId == '59')
            return './assets/layout/images/marineOneOff.webp';
        else if (product.ProductId == '11')
            return './assets/layout/images/marineOpenCover.png';
        else if (product.ProductId == '60')
            return './assets/layout/images/ProIndeminity.png';
        else return './assets/layout/images/motor.png';
    }
    selectBranch(branch) {
        if (this.userType == 'Issuer') this.selectedBranch = branch.BranchCode;
        if (this.userType != 'Issuer')
            this.selectedBranch = branch.BrokerBranchCode;
        if (this.selectedBranch != '' && this.selectedBranch != undefined) {
            const userDetails = JSON.parse(
                sessionStorage.getItem('Userdetails') as any,
            );
            if (this.userType == 'Issuer') {
                const branchData: any = this.branches.find(
                    (ele) => ele.BranchCode == this.selectedBranch,
                );
                userDetails.Result['BrokerBranchCode'] = null;
                userDetails.Result['BranchCode'] = branchData.BranchCode;
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                sessionStorage.setItem(
                    'Userdetails',
                    JSON.stringify(userDetails),
                );
            } else {
                const branchData: any = this.branches.find(
                    (ele) => ele.BrokerBranchCode == this.selectedBranch,
                );
                console.log('Branch Value', this.selectedBranch, branchData);
                userDetails.Result['BrokerBranchCode'] =
                    branchData.BrokerBranchCode;
                userDetails.Result['BranchCode'] = branchData.BranchCode;
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                sessionStorage.setItem(
                    'Userdetails',
                    JSON.stringify(userDetails),
                );
            }
        }
    }
    checkBranchBg(branch) {
        if (this.userType == 'Issuer') {
            if (branch.BranchCode == this.selectedBranch) return '#042181';
            else return '';
        } else {
            console.log('Entered Branch', branch, this.selectedBranch);
            if (branch.BrokerBranchCode == this.selectedBranch) {
                return '#042181';
            } else return '';
        }
    }
    onChangeCompany() {
        let loginId = null,
            branchCode = null,insuranceId=this.insuranceid;
        if (this.insuranceid == '100002') {
            (loginId = 'guest'), (branchCode = '02');
        } else if (this.insuranceid == '100020') {
            (loginId = 'guest_kenya'), (branchCode = '60');
        } else if (this.insuranceid == '100028') {
            (loginId = 'guest_er'), (branchCode = '70');
        }
        else if (this.insuranceid == '100046') {
            (loginId = 'guest_zmb1'), (branchCode = '138');
        }
        else if (this.insuranceid == '100049') {
            (loginId = 'guest_Swzl'), (branchCode = '119');
        }
        else if (this.insuranceid == '100048') {
            (loginId = 'guest_Mocambique'), (branchCode = '124');
        }
        else if (this.insuranceid == '100050') {
            (loginId = 'guest_Namibia'), (branchCode = '120');
        }
        else if (this.insuranceid == '100047') {
            (loginId = 'guest_Botswana'), (branchCode = '121');
        }
        if (loginId != null) {
            const ReqObj = {
                LoginId: loginId,
                InsuranceId: this.insuranceid,
                BranchCode: branchCode,
                ProductId: '5',
                TinyUrlId: 'ABC123',
                TinyGroupId: 'ABCD1234',
            };
            const urlLink = `${this.CommonApiUrl}authentication/getEncryptionkey`;
            this.shared
                .onPostMethodSync(urlLink, ReqObj)
                .subscribe((data: any) => {
                    console.log(data);
                    if (data.Result) {
                        this.encryptedValue = data.Result;
                        this.insuranceid = insuranceId
                        this.getDecryptData();
                    }
                });
        } else {
            this.productList = [];
        }
    }
    onLoginRedirect(){
        this.router.navigate(['/auth/login'])
    }
}
