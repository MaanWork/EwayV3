import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.scss'],
})
export class MailComponent implements OnInit {
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    userDetails: any;
    loginId: any;
    agencyCode: any;
    insuranceId: any;
    userType: any;
    productId: any;
    brokerbranchCode: any;
    branchCode: any;
    NotifiList: any[] = [];
    templatevalue;
    TemplateList: any[] = [];
    templist: any;
    opens: boolean = false;
    mailRequestno: any;
    MailSubject: any;
    MailBody: any;
    MailRegards: any;
    MailHeader: any[] = [];
    ViewList: any;
    closeResult: string;

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
        this.MailHeader = [
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'ToMail', display: 'ToMail' },
            { key: 'MailSubject', display: 'MailSubject' },
            { key: 'MailResponse', display: 'Mail Response' },
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

        this.mailRequestno = policyObj.RequestReferenceNo;

        this.onNotifi();
    }
    drop() {
        const ReqObj = {
            InsuranceId: this.insuranceId,
            ProductId: this.productId,
            NotifApplicable: 'Mail',
        };

        const urlLink = `${this.CommonApiUrl}notification/dropdown/templateslist`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.TemplateList = data.Result;
                }
            });
    }

    send() {
        const ReqObj = {
            CreatedBy: this.loginId,
            InsuranceId: this.insuranceId,
            NotifTemplateCode: this.templist.NotifTemplateCode,
            NotificationNo: this.templist.NotificationNo,
            ProductId: this.productId,
            RequestReferenceNo: this.mailRequestno,
            MailSubject: this.MailSubject,
            MailBody: this.MailBody,
            MailRegards: this.MailRegards,
            CustomerName: '',
        };

        const urlLink = `${this.CommonApiUrl}notification/sentdirectmail`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.opens = false;
                    this.templatevalue = '';
                    this.onNotifi();
                    this.router.navigate(['/quotation']);
                }
            });
    }
    showDialog() {
        this.opens = true;
        this.drop();
    }
    back() {
        this.router.navigate(['/quotation']);
    }

    onNotifi() {
        const ReqObj = {
            CreatedBy: this.loginId,
            InsuranceId: this.insuranceId,
            Limit: '0',
            Offset: '1000',
            ProductId: this.productId,
        };

        const urlLink = `${this.CommonApiUrl}notification/getallsentmail`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.NotifiList = data?.Result;
                }
            });
    }

    getMailTemplate() {
        const ReqObj = {
            CreatedBy: this.loginId,
            InsuranceId: this.insuranceId,
            NotifTemplateCode: this.templatevalue,
            ProductId: this.productId,
            RequestReferenceNo: this.mailRequestno,
        };

        const urlLink = `${this.CommonApiUrl}notification/getmailtemplate`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.templist = data.Result;

                    this.MailSubject = data?.Result?.MailSubject;
                    this.MailBody = data?.Result?.MailBody;
                    this.MailRegards = data?.Result?.MailRegards;
                    console.log('templist', this.templist);
                }
            });
    }

    backs() {
        this.opens = false;
    }

    Mail() {
        this.opens = true;
        this.drop();
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

    onviewMail(rowdata, modal) {
        console.log('RRRR', rowdata);
        this.open(modal);
        const ReqObj = {
            InsuranceId: this.insuranceId,
            ProductId: this.productId,
            NotificationNo: rowdata.NotificationNo,
        };
        const urlLink = `${this.CommonApiUrl}notification/viewsentmail`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.ViewList = data?.Result;
                    console.log('View', this.ViewList);
                }
            });
    }
    smsBack() {
        this.router.navigate(['/Home/existingQuotes']);
    }
}
