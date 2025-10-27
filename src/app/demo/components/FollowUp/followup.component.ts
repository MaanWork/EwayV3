import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-followup',
    templateUrl: './followup.component.html',
    styleUrls: ['./followup.component.scss'],
})
export class FollowupComponent implements OnInit, OnChanges {
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
    followupIdA: any;
    templist: any;
    FollowupDesc: any;
    EndDate: any;
    opens: boolean = false;
    mailRequestno: any;
    MailSubject: any;
    MailBody: any;
    MailRegards: any;
    MailHeader: any[] = [];
    ViewList: any;
    closeResult: string;
    New: any[] = [];
    followupId: any;
    Remarks: any;
    EntryDate: any;
    minDate: Date;
    FollowId: any;
    StatusDesc: any;
    Status: any;
    StartTime: any;
    EndTime: any;
    FollowupId: any;
    FollowupDescs: any;
    Remarkss: any;
    EntryDates: any;
    EndTimes: any;
    StartTimes: any;
    NewList: any[] = [];
    count: number;
    FollowupDetails: any;
    RefNo: any;
    quoteno: any;
    CusName: any;
    Startdate: any;
    enddate: any;
    Sttartdate: any;
    proname: string;
    showGrids: boolean = false;
    public dataSource: any;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) private paginator!: MatPaginator;
    @Input() cols: any[] = [];
    Addnew: boolean = false;
    newfollowup: any;
    visible: boolean = false;
    visible1: boolean = false;
    visible2: boolean = false;
    hour: void;

    constructor(
        private router: Router,
        private sharedService: SharedService,
        private modalService: NgbModal,
        private datePipe: DatePipe,
    ) {
        this.minDate = new Date();
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        this.loginId = this.userDetails.Result.LoginId;
        this.agencyCode = this.userDetails.Result.OaCode;
        this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
        this.branchCode = this.userDetails.Result.BranchCode;
        this.productId = this.userDetails.Result.ProductId;
        this.userType = this.userDetails?.Result?.UserType;
        this.insuranceId = this.userDetails.Result.InsuranceId;

        this.FollowupDetails = JSON.parse(
            sessionStorage.getItem('FollowUpDetails'),
        );

        this.mailRequestno = this.FollowupDetails?.RequestReferenceNo;
        this.quoteno = this.FollowupDetails?.QuoteNo;
        this.CusName = this.FollowupDetails?.CustomerName;
        this.Sttartdate = this.FollowupDetails?.StartDate;
        this.enddate = this.FollowupDetails?.QuoteNo;
        if (this.productId == '5' || this.productId == '29') {
            this.proname = 'Motor';
        } else if (this.productId == '4') {
            this.proname = 'Travel';
        } else if (this.productId == '59') {
            this.proname = 'Domestic';
        }

        this.onFollowup();
    }
    ngOnInit(): void {
        this.drop();
    }
    showDialog() {
        this.visible = true;
    }
    showDialog2(rowData, model) {
        this.visible2 = true;
        this.getMailTemplate(rowData, model);
    }

    trans(time: any): any {
        let hour = time.split(':')[0];
        let min = time.split(':')[1];
        if (parseInt(hour) == 0) hour = 12;
        min = (min + '').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? `0${hour}` : hour;
        return `${hour}:${min}`;
    }

    transform(time: any): any {
        let hour = time.split(':')[0];
        let min = time.split(':')[1];
        if (parseInt(hour) == 0) hour = 12;
        min = (min + '').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? `0${hour}` : hour;
        return `${hour}:${min}`;
    }

    drop() {
        const ReqObj = {
            InsuranceId: this.insuranceId,
            BranchCode: this.branchCode,
        };

        const urlLink = `${this.CommonApiUrl}dropdown/followupDetailsStatus`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.TemplateList = data?.Result;
                    this.onFollowup();
                }
            });
    }

    smsBack() {
        this.router.navigate(['quotation']);
    }

    onFollowup() {
        this.NotifiList = [];
        const ReqObj = {
            RequestReferenceNo: this.mailRequestno,
            LoginId: this.loginId,
            InsuranceId: this.insuranceId,
            ProductId: this.productId,
        };

        const urlLink = `${this.CommonApiUrl}api/getallfollowupdetails`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.MailHeader = [
                        'FollowupDesc',
                        'Start Date',
                        'Status',
                        'Remarks',
                        'View',
                        'update',
                    ];

                    if (data?.Result?.FollowupDetailsRes) {
                        this.NotifiList = data?.Result?.FollowupDetailsRes;
                        if (this.NotifiList.length != 0) {
                            this.showGrids = true;
                            this.Addnew = true;
                        } else {
                            this.showGrids = false;
                            this.Addnew = false;
                        }
                    }
                  this.count = this.NewList.length;
                }
            });
    }

    getMailTemplate(rowdata, modal) {
        if (modal == 'view') {
            this.visible1 = true;
        }

        const ReqObj = {
            InsuranceId: this.insuranceId,
            FollowupId: rowdata.FollowupId,
            LoginId: rowdata.LoginId,
            ProductId: this.productId,
            RequestReferenceNo: rowdata.RequestReferenceNo,
        };

        const urlLink = `${this.CommonApiUrl}api/getfollowupdetailsid`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data?.Result) {
                    this.templist = data?.Result;

                    this.FollowupDesc = data?.Result?.FollowupDesc;

                    this.newfollowup = data?.Result?.FollowupDesc;
                    this.StatusDesc = data?.Result?.StatusDesc;
                    this.Status = data?.Result?.Status;
                    this.StartTime = this.transform(data?.Result?.StartTime);
                    this.EndTime = this.transform(data?.Result?.EndTime);
                    this.Remarks = data?.Result?.Remarks;
                    this.FollowupId = data?.Result?.FollowupId;

                    if (data?.Result?.StartDate) {
                        this.EntryDate = this.onDateFormatInEdit(
                            data?.Result?.StartDate,
                        );
                    }
                    if (data?.Result?.EndDate) {
                        this.EndDate = this.onDateFormatInEdit(
                            data?.Result?.EndDate,
                        );
                    }
                }
            });
    }

    send() {
        let follow;
        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            hour12: false,
            minute: 'numeric',
        });

        if (this.FollowupId != '' && this.FollowupId != null) {
            follow = this.FollowupId;
        } else {
            follow = '';
        }
        const ReqObj = {
            InsuranceId: this.insuranceId,
            EndDate: this.EndDate,
            EndTime: formatter.format(this.EndTime),
            FollowupDesc: this.FollowupDesc,
            LoginId: this.loginId,
            ProductId: this.productId,
            Remarks: this.Remarks,
            RequestReferenceNo: this.mailRequestno,
            StartDate: this.EntryDate,
            StartTime: formatter.format(this.StartTime),
            Status: this.Status,
            FollowupId: follow,
        };

        const urlLink = `${this.CommonApiUrl}api/savefollowup`;
        if (
            ReqObj.StartDate != '' &&
            ReqObj.StartDate != null &&
            ReqObj.StartDate != undefined
        ) {
            ReqObj['StartDate'] = this.datePipe.transform(
                ReqObj.StartDate,
                'dd/MM/yyyy',
            );
        } else {
            ReqObj['StartDate'] = '';
        }

        if (
            ReqObj.EndDate != '' &&
            ReqObj.EndDate != null &&
            ReqObj.EndDate != undefined
        ) {
            ReqObj['EndDate'] = this.datePipe.transform(
                ReqObj.EndDate,
                'dd/MM/yyyy',
            );
        } else {
            ReqObj['EndDate'] = '';
        }

        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.showGrids = true;
                    this.Addnew = true;
                    this.onFollowup();
                    this.visible = false;
                    window.location.reload();
                }
            });
    }
    send2() {
        let follow;
        if (this.FollowupId != '' && this.FollowupId != null) {
            follow = this.FollowupId;
        } else {
            follow = '';
        }
        const ReqObj = {
            InsuranceId: this.insuranceId,
            EndDate: this.EndDate,
            EndTime: this.trans(this.EndTime),
            FollowupDesc: this.FollowupDesc,
            LoginId: this.loginId,
            ProductId: this.productId,
            Remarks: this.Remarks,
            RequestReferenceNo: this.mailRequestno,
            StartDate: this.EntryDate,
            StartTime: this.trans(this.StartTime),
            Status: this.Status,
            FollowupId: follow,
        };

        const urlLink = `${this.CommonApiUrl}api/savefollowup`;
        if (
            ReqObj.StartDate != '' &&
            ReqObj.StartDate != null &&
            ReqObj.StartDate != undefined
        ) {
            ReqObj['StartDate'] = this.datePipe.transform(
                ReqObj.StartDate,
                'dd/MM/yyyy',
            );
        } else {
            ReqObj['StartDate'] = '';
        }

        if (
            ReqObj.EndDate != '' &&
            ReqObj.EndDate != null &&
            ReqObj.EndDate != undefined
        ) {
            ReqObj['EndDate'] = this.datePipe.transform(
                ReqObj.EndDate,
                'dd/MM/yyyy',
            );
        } else {
            ReqObj['EndDate'] = '';
        }

        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data.Result) {
                    this.showGrids = true;
                    this.Addnew = true;
                    this.onFollowup();
                    this.visible2 = false;
                    window.location.reload();
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
                    const NewDate = format[2] + '-' + format[1] + '-' + format[0];
                    return NewDate;
                }
            }
        }
    }

    backs() {
        this.opens = false;
    }

    Mail() {
        // this.opens=true;
        this.Addnew = false;
        this.showGrids = false;
        this.drop();
        //this.followupId=""
        console.log('hhhh');
        this.FollowupDesc = null;
        this.StatusDesc = null;
        this.Status = null;
        this.StartTime = null;
        this.EndTime = null;
        this.Remarks = null;
        this.EntryDate = '';
        this.FollowupId = '';
        this.EndDate = '';
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
                    this.ViewList = data.Result;
                    console.log('View', this.ViewList);
                }
            });
    }

    onEditQuotes(rowdata: any, modal) {
        this.open(modal);
    }
    Mails() {
        this.opens = true;
        this.followupId = '';
    }

    main() {
        this.showGrids = true;
    }

    ngOnChanges() {
        this.dataSource = new MatTableDataSource(this.NewList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    get keys() {
        return this.cols.map(({ key }) => key);
    }
}
