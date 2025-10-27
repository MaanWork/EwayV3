import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
    selector: 'app-tira-success',
    templateUrl: './tira-success.component.html',
    styleUrls: ['./tira-success.component.scss'],
})
export class TiraSuccessComponent implements OnInit {
    private readonly ApiUrl1: string = environment.ApiUrl1;
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    issuerHeader: any[] = [];
    issuerData: any[] = [];
    companyList: any[] = [];
    quoteno: any;
    startdate: Date;
    enddate: Date;
    insuranceId: any;
    userDetails: any;
    subUserType: any;
    pageCount: number;
    totalRecords: any;
    quotePageNo: any;
    startIndex: number;
    endIndex: number;
    closeResult: string;
    visible: boolean = false;
    totalQuoteRecords: any;
    productId: string;
    show: boolean = false;
    productList: any[] = [];
    loginId: any;
    insuranceList: any[] = [];
    branchValue: any;
    branchList: any;
    loginType: any;
    countryId: any;
    brokerbranchCode: any;
    agencyCode: any;
    branchCode: any;
    userType: any;
    startDate: any;
    EndDate: any;
    StartDate: any;
    endDate: any;
    tiradetails: any[] = [];
    tiraHeader: any[] = [];
    fileUrl: any;
    maxDate: Date;
    innerdata: any;
    innergrid: any;
    outergrid: any[];
    innerColumnHeader: string[];
    constructor(
        private datePipe: DatePipe,
        private sharedService: SharedService,
        private modalService: NgbModal,
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
        this.insuranceId = this.userDetails.Result.InsuranceId;
        this.branchList = this.userDetails.Result.LoginBranchDetails;
        this.loginType = this.userDetails.Result.LoginType;
        const d = new Date();
        this.maxDate = d;
    }
    ngOnInit(): void {
        this.issuerHeader = [
            'QuoteNo',
            'Customer Name',
            'Policy No',
            'Response Status',
            'Response StatusCode',
            'Login Id',
            'Branch',
            'Tira RequestId',
            'Tira ResponseId',
            'View',
        ];
        this.tiraHeader = [
            'RequestId',
            'ResponseId',
            'TIRA Code',
            'Tracking Id',
            'Hit Count',
            'Status',
            'Entry Date',
            'Method Name',
            'Request',
            'Response',
        ];
    }
    onReqPathDownload(rowData) {
        const urlLink = `${this.CommonApiUrl}document/downloadbase64`;
        this.sharedService
            .onPostFilePathDocumentMethodSync(urlLink, rowData.RequestFilePath)
            .subscribe(
                (data: any) => {
                    const link = document.createElement('a');
                    link.setAttribute('target', '_blank');
                    link.setAttribute('href', data?.Result?.ImgUrl);
                    link.setAttribute('download', 'Request');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                },
                (err) => {
                    console.log(err);
                },
            );
    }
    onResPathDownload(rowData) {
        const urlLink = `${this.CommonApiUrl}document/downloadbase64`;
        this.sharedService
            .onPostFilePathDocumentMethodSync(urlLink, rowData.ResponseFilePath)
            .subscribe((data: any) => {
                const link = document.createElement('a');
                link.setAttribute('target', '_blank');
                link.setAttribute('href', data?.Result?.ImgUrl);
                link.setAttribute('download', 'Response');
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
    }
    getCompanyList() {
        const ReqObj = {
            BrokerCompanyYn: '',
            LoginId: this.loginId,
        };
        const urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    const defaultObj = [];
                    this.insuranceList = defaultObj.concat(data.Result);
                    if (this.insuranceId) this.getProductList();
                }
            });
    }
    getBranchList(type) {
        if (type == 'change') {
            this.branchValue = null;
        }

        const ReqObj = {
            InsuranceId: this.insuranceId,
        };
        const urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    const obj = [{ Code: '99999', CodeDesc: 'ALL' }];
                    this.branchList = obj.concat(data?.Result);
                    // if(!this.branchValue){ this.branchValue = "99999";}
                    // else{}
                }
            });
    }
    getProductList() {
        console.log('KKKKKKKKKKKK', this.insuranceId);
        const ReqObj = {
            InsuranceId: this.insuranceId,
        };
        const urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.productList = data.Result;
                    this.getBranchList('direct');
                }
            });
    }
    getalldetails() {
        this.startDate = this.datePipe.transform(this.StartDate, 'dd/MM/yyyy');
        this.endDate = this.datePipe.transform(this.EndDate, 'dd/MM/yyyy');
        const ReqObj = {
            ProductId: this.productId,
            InsuranceId: this.insuranceId,
            StartDate: this.startDate,
            EndDate: this.endDate,
            BranchCode: this.branchCode,
        };
        const urlLink = `${this.CommonApiUrl}api/tirasuccess`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.Result) {
                    this.issuerData = data.Result;
                }
            });
    }
    search() {
        this.EndDate = '';
    }
    onInnerData(rowData) {
        this.innerdata = this.innergrid.filter(
            (ele) =>
                ele.RequestId == rowData.RequestId &&
                ele.AcknowledgementId == rowData.AcknowledgementId,
        );
        console.log('Inner grid datas', this.innerdata);
        rowData.MotorList = this.innerdata;
    }
    onViews(event) {
        this.visible = true;
        this.outergrid = [];
        this.innergrid = [];
        const ReqObj = {
            QuoteNo: event?.QuoteNo,
        };
        const urlLink = `${this.CommonApiUrl}api/tiraview`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                console.log(data);
                if (data?.Result) {
                    this.tiradetails = data?.Result;
                    this.outergrid = [];
                    this.innergrid = [];

                    for (let i = 0; i <= this.tiradetails.length; i++) {
                        this.innergrid = this.tiradetails.filter(
                            (ele) =>
                                ele.MethodName ==
                                '/covernote/non-life/motor/v2/acknowledge',
                        );
                        this.outergrid = this.tiradetails.filter(
                            (ele) =>
                                ele.MethodName ==
                                '/covernote/non-life/motor/v2/request',
                        );
                    }
                }
            });
    }
    openRejectpopup(modal) {
        this.open(modal);
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
    onDownload(type) {
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', type);
        link.setAttribute('download', 'Request');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}
