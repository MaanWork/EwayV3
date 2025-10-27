import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { SharedService } from 'src/app/_services/shared.service';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
})
export class OTPComponent {
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    branchselection: boolean = false;
    isReadMore: boolean = true;
    isReadMoretravel: boolean = true;
    isReadMorecorporate: boolean = true;
    isReadMoremarine: boolean = true;
    brokerLogin = true;
    value: string = 'Change Password';
    value_cancel: string = 'Cancel';
    issuerLogin = false;
    brokerName = null;
    brokerPassword = null;
    loginfirst: any = false;
    issuerName = null;
    pass: any;
    issuerPassword = null;
    branchList: any[] = [];
    invalidBroker = false;
    invalidIssuer = false;
    branchValue: any;
    issuerLogins = false;
    loginSection: boolean = false;
    brokerLogins = false;
    public submitted = false;
    public Proceed = false;
    public issuerBranch;
    public issuerRegion;
    public branches;
    public errorsList = [];
    public loginForm!: FormGroup;
    changeForm: FormGroup;
    ForgetForm: FormGroup;
    regionList: any;
    userType: any;
    forget: boolean = false;
    temps: boolean = false;
    pa: any;
    changePasswordSection: boolean;
    passExpiredError: boolean;
    mobileCodeList: { Code: string; CodeDesc: string }[];
    insuranceId: any;
    OtpBtnTime: any = null;
    OtpBtnEnable: boolean;
    otpSection: boolean;
    otpGenerated: null;
    otpId: any;
    otpValue: any = null;
    agencyCode: any;
    mobileCodeDesc: any = null;
    ipAddress: any = null;
    customerDetails: any;
    requestReferenceNo: string;
    productId: any;
    CustomerReferenceNo: any;
    oaCode: void;
    userDetails: any;
    quoteNo: any;
    isMannualReferal: any;
    remarks: any;
    referenceNo: string;
    loginId: any;
    constructor(
        private _formBuilder: FormBuilder,
        private loginService: LoginService,
        private SharedService: SharedService,
        private authService: AuthService,
        private router: Router,
    ) {
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        this.CustomerReferenceNo = sessionStorage.getItem(
            'customerReferenceNo',
        );
        this.oaCode = this.userDetails.Result.OaCode;
        this.loginId = this.userDetails.Result.LoginId;
        this.insuranceId = this.userDetails.Result.InsuranceId;
        const entry = sessionStorage.getItem('reloadOnce');
        if (entry) {
            sessionStorage.removeItem('reloadOnce');
            this.router.navigate(['/quotation/plan/main/document-info']);
        }
        //this.getRegionList();
        // this.onLogin();
        this.getCustomerDetails(this.CustomerReferenceNo);
    }

    onLogin() {
        this.submitted = true;
        const reqObj = {
            CompanyId: this.insuranceId,
            ProductId: '5',
            LoginId: 'guest',
            TemplateName: null,
            OtpUser: {
                UserMailId: this.customerDetails.Email1,
                UserMobileNo: this.customerDetails.MobileNo1,
                UserMobileCode: this.customerDetails.MobileCode1,
                UserWhatsappNo: this.customerDetails.WhatsappNo,
                UserWhatsappCode: this.customerDetails.WhatsappCode,
                CustomerName: this.customerDetails.ClientName,
            },
        };
        const url = `${this.CommonApiUrl}otp/generate`;
        try {
            this.SharedService.onPostMethodSync(url, reqObj).subscribe(
                (data: any) => {
                    console.log('Otp Generate Res', data);
                    if (data.Errors) {
                        this.otpSection = false;
                        this.otpGenerated = null;
                        let element = '';
                        for (let i = 0; i < data.Errors.length; i++) {
                            element +=
                                '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' +
                                data.Errors[i].Message +
                                '</div>';
                        }
                        Swal.fire(
                            'Please Fill Valid Value',
                            `${element}`,
                            'error',
                        );
                    } else {
                        this.otpId = data.OtpToken;
                        this.otpGenerated = data.OTP;
                        this.loginfirst = true;
                        this.otpSection = true;
                        this.OtpBtnEnable = true;
                        this.setTimeInterval();
                    }
                },
                (err) => {
                    console.log(err);
                },
            );
        } catch (error) {
            console.log(error);
        }
    }
    setTimeInterval() {
        let count = 15;
        const timer = setInterval(() => {
            const seconds = count-- - 1;
            this.OtpBtnTime = count;
            if (seconds == 0) {
                clearInterval(timer);
                this.OtpBtnEnable = false;
                this.OtpBtnTime = '';
            }
        }, 1000);
    }
    onOtpValidate() {
        if (
            this.otpValue == '' ||
            this.otpValue == undefined ||
            this.otpValue == null
        ) {
            const element =
                '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>Please Enter OTP</div>';
            Swal.fire('Please Fill Valid Value', `${element}`, 'error');
        } else {
            this.otpValue = this.otpValue.replace(/\D/g, '');
            const reqObj = {
                CompanyId: this.insuranceId,
                ProductId: '5',
                AgencyCode: this.oaCode,
                OtpToken: this.otpId,
                UserOTP: this.otpValue,
                CreateUser: true,
                CustomerId: this.CustomerReferenceNo,
                ReferenceNo: sessionStorage.getItem('quoteReferenceNo'),
            };
            const url = `${this.CommonApiUrl}otp/validate`;
            try {
                this.SharedService.onPostMethodSync(url, reqObj).subscribe(
                    (data: any) => {
                        console.log('Otp Generate', data);
                        if (data) {
                            if (data.Errors) {
                                let element = '';
                                for (let i = 0; i < data.Errors.length; i++) {
                                    element +=
                                        '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' +
                                        data.Errors[i].Message +
                                        '</div>';
                                }
                                Swal.fire(
                                    'Please Fill Valid Value',
                                    `${element}`,
                                    'error',
                                );
                            } else {
                                this.otpId = '';
                                this.otpValue = '';
                                this.onGuestLogin(data);
                            }
                        }
                    },
                );
            } catch (error) {
                console.log(error);
            }
        }
    }

    onGuestLogin(data) {
        this.otpId = '';
        this.otpValue = '';
        const loginId =
            this.customerDetails.MobileCode1 + this.customerDetails.MobileNo1;
        this.loginId = loginId;
        const Token = data?.LoginResponse?.Result?.Token;
        this.authService.login(data.LoginResponse);
        this.authService.UserToken(Token);
        data.LoginResponse.Result['LoginType'] = 'B2CFlow';
        sessionStorage.setItem(
            'Userdetails',
            JSON.stringify(data.LoginResponse),
        );
        sessionStorage.setItem('UserToken', Token);
        sessionStorage.setItem('menuSection', 'navMenu');
        sessionStorage.removeItem('b2cType');
        const userDetails = JSON.parse(
            sessionStorage.getItem('Userdetails') as any,
        );
        userDetails.Result['ProductId'] = '5';
        userDetails.Result['ProductName'] = 'Motor';
        userDetails.Result['BrokerBranchCode'] =
            data.LoginResponse?.Result?.LoginBranchDetails[0].BrokerBranchCode;
        userDetails.Result['BranchCode'] = this.branchValue;
        userDetails.Result['CurrencyId'] = this.userDetails.Result.CurrencyId;
        userDetails.Result['InsuranceId'] = this.insuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        sessionStorage.setItem('resetLoginDetails', 'true');
        this.onProceedBuyPolicy();
    }

    onBranchProceed() {
        this.Proceed = true;
        if (this.branchValue != '' && this.branchValue != undefined) {
            const userDetails = JSON.parse(
                sessionStorage.getItem('Userdetails') as any,
            );
            if (this.userType == 'Issuer') {
                const branchData: any = this.branchList.find(
                    (ele) => ele.BranchCode == this.branchValue,
                );
                userDetails.Result['BrokerBranchCode'] = null;
                userDetails.Result['BranchCode'] = branchData.BranchCode;
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                userDetails.Result['LoginType'] = 'B2CFlow2';
                sessionStorage.setItem(
                    'Userdetails',
                    JSON.stringify(userDetails),
                );
                this.router.navigate(['/products']);
            } else {
                const branchData: any = this.branchList.find(
                    (ele) => ele.BrokerBranchCode == this.branchValue,
                );
                console.log('Branch Value', this.branchValue, branchData);
                userDetails.Result['BrokerBranchCode'] =
                    branchData.BrokerBranchCode;
                userDetails.Result['BranchCode'] = branchData.BranchCode;
                userDetails.Result['ProductId'] = '5';
                userDetails.Result['ProductId'] = 'Motor';
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                userDetails.Result['LoginType'] = 'B2CFlow2';
                sessionStorage.setItem(
                    'Userdetails',
                    JSON.stringify(userDetails),
                );
                sessionStorage.setItem('reloadOnce', 'Y');
                this.router.navigate(['/quotation/plan/motor-details']);
            }
        }
    }

    onProceedBuyPolicy() {
        const ReqObj = JSON.parse(sessionStorage.getItem('buyPolicy'));
        const urlLink = `${this.CommonApiUrl}quote/buypolicy`;
        this.SharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
                if (data.Result) {
                    if (data?.Result.QuoteNo) {
                        this.quoteNo = data.Result?.QuoteNo;
                        sessionStorage.setItem('quoteNo', data.Result?.QuoteNo);
                        sessionStorage.setItem(
                            'quoteReferenceNo',
                            data.Result?.RequestReferenceNo,
                        );
                        sessionStorage.setItem('reloadOnce', 'Y');
                        sessionStorage.setItem('Editcars', 'SavedFroms');
                        window.location.reload();
                    }
                }
            },
            (err) => {
                console.log(err);
                this.SharedService.fnToastMoveHover(
                    'Quote Moved to Referral Pending',
                );
            },
        );
    }

    cancelOtp() {
        this.loginfirst = false;
        this.router.navigate(['/quotation/plan/premium-details']);
    }
    getCustomerDetails(refNo) {
        const ReqObj = {
            CustomerReferenceNo: refNo,
        };
        const urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
        this.SharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
                console.log(data);
                if (data.Result) {
                    const customerDetails: any = data.Result;
                    this.customerDetails = customerDetails;
                    this.referenceNo =
                        sessionStorage.getItem('quoteReferenceNo');
                    if (this.referenceNo) {
                        this.requestReferenceNo = this.referenceNo;
                        this.onLogin();
                    }
                }
            },
        );
    }
    onPress() {
        this.loginSection = !this.loginSection;
        this.branchselection = false;
    }
}
