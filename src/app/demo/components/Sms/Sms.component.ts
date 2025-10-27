import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-Sms',
    templateUrl: './Sms.component.html',
})
export class SmsComponent implements OnInit {
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    smsRequestno: any;
    smss: boolean = false;
    SmsTemplateList: any;
    smstemplatevalue: any;
    SmsgetList: any;
    SmsSubject: any;
    SmsBody: any;
    SmsRegards: any;
    ViewList: any;
    SmsViewList: any;
    EntryDate: any;
    userDetails: any;
    loginId: any;
    agencyCode: any;
    brokerbranchCode: any;
    branchCode: any;
    productId: any;
    userType: any;
    insuranceId: any;
    SList: any[] = [];
    closeResult: string;
    SMSHeader: any[] = [];

    constructor(
        private router: Router,
        private sharedService: SharedService,
        private modalService: NgbModal,
    ) {
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        this.loginId = this.userDetails.Result.LoginId;
        this.agencyCode = this.userDetails.Result.OaCode;
        this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
        this.branchCode = this.userDetails.Result.BranchCode;
        this.productId = this.userDetails.Result.ProductId;
        this.userType = this.userDetails?.Result?.UserType;
        this.insuranceId = this.userDetails.Result.InsuranceId;

        this.SMSHeader = [
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'MobileNo', display: 'MobileNo' },
            { key: 'SmsType', display: 'Sms Type' },
            { key: 'ResMessage', display: 'Res Message' },
            {
                key: 'View',
                display: 'View',
                config: {
                    isViews: true,
                },
            },
        ];
    }

    ngOnInit(): void {
        const policyObj = JSON.parse(sessionStorage.getItem('Details'));
        this.smsRequestno = policyObj.RequestReferenceNo;
        this.smsList();
    }

    showDialog() {
        this.smss = true;
        this.SmsDrop();
    }
    back() {
        this.smss = false;
    }

    smsBack() {
        this.router.navigate(['/quotation']);
    }
    smsList() {
        const ReqObj = {
            CreatedBy: this.loginId,
            InsuranceId: this.insuranceId,
            Limit: '0',
            Offset: '1000',
            ProductId: this.productId,
        };

        const urlLink = `${this.CommonApiUrl}notification/getallsentsms`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.SList = data?.Result;
                    console.log('Notification', this.SList);
                }
            });
    }

    SmsDrop() {
        const ReqObj = {
            InsuranceId: this.insuranceId,
            ProductId: this.productId,
            NotifApplicable: 'Sms',
        };

        const urlLink = `${this.CommonApiUrl}notification/dropdown/templateslist`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.SmsTemplateList = data?.Result;
                    console.log('Template', this.SmsTemplateList);
                }
            });
    }

    sms() {
        this.smss = true;
        this.SmsDrop();
    }

    getSmsTemplate() {
        const ReqObj = {
            CreatedBy: this.loginId,
            InsuranceId: this.insuranceId,
            NotifTemplateCode: this.smstemplatevalue,
            ProductId: this.productId,
            RequestReferenceNo: this.smsRequestno,
        };

        const urlLink = `${this.CommonApiUrl}notification/getsmstemplate`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.SmsgetList = data.Result;

                    this.SmsSubject = data?.Result?.SmsSubject;
                    this.SmsBody = data?.Result?.SmsBody;
                    this.SmsRegards = data?.Result?.SmsRegards;
                    console.log('templist', this.SmsgetList);
                }
            });
    }

    sendSms() {
        const ReqObj = {
            CreatedBy: this.loginId,
            InsuranceId: this.insuranceId,
            NotifTemplateCode: this.SmsgetList.NotifTemplateCode,
            NotificationNo: this.SmsgetList.NotificationNo,
            ProductId: this.productId,
            RequestReferenceNo: this.smsRequestno,
            SmsSubject: this.SmsSubject,
            SmsBody: this.SmsBody,
            SmsRegards: this.SmsRegards,
        };

        const urlLink = `${this.CommonApiUrl}notification/sentdirectsms`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.smss = false;
                    this.smstemplatevalue = '';
                    this.smsList();
                    //$('#mysms').modal('hide');
                    this.router.navigate(['/quotation']);

                    console.log('Message Successfull');
                }
            });
    }

    open(content) {
        this.modalService
            .open(content, {
                size: 'lg',
                backdrop: 'static',
                ariaLabelledBy: 'modal-basic-title',
            })
            .result.then(
                (result) => {
                    this.closeResult = `Closed with: ${result}`;
                },
                (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                },
            );
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    onViewsms(rowdata, modal) {
        console.log('sms', rowdata);
        this.open(modal);
        const ReqObj = {
            InsuranceId: this.insuranceId,
            ProductId: this.productId,
            NotificationNo: rowdata.NotificationNo,
        };
        const urlLink = `${this.CommonApiUrl}notification/viewsentsms`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.SmsViewList = data?.Result;
                    if (this.SmsViewList.EntryDate) {
                        this.EntryDate = this.onDateFormatInEdit(
                            this.SmsViewList.EntryDate,
                        );
                    }
                    console.log('View', this.SmsViewList);
                }
            });
    }

    onDateFormatInEdit(date) {
        console.log(date);
        if (date) {
            let format = date.split('-');
            if (format.length > 1) {
                const NewDate = new Date(
                    new Date(format[0], format[1], format[2]),
                );
                NewDate.setMonth(NewDate.getMonth() - 1);
                return NewDate;
            } else {
                format = date.split('/');
                if (format.length > 1) {
                    const NewDate = new Date(
                        new Date(format[2], format[1], format[0]),
                    );
                    NewDate.setMonth(NewDate.getMonth() - 1);
                    return NewDate;
                }
            }
        }
    }
}
