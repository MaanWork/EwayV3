import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../app-config.json';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  items: MenuItem[] | undefined;
  quoteOptions: any[] = [{ label: 'Quotes', value: 'quotes' }, { label: 'Endrosements', value: 'endrosements' }];
  value: string = 'quotes';
  columns: any[] = []; items2: MenuItem[];
  branches: MenuItem[] | undefined;
  searchValue: any[] = [];
  selectedBranch: MenuItem | undefined; tableView = 'table';
  userDetails: any = null; loginId: any = null; agencyCode: any = null;
  brokerbranchCode: any = null; branchCode: any = null; productId: any = null;
  userType: any = null; insuranceId: any = null; brokerCode: any = null;
  brokerList: any[] = []; totalQuoteRecords: any = null; limit: any = 0;
  pageCount: any = null; quoteData: any[] = []; quotePageNo: any = null;
  startIndex: any = null; endIndex: any = null;
  totalCancelRecords: any;
  customersearch: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  cancelbrokerList: any[] = [];
  CancelbrokerCode: any; CancelledquoteData: any[] = [];
  pageCount1: number; lang: any = null;
  quotePageNo1: number;
  show: boolean = false;
  pendingBrokerList: any[] = [];
  pendingBrokerCode: any = null;
  totalPendingQuoteRecords: any;
  pagePendingCount: number;
  pendingPolicyPageNo: number;
  startPendingIndex: number;
  endPendingIndex: any;
  PdfGetQuoteNo: any
  pendingQuoteData: any[] = [];
  MotorList: any[] = [];
  selectedRowData: any; searchSection: boolean = false;
  otherDocumentDialog: boolean;
  rowData: any = null; documentHeader: any[] = ['Document Name', 'Download']; documentList: any[] = [];
  htmlTemplate: any
  uploadDocList: any[] = [];
  constructor(private router: Router, private sharedService: SharedService, private appComp: AppComponent, private translate: TranslateService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;

    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if (this.userType != 'Issuer') this.brokerCode = this.loginId;
    sessionStorage.removeItem('loadingType');
    sessionStorage.removeItem('firstLoad');
    sessionStorage.removeItem('VechileDetails');
    sessionStorage.removeItem('emiPayment')
  }
  ngOnInit() {
    this.appComp.getLanguage().subscribe((res: any) => {
      if (res) this.lang = res;
      else this.lang = 'en';
      this.translate.setDefaultLang(this.lang); this.setHeaders();
    });
    if (!this.lang) {
      if (sessionStorage.getItem('language')) this.lang = sessionStorage.getItem('language');
      else this.lang = 'en';
      sessionStorage.setItem('language', this.lang)
      this.translate.setDefaultLang(sessionStorage.getItem('language')); this.setHeaders();
    }
    this.branches = [
      { label: 'Test', target: 'T' },
    ];
    if (this.productId == '5') this.columns = ['VehicleDetails', 'PolicyNo', 'QuoteNo', 'CustomerName', 'Currency', 'StartDate', 'EndDate', 'Premium', 'Actions']
    else this.columns = ['PolicyNo', 'QuoteNo', 'CustomerName', 'Currency', 'StartDate', 'EndDate', 'Premium', 'Actions']
    this.getBrokerList();
    this.getPendingList();
    this.getCancelledList();
  }
  setHeaders() {
    if (this.lang == 'en') {
      this.items = [{ label: 'Home', routerLink: '/' }, { label: 'Portfolio' }];
    }
    else if (this.lang == 'po') {
      this.items = [{ label: 'Lar', routerLink: '/' }, { label: 'Portfólio' }];
    }
  }
  getBrokerList() {
    let appId = "1", loginId = "", brokerbranchCode = "";
    if (this.userType != 'Issuer') {
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else {
      appId = this.loginId;
      loginId = this.brokerCode;
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId": appId,
      "UserType": this.userType,
      "BranchCode": this.branchCode,
      "Status": "Y",
    }
    let urlLink = `${this.CommonApiUrl}api/portfoliobrokerdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          let brokercode = sessionStorage.getItem('brokercodeendorsement');
          if (this.brokerList.length == 0) { this.brokerCode = ''; this.brokerList = [] }
          else if (brokercode != "" && brokercode != null) {
            this.brokerCode = brokercode;
            console.log('HHHHHHHHHH', this.brokerCode)
          }
          else this.brokerCode = this.loginId;
          if (this.brokerCode != null && this.brokerCode != '') {
            if (!this.brokerList.some(ele => ele.Code == this.brokerCode)) this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null, 'change');
            sessionStorage.removeItem('brokercodeendorsement');
          }
          else {
            this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null, 'change');
            sessionStorage.removeItem('brokercodeendorsement');
          }
        }

      },
      (err) => { },
    );
  }
  onInnerData(rowData) {
    this.MotorList = [];
    this.selectedRowData = rowData;
    let ReqObj = {
      "RequestReferenceNo": rowData.RequestReferenceNo
    }
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.MotorList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getPendingList() {
    let appId = "1", loginId = "", brokerbranchCode = "";
    if (this.userType != 'Issuer') {
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else {
      appId = this.loginId;
      loginId = this.brokerCode;
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId": appId,
      "UserType": this.userType,
      "BranchCode": this.branchCode,
      "Status": "Y",
    }
    let urlLink = `${this.CommonApiUrl}api/portfoliopendingdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = []
          this.pendingBrokerList = defaultObj.concat(data.Result);
          if (this.pendingBrokerList.length == 0) { this.pendingBrokerCode = ''; this.pendingBrokerList = [] }
          else this.pendingBrokerCode = this.loginId;
          if (this.pendingBrokerCode != null && this.pendingBrokerCode != '') {
            if (!this.pendingBrokerList.some(ele => ele.Code == this.pendingBrokerCode)) this.pendingBrokerCode = this.pendingBrokerList[0]?.Code;
            this.getPendingPolicyList(null, 'change')
          }
          else {
            this.pendingBrokerCode = this.pendingBrokerList[0]?.Code;
            this.getPendingPolicyList(null, 'change')
          }
        }
      },
      (err) => { },
    );
  }
  getPendingPolicyList(element, entryType) {
    if (element == null) this.quoteData = [];
    let appId = "1", loginId = "", brokerbranchCode = "", bdmCode = null;
    if (this.userType != 'Issuer') {
      appId = "1"; loginId = this.pendingBrokerCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode = this.agencyCode;
    }
    else {
      appId = this.loginId;
      loginId = this.pendingBrokerCode;
      brokerbranchCode = '';
    }
    let entry = this.pendingBrokerList.find(ele => ele.Code == this.pendingBrokerCode);
    if (entry) {
      console.log("Entry Received", entry)
      // if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      // && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
      if (this.userType == 'Issuer') {
        loginId = this.pendingBrokerCode;
        bdmCode = null;
      }
      else {
        loginId = entry.Code;
        bdmCode = null;
      }
      let ReqObj = {
        "BrokerBranchCode": brokerbranchCode,
        "BranchCode": this.branchCode,
        "InsuranceId": this.insuranceId,
        "LoginId": loginId,
        "ApplicationId": appId,
        "UserType": this.userType,
        "SubUserType": sessionStorage.getItem('typeValue'),
        "SourceType": "",
        "BdmCode": bdmCode,
        "ProductId": this.productId,
        "Limit": this.limit,
        "Offset": 10000
      }
      // let urlLink = `${this.CommonApiUrl}api/portfolio/pending`;
      // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      //   (data: any) => {
      //     console.log(data);
      //     sessionStorage.removeItem('loadingType');
      //     if(data.Result){
      //       if (data.Result?.PortfolioList) {
      //         if (data.Result?.PortfolioList.length != 0) {
      //           this.totalPendingQuoteRecords = data.Result?.Count;
      //           this.pagePendingCount = 10;
      //           if (entryType == 'change') {
      //             this.pendingPolicyPageNo = 1;
      //             let startCount = 1, endCount = this.pageCount;
      //             startCount = endCount + 1;
      //               let quoteData = data.Result?.PortfolioList;
      //               this.pendingQuoteData = data.Result?.PortfolioList;
      //               if (quoteData.length <= this.pagePendingCount) {
      //                 endCount = quoteData.length
      //               }
      //               else endCount = this.pagePendingCount;

      //             this.startPendingIndex = startCount; this.endPendingIndex = endCount;
      //           }
      //           else {

      //             let startCount = element.startCount, endCount = element.endCount;
      //             this.pagePendingCount = element.n;
      //             startCount = endCount + 1;
      //               let quoteData = data.Result?.PortfolioList;
      //               this.pendingQuoteData = this.pendingQuoteData.concat(data.Result?.PortfolioList);
      //             if (this.totalPendingQuoteRecords <= endCount + (element.n)) {
      //               endCount = this.totalPendingQuoteRecords
      //             }
      //             else endCount = endCount + (element.n);
      //             this.startPendingIndex = startCount; this.endPendingIndex = endCount;
      //           }
      //         }
      //         else {
      //           this.pendingQuoteData = []; 
      //         }
      //       }
      //     }
      //   },
      //   (err) => { },
      // );
    }
  }
  getCancelledList() {
    let appId = "1", loginId = "", brokerbranchCode = "";
    if (this.userType != 'Issuer') {
      appId = "1"; loginId = this.CancelbrokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else {
      appId = this.loginId;
      loginId = this.CancelbrokerCode;
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId": appId,
      "UserType": this.userType,
      "BranchCode": this.branchCode,
      "Status": "Y",
    }
    let urlLink = `${this.CommonApiUrl}api/cancelpolicyportfoliodropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = []
          this.cancelbrokerList = defaultObj.concat(data.Result);
          if (this.cancelbrokerList.length == 0) { this.CancelbrokerCode = ''; this.cancelbrokerList = [] }
          else this.CancelbrokerCode = this.loginId;
          if (this.CancelbrokerCode != null && this.CancelbrokerCode != '') {
            if (!this.cancelbrokerList.some(ele => ele.Code == this.CancelbrokerCode)) this.CancelbrokerCode = this.cancelbrokerList[0]?.Code;
            this.getCancelledQuotes(null, 'change');
            //this.getExistingQuotes(null,'change')
          }
          else {
            this.CancelbrokerCode = this.cancelbrokerList[0]?.Code;
            this.getCancelledQuotes(null, 'change');
            //this.getExistingQuotes(null,'change')
          }
        }

      },
      (err) => { },
    );

  }
  getPolicyItems(rowData) {
    let entry: MenuItem[] = [{
      label: 'PDF',
      items: [{
        label: 'Schedule',
        icon: 'pi pi-file-pdf',
        command: () => {
          this.onGetSchedule(rowData)
        }
      },
      {
        label: 'Debit Note',
        icon: 'pi pi-file-pdf',
        command: () => {
          this.onDebitdownload(rowData)
        }
      },
      {
        label: 'Credit Note',
        icon: 'pi pi-file-pdf',
        command: () => {
          this.onCreditdownload(rowData);
        }
      }
      ]
    },
    {
      label: 'Others',
      items: [{
        label: 'Endorsement',
        icon: 'pi pi-external-link',
        command: () => {
          this.onEditEndorsement(rowData)
        }
      },
      {
        label: 'View Quote Details',
        icon: 'pi pi-eye',
        command: () => {
          this.onViews(rowData);
        }
      },
      {
        label: 'Pay EMI',
        icon: 'pi pi-Credit',
        command: () => {
          this.onPay(rowData);
        }
      }
      ]
    }
    ];
    // const hideDebitNote = true; // Set your condition here
    if (rowData?.CreditNo == null && rowData.CreditNo == '') {
      entry[0].items = entry[0].items.filter(item => item.label === 'Credit Note');
    }
    if (rowData.DebitNoteNo == null && rowData.DebitNoteNo == '') {
      entry[0].items = entry[0].items.filter(item => item.label === 'Debit Note');
    }

    // let i=0;
    // if(rowData?.CreditNo!=null && rowData.CreditNo!=''){
    //   i+=1;
    //   entry[0].items.concat(
    //     []
    //   )
    // }
    // else i+=1;
    // if(rowData.DebitNoteNo!=null && rowData.DebitNoteNo!=''){
    //   i+=1;
    //   entry[0].items.concat(
    //     []
    //   )
    //   console.log("final Concat",entry)
    // }
    // else i+=1;
    // if(i==2) return entry;
    //else return []
    return entry;
  }
  onEditEndorsement(rowData) {
    sessionStorage.setItem('customerReferenceNo', rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo', rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo', rowData.QuoteNo);
    sessionStorage.setItem('endorsePolicyNo', rowData.OriginalPolicyNo);
    sessionStorage.setItem('Pagefrom', 'endorsement');
    sessionStorage.setItem('brokercodeendorsement', this.brokerCode);
    this.router.navigate(['/portfolio/endorsement'])
  }
  onClaimIntimate(rowData) {
    sessionStorage.setItem('customerReferenceNo', rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo', rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo', rowData.QuoteNo);
    sessionStorage.setItem('endorsePolicyNo', rowData.OriginalPolicyNo);
    sessionStorage.setItem('Pagefrom', 'endorsement');
    sessionStorage.setItem('brokercodeendorsement', this.brokerCode);
    this.router.navigate(['/portfolio/claimIntimate'])
  }
  onViews(rowData) {
    let ReqObj = {
      "Search": "",
      "SearchValue": rowData.QuoteNo,
      "QuoteNo": rowData.QuoteNo,
      "RequestReferenceNo": rowData.RequestReferenceNo,
      "ProductId": this.productId,
      "pageFrom": 'policy',
      "CustomerName": rowData.ClientName,
      "ProductName": rowData.ProductName,
      "PolicyNo": rowData.PolicyNo,
      "Currency": rowData.Currency,
      "EmiYn": rowData?.EmiYn
    }
    sessionStorage.setItem('editCustomer', JSON.stringify(ReqObj));
    this.router.navigate(['/portfolio/motorDocuments'])
  }
  onPay(rowData) {
    let ReqObj = {
      "Search": "",
      "SearchValue": rowData.QuoteNo,
      "QuoteNo": rowData.QuoteNo,
      "RequestReferenceNo": rowData.RequestReferenceNo,
      "ProductId": this.productId,
      "pageFrom": 'policy',
      "CustomerName": rowData.ClientName,
      "ProductName": rowData.ProductName,
      "PolicyNo": rowData.PolicyNo,
      "Currency": rowData.Currency,
      "EmiYn": rowData?.EmiYn
    }
    sessionStorage.setItem('editCustomer', JSON.stringify(ReqObj));
    this.router.navigate(['/portfolio/emiDetails'])
  }
  getExistingQuotes(element, entryType) {
    if (element == null) this.quoteData = [];
    let appId = "1", loginId = "", brokerbranchCode = "", bdmCode = null;
    if (this.userType != 'Issuer') {
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode = this.agencyCode;
    }
    else {
      appId = this.loginId;
      loginId = this.brokerCode;
      brokerbranchCode = '';
    }
    let entry = this.brokerList.find(ele => ele.Code == this.brokerCode);
    if (entry) {
      console.log("Entry Received", entry)
      // // if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      // && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
      if (this.userType == 'Issuer') {
        loginId = '';
        bdmCode = this.brokerCode;
      }
      else {
        bdmCode = null;
      }
      let ReqObj = {
        "BrokerBranchCode": brokerbranchCode,
        "BranchCode": this.branchCode,
        "InsuranceId": this.insuranceId,
        "LoginId": loginId,
        "ApplicationId": appId,
        "UserType": this.userType,
        "SubUserType": sessionStorage.getItem('typeValue'),
        "SourceType": "",
        "BdmCode": bdmCode,
        "ProductId": this.productId,
        "Limit": this.limit,
        "Offset": 60
      }
      let urlLink = `${this.CommonApiUrl}api/portfolio/active`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          sessionStorage.removeItem('loadingType');
          if (data.Result) {
            if (data.Result?.PortfolioList) {
              if (data.Result?.PortfolioList.length != 0) {
                this.totalQuoteRecords = data.Result?.Count;
                this.pageCount = 10;
                if (entryType == 'change') {
                  this.quotePageNo = 1;
                  let startCount = 1, endCount = this.pageCount;
                  startCount = endCount + 1;
                  let quoteData = data.Result?.PortfolioList;
                  this.quoteData = data.Result?.PortfolioList;
                  if (quoteData.length <= this.pageCount) {
                    endCount = quoteData.length
                  }
                  else endCount = this.pageCount;

                  this.startIndex = startCount; this.endIndex = endCount;
                }
                else {

                  let startCount = element.startCount, endCount = element.endCount;
                  this.pageCount = element.n;
                  startCount = endCount + 1;
                  let quoteData = data.Result?.PortfolioList;
                  this.quoteData = this.quoteData.concat(data.Result?.PortfolioList);
                  if (this.totalQuoteRecords <= endCount + (element.n)) {
                    endCount = this.totalQuoteRecords
                  }
                  else endCount = endCount + (element.n);
                  this.startIndex = startCount; this.endIndex = endCount;
                }
              }
              else {
                this.quoteData = [];
              }
            }
          }
        },
        (err) => { },
      );
    }
  }
  getCancelledQuotes(element, entryType) {
    if (element == null) this.quoteData = [];
    let appId = "1", loginId = "", brokerbranchCode = "", bdmCode = null;
    if (this.userType != 'Issuer') {
      appId = "1"; loginId = this.CancelbrokerCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode = this.agencyCode;
    }
    else {
      appId = this.loginId;
      loginId = this.CancelbrokerCode;
      brokerbranchCode = '';
    }
    let entry = this.cancelbrokerList.find(ele => ele.Code == this.CancelbrokerCode);
    if (entry) {
      console.log("Entry Received", entry)
      // if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      // && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
      if (this.userType == 'Issuer') {
        loginId = this.CancelbrokerCode;
        bdmCode = null;
      }
      else {
        loginId = entry.Code;
        bdmCode = null;
      }
      let ReqObj = {
        "BrokerBranchCode": brokerbranchCode,
        "BranchCode": this.branchCode,
        "InsuranceId": this.insuranceId,
        "LoginId": loginId,
        "ApplicationId": appId,
        "UserType": this.userType,
        "SubUserType": sessionStorage.getItem('typeValue'),
        "SourceType": "",
        "BdmCode": bdmCode,
        "ProductId": this.productId,
        "Limit": this.limit,
        "Offset": 10000
      }
      let urlLink = `${this.CommonApiUrl}api/portfolio/cancelled`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          sessionStorage.removeItem('loadingType');
          if (data.Result) {
            if (data.Result?.PortfolioList) {
              // this.CancelledquoteData = data.Result?.PortfolioList;
              if (data.Result?.PortfolioList.length != 0) {
                this.totalCancelRecords = data.Result?.Count;
                this.pageCount1 = 10;
                if (entryType == 'change') {
                  this.quotePageNo1 = 1;
                  let startCount = 1, endCount = this.pageCount1;
                  startCount = endCount + 1;
                  let quoteData = data.Result?.PortfolioList;
                  this.CancelledquoteData = data.Result?.PortfolioList;
                  if (quoteData.length <= this.pageCount1) {
                    endCount = quoteData.length
                  }
                  else endCount = this.pageCount;

                  this.startIndex = startCount; this.endIndex = endCount;
                }
                else {

                  let startCount = element.startCount, endCount = element.endCount;
                  this.pageCount = element.n;
                  startCount = endCount + 1;
                  let quoteData = data.Result?.PortfolioList;
                  this.CancelledquoteData = this.CancelledquoteData.concat(data.Result?.PortfolioList);
                  if (this.totalCancelRecords <= endCount + (element.n)) {
                    endCount = this.totalQuoteRecords
                  }
                  else endCount = endCount + (element.n);
                  this.startIndex = startCount; this.endIndex = endCount;
                }
              }
              else {
                this.CancelledquoteData = [];
              }
            }
            else {
              this.CancelledquoteData = [];
            }
          }
        },
        (err) => { },
      );
    }
  }
  onCreditdownload(rowData) {
    console.log('KKKKKKKKKKK', rowData.QuoteNo);
    let urlLink = `${this.CommonApiUrl}pdf/creditNote?quoteNo=${rowData.QuoteNo}`

    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download', 'Creditpdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      },
      (err) => { },
    );
  }
  onDebitdownload(rowData) {
    console.log('KKKKKKKKKKK', rowData.QuoteNo);
    let urlLink = `${this.CommonApiUrl}pdf/taxInvoice?quoteNo=${rowData.QuoteNo}`

    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download', 'DebitPdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      },
      (err) => { },
    );
  }
  onGetOtherDocument(rowData) {
    this.rowData = rowData;
    let urlLink = `${this.CommonApiUrl}pdf/getApiDocList/${rowData?.QuoteNo}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        this.documentList = data.Result;
        this.otherDocumentDialog = true;
      });
  }
  onGetDraft(rowData) {
    let ReqObj = {
      "QuoteNo": rowData.QuoteNo,
      "CertificateYn": 'Y'
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.ErrorMessage.length != 0) {
          if (data.ErrorMessage) {
          }
        }
        else {
          if (data?.Result?.PdfOutFile) {
            this.downloadMyFilebroker(data.Result.PdfOutFile);
          }
          else {
            Swal.fire({
              title: '<strong>Schedule Pdf</strong>',
              icon: 'error',
              html:
                `No Pdf Generated For this Policy`,
              //showCloseButton: true,
              //focusConfirm: false,
              showCancelButton: false,

              //confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancel',
            })
          }
        }
      },
      (err) => { },
    );
  }
  downloadMyFilebroker(data) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', data);
    link.setAttribute('download', 'Certificate');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  onGetVehicleSchedule(rowData) {
    let event = {
      "QuoteData": this.selectedRowData,
      "VehicleData": rowData
    }
    let ReqObj = {
      "QuoteNo": event?.QuoteData.QuoteNo,
      "VehicleId": event?.VehicleData.Vehicleid
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Result?.PdfOutFile) {
          this.downloadMyFile(data.Result.PdfOutFile, 'Schedule');
        }
        else {
          Swal.fire({
            title: '<strong>Schedule Pdf</strong>',
            icon: 'error',
            html:
              `No Pdf Generated For this Policy`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
        }
      },
      (err) => { },
    );
  }
  onGetSchedule(rowData) {
    let urlLink = ''
    let ReqObj = {
      "QuoteNo": rowData.QuoteNo
    }
    this.PdfGetQuoteNo = rowData.QuoteNo
    // let ReqObj = {
    //   "QuoteNo": 'AICQ15991'
    // }
    if (this.productId == '100002' && this.productId =='86') {
      urlLink = `${this.CommonApiUrl}api/yara/document/details`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            this.PolicyPdfTemplate(data.Result)
          }
        },
        (err) => { },
      );
    }
    else {
      urlLink = `${this.CommonApiUrl}pdf/policyform`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.ErrorMessage.length != 0) {
            if (data.ErrorMessage) {
            }
          }
          else {
            if (data?.Result?.PdfOutFile) {
              this.downloadMyFile(data.Result.PdfOutFile, 'Schedule');
            }
            else {
              Swal.fire({
                title: '<strong>Schedule Pdf</strong>',
                icon: 'error',
                html:
                  `No Pdf Generated For this Policy`,
                //showCloseButton: true,
                //focusConfirm: false,
                showCancelButton: false,

                //confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel',
              })
            }
          }
        },
        (err) => { },
      );
    }


  }
  downloadMyFile(data, name) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', data);
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  onSelectCustomer(event) {
    if (event) {
      this.show = true;
      this.customersearch = true;
    }
    else {
      this.show = false;
      this.customersearch = false;
    }
  }
  eventothers(searchvalues, entryType) {
    let searchvalue: any = searchvalues;
    this.searchValue = searchvalues;
    sessionStorage.setItem('PolicyNos', searchvalue)
    let ReqObj = {
      "PolicyNo": searchvalues,//this.searchValue,
      "BranchCode": this.branchCode,
      "InsuraceId": this.insuranceId,
      "ProductId": this.productId,
      "Limit": "0",
      "Offset": 10000
    }
    let urlLink = `${this.CommonApiUrl}api/searchbrokerpolicies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result.PortFolioList) {
          this.searchSection = true;
          //this.OthersList = data.Result?.PortFolioList;
          if (data.Result?.PortFolioList.length != 0) {

            this.totalQuoteRecords = data.Result?.Count;
            this.pageCount = 10;
            if (entryType == 'change') {
              this.quotePageNo = 1;
              let startCount = 1, endCount = this.pageCount;
              startCount = endCount + 1;
              let quoteData = data.Result?.PortFolioList;
              this.quoteData = data.Result?.PortFolioList;
              if (quoteData.length <= this.pageCount) {
                endCount = quoteData.length
              }
              else endCount = this.pageCount;

              this.startIndex = startCount; this.endIndex = endCount;
            }
            else {

              // let startCount = element.startCount, endCount = element.endCount;
              // this.pageCount = element.n;
              // startCount = endCount + 1;
              //   let quoteData = data.Result?.PortfolioList;
              //   this.pendingQuoteData = this.pendingQuoteData.concat(data.Result?.PortfolioList);
              // if (this.totalQuoteRecords <= endCount + (element.n)) {
              //   endCount = this.totalQuoteRecords
              // }
              // else endCount = endCount + (element.n);
              // this.startIndex = startCount; this.endIndex = endCount;
            }
          }
          else {
            this.quoteData = [];
          }
        }
      },
      (err) => { },
    );
  }
  clearSearch() {
    this.quoteData = [];
    this.searchValue = [];
    this.searchSection = false;
    this.getExistingQuotes(null, 'change');
  }
  onDownloadDynamicDoc(val) {
    let ReqObj = {
      "QuoteNo": this.rowData?.QuoteNo,
      "FileCode": val.FileCode
    }
    let urlLink = `${this.CommonApiUrl}pdf/download/ApiDoc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Result?.PdfOutFile) {
          this.downloadMyFile(data.Result.PdfOutFile, val.FileName);
        }
        else {
          Swal.fire({
            title: '<strong>Schedule Pdf</strong>',
            icon: 'error',
            html:
              `No Pdf Generated For this Policy`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
        }
      });
  }
  PolicyPdfTemplate(data) {
    this.htmlTemplate = `
   <h4 style="text-align: center;">YARA Rice Weather Index Insurance - Policy Document</h4>
<div style="padding-top: 40px; padding-bottom: 80px;">
  <div
    style="width: 794px; max-width: 794px; margin: auto; overflow:auto; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.6; overflow-x: word-wrap;">
    <div class="mt-2"></div>
    <p><strong>POLICY NUMBER:</strong>
      <span class="pdf-only">${data?.PolicyNo}</span>
    </p>
    <p><strong>THE INSURED:</strong> ${data?.FirstName}</p>

    <strong>DEFINITION:</strong>
    <div>"The Insured" shall mean ${data?.FirstName} under the proposed programme from whom a levy</div>
    <div>(including the insurance premium) shall be collected by the Insurer in the proposed crop season.</div>

    <p><strong>THE INSURER:</strong> ${data?.CompanyName} (hereinafter referred to as the ‘Insurer’)</p>
    <p><strong>COVERAGE:</strong> Rice Crop</p>

    <div><strong>WHAT IS COVERED:</strong> Weather Index Insurance – Crop failure due to lack of adequate or excess
      moisture after planting </div>
    <div>as defined under this policy and attached term sheet (Annex 1).</div>

    <p><strong>SITUATION:</strong> Morgoro, Iringinga & Mbeya farm locations</p>

    <div><strong>CONDITION PRECEDENT:</strong> Cover will only incept after receipt of farmer schedule before the
      effective planting date with </div>
    <div>name, location,and Total Sum Insured.</div>

    <p><strong>PERIOD OF INSURANCE:</strong> ${data?.PolicyStartDate} to ${data?.PolicyEndDate}</p>
    <p><strong>BASIS OF INDEMNITY:</strong> Calculated loss using the parameters defined under WII</p>

    <p><strong>SUMS INSURED:</strong> ${data?.PremiumCurrency}
      <span class="pdf-only">${data?.SumInsured}</span> (100% of the limit of liability)
    </p>

    <p><strong>LIMITS OF LIABILITY:</strong> This is the total value of the crop ${data?.PremiumCurrency}
      <span class="pdf-only">${data?.LimitsOfLiability}</span>
    </p>

    <p><strong>PREMIUM RATE:</strong> 5% (Gross Premium)</p>
    <p><strong>PREMIUM AMOUNT:</strong> ${data?.PremiumCurrency}
      <span class="pdf-only">${data?.PremiumAmount}</span> (Inc. levies)
    </p>

    <p><strong>PREMIUM PAYMENT:</strong> To be paid within 30 days of cover inception.</p>

    <div><strong>LIEN CLAUSE:</strong>
      <div> Loss if payable under this policy is payable to YARA and whose receipt will
        be valid discharge.</div>
      <div> YARA shall deduct any outstanding charges/ balance (if any) and forward the balance to
        the insured Farmers.</div>
    </div>

    <p><strong>EXCLUSIONS:</strong> The insurer shall not be liable for any benefit outside the defined insured perils
    </p>

    <p><strong>PAYMENT CURRENCY:</strong> ${data?.PremiumCurrency}</p>
    <p><strong>JURISDICTION:</strong> Tanzania</p>

    <h4>WEATHER INDEX INSURANCE</h4>
    <ul>
      <li>Germination failure due to deficit rainfall at germination stage</li>
      <li>Growth failure due to deficit rainfall at vegetative stage</li>
      <li>Flowering failure due to deficit rainfall at flowering stage</li>
      <li>Pre-harvest damage due to excessive rainfall</li>
      <li>What constitutes deficit or excessive rainfall per stage is as defined in annex 1.
        <div>The Insurer shall not be liable to pay any benefit in respect to any event other than </div>
        <div>the one described in annex 1 as the insured peril.</div>
      </li>
    </ul>


    <p><strong>INSURED PERILS:</strong> Deficit and excess rainfall as defined by the index using data recorded at an
      agreed satellite</p>
    <p><strong>EFFECTIVE COVER INCEPTION DATE:</strong> The effective date of inception of this cover shall be the <br>
      as defined in annex 1.</p>
    <p><strong>FARM LOCATION:</strong> GPS coordinates of farmer locations</p>
    <p><strong>EARLIEST POSSIBLE CONTRACT START:</strong> 1st November, 2025</p>

    <h5>WEATHER DATA SOURCE</h5>
    <div>a) All satellite data will be provided by ARC2, a data source provided by the United States National<br>
      Oceanic and Atmospheric Administration (NOAA) and the official source for the data (ARC2) is<br>
      free of charge at ftp://ftp.cpc.ncep.noaa.gov/fews/AFR_CLIM/ARC2/.</div>
    <div> b) Missing data will be filled in with historical average of that day.</div>

    <p><strong>Payment of Claims:</strong> Payment of all claims shall be due at the end of the season.</p>
    <h5>WEATHER DATA SOURCE</h5>

    1. INSURANCE OF ALL LANDS AND ALL FARMS<br>

    The Insured shall offer the Insurer All the Lands and Farms contracted on which the Insured Crop is planted to
    qualify for this insurance.<br>

    2. LAST DATE FOR PROPOSAL<br>

    No proposal will be accepted after 15th November, 2025<br>

    3. MINIMUM AREA<br>

    N/A<br>

    <h5>GENERAL EXCLUSIONS</h5>
    This insurance does not cover<br>

    1. Any crop loss not attributed to drought/ excess rain measured using the proposed satellite<br>

    2. Pest and Diseases<br>

    3. Loss or damage to harvested crop after leaving the farm<br>

    4. Consequential loss due to delay, detention or confiscation of harvested produce<br>

    5. Down-grading and deterioration in production quality of any kind<br>

    7. Theft of crop while in the fields, mysterious disappearances or unaccountable losses.<br>

    8. Loss or damage occasioned by or through or in consequence directly or indirectly of any of the following<br>
    occurrences namely:<br>

    <div style="margin-left:6px;">a) War, invasion, act of foreign enemy, hostilities or warlike operations (whether war
      be declared or not) civil war, mutiny,<br>
      civil commotion, military rising, revolution, insurrection, military or usurped power, or any act of any person
      acting <br>
      on behalf of or in connection with any organisation with activities directed towards the overthrow by force of the
      Government <br>
      de jure or de facto or to the influencing of it by terrorism or violence.<br>
      In an action, suit or other proceeding where the Insurers allege that by reason of the provisions of this
      Exception any <br>
      loss or damage is not covered by this insurance the burden of proving that such loss or damage is covered shall be
      upon the Insured<br>

      b) Nuclear weapons, materials or ionising radiation or contamination by radio activity from any nuclear waste from
      the combustion of nuclear fuel.<br>

      c) Volcanic eruption, subsidence, landslide, erosion, or other convulsion of nature.<br>

      d) Infestation, vermin, pests, animals, birds, insects and other natural enemies or disease of every description
      <br>whether evident in the crop before or after an insured event.<br>

      e) Loss or damage to crop occasioned by its own fermentation, natural heating or spontaneous combustion.<br>
      f) The burning of the crop by order of any public authority, or by subterranean fire.<br>

      g) Typhoon, hurricane, tornado, cyclone.<br>

      h) Mould, gradual deterioration, consequential loss of any kind whatsoever, including downgrading from whatever
      cause, <br>inherent vice.<br>

      i) Storm or Rain, whilst the property insured is contained in any building if on the happening of such loss or
      damage the building was already in<br> a damaged, defective, fallen or displaced condition.<br>

      j) To the property insured arising solely out of the bursting or tearing of bags.<br>

      The Insurers shall further not be liable for loss or damage:<br>

      k) If at the time of inception of cover the crop is not the Insured's bona fide property or if the Insured has no
      financial interest in such crop.<br>

      l) If the Insured fails or refuses to give all possible assistance in the investigation of any claim or fails to
      disclose any relevant <br>information or otherwise makes a false or incorrect statement or declaration concerned
      herewith.<br>
    </div>

    9. Political Risks <br>

    <div style="margin-left:6px;"> The following shall be excluded from this Policy, Any loss or damage occasioned by or
      through or in<br> consequence, directly or indirectly, of any of the following occurrences, namely:<br>

      a. War, invasion, act of foreign enemy, hostilities or warlike operations (whether war be declared or not), civil
      war.<br>

      b. Abandonment and/or permanent or temporary dispossession resulting from detention, confiscation, seizure,
      restraint, commandeering,<br> nationalization, appropriation, destruction or requisition by order of any
      government de jure or de facto or by any public authority.<br>

      c. Mutiny, civil commotion, military rising, insurrection, rebellion, revolution, military or usurped power,
      martial law or state of<br> siege or any of the events or causes which determine the proclamation or maintenance
      of martial law or state of siege.<br>

      d. Any riot, strike or public disorder or any act or activity which is calculated or directed <br>to bring about a
      riot, strike or public disorder in respect of Political events only.<br>

      e. Any act which is calculated or directed to bring about loss or damage in order to further any political
      aim,<br> objective or cause, or to bring about any social or economic change, or in protest against any State or
      government, or any political or local authority, or for the purpose of<br> imposing fear in the public or any
      section thereof.<br>

      f. The act of any lawfully established authority in controlling, preventing, suppressing or in any other <br>way
      dealing with any occurrence referred to in clauses (d) and (e) above.<br>

      g. Plundering, looting, war pillage in connection with riots and/or civil commotion. For the purposes of<br>
      clauses (d), (e) and (f), any loss or damage occasioned directly by a labor disturbance, lock-out or strike shall
      not be excluded. <br>In any action, suit or other proceeding in which the Insurer alleges that by reason of these
      provision any loss or <br>damage is not covered by this Policy, the burden of proving that such loss or damage is
      covered <br>shall be upon the Insured<br>
    </div>
    <div>
      <h5>GENERAL CONDITIONS</h5>

      <p><strong>1. INTERESTED PARTIES</strong><br>
        In the event of any stop orders or other charge on the crop, loss or damage if any is payable to the holder of
        such stop order or other charge holder whose receipt will be a full discharge.
      </p>

      <p><strong>2. OTHER INSURANCE</strong><br>
        If at the time of any loss or damage arising under this contract, there shall be any other insurance, whether
        effected by the Insured or by any other person or persons acting on his behalf covering such loss or damage or
        any part thereof,<br>
        the Insurers shall not be liable for other than its rateable proportion.
      </p>

      <p><strong>3. ARBITRATION</strong><br>
        All differences arising out of this Policy shall be referred to the decision of an Arbitrator to be appointed in
        writing by the insurer, Agriclime and the insured.<br>
        If the three parties do not agree on a single arbitrator, then three arbitrators will be appointed in writing by
        either party within one calendar month after having been required in writing to do so by either of the
        parties.<br><br>

        In case the appointed arbitrators do not agree, an umpire will be appointed in writing by the arbitrators.<br>
        The umpire shall sit with the arbitrators and preside at their meeting and the making of an award shall be on
        condition precedent to any right of action against the Company.<br><br>

        If the company shall disclaim liability to the insured for any claim hereunder and such claim shall not within
        twelve (12) calendar months from the date of such disclaimer have been referred to arbitration under the
        provisions herein contained,<br>
        then the claim shall for all purposes be deemed to have been abandoned and shall not thereafter be recoverable
        hereunder.<br><br>

        This Contract shall be governed by the Laws of Tanzania.<br>
        If any dispute or difference shall arise between the parties touching on this agreement or the construction
        hereof or any matter in any way arising out of this agreement,<br>
        the difference shall be referred to a single arbitrator if the parties agree upon one, otherwise to two
        arbitrators one to be appointed by each party in accordance with and subject to the provisions of the
        Arbitration Act<br>
        or any statutory modification thereof for the time being in force.
      </p>

      <p><strong>4. SUBROGATION</strong><br>
        In the event of any claim, the Insurers shall be entitled at its discretion to undertake in the name and on
        behalf of the Insured<br>
        the absolute control and settlement of any proceedings at its expense and for its own benefit<br>
        but in the name of the Insured to recover compensation or secure indemnity from any Third Party in respect of
        anything covered by this Contract of Insurance.
      </p>

      <p><strong>5. CANCELLATION</strong><br>
        This Policy may be cancelled by Insured by written notice to Alliance Insurance stating when, not less than 30
        days, thereafter the cancellation shall be effective.<br>
        This Policy may be cancelled by UAP by written notice to the insured of not less than fourteen (14) days.<br>
        The mailing of notice shall be sufficient proof of notice.<br>
        The time on risk premium shall be calculated on pro rata basis.<br><br>

        If the Insured cancels this Policy, 25% of the premium charged shall be deemed fully earned upon inception of
        the Policy<br>
        and the remaining earned premium shall be computed on pro rata basis.<br><br>

        The crop seasonal premium shall be deemed fully earned if any loss, damage, circumstance or Occurrence has been
        notified under this Policy.
      </p>

      <p><strong>6. CONDITIONS PRECEDENT</strong><br>
        The due observance and fulfilment of the terms conditions and endorsements of this Policy by the Insured in so
        far as they relate to anything to be done or complied with by the Insured<br>
        shall be conditions precedent to any liability of the Insurers to make any payment under this Policy.<br>
        No waiver of any of the terms conditions and endorsements of this Policy shall be valid unless in writing by a
        duly authorised officer of the Insurer.
      </p>

      <p><strong>7. PREVENTION OF LOSS</strong><br>
        The Insured shall exercise all ordinary and reasonable precautions:
      </p>
      <ul style="margin-top: -10px;">
        <li>for the maintenance protection and safety of the property insured.</li>
        <li>for the prevention of loss damage destruction or accidents;</li>
        <li>in the selection and supervision of employees;</li>
        <li>in the securing of all protections doors windows and other means of entry and exit;</li>
        <li>and shall comply with all statutory regulations and shall remedy and/or repair defects in the buildings ways
          works machinery and plant connected with or used in the business of the Insured.</li>
      </ul>
    </div>
    <div>
      <h5>8. CURRENCY</h5>
      <p style="margin-top: 0;">
        All sums of money mentioned in this Policy are in the currency of Tanzania shillings.
      </p>

      <h5>9. JURISDICTION</h5>
      <p style="margin-top: 0;">
        The indemnity provided by this Policy shall not apply to:
      </p>
      <ul style="margin-top: 0; padding-left: 20px;">
        <li>
          (a) Compensation for damages in respect of judgements not in the first instance
          delivered or obtained from a court of competent jurisdiction in Tanzania.
        </li>
        <li>
          (b) Costs and expenses of litigation which are not incurred and recoverable in Tanzania.
        </li>
      </ul>
    </div>


    <br>

    <div>Signed for and on behalf of ${data.CompanyName} <div>
        on this
        <input type="text" [(ngModel)]="signDay" class="screen-only"
          style="width: 40px; border: none; border-bottom: 1px solid #000;">
        day of
        <input type="text" [(ngModel)]="signMonth" class="screen-only"
          style="width: 100px; border: none; border-bottom: 1px solid #000;">
        20
        <input type="text" [(ngModel)]="signYear" class="screen-only"
          style="width: 40px; border: none; border-bottom: 1px solid #000;">
      </div>

    </div>

    <div style="display: flex; justify-content: flex-end; margin-top: 40px; margin-right: 145px;">
      <div style="text-align: right; width: 300px;">
        <p style="margin: 0;">
          <input type="text" readonly [(ngModel)]="authorisedSignatory"
            style="width: 100%; border: none; border-bottom: 1px solid #000; text-align: right;">
        </p>
        <p style="margin: 5px 0 0 0;">(Authorised Signatory)</p>
      </div>
    </div>
  </div>
</div>
    `;
    this.generatePdf();

  }


  // generatePdf() {
  //   const element = this.htmlTemplate;

  //   const options = {
  //     margin: [1, 0.5, 1, 0.5], // top, left, bottom, right
  //     filename: 'YARA_Rice_Policy.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     // html2canvas: { scale: 2, scrollY: 0 },
  //     html2canvas: { scale: 2, scrollY: 0, useCORS: true },
  //     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  //   };

  //   let logoPath = '';
  //   switch (this.insuranceId) {
  //     case '100046':
  //       logoPath = 'assets/images/phoenixAlt.png';
  //       break;
  //     case '100047':
  //       logoPath = 'assets/images/cropped-botwa.png';
  //       break;
  //     case '100048':
  //       logoPath = 'assets/images/PhoenixMozambique.png';
  //       break;
  //     case '100049':
  //       logoPath = 'assets/images/cropped-swaziland.png';
  //       break;
  //     case '100050':
  //       logoPath = 'assets/images/cropped-NAMIBIA-LOGO-1.png';
  //       break;
  //     case '100052':
  //       logoPath = 'assets/images/aic_logo.png';
  //       break;
  //     case '100002':
  //       logoPath = 'assets/images/alliance-img-1.png';
  //       break;
  //     case '100020':
  //       logoPath = 'assets/images/FirstAssurance.png';
  //       break;
  //     default:
  //       logoPath = 'assets/images/phoneix-logo.png';
  //   }

  //   const logoUrl = logoPath;

  //   html2pdf()
  //     .set(options)
  //     .from(element)
  //     .toPdf()
  //     .get('pdf')
  //     .then(async (pdf) => {
  //       const totalPages = pdf.internal.getNumberOfPages();
  //       const logo = await this.getImageAsBase64(logoUrl);

  //       for (let i = 1; i <= totalPages; i++) {
  //         pdf.setPage(i);

  //         if (logo) {
  //           pdf.addImage(logo, 'PNG', 0.5, 0.3, 1.2, 0.5);
  //         }
  //         pdf.setFontSize(12);
  //         // pdf.text('Alliance Insurance Company', 1.8, 0.6);


  //         pdf.setDrawColor(0);
  //         pdf.setLineWidth(0.01);
  //         pdf.line(0.5, 0.9, 7.9, 0.9);


  //         pdf.setFontSize(9);
  //         pdf.text('Head Office: 123 Insurance Ave, Dar es Salaam, Tanzania', 0.5, 10.9);
  //         pdf.text('Phone: +255 123 456 789 | Email: info@allianceinsurance.co.tz', 0.5, 11.1);
  //         pdf.text(`Page ${i} of ${totalPages}`, 6.4, 11.2);

  //         pdf.setDrawColor(0);
  //         pdf.setLineWidth(0.01);
  //         pdf.line(0.5, 10.7, 7.9, 10.7);
  //       }
  //     })
  //     .save();
  // }
  generatePdf() {
    const element = this.htmlTemplate;

    const options = {
      margin: [1, 0.5, 1, 0.5],
      filename: 'YARA_Rice_Policy.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, scrollY: 0, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    let logoPath = '';
    switch (this.insuranceId) {
      case '100046':
        logoPath = 'assets/images/phoenixAlt.png';
        break;
      case '100047':
        logoPath = 'assets/images/cropped-botwa.png';
        break;
      case '100048':
        logoPath = 'assets/images/PhoenixMozambique.png';
        break;
      case '100049':
        logoPath = 'assets/images/cropped-swaziland.png';
        break;
      case '100050':
        logoPath = 'assets/images/cropped-NAMIBIA-LOGO-1.png';
        break;
      case '100052':
        logoPath = 'assets/images/aic_logo.png';
        break;
      case '100002':
        logoPath = 'assets/images/alliance-img-1.png';
        break;
      case '100020':
        logoPath = 'assets/images/FirstAssurance.png';
        break;
      default:
        logoPath = 'assets/images/phoneix-logo.png';
    }

    html2pdf()
      .set(options)
      .from(element)
      .toPdf()
      .get('pdf')
      .then(async (pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const logo = await this.getImageAsBase64(logoPath);

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);

          if (logo) {
            pdf.addImage(logo, 'PNG', 0.5, 0.3, 1.2, 0.5);
          }
          pdf.setFontSize(12);
          pdf.setDrawColor(0);
          pdf.setLineWidth(0.01);
          pdf.line(0.5, 0.9, 7.9, 0.9);

          pdf.setFontSize(9);
          pdf.text('Head Office: 123 Insurance Ave, Dar es Salaam, Tanzania', 0.5, 10.9);
          pdf.text('Phone: +255 123 456 789 | Email: info@allianceinsurance.co.tz', 0.5, 11.1);
          pdf.text(`Page ${i} of ${totalPages}`, 6.4, 11.2);
          pdf.line(0.5, 10.7, 7.9, 10.7);
        }


        const pdfBlob = pdf.output('blob');


        const file = new File([pdfBlob], 'YARA_Rice_Policy.pdf', { type: 'application/pdf' });


        // const ReqObj = {
        //   QuoteNo: 'AICQ15991'
        // };
        const urlLink = `${this.CommonApiUrl}api/yara/document/upload`;

        this.sharedService.onPostDocumentMethodSynQuote(urlLink, this.PdfGetQuoteNo, file).subscribe(
          (data: any) => {
            console.log('Upload success', data);
          },
          (err) => {
            console.error('Upload error', err);
          }
        );
      });
  }



  getImageAsBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } else {
          reject('Canvas context is null.');
        }
      };
      img.onerror = function () {
        reject('Failed to load image.');
      };
      img.src = url;
    });
  }
  onFileUploadCommonList() {

    let docList = this.uploadDocList;
    if (docList.length != 0) {
      let i = 0;
      for (let doc of docList) {
        let ReqObj = {
          "QuoteNo": 'AICQ15991'
        }
        let urlLink = `${this.CommonApiUrl}api/yara/document/upload`;
        this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj, doc.url).subscribe(
          (data: any) => {

          },
          (err) => { },
        );
      }
    }
  }
}
