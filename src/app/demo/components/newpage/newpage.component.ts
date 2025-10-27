import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-newpage',
    templateUrl: './newpage.component.html',
    styleUrls: ['./newpage.component.scss'],
})
export class NewComponent implements OnInit {
    private readonly CommonApiUrl: string = environment.CommonApiUrl;
    StartDate: any;
    minDate: any;
    TemplateList: any[] = [];
    EndDate: any;
    bussinesstype: any;
    branchValue: any;
    branchList: any[] = [];
    userDetails: any;
    insuranceId: any;
    productId: any;
    tableData: any[] = [];
    quoteHeader: any[] = [];
    loginId: any;
    tableData1: any[] = [];
    show: boolean = false;
    quotesHeader: any[] = [];
    enddate: string;
    startDate: string;
    ProductName: string;
    dataSource: any;
    @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;
    @ViewChild('paginatorSecond') paginatorSecond: MatPaginator;
    BrokerName: any;
    newlogin: any;
    newproductId: any;
    page: any;
    rowdata: any;
    ProductId: any;
    constructor(
        private datePipe: DatePipe,
        public sharedService: SharedService,
        private router: Router,
    ) {
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        this.minDate = new Date();
        this.insuranceId = this.userDetails.Result.InsuranceId;
        this.productId = this.userDetails.Result.ProductId;
        this.loginId = this.userDetails.Result.LoginId;
    }
    ngOnInit(): void {
        const CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));
        let bussinesstype;
        if (CustomerObj) {
            bussinesstype = CustomerObj?.BusinessType;
            this.newlogin = CustomerObj?.Login;
        }
        if (bussinesstype != 'NB2C') {
            this.onTotal();
        } else {
            this.onTotalb2c();
        }
    }

    geteditList() {
        this.tableData = [];
        this.startDate = this.datePipe.transform(this.StartDate, 'dd/MM/yyyy');
        this.enddate = this.datePipe.transform(this.EndDate, 'dd/MM/yyyy');

        const ReqObj = {
            InsuranceId: this.insuranceId,
            BranchCode: this.branchValue,
            BusinessType: this.bussinesstype,
            StartDate: this.startDate,
            EndDate: this.enddate,
            LoginId: '',
            ProductId: '',
        };
        const urlLink = `${this.CommonApiUrl}api/admin/portfoliodashboard`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data?.Result) {
                    this.tableData = data.Result;
                }
            });
    }
    getQuotationList() {
        this.tableData = [];
        this.startDate = this.datePipe.transform(this.StartDate, 'dd/MM/yyyy');
        this.enddate = this.datePipe.transform(this.EndDate, 'dd/MM/yyyy');
        const ReqObj = {
            InsuranceId: this.insuranceId,
            BranchCode: this.branchValue,
            BusinessType: this.bussinesstype,
            StartDate: this.startDate,
            EndDate: this.enddate,
            LoginId: '',
            ProductId: '',
        };
        const urlLink = `${this.CommonApiUrl}api/admin/portfoliopendings`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data?.Result) {
                    this.tableData = data.Result;
                }
            });
    }
    getPolicyItems(rowData) {
        const entry: MenuItem[] = [
            {
                items: [
                    {
                        label: 'Schedule',
                        icon: 'pi pi-file-pdf',
                        command: () => {
                            this.onGetSchedule(rowData);
                        },
                    },
                    {
                        label: 'View Quote Details',
                        icon: 'pi pi-eye',
                        command: () => {
                            this.onViews(rowData);
                        },
                    },
                ],
            },
        ];

        return entry;
    }
    onTotal() {
        this.show = true;
        const CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));

        if (CustomerObj) {
            (this.newproductId = CustomerObj?.ProductId),
                (this.ProductName = CustomerObj?.ProductName),
                (this.bussinesstype = CustomerObj?.BusinessType),
                (this.startDate = CustomerObj?.StartDate),
                (this.enddate = CustomerObj?.EndDate),
                (this.branchValue = CustomerObj?.BranchCode),
                (this.newlogin = CustomerObj?.LoginId),
                (this.page = CustomerObj?.page),
                (this.BrokerName = CustomerObj?.BrokerName),
                (this.rowdata = CustomerObj?.rowData);
        }

        if (
            this.bussinesstype == 'N' ||
            this.bussinesstype == 'C' ||
            this.bussinesstype == 'E'
        ) {
            this.quotesHeader = [
                { header: 'Quote No' },
                { header: 'Policy No' },
                { header: 'Customer Name' },
                { header: 'Login ID' },
                { header: 'Policy StartDate' },
                { header: 'Policy EndDate' },
                { header: 'Currency' },
                { header: 'Premium' },
                { header: 'Action' },
            ];
        }

        if (this.bussinesstype == 'Q') {
            this.quotesHeader = [
                { header: 'Request ReferenceNo' },
                { header: 'Quote No' },
                { header: 'Policy No' },
                { header: 'Customer Name' },
                { header: 'Login ID' },
                { header: 'Policy StartDate' },
                { header: 'Policy EndDate' },
                {
                    header: 'Premium',
                },
                {
                    header: 'Action',
                },
            ];
        }
        const ReqObj = {
            InsuranceId: this.insuranceId,
            BusinessType: this.bussinesstype,
            StartDate: this.startDate,
            EndDate: this.enddate,
            BranchCode: this.branchValue,
            LoginId: this.newlogin,
            ProductId: this.newproductId,
            Limit: '0',
            Offset: '1000',
        };
        const urlLink = `${this.CommonApiUrl}api/admin/portfoliogrid`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data?.Result) {
                    this.tableData1 = data.Result;
                }
            });

        const quote = {
            bussinesstype: this.bussinesstype,
            startDate: this.startDate,
            EndDate: this.enddate,
        };
        sessionStorage.setItem('datedetials', JSON.stringify(quote));
    }
    onTotalb2c() {
        this.show = true;
        const CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));
        if (CustomerObj) {
            (this.newproductId = CustomerObj?.ProductId),
                (this.ProductName = CustomerObj?.ProductName),
                (this.bussinesstype = CustomerObj?.BusinessType),
                (this.startDate = CustomerObj?.StartDate),
                (this.enddate = CustomerObj?.EndDate),
                (this.branchValue = CustomerObj?.BranchCode),
                (this.newlogin = CustomerObj?.LoginId),
                (this.page = CustomerObj?.page),
                (this.BrokerName = CustomerObj?.BrokerName),
                (this.rowdata = CustomerObj?.rowData);
        }
        this.quotesHeader = [
            { key: 'RequestReferenceNo', display: 'Request ReferenceNo' },
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'BrokerLoginId', display: 'Login ID' },
            { key: 'PolicyStartDate', display: 'Policy StartDate' },
            { key: 'PolicyEndDate', display: 'Policy EndDate' },
            {
                key: 'edit',
                display: 'Premium',
                config: {
                    isPremiums: true,
                },
            },
            {
                key: 'actions',
                display: 'Action',
                config: {
                    isPolicyConfig: true,
                },
            },
        ];
        const ReqObj = {
            InsuranceId: this.insuranceId,
            BusinessType: this.bussinesstype,
            StartDate: this.startDate,
            EndDate: this.enddate,
            BranchCode: this.branchValue,
            LoginId: this.newlogin,
            ProductId: this.newproductId,
            Limit: '0',
            Offset: '1000',
        };
        const urlLink = `${this.CommonApiUrl}api/admin/portfoliob2cgrid`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data?.Result) {
                    this.tableData1 = data.Result;
                    console.log('Bussiness Type', this.tableData1);
                }
            });

        const quote = {
            bussinesstype: this.bussinesstype,
            startDate: this.startDate,
            EndDate: this.enddate,
        };
        sessionStorage.setItem('datedetials', JSON.stringify(quote));
    }

    ongetBack() {
        const quoteObj = {
            Businesstype: this.bussinesstype,
            StartDate: this.startDate,
            EndDate: this.enddate,
            BranchCode: this.branchValue,
        };
        sessionStorage.setItem('datedetails', JSON.stringify(quoteObj));
        this.router.navigate(['/ApproverPortfolio']);
    }

    onViews(rowData) {
        const quoteObj = {
            QuoteNo: rowData.QuoteNo,
            ProductId: rowData.ProductId,
            CustomerReferenceNo: rowData.CustomerReferenceNo,
            RequestReferenceNo: rowData.RequestReferenceNo,
            pageFrom: 'Portfolio',
            CustomerName: rowData.CustomerName,
            PolicyNo: rowData.PolicyNo,
            ProductName: rowData.ProductName,
        };
        sessionStorage.setItem('editCustomer', JSON.stringify(quoteObj));
        this.router.navigate(['/portfolio/motorDocuments']);
    }

    onGetSchedule(rowData) {
        const ReqObj = {
            QuoteNo: rowData.QuoteNo,
        };
        const urlLink = `${this.CommonApiUrl}pdf/policyform`;
        this.sharedService
            .onPostMethodSync(urlLink, ReqObj)
            .subscribe((data: any) => {
                if (data.ErrorMessage.length === 0) {
                    if (data?.Result?.PdfOutFile) {
                        this.downloadMyFile(data.Result.PdfOutFile);
                    } else {
                        Swal.fire({
                            title: '<strong>Schedule Pdf</strong>',
                            icon: 'error',
                            html: `No Pdf Generated For this Policy`,
                            showCancelButton: false,
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Cancel',
                        });
                    }
                }
            });
    }

    downloadMyFile(data) {
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data);
        link.setAttribute('download', 'Schedule');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    onCreditdownload(rowData) {
        const urlLink = `${this.CommonApiUrl}pdf/creditNote?quoteNo=${rowData.QuoteNo}`;
        this.sharedService.onGetMethodSync(urlLink).subscribe((data: any) => {
            console.log(data);
            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', data?.Result.PdfOutFile);
            link.setAttribute('download', 'Creditpdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }

    onDebitdownload(rowData) {
        const urlLink = `${this.CommonApiUrl}pdf/taxInvoice?quoteNo=${rowData.QuoteNo}`;
        this.sharedService.onGetMethodSync(urlLink).subscribe((data: any) => {
            console.log(data);
            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', data?.Result.PdfOutFile);
            link.setAttribute('download', 'DebitPdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }
}
