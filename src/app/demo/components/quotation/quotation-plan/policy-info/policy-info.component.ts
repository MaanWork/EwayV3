import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/_services/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import Swal from 'sweetalert2';
import { QuotationPlanComponent } from '../quotation-plan.component';

@Component({
  selector: 'app-policy-info',
  templateUrl: './policy-info.component.html',
})
export class PolicyInfoComponent {
  sidebarVisible: boolean = false;
  accessories: MenuItem[] = []; loginId: any = null;
  userDetails: any = null; insuranceId: any = null; productId: any = null;
  userType: any = null; branchCode: any = null; quoteNo: any = null; chassisNo: any = null;
  quoteRefNo: any = null; Section: boolean = false; buildingDetailsSection: boolean = false;
  newten: boolean = false; minDate: any = null; maxDate: any = null; accessoriesType: any = null;
  endorsementSection: boolean = false; orgPolicyNo: any = null; endorsementId: any = null; actualAssSI: any = null;
  enableFieldsList: any[] = []; enableAllSection: any = null; endorsePolicyNo: any = null; totalAccessoriesSI: any = '0';
  endorseCategory: any = null; endorsementName: any = null; newacc: any = null; serialNoDesc: any = null; sectionDetails: any = null;
  employeeOccupationList: any[] = []; actualAccessoriesSI: any = null; SumInsured: any = null; enableAccessoriesEditSection: boolean = false;
  accessoriesList: any[] = []; currentAccessoriesIndex: any = null; editAccessoriesSection: boolean = false; ChassisList: any[] = [];
  totalAccSIError: any = null; AccLists: any[] = []; CoverList: any[] = []; sumInsuredDetails: any = null; item: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl; productItem: any = null;
  quoteDetails: any = null; Riskdetails: any = null; customerDetails: any
  accessoriesSection: boolean = false; loadingSection: boolean = false;
  successSection: boolean = false; paymentDetails: any = null; policyNo: any = null;
  policySection: boolean = false; mobilePaymentPending: boolean = false; totalPremium: any = null;
  EmiYn: any = null; emiPeriod: any = null; emiMonth: any = null;
  stickerNo: any = null; CoverNoteNo: any = null; endtPremium: any = null;
  displayPayment: boolean = false;
  docTypes: any[] = []; cancelEndorse: boolean = false;
  documentSection: boolean;
  columns: any[] = [];
  creditBalance: any = null;
  constructor(private router: Router, private datePipe: DatePipe, private quoteComponent: QuotationPlanComponent,
    private sharedService: SharedService, public http: HttpClient) {
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.quoteNo = sessionStorage.getItem('quoteNo');
    console.log("item received", homeObj);
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if (this.productId == '5' || this.productId == '29') {
      this.buildingDetailsSection = false;
    }
    else if (this.productId != '43') {
      this.buildingDetailsSection = true;
      // let items = this.item?.find((Code) => Code == '1' || Code=='40');
      // console.log('JJJJJJJJJJJJJJJJJJ',items);
    }
    if (this.productId == '43') {
      this.newten = true;

    }
    sessionStorage.removeItem('emiPayment')
  }
  ngOnInit() {
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    //this.fourth=false;
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if (sessionStorage.getItem('endorsePolicyNo')) {
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if (endorseObj) {
        this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
        this.endorsementId = endorseObj.EndtTypeId;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        console.log('Enables fields Section', this.enableFieldsList);
        let enableAllSection = this.enableFieldsList.some(ele => ele == 'domesticRiskDetails' || ele == 'AddCovers' || ele == 'AccessoriesSI');
        console.log('Enables Add Section', enableAllSection);
        if (enableAllSection) this.enableAllSection = true;
        else this.enableAllSection = false;
        this.endorsePolicyNo = endorseObj?.PolicyNo;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        console.log("Enable Obj in Vehicle", this.enableFieldsList, this.endorsementId)
        if (this.endorsementId == 42 || this.endorsementId == 842) this.cancelEndorse = true;
        else this.cancelEndorse = false;
        // if(this.endorsementId!=42 && this.endorsementId!=842){
        //     this.enableFieldName = this.enableFieldsList.some(ele=>ele=='InsuranceType');
        // }
      }
    }
    if (this.quoteNo) {
      this.loadingSection = true;
      this.getEditQuoteDetails();
    }
  }
  getEditQuoteDetails() {
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          let quoteDetails = data?.Result?.QuoteDetails;
          this.quoteDetails = data?.Result?.QuoteDetails;
          this.quoteRefNo = data?.Result?.QuoteDetails?.RequestReferenceNo;
          this.Riskdetails = data.Result?.RiskDetails;
          this.quoteComponent.currencyCode = this.quoteDetails?.Currency;
          this.quoteComponent.setRiskDetails(this.Riskdetails);
          this.endtPremium = quoteDetails?.TotalEndtPremium;
          if (this.loadingSection && this.quoteDetails?.policyNo != null && this.quoteDetails?.policyNo != '') {
            this.paymentDetails = {
              "QuoteNo": this.quoteNo,
              "PolicyNo": this.quoteDetails?.policyNo,
              "MerchantReference": this.quoteDetails?.MerchantReference,
              "DebitNoteNo": this.quoteDetails?.DebitNoteNo,
              "CreditNoteNo": this.quoteDetails?.CreditNo,
            };
            this.policyNo = data?.Result?.PolicyNo;
            this.policySection = true;
            this.successSection = false;
            this.loadingSection = false;
            if (sessionStorage.getItem('CBCNo')) { this.getCreditBalance() }
            if (this.orgPolicyNo != undefined && this.endorsementSection && (this.endtPremium == null || this.endtPremium == '' || this.endtPremium == 0 || this.endtPremium == undefined) && !this.cancelEndorse) {
              this.updateEndorseStatus();
            }
            if (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050' || this.insuranceId == '100019') {
              if (this.quoteDetails?.policyNo != '' && this.quoteDetails?.policyNo != null && this.quoteDetails?.policyNo != undefined) {
                this.quote();
              }
            }
            //else this.updateTiraDetails();
            // this.getTiraDetails();
          }
          else {
            this.checkStatus();
          }
        }
      },
      (err) => { },
    );
  }
  getCreditBalance() {
    let urlLink = `${this.CommonApiUrl}credit/balance/${this.quoteNo}`;
    this.sharedService.onGetMethod(urlLink).subscribe(
      (data: any) => {
        this.creditBalance = data?.BalanceAmount;
      });
  }
  updateEndorseStatus() {
    let ReqObj = {
      "QuoteNo": this.quoteNo,
      "PolicyNo": this.orgPolicyNo,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}endorsment/changeEndtStatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          // this.IsChargeOrRefund = null;
          // this.paymentDetails = {
          //   "QuoteNo": this.quoteNo,
          //   "PolicyNo": this.endorsePolicyNo
          // }
          // this.router.navigate(['/quotation/plan/main/policy-info']);

        }
      },
      (err) => { },
    );
  }
  checkStatus() {
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${this.quoteNo}`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.result == 'FAIL') {
          if (this.quoteDetails?.EmiYn != null) {
            this.EmiYn = this.quoteDetails.EmiYn;
            this.emiPeriod = this.quoteDetails.InstallmentPeriod;
            this.emiMonth = this.quoteDetails.InstallmentMonth;
            //if(this.EmiYn=='Y') this.getCurrentEmiDetails();
          }
          else {
            this.EmiYn = "N";
            this.emiPeriod = null;
            this.emiMonth = null;
          }
          if (this.endorsementSection) {
            this.totalPremium = this.quoteDetails?.TotalEndtPremium;
          }
          else {
            if (this.EmiYn != 'Y') {
              this.totalPremium = this.quoteDetails?.OverallPremiumFc;
            }
            else {
              this.totalPremium = this.quoteDetails?.DueAmount;
            }
          }
        }
        else {
          if (this.quoteDetails?.policyNo != null && this.quoteDetails?.policyNo != '' && this.quoteDetails?.policyNo != undefined) {
            this.paymentDetails = {
              "QuoteNo": this.quoteNo,
              "PolicyNo": this.quoteDetails?.policyNo,
              "MerchantReference": this.quoteDetails?.MerchantReference,
              "DebitNoteNo": this.quoteDetails?.DebitNoteNo,
              "CreditNoteNo": this.quoteDetails?.CreditNo,
            };
            this.policyNo = data?.Result?.PolicyNo;
            this.policySection = true;
            this.successSection = false;
            this.mobilePaymentPending = false;
            if (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050' || this.insuranceId == '100019') {
              if (data.Result.PolicyNo != '' && data.Result.PolicyNo != null && data.Result.PolicyNo != undefined) {
                this.quote();
              }
            }
            //else this.updateTiraDetails();
          }
          else {
            if (!this.mobilePaymentPending) this.loadingSection = true;
            this.getEditQuoteDetails();
          }
        }
      });
  }
  updateTiraDetails() {
    let ReqObj = {
      "QuoteNo": this.quoteNo,
    }
    let urlLink = `${this.CommonApiUrl}payment/pushtira`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          if (data?.Result?.Response == 'Success') this.getTiraDetails();
        }
      },
      (err) => { },
    );
  }
  getTiraDetails() {
    let urlLink = `${this.CommonApiUrl}payment/gettira/${this.quoteNo}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.policySection = true;
          this.stickerNo = data?.Result?.StickerNumber;
          this.CoverNoteNo = data?.Result?.CoverNoteNo;
        }
      },
      (err) => { },
    );
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
  onGetSchedule(rowData) {
    if (this.productId == '4' && this.insuranceId =='100002') {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', `${this.CommonApiUrl}pdf/view/Certificate/${rowData.QuoteNo}?travelYN=Y`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    else {
      let ReqObj = {
        "QuoteNo": rowData.QuoteNo
      }
      if (this.endorsementSection) ReqObj['EndorsementType'] = 'E';
      let urlLink = `${this.CommonApiUrl}pdf/policyform`;
      // let ReqObj = {
      //   "QuoteNo": rowData.QuoteNo,
      //   "ReportId": "6"
      // }
      // let urlLink = `${this.CommonApiUrl}pdf/getSchedule`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.ErrorMessage.length != 0) {
            if (data.ErrorMessage) {
            }
          }
          else {
            if (data?.Result?.PdfOutFile) {
              this.downloadMyFile(data.Result.PdfOutFile);
            }
            else {
              Swal.fire({
                title: '<strong>Schedule Pdf</strong>',
                icon: 'error',
                html:
                  `No Pdf Generated For this Policy`,
                showCancelButton: false,
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
  onGetDocumentTypes(rowData) {
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}pdf/getApiDocList/${this.quoteNo}`;
    this.sharedService.onGetMethod(urlLink).subscribe(
      (data: any) => {
        if (data.Result.length != 0) { this.docTypes = data.Result; }
        else {
          this.docTypes = [{

            "FileCode": "3875997",

            "FileName": "MOT_PSCH_18521_0.pdf",

            "FileType": ".pdf",

            "FilePath": "\\\\192.168.1.99\\Users\\CommonPath\\EwayPortal\\PolicyReport\\",

            "QuoteNo": "EAG-Q01764",

            "PolicyNo": "P1100D000338",

            "CustomerName": "Baraka Hamsi Msumi"

          },

          {

            "FileCode": "3875998",

            "FileName": "MOT_VIG_INS_18521_0.pdf",

            "FileType": ".pdf",

            "FilePath": "\\\\192.168.1.99\\Users\\CommonPath\\EwayPortal\\PolicyReport\\",

            "QuoteNo": "EAG-Q01764",

            "PolicyNo": "P1100D000338",

            "CustomerName": "Baraka Hamsi Msumi"

          },

          {

            "FileCode": "3875999",

            "FileName": "MOT_DB_NOTE_18521_0.pdf",

            "FileType": ".pdf",

            "FilePath": "\\\\192.168.1.99\\Users\\CommonPath\\EwayPortal\\PolicyReport\\",

            "QuoteNo": "EAG-Q01764",

            "PolicyNo": "P1100D000338",

            "CustomerName": "Baraka Hamsi Msumi"

          },

          {

            "FileCode": "3876000",

            "FileName": "MOT_ATTEST_18521_0.pdf",

            "FileType": ".pdf",

            "FilePath": "\\\\192.168.1.99\\Users\\CommonPath\\EwayPortal\\PolicyReport\\",

            "QuoteNo": "EAG-Q01764",

            "PolicyNo": "P1100D000338",

            "CustomerName": "Baraka Hamsi Msumi"

          },

          {

            "FileCode": "3876001",

            "FileName": "MOT_SUM_INS_18521_0.pdf",

            "FileType": ".pdf",

            "FilePath": "\\\\192.168.1.99\\Users\\CommonPath\\EwayPortal\\PolicyReport\\",

            "QuoteNo": "EAG-Q01764",

            "PolicyNo": "P1100D000338",

            "CustomerName": "Baraka Hamsi Msumi"

          },

          {

            "FileCode": "3876002",

            "FileName": "MOT_SUM_INS_18521_0.pdf",

            "FileType": ".pdf",

            "FilePath": "\\\\192.168.1.99\\Users\\CommonPath\\EwayPortal\\PolicyReport\\",

            "QuoteNo": "EAG-Q01764",

            "PolicyNo": "P1100D000338",

            "CustomerName": "Baraka Hamsi Msumi"

          }

          ]
        }
        this.documentSection = true;
        this.columns = ['S.No', 'Document Name', 'Download']
      });

  }
  onGetQuoteSchedule() {
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.ErrorMessage.length != 0) {
          if (data.ErrorMessage) {
          }
        }
        else {
          if (data?.Result?.PdfOutFile) {
            this.downloadMyFile(data.Result.PdfOutFile);
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
  onDownloadDocument(index, rowData) {
    let ReqObj = {
      "QuoteNo": this.quoteNo,
      "FileCode": rowData.FileCode
    }
    let urlLink = `${this.CommonApiUrl}pdf/download/ApiDoc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.ErrorMessage.length != 0) {
          if (data.ErrorMessage) {
          }
        }
        else {
          if (data?.Result?.PdfOutFile) {
            this.downloadMyFileDoc(data.Result.PdfOutFile, rowData.FileName);
          }
          else {
            Swal.fire({
              title: '<strong>Pdf Document</strong>',
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
  downloadMyFileDoc(data, name) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', data);
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    link.remove();
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
  navigateTo() {
    if (this.endorsementSection) this.router.navigate(['/portfolio/endorsement']);
    else this.router.navigate(['/portfolio']);
  }
  quote() {
    let d = {
      "QuoteNo": this.quoteNo,
    }
    let urlLink = `${this.CommonApiUrl}push/integration/quote`;
    this.sharedService.onPostMethodSync(urlLink, d).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          console.log(data.Result);

        }
      },
      (err) => { },
    );
  }
}
