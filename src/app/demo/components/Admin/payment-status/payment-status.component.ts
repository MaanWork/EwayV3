import { Component } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-payment-status',
  standalone: false,
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent {
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
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
  tiraHeader: any[] = [];
  limit: any = '0';
  endDate: any;
  closeResult: string;
  tiradetails: any[] = [];
  innerdata: any[] = [];
  innerTableData: any[] = [];
  innergrid: any[] = [];
  outergrid: any[] = [];
  innerColumnHeader: any[] = [];
  maxDate: Date = new Date();
  paymentList: any[] = []
  cols: { field: string; header: string; }[];
  TabIndex: any;

  constructor(private router: Router, private sharedService: SharedService, private datePipe: DatePipe) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;

  }
  ngOnInit() {
    this.getProductList();
    this.cols = [
      { field: 'QuoteNo', header: 'Quote No' },
      { field: 'ClientName', header: 'Client Name' },
      { field: 'CompanyName', header: 'Company Name' },
      { field: 'BranchName', header: 'Branch Name' },
      { field: 'ProductName', header: 'Product Name' },
      { field: 'PaymentTypeName', header: 'Payment Type' },
      { field: 'Premium', header: 'Premium' },
      { field: 'PaymentStatus', header: 'Payment Status' },
      { field: 'PolicyStartDate', header: 'Policy Start Date' },
      { field: 'PolicyEndDate', header: 'Policy End Date' }
    ];
  }
  onTabChange(event: any) {
    this.TabIndex = event.index
    this.getPaymentStatusList();
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
        }
      });
  }

  getPaymentStatusList() {
    console.log(this.StartDate,"StartDate");
    
    this.paymentList =[];
    let sts = 'PENDING'
    if (this.TabIndex == 1) {

      sts = 'ACCEPTED'
    }
    if (this.TabIndex == 2) {
      sts = 'FAILED'
    }
    let ReqObj = {


      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId,
      "Status": sts,
      "StartDate":this.datePipe.transform(this.StartDate, 'dd/MM/yyyy'),
      "EndDate":this.datePipe.transform(this.EndDate, 'dd/MM/yyyy'),
    }

    let urlLink = `${this.CommonApiUrl}payment/paymentStatusList`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.paymentList = data.Result;
        }
      },
      (err) => { },
    );
  }
  search() {
    this.EndDate = '';
  }
}
