import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SharedService } from 'src/app/_services/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { DatePipe } from '@angular/common';
import { s } from '@fullcalendar/core/internal-common';
interface Plan {
  title: string;
  excess: number;
  totalSum: number;
  year: number;
  discount: number
}
@Component({
  selector: 'app-cover-details',
  templateUrl: './cover-details.component.html',
  styleUrls: ['./cover-details.component.css'],
  providers: [MessageService]
})
export class CoverDetailsComponent {
  [x: string]: any;
  plans: Plan[] = [
    { title: 'Cash/ Cheque etc', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Geographical Extension', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Electronic Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Other Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
  ];
  emiAllList: any[] = [];
  tabIndex: any = 0;
  years: MenuItem[] = [];
  vehicles: MenuItem[] = [];
  sidebarVisible: boolean = false;
  userDetails: any = null; userType: any = null;
  subuserType: any = null; agencyCode: any = null;
  branchCode: any = null; branchList: any[] = [];
  productId: any = null; productName: any = null;
  insuranceId: any = null; brokerbranchCode: any = null;
  loginType: any = null; finalizeYN: any = 'N';
  localCurrency: any;
  loginId: any; jsonList: any[] = [];
  json: any[] = [];
  sampleloginId: any;
  endorsementSection: boolean = false;
  endorsementCategory: any = null;
  endorsementId: any = null;
  endorseEffectiveDate: any = null;
  enableFieldsList: any[] = [];
  coverModificationYN: any = null;
  endorseCovers: boolean = false;
  endorseSIModification: boolean = false;
  endorseAddOnCovers: boolean = false;
  enableAddVehicle: boolean = false;
  enableRemoveVehicle: boolean = false;
  enableSections: boolean = false;
  statusList: any[] = [];
  quoteRefNo: string;
  requestReferenceNo: string;
  minDate: Date;
  maxDate: Date;
  quoteNo: string;
  statusValue: any = null;
  adminSection: boolean;
  vehicleDetailsList: any[] = [];
  isMannualReferal: any = 'N';
  selectedRowData: any;
  coverSection: boolean;
  vehicleData: any[];
  customerDetails: any;
  viewList: any; ClausesDataId: any[] = [];
  ClausesData: any[] = [];
  ExclusionData: any[] = [];
  WarrantyData: any[] = [];
  WarrteData: any[] = [];
  clause: boolean = false;
  ExclusionDataId: any[] = [];
  WarrantyDataId: any[] = [];
  onClauses: boolean = false;
  onWarranty: boolean = false;
  onExclusion: boolean = false; selectedVehicleList: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public CommonCalcApiUrl: any = this.AppConfig.CommonCalcApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  emipolicytype: any = null; minCoverRatePercent: any = null;
  SourceType: any = null; commissionValue: any = null;
  commissionPercent: any = null;
  policyStartDate: any = null;
  policyEndDate: any = null;
  uwReferralSection: boolean = false;
  endorsementType: any;
  havePromoCode: any = 'N';
  promoCode: any;
  adminRemarks: any;
  ExclusionList: any[] = [];
  currencyCode: any = null;
  showSection: boolean = false;
  selectedCoverList: any[] = [];
  localPremiumCost: any = null;
  totalPremium: any = null;
  emiYN: any = 'N';
  emiPeriod: any = "0";
  gridshow: boolean = false;
  yearlySection: boolean = false;
  nineMonthSection: boolean = false;
  sixMonthSection: boolean = false;
  threeMonthSection: boolean = false;
  fiveMonthSection: boolean = false;
  eightMonthSection: boolean;
  Emilist1: any[] = [];
  emiSection: boolean = false;
  rejectedReason: any = null;
  selectedVehId: any = null;
  selectedCoverId: any = null;
  ratePercent: any = null;
  CoverName: any = null;
  minimumPremiumYN: any = null;
  discountList: any = [] = [];
  loadingList: any = [] = [];
  discountEndtSection: boolean = false;
  sumInsured: any = null;
  calcType: any = null;
  excessPercent: any = null;
  excessAmount: any = null;
  differenceSI: any = null;
  differencePremium: any = null;
  beforeDiscount: any = null;
  selectedSectionId: any = null; discountDetailModal: boolean = false;
  afterDiscount: any = null; excessDetailModal: boolean = false;
  customerObj: any = null; customerReferenceNo: any = null; termsSectionList: any[] = [];
  emistatus: string; coverlist: any[] = []; remarks: any = null; termsSectionId: any = null; newcoverlist: any[] = []; subCoverDetailModal: boolean = false;
  inserts: any = null; subCoverColumns: any[] = []; noOfDays: any = null; verticalSection: boolean = false; EmiDetails: any[] = []; showCoverList: boolean = false; MinimumPremium: any = null; premiumExcluedTax: any = null;
  premiumIncluedTax: any = null; dependantTaxList: any[] = []; taxList: any[] = []; premiumBeforeTax: any = null;
  proRataPercent: any = null; premiumAfterDiscount: any = null; fleetCoverDetails: any; columns: any[] = []; basePremium: any; premiumIncludedTax: any; premiumExcludedTax: any; factorViewList: any[] = []; factorPremiumDetails: any = null; factorDetailModal: boolean = false;
  newAddClauses: boolean = false; newAddExclusion: boolean = false; newAddWarranty: boolean = false;
  fleetDiscountModal: boolean = false; minTaxList: any[] = []; minPremiumExcludedTax: any = null; minCoverName: any; minBasePremium: any; minPremiumIncludedTax: number;
  b2cType: any; lang: any = null;
  BenefitPopup: boolean = false;
  position: string;
  CoverList: any[] = [];
  endorsementDate: any;
  endorsementEffectiveDate: any;
  endorsementTypeDesc: any;
  endorsementRemarks: any;
  endtCategoryDesc: any;
  endtPrevQuoteNo: any;
  endtCount: any;
  endtStatus: any;
  endtPrevPolicyNo: any;
  orginalPolicyNo: any;
  isFinanceEndt: any;
  renderedCount: any = 0;
  yearlyName: any;
  nineMonthName: any;
  sixMonthName: any;
  threeMonthName: any;
  fiveMonthName: any;
  eightMonthName: any;
  twoMonthSection: boolean;
  twoMonthName: any = null;
  commonSection: boolean;
  commonName: any;
  commonValue: any; commonSection1: boolean;
  commonName1: any;
  commonValue1: any; commonSection2: boolean;
  commonName2: any;
  commonValue2: any; commonSection3: boolean;
  commonName3: any;
  commonValue3: any; commonSection4: boolean;
  commonName4: any;
  commonValue4: any;
  emiShowYN: any = 'N';
  twoValue: any;
  threeValue: any;
  fiveValue: any;
  eightValue: any;
  nineValue: any; excessDetailModal1: boolean = false; tableList: any[] = [];
  sixValue: any; excessList: any[] = [];
  selectedCover: any
  planDetails: any;
  showExcessPopup: boolean = false; brokerCommissionPercentage: any
  constructor(private router: Router, private sharedService: SharedService, private messageService: MessageService,
    private translate: TranslateService, private appComp: AppComponent, private datePipe: DatePipe, private route: ActivatedRoute
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let loginType = sessionStorage.getItem('resetLoginDetails');
    this.userType = this.userDetails?.Result?.UserType;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.b2cType = sessionStorage.getItem('b2cType');
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName = this.userDetails.Result.ProductName;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.subuserType = sessionStorage.getItem('typeValue');
    if (this.subuserType == 'b2c' || this.subuserType == 'B2C Broker') { }
    this.loginType = this.userDetails.Result.LoginType;
    let finalize = sessionStorage.getItem('FinalizeYN');
    if (finalize) this.finalizeYN = finalize;
    if (loginType) {
      sessionStorage.removeItem('resetLoginDetails');
      let sectionType = sessionStorage.getItem('riskSection');
      if (sectionType == 'additional') this.router.navigate(['quotation/plan/main/accessories']);
      else if (this.productId == '4') this.router.navigate(['/quotation/plan/travel-quote-details']);
      else if (this.productId != '5' && this.productId != '46' && this.productId != '29' && this.productId != '1' && this.productId != '63') this.router.navigate(['quotation/plan/main/accessories']);
      else {
        if (this.insuranceId != '100002') {
          if (this.userType != 'Broker') {
            this.router.navigate(['/quotation/plan/co-insurance-details'])
          }
          else {
            this.router.navigate(['/quotation/plan/main/document-info'])
          }
        }
        else {
          this.router.navigate(['/quotation/plan/main/document-info'])
        }
      }
    }
    this.localCurrency = this.userDetails.Result.CurrencyId;
    this.loginId = this.userDetails.Result.LoginId;
    this.sampleloginId = this.loginId;
    this.appComp.getLanguage().subscribe((res: any) => {
      if (res) this.lang = res;
      else this.lang = 'en';
      this.translate.setDefaultLang(this.lang);
    });
    if (!this.lang) {
      if (sessionStorage.getItem('language')) this.lang = sessionStorage.getItem('language');
      else this.lang = 'en';
      sessionStorage.setItem('language', this.lang)
      this.translate.setDefaultLang(sessionStorage.getItem('language'));
    }
    sessionStorage.removeItem('vehicleDetailsList');
    let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
    if (endorseObj) {
      this.endorsementSection = true;
      console.log("Endorse obj", endorseObj)
      this.endorsementCategory = endorseObj.Category;
      this.endorsementId = endorseObj.EndtTypeId;
      this.endorseEffectiveDate = endorseObj?.EffectiveDate;
      this.enableFieldsList = endorseObj.FieldsAllowed;
      this.endorsementDate = endorseObj.EndorsementDate;
      this.endorsementEffectiveDate = endorseObj.EndorsementEffectiveDate;
      this.endorsementRemarks = endorseObj.EndorsementRemarks;
      this.endorsementType = endorseObj.EndorsementType;
      this.endorsementTypeDesc = endorseObj.EndorsementTypeDesc;
      this.endtCategoryDesc = endorseObj.EndtCategoryDesc;
      this.endtCount = endorseObj.EndtCount;
      this.endtPrevQuoteNo = endorseObj.EndtPrevQuoteNo;
      this.endtStatus = endorseObj.EndtStatus;
      this.endtPrevPolicyNo = endorseObj.EndtPrevPolicyNo;
      this.isFinanceEndt = endorseObj.IsFinanceEndt;
      this.orginalPolicyNo = endorseObj.OrginalPolicyNo;
      let entry = this.enableFieldsList.some(ele => ele == 'Covers' || ele == 'RemoveSection' || ele == 'AddOnCovers' || ele == 'AddCovers' || ele == 'removeVehicle');
      if (entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
      else this.coverModificationYN = 'N';
      console.log("Enable Obj", this.enableFieldsList)
      if (this.endorsementId != 42) {
        this.endorseCovers = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId == 852);
        this.endorseSIModification = this.enableFieldsList.some(ele => (ele == 'Covers' && this.endorsementId == 850));
        this.endorseAddOnCovers = this.enableFieldsList.some(ele => ele == 'AddOnCovers' || ele == 'AddCovers');
        this.enableAddVehicle = this.enableFieldsList.some(ele => ele == 'addVehicle');
        this.enableRemoveVehicle = this.enableFieldsList.some(ele => ele == 'removeVehicle');
        this.enableSections = this.enableFieldsList.some(ele => ele == 'RemoveSection');
      }
      else {
        this.endorseSIModification = false;
        this.endorseCovers = false;
        this.enableAddVehicle = false;
        this.endorseAddOnCovers = false;
        this.enableRemoveVehicle = false;
        this.enableSections = false;
      }
    }
    else {
      this.endorsementSection = false;
      this.endorseCovers = false;
    }
    this.columns = ["Id", "Description"];
    this.subCoverColumns = ['Select', 'SubCoverName', 'Premium']
    this.statusList = [
      { "Code": "RP", "CodeDesc": "Referral Pending" },
      { "Code": "RA", "CodeDesc": "Referral Approved" },
      { "Code": "RR", "CodeDesc": "Referral Rejected" },
      { "Code": "RE", "CodeDesc": "Referral Re-Quote" },
      { "Code": "REV", "CodeDesc": "Referal Reverted" },
    ];
    // this.excessList = [
    //   {"SectionId":"10","CoverId":"5","ExcessDesc":"Excess Desc 1","SectionName":"Comprehensive","CoverName":"Base Cover","ExcessPercent":"2","ExcessAmount":"10000"},
    //   {"SectionId":"10","CoverId":"18","ExcessDesc":"Excess Desc 2","SectionName":"Comprehensive","CoverName":"Excess PVT","ExcessPercent":"4","ExcessAmount":"25000"},
    //   {"SectionId":"10","CoverId":"89","ExcessDesc":"Excess Desc 3","SectionName":"Comprehensive","CoverName":"Extension of Geographical Limits beyond East Africa","ExcessPercent":"5","ExcessAmount":"30000"},
    //   {"SectionId":"10","CoverId":"11","ExcessDesc":"Excess Desc 4","SectionName":"Comprehensive","CoverName":"Geographical Limits","ExcessPercent":"4","ExcessAmount":"45000"},
    //   {"SectionId":"10","CoverId":"14","ExcessDesc":"Excess Desc 5","SectionName":"Comprehensive","CoverName":"Excess Buy Back","ExcessPercent":"2","ExcessAmount":"55000"},
    // ]
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    this.requestReferenceNo = this.quoteRefNo;
    this.minDate = new Date();
    var d = this.minDate;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.maxDate = new Date(year, month, day + 90);
    let quoteNo = sessionStorage.getItem('quoteNo');
    if (quoteNo) this.quoteNo = quoteNo;
    let referenceNo = sessionStorage.getItem('customerReferenceNo');
    if (referenceNo) {
      this.getCustomerDetails(referenceNo);
      this.getTermsSectionList();
      //this.viewCondition('direct');
    }
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRE') {
      if (quoteStatus == 'AdminRP') this.statusValue = "RP";
      else if (quoteStatus == 'AdminRA') this.statusValue = "RA";
      else if (quoteStatus == 'AdminRE') this.statusValue = "RE";
      this.adminSection = true;
    }
    else {
      if (quoteStatus) this.statusValue = quoteStatus;
      this.adminSection = false;
    }
    if (this.productId == '5' || this.productId == '59' || this.productId == '19' || this.productId == '46' || this.productId == '29') {
      //let vehicles = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      let vehicles: any;
      if (this.statusValue == 'RA') {
        this.getUpdatedVehicleDetails();
      }
      else {
        if (vehicles && (this.productId == '5' || this.productId == '46' || this.productId == '29')) {
          let vehicleList = [];
          let i = 0;
          for (let veh of vehicles) {
            if (i == 0) veh['Collapse'] = true;
            else veh['Collapse'] = false;
            i += 1;
            vehicleList.push(veh);
            if (i == vehicles.length) {
              this.vehicleDetailsList = vehicleList;
              if (this.vehicleDetailsList.some(ele => ele.ManualReferalYn == 'Y') && !this.adminSection) {
                this.isMannualReferal = "Y";
              }
              if (this.statusValue == 'RP' && !this.adminSection) {
                if (!this.vehicleDetailsList.some(ele => ele.Status == 'RP') && this.isMannualReferal != 'Y') {
                  this.statusValue = null;
                  sessionStorage.removeItem('QuoteStatus')
                }
              }
              this.selectedRowData = this.vehicleDetailsList[0];
              this.onSelectSection();
              this.coverSection = true;
            }
          }
        }
        else {
          this.getUpdatedVehicleDetails();
        }
      }
    }
    else if (this.productId != '5' && this.productId != '59' && this.productId != '19' && this.productId != '46' && this.productId != '29') {
      // let coverListObj = JSON.parse(sessionStorage.getItem('travelCoverListObj'));
      // if(coverListObj){
      //   this.getCoverList(coverListObj);
      // }
      this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
      this.requestReferenceNo = this.quoteRefNo;
      let quoteNo = sessionStorage.getItem('quoteNo');
      if (quoteNo) this.quoteNo = quoteNo;
      this.getUpdatedVehicleDetails();
    }
    this.jsonList = [
      {
        "TypeId": "D",
        "DocRefNo": null,
        "DocumentId": null,
        "Id": "6",
        "SubId": null,
        "SubIdDesc": ""
      }
    ];
    this.ExclusionList = [
      {
        "TypeId": "D",
        "Id": "7",
        "SubId": null,
        "SubIdDesc": "",
        "DocRefNo": null,
        "DocumentId": null,
      }
    ]
    this.json = [
      {
        "TypeId": "D",
        "Id": "4",
        "SubId": null,
        "SubIdDesc": "",
        "DocRefNo": null,
        "DocumentId": null,
      }
    ];
  }
  onViewFactorDetails() {
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "VehicleId": this.selectedRowData?.Vehicleid,
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "SectionId": this.selectedRowData?.SectionId
    }
    let urlLink = `${this.CommonApiUrl}api/getfactorratedetailsList`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.factorViewList = data.Result.FactorCalculationRes;
          this.factorPremiumDetails = data.Result.FactorResultRes;
          this.factorDetailModal = true;
        }
      },
      (err) => { },
    );
  }
  getCoverNameDesc(rowData) {
    if (this.lang == 'en') return rowData.CoverName;
    else return rowData.CoverNameLocal;
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  onSelectSection() {
    console.log("Current Id", this.selectedRowData)
    if (this.selectedRowData != null) {
      this.coverSection = false;
      this.selectedVehicleList = [this.selectedRowData]
      this.coverSection = true;
    }
  }
  checkHeaderName(val) {
    let name = val.replaceAll(' ', '');
    return 'PREMIUM.' + name
  }
  getHeaderName(menu) {
    if (this.productId == '5' || this.productId == '46') {
      let name = menu.RiskDetails.Registrationnumber;
      if (menu.SectionName != null) {
        name = name + ` (${menu.SectionName})`
      }
      return name;
    }
    else if (this.productId == '4') {
      if (menu.RiskDetails.TravelId == '1') return `Kids (${menu.RiskDetails.TotalPassengers})`;
      if (menu.RiskDetails.TravelId == '2') return `Adults (${menu.RiskDetails.TotalPassengers})`;
      if (menu.RiskDetails.TravelId == '3') return `Seniors (${menu.RiskDetails.TotalPassengers})`;
      if (menu.RiskDetails.TravelId == '4') return `Super Seniors (${menu.RiskDetails.TotalPassengers})`;
      if (menu.RiskDetails.TravelId == '5') return `Grand Seniors (${menu.RiskDetails.TotalPassengers})`;
    }
    else if (this.productId == '1' || this.productId == '14' || this.productId == '32' || this.productId == '61' || this.productId == '39' || this.productId == '25' || this.productId == '16' || this.productId == '6' || this.productId == '69' || this.productId == '68' || this.productId == '70' || this.productId == '67' || this.productId == '66' || this.productId == '93' || this.productId == '92'
      || this.productId == '71' || this.productId == '57' || this.productId == '72' || this.productId == '75' || this.productId == '49' || this.productId == '73' || this.productId == '74' || this.productId == '26' || this.productId == '27' || this.productId == '48' || this.productId == '78' || this.productId == '76' || this.productId == '77') return menu.LocationName;
    else if (this.productId != '59' && this.productId != '19' && this.productId != '4' && this.productId != '5' && this.productId != '6' && this.productId != '19' && this.productId != '14' && this.productId != '32') return this.productName;
    else if (this.productId == '59' || this.productId == '19' || this.productId == '14' || this.productId == '32') {
      if (this.productId == '59' || this.productId == '19') return menu.LocationName
      else return this.productName;
    }
    else return '';
  }
  getHeader() {
    if (this.productId == '59') {
      return 'Domestic'
    }
  }
  SaveLoadingDetails(modal) {
    if (this.loadingList.length != 0) {
      let i = 0;
      for (let load of this.loadingList) {
        console.log("Entry Load", load)
        if (load.LoadingAmount != 0 && String(load.LoadingAmount).includes(',')) load['LoadingAmount'] = Number(load.LoadingAmount.replaceAll(',', ''));
        i += 1;
        if (i == this.loadingList.length) this.finalSaveLoading(modal)
      }
    }
    else this.finalSaveLoading(modal)
  }
  finalSaveLoading(modal) {
    let vehData = this.vehicleDetailsList.filter(ele => ele.VehicleId == this.selectedVehId);
    let secData = vehData.filter(ele => ele.SectionId == this.selectedSectionId);
    let coverData = secData[0].CoverList.filter(ele => ele.CoverId == this.selectedCoverId);
    if (coverData[0]?.Endorsements) {
      coverData[0].Endorsements[coverData[0].Endorsements.length - 1].PremiumBeforeDiscount = this.beforeDiscount;
      coverData[0].Endorsements[coverData[0].Endorsements.length - 1].PremiumAfterDiscount = this.differencePremium;
      coverData[0].Endorsements[coverData[0].Endorsements.length - 1].EndorsementCalcType = this.calcType;
      coverData[0].Endorsements[coverData[0].Endorsements.length - 1].ExcessPercent = this.excessPercent;
      coverData[0].Endorsements[coverData[0].Endorsements.length - 1].ExcessAmount = this.excessAmount;
      coverData[0].Endorsements[coverData[0].Endorsements.length - 1].EndorsementRate = this.ratePercent;
    }
    else {
      coverData[0].PremiumAfterDiscount = this.afterDiscount;
      coverData[0].Discounts = this.discountList;
      coverData[0].ratePercent = this.ratePercent;
      coverData[0].ExcessPercent = this.excessPercent;
      coverData[0].ExcessAmount = this.excessAmount;
      coverData[0].Rate = this.ratePercent;
    }
    this.selectedVehId = null; this.excessPercent = null;
    this.selectedCoverId = null; this.excessAmount = null;
    this.selectedSectionId = null; this.ratePercent = null;
    this.beforeDiscount = null; this.loadingList = [];
    this.afterDiscount = null; this.discountList = [];
    if (coverData) {
      this.excessDetailModal = false;
      this.discountDetailModal = false;
    }
  }
  ngOnInit() {
    if (this.router.url.includes('quoteNo')) {
      this.route.queryParams.subscribe(async params => {
        const CustomerReferenceNo = params['CustomerReferenceNo'];
        const QuoteNo = params['quoteNo'];
        const QuoteReferenceNo = params['quoteReferenceNo'];
        sessionStorage.setItem('CustomerReferenceNo', CustomerReferenceNo);
        sessionStorage.setItem('quoteNo', QuoteNo);
        sessionStorage.setItem('updatebar', QuoteNo);
        sessionStorage.setItem('Pagefrom', "Existing");
        sessionStorage.setItem('quoteReferenceNo', QuoteReferenceNo);
        const customerData: any = await this.getCustomerDetails(CustomerReferenceNo);
        if (QuoteNo && customerData) {
          this.isSearchFormVisible = false;
          this.insuranceId = customerData.Result.InsuranceId;
          this.productId = customerData.Result.ProductId;
          this.branchCode = customerData.Result.BranchCode;
          sessionStorage.setItem('customerReferenceNo', CustomerReferenceNo);
          const userDetails = JSON.parse(
            sessionStorage.getItem('Userdetails') as any,
          );
          userDetails.Result['ProductId'] = this.productId;
          userDetails.Result['BranchCode'] = this.branchCode;
          userDetails.Result['InsuranceId'] = this.insuranceId;
          sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
          const reloadDone = sessionStorage.getItem('reloadDone');
          if (sessionStorage.getItem('quoteNo') && !reloadDone) {
            sessionStorage.setItem('reloadDone', 'true');
            window.location.reload();
            this.cd.markForCheck();
          }
        }
      })
    }
    this.years = [{ label: '1 Year' }, { label: '2 Year' }];
    this.vehicles = [{ label: 'Vehicle 1' }, { label: 'Vehicle 2' }];
  }
  benefitPopup(rowData, veh) {
    this.covernameinfo(rowData, veh);
    this.position = "top";
    this.BenefitPopup = true;
  }
  covernameinfo(row, veh) {
    // this.tooltip=true;
    this.CoverName = row.CoverDesc
    let subCoverId = null;
    let entry = this.vehicleDetailsList.filter(ele => ele.VehicleId == veh.VehicleId && veh.SectionId)
    if (entry.length != 0) {
      let coverEntry = entry[0].CoverList.find(ele => ele.CoverId == row.CoverId)
      if (coverEntry) {
        if (coverEntry.SubCovers) {
          if (coverEntry.SubCoverId != undefined) {
            subCoverId = coverEntry.SubCoverId;
            this.getBenefitList(subCoverId, row)
          }
        }
        else this.getBenefitList(subCoverId, row)
      }
    }
  }
  getBenefitList(subCoverId, row) {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "SectionId": row.SectionId,
      "CoverId": row.CoverId,
      "SubCoverId": subCoverId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/productbenefit`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.CoverList = data?.Result;
        }
      },
      (err) => { },
    );
  }
  getTermsSectionList() {
    let riskId = String(this.tabIndex + 1);
    let urlLink = `${this.CommonApiUrl}api/sectionlistbasedonriskid?requestReferenceNo=${this.quoteRefNo}&riskId=${riskId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{ "SectionId": "99999", "SectionName": "ALL" }];
          this.termsSectionList = defaultObj.concat(data.Result);
          this.termsSectionId = '99999';
          this.viewCondition('direct');
        }
      });
  }
  viewCondition(index) {
    let QuoteNo: any;
    if (this.quoteNo != undefined && this.quoteNo != "" && this.quoteNo != null) {
      QuoteNo = this.quoteNo;
    }
    else {
      QuoteNo = null;
    }
    let ReqObj = {
      InsuranceId: this.insuranceId,
      BranchCode: this.branchCode,
      ProductId: this.productId,
      QuoteNo: QuoteNo,
      TermsId: "D",
      SectionId: this.termsSectionId,
      // SectionId:this.vehicleDetailsList[index].SectionId,
      RequestReferenceNo: this.quoteRefNo
    }
    let urlLink = `${this.CommonApiUrl}api/viewtermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.viewList = data.Result;
          if (this.viewList?.ClausesList) {
            let i = 0;
            for (let clause of this.viewList?.ClausesList) {
              clause['selected'] = true;
              i += 1;
              if (i == this.viewList?.ClausesList.length) this.ClausesData = this.viewList?.ClausesList;
            }
          }
          if (this.viewList?.ExclusionList) {
            let i = 0;
            for (let clause of this.viewList?.ExclusionList) {
              clause['selected'] = true;
              i += 1;
              if (i == this.viewList?.ExclusionList.length) this.ExclusionData = this.viewList?.ExclusionList;
            }
          }
          if (this.viewList?.WarrantyList) {
            let i = 0;
            for (let clause of this.viewList?.WarrantyList) {
              clause['selected'] = true;
              i += 1;
              if (i == this.viewList?.WarrantyList.length) this.WarrantyData = this.viewList?.WarrantyList;
            }
          }
          if (this.userType == 'Broker') {
            /*console.log('bbbbbbbbbbbbb',this.userType)
            this.ClauseColumnHeader;
            this.clause=true;*/
            //const isChecked=false;
            this.clause = true;
            this.ClauseColumnHeader = [
              { key: 'SubId', display: 'Clauses Id' },
              { key: 'SubIdDesc', display: 'Clauses Description' },
            ];
            this.ClausesDataId.map(x => ({
              ...x,
              isChecked: false
            }));
            this.ExclusionsColumnHeader = [
              { key: 'SubId', display: 'Exclusion Id' },
              { key: 'SubIdDesc', display: 'Exclusion Description' },
            ];
            this.ExclusionDataId.map(x => ({
              ...x,
              isChecked: false
            }));
            this.WarrantiesColumnHeader = [
              { key: 'SubId', display: 'Warranty Id' },
              { key: 'SubIdDesc', display: 'Warranty Description' },
            ];
            this.WarrantyDataId.map(x => ({
              ...x,
              isChecked: false
            }));
          }
          else {
            /*this.ClausesColumnHeader;
            this.clause=false;*/
            this.clause = false;
            this.ClausesColumnHeader = [
              {
                key: 'EntryDate',
                display: 'Select',
                config: {
                  isChecked: true,
                  model: 'isChecked'
                },
              },
              { key: 'ClausesId', display: 'Clauses Id' },
              {
                key: 'ClausesDesc', display: 'Clauses Description',
                config: {
                  Edit: true,
                  model: 'Edit'
                },
              },
              /*{ key:'Edit', display:'Edit',
              config: {
               Edit: true,
               model:'Edit'
             },}*/
            ];
            this.ClausesDataId.map(x => ({
              ...x,
              isChecked: false
            }));
            this.ExclusionColumnHeader = [
              {
                key: 'EntryDate',
                display: 'Select',
                config: {
                  isChecked: true,
                  model: 'isChecked'
                },
              },
              { key: 'ExclusionId', display: 'Exclusion Id' },
              { key: 'ExclusionDesc', display: 'Exclusion Description' },
              {
                key: 'Edit', display: 'Edit',
                config: {
                  Edit: true,
                  model: 'Edit'
                },
              }
            ];
            this.ExclusionDataId.map(x => ({
              ...x,
              isChecked: false
            }));
            this.WarrantyColumnHeader = [
              {
                key: 'EntryDate',
                display: 'Select',
                config: {
                  isChecked: true,
                  model: 'isChecked'
                },
              },
              { key: 'WarrantyId', display: 'Warranty Id' },
              { key: 'WarrantyDesc', display: 'Warranty Description' },
              {
                key: 'Edit', display: 'Edit',
                config: {
                  Edit: true,
                  model: 'Edit'
                },
              }
            ];
          }
          if (this.onClauses == true || this.onWarranty == true || this.onExclusion == true) {
            let commonObj = {
              "ClausesList": this.ClausesData,
              "WarrantyList": this.WarrantyData,
              "ExclusionList": this.ExclusionData
            }
            // this.vehicleDetailsList[index]["Common"] = commonObj;
          }
        }
      },
      (err) => { },
    );
  }
  onChooseCompareSection(rowData, el: HTMLElement) {
    this.selectedSectionId = rowData.SectionId;
    this.scroll(el);
  }
  async getCustomerDetails(referenceNo): Promise<any> {
    let ReqObj = {
      "CustomerReferenceNo": referenceNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    return new Promise((resolve, reject) => {
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            this.customerDetails = data.Result;
            resolve(data);
          } else {
            resolve(null);
          }
        },
        (err) => { reject(err); },
      );
    });
  }
  getUpdatedVehicleDetails() {
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    let ViewPlanBenifits = JSON.parse(sessionStorage.getItem('ViewPlanBenifits'));
    if (ViewPlanBenifits && this.productId == '4' && this.insuranceId == '100002') {
      this.getTravalPlaneDetails(ViewPlanBenifits)
    }
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      let ReqObj = {
        "ProductId": this.productId,
        "RequestReferenceNo": this.quoteRefNo,
        "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}api/view/calc`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            // alert(data.Result[0].CoverList[0].ExcessDesc)
            sessionStorage.setItem('LocalCurrency', data.Result[0]?.Currency);
            this.vehicleData = data.Result;
            if (data.Result[0]?.RiskDetails?.CommissionPercentage) {
              this.brokerCommissionPercentage = data.Result[0]?.RiskDetails?.CommissionPercentage
            }
            if (this.productId == '4' && this.insuranceId == '100046') {
              this.travelBenefits = JSON.stringify(data.Result)
            }
            if (this.productId == '4' && this.insuranceId == '100002') {
              this.totalPremiumIncludedTaxLC = this.vehicleData[0]?.OverallPremiumLc;
            }
            this.groupDataBySectionId(data.Result);
            if (this.vehicleData.length != 0) {
              this.vehicleData = this.vehicleData.filter(ele => ele.CoverList.length != 0)
              let emiYN = this.vehicleData[0]?.EmiSetUpYn;
              if (emiYN) {
                this.emiShowYN = emiYN;
              }
              let finalizeyn = this.vehicleData[0]?.FinalizeYn;
              if (finalizeyn != null) { this.finalizeYN = finalizeyn; sessionStorage.setItem('FinalizeYN', finalizeyn); }
              else { this.finalizeYN = 'N'; sessionStorage.removeItem('FinalizeYN') };
            }
            if (this.productId == '5' || this.productId == '29') {
              let j = 0; let datass: any = []
              if (this.vehicleData.length > 1) {
                if (this.vehicleData[0]?.RiskDetails?.InsuranceClass == this.vehicleData[1]?.RiskDetails?.InsuranceClass) {
                  this.emipolicytype = this.vehicleData[0]?.RiskDetails?.InsuranceClass;
                }
                else {
                  this.emipolicytype = '99999';
                }
              }
              else {
                if (this.insuranceId == '100049') this.emipolicytype = this.vehicleData[0]?.RiskDetails?.Insurancetype;
                else if (this.insuranceId == '100050') this.emipolicytype = this.vehicleData[0]?.RiskDetails?.Insurancetype;
                else this.emipolicytype = this.vehicleData[0]?.RiskDetails?.InsuranceClass;
              }
              // this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
              // console.log('KKKKKKKKKKKK',this.emipolicytype);
            }
            else {
              this.emipolicytype = '99999';
            }
            let vehicleList: any[] = [];
            if (this.vehicleData.length != 0) {
              this.SourceType = this.vehicleData[0].SourceType;
              this.commissionValue = this.vehicleData[0].CommissionPercentage;
              this.commissionPercent = this.vehicleData[0].CommissionPercentage;
              this.policyStartDate = this.vehicleData[0]?.PolicyStartDate;
              this.policyEndDate = this.vehicleData[0]?.PolicyEndDate;
              let referralList = this.vehicleData.filter(ele => (ele.UWReferral != null && ele.UWReferral.length != 0) || ele.MasterReferral.length != 0);
              if (referralList.length != 0) this.uwReferralSection = true;
              if (this.vehicleData[0].EndtTypeMaster != null) {
                let quoteDetails = this.vehicleData[0].EndtTypeMaster
                this.endorsementType = quoteDetails.Endtcategdesc;
                this.endorsementCategory = quoteDetails.Endttypecategory;
                if (!JSON.parse(sessionStorage.getItem('endorseTypeId'))) {
                  let obj = {
                    "EndtTypeId": Number(quoteDetails?.Endttypeid),
                    "FieldsAllowed": quoteDetails.Endtdependantfields.split(','),
                    "EffectiveDate": quoteDetails.Endorsementeffdate,
                    "Remarks": quoteDetails.Remarks,
                    "Category": quoteDetails.Endttypecategory,
                    "EndtName": quoteDetails.Endttype,
                    "PolicyNo": quoteDetails?.PolicyNo
                  }
                  sessionStorage.setItem('endorsePolicyNo', this.vehicleData[0].OriginalPolicyNo);
                  //sessionStorage.setItem('endorsePolicyNo',)
                  sessionStorage.setItem('endorseTypeId', JSON.stringify(obj));
                  this.endorsementSection = true;
                  let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
                  if (endorseObj) {
                    this.endorsementId = endorseObj.EndtTypeId;
                    this.endorseEffectiveDate = endorseObj?.EffectiveDate;
                    this.enableFieldsList = endorseObj.FieldsAllowed;
                    let entry = this.enableFieldsList.some(ele => ele == 'Covers' || ele == 'RemoveSection' || ele == 'AddOnCovers' || ele == 'AddCovers' || ele == 'removeVehicle');
                    if (entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
                    else this.coverModificationYN = 'N';
                    if (this.endorsementId != 42) {
                      this.endorseCovers = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId == 852);
                      this.endorseSIModification = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId == 850);
                      this.endorseAddOnCovers = this.enableFieldsList.some(ele => ele == 'AddOnCovers' || ele == 'AddCovers');
                      this.enableAddVehicle = this.enableFieldsList.some(ele => ele == 'addVehicle');
                      this.enableRemoveVehicle = this.enableFieldsList.some(ele => ele == 'removeVehicle');
                      this.enableSections = this.enableFieldsList.some(ele => ele == 'RemoveSection');
                    }
                    else {
                      this.endorseSIModification = false;
                      this.endorseCovers = false;
                      this.enableAddVehicle = false;
                      this.endorseAddOnCovers = false;
                      this.enableRemoveVehicle = false;
                      this.enableSections = false;
                    }
                  }
                }
              }
              if (this.vehicleData[0].HavePromoCode) {
                this.havePromoCode = this.vehicleData[0].HavePromoCode;
                this.promoCode = this.vehicleData[0].PromoCode;
              }
              else {
                this.havePromoCode = "N";
                this.promoCode = null;
              }
              let admRemarks = this.vehicleData[0].AdminRemarks;
              if (admRemarks) {
                this.adminRemarks = admRemarks.split('~');
              }
              this.currencyCode = this.vehicleData[0]?.Currency;
              let i = 0;
              for (let veh of this.vehicleData) {
                veh['ReferralList'] = [];
                if (veh.MasterReferral.length != 0) {
                  for (let master of veh.MasterReferral) {
                    veh['ReferralList'].push(master.ReferralDesc)
                  }
                }
                if (veh.UWReferral.length != 0) {
                  for (let master of veh.UWReferral) {
                    veh['ReferralList'].push(master.QuestionDesc)
                  }
                }
                if (veh.EndorsementYn == 'Y') {
                  if (this.endorsementSection == false) {
                  }
                }
                // if(veh.ReferalRemarks){
                //   veh['ReferralList']= veh.ReferalRemarks.split('~');
                // }
                if (this.productId == '63' || this.productId == '66' || this.productId == '69' || this.productId == '70' || this.productId == '71' || this.productId == '72' || this.productId == '67' || this.productId == '75' || this.productId == '57' || this.productId == '49' || this.productId == '73' || this.productId == '19' || this.productId == '93' || this.productId == '92'
                  || this.productId == '26' || this.productId == '27' || this.productId == '48' || this.productId == '78' || this.productId == '76' || this.productId == '77' || (this.productId == '4' && this.InsuranceId == '100046')) veh.VehicleId = veh.LocationId;
                if (veh.VehicleId) veh['Vehicleid'] = veh.LocationId;
                veh['Active'] = true;
                let coverList = veh.CoverList;
                let baseCovers = [], otherCovers = [];
                if (this.productId == '4' && this.InsuranceId == '100046') {
                  baseCovers = []
                }
                else {
                  baseCovers = coverList.filter(ele => ele.CoverageType == 'B');
                }
                otherCovers = coverList.filter(ele => ele.CoverageType != 'B');
                veh.CoverList = baseCovers.concat(otherCovers)
                if (i == 0) {
                  veh['Collapse'] = true;
                  //this.remarks = veh.AdminRemarks;
                  vehicleList.push(veh);
                }
                else {
                  veh['Collapse'] = false;
                  vehicleList.push(veh);
                }
                i += 1;
                if (i == this.vehicleData.length) {
                  //sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                  if (this.productId != '4' && this.productId != '5' && this.productId != '46' && this.productId != '29') {
                    this.vehicleData = vehicleList;
                    this.filterVehicleList();
                  }
                  else {
                    let n = 0;
                    for (let veh of vehicleList) {
                      if (veh.CoverList.length != 0) {
                        let m = 0;
                        for (let cover of veh.CoverList) {
                          cover['VehicleId'] = veh.VehicleId;
                          cover['RiskId'] = veh?.RiskDetails?.RiskId;
                          cover['RiskDetails'] = veh.RiskDetails;
                          m += 1;
                          if (m == veh.CoverList.length) {
                            n += 1; if (n == vehicleList.length) {
                              this.vehicleDetailsList = vehicleList;
                              this.checkSelectedCovers();
                            }
                          }
                        }
                      }
                      else {
                        n += 1;
                        if (n == vehicleList.length) {
                          this.vehicleDetailsList = vehicleList;
                          this.checkSelectedCovers();
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (this.productId == '4' && this.insuranceId == '100046') {
            setTimeout(() => {
              const selectedCover = JSON?.parse(sessionStorage.getItem('selectedCover'));
              const menu = JSON?.parse(sessionStorage.getItem('menu'));
              this.onCoverSelectedTune(selectedCover, menu);
            }, 200);
          }
        },
        (err) => { },
      );
    }
  }
  checkExcessData(rowData) {
    if (this.selectedCoverList.length != 0) {
      if (this.selectedCoverList.some(ele => ele.SectionId == rowData.SectionId)) {
        for (let veh of this.selectedCoverList) {
          if (veh.SectionId == rowData.SectionId) {
            let coverList = veh.Covers;
            return coverList.some(ele => ele.CoverId == rowData.CoverId);
          }
        }
      }
      else return false;
    }
    else return false
  }
  checkOverAllExcess() {
    if (this.excessList.length != 0) {
      if (this.selectedCoverList.length != 0) {
        let i = 0, j = 0;
        for (let cover of this.excessList) {
          let sectionList = this.selectedCoverList.find(ele => ele.SectionId == cover.SectionId);
          if (sectionList) {
            if (sectionList.Covers.some(ele => ele.CoverId == cover.CoverId)) { j += 1; }
            i += 1;
            if (i == this.excessList.length) return j != 0;
          }
          else {
            i += 1;
            if (i == this.excessList.length) return j != 0;
          }
        }
      }
      else return false;
    }
    else return false;
  }
  getSectionName(rowData) {
    let entry = this.vehicleDetailsList.filter(ele => ele.LocationId == '1');
    return entry.find(ele => ele.SectionId == rowData.SectionId)?.SectionName
  }
  getExcessCoverName(rowData) {
    let entry = this.vehicleDetailsList.filter(ele => ele.LocationId == '1');
    for (let veh of entry) {
      if (veh.CoverList) {
        for (let cover of veh.CoverList) {
          if (cover.SectionId == rowData.SectionId && cover.CoverId == rowData.CoverId) return cover.CoverName;
        }
      }
    }
  }
  checkCurrentSection() {
    if ((this.insuranceId == '100028' || this.insuranceId == '100027' || this.insuranceId == '100040' || this.insuranceId == '100042') && this.productId == '5') {
      let duplicateId = null;
      let i = 0, j = 0;
      for (let veh of this.vehicleDetailsList) {
        let duplicateVehicle = [];
        duplicateVehicle = this.vehicleDetailsList.filter((val) => val.Vehicleid === veh.Vehicleid);
        if (duplicateVehicle.length > 1) {
          duplicateId = duplicateVehicle[0].Vehicleid;
        }
        j += 1;
        if (duplicateId != null) {
          return true;
        }
        else return false;
      }
    }
    else return false;
  }
  checkPremiumIncludedTax(coverData, rowData) {
    let entry = this.selectedCoverList.find(ele => ele.Id == rowData.Vehicleid);
    if (coverData.SubCovers) {
      if (coverData.SubCovers.length != 0) {
        return coverData.SubCovers.some(ele => ele.isSelected == 'D' || ele.isSelected == 'O' || ele.isSelected == 'Y' || ele?.UserOpt == 'Y' || ele?.selected == true);
      }
    }
    else return true;
  }
  getSubCoverTitle(coverData, rowData) {
    if (this.selectedCoverList.length != 0) {
      let entry = this.selectedCoverList.find(ele => ele.Id == rowData.Vehicleid && ele.SectionId == rowData.SectionId);
      if (entry) {
        let coverEntry = coverData.SubCovers.find(ele => entry.Covers[0].SubCoverId == ele.SubCoverId);
        if (coverEntry) return `SubCover - ${coverEntry.SubCoverName}`;
        else return 'Choose SubCover'
      }
      else return 'Choose SubCover'
    }
    else return 'Choose SubCover'
  }
  checkActiveIndex(coverData) {
    if (coverData.ActiveIndex) {
      return coverData.ActiveIndex;
    }
    else return null;
  }
  checkSectionWiseBenefit6(covers) {
    let list: any[] = covers.CoverList.filter(ele => ele.CoverageType == 'A' && ele.isSelected == 'D' && ele.SectionName == covers.SectionName);
    return (list.length != 0);
  }
  checkSectionWiseBenefit2(covers) {
    let list: any[] = covers.CoverList.filter(ele => ele.CoverageType != 'A' && ele.isSelected == 'D' && ele.SectionName == covers.SectionName);
    return (list.length != 0);
  }
  checkSectionWiseBenefit4(covers) {
    let list: any[] = covers.CoverList.filter(ele => ele.isSelected != 'D' && ele.CoverageType != 'A' && ele.SectionName == covers.SectionName)
    return (list.length != 0);
  }
  checkSectionWiseBenefit(covers) {
    let list: any[] = covers.CoverList.filter(ele => ele.CoverageType == 'A' && ele.isSelected != 'D' && ele.SectionName == covers.SectionName);
    return (list.length != 0);
  }
  checkEmptyCovers(covers) {
    return covers.CoverList.length == 0;
  }
  checkBenefitSection(covers) {
    let list: any[] = covers.CoverList.filter(ele => ((ele.isSelected != 'D' && ele.CoverageType == 'A') && !this.checkCoverSelection(covers, ele)));
    return (list.length != 0);
  }
  checkBenefitSection2(covers) {
    let list: any[] = covers.CoverList.filter(ele => ele.CoverageType == 'A' && ele.isSelected != 'D');
    return (list.length != 0);
  }
  checkBenefitSection4(covers) {
    let list: any[] = covers.CoverList.filter(ele => ele.isSelected != 'D' && ele.CoverageType != 'A')
    return (list.length != 0);
  }
  checkBenefitSection5() {
    let i = 0, j = 0;
    for (let veh of this.vehicleDetailsList) {
      let entry = veh.CoverList.some(ele => ele.isSelected == 'D' && ele.CoverageType == 'A');
      if (entry) i += 1;
      j += 1;
      if (j == this.vehicleDetailsList.length) return i != 0;
    }
  }
  getSectionList(veh) {
    if (veh.length != 0) {
      let i = 0, sectionList = [];
      for (let entry of veh.CoverList) {
        if (sectionList.length == 0) {
          let Obj = { "SectionName": entry.SectionName, "CoverList": [entry] }
          sectionList.push(Obj);
          i += 1;
          if (i == veh.CoverList.length) { console.log("Final Sections", sectionList); return sectionList }
        }
        else {
          let row = sectionList.find(ele => ele.SectionName == entry.SectionName);
          if (row) {
            if (!row.CoverList.some(ele => ele.CoverId == entry.CoverId && ele.RiskDetails?.RiskId == entry.RiskDetails?.RiskId)) row.CoverList.push(entry);
          }
          else {
            let Obj = { "SectionName": entry.SectionName, "CoverList": [entry] }
            sectionList.push(Obj);
          }
          i += 1;
          if (i == veh.CoverList.length) { return sectionList }
        }
      }
    }
    else return [];
  }
  filterVehicleList() {
    console.log("Step 1 Vehicle List", this.vehicleData);
    let vehicleList = [];
    vehicleList = this.vehicleData.filter(ele => ele.SectionId == '1' && (ele.RiskId == '1' || ele.RiskDetails.RiskId == '1'));
    console.log("Step 2 Filter", vehicleList)
    if (vehicleList.length == 0 && (this.productId == '19')) vehicleList = [this.vehicleData[0]]
    if (this.vehicleData.length != 0) {
      let i = 0;
      this.vehicleDetailsList = [];
      let k = 0;
      for (let vehicle of this.vehicleData) {
        let entry = null;
        console.log("Filter Details", vehicleList, this.vehicleData)
        if (this.productId != '5' && this.productId != '46') {
          entry = vehicleList.find(ele => ele.LocationId == vehicle.LocationId);
        }
        else entry = vehicleList.find(ele => ele.LocationId == vehicle.LocationId || ele.RiskDetails.RiskId == vehicle.RiskDetails.RiskId);
        console.log("Entry", entry);
        if (entry && ((vehicle.SectionId != '1' || (vehicle.SectionId == '1' && vehicle.RiskDetails.RiskId != entry.RiskDetails.RiskId)) || this.productId == '66' || this.productId == '67' || this.productId == '19' || this.productId == '92')) {
          //if(entry.SectionId==vehicle.SectionId){
          let j = 0;
          let coverList = []
          for (let cover of vehicle.CoverList) {
            cover['VehicleId'] = vehicle.VehicleId;
            cover['RiskId'] = vehicle?.RiskDetails?.RiskId;
            cover['RiskDetails'] = vehicle.RiskDetails;
            if (entry.CoverList) {
              if (cover.SectionId == '1' || cover.SectionId == '243' || cover.SectionId == '198') {
                if (!entry.CoverList.some(ele => ele.CoverId == cover.CoverId && ele.SectionId == cover.SectionId && entry?.RiskDetails?.RiskId == vehicle?.RiskDetails?.RiskId)) { coverList.push(cover) }
              }
              else coverList.push(cover)
            }
            j += 1;
            if (j == vehicle.CoverList.length) {
              entry.CoverList = entry.CoverList.concat(coverList);
              // let finalList = [],k=0;
              // for(let obj of entry.CoverList){
              //   if(!finalList.some(ele=>ele.CoverId==obj.CoverId && ele.SectionId==obj.SectionId)){
              //     finalList.push(obj);
              //    }
              //   k+=1;
              //   if(k==entry.CoverList.length){entry.CoverList=finalList; console.log("Final Filtered Covers",entry.CoverList)}
              // }
            }
          }
          // }
          // else{
          //   vehicleList.push(vehicle);
          // }
        }
        else if (vehicle.SectionId != '1' || (vehicle.SectionId == '1' && vehicle.RiskDetails.RiskId != entry.RiskDetails.RiskId)) {
          let j = 0;
          for (let cover of vehicle.CoverList) {
            cover['VehicleId'] = vehicle.VehicleId;
            cover['RiskId'] = vehicle?.RiskDetails?.RiskId;
            cover['RiskDetails'] = vehicle.RiskDetails;
            j += 1;
            if (j == vehicle.CoverList.length) {
              vehicleList.push(vehicle);
              // let finalList = [],k=0;
              // for(let obj of vehicle.CoverList){
              //   if(!finalList.some(ele=>ele.CoverId==obj.CoverId && ele.SectionId==obj.SectionId)){
              //     finalList.push(obj);
              //    }
              //   k+=1;
              //   console.log("Vehicle Covers L2",vehicle)
              //   if(k==vehicle.CoverList.length){vehicle.CoverList=finalList;vehicleList.push(vehicle);}
              // }
            }
          }
        }
        i += 1;
        if (i == this.vehicleData.length) {
          if (this.productId == '66' || this.productId == '67' || this.productId == '92') {
            let list = [], i = 0;
            console.log("Vehicles", vehicleList)
            for (let veh of vehicleList) {
              if (!list.some(ele => ele.LocationId == veh.LocationId)) list.push(veh);
              i += 1;
              if (i == vehicleList.length) {
                console.log("Vehicles 2", list)
                if (this.productId == '92') {
                  let finalList = [], j = 0;
                  for (let veh of list) {
                    let coverList = [], i = 0;
                    for (let cov of veh.CoverList) {
                      if (!coverList.some(ele => ele.CoverId == cov.CoverId && ele.SectionId == cov.SectionId && ele.RiskId == cov.RiskId)) {
                        coverList.push(cov);
                      }
                      i += 1;
                      if (i == veh.CoverList.length) {
                        veh.CoverList = coverList
                        finalList.push(veh);
                        j += 1;
                        if (j == list.length) {
                          this.vehicleDetailsList = list;
                          this.checkSelectedCovers();
                        }
                      }
                    }
                  }
                }
                else {
                  this.vehicleDetailsList = list;
                  this.checkSelectedCovers();
                }
              }
            }
          }
          else {
            this.vehicleDetailsList = vehicleList;
            this.checkSelectedCovers();
          }
        }
      }
    }
    console.log("Check Selected Covers", this.vehicleDetailsList)
  }
  checkSelectedCovers() {
    if (this.vehicleDetailsList.length != 0) {
      if (this.vehicleDetailsList[0].CoverList.length != 0) {
        this.currencyCode == this.vehicleDetailsList[0].CoverList[0].Currency;
      }
      let j = 0;
      for (let veh of this.vehicleDetailsList) {
        veh['totalPremium'] = 0;
        let i = 0;
        let coverList: any[] = veh.CoverList;
        for (let cover of coverList) {
          cover['ExcessDesc'] = 'None';
          let fieldList = [];
          if (cover.Endorsements != null && veh.Status != 'D') {
            cover['DifferenceYN'] = 'Y';
            if (veh?.EndtTypeMaster?.Endtdependantfields) {
              fieldList = veh?.EndtTypeMaster?.Endtdependantfields.split(',')
            }
          }
          if (cover.Endorsements != null && !this.endorsementSection) {
            this.endorsementSection = true;
            let obj = {
              "EndtTypeId": cover.Endorsements[0].EndorsementId,
              "FieldsAllowed": fieldList,
              "EffectiveDate": cover.EffectiveDate,
              "Remarks": null,
              "Category": veh?.EndtTypeMaster?.Endttypecategory,
              "EndtName": cover.Endorsements[0].EndorsementDesc,
              "PolicyNo": null
            }
            this.endorsementId = cover.Endorsements[0].EndorsementId;
            this.endorseEffectiveDate = cover.EffectiveDate;
            this.enableFieldsList = fieldList;
            let entry = this.enableFieldsList.some(ele => ele == 'Covers' || ele == 'RemoveSection' || ele == 'AddOnCovers' || ele == 'AddCovers' || ele == 'removeVehicle');
            if (this.coverModificationYN == 'N') {
              if (entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
              else this.coverModificationYN = 'N';
            }
            sessionStorage.setItem('endorseTypeId', JSON.stringify(obj));
          }
          if (((((cover.isSelected == 'D') || (cover.isSelected == 'O' && this.productId != '4') || (cover.isSelected == 'Y' && (cover.UserOpt == null || cover.UserOpt == undefined || (cover.CoverageType == 'A' && (this.quoteNo == null || this.quoteNo == undefined)))) || cover?.UserOpt == 'Y') && !this.endorsementSection) ||
            (this.endorsementSection && (cover.UserOpt == 'Y' || cover.isSelected == 'D' || cover.isSelected == 'O'))) && cover.SubCovers == null) {
            // if(this.endorsementId == 846 && veh.Status=='D'){
            //   cover['selected']= false;
            //   this.onSelectCover(cover,false,veh.Vehicleid,veh,'coverList','change');
            // }
            // else{
            this.onSelectCover(cover, true, cover.VehicleId, veh, 'coverList', 'direct');
            //}
          }
          else {
            cover['selected'] = false;
          }
          if (cover.SubCovers != null) {
            let k = 0;
            for (let sub of cover.SubCovers) {
              if (sub.isSelected == 'D' || sub.isSelected == 'O' || sub.isSelected == 'Y' || sub?.UserOpt == 'Y') {
                this.onChangeSubCover(sub, cover, veh, true, null);
              }
              k += 1;
              if (k == cover.SubCovers) {
                i += 1;
                if (i == coverList.length) {
                  let defaultList = coverList.filter(ele => ele.isSelected == 'D' || ele.UserOpt == 'Y');
                  let otherList = coverList.filter(ele => ele.isSelected != 'D' && ele.UserOpt != 'Y')
                  veh.CoverList = defaultList.concat(otherList);
                  if (this.adminSection) veh.CoverList = coverList.filter(ele => ele.isSelected == 'D' || ele?.UserOpt == 'Y')
                }
              }
            }
          }
          else {
            i += 1;
            if (i == coverList.length) {
              let defaultList = coverList.filter(ele => ele.isSelected == 'D' || ele.UserOpt == 'Y');
              let otherList = coverList.filter(ele => ele.isSelected != 'D' && ele.UserOpt != 'Y')
              veh.CoverList = defaultList.concat(otherList);
              if (this.adminSection) veh.CoverList = coverList.filter(ele => ele.isSelected == 'D' || ele?.UserOpt == 'Y')
            }
          }
        }
        j += 1;
        if (j == this.vehicleDetailsList.length) {
          if (this.endorsementId == 846) {
            let vehicles = this.vehicleDetailsList.filter(ele => ele.Status == 'D');
            if (vehicles.length != 0) {
              let n = 0;
              for (let veh of vehicles) {
                let SectionEntry: any[] = [];
                SectionEntry = this.vehicleDetailsList.filter(ele => ele.Status == 'E' && ele.SectionId == veh.SectionId);
                let coverList: any[] = veh.CoverList;
                let j = 0;
                for (let cover of coverList) {
                  if ((((cover.isSelected == 'D') || cover.isSelected == 'O' && this.productId != '4' || cover.isSelected == 'Y' || cover?.UserOpt == 'Y') && !this.endorsementSection) ||
                    (this.endorsementSection && (cover.UserOpt == 'Y' || cover.isSelected == 'Y'))) {
                    cover['selected'] = false;
                    this.onSelectCover(cover, false, cover.VehicleId, veh, 'coverList', 'change');
                    cover['DifferenceYN'] = 'N';
                    if (SectionEntry.length != 0) {
                      let coverList = SectionEntry[0]?.CoverList;
                      let covers = coverList.filter(ele => ele.CoverId == cover.CoverId);
                      if (!(covers[0].UserOpt == 'Y' || covers[0].isSelected == 'D' || covers[0].isSelected == 'O')) {
                        covers[0]['selected'] = true;
                        this.onSelectCover(covers[0], true, covers[0].VehicleId, SectionEntry[0], 'coverList', 'change');
                        covers[0]['DifferenceYN'] = 'Y';
                      }
                    }
                  }
                  j += 1;
                  if (j == coverList.length) n += 1;
                }
                if (n == vehicles.length) {
                  if (this.quoteNo != "null" && this.quoteNo != null) {
                  }
                  if (this.quoteRefNo != "null" && this.quoteRefNo != null) {
                    if (this.vehicleData[0].EmiYn != null && this.vehicleData[0].EmiYn != undefined && this.vehicleData[0].EmiYn != '') {
                      this.emiYN = this.vehicleData[0].EmiYn;
                      if (this.emiYN == 'Y') this.EmiInstallment();
                      this.emiPeriod = this.vehicleData[0].InstallmentPeriod;
                    }
                    else {
                      this.emiYN = "N";
                      //this.EmiInstallment();
                    }
                    this.getEditQuoteDetails();
                  }
                  else {
                  }
                }
              }
            }
            else {
              if (this.quoteNo != "null" && this.quoteNo != null) {
                //this.getEditQuoteDetails();
              }
              if (this.quoteRefNo != "null" && this.quoteRefNo != null) {
                //this.updateComponent.quoteNo = this.quoteNo;
                this.getEditQuoteDetails();
              }
              else {
              }
            }
          }
          else {
            if (this.quoteNo != "null" && this.quoteNo != null) {
              //this.getEditQuoteDetails();
            }
            if (this.quoteRefNo != "null" && this.quoteRefNo != null) {
              //this.updateComponent.quoteNo = this.quoteNo;
              if (this.vehicleData[0].EmiYn != null && this.vehicleData[0].EmiYn != undefined && this.vehicleData[0].EmiYn != '') {
                this.emiYN = this.vehicleData[0].EmiYn;
                if (this.emiYN == 'Y') this.EmiInstallment();
                this.emiPeriod = this.vehicleData[0].InstallmentPeriod;
              }
              else {
                this.emiYN = "N";
                //this.EmiInstallment();
              }
              this.getEditQuoteDetails();
            }
            else {
            }
          }
          //this.onGetCoverListById();
        }
      }
    }
  }
  getExcessDetails() {
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.CommonApiUrl}excess/gettransactiondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.excessList = data.Result;
        }
      });
  }
  getCoverName(rowData) {
    return rowData.CoverName;
  }
  getMenuDetails(rowData) {
    return rowData.Vehicleid;
  }
  checkCoverSelection(vehicleData, coverData) {
    if (this.finalizeYN == 'Y') return true;
    else if (this.endorsementSection && !this.adminSection && this.statusValue != 'RA') {
      if (this.endorseCovers) {
        if (!this.adminSection && coverData.ModifiedYN == 'N') return false;
        else if (!this.adminSection) return true;
        else return false;
      }
      else if (this.endorseSIModification) {
        if (!this.adminSection && coverData.ModifiedYN == 'Y') return false;
        else if (!this.adminSection) return true;
        else return false;
      }
      else if (vehicleData.EndorsementYN == 'Y') return false;
      else if (this.endorseAddOnCovers && coverData.ModifiedYN == 'Y') {
        return false;
      }
      else if (this.enableAddVehicle) {
        if (vehicleData.EndorsementYn == 'Y') return false;
        else return true;
      }
      else if (this.endorseAddOnCovers && this.adminSection) return false;
      else return true;
    }
    else if (!this.adminSection && this.statusValue == 'RA' && (((coverData.isSelected == 'D' || coverData.isSelected == 'O' || coverData.isSelected == 'Y' || coverData?.UserOpt == 'Y') && !this.endorsementSection) ||
      (this.endorsementSection && (coverData.UserOpt == 'Y' || coverData.isSelected == 'D' || coverData.isSelected == 'O')))) return true;
    else return false;
  }
  onChangeSubCover(subCover, cover, vehicle, event, element) {
    if (subCover == undefined || subCover == null) {
      if (element) {
        subCover = cover.SubCovers.find(ele => ele.SubCoverId == element.value)
      }
    }
    if (subCover.MultiSelectYn == 'Y') {
      if (event) {
        if (this.selectedCoverList.length != 0) {
          let entry = this.selectedCoverList.filter(ele => ele.Id == vehicle.VehicleId && ele.LocationId == vehicle.LocationId);
          if (entry.length == 0) {
            let id = null;
            if (cover.RiskDetails?.RiskId) id = cover.RiskDetails?.RiskId; else id = cover.VehicleId
            let element = {
              "Covers": [
                {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y",
                  //"isReferal": rowData.isReferal
                }
              ],
              "LocationId": vehicle.LocationId,
              "Id": id,
              "SectionId": cover.SectionId
            }
            cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
            cover.selected = true;
            for (let sub of cover.SubCovers) {
              if (sub.SubCoverId == subCover.SubCoverId) {
                cover['isReferal'] = sub.isReferal;
                cover['SumInsured'] = sub.SumInsured;
                cover['Loadings'] = sub.Loadings;
                cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                cover['MinimumPremium'] = sub.MinimumPremium;
                cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                cover['Discounts'] = sub?.Discounts;
                cover['CalcType'] = sub?.CalcType;
                cover['Rate'] = sub?.Rate;
                cover['ExcessPercent'] = sub?.ExcessPercent;
                cover['ExcessAmount'] = sub?.ExcessAmount;
                cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                cover['ExchangeRate'] = sub?.ExchangeRate;
                cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                cover['Taxes'] = sub.Taxes;
                cover['SubCoverId'] = sub.SubCoverId
                sub['selected'] = true;
              }
              else {
                sub['selected'] = false;
              }
            }
            subCover['selected'] = true;
            this.selectedCoverList.push(element);
            if (vehicle?.totalPremium) {
              if (cover.Endorsements != null) {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
              }
              else {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
              }
            }
            else {
              if (cover.Endorsements != null) {
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
              }
              else {
                vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
                vehicle['totalPremium'] = cover.PremiumIncludedTax;
              }
            }
            // if(vehicle?.totalPremium){
            //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTax;
            //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
            // }
            // else{
            //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
            //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            // }
            this.getTotalVehiclesCost();
            //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
          }
          else {
            let sectionEntry = entry.find(ele => ele.SectionId == cover.SectionId);
            if (sectionEntry == undefined) {
              let id = null;
              if (cover.RiskDetails?.RiskId) id = cover.RiskDetails?.RiskId; else id = cover.VehicleId
              let element = {
                "Covers": [
                  {
                    "CoverId": cover.CoverId,
                    "SubCoverId": subCover.SubCoverId,
                    "SubCoverYn": "Y",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "LocationId": vehicle.LocationId,
                "Id": id,
                "SectionId": cover.SectionId
              }
              cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
              cover.selected = true;
              for (let sub of cover.SubCovers) {
                if (sub.SubCoverId == subCover.SubCoverId) {
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremium'] = sub.MinimumPremium;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  cover['SubCoverId'] = sub.SubCoverId
                  sub['selected'] = true;
                }
                else {
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              this.selectedCoverList.push(element);
              if (vehicle?.totalPremium) {
                if (cover.Endorsements != null) {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                }
                else {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
                }
              }
              else {
                if (cover.Endorsements != null) {
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                }
                else {
                  vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.PremiumIncludedTax;
                }
              }
              // if(vehicle?.totalPremium){
              //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTax;
              //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
              // }
              // else{
              //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTax;
              //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              // }
              this.getTotalVehiclesCost();
            }
            else {
              let covers: any[] = sectionEntry.Covers;
              let findCover = covers.filter(ele => ele.CoverId == cover.CoverId);
              if (findCover.length == 0) {
                let newEntry = {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y"
                  //"isReferal": rowData.isReferal
                }
                cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
                cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
                cover.selected = true;
                for (let sub of cover.SubCovers) {
                  if (sub.SubCoverId == subCover.SubCoverId) {
                    cover['isReferal'] = sub.isReferal;
                    cover['SumInsured'] = sub.SumInsured;
                    cover['Loadings'] = sub.Loadings;
                    cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                    cover['MinimumPremium'] = sub.MinimumPremium;
                    cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                    cover['Discounts'] = sub?.Discounts;
                    cover['CalcType'] = sub?.CalcType;
                    cover['Rate'] = sub?.Rate;
                    cover['ExcessPercent'] = sub?.ExcessPercent;
                    cover['ExcessAmount'] = sub?.ExcessAmount;
                    cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                    cover['ExchangeRate'] = sub?.ExchangeRate;
                    cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                    cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                    cover['Taxes'] = sub.Taxes;
                    cover['SubCoverId'] = sub.SubCoverId
                    sub['selected'] = true;
                  }
                  else {
                    sub['selected'] = false;
                  }
                }
                subCover['selected'] = true;
                sectionEntry.Covers.push(newEntry);
                if (vehicle?.totalPremium) {
                  if (cover.Endorsements != null) {
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                    vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                  }
                  else {
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                    vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
                  }
                }
                else {
                  if (cover.Endorsements != null) {
                    vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                    vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                  }
                  else {
                    vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
                    vehicle['totalPremium'] = cover.PremiumIncludedTax;
                  }
                }
                this.getTotalVehiclesCost();
              }
              else {
                let subCoverEntry = findCover.filter(ele => ele.SubCoverId == subCover.SubCoverId);
                if (subCoverEntry.length == 0) {
                  let newEntry = {
                    "CoverId": cover.CoverId,
                    "SubCoverId": subCover.SubCoverId,
                    "SubCoverYn": "Y"
                    //"isReferal": rowData.isReferal
                  }
                  cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
                  cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
                  cover.selected = true;
                  for (let sub of cover.SubCovers) {
                    if (sub.SubCoverId == subCover.SubCoverId) {
                      cover['isReferal'] = sub.isReferal;
                      cover['SumInsured'] = sub.SumInsured;
                      cover['Loadings'] = sub.Loadings;
                      cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                      cover['MinimumPremium'] = sub.MinimumPremium;
                      cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                      cover['Discounts'] = sub?.Discounts;
                      cover['CalcType'] = sub?.CalcType;
                      cover['Rate'] = sub?.Rate;
                      cover['ExcessPercent'] = sub?.ExcessPercent;
                      cover['ExcessAmount'] = sub?.ExcessAmount;
                      cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                      cover['ExchangeRate'] = sub?.ExchangeRate;
                      cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                      cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                      cover['Taxes'] = sub.Taxes;
                      cover['SubCoverId'] = sub.SubCoverId
                      sub['selected'] = true;
                    }
                    else {
                      sub['selected'] = false;
                    }
                  }
                  subCover['selected'] = true;
                  sectionEntry.Covers.push(newEntry);
                  if (vehicle?.totalPremium) {
                    if (cover.Endorsements != null) {
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                      vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                    }
                    else {
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                      vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
                    }
                  }
                  else {
                    if (cover.Endorsements != null) {
                      vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                      vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                    }
                    else {
                      vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
                      vehicle['totalPremium'] = cover.PremiumIncludedTax;
                    }
                  }
                  this.getTotalVehiclesCost();
                }
              }
            }
          }
        }
        else {
          let id = null;
          if (cover.RiskDetails?.RiskId) id = cover.RiskDetails?.RiskId; else id = cover.VehicleId
          let element = {
            "Covers": [
              {
                "CoverId": cover.CoverId,
                "SubCoverId": subCover.SubCoverId,
                "SubCoverYn": "Y",
                //"isReferal": rowData.isReferal
              }
            ],
            "LocationId": vehicle.LocationId,
            "Id": id,
            "SectionId": cover.SectionId
          }
          cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
          cover.PremiumIncludedTax = cover.PremiumIncludedTax + subCover.PremiumIncludedTax;
          cover.selected = true;
          for (let sub of cover.SubCovers) {
            if (sub.SubCoverId == subCover.SubCoverId) {
              cover['isReferal'] = sub.isReferal;
              cover['SumInsured'] = sub.SumInsured;
              cover['Loadings'] = sub.Loadings;
              cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
              cover['MinimumPremium'] = sub.MinimumPremium;
              cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
              cover['Discounts'] = sub?.Discounts;
              cover['CalcType'] = sub?.CalcType;
              cover['Rate'] = sub?.Rate;
              cover['ExcessPercent'] = sub?.ExcessPercent;
              cover['ExcessAmount'] = sub?.ExcessAmount;
              cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
              cover['ExchangeRate'] = sub?.ExchangeRate;
              cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
              cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
              cover['Taxes'] = sub.Taxes;
              cover['SubCoverId'] = sub.SubCoverId
              sub['selected'] = true;
            }
            else {
              sub['selected'] = false;
            }
          }
          subCover['selected'] = true;
          this.selectedCoverList.push(element);
          if (vehicle?.totalPremium) {
            if (cover.Endorsements != null) {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
            }
            else {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
            }
          }
          else {
            if (cover.Endorsements != null) {
              vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
              vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
            }
            else {
              vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
              vehicle['totalPremium'] = cover.PremiumIncludedTax;
            }
          }
          this.getTotalVehiclesCost();
        }
      }
      else {
        if (this.selectedCoverList.length != 0) {
          let entry = this.selectedCoverList.filter(ele => ele.Id == vehicle.VehicleId && ele.LocationId == vehicle.LocationId);
          let sectionEntry = entry.find(ele => ele.SectionId == cover.SectionId);
          sectionEntry.Covers = sectionEntry.Covers.filter(ele => ele.SubCoverId != subCover.SubCoverId)
          let covers: any[] = sectionEntry.Covers;
          let findCover = covers.filter(ele => ele.CoverId == cover.CoverId);
          subCover['selected'] = false;
          cover.PremiumIncludedTax = cover.PremiumIncludedTax - subCover.PremiumIncludedTax;
          cover.PremiumIncludedTax = cover.PremiumIncludedTax - subCover.PremiumIncludedTax;
          if (vehicle?.totalPremium == null || vehicle?.totalPremium == undefined) { vehicle['totalLcPremium'] = 0; vehicle['totalPremium'] = 0 }
          if (vehicle?.totalPremium) {
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - subCover.PremiumIncludedTax;
            vehicle['totalPremium'] = vehicle['totalPremium'] - subCover.PremiumIncludedTax;
            if (findCover.length == 0) { cover['selected'] = false; vehicle['totalPremium'] = vehicle['totalPremium'] - cover.PremiumIncludedTax; vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTax; }
          }
          else {
            if (findCover.length != 0) {
              vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
              vehicle['totalPremium'] = cover.PremiumIncludedTax;
            }
          }
          this.getTotalVehiclesCost();
        }
      }
    }
    else {
      if (this.selectedCoverList.length != 0) {
        let entry = this.selectedCoverList.filter(ele => ele.Id == vehicle.VehicleId && ele.LocationId == vehicle.LocationId);
        if (entry.length == 0) {
          let id = null;
          if (cover.RiskDetails?.RiskId) id = cover.RiskDetails?.RiskId; else id = cover.VehicleId
          let element = {
            "Covers": [{ "CoverId": cover.CoverId, "SubCoverId": subCover.SubCoverId, "SubCoverYn": "Y" }],
            "LocationId": vehicle.LocationId, "Id": id, "SectionId": cover.SectionId
          }
          if ((cover.PremiumIncludedTax != null && cover.PremiumIncludedTax != '0' && cover.PremiumIncludedTax != undefined && cover.CoverageType != 'A')) {
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTax;
            vehicle['totalPremium'] = vehicle['totalPremium'] - cover.PremiumIncludedTax;
            cover.PremiumIncludedTax = 0;
            cover.PremiumIncludedTax = 0;
          }
          cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
          cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
          // cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
          // cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
          cover['selected'] = true;
          for (let sub of cover.SubCovers) {
            if (sub.SubCoverId == subCover.SubCoverId) {
              cover['isReferal'] = sub.isReferal;
              cover['SumInsured'] = sub.SumInsured;
              cover['Loadings'] = sub.Loadings;
              cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
              cover['MinimumPremium'] = sub.MinimumPremium;
              cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
              cover['Discounts'] = sub?.Discounts;
              cover['CalcType'] = sub?.CalcType;
              cover['Rate'] = sub?.Rate;
              cover['ExcessPercent'] = sub?.ExcessPercent;
              cover['ExcessAmount'] = sub?.ExcessAmount;
              cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
              cover['ExchangeRate'] = sub?.ExchangeRate;
              cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
              cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
              cover['Taxes'] = sub.Taxes;
              cover['SubCoverId'] = sub.SubCoverId;
              sub['selected'] = true;
            }
            else {
              sub['selected'] = false;
            }
          }
          subCover['selected'] = true;
          this.selectedCoverList.push(element);
          if (vehicle?.totalPremium) {
            if (cover.Endorsements != null) {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
            }
            else {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
              vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
            }
          }
          else {
            if (cover.Endorsements != null) {
              vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
              vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
            }
            else {
              vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
              vehicle['totalPremium'] = cover.PremiumIncludedTax;
            }
          }
          this.getTotalVehiclesCost();
        }
        else {
          let sectionEntry = entry.find(ele => ele.SectionId == cover.SectionId);
          if (sectionEntry == undefined) {
            let id = null;
            if (cover.RiskDetails?.RiskId) id = cover.RiskDetails?.RiskId; else id = cover.VehicleId
            let element = {
              "Covers": [
                {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y",
                  //"isReferal": rowData.isReferal
                }
              ],
              "LocationId": vehicle.LocationId,
              "Id": id,
              "SectionId": cover.SectionId
            }
            if ((cover.PremiumIncludedTax != null && cover.PremiumIncludedTax != '0' && cover.PremiumIncludedTax != undefined && cover.CoverageType != 'A')) {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] - cover.PremiumIncludedTax;
              cover.PremiumIncludedTax = 0;
              cover.PremiumIncludedTax = 0;
            }
            cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
            cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
            cover.selected = true;
            cover.SubCoverId = subCover.SubCoverId;
            for (let sub of cover.SubCovers) {
              if (sub.SubCoverId == subCover.SubCoverId) {
                cover['isReferal'] = sub.isReferal;
                cover['SumInsured'] = sub.SumInsured;
                cover['Loadings'] = sub.Loadings;
                cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                cover['MinimumPremium'] = sub.MinimumPremium;
                cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                cover['Discounts'] = sub?.Discounts;
                cover['CalcType'] = sub?.CalcType;
                cover['Rate'] = sub?.Rate;
                cover['ExcessPercent'] = sub?.ExcessPercent;
                cover['ExcessAmount'] = sub?.ExcessAmount;
                cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                cover['ExchangeRate'] = sub?.ExchangeRate;
                cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                cover['Taxes'] = sub.Taxes;
                cover['SubCoverId'] = sub.SubCoverId
                sub['selected'] = true;
              }
              else {
                sub['selected'] = false;
              }
            }
            subCover['selected'] = true;
            this.selectedCoverList.push(element);
            if (vehicle?.totalPremium) {
              if (cover.Endorsements != null) {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
              }
              else {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
              }
            }
            else {
              if (cover.Endorsements != null) {
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
              }
              else {
                vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
                vehicle['totalPremium'] = cover.PremiumIncludedTax;
              }
            }
            this.getTotalVehiclesCost();
          }
          else {
            let covers: any[] = sectionEntry.Covers;
            let findCover = covers.filter(ele => ele.CoverId == cover.CoverId);
            if (findCover.length == 0) {
              let newEntry = {
                "CoverId": cover.CoverId,
                "SubCoverId": subCover.SubCoverId,
                "SubCoverYn": "Y"
              }
              cover.SubCoverId = subCover.SubCoverId;
              cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
              cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
              cover.selected = true;
              for (let sub of cover.SubCovers) {
                if (sub.SubCoverId == subCover.SubCoverId) {
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremium'] = sub.MinimumPremium;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  cover['SubCoverId'] = sub.SubCoverId;
                  sub['selected'] = true;
                }
                else {
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              sectionEntry.Covers.push(newEntry);
              if (vehicle?.totalPremium) {
                if (cover.Endorsements != null) {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                }
                else {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
                }
              }
              else {
                if (cover.Endorsements != null) {
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                }
                else {
                  vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.PremiumIncludedTax;
                }
              }
              this.getTotalVehiclesCost();
            }
            else {
              let newEntry = {
                "CoverId": cover.CoverId,
                "SubCoverId": subCover.SubCoverId,
                "SubCoverYn": "Y"
              }
              if ((cover.PremiumIncludedTax != null && cover.PremiumIncludedTax != '0' && cover.PremiumIncludedTax != undefined && cover.CoverageType != 'A')) {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] - cover.PremiumIncludedTax;
                cover.PremiumIncludedTax = 0;
                cover.PremiumIncludedTax = 0;
              }
              cover.SubCoverId = subCover.SubCoverId;
              cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
              cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
              cover.selected = true;
              for (let sub of cover.SubCovers) {
                if (sub.SubCoverId == subCover.SubCoverId) {
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremium'] = sub.MinimumPremium;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  cover['SubCoverId'] = sub.SubCoverId
                  sub['selected'] = true;
                }
                else {
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              let subIndex = sectionEntry.Covers.findIndex(ele => ele.CoverId == cover.CoverId);
              sectionEntry.Covers[subIndex] = newEntry;
              if (vehicle?.totalPremium) {
                if (cover.Endorsements != null) {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                }
                else {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
                }
              }
              else {
                if (cover.Endorsements != null) {
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
                }
                else {
                  vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
                  vehicle['totalPremium'] = cover.PremiumIncludedTax;
                }
              }
              this.getTotalVehiclesCost();
            }
          }
        }
      }
      else {
        let id = null;
        if (cover.RiskDetails?.RiskId) id = cover.RiskDetails?.RiskId; else id = cover.VehicleId
        let element = {
          "Covers": [{
            "CoverId": cover.CoverId,
            "SubCoverId": subCover.SubCoverId,
            "SubCoverYn": "Y"
          }],
          "LocationId": vehicle.LocationId,
          "Id": id,
          "SectionId": cover.SectionId
        }
        if ((cover.PremiumIncludedTax != null && cover.PremiumIncludedTax != '0' && cover.PremiumIncludedTax != undefined && cover.CoverageType != 'A')) {
          vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTax;
          vehicle['totalPremium'] = vehicle['totalPremium'] - cover.PremiumIncludedTax;
          cover.PremiumIncludedTax = 0;
          cover.PremiumIncludedTax = 0;
        }
        cover.PremiumIncludedTax = subCover.PremiumIncludedTaxLC;
        cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
        cover.selected = true;
        for (let sub of cover.SubCovers) {
          if (sub.SubCoverId == subCover.SubCoverId) {
            cover['isReferal'] = sub.isReferal;
            cover['SumInsured'] = sub.SumInsured;
            cover['Loadings'] = sub.Loadings;
            cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
            cover['MinimumPremium'] = sub.MinimumPremium;
            cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
            cover['Discounts'] = sub?.Discounts;
            cover['CalcType'] = sub?.CalcType;
            cover['Rate'] = sub?.Rate;
            cover['ExcessPercent'] = sub?.ExcessPercent;
            cover['ExcessAmount'] = sub?.ExcessAmount;
            cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
            cover['ExchangeRate'] = sub?.ExchangeRate;
            cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
            cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
            cover['Taxes'] = sub.Taxes;
            cover['SubCoverId'] = sub.SubCoverId
            sub['selected'] = true;
          }
          else {
            sub['selected'] = false;
          }
        }
        subCover['selected'] = true;
        this.selectedCoverList.push(element);
        if (vehicle?.totalPremium) {
          if (cover.Endorsements != null) {
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
            vehicle['totalPremium'] = vehicle['totalPremium'] + cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
          }
          else {
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
            vehicle['totalPremium'] = vehicle['totalPremium'] + subCover.PremiumIncludedTax;
          }
        }
        else {
          if (cover.Endorsements != null) {
            vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
            vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length - 1].PremiumIncludedTax;
          }
          else {
            vehicle['totalLcPremium'] = cover.PremiumIncludedTax;
            vehicle['totalPremium'] = cover.PremiumIncludedTax;
          }
        }
        this.getTotalVehiclesCost();
      }
    }
  }
  getTotalCost(rowData) {
    if (rowData?.totalPremium) return rowData?.totalPremium;
    else return 0;
  }
  getTotalVehiclesCost() {
    let totalCost = 0, i = 0, totalLocalCost = 0;
    for (let veh of this.vehicleDetailsList) {
      if (veh?.totalPremium) totalCost = totalCost + veh?.totalPremium;
      if (veh?.totalLcPremium) totalLocalCost = totalLocalCost + veh?.totalLcPremium;
      i += 1;
      if (i == this.vehicleDetailsList.length) {
        this.localPremiumCost = totalLocalCost;
        this.totalPremium = totalCost;
        if (this.renderedCount == 0) {
          this.renderedCount += 1;
        }
      }
    }
  }
  EmiInstallment() {
    this.yearlySection = false; this.nineMonthSection = false; this.sixMonthSection = false; this.threeMonthSection = false;
    this.twoMonthSection = false; this.fiveMonthSection = false;
    if (this.localCurrency == undefined) { this.localCurrency = 'TZS' }
    else if (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') {
      if (this.productId != '5') {
        const homeData = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        if (homeData && homeData.length > 0) this.localCurrency = homeData[0].Currency;
        else { this.localCurrency = sessionStorage.getItem('LocalCurrency'); }
      }
      else if (this.productId == '5') {
        const customerData = JSON.parse(sessionStorage.getItem('commonDetails'));
        if (customerData && customerData.currencyCode) this.localCurrency = customerData.currencyCode;
        else { this.localCurrency = sessionStorage.getItem('LocalCurrency'); }
      }
    }
    let ReqObj = {
      "PremiumWithTax": this.totalPremium,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "Currency": this.localCurrency,
      "PolicyType": this.emipolicytype,
      "RequestReferenceNo": this.quoteRefNo,
    }
    let urlLink = `${this.CommonApiUrl}api/viewemi`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          //let emiList = data.Result;
          this.emiAllList = data.Result;
          let emiList = [];
          emiList = data.Result;
          if (data.Result.length != 0) {
            let EmiYnShow = data.Result[0].EmiYn;
            if (EmiYnShow == 'Y') {
              this.gridshow = true;
              if (emiList.length != 0) {
                let i = 0, yearlyList = [], nineList = [], sixList = [], threeList = [], twoList = [], fiveList = [], eightList = [],
                  commonList = [], commonList1 = [], commonList2 = [], commonList3 = [], commonList4 = [];
                for (let entry of emiList) {
                  let emiDetails = entry.EmiPremium;
                  let emiAllDetails = entry.EmiDetails;
                  if (emiAllDetails?.InstallmentTypeId == 12 || emiAllDetails?.InstallmentTypeId == '12') {
                    commonList = entry.EmiPremium;
                    this.commonSection = true; this.commonValue = entry?.EmiDetails?.InstallmentTypeId;
                    this.commonName = entry?.EmiDetails?.InstallmentTypeDesc;
                  }
                  if (emiAllDetails?.InstallmentTypeId == 13 || emiAllDetails?.InstallmentTypeId == '13') {
                    commonList1 = entry.EmiPremium;
                    this.commonSection1 = true; this.commonValue1 = entry?.EmiDetails?.InstallmentTypeId;
                    this.commonName1 = entry?.EmiDetails?.InstallmentTypeDesc;
                  }
                  if (emiAllDetails?.InstallmentTypeId == 14 || emiAllDetails?.InstallmentTypeId == '14') {
                    commonList2 = entry.EmiPremium;
                    this.commonSection2 = true; this.commonValue2 = entry?.EmiDetails?.InstallmentTypeId;
                    this.commonName2 = entry?.EmiDetails?.InstallmentTypeDesc;
                  }
                  if (emiAllDetails?.InstallmentTypeId == 16 || emiAllDetails?.InstallmentTypeId == '16') {
                    commonList3 = entry.EmiPremium;
                    this.commonSection3 = true; this.commonValue3 = entry?.EmiDetails?.InstallmentTypeId;
                    this.commonName3 = entry?.EmiDetails?.InstallmentTypeDesc;
                  }
                  if (emiAllDetails?.InstallmentTypeId == 17 || emiAllDetails?.InstallmentTypeId == '17') {
                    commonList4 = entry.EmiPremium;
                    this.commonSection4 = true; this.commonValue4 = entry?.EmiDetails?.InstallmentTypeId;
                    this.commonName4 = entry?.EmiDetails?.InstallmentTypeDesc;
                  }
                  else {
                    if ((emiDetails.length == 13 || emiDetails.length == 12) && emiAllDetails?.InstallmentTypeId == '1') {
                      this.yearlySection = true; this.yearlyValue = entry?.EmiDetails?.InstallmentTypeId;
                      this.yearlyName = entry?.EmiDetails?.InstallmentTypeDesc;
                      yearlyList = entry.EmiPremium;
                    }
                    else if (emiDetails.length == 10) {
                      nineList = entry.EmiPremium;
                      this.nineMonthSection = true; this.nineValue = entry?.EmiDetails?.InstallmentTypeId;
                      this.nineMonthName = entry?.EmiDetails?.InstallmentTypeDesc;
                    }
                    else if (emiDetails.length == 6 && (emiAllDetails?.InstallmentTypeId == '2' || emiAllDetails?.InstallmentTypeId == '1')) {
                      sixList = entry.EmiPremium;
                      this.sixMonthSection = true; this.sixValue = entry?.EmiDetails?.InstallmentTypeId;
                      this.sixMonthName = entry?.EmiDetails?.InstallmentTypeDesc;
                    }
                    else if (emiDetails.length == 4 && emiAllDetails?.InstallmentTypeId == '3') {
                      threeList = entry.EmiPremium;
                      this.threeMonthSection = true; this.threeValue = entry?.EmiDetails?.InstallmentTypeId;
                      this.threeMonthName = entry?.EmiDetails?.InstallmentTypeDesc;
                    }
                    // else if(emiDetails.length==6){
                    //   fiveList = entry.EmiPremium;
                    //   this.fiveMonthSection = true;
                    //   this.fiveMonthName = entry?.EmiDetails?.InstallmentTypeDesc;
                    // }
                    else if (emiDetails.length == 9) {
                      eightList = entry.EmiPremium;
                      this.eightMonthSection = true;
                      this.eightMonthName = entry?.EmiDetails?.InstallmentTypeDesc;
                      this.eightValue = entry?.EmiDetails?.InstallmentTypeId;
                    }
                    else if (emiDetails.length == 3) {
                      threeList = entry.EmiPremium; this.threeMonthSection = true;
                      this.threeMonthName = entry?.EmiDetails?.InstallmentTypeDesc;
                      this.threeValue = entry?.EmiDetails?.InstallmentTypeId;
                    }
                    else if (emiDetails.length == 5) {
                      fiveList = entry.EmiPremium;
                      this.fiveMonthSection = true;
                      this.fiveMonthName = entry?.EmiDetails?.InstallmentTypeDesc;
                      this.fiveValue = entry?.EmiDetails?.InstallmentTypeId;
                    }
                    else if ((emiDetails.length == 2) && emiAllDetails?.InstallmentTypeId == '6') {
                      twoList = entry.EmiPremium;
                      this.twoMonthSection = true; this.twoValue = entry?.EmiDetails?.InstallmentTypeId;
                      this.twoMonthName = entry?.EmiDetails?.InstallmentTypeDesc;
                    }
                  }
                  i += 1;
                  if (i == emiList.length) {
                    this.setEmiTableValues(yearlyList, nineList, sixList, threeList, twoList, fiveList, eightList, commonList, commonList1, commonList2, commonList3);
                  }
                }
              }
              else {
                this.emiYN = 'N';
                // let type: NbComponentStatus = 'danger';
                // const config = {
                //   status: type,
                //   destroyByClick: true,
                //   duration: 4000,
                //   hasIcon: true,
                //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //   preventDuplicates: false,
                // };
                // this.toastrService.show(
                //   'EMI Option',
                //   'No EMI Plan Available',
                //   config);
              }
            }
            else {
              this.gridshow = false;
            }
          }
          else { this.emiYN = 'N' }
          //this.getBorrowerList();
        }
      },
      (err) => { },
    );
  }
  onEMIChange() {
    if (this.emiPeriod != 'N') {
      if (this.EmiDetails == null || this.EmiDetails == undefined || this.EmiDetails.length == 0) {
      }
    }
  }
  onEmiYNChange() {
    if (this.emiYN == 'Y') {
      this.EmiInstallment();
    }
  }
  setEmiTableValues(yearlyList, nineList, sixList, threeList, twoList, fiveList, eightList, commonList, commonList1, commonList2, commonList3) {
    if (this.yearlySection) {
      let i = 0; this.Emilist1 = [];
      for (let entry of yearlyList) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = sixList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['sixAmount'] = num.InstallmentAmount
          }
          else { data['sixAmount'] = null }
        }
        else { data['sixAmount'] = null }
        if (threeList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = threeList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['threeAmount'] = num.InstallmentAmount
          }
          else { data['threeAmount'] = null }
        }
        else { data['threeAmount'] = null }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        else { data['twoAmount'] = null }
        if (fiveList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = fiveList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['fiveAmount'] = num.InstallmentAmount
          }
          else { data['fiveAmount'] = null }
          // data['fiveAmount']=fiveList[i].InstallmentAmount
        }
        else { data['fiveAmount'] = null }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == yearlyList.length) { this.emiSection = true }
      }
    }
    else if (this.nineMonthSection) {
      let i = 0; this.Emilist1 = [];
      for (let entry of nineList) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList[i]) { data['sixAmount'] = sixList[i].InstallmentAmount }
        else { data['sixAmount'] = null }
        if (threeList[i]) { data['threeAmount'] = threeList[i].InstallmentAmount }
        else { data['threeAmount'] = null }
        if (fiveList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = fiveList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['fiveAmount'] = num.InstallmentAmount
          }
          else { data['fiveAmount'] = null }
          // data['fiveAmount']=fiveList[i].InstallmentAmount
        }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == nineList.length) { this.emiSection = true }
      }
    }
    else if (this.sixMonthSection) {
      let i = 0; this.Emilist1 = [];
      for (let entry of sixList) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList[i]) { data['sixAmount'] = sixList[i].InstallmentAmount }
        else { data['sixAmount'] = null }
        if (threeList[i]) { data['threeAmount'] = threeList[i].InstallmentAmount }
        else { data['threeAmount'] = null }
        if (fiveList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = fiveList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['fiveAmount'] = num.InstallmentAmount
          }
          else { data['fiveAmount'] = null }
          // data['fiveAmount']=fiveList[i].InstallmentAmount
        }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == sixList.length) { this.emiSection = true }
      }
    }
    else if (this.threeMonthSection) {
      let i = 0; this.Emilist1 = [];
      for (let entry of threeList) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList[i]) { data['sixAmount'] = sixList[i].InstallmentAmount }
        else { data['sixAmount'] = null }
        if (threeList[i]) { data['threeAmount'] = threeList[i].InstallmentAmount }
        else { data['threeAmount'] = null }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        if (fiveList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = fiveList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['fiveAmount'] = num.InstallmentAmount
          }
          else { data['fiveAmount'] = null }
          // data['fiveAmount']=fiveList[i].InstallmentAmount
        }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == threeList.length) { this.emiSection = true }
      }
    }
    else if (this.fiveMonthSection) {
      let i = 0; this.Emilist1 = [];
      for (let entry of fiveList) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList[i]) { data['sixAmount'] = sixList[i].InstallmentAmount }
        else { data['sixAmount'] = null }
        if (threeList[i]) { data['threeAmount'] = threeList[i].InstallmentAmount }
        else { data['threeAmount'] = null }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        if (fiveList[i]) { data['fiveAmount'] = fiveList[i].InstallmentAmount }
        else { data['fiveAmount'] = null }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == fiveList.length) { this.emiSection = true }
      }
    }
    else if (this.eightMonthSection) {
      let i = 0; this.Emilist1 = [];
      for (let entry of eightList) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList[i]) { data['sixAmount'] = sixList[i].InstallmentAmount }
        else { data['sixAmount'] = null }
        if (threeList[i]) { data['threeAmount'] = threeList[i].InstallmentAmount }
        else { data['threeAmount'] = null }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        if (fiveList[i]) { data['fiveAmount'] = fiveList[i].InstallmentAmount }
        else { data['fiveAmount'] = null }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == eightList.length) { this.emiSection = true }
      }
    }
    else if (this.commonSection) {
      let i = 0; this.Emilist1 = [];
      for (let entry of commonList) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList[i]) { data['sixAmount'] = sixList[i].InstallmentAmount }
        else { data['sixAmount'] = null }
        if (threeList[i]) { data['threeAmount'] = threeList[i].InstallmentAmount }
        else { data['threeAmount'] = null }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        if (fiveList[i]) { data['fiveAmount'] = fiveList[i].InstallmentAmount }
        else { data['fiveAmount'] = null }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == commonList.length) { this.emiSection = true }
      }
    }
    else if (this.commonSection1) {
      let i = 0; this.Emilist1 = [];
      for (let entry of commonList1) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList[i]) { data['sixAmount'] = sixList[i].InstallmentAmount }
        else { data['sixAmount'] = null }
        if (threeList[i]) { data['threeAmount'] = threeList[i].InstallmentAmount }
        else { data['threeAmount'] = null }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        if (fiveList[i]) { data['fiveAmount'] = fiveList[i].InstallmentAmount }
        else { data['fiveAmount'] = null }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == commonList1.length) { this.emiSection = true }
      }
    }
    else if (this.commonSection2) {
      let i = 0; this.Emilist1 = [];
      for (let entry of commonList2) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList[i]) { data['sixAmount'] = sixList[i].InstallmentAmount }
        else { data['sixAmount'] = null }
        if (threeList[i]) { data['threeAmount'] = threeList[i].InstallmentAmount }
        else { data['threeAmount'] = null }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        if (fiveList[i]) { data['fiveAmount'] = fiveList[i].InstallmentAmount }
        else { data['fiveAmount'] = null }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == commonList2.length) { this.emiSection = true }
      }
    }
    else if (this.commonSection3) {
      let i = 0; this.Emilist1 = [];
      for (let entry of commonList3) {
        let data = entry;
        if (yearlyList[i]) { data['yearlyAmount'] = yearlyList[i].InstallmentAmount }
        else { data['yearlyAmount'] = null }
        if (nineList[i]) { data['nineAmount'] = nineList[i].InstallmentAmount }
        else { data['nineAmount'] = null }
        if (sixList[i]) { data['sixAmount'] = sixList[i].InstallmentAmount }
        else { data['sixAmount'] = null }
        if (threeList[i]) { data['threeAmount'] = threeList[i].InstallmentAmount }
        else { data['threeAmount'] = null }
        if (twoList.some(ele => ele.DueDate == entry.DueDate)) {
          let num = twoList.find(ele => ele.DueDate == entry.DueDate)
          if (num) {
            data['twoAmount'] = num.InstallmentAmount
          }
          else { data['twoAmount'] = null }
        }
        if (fiveList[i]) { data['fiveAmount'] = fiveList[i].InstallmentAmount }
        else { data['fiveAmount'] = null }
        if (eightList[i]) { data['eightAmount'] = eightList[i].InstallmentAmount }
        else { data['eightAmount'] = null }
        if (commonList[i]) { data['commonAmount'] = commonList[i].InstallmentAmount }
        else { data['commonAmount'] = null }
        if (commonList1[i]) { data['commonAmount1'] = commonList1[i].InstallmentAmount }
        else { data['commonAmount1'] = null }
        if (commonList2[i]) { data['commonAmount2'] = commonList2[i].InstallmentAmount }
        else { data['commonAmount2'] = null }
        if (commonList3[i]) { data['commonAmount3'] = commonList3[i].InstallmentAmount }
        else { data['commonAmount3'] = null }
        this.Emilist1.push(entry);
        i += 1;
        if (i == commonList3.length) { this.emiSection = true }
      }
    }
  }
  canbeChecked(rowData) {
    if (rowData?.selected != undefined) {
      return rowData.selected;
    }
    else return true;
  }
  canbeBenefitChecked(rowData) {
    if (this.quoteNo) {
      if (rowData?.selected != undefined) {
        return rowData.selected;
      }
      else return false;
    }
    else return true;
  }
  canbeChecked2(rowData) {
    if (rowData?.selected != undefined && rowData.CoverageType != 'A' && rowData.PremiumIncludedTaxLC != null && rowData.PremiumIncludedTaxLC != 0) {
      return rowData.selected;
    }
    return false;
  }
  canbeChecked3(vehicle) {
    let coverList = vehicle.CoverList;
    let i = 0;
    let entry = coverList.some(ele => ele.PremiumIncludedTaxLC != 0 && ele.PremiumIncludedTaxLC != null);
    return entry;
  }
  getOccupationDesc(rowData) {
    return rowData.RiskDetails.OccupationTypeDesc
  }
  onSelectCover(rowData, event, vehicleId, vehicleData, type, directType) {
    if (event == null) {
      event = !this.canbeChecked(rowData);
    }
    let vehicle: any;
    if (this.productId != '4' && this.productId != '5' && this.productId != '46' && this.productId != '29') {
      vehicle = this.vehicleDetailsList.find(ele => (ele.LocationId == rowData.LocationId && ele.SectionId == rowData.SectionId));
      if (vehicle == undefined) vehicle = vehicleData
    }
    else { vehicle = this.vehicleDetailsList.find(ele => ele.VehicleId == vehicleId); }
    if (event) {
      rowData.selected = true;
      rowData['UserOpt'] = 'Y';
      if (rowData.DifferenceYN == undefined && this.coverModificationYN == 'Y') {
        if (vehicle.Status == 'D') rowData.DifferenceYN = 'N';
        else rowData.DifferenceYN = 'Y'
      }
      if (this.selectedCoverList.length != 0) {
        let entry = this.selectedCoverList.filter(ele => (ele.Id == vehicleId && (this.productId == '5' || this.productId == '46' || this.productId == '4')) || (ele.Id == rowData.RiskId && ele.SectionId == rowData.SectionId && ele.LocationId == rowData.LocationId && (this.productId != '5' && this.productId != '46' && this.productId != '4')));
        if (entry.length == 0) {
          let id = null;
          if (this.productId == '4' && this.insuranceId == '100002') {
            if (rowData.VehicleId) id = vehicleId
          }
          else {
            if (rowData.RiskDetails?.RiskId) id = rowData.RiskDetails?.RiskId; else id = vehicleId
          }
          if (rowData.SubCovers == null) {
            let element = {
              "Covers": [
                {
                  "CoverId": rowData.CoverId,
                  "SubCoverId": null,
                  "SubCoverYn": "N",
                  //"isReferal": rowData.isReferal
                }
              ],
              "LocationId": rowData.LocationId,
              "Id": id,
              "SectionId": rowData.SectionId,
            }
            this.selectedCoverList.push(element);
          }
          if (directType == 'change' && this.endorsementSection) {
            if ((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable == undefined || rowData.Modifiable != 'N')) {
              rowData['ModifiedYN'] = 'Y';
            }
            if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
              if (this.coverModificationYN == 'Y') {
                if (rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax < 0) {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                }
                else {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                }
              }
              else {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              }
              //rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax = 0;
            }
            else {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.PremiumIncludedTax;
            }
          }
          else if (vehicle?.totalPremium) {
            rowData['Modifiable'] = 'N';
            if (this.endorseAddOnCovers || this.endorseCovers) {
              rowData['ModifiedYN'] = 'N';
            }
            if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
              if (this.coverModificationYN != 'Y' || this.endorseSIModification || vehicle.Status == 'D') {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              }
            }
            else {
              if (rowData.CoverageType != 'A') {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.PremiumIncludedTax;
              }
            }
          }
          else {
            rowData['Modifiable'] = 'N';
            if (this.endorseAddOnCovers || this.endorseCovers) {
              rowData['ModifiedYN'] = 'N';
            }
            if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
              if (this.coverModificationYN != 'Y' || this.endorseSIModification || vehicle.Status == 'D') {
                if (!vehicle?.totalLcPremium) { vehicle['totalLcPremium'] = 0; }
                if (!vehicle?.totalPremium) { vehicle['totalPremium'] = 0; }
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              }
            }
            else {
              if (rowData.CoverageType != 'A') {
                vehicle['totalLcPremium'] = rowData.PremiumIncludedTax;
                vehicle['totalPremium'] = rowData.PremiumIncludedTax;
              }
            }
          }
          this.getTotalVehiclesCost();
          //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
        }
        else {
          let sectionEntry: any;
          if (this.insuranceId == '100046') {
            if (this.productId == '4') sectionEntry = entry.find(ele => ele.VehicleId == rowData.VehicleId);
            else sectionEntry = entry.find(ele => ele.SectionId == rowData.SectionId);
          }
          else {
            if (this.productId == '4') sectionEntry = entry.find(ele => ele.VehicleId == rowData.VehicleId);
            else sectionEntry = entry.find(ele => ele.SectionId == rowData.SectionId);
          }
          if (sectionEntry == undefined) {
            if (rowData.SubCovers == null) {
              let id = null;
              if (this.productId == '4' && this.insuranceId == '100002') {
                if (rowData.VehicleId) id = vehicleId
              }
              else {
                if (rowData.RiskDetails?.RiskId) id = rowData.RiskDetails?.RiskId; else id = vehicleId
              }
              let element = {
                "Covers": [
                  {
                    "CoverId": rowData.CoverId,
                    "SubCoverId": null,
                    "SubCoverYn": "N",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "LocationId": rowData.LocationId,
                "Id": id,
                "SectionId": rowData.SectionId,
              }
              this.selectedCoverList.push(element);
              if (this.endorseAddOnCovers || this.endorseCovers) {
                rowData['ModifiedYN'] = 'Y';
              }
            }
            if (directType == 'change' && this.endorsementSection) {
              if ((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable == undefined || rowData.Modifiable != 'N')) {
                rowData['ModifiedYN'] = 'Y';
              }
              if (this.coverModificationYN == 'Y' && this.endorsementSection && vehicle?.totalPremium && rowData.Endorsements != null) {
                if (rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax < 0) {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                }
                else {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                }
              }
              else if (vehicle?.totalPremium) {
                rowData['Modifiable'] = 'N';
                if (this.endorseAddOnCovers || this.endorseCovers) {
                  rowData['ModifiedYN'] = 'N';
                }
                if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
                  if (this.coverModificationYN != 'Y' || this.endorseSIModification) {
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                    vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  }
                }
                else {
                  if (rowData.CoverageType != 'A') {
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.PremiumIncludedTax;
                  }
                }
              }
              else {
                rowData['Modifiable'] = 'N';
                if (this.endorseAddOnCovers || this.endorseCovers) {
                  rowData['ModifiedYN'] = 'N';
                }
                if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
                  if (this.coverModificationYN != 'Y' || this.endorseSIModification) {
                    vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                    vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  }
                }
                else {
                  if (rowData.CoverageType != 'A') {
                    vehicle['totalLcPremium'] = rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] = rowData.PremiumIncludedTax;
                  }
                }
              }
            }
            else if (vehicle?.totalPremium) {
              rowData['Modifiable'] = 'N';
              if (this.endorseAddOnCovers || this.endorseCovers) {
                rowData['ModifiedYN'] = 'N';
              }
              if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
                if (this.coverModificationYN != 'Y' || this.endorseSIModification) {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                }
              }
              else {
                if (rowData.CoverageType != 'A') {
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.PremiumIncludedTax;
                }
              }
            }
            else {
              rowData['Modifiable'] = 'N';
              if (this.endorseAddOnCovers || this.endorseCovers) {
                rowData['ModifiedYN'] = 'N';
              }
              if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
                if (this.coverModificationYN != 'Y' || this.endorseSIModification) {
                  vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                }
              }
              else {
                if (rowData.CoverageType != 'A') {
                  vehicle['totalLcPremium'] = rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] = rowData.PremiumIncludedTax;
                }
              }
            }
            this.getTotalVehiclesCost();
          }
          else {
            let covers: any[] = sectionEntry.Covers;
            let findCover = covers.filter(ele => ele.CoverId == rowData.CoverId);
            if (findCover.length == 0) {
              if (rowData.SubCovers == null) {
                let element = {
                  "CoverId": rowData.CoverId,
                  "SubCoverId": null,
                  "SubCoverYn": "N",
                }
                sectionEntry.Covers.push(element)
              }
              if (directType == 'change' && this.endorsementSection) {
                if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
                  if (this.coverModificationYN == 'Y') {
                    if (rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax < 0) {
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                      vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                    }
                    else {
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                      vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                    }
                  }
                  else {
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                    vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  }
                }
                else {
                  if (!vehicle?.totalLcPremium) { vehicle['totalLcPremium'] = 0; }
                  if (!vehicle?.totalPremium) { vehicle['totalPremium'] = 0; }
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                  vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.PremiumIncludedTax;
                }
              }
              else if (vehicle?.totalPremium) {
                if (this.endorseAddOnCovers || this.endorseCovers) {
                  rowData['ModifiedYN'] = 'N';
                }
                if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
                  if (this.coverModificationYN != 'Y' || this.endorseSIModification) {
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                    vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  }
                }
                else {
                  if (rowData.CoverageType != 'A') {
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.PremiumIncludedTax;
                  }
                }
              }
              else {
                if (this.endorseAddOnCovers || this.endorseCovers) {
                  rowData['ModifiedYN'] = 'N';
                }
                if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
                  if (this.coverModificationYN != 'Y' || this.endorseSIModification) {
                    if (!vehicle?.totalLcPremium) { vehicle['totalLcPremium'] = 0; }
                    if (!vehicle?.totalPremium) { vehicle['totalPremium'] = 0; }
                    vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                    vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                  }
                }
                else {
                  if (!vehicle?.totalLcPremium) { vehicle['totalLcPremium'] = 0; }
                  if (!vehicle?.totalPremium) { vehicle['totalPremium'] = 0; }
                  if (rowData.CoverageType != 'A') {
                    vehicle['totalLcPremium'] = rowData.PremiumIncludedTax;
                    vehicle['totalPremium'] = rowData.PremiumIncludedTax;
                  }
                }
              }
              this.getTotalVehiclesCost();
            }
          }
        }
      }
      else {
        if (rowData.SubCovers == null) {
          let id = null;
          if (this.productId == '4' && this.insuranceId == '100002') {
            if (rowData.VehicleId) id = vehicleId
          }
          else {
            if (rowData.RiskDetails?.RiskId) id = rowData.RiskDetails?.RiskId; else id = vehicleId
          }
          let element = {
            "Covers": [
              {
                "CoverId": rowData.CoverId,
                "SubCoverId": null,
                "SubCoverYn": "N"
              }
            ],
            "LocationId": rowData.LocationId,
            "Id": id,
            "SectionId": rowData.SectionId,
          }
          this.selectedCoverList.push(element);
        }
        if (directType == 'change' && this.endorsementSection) {
          if ((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable == undefined || rowData.Modifiable != 'N')) {
            rowData['ModifiedYN'] = 'Y';
          }
          if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
            if (this.coverModificationYN == 'Y') {
              if (rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax < 0) {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              }
              else {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              }
            }
            else {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
            }
          }
          else {
            if (rowData.CoverageType != 'A') {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.PremiumIncludedTax;
            }
          }
        }
        else if (vehicle?.totalPremium) {
          if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
            if (this.coverModificationYN != 'Y' || this.endorseSIModification) {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
            }
          }
          else {
            if (rowData.CoverageType != 'A') {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.PremiumIncludedTax;
            }
          }
        }
        else {
          if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
            if (this.coverModificationYN != 'Y' || this.endorseSIModification) {
              vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
            }
            else {
            }
          }
          else {
            if (rowData.CoverageType != 'A') {
              vehicle['totalLcPremium'] = rowData.PremiumIncludedTax;
              vehicle['totalPremium'] = rowData.PremiumIncludedTax;
            }
          }
        }
        this.getTotalVehiclesCost();
      }
    }
    else {
      console.log("Event Data", rowData)
      let entry = null;
      rowData['selected'] = false;
      rowData['UserOpt'] = 'N';
      if (this.productId != '5' && this.productId != '46' && this.productId != '4') {
        entry = this.selectedCoverList.filter(ele => ele.Id == rowData.RiskDetails.RiskId && ele.LocationId == rowData.LocationId)
      }
      else entry = this.selectedCoverList.filter(ele => ele.Id == vehicleId)
      if (entry) {
        let sectionEntry = entry.find(ele => ele.SectionId == rowData.SectionId && ele.LocationId == rowData.LocationId);
        if (sectionEntry != undefined) {
          let covers: any[] = sectionEntry.Covers;
          let CoverIndex = covers.findIndex(ele => ele.CoverId == rowData.CoverId);
          covers = covers.filter(ele => ele.CoverId != rowData.CoverId);
          if (covers.length == 0 && (this.productId == '5' || this.productId == '46' || this.productId == '4')) this.selectedCoverList = this.selectedCoverList.filter(ele => ele.Id != rowData.RiskDetails.RiskId && ele.LocationId == rowData.LocationId)
          else {
            let finalList = [], i = 0;
            for (let sec of this.selectedCoverList) {
              if (sec.Id == rowData.RiskDetails.RiskId && sec.SectionId == rowData.SectionId && sec.LocationId == rowData.LocationId) {
                sec.Covers = sec.Covers.filter(ele => ele.CoverId != rowData.CoverId);
              }
              if (sec.Covers.length != 0) finalList.push(sec)
              i += 1;
              if (i == this.selectedCoverList.length) this.selectedCoverList = finalList;
            }
          }
          if (this.coverModificationYN == 'Y') { rowData['DifferenceYN'] = 'N'; }
          if (directType == 'change' && this.endorsementSection) {
            if (!vehicle?.totalLcPremium) { vehicle['totalLcPremium'] = 0; }
            if (!vehicle?.totalPremium) { vehicle['totalPremium'] = 0; }
            if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
              if (this.coverModificationYN == 'Y') {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] + rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              }
              else {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              }
            }
            else {
              if (rowData.CoverageType != 'A') {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.PremiumIncludedTax;
              }
            }
          }
          else if (vehicle?.totalPremium) {
            if (rowData.Endorsements != null && rowData.Endorsements != undefined) {
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
              vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.Endorsements[rowData.Endorsements.length - 1].PremiumIncludedTax;
            }
            else {
              if (rowData.CoverageType != 'A') {
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTax;
                vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.PremiumIncludedTax;
              }
            }
          }
          if (rowData.SubCovers) {
            rowData.SubCoverId = null;
            for (let sub of rowData.SubCovers) {
              sub['selected'] = false;
            }
          }
          this.getTotalVehiclesCost();
        }
      }
    }
    console.log("Entry Filter1", this.selectedCoverList)
  }
  ClausesStatuss() {
    this.showCoverList = false;
    // this.ClausesSection=true;
    this.onClauses = true;
    this.onWarranty = false;
    this.onExclusion = false;
    this.newAddClauses = false;
    this.newAddExclusion = false;
    this.newAddWarranty = false;
  }
  ExclusioStatuss() {
    this.onExclusion = true;
    this.onWarranty = false;
    this.onClauses = false;
    this.newAddClauses = false;
    this.newAddExclusion = false;
    this.newAddWarranty = false;
  }
  WarrantyStatuss() {
    this.onWarranty = true;
    this.onClauses = false;
    this.onExclusion = false;
    this.newAddClauses = false;
    this.newAddExclusion = false;
    this.newAddWarranty = false;
    let common
  }
  OnClose() {
    this.onExclusion = false;
    this.onWarranty = false;
    this.onClauses = false;
    this.clause = false;
  }
  onAddClause() {
    this.newAddClauses = true;
  }
  onAddExclusion() {
    this.newAddExclusion = true;
  }
  onAddWarranty() {
    this.newAddWarranty = true;
  }
  editClauses(id) {
  }
  saveClausesData(rawData, type) {
    let quote: any;
    if (this.quoteNo) {
      quote = this.quoteNo;
    }
    else {
      quote = "";
    }
    let i = 0;
    // if(type){
    //   if(type=='Clauses'){
    //   id="6";
    //   }
    //   else if(type=='Exclusion'){
    //  id="7";
    //   }
    //   else if(type=='Warranty'){
    //     id="4";
    //   }      
    //   }
    for (let f of rawData) {
      f['SectionId'] = this.termsSectionId;
      if (f.TypeId != 'D') {
        rawData[i].TypeId = 'O';
      }
      i += 1;
      if (i == rawData.length) {
        let Req = {
          BranchCode: this.branchCode,
          CreatedBy: this.loginId,
          InsuranceId: this.insuranceId,
          ProductId: this.productId,
          QuoteNo: quote,
          RiskId: String(this.tabIndex + 1),
          SectionId: this.termsSectionId,
          TermsAndConditionReq: rawData,
          RequestReferenceNo: this.requestReferenceNo
        };
        let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
        this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
          if (data.Result) {
            this.onExclusion = false;
            this.onWarranty = false;
            this.onClauses = false;
            this.clause = false;
            if (type) {
              if (type == 'Clauses') {
                this.viewCondition('direct');
                this.showCoverList = true;
              }
              else if (type == 'Exclusion') {
                this.viewCondition('direct');
                this.onExclusion = true;
              }
              else if (type == 'Warranty') {
                this.viewCondition('direct');
                this.onWarranty = true;
              }
              else {
              }
            }
          }
        });
      }
    }
  }
  setDiscountDetails(vehData, rowData, modal) {
    this.selectedVehId = vehData.VehicleId;
    this.selectedCoverId = rowData.CoverId;
    this.ratePercent = rowData.Rate;
    this.CoverName = rowData.CoverName;
    this.minimumPremiumYN = rowData.MinimumPremiumYn;
    if (rowData.Discounts) this.discountList = rowData.Discounts;
    if (rowData.Loadings) this.loadingList = rowData.Loadings;
    if (rowData.Endorsements) {
      this.discountEndtSection = true;
      this.sumInsured = rowData.SumInsured;
      //this.sumInsured = rowData.Endorsements[rowData.Endorsements.length-1].EndorsementSumInsured;
      this.calcType = rowData.Endorsements[rowData.Endorsements.length - 1].EndorsementCalcType;
      this.excessPercent = rowData.Endorsements[rowData.Endorsements.length - 1].ExcessPercent;
      this.ratePercent = rowData.Endorsements[rowData.Endorsements.length - 1].EndorsementRate;
      this.excessAmount = rowData.Endorsements[rowData.Endorsements.length - 1].ExcessAmount;
      this.differenceSI = rowData.Endorsements[rowData.Endorsements.length - 1].EndorsementSumInsured;
      this.differencePremium = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumAfterDiscount
      this.beforeDiscount = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumBeforeDiscount;
      this.selectedSectionId = vehData.SectionId;
    }
    else {
      this.discountEndtSection = false;
      this.sumInsured = rowData.SumInsured;
      this.calcType = rowData.CalcType;
      this.selectedSectionId = vehData.SectionId;
      this.ratePercent = rowData.Rate;
      this.excessPercent = rowData.ExcessPercent;
      this.excessAmount = rowData.ExcessAmount;
      this.beforeDiscount = rowData.PremiumBeforeDiscount;
      this.afterDiscount = rowData.PremiumAfterDiscount;
    }
    this.excessDetailModal = true; this.discountDetailModal = false;
    // if(modal=='excess'){this.excessDetailModal=true;this.discountDetailModal=false;}
    // else{this.excessDetailModal=false;this.discountDetailModal=true;}
    //this.discountOpen(modal);
  }
  ongetTaxDetails(rowData) {
    this.MinimumPremium = (rowData.MinimumPremium / rowData.ExchangeRate);
    this.premiumExcluedTax = rowData.PremiumExcluedTax;
    this.premiumIncluedTax = rowData.PremiumIncludedTax;
    this.dependantTaxList = []; this.taxList = [];
    this.premiumBeforeTax = 0;
    this.proRataPercent = rowData.ProRata;
    this.premiumAfterDiscount = rowData.PremiumAfterDiscount;
    if (rowData.Taxes) {
      if (rowData.Taxes.length != 0) {
        this.dependantTaxList = rowData.Taxes.filter(ele => ele.DependentYN == 'N');
        if (this.dependantTaxList.length != 0) {
          let i = 0;
          for (let tax of this.dependantTaxList) {
            this.premiumBeforeTax = this.premiumBeforeTax + tax.TaxAmount; i += 1;
            if (i == this.dependantTaxList.length) this.premiumBeforeTax = this.premiumBeforeTax + this.premiumExcluedTax;
          }
        }
        this.taxList = rowData.Taxes.filter(ele => ele.DependentYN != 'N');
      }
    }
    this.discountDetailModal = true; this.excessDetailModal = false;
  }
  getEditQuoteDetails() {
    let i = 0;
    for (let veh of this.vehicleDetailsList) {
      if (veh.VehicleId) veh['Vehicleid'] = veh.VehicleId
      if (i == 0) { //this.remarks = veh.AdminRemarks;
        this.rejectedReason = veh.RejectReason
      }
      let covers = veh.CoverList;
      let j = 0;
      for (let cover of covers) {
        let entry = this.vehicleDetailsList.find(ele => (String(ele.Vehicleid) == String(veh.VehicleId) && (this.productId == '5' || this.productId == '46') || ((this.productId != '5' && this.productId != '46' && String(ele.LocationId) == String(veh.LocationId)))))
        if (entry) {
          let coverList = entry.CoverList;
          if (cover.UserOpt == 'Y') {
            let coverEntry = coverList.find(ele => ele.CoverId == cover.CoverId)
            if (coverEntry) {
              if (this.endorsementId == 846 && veh.Status == 'D') {
                cover['selected'] = false;
                // this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
              }
              else {
                cover['selected'] = true;
                let entry = this.selectedCoverList.find(ele => ele.SectionId == cover.SectionId);
                if (entry) {
                  let coverEntry = entry.Covers.find(ele => ele.CoverId == cover.CoverId);
                  if (!coverEntry) this.onSelectCover(cover, true, cover.VehicleId, veh, 'coverList', 'direct');
                }
                else this.onSelectCover(cover, true, cover.VehicleId, veh, 'coverList', 'direct');
              }
            }
          }
          else if (this.endorseAddOnCovers || this.endorseCovers || this.endorseSIModification) {
            if (cover.ModifiedYN == undefined) {
              cover['Modifiable'] = 'N';
              cover['ModifiedYN'] = 'Y';
            }
          }
        }
        j += 1;
        if (j == covers.length) i += 1;
      }
      if (i == this.vehicleDetailsList.length) {
        this.getExcessDetails()
        this.showSection = true;
        if (this.vehicleDetailsList.some(ele => ele.ManualReferalYn == 'Y') && !this.adminSection && this.statusValue) {
          this.isMannualReferal = "N";
        }
        this.selectedRowData = this.vehicleDetailsList[0];
        this.onSelectSection();
        this.coverSection = true;
      }
    }
  }
  checkNextBtn(rowData, index) {
    return index == this.vehicleDetailsList.length - 1;
  }
  onFormSubmit(index) {
    this.subuserType = sessionStorage.getItem('typeValue');
    if (index != null && index != undefined && index != '') this.tabIndex = index;
    if (this.selectedCoverList.length != 0) {
      let coverList: any[] = [];
      let loginType = this.userDetails.Result.LoginType;
      let i = 0;
      this.onProceed(this.selectedCoverList);
      // if(loginType){
      //   if(loginType=='B2CFlow' && this.sampleloginId =='guest'){
      //     this.customerReferenceNo = null;
      //     let customerObj = JSON.parse(sessionStorage.getItem('b2cCustomerObj'));
      //       this.customerObj = this.customerDetails
      // 			this.customerReferenceNo = sessionStorage.getItem('customerReferenceNo');
      // 			this.generateOtp();
      //   }
      //   else this.onProceed(this.selectedCoverList);
      // }
      // else 
    }
  }
  getCoverNameAlt(value) {
    if (value != null && value != undefined) {
      return String(value.replaceAll(' ', ''));
    }
    else { return '' }
  }
  onProceed(coverList: any) {
    if (this.statusValue == 'RA' && !this.adminSection) {
      if (this.productId != '4') {
        if (this.productId == '59' || this.productId == '19' || this.productId == '39' || this.productId == '32' || this.productId == '14' || this.productId == '1' || this.productId == '6' || this.productId == '16' || this.productId == '42' || this.productId == '43' || this.productId == '25' || this.productId == '60' || this.productId == '57' || this.productId == '56' || this.productId == '63') {
          let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
          if (homeSession) {
            if (this.loginType == 'B2CFlow' && this.loginId == 'guest') {
              window.location.reload();
            }
            else {
              if (this.insuranceId != '100002') {
                if (this.userType != 'Broker') {
                  this.router.navigate(['/quotation/plan/co-insurance-details'])
                }
                else {
                  this.router.navigate(['/quotation/plan/main/document-info'])
                }
              }
              else {
                this.router.navigate(['/quotation/plan/main/document-info'])
              }
            }
          }
          else {
            if (this.productId == '59') this.getExistingBuildingList();
            else if (this.loginType == 'B2CFlow' && this.loginId == 'guest') {
              window.location.reload();
            }
            else {
              if (this.insuranceId != '100002') {
                if (this.userType != 'Broker') {
                  this.router.navigate(['/quotation/plan/co-insurance-details'])
                }
                else {
                  this.router.navigate(['/quotation/plan/main/document-info'])
                }
              }
              else {
                this.router.navigate(['/quotation/plan/main/document-info'])
              }
            }
            //else  this.router.navigate(['quotation/plan/main/accessories']);
          }
        }
        else if (this.productId == '5') {
          let i = 0; let coverlist: any = [];
          for (let vehicle of coverList) {
            let vehEntry = vehicle.Covers;
            if (vehEntry.length != 0) {
              let entry = vehEntry.filter(ele => ele.CoverId == '55');
              if (entry.length != 0) {
                coverlist.push(entry)
              }
            }
            i += 1;
          }
          if (coverlist.length != 0) {
            sessionStorage.setItem('riskSection', 'additional');
            this.router.navigate(['quotation/plan/main/accessories']);
          }
          else {
            sessionStorage.setItem('riskSection', 'normal');
            if (this.productId == '5' && this.insuranceId != '100020' && this.insuranceId != '100002') {
              this.router.navigate(['/quotation/plan/main/driver-info'])
            }
            if (this.productId == '61') { this.router.navigate(['quotation/plan/main/accessories']) }
            else {
              if (this.insuranceId != '100002') {
                if (this.userType != 'Broker') {
                  this.router.navigate(['/quotation/plan/co-insurance-details'])
                }
                else {
                  this.router.navigate(['/quotation/plan/main/document-info'])
                }
              }
              else {
                this.router.navigate(['/quotation/plan/main/document-info'])
              }
            }
          }
        }
        else {
          sessionStorage.setItem('riskSection', 'normal');
          if (this.productId == '5' && this.insuranceId != '100020' && this.insuranceId != '100002') {
            this.router.navigate(['/quotation/plan/main/driver-info'])
          }
          if (this.productId == '61') { this.router.navigate(['quotation/plan/main/accessories']) }
          else {
            if (this.insuranceId != '100002') {
              if (this.userType != 'Broker') {
                this.router.navigate(['/quotation/plan/co-insurance-details'])
              }
              else {
                this.router.navigate(['/quotation/plan/main/document-info'])
              }
            }
            else {
              this.router.navigate(['/quotation/plan/main/document-info'])
            }
          }
        }
        //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
      }
      else if (this.productId == '4') {
        if (this.loginType == 'B2CFlow' && this.loginId == 'guest') {
          window.location.reload();
        }
        else this.router.navigate(['/quotation/plan/travel-quote-details']);
      }
    }
    else {
      if (!this.statusValue && this.isMannualReferal == 'Y') {
        if (this.remarks == null || this.remarks == '' || this.remarks == undefined) {
          // let type: NbComponentStatus = 'danger';
          // const config = {
          //   status: type,
          //   destroyByClick: true,
          //   duration: 4000,
          //   hasIcon: true,
          //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //   preventDuplicates: false,
          // };
          // this.toastrService.show(
          //   'Referral Remarks',
          //   'Please Enter Referral Remarks',
          //   config);
        }
      }
      let ReqObj: any = {}, createdBy = "";
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP') {
        createdBy = this.vehicleDetailsList[0].CreatedBy;
      }
      else {
        createdBy = this.loginId;
      }
      //this.finalFormSubmit(ReqObj);
      if (this.endorsementSection && this.enableRemoveVehicle) {
        let entry = this.vehicleDetailsList.filter(ele => ele.Status == 'D');
        if (entry) {
          let i = 0, orgCoverList: any[] = [];
          for (let cover of coverList) {
            let Exist = entry.some(ele => ele.VehicleId == cover.Id);
            if (!Exist) orgCoverList.push(cover);
            i += 1;
            if (i == coverList.length) {
              ReqObj = {
                "RequestReferenceNo": this.quoteRefNo,
                "CreatedBy": createdBy,
                "ProductId": this.productId,
                "ManualReferralYn": this.isMannualReferal,
                "EmiYn": this.emiYN,
                "ReferralRemarks": this.remarks,
                "Vehicles": orgCoverList
              }
              this.newcoverlist = coverList;
              this.finalFormSubmit(ReqObj);
            }
          }
        }
      }
      else {
        ReqObj = {
          "RequestReferenceNo": this.quoteRefNo,
          "CreatedBy": createdBy,
          "ProductId": this.productId,
          "ManualReferralYn": this.isMannualReferal,
          "EmiYn": this.emiYN,
          "ReferralRemarks": this.remarks,
          "Vehicles": coverList
        }
        this.newcoverlist = coverList;
        // if(this.subuserType=='B2C' && this.loginId=='guest'){
        //     sessionStorage.setItem('buyPolicyDetails',JSON.stringify(ReqObj));
        //     this.router.navigate(['./Home/existingQuotes/customerSelection/customerDetails/userDetails'])
        // }
        // else{
        if (this.b2cType == 'guest') {
          sessionStorage.setItem('buyPolicy', JSON.stringify(ReqObj))
          this.router.navigate(['/quotation/plan/OtpSection'])
        }
        else this.finalFormSubmit(ReqObj);
        //}
      }
    }
  }
  updateFinalizeYN(type) {
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "RequestReferenceNo": this.quoteRefNo,
      "FinalizeYn": this.finalizeYN
    }
    let urlLink = `${this.CommonApiUrl}quote/changefinalyzestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          sessionStorage.setItem('FinalizeYN', this.finalizeYN);
          if (type == 'back') {
            if (this.statusValue) {
              if (this.adminSection) {
                if (this.statusValue == 'RA') this.router.navigate(['/Admin/referralApproved']);
                //else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
                else if (this.statusValue == 'RE') this.router.navigate(['/Admin/referralReQuote']);
                else this.router.navigate(['/Admin/referralPending']);
              }
              else {
                if (this.statusValue == 'RA') this.router.navigate(['/Home/referralApproved']);
                else if (this.statusValue == 'RE') this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
                else {
                  this.onSetBackPage();
                }
              }
            }
            else {
              if (this.endorsementSection && this.enableFieldsList.some(ele => ele == 'Covers' || ele == 'AddOnCovers' || ele == 'RemoveSection') && !this.endorseSIModification) {
                this.router.navigate(['/Home/policies/Endorsements/endorsementTypes']);
              }
              else {
                this.onSetBackPage();
              }
            }
          }
          else {
            this.onUpdateFactor('', null);
          }
        }
      },
      (err) => { },
    );
  }
  onViewOverAllPremium() {
    this.discountList = []; this.loadingList = [];
    this.onUpdateFactor('fleetSave', null);
    //if((this.productId=='5' || this.productId=='59') && (this.userType!='Broker' && this.userType!='User' && this.b2cType!='guest')) this.onUpdateFactor('fleetSave',null);
    //else this.onFormSubmit(null);
  }
  onUpdateFleetFactorRate(modal) {
    this.fleetCoverDetails.CoverList[0].Discount = this.discountList;
    this.fleetCoverDetails.CoverList[0].Loading = this.loadingList;
    if (this.remarks == null || this.remarks == undefined) this.remarks = 'None';
    // if(this.statusValue==null || this.statusValue == undefined) this.statusValue = 'RP';
    // if(this.statusValue){
    //   let ReqObj = {
    //     "VehicleId": "99999",
    //     "RequestReferenceNo": this.quoteRefNo,
    //     "InsuranceId": this.insuranceId,
    //     "AdminLoginId": this.loginId,
    //     "ProductId": this.productId,
    //     "Status": this.statusValue,
    //     "AdminRemarks": this.remarks,
    //     "SectionId": "99999",
    //     "CoverList": this.fleetCoverDetails.CoverList
    //   }
    //   let urlLink = `${this.CommonApiUrl}quote/update/referalstatus`;
    //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    //     (data: any) => {
    //         if(data.Result){
    //             this.onFleetProceed();
    //         }
    //       },
    //       (err) => { },
    //     );
    // }
    // else this.onFleetProceed();
    let List = [
      {
        "LocationId": "99999",
        "SectionDetails": [{
          "SectionId": "99999",
          "RiskId": "99999",
          "Covers": [this.fleetCoverDetails.CoverList[0]]
        }]
      }
    ]
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "ProductId": this.productId,
      "AdminLoginId": this.loginId,
      "InsuranceId": this.insuranceId,
      "LocationDetails": List
    }
    let urlLink = `${this.CommonApiUrl}api/updatefactorrate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.onFleetProceed();
        }
      });
  }
  onSetBackPage() {
    if (this.productId == '5' || this.productId == '29') {
      this.router.navigate(['/quotation/plan/premium-details']);
    }
    else if (this.productId == '4') this.router.navigate(['quotation/plan/premium-details']);
    else this.router.navigate(['quotation/plan/premium-details']);
  }
  onUpdateFactor(type, modal) {
    // if(this.excessList.length!=0){
    //     let l=0,finalExcessList = []
    //       for(let rowData of this.excessList){
    //         if(this.selectedCoverList.length!=0){
    //         if(this.selectedCoverList.some(ele=>ele.SectionId==rowData.SectionId)){
    //           for(let veh of this.selectedCoverList){
    //             if(veh.SectionId==rowData.SectionId){
    //               let coverList = veh.Covers;
    //               if(coverList.some(ele=>ele.CoverId==rowData.CoverId)){
    //                   finalExcessList.push(rowData);
    //               }
    //             }
    //           }
    //             l+=1;
    //           if(l==this.excessList.length && finalExcessList.length!=0){this.onSaveExcessDetails(finalExcessList,type,modal)}
    //           else{this.updateFactorRateAlt(type,modal)}
    //         }
    //         else{
    //           l+=1;
    //           if(l==this.excessList.length && finalExcessList.length!=0){this.onSaveExcessDetails(finalExcessList,type,modal)}
    //           else{this.updateFactorRateAlt(type,modal)}
    //         }
    //       }
    //       }
    //   }
    //   else{
    this.updateFactorRateAlt(type, modal)
    //}
  }
  updateFactorRateAlt(type, modal) {
    if ((this.statusValue != '' && this.statusValue != null) || (this.endorsementSection && this.endorseCovers) || this.userType == 'Issuer' || type == 'fleetSave') {
      if (this.statusValue == 'RA' || type == 'calculate' || this.userType == 'Issuer' || type == 'fleetSave') {
        // if(this.excessList.length!=0){
        //   let i=0,j=0,finalExcessList =[];
        //   for(let excess of this.excessList){
        //     if(this.checkExcessData(excess)){ i+=1;}
        //     j+=1;
        //     if(j==this.excessList.length){
        //       if(finalExcessList.length!=0){
        //           this.onSaveExcessDetails(finalExcessList);
        //       }
        //     } 
        //   }
        // }
        if (this.selectedCoverList.length != 0) {
          let i = 0;
          let List = [];
          for (let vehicle of this.vehicleData) {
            let vehEntry = [];
            //vehEntry = this.selectedCoverList.filter(ele=>ele.RiskId==vehicle.RiskId && ele.Id==vehicle.LocationId);
            if (this.productId != '5' && this.productId != '46') vehEntry = this.selectedCoverList.filter(ele => ele.LocationId == vehicle.LocationId);
            else vehEntry = this.selectedCoverList.filter(ele => ele.LocationId == vehicle.LocationId);
            if (vehEntry.length != 0) {
              let entry = List.find(ele => ele.LocationId == vehEntry[0].LocationId)
              if (entry) {
                console.log("Filter Sp", entry)
                let coverList = [], riskId = null;
                //coverList = vehicle.CoverList.filter(ele=>ele.SectionId==vehicle.SectionId)
                if (this.productId != '5' && this.productId != '46') coverList = vehicle.CoverList.filter(ele => ele.SectionId == vehicle.SectionId && ele.LocationId == vehicle.LocationId)
                else coverList = vehicle.CoverList.filter(ele => ele.SectionId == vehicle.SectionId)
                if (this.productId != '4') riskId = vehicle.RiskDetails?.RiskId
                else riskId = vehicle.Vehicleid
                let obj = { "SectionId": vehicle.SectionId, "RiskId": riskId, "Covers": coverList }
                if (!entry.SectionDetails.some(ele => ele.SectionId == vehicle.SectionId && ele.RiskId == vehicle.RiskDetails?.RiskId)) {
                  console.log("Covers At Part1", coverList);
                  entry.SectionDetails.push(obj);
                }
                else {
                  let list = entry.SectionDetails;
                  for (let obj of list) {
                    if (obj.SectionId == vehicle.SectionId && obj.RiskId == vehicle.RiskDetails?.RiskId) {
                      if (coverList.length != 0) {
                        for (let subObj of coverList) {
                          if (!obj.Covers.some(ele => ele.CoverId == subObj.CoverId)) { obj.Covers.push(subObj) }
                        }
                      }
                    }
                  }
                }
                i += 1; if (i == this.vehicleData.length) {
                  console.log("Final List Update3", List)
                  let k = 0;
                  for (let min of List) {
                    min.SectionDetails = min.SectionDetails.filter(ele => ele.Covers.length != 0);
                    k += 1; if (k == List.length) { this.finalUpdateFactorRate(List, type, modal) }
                  }
                }
              }
              else {
                console.log("Non Filter Sp", vehicle)
                let coverList = [], riskId = null;
                console.log("Previous CoverList", vehicle.CoverList)
                if (this.productId != '5' && this.productId != '46') coverList = vehicle.CoverList.filter(ele => ele.SectionId == vehicle.SectionId && ele.LocationId == vehicle.LocationId)
                else coverList = vehicle.CoverList.filter(ele => ele.SectionId == vehicle.SectionId)
                console.log("Filtered Cover2", coverList)
                if (this.productId != '4') riskId = vehicle.RiskDetails?.RiskId
                else riskId = vehicle.Vehicleid
                let obj = {
                  "LocationId": vehicle.LocationId,
                  "SectionDetails": [{ "SectionId": vehicle.SectionId, "RiskId": riskId, "Covers": coverList }]
                }
                List.push(obj);
                i += 1;
                if (i == this.vehicleData.length) {
                  console.log("Final List Update1", List)
                  let k = 0;
                  for (let min of List) {
                    min.SectionDetails = min.SectionDetails.filter(ele => ele.Covers.length != 0);
                    k += 1; if (k == List.length) { this.finalUpdateFactorRate(List, type, modal) }
                  }
                }
              }
            }
            else {
              i += 1; if (i == this.vehicleData.length) {
                console.log("Final List Update2", List);
                let k = 0;
                for (let min of List) {
                  min.SectionDetails = min.SectionDetails.filter(ele => ele.Covers.length != 0);
                  k += 1; if (k == List.length) { this.finalUpdateFactorRate(List, type, modal) }
                }
              }
            }
            // if(vehEntry.length!=0){
            //   let entry = vehEntry.filter(ele=>ele.SectionId==vehicle.SectionId);
            //   if(entry.length!=0){
            //     let j=0; let covers = [];
            //     for(let veh of entry){
            //         let k=0;
            //         for(let selectedCover of veh.Covers){
            //           let coverList = vehicle.CoverList.filter(ele=>ele.CoverId == selectedCover.CoverId && ele.SectionId==vehicle.SectionId && !(covers.some(entry=>entry.CoverId==ele.CoverId && ele.SectionId==entry.SectionId)))
            //           covers = covers.concat(coverList);
            //           k+=1;
            //           if(k==veh.Covers.length){
            //             j+=1;
            //             if(j==entry.length){
            //                 let Location = '1';
            //                 if(veh.LocationId && this.productId!='5' && this.productId!='46'){
            //                   Location = veh.LocationId;
            //                 }
            //                 let ReqObj = {
            //                   "RequestReferenceNo": this.quoteRefNo,
            //                   "VehicleId": veh.Id,
            //                   "LocationId": Location,
            //                   "SectionId": vehicle.SectionId,
            //                   "ProductId": this.productId,
            //                   "AdminLoginId": this.loginId,
            //                   "InsuranceId": this.insuranceId,
            //                   "Covers":covers
            //                 }
            //                 if(covers.length!=0){
            //                   let urlLink = `${this.CommonApiUrl}api/updatefactorrate`;
            //                   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            //                     (data: any) => {
            //                         if(data.Result){
            //                           i+=1;
            //                           if(i==this.vehicleDetailsList.length){
            //                             if(type=='calculate'){
            //                               // this.getcall();
            //                               //sessionStorage.removeItem('vehicleDetailsList');
            //                               window.location.reload();
            //                             }
            //                             else if(type=='altSave'){ console.log("Finally Updated");}
            //                             else if(type=='fleetSave') this.getViewPremiumCalc(modal);
            //                             else if(this.subuserType=='low') this.onFormSubmit();
            //                             else this.updateReferralStatus();
            //                           }
            //                         }
            //                       },
            //                       (err) => { },
            //                     );
            //                 }
            //                 else{
            //                   i+=1;
            //                   if(i==this.vehicleDetailsList.length){
            //                     if(type=='calculate'){
            //                       window.location.reload();
            //                     }
            //                     else if(type=='altSave'){ console.log("Finally Updated");}
            //                     else if(type=='fleetSave') this.getViewPremiumCalc(modal);
            //                     else if(this.subuserType=='low') this.onFormSubmit();
            //                     else this.updateReferralStatus();
            //                   }}
            //             }
            //           }
            //         }
            //     }
            //   }
            //   else{
            //     i+=1;
            //     if(i==this.vehicleDetailsList.length){
            //       if(type=='calculate'){
            //         //this.getcall();
            //         //sessionStorage.removeItem('vehicleDetailsList');
            //           window.location.reload();
            //       }
            //       else this.updateReferralStatus();
            //     }
            //   }
            // }
            // else{
            //   i+=1;
            //     if(i==this.vehicleDetailsList.length){
            //       if(type=='calculate'){
            //         //this.getcall();
            //         //sessionStorage.removeItem('vehicleDetailsList');
            //           window.location.reload();
            //       }
            //       else this.updateReferralStatus();
            //     }
            // }
          }
          // for(let veh of this.selectedCoverList){
          //  let entry = this.vehicleDetailsList.find(ele=>ele.Vehicleid==veh.Id);
          //  let ReqObj = {
          //   "RequestReferenceNo": this.quoteRefNo,
          //   "VehicleId": veh.Id,
          //   "SectionId": veh.SectionId,
          //   "ProductId": this.productId,
          //   "InsuranceId": this.insuranceId,
          //   "Covers":[]
          //  }
          //  let j=0;
          //  for(let cover of veh.Covers){
          //    let coverEntry = entry.CoverList.find(ele=>ele.CoverId==cover.CoverId);
          //    coverEntry['SubCoverYn'] = cover.IsSubCover;
          //    ReqObj.Covers.push(coverEntry);
          //    j+=1;
          //    if(j==veh.Covers.length){
          //     console.log("Final Vehicle List",ReqObj)
          //     let urlLink = `${this.CommonApiUrl}api/updatefactorrate`;
          //     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          //       (data: any) => {
          //           if(data.Result){
          //             i+=1;
          //             if(i==this.selectedCoverList.length){
          //               if(type=='calculate'){
          //                 //sessionStorage.removeItem('vehicleDetailsList');
          //                 window.location.reload();
          //               }
          //               if(!this.endorsementSection) this.updateReferralStatus();
          //             }
          //           }
          //         },
          //         (err) => { },
          //       );
          //    }
          //  }
          // }
        }
      }
      else {
        this.updateReferralStatus();
      }
    }
  }
  onSaveExcessDetails(excessList, type, modal) {
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "ExcessDetails": excessList
    }
    let urlLink = `${this.CommonApiUrl}excess/inserttransactiondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.updateFactorRateAlt(type, modal);
        }
      });
  }
  finalUpdateFactorRate(List, type, modal) {
    if (this.productId != '4') {
      let filteredList: any = []
      filteredList = List
      let ReqObj = {
        "RequestReferenceNo": this.quoteRefNo,
        "ProductId": this.productId,
        "AdminLoginId": this.loginId,
        "InsuranceId": this.insuranceId,
        "LocationDetails": filteredList
      }
      let urlLink = `${this.CommonApiUrl}api/updatefactorrate`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            if (type == 'calculate') {
              window.location.reload();
            }
            else if (type == 'altSave') { }
            else if (type == 'fleetSave') this.onFormSubmit(null);
            else if (this.subuserType == 'low') this.onFormSubmit(null);
            else this.updateReferralStatus();
          }
        });
    }
    else {
      if (type == 'calculate') {
        window.location.reload();
      }
      else if (type == 'altSave') { }
      else if (type == 'fleetSave') this.onFormSubmit(null);
      else if (this.subuserType == 'low') this.onFormSubmit(null);
      else this.updateReferralStatus();
    }
  }
  onSaveFleetDetails(modal) {
    let Reqobj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.motorApiUrl}api/savefleetdetails`;
    this.sharedService.onPostMethodSync(urlLink, Reqobj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.getFleetCalc(data.Result, modal);
        }
      })
  }
  getFleetCalc(res, modal) {
    let startDate = this.policyStartDate, endDate = this.policyEndDate
    //this.updateComponent.vehicleDetails = this.vehicleDetails;
    let effectiveDate = null;
    if (this.endorsementSection) {
      effectiveDate = this.endorseEffectiveDate;
    }
    else {
      if (this.policyStartDate) {
        if (this.policyStartDate.includes('/')) effectiveDate = this.policyStartDate;
        else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      }
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "SectionId": res?.SectionId,
      "ProductId": this.productId,
      "MSRefNo": res?.MSRefNo,
      "VehicleId": res?.VehicleId,
      "CdRefNo": res?.CdRefNo,
      "VdRefNo": res?.VdRefNo,
      "CreatedBy": res?.CreatedBy,
      "productId": this.productId,
      "sectionId": res?.SectionId,
      "RequestReferenceNo": this.requestReferenceNo,
      "EffectiveDate": effectiveDate,
      "PolicyEndDate": endDate,
      "CoverModification": "N",
      "PDRefNo": res?.PDRefNo,
      "LocationId": "99999"
    }
    let urlLink = `${this.CommonApiUrl}calculator/policy/calc`;
    if (this.insuranceId != '100028' && this.insuranceId != '100027' && this.insuranceId != '100040' && this.insuranceId != '100042' && this.insuranceId != '100019') {
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.CoverList) {
            this.getViewPremiumCalc(modal);
          }
        });
    }
    else {
      if (this.endorsementSection) this.router.navigate(['/quotation/plan/premium-info']);
      else this.onFleetProceed();
    }
    // 
  }
  getViewPremiumCalc(modal) {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": this.requestReferenceNo
    }
    let urlLink = `${this.CommonApiUrl}api/view/policycalc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.fleetCoverDetails = data?.Result;
          if (this.fleetCoverDetails) {
            if (this.fleetCoverDetails.CoverList) {
              let minCover = this.fleetCoverDetails.CoverList[0];
              if (minCover) {
                this.minCoverRatePercent = minCover.Rate;
                this.minCoverName = minCover.CoverName;
                this.minimumPremiumYN = minCover.MinimumPremiumYn;
                this.minBasePremium = minCover?.PremiumBeforeDiscount;
                this.minPremiumIncludedTax = 0;
                let i = 0, taxValue = 0, excludedTax = null;
                for (let cover of this.fleetCoverDetails.CoverList) {
                  taxValue = taxValue + cover.PremiumExcluedTax;
                  this.minPremiumIncludedTax = this.minPremiumIncludedTax + cover.PremiumIncludedTax;
                  if (i == 0) {
                    if (cover.Taxes) this.minTaxList = cover.Taxes;
                    i += 1;
                    if (i == this.fleetCoverDetails.CoverList.length) {
                      this.fleetDiscountModal = true;
                      this.minPremiumExcludedTax = taxValue;
                      let cover = this.fleetCoverDetails.CoverList[0];
                      if (cover) {
                        //if(cover?.PremiumBeforeDiscount!=0 && cover?.PremiumBeforeDiscount!="0"){
                        this.ratePercent = cover.Rate;
                        this.CoverName = cover.CoverName;
                        this.minimumPremiumYN = cover.MinimumPremiumYn;
                        this.basePremium = cover?.PremiumBeforeDiscount;
                        this.premiumIncludedTax = cover?.PremiumIncludedTax;
                        this.premiumExcludedTax = cover?.PremiumExcluedTax;
                        if (cover.Discounts) this.discountList = cover.Discounts;
                        if (cover.Loadings) this.loadingList = cover.Loadings;
                        if (cover.Taxes) this.taxList = cover.Taxes;
                        // }
                        // else this.onFleetProceed(modal);
                      }
                      else {
                        this.fleetDiscountModal = true;
                      }
                    }
                  }
                  else {
                    let j = 0;
                    for (let tax of cover.Taxes) {
                      if (tax.TaxAmount) this.minTaxList[j].TaxAmount = this.minTaxList[j].TaxAmount + tax.TaxAmount
                      j += 1;
                      if (j == cover.Taxes.length) {
                        i += 1;
                        if (i == this.fleetCoverDetails.CoverList.length) {
                          this.minPremiumExcludedTax = taxValue;
                          let cover = this.fleetCoverDetails.CoverList.find(ele => ele.CoverId == '5');
                          if (cover) {
                            //if(cover?.PremiumBeforeDiscount!=0 && cover?.PremiumBeforeDiscount!="0"){
                            this.ratePercent = cover.Rate;
                            this.CoverName = cover.CoverName;
                            this.minimumPremiumYN = cover.MinimumPremiumYn;
                            this.basePremium = cover?.PremiumBeforeDiscount;
                            this.premiumIncludedTax = cover?.PremiumIncludedTax;
                            this.premiumExcludedTax = cover?.PremiumExcluedTax;
                            if (cover.Discounts) this.discountList = cover.Discounts;
                            if (cover.Loadings) this.loadingList = cover.Loadings;
                            if (cover.Taxes) this.taxList = cover.Taxes;
                            this.fleetDiscountModal = true;
                            // }
                            // else this.onFleetProceed(modal);
                          }
                          else {
                            this.fleetDiscountModal = true;
                          }
                        }
                      }
                    }
                  }
                }
                // if(minCover.Discounts) this.minDiscountList = minCover.Discounts;
                // if(minCover.Loadings) this.minLoadingList = minCover.Loadings;
                // if(minCover.Taxes) this.minTaxList = minCover.Taxes;
              }
              else if (this.fleetCoverDetails.CoverList.find(ele => ele.CoverId == '5')) {
                let i = 0, taxValue = 0, excludedTax = null;
                for (let cover of this.fleetCoverDetails.CoverList) {
                  taxValue = taxValue + cover.PremiumExcluedTax;
                  this.minPremiumIncludedTax = this.minPremiumIncludedTax + cover.PremiumIncludedTax;
                  if (i == 0) {
                    this.minTaxList = cover.Taxes;
                    i += 1;
                    if (i == this.fleetCoverDetails.CoverList.length) {
                      this.fleetDiscountModal = true;
                      this.minPremiumExcludedTax = taxValue;
                      let cover = this.fleetCoverDetails.CoverList.find(ele => ele.CoverId == '5');
                      if (cover) {
                        //if(cover?.PremiumBeforeDiscount!=0 && cover?.PremiumBeforeDiscount!="0"){
                        this.ratePercent = cover.Rate;
                        this.CoverName = cover.CoverName;
                        this.minimumPremiumYN = cover.MinimumPremiumYn;
                        this.basePremium = cover?.PremiumBeforeDiscount;
                        this.premiumIncludedTax = cover?.PremiumIncludedTax;
                        this.premiumExcludedTax = cover?.PremiumExcluedTax;
                        if (cover.Discounts) this.discountList = cover.Discounts;
                        if (cover.Loadings) this.loadingList = cover.Loadings;
                        if (cover.Taxes) this.taxList = cover.Taxes;
                        // }
                        // else this.onFleetProceed(modal);
                      }
                      else {
                        this.fleetDiscountModal = true;
                      }
                    }
                  }
                  else {
                    let j = 0;
                    for (let tax of cover.Taxes) {
                      if (tax.TaxAmount) this.minTaxList[j].TaxAmount = this.minTaxList[j].TaxAmount + tax.TaxAmount
                      j += 1;
                      if (j == cover.Taxes.length) {
                        i += 1;
                        if (i == this.fleetCoverDetails.CoverList.length) {
                          this.minPremiumExcludedTax = taxValue;
                          let cover = this.fleetCoverDetails.CoverList.find(ele => ele.CoverId == '5');
                          if (cover) {
                            //if(cover?.PremiumBeforeDiscount!=0 && cover?.PremiumBeforeDiscount!="0"){
                            this.ratePercent = cover.Rate;
                            this.CoverName = cover.CoverName;
                            this.minimumPremiumYN = cover.MinimumPremiumYn;
                            this.basePremium = cover?.PremiumBeforeDiscount;
                            this.premiumIncludedTax = cover?.PremiumIncludedTax;
                            this.premiumExcludedTax = cover?.PremiumExcluedTax;
                            if (cover.Discounts) this.discountList = cover.Discounts;
                            if (cover.Loadings) this.loadingList = cover.Loadings;
                            if (cover.Taxes) this.taxList = cover.Taxes;
                            this.fleetDiscountModal = true;
                            // }
                            // else this.onFleetProceed(modal);
                          }
                          else {
                            this.fleetDiscountModal = true;
                          }
                        }
                      }
                    }
                  }
                }
              }
              else {
                if (!this.adminSection && this.userType == 'Issuer' && this.statusValue == 'RA' && !this.endorsementSection) {
                  this.onFormSubmit(null);
                }
                else if (!this.adminSection && (this.userType != 'Issuer' || (this.userType == 'Issuer' && this.subuserType == 'low' && this.endorsementSection)) && (this.statusValue == 'RA' || (this.userType == 'Issuer' && this.subuserType == 'low' && this.endorsementSection))) {
                  this.onFormSubmit(null);
                }
                else if (!this.adminSection && (this.userType != 'Issuer') && this.statusValue != 'RA') {
                  this.onFormSubmit(null);
                }
                else if (this.userType == 'Issuer' && this.subuserType == 'low' && this.statusValue != 'RA' && !this.endorsementSection) {
                  this.onFormSubmit(null);
                }
                else if (this.adminSection) {
                  this.onFormSubmit(null);
                }
              }
            }
            else {
              if (!this.adminSection && this.userType == 'Issuer' && this.statusValue == 'RA' && !this.endorsementSection) {
                this.updateFinalizeYN('proceed')
              }
              else if (!this.adminSection && (this.userType != 'Issuer' || (this.userType == 'Issuer' && this.subuserType == 'low' && this.endorsementSection)) && (this.statusValue == 'RA' || (this.userType == 'Issuer' && this.subuserType == 'low' && this.endorsementSection))) {
                this.onFormSubmit(null);
              }
              else if (!this.adminSection && (this.userType != 'Issuer') && this.statusValue != 'RA') {
                this.onFormSubmit(null);
              }
              else if (this.userType == 'Issuer' && this.subuserType == 'low' && this.statusValue != 'RA' && !this.endorsementSection) {
                this.updateFinalizeYN('proceed');
              }
              else if (this.adminSection) {
                this.onUpdateFactor('', null);
              }
            }
          }
          else this.onFleetProceed();
        }
      });
  }
  onFleetProceed() {
    this.fleetDiscountModal = false;
    if (!this.adminSection && this.userType == 'Issuer' && this.statusValue == 'RA' && !this.endorsementSection) {
      this.updateFinalizeYN('proceed')
    }
    else if (!this.adminSection && (this.userType != 'Issuer' || (this.userType == 'Issuer' && this.subuserType == 'low' && this.endorsementSection)) && (this.statusValue == 'RA' || (this.userType == 'Issuer' && this.subuserType == 'low' && this.endorsementSection))) {
      this.onFormSubmit(null);
    }
    else if (!this.adminSection && (this.userType != 'Issuer') && this.statusValue != 'RA') {
      this.onFormSubmit(null);
    }
    else if (this.userType == 'Issuer' && this.subuserType == 'low' && this.statusValue != 'RA' && !this.endorsementSection) {
      this.updateFinalizeYN('proceed');
    }
    else if (this.adminSection) {
      this.onUpdateFactor('', null);
    }
  }
  updateReferralStatus() {
    if (this.remarks == undefined) this.remarks = "";
    if (this.rejectedReason == undefined) this.rejectedReason = "";
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "AdminLoginId": this.loginId,
      "ProductId": this.productId,
      "Status": this.statusValue,
      "AdminRemarks": this.remarks,
      "RejectReason": this.rejectedReason,
      "CommissionModifyYn": 'N',
      "CommissionPercent": this.commissionPercent
    }
    let urlLink = `${this.CommonApiUrl}quote/update/referalstatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          if (this.statusValue == 'RP' || this.statusValue == 'RR' || this.statusValue == 'RA' || this.statusValue == 'RE') this.router.navigate(['/referralCases'])
        }
      },
      (err) => { },
    );
  }
  ongetBack() {
    if (sessionStorage.getItem('b2cType') || this.subuserType == 'b2c' || this.subuserType == 'B2C Broker') { this.router.navigate(['/customer-info']); }
    // else if(this.statusValue=='RA' && !this.adminSection){
    //   this.router.navigate(['/referral']);
    // }
    // else{
    sessionStorage.setItem('BackType', 'Back');
    if (this.productId == '5') this.router.navigate(['/policyDetails']);
    else if (this.productId == '59' || this.productId == '66' || this.productId == '67' || this.productId == '68' || this.productId == '19' || this.productId == '69' || this.productId == '70' || this.productId == '57' || this.productId == '71' || this.productId == '72' || this.productId == '75' || this.productId == '49' || this.productId == '73' || this.productId == '74' || this.productId == '48' || this.productId == '78' || this.productId == '76' || this.productId == '77' || this.productId == '93'
      || this.productId == '26' || this.productId == '27' || ((this.productId == '14' || this.productId == '15' || this.productId == '25' || this.productId == '16' || this.productId == '39') && (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050' || this.insuranceId == '100002'))) {
      if (this.statusValue == 'RA' && !this.adminSection) this.router.navigate(['/referral']);
      else if (sessionStorage.getItem('coversRequired')){
        if(((this.productId=='75' || this.productId=='66' || this.productId=='67' || this.productId=='14' || this.productId=='25' || this.productId=='32' || this.productId == '83' ||
        this.productId == '74' || this.productId == '92' || this.productId == '39' || this.productId == '70' || this.productId == '69' || this.productId == '71' || this.productId == '73' || this.productId == '26' || this.productId == '16' || this.productId == '68' || this.productId == '76' || this.productId == '49'  || this.productId == '80' || this.productId == '88' || this.productId == '90' || this.productId == '91' || this.productId == '27' || this.productId == '78' || this.productId == '89' || this.productId == '81' || this.productId == '79' || this.productId == '87' || this.productId == '87' || this.productId == '99' || this.productId == '100' || this.productId == '106' || this.productId == '21' || this.productId == '98' || this.productId == '97' || this.productId == '72' || this.productId == '93' || this.productId == '102' || this.productId == '104'  || this.productId == '96') && (this.insuranceId=='100046' || this.insuranceId=='100047' ||this.insuranceId=='100048' || this.insuranceId=='100049' || this.insuranceId=='100050')) || 
        ((this.productId == '49' || this.productId == '105' || this.productId == '82' || this.productId == '83' || this.productId == '84' || this.productId == '6' || this.productId == '70' || this.productId == '1' || this.productId == '59' || this.productId == '86' || this.productId=='25' || this.productId=='16' || this.productId=='14' || this.productId=='32' || this.productId=='39' || this.productId=='26' || this.productId=='61' || this.productId=='21' || this.productId=='103') && this.insuranceId=='100002')){this.router.navigate(['/quotation/plan/common-risk-page']);}
        else this.router.navigate(['/quotation/plan/risk-page']);
      }
      else if (this.productId == '27' && this.insuranceId == '100002') this.router.navigate(['/quotation/plan/quote-details']);
      else {
        let content = this.vehicleData.some(ele => ele.SectionId == '47');
        let building = this.vehicleData.some(ele => ele.SectionId == '1');
        if (content && building) { sessionStorage.setItem('coversRequired', 'BC'); }
        else if (content && !building) sessionStorage.setItem('coversRequired', 'C');
        else if (!content && building) sessionStorage.setItem('coversRequired', 'B');
        if(((this.productId=='75' || this.productId=='66' || this.productId=='67' || this.productId=='14' || this.productId=='25' || this.productId=='32' || this.productId == '83' ||
        this.productId == '74' || this.productId == '92' || this.productId == '39' || this.productId == '70' || this.productId == '69' || this.productId == '71' || this.productId == '73' || this.productId == '26' || this.productId == '16' || this.productId == '68' || this.productId == '76' || this.productId == '49'  || this.productId == '80' || this.productId == '88' || this.productId == '90' || this.productId == '91' || this.productId == '27' || this.productId == '78' || this.productId == '89' || this.productId == '81' || this.productId == '79' || this.productId == '87' || this.productId == '87' || this.productId == '99' || this.productId == '100' || this.productId == '106' || this.productId == '21' || this.productId == '98' || this.productId == '97' || this.productId == '72' || this.productId == '93' || this.productId == '102' || this.productId == '104'  || this.productId == '96') && (this.insuranceId=='100046' || this.insuranceId=='100047' ||this.insuranceId=='100048' || this.insuranceId=='100049' || this.insuranceId=='100050')) || 
        ((this.productId == '49' || this.productId == '105' || this.productId == '82' || this.productId == '83' || this.productId == '84' || this.productId == '6' || this.productId == '70' || this.productId == '1' || this.productId == '59' || this.productId == '86' || this.productId=='25' || this.productId=='16' || this.productId=='14' || this.productId=='32' || this.productId=='39' || this.productId=='26' || this.productId=='61' || this.productId=='21' || this.productId=='103') && this.insuranceId=='100002')){this.router.navigate(['/quotation/plan/common-risk-page']);}
        else this.router.navigate(['/quotation/plan/risk-page']);
      }
    }
    else if (this.insuranceId == '100002' && (this.productId == '15')) this.router.navigate(['/quotation/plan/quote-details']);
    else if (this.productId == '63' || this.productId == '59' || this.productId == '66' || this.productId == '67' || this.productId == '68' || this.productId == '19' || this.productId == '69' || this.productId == '70' || this.productId == '57' || this.productId == '71' || this.productId == '72' || this.productId == '75' || this.productId == '49' || this.productId == '73' || this.productId == '74' || this.productId == '48' || this.productId == '78' || this.productId == '76' || this.productId == '77' || this.productId == '93' || this.productId == '92' || this.productId == '85' || this.productId == '21' || this.productId == '6'
      || this.productId == '26' || this.productId == '27' || ((this.productId == '14' || this.productId == '15' || this.productId == '15' || this.productId == '25' || this.productId == '16' || this.productId == '61' || this.productId == '1' || this.productId == '32' || this.productId == '80' || this.productId == '79' || this.productId == '84') || this.productId == '81' || this.productId == '86' || this.productId == '87' || this.productId == '88' || this.productId == '89' || this.productId == '90' || this.productId == '91' || this.productId == '82' || this.productId == '83' || this.productId == '96' || this.productId == '97' || this.productId == '98' || this.productId == '99' || this.productId == '100' || this.productId == '101' || this.productId == '102' || this.productId == '104' || this.productId == '106' || this.productId == '105' || this.productId == '103' || this.productId == '13')){
        if(((this.productId=='75' || this.productId=='66' || this.productId=='67' || this.productId=='14' || this.productId=='25' || this.productId=='32' || this.productId == '83' ||
        this.productId == '74' || this.productId == '92' || this.productId == '39' || this.productId == '70' || this.productId == '69' || this.productId == '71' || this.productId == '73' || this.productId == '26' || this.productId == '16' || this.productId == '68' || this.productId == '76' || this.productId == '49'  || this.productId == '80' || this.productId == '88' || this.productId == '90' || this.productId == '91' || this.productId == '27' || this.productId == '78' || this.productId == '89' || this.productId == '81' || this.productId == '79' || this.productId == '87' || this.productId == '87' || this.productId == '99' || this.productId == '100' || this.productId == '106' || this.productId == '21' || this.productId == '98' || this.productId == '97' || this.productId == '72' || this.productId == '93' || this.productId == '102' || this.productId == '104'  || this.productId == '96') && (this.insuranceId=='100046' || this.insuranceId=='100047' ||this.insuranceId=='100048' || this.insuranceId=='100049' || this.insuranceId=='100050')) || 
        ((this.productId == '49' || this.productId == '105' || this.productId == '82' || this.productId == '83' || this.productId == '84' || this.productId == '6' || this.productId == '70' || this.productId == '1' || this.productId == '59' || this.productId == '86' || this.productId=='25' || this.productId=='16' || this.productId=='14' || this.productId=='32' || this.productId=='39' || this.productId=='26' || this.productId=='61' || this.productId=='21' || this.productId=='103') && this.insuranceId=='100002')){this.router.navigate(['/quotation/plan/common-risk-page']);}
        else this.router.navigate(['/quotation/plan/risk-page']);
      }
    else this.router.navigate(['/quotation/plan/quote-details']);
    //}
  }
  finalFormSubmit(ReqObj) {
    if (this.checkCurrentSection()) {
      let duplicateId = null;
      let i = 0, j = 0;
      for (let veh of this.vehicleDetailsList) {
        let duplicateVehicle = [];
        duplicateVehicle = this.vehicleDetailsList.filter((val) => val.Vehicleid === veh.Vehicleid);
        if (duplicateVehicle.length > 1) {
          duplicateId = duplicateVehicle[0].Vehicleid;
        }
        j += 1;
        if (j == this.vehicleDetailsList.length) {
          if (duplicateId != null) {
            this.selectedRowData = this.vehicleDetailsList.find(ele => ele.SectionId == this.selectedSectionId);
            let entry = ReqObj.Vehicles.find(ele => ele.Id == duplicateId && ele.SectionId == this.selectedRowData.SectionId);
            if (entry) {
              ReqObj['Vehicles'] = [entry];
              this.onProceedBuyPolicy(ReqObj);
            }
          }
          else { this.onProceedBuyPolicy(ReqObj); }
        }
      }
    }
    else this.onProceedBuyPolicy(ReqObj);
  }
  onTabClicked(event) {
    let index = event.index;
    this.tabIndex = index;
  }
  onProceedBuyPolicy(ReqObj) {
    if (this.insuranceId == '100046' && this.productId == '4') {
      const seenCoverIds = new Set();
      ReqObj.Vehicles = ReqObj.Vehicles.filter(vehicle => {
        const coverId = vehicle.Covers[0].CoverId;
        if (seenCoverIds.has(coverId)) {
          return false;
        } else {
          seenCoverIds.add(coverId);
          return true;
        }
      });
    }
    let urlLink = `${this.CommonApiUrl}quote/buypolicy`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          if (data?.Result.QuoteNo) {
            this.quoteNo = data.Result?.QuoteNo;
            if (this.insuranceId !='100002' && this.insuranceId !='100044'&& this.insuranceId !='100019'&& this.insuranceId !='100020'&& this.insuranceId !='100028'&& this.insuranceId !='100004') {
              if (this.quoteNo && this.userType != 'Broker') {
                this.ReInsuranceInsert();
              }
            }
            sessionStorage.setItem('quoteNo', data.Result?.QuoteNo);
            sessionStorage.setItem('quoteReferenceNo', data.Result?.RequestReferenceNo);
            let vechileId: any;
            let sectionId: any;
            let i = 0;
            if (this.userType == 'Broker' || this.userType == 'User') {
              this.onFinalProceed();
            }
            else {
              for (let v of this.vehicleDetailsList) {
                console.log('AAAAAAAAA', this.vehicleDetailsList)
                vechileId = v.VehicleId;
                sectionId = v.SectionId;
                i++;
                if (v.Common) {
                  this.CommonMethod(v, i);
                }
                else {
                  if (i == this.vehicleDetailsList.length) {
                    this.onFinalProceed();
                  }
                }
              }
            }
            // for (let v of this.vehicleDetailsList) {
            //   vechileId = v.VehicleId;
            //   sectionId = v.SectionId;
            //   i++;
            //   if (v.Common) {
            //     this.CommonMethod(v,i);
            //   }
            //   else{
            //     if(i==this.vehicleDetailsList.length) {
            //     }
            //   }
            // }
            /*if(this.productId=='59'){
              let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
              if(homeSession){
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
              }
              else{
                this.getExistingBuildingList();
              }
            }
            else if(this.productId !='3' && this.productId!='4'){
              if(this.emiYN=='Y'){
                this.insertEMIDetails();
              }
              else{
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
              }
            }
            else if(this.productId == '4'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
            }*/
          }
          else if (data?.Result?.Status == 'RP') {
            // let type: NbComponentStatus = 'danger';
            // const config = {
            //   status: type,
            //   destroyByClick: true,
            //   duration: 4000,
            //   hasIcon: true,
            //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //   preventDuplicates: false,
            // };
            // this.toastrService.show(
            //   'Referral Quote',
            //   'Quote Moved to Referral Pending',
            //   config);
            sessionStorage.setItem('referralRefNo', this.quoteRefNo);
            this.messageService.add({ severity: 'error', summary: 'Referral Quote', detail: 'Quote Moved to Referral Pending' });
            //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Your Quote Move To Referral' });
            this.router.navigate(['/referral']);
          }
        }
        //CRM Quote status update
        const LeadId = sessionStorage.getItem('LeadId');
        console.log(sessionStorage.getItem('LeadId'))
        if (LeadId != null) {
          const EnqData = {
            "QuoteNo": this.quoteNo,
            "LeadId": LeadId,
            "QuoteStatus": 'quoteGen',
            "InsuranceId": this.insuranceId
          }
          // sessionStorage.setItem('quoteNo', this.quoteNo);
          // let urlLink = `${this.CommonApiUrl}crm/updateEnquiryQuotestatus`;
          // this.sharedService.onPostMethodSync(urlLink, EnqData).subscribe(
          //   (data: any) => {
          //     console.log(data);
          //   },
          //   (err) => {
          //   });
          //   //Update enquiry status in CRM
          //   const url = `${this.CommonApiUrl}crm/updateCRMEnquiryQuotestatus`;
          //   const UpdateEnqData = {
          //     "enqStatus": 'quoteGen',
          //     "enqSeqNo": parseInt(sessionStorage.getItem('EnqId')),
          //     "leadSeqNo": parseInt(sessionStorage.getItem('LeadId')),
          //     "onlineQuoteRefId": this.quoteNo
          //   }
          //   this.sharedService.onPostMethodSync(url, UpdateEnqData).subscribe(
          //     (data: any) => {
          //       console.log(data);
          //     },
          //     (err) => { },
          //   )
        }
      },
      (err) => {
        this.sharedService.fnToastMoveHover("Quote Moved to Referral Pending");
      },
    );
  }
  CommonMethod(rowdata, i) {
    let clauses
    let common
    let index = 0
    /*for (let v of rowdata){
      common=v.Common;
      clauses=common.ClausesList
      index++;
    }*/
    clauses = rowdata.Common.ClausesList;
    let exclusion = rowdata.Common.ExclusionList;
    let warranties = rowdata.Common.WarrantyList;
    if (clauses == null || clauses == undefined) {
      clauses = [];
    }
    if (exclusion == null || exclusion == undefined) {
      exclusion = [];
    }
    if (warranties == null || warranties == undefined) {
      warranties = [];
    }
    let newArr = [];
    let subId: any;
    let subDesc: any;
    let sub: any;
    let Desc: any;
    if (this.userType != "Broker") {
      /*if (clauses.length != 0) {
        clauses.forEach((item) => (item["Id"] = "6"));
        warranties.forEach((item) => (item["Id"] = "4"));
        exclusion.forEach((item) => (item["Id"] = "7"));
        console.log("EEEEEEEE", exclusion);
        console.log("iiii", clauses);
      } else if (warranties.length != 0) {
        warranties.forEach((item) => (item["Id"] = "4"));
        exclusion.forEach((item) => (item["Id"] = "7"));
        console.log("WWWWWWW", warranties);
      } else if (exclusion.length != 0) {
        exclusion.forEach((item) => (item["Id"] = "7"));
        console.log("EEEEEEEE", exclusion);
      }*/
      this.inserts = clauses.concat(warranties, exclusion);
    } else {
      //this.inserts=this.selected
    }
    /*insert.map((item, index) => {
      this.vehicleDetailsList.push(insert[index]);
      this.vehicleDetailsList[index]['Insert'] = insert[index];
    });
    console.log('NNEEE',this.vehicleDetailsList);*/
    //this.vehicleDetailsList.concat(insert);
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo: this.quoteNo,
      RiskId: rowdata.VehicleId,
      SectionId: rowdata.SectionId,
      TermsAndConditionReq: this.inserts,
      RequestReferenceNo: this.quoteRefNo
    };
    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        if (i == this.vehicleDetailsList.length) {
          this.onFinalProceed();
        }
      }
    });
  }
  onFinalProceed() {
    //this.emiYN=='Y' && this.emiPeriod!='N'
    if (this.emiYN != null) {
      if (this.emiYN == 'N') {
        this.emiYN == 'N';
        this.emistatus = 'N';
        this.emiPeriod = '0';
        this.finalRedirection();
      }
      else if (this.emiYN == 'Y') {
        if (this.emiPeriod != 'null' && this.emiPeriod != null) {
          this.emistatus = 'Y';
          this.insertEMIDetails();
        }
        else {
          this.emistatus = 'N';
          this.finalRedirection();
        }
      }
    }
    // if(this.productId=='59'){
    //   let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    //   if(homeSession){
    //     if(this.loginType=='B2CFlow' && this.loginId=='guest'){
    //       window.location.reload();
    //     }
    //     else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
    //   }
    //   else{
    //     this.getExistingBuildingList();
    //   }
    // }
    // else if(this.productId == '4'){
    //   if(this.loginType=='B2CFlow' && this.loginId=='guest'){
    //     window.location.reload();
    //   }
    //   else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
    // }
    // else if(this.productId=='32' || this.productId=='39' || this.productId=='14' || this.productId=='15' || this.productId=='19' || this.productId=='1' || this.productId=='6' || this.productId=='16' || this.productId =='21' || this.productId =='26' || this.productId =='25'|| this.productId=='42' || this.productId=='43'){
    //   // let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    //   // if(homeSession){
    //     if(this.loginType=='B2CFlow' && this.loginId=='guest'){
    //       window.location.reload();
    //     }
    //     else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
    //   // }
    //   // else{
    //    // this.getExistingEserviceDetails();
    //   //}
    // }
    // else if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
    //   this.coverlist=[];let i=0;
    //   for(let vehicle of this.newcoverlist){
    //     let vehEntry = vehicle.Covers;
    //     console.log('VVVVVVVVV',vehEntry);
    //     if(vehEntry.length!=0){
    //       let entry = vehEntry.filter(ele=>ele.CoverId == '55');
    //       if(entry.length!=0){
    //         console.log('RRRRRRR',entry);
    //         this.coverlist.push(entry)
    //       }
    //     }
    //     i+=1;
    //   }           
    //   console.log('if entry of cover id 55',this.coverlist);
    //   if(sessionStorage.getItem('resetLoginDetails')){
    //     if(this.coverlist.length!=0){
    //         sessionStorage.setItem('riskSection','additional')
    //     }
    //     else sessionStorage.setItem('riskSection','normal')
    //         window.location.reload();
    //   }
    //   else if(this.coverlist.length!=0){
    //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details']);
    //    }
    //    else {
    //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
    //    }
    // }
    // else{
    //   console.log("BBBBBBBBBBBYYYYYYYYYYYYYY");
    //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
    // }
  }
  insertEMIDetails() {
    // this.finalRedirection();
    if (this.emiYN == 'Y' && this.emiAllList.length != 0) {
      let period = null, typeId = null;
      // if(this.emiPeriod=='3' || this.emiPeriod==3) period = '2';
      // else period = this.emiPeriod
      if (this.emiPeriod == null || this.emiPeriod == '' || this.emiPeriod == undefined) this.emiYN = 'N';
      if (this.emiYN == 'Y') period = this.emiPeriod
      else period = 0;
      console.log("Emi Details", this.Emilist1)
      let entry = this.emiAllList.find(ele => ele.EmiDetails?.InstallmentTypeId == String(this.emiPeriod))
      if (entry) {
        typeId = entry?.EmiDetails?.InstallmentPeriod;
      }
      let ReqObj = {
        "QuoteNo": this.quoteNo,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "PolicyType": this.emipolicytype,
        "InstallmentPeriod": typeId,
        "PremiumWithTax": this.totalPremium,//this.localPremiumCost
        "PaymentDetails": "",
        "Status": this.emistatus,
        "CreatedBy": this.loginId,
        "Remarks": "None",
        "InstallmentTypeId": period,
        "EndtCategDesc": null,
        "EndorsementRemarks": null,
        "EndorsementEffdate": null,
        "EndtPrevPolicyNo": null,
        "EndtPrevQuoteNo": null,
        "EndtStatus": null,
        "EndtTypeId": null,
        "EndtCount": null,
        "EmiYn": this.emiYN,
        "EndtDate": null,
        "EndtTypeDesc": null,
        "PolicyNo": null,
        "OriginalPolicyNo": null,
        "EndtPremium": this.totalPremium,
        "IsFinacialEndt": null
      }
      let urlLink = `${this.CommonApiUrl}api/insertemitransactiondetails`
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            this.finalRedirection();
          }
        },
        (err) => { },
      );
    }
    else this.finalRedirection();
  }
  finalRedirection() {
    if (this.productId == '59') {
      let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
      if (homeSession) {
        // this.router.navigate(['quotation/plan/main/accessories']);
        if (this.insuranceId != '100002') {
          if (this.userType != 'Broker') {
            this.router.navigate(['/quotation/plan/co-insurance-details'])
          }
          else {
            this.router.navigate(['/quotation/plan/main/document-info'])
          }
        }
        else {
          this.router.navigate(['/quotation/plan/main/document-info'])
        }
      }
      else {
        this.getExistingBuildingList();
      }
    }
    else if (this.productId == '4') {
      if (this.loginType == 'B2CFlow' && this.loginId == 'guest') {
        window.location.reload();
      }
      else this.router.navigate(['/quotation/plan/travel-quote-details']);
    }
    else if (((this.productId == '39' || this.productId == '32' || this.productId == '14' || this.productId == '25') && this.insuranceId != '100046' && this.insuranceId != '100047' && this.insuranceId != '100048' && this.insuranceId != '100049' && this.insuranceId != '100050') || this.productId == '15' || this.productId == '19' || this.productId == '1' || this.productId == '63' || this.productId == '6' || this.productId == '16' || this.productId == '21' || this.productId == '26' || this.productId == '24' || this.productId == '42' || this.productId == '43' || this.productId == '13' || this.productId == '27' || this.productId == '59' || this.productId == '60' || this.productId == '57' || this.productId == '56') {
      //if(this.productId=='6'|| this.productId=='13' || this.productId=='16' || this.productId=='1' ) this.router.navigate(['/quotation/plan/main/document-info']);
      if (this.productId == '61') { this.router.navigate(['quotation/plan/main/accessories']) }
      else {
        if (this.insuranceId != '100002') {
          if (this.userType != 'Broker') {
            this.router.navigate(['/quotation/plan/co-insurance-details'])
          }
          else {
            this.router.navigate(['/quotation/plan/main/document-info'])
          }
        }
        else {
          this.router.navigate(['/quotation/plan/main/document-info'])
        }
      }
      //this.router.navigate(['/quotation/plan/main/document-info']);
      //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
    }
    else if (this.productId == '5' || this.productId == '46' || this.productId == '29') {
      this.coverlist = []; let i = 0;
      for (let vehicle of this.newcoverlist) {
        let vehEntry = vehicle.Covers;
        if (vehEntry.length != 0) {
          let entry = vehEntry.filter(ele => ele.CoverId == '55');
          if (entry.length != 0) {
            this.coverlist.push(entry)
          }
        }
        i += 1;
      }
      if (sessionStorage.getItem('resetLoginDetails')) {
        if (this.coverlist.length != 0) {
          sessionStorage.setItem('riskSection', 'additional')
        }
        else sessionStorage.setItem('riskSection', 'normal')
        window.location.reload();
      }
      else if (this.coverlist.length != 0) {
        this.router.navigate(['quotation/plan/main/accessories']);
        //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details']);
      }
      else {
        if (this.productId == '5' && this.insuranceId != '100020' && this.insuranceId != '100002') {
          if (this.subuserType == 'b2c' || this.subuserType == 'B2C Broker') {
            if (this.userType != 'Broker') {
              this.router.navigate(['/quotation/plan/co-insurance-details'])
            }
            else {
              if (this.insuranceId != '100002') {
                if (this.userType != 'Broker') {
                  this.router.navigate(['/quotation/plan/co-insurance-details'])
                }
                else {
                  this.router.navigate(['/quotation/plan/main/document-info'])
                }
              }
              else {
                this.router.navigate(['/quotation/plan/main/document-info'])
              }
            }
          }
          else this.router.navigate(['/quotation/plan/main/driver-info']);
        }
        else {
          if (this.insuranceId != '100002') {
            if (this.userType != 'Broker') {
              this.router.navigate(['/quotation/plan/co-insurance-details'])
            }
            else {
              this.router.navigate(['/quotation/plan/main/document-info'])
            }
          }
          else {
            this.router.navigate(['/quotation/plan/main/document-info'])
          }
        }
      }
    }
    else {
      if (this.productId == '5' && this.insuranceId != '100020' && this.insuranceId != '100002') {
        if (this.subuserType == 'b2c' || this.subuserType == 'B2C Broker') this.router.navigate(['/quotation/plan/motor-details'])
        else this.router.navigate(['/quotation/plan/main/driver-info']);
      }
      if (this.productId == '61') { this.router.navigate(['quotation/plan/main/accessories']) }
      else {
        if (this.insuranceId != '100002') {
          if (this.userType != 'Broker') {
            this.router.navigate(['/quotation/plan/co-insurance-details'])
          }
          else {
            this.router.navigate(['/quotation/plan/main/document-info'])
          }
        }
        else {
          this.router.navigate(['/quotation/plan/main/document-info'])
        }
      }
    }
  }
  getCoverListFilter(coverList) {
    let i = 0, finalList = [];
    for (let cover of coverList) {
      if (!finalList.some(ele => ele.CoverId == cover.CoverId)) finalList.push(cover)
      i += 1;
      if (i == coverList.length) { return finalList; }
    }
  }
  getExistingBuildingList() {
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let customerDatas = data.Result[0];
        let commonDetails = [{
          "PolicyStartDate": customerDatas.PolicyStartDate,
          "PolicyEndDate": customerDatas.PolicyEndDate,
          "Currency": customerDatas.Currency,
          "SectionId": customerDatas.SectionId,
          "AcexecutiveId": "",
          "ExchangeRate": customerDatas.ExchangeRate,
          "StateExtent": "",
          "NoOfDays": this.noOfDays,
          "HavePromoCode": customerDatas.Havepromocode,
          "Promocode": customerDatas.Promocode,
        }]
        sessionStorage.setItem('homeCommonDetails', JSON.stringify(commonDetails));
        if (this.loginType == 'B2CFlow' && this.loginId == 'guest') {
          window.location.reload();
        }
        else this.router.navigate(['quotation/plan/main/accessories']);
      },
      (err) => { },
    );
  }
  generateOtp() { }
  onNext() {
    this.tabIndex += 1;
  }
  showSidebar() {
    this.sidebarVisible = true;
  }
  checkManualReferral() {
    return this.vehicleDetailsList.some(ele => ele.ManualReferalYn == 'Y')
  }
  show() {
    this.messageService.add({ severity: 'error', summary: 'Referral Quote', detail: 'Quote Moved to Referral Pending' });
  }
  addItem() {
    let entry = [{
      "TypeId": "D",
      "Id": '6',
      "SubId": null,
      "SectionId": this.termsSectionId,
      "RiskId": this.tabIndex + 1,
      "SubIdDesc": "",
      "DocRefNo": null,
      "DocumentId": null,
    }]
    this.jsonList = entry.concat(this.jsonList);
  }
  deleteClauses(row) {
    const index = this.jsonList.indexOf(row);
    this.jsonList.splice(index, 1);
  }
  saveChanges() {
    let i = 0;
    let clauses
    if (this.ClausesData != null || this.ClausesData != undefined) {
      clauses = this.ClausesData.concat(this.jsonList);
    }
    else {
      clauses = this.jsonList
    }
    let quote
    if (this.quoteNo) {
      quote = this.quoteNo;
    }
    else {
      quote = "";
    }
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo: quote,
      RiskId: this.tabIndex + 1,
      SectionId: this.termsSectionId,
      TermsAndConditionReq: clauses,
      RequestReferenceNo: this.requestReferenceNo
    };
    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        this.jsonList = [
          {
            "TypeId": "D",
            "DocRefNo": null,
            "DocumentId": null,
            "SectionId": this.termsSectionId,
            "Id": "6",
            "SubId": null,
            "SubIdDesc": ""
          }
        ];
        this.newAddClauses = false;
        this.viewCondition(1);
        // this.close();
      }
    });
  }
  addExclusion() {
    let entry = [{
      "TypeId": "D",
      "Id": "7",
      "SubId": null,
      "SubIdDesc": "",
      "DocRefNo": null,
      "DocumentId": null,
    }]
    this.ExclusionList = entry.concat(this.ExclusionList);
  }
  saveExclusion() {
    let quote
    if (this.quoteNo) {
      quote = this.quoteNo;
    }
    else {
      quote = "";
    }
    let i = 0;
    let clauses
    if (this.ClausesData != null || this.ClausesData != undefined) {
      clauses = this.ClausesData.concat(this.ExclusionList);
    }
    else {
      clauses = this.ExclusionList
    }
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo: quote,
      //TermsId:null,
      RiskId: String(this.tabIndex + 1),
      SectionId: this.termsSectionId,
      TermsAndConditionReq: clauses,
      RequestReferenceNo: this.requestReferenceNo
    };
    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        this.ExclusionList = [
          {
            "TypeId": "D",
            "Id": "7",
            "SubId": null,
            "SubIdDesc": "",
            "DocRefNo": null,
            "DocumentId": null,
          }
        ];
        // this.close();
        //$('#WarrantyModel').modal('hide');
        this.newAddExclusion = false;
        this.viewCondition(1);
        //window.location.reload();
      }
    });
  }
  deleteExclusion(row) {
    const index = this.ExclusionList.indexOf(row);
    this.ExclusionList.splice(index, 1);
  }
  delete(row) {
    const index = this.json.indexOf(row);
    this.json.splice(index, 1);
  }
  saveWarranty(tempData, json) {
    let i = 0;
    console.log('QQQQQ', this.quoteNo)
    let quote
    if (this.quoteNo) {
      quote = this.quoteNo;
    }
    else {
      quote = "";
    }
    let clauses
    if (this.ClausesData != null || this.ClausesData != undefined) {
      clauses = this.ClausesData.concat(this.json);
    }
    else {
      clauses = this.json
    }
    //let clauses = this.WarrantyData .concat(this.json);
    //console.log('Warranty',this.tempData)
    console.log('Warranty', this.json)
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo: quote,
      //TermsId:null,
      RiskId: String(this.tabIndex + 1),
      SectionId: this.termsSectionId,
      TermsAndConditionReq: clauses,
      RequestReferenceNo: this.requestReferenceNo
    };
    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        console.log('TOOOOOOOOO');
        this.json = [
          {
            "TypeId": "D",
            "Id": "4",
            "SubId": null,
            "SubIdDesc": "",
            "DocRefNo": null,
            "DocumentId": null,
          }
        ];
        this.newAddWarranty = false;
        this.viewCondition(1);
        //this.close();
      }
    });
  }
  addwarranty() {
    let entry = [{
      "TypeId": "D",
      "Id": "4",
      "SubId": null,
      "SubIdDesc": "",
      "DocRefNo": null,
      "DocumentId": null,
    }]
    this.json = entry.concat(this.json);
  }
  checkReferralSection() {
    return this.statusValue == 'RA' && !this.adminSection
  }
  getFilterCoverList(rowData) {
    return rowData.CoverList.filter(ele => ele.CoverageType != 'A')
  }
  getFilterBenefitCoverList(rowData) {
    let list = rowData.CoverList.filter(ele => ele.CoverageType == 'A'), i = 0, finalList = [];
    if (list.length != 0) {
      for (let entry of list) {
        if (!finalList.some(ele => ele.CoverId == entry.CoverId)) finalList.push(entry);
        i += 1;
        if (i == list.length) { return finalList }
      }
    }
    else return [];
  }
  checkBenefitCovers(rowData) {
    return rowData.CoverList.filter(ele => ele.CoverageType == 'A').length != 0
  }
  checkCoverType(vehicle, cover, type) {
    if (type == 'silver') {
      return cover.CoverName.includes('Silver')
    }
    if (type == 'gold') {
      return cover.CoverName.includes('Gold')
    }
    if (type == 'platinum') {
      return cover.CoverName.includes('Platinum')
    }
  }
  ReInsuranceInsert() {
    let ReqObj = {
      "QuoteNo": this.quoteNo,
      "CreatedBy": this.loginId
    }
    let urlLink = `${this.CommonApiUrl}reinsurance/insertReInsurance`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
      },
      (err) => { },
    );
  }
  setDiscountDetails1(vehData, rowData, modal) {
    this.selectedVehId = vehData.VehicleId;
    this.selectedCoverId = rowData.CoverId;
    this.ratePercent = rowData.Rate;
    this.CoverName = rowData.CoverName;
    this.minimumPremiumYN = rowData.MinimumPremiumYn;
    if (rowData.Discounts) this.discountList = rowData.Discounts;
    if (rowData.Loadings) this.loadingList = rowData.Loadings;
    if (rowData.Endorsements) {
      this.discountEndtSection = true;
      this.sumInsured = rowData.SumInsured;
      this.calcType = rowData.Endorsements[rowData.Endorsements.length - 1].EndorsementCalcType;
      this.excessPercent = rowData.Endorsements[rowData.Endorsements.length - 1].ExcessPercent;
      this.ratePercent = rowData.Endorsements[rowData.Endorsements.length - 1].EndorsementRate;
      this.excessAmount = rowData.Endorsements[rowData.Endorsements.length - 1].ExcessAmount;
      this.differenceSI = rowData.Endorsements[rowData.Endorsements.length - 1].EndorsementSumInsured;
      this.differencePremium = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumAfterDiscount
      this.beforeDiscount = rowData.Endorsements[rowData.Endorsements.length - 1].PremiumBeforeDiscount;
      this.selectedSectionId = vehData.SectionId;
    }
    else {
      this.discountEndtSection = false;
      this.sumInsured = rowData.SumInsured;
      this.calcType = rowData.CalcType;
      this.selectedSectionId = vehData.SectionId;
      this.ratePercent = rowData.Rate;
      this.excessPercent = rowData.ExcessPercent;
      this.excessAmount = rowData.ExcessAmount;
      this.beforeDiscount = rowData.PremiumBeforeDiscount;
      this.afterDiscount = rowData.PremiumAfterDiscount;
    }
    this.excessDetailModal1 = true;
    this.ongetTaxDetails1(rowData);
  }
  ongetTaxDetails1(rowData) {
    console.log("Tax Details", rowData);
    this.MinimumPremium = (rowData.MinimumPremium / rowData.ExchangeRate);
    this.premiumExcluedTax = rowData.PremiumExcluedTax;
    this.premiumIncluedTax = rowData.PremiumIncludedTax;
    this.dependantTaxList = []; this.taxList = [];
    this.premiumBeforeTax = 0;
    this.proRataPercent = rowData.ProRata;
    this.premiumAfterDiscount = rowData.PremiumAfterDiscount;
    if (rowData.Taxes) {
      if (rowData.Taxes.length != 0) {
        this.dependantTaxList = rowData.Taxes.filter(ele => ele.DependentYN == 'N');
        if (this.dependantTaxList.length != 0) {
          let i = 0;
          for (let tax of this.dependantTaxList) {
            this.premiumBeforeTax = this.premiumBeforeTax + tax.TaxAmount; i += 1;
            if (i == this.dependantTaxList.length) this.premiumBeforeTax = this.premiumBeforeTax + this.premiumExcluedTax;
          }
        }
        this.taxList = rowData.Taxes.filter(ele => ele.DependentYN != 'N');
      }
    }
    // this.discountDetailModal = true; this.excessDetailModal = false;
  }
  // groupDataBySectionId(data: any[]): any {
  //   const mergedObject = data.reduce((acc, currentItem) => {
  //     const sectionId = currentItem.SectionId;
  //     const locationId = currentItem.LocationId;
  //     if (!acc[sectionId]) {
  //       console.log("Initializing section: ", sectionId,acc[sectionId],acc);
  //       acc[sectionId] = {
  //         ...currentItem,
  //         CoverList: [],
  //         OverallPremiumLc: 0
  //       };
  //     }
  //     acc[sectionId].CoverList = acc[sectionId].CoverList.concat(currentItem.CoverList.filter(ele => ele.CoverageType != 'A'));
  //     const coverPremium = currentItem.CoverList.filter(ele => ele.CoverageType != 'A').reduce(
  //       (sum, cover) => cover.isSelected !== 'N'
  //         ? sum + (Number(cover.PremiumIncludedTaxLC) || 0)
  //         : sum,
  //       0
  //     );
  //     acc[sectionId].OverallPremiumLc += coverPremium;
  //     console.log('Returning',acc)
  //     return acc;
  //   }, {});
  //   this.tableList = Object.values(mergedObject);
  //   // let baseCovers = mergedObject.filter(ele=>ele.CoverageType=='B')
  //   // let optionalCovers = mergedObject.filter(ele=>ele.CoverageType=='O')
  //   // this.tableList = Object.values(baseCovers.concat(optionalCovers));
  //   // console.log(this.tableList, "Final Table List with OverallPremiumLc");
  // }
  groupDataBySectionId(data: any[]): any {
  const mergedObject = data.reduce((acc, currentItem) => {
    const sectionId = currentItem.SectionId;
    const locationId = currentItem.LocationId;
    const key = `${sectionId}_${locationId}`; // unique key for Section + Location

    if (!acc[key]) {
      acc[key] = {
        ...currentItem,
        CoverList: [],
        OverallPremiumLc: 0
      };
    }

    const filteredCovers = currentItem.CoverList.filter(
      ele => ele.CoverageType !== 'A'
    );

  
    acc[key].CoverList = acc[key].CoverList.concat(filteredCovers);

    const coverPremium = filteredCovers.reduce(
      (sum, cover) =>
        cover.isSelected !== 'N'
          ? sum + (Number(cover.PremiumIncludedTaxLC) || 0)
          : sum,
      0
    );

    acc[key].OverallPremiumLc += coverPremium;

    return acc;
  }, {});

  this.tableList = Object.values(mergedObject);

  if (this.tableList.length > 0) {
    const first = this.tableList[0];
    this.expandedRowKeys[`${first.SectionId}_${first.LocationId}`] = true;
  }
}

  onSelectCover1(cover: any, checked: boolean, vehicleId: any, row: any, coverListKey: string, action: string) {
    cover.isSelected = checked ? 'Y' : 'N';
    row.OverallPremiumLc = row.CoverList.reduce(
      (sum: number, c: any) => c.isSelected !== 'N'
        ? sum + (Number(c.PremiumIncludedTaxLC) || 0)
        : sum,
      0
    );
    console.log("Updated row premium:", row.SectionId, row.OverallPremiumLc);
  }
  selectedPlan: string = '';
  selectedCovers: any[] = [];
  selectedTotal: number = 0;
  selectPlan(plan: string) {
    this.selectedPlan = plan;
    this.selectedCovers = [];
    this.selectedTotal = 0;
    this.vehicleDetailsList.forEach((menu: any) => {
      menu.CoverList.forEach((cover: any) => {
        if (this.checkCoverType(menu, cover, plan)) {
          this.selectedCovers.push(cover.CoverId);
          this.selectedTotal += Number(cover.PremiumIncludedTax || 0);
        }
      });
    });
    this.updateSession();
  }
  toggleCoverSelection(cover: any) {
    const idx = this.selectedCovers.indexOf(cover.CoverId);
    if (idx > -1) {
      this.selectedCovers.splice(idx, 1);
      this.selectedTotal -= Number(cover.PremiumIncludedTax || 0);
    } else {
      this.selectedCovers.push(cover.CoverId);
      this.selectedTotal += Number(cover.PremiumIncludedTax || 0);
    }
    this.updateSession();
  }
  isCoverSelected(coverId: any): boolean {
    return this.selectedCovers.includes(coverId);
  }
  private updateSession() {
    sessionStorage.setItem('travelSelectedCovers', JSON.stringify(this.selectedCovers));
    sessionStorage.setItem('selectedPlan', this.selectedPlan);
  }
  private recalculateTotal() {
    this.selectedTotal = 0;
    this.vehicleDetailsList.forEach((menu: any) => {
      menu.CoverList.forEach((cover: any) => {
        if (this.isCoverSelected(cover.CoverId)) {
          this.selectedTotal += Number(cover.PremiumIncludedTax || 0);
        }
      });
    });
  }
  getTotalPremium(): number {
    return this.vehicleDetailsList
      ?.flatMap(v => v.CoverList || [])
      .reduce((sum, c) => sum + (c.ActualPremiumLc || 0), 0);
  }
  getTotalTaxes(): any[] {
    const taxTotals: { [key: string]: number } = {};
    this.vehicleDetailsList?.forEach(v => {
      v.CoverList?.forEach(c => {
        c.Taxes?.forEach(tax => {
          const key = tax.TaxDesc || 'Other';
          taxTotals[key] = (taxTotals[key] || 0) + (tax.TaxAmount || 0);
        });
      });
    });
    // convert to array for *ngFor
    return Object.entries(taxTotals).map(([TaxDesc, TaxAmount]) => ({
      TaxDesc,
      TaxAmount
    }));
  }
  onCoverSelectedTune(selectedCover: any, menu: any) {
    if (!menu || !selectedCover) return;
    if (selectedCover.CoverageType !== 'B') {
      return;
    }
    const liveMenu = this.vehicleDetailsList?.find(m => m.Vehicleid === menu.Vehicleid);
    if (!liveMenu) return;
    liveMenu.CoverList.forEach(c => {
      if (c.CoverageType === 'B') {
        c.isChecked = false;
      }
    });
    const liveCover = liveMenu.CoverList.find(
      c => c.CoverageType === 'B' && c.CoverId === selectedCover.CoverId
    );
    if (liveCover) {
      liveCover.isChecked = true;
      this.selectedCover = liveCover;
    }
    this.vehicleDetailsList = [...this.vehicleDetailsList];
    sessionStorage.setItem('selectedCover', JSON.stringify(this.selectedCover));
    sessionStorage.setItem('menu', JSON.stringify(liveMenu));
  }
  updateUserOpt(locationList: any[], selectedCover: any) {
    locationList.forEach(location => {
      location.SectionDetails.forEach(section => {
        section.Covers.forEach(cover => {
          if (cover.isSelected === 'D') {
            if (cover.CoverId === selectedCover.CoverId) {
              cover.UserOpt = 'Y';
            } else {
              cover.UserOpt = 'N';
            }
          }
        });
      });
    });
    return locationList;
  }
  travelBenefits: any
  TuneBenefits: any
  showtravelBenefits(data) {
    JSON.parse(this.travelBenefits)?.forEach(v => {
      v.CoverList?.forEach(c => {
        if (c.CoverId == data.CoverId) {
          this.TuneBenefits = c.ExcessDesc
        }
      });
    });
    this.showExcessPopup = true;
  }
  getTravalPlaneDetails(obj) {
    let urlLink = `${this.motorApiUrl}api/gettravelpolicytype`;
    this.sharedService.onPostMethodSync(urlLink, obj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.planDetails = data.Result
          this.planDetails = data.Result
          if (this.planDetails?.CoverDetails) {
            this.planDetails.CoverDetails.sort((a, b) => Number(a.CoverId) - Number(b.CoverId)
            );
            this.planDetails.CoverDetails.forEach(cover => {
              cover.SubCoverDetails.sort((a, b) => Number(a.SubCoverId) - Number(b.SubCoverId));
            });
          }
        }
      });
  }
}
