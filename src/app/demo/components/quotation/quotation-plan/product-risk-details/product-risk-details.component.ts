import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '@app/_services';
import { AppComponent } from '@app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { RepeatService } from '../Riskpage/repeat.service';
import { ProductData } from '../models/product';
import * as Mydatas from '../../../../../app-config.json';
import { Booleanish } from 'primeng/ts-helpers';
@Component({
  selector: 'app-product-risk-details',
  standalone: false,
  templateUrl: './product-risk-details.component.html',
  styleUrls: ['./product-risk-details.component.scss']
})
export class ProductRiskDetailsComponent {
  locationList: any[] = [];
  public AppConfig: any = (Mydatas as any).default; firstLossOptions: any[] = [];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  loginId: any = null; userDetails: any = null; insuranceId: any = null; productId: any = null;
  userType: any = null; branchCode: any = null; coversreuired: string; locationIndex: any = 0; agencyCode: any; tabIndex = 0; countryId: any; brokerbranchCode: any;
  lang: any = 'en'; form: any; fields: any[] = []; productItem: any = null; quoteRefNo: any = null; Section: boolean = false; DetoriationPhoenix: boolean = false; industryTypeList: any[] = [];
  endorsementSection: any;
  endorsementDetails: any;
  endorsePolicyNo: any;
  commonDetails: any;
  brokerCode: any;
  applicationId: string;
  policyStartDate: any;
  policyEndDate: any;
  exchangeRate: any = null;
  SectionSelectYn: string;
  requestReferenceNo: any = null;
  LocationName: any[] = [];
  uwQuestionList: any[] = [];
  firstLossPayeeList: any[] = [];
  endorseEffectiveDate: any = null;
  enableFieldsList: any[] = [];
  endorseCoverModification: any = null;
  questionSection: boolean = false;
  currentIndex: any = null;
  selectedCurrency: any;
  locationDetails: any[] = []; quoteNo: any = null;
  renderType: any = null; EmployeePhoenix: boolean = false;
  FirePhoenix: boolean; BuildingCombinedPhoenix: boolean = false;
  ElectronicEquipmentPhoenix: boolean = false; CommercialPackage: boolean = false; UmbrellaPhoenix: boolean; theftPhoenix: boolean;
  AccountsRecivablePhoneix: boolean; BidTension: boolean = false; AccidentalDamagePhoneix: boolean = false; MachineryPhoenix: boolean = false;
  FidelityPhoenix: boolean = false; GlassPhoenix: boolean = false; StateBenefitsPhoenix: boolean = false;
  engineerData: any;
  BusinessAllRiskPhoenix: boolean;
  MoneyPhoenix: boolean;
  OfficeContentPhoenix: boolean;
  HouseOwnerPhoenix: boolean;
  GoodsInTransitPhoenix: boolean;
  PersonalAllRisKPhoenix: boolean;
  DirectorOfficerPhoenix: boolean;
  KidnapAndRandomPhoenix: boolean;
  CashInTransitPhoenix: boolean;
  PublicLiablityPhoenix: boolean;
  HouseHolderPhoenix: boolean;
  ThirdPartLiabilityPhoenix: boolean;
  PensionFundTrusteePhoenix: boolean;
  PersonalLiabilityPhoenix: boolean;
  ConstructionAllRiskPhoenix: boolean;
  ProfessionalIndeminityPhoenix: boolean;
  CountBondPhoenix: boolean;
  PlantAllRiskPhoenix: boolean;
  FuelGuaranteePhoenix: boolean;
  PerfomanceGuranteePhoenix: boolean;
  LiveStockPhoenix: boolean;
  GroupPersonalAccidentPhoenix: boolean;
  CustomsTransitPhoenix: boolean;
  PersonalPackagePlus: Boolean = false;
  NichePackagePlus: boolean = false;
  AgriculturePhoenix: boolean=false;
  GoodsInTransitTZA: boolean=false;
  CarrierLegalTZA: boolean=false;
  carUptoTZA: boolean=false;carAboveTZA:boolean=false;
  constructor(private router: Router, private datePipe: DatePipe, private translate: TranslateService, private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private appComp: AppComponent, private sharedService: SharedService, public http: HttpClient, private repeatService: RepeatService) {
    this.coversreuired = sessionStorage.getItem('coversRequired');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    let quoteNo = null;
    if (sessionStorage.getItem('quoteNo')) { if (sessionStorage.getItem('quoteNo') != 'null') quoteNo = sessionStorage.getItem('quoteNo') }
    this.quoteNo = quoteNo;
    this.getIndustryList();
  }
  ngOnInit() {
    this.form = this.fb.group({
      //   rows: this.fb.array([])  // Initially empty array for rows
    });
    let refNo = sessionStorage.getItem('quoteReferenceNo');
    if (refNo) {
      this.quoteRefNo = refNo; this.requestReferenceNo = refNo; this.Section = false;
      this.getLocationDetails();
    }
    else {
      this.productItem = new ProductData(); this.enableProductPages()
      if (this.locationList.length == 0) { this.onAddLocationDetails('new') }
      if (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') {
        const CustomerLocationDetails = JSON.parse(sessionStorage.getItem('customerLocationDetails'));
        console.log('CustomerLocationDetails', CustomerLocationDetails);
        if (this.locationList.length != 0) {
          this.locationList[0].LocationName = CustomerLocationDetails?.StateName || '';
          if (CustomerLocationDetails?.Street != null && CustomerLocationDetails?.Street != undefined && CustomerLocationDetails?.Street != 'undefined') { this.locationList[0].BuildingAddress = CustomerLocationDetails?.Street + (CustomerLocationDetails?.Address2 ? ', ' : '') + CustomerLocationDetails?.Address2 || ''; }
          else { this.locationList[0].BuildingAddress = null; }
        }
      }
    }
    this.appComp.getLanguage().subscribe((res: any) => {
      if (res) this.lang = res;
      else this.lang = 'en';
      this.translate.setDefaultLang(this.lang); this.checkFieldNames();
    });
    if (!this.lang) {
      if (sessionStorage.getItem('language')) this.lang = sessionStorage.getItem('language');
      else this.lang = 'en';
      sessionStorage.setItem('language', this.lang); this.checkFieldNames();
      this.translate.setDefaultLang(sessionStorage.getItem('language'));
    }
  }
  //On Edit Location 
  getLocationDetails() {
    sessionStorage.removeItem('exchangeRate');
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo
    }
    let urlLink = `${this.motorApiUrl}api/slide/GetNonMotor`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let details = data.Result;
          this.endorsementDetails = data.Result.EndorsementDetails;
          let startDate = details?.PolicyDetails?.PolicyStartDate, endDate = details?.PolicyDetails?.PolicyEndDate;
          let common = JSON.parse(sessionStorage.getItem('homeCommonDetails'))
          sessionStorage.setItem('exchangeRate', data.Result?.PolicyDetails?.ExchangeRate);
          let currency;
          if (common) {
            startDate = common[0]?.PolicyStartDate;
            endDate = common[0]?.PolicyEndDate;
            currency = common[0]?.Currency;
            details.PolicyDetails.Currency = common[0].Currency || data.Result?.PolicyDetails?.Currency;
            this.exchangeRate = common[0].ExchangeRate || data.Result?.PolicyDetails?.ExchangeRate;
            details.BrokerDetails.SourceTypeId = common[0].SourceType || data.Result?.BrokerDetails?.SourceTypeId;
            details.BrokerDetails.BrokerCode = common[0].BrokerCode || data.Result?.BrokerDetails?.BrokerCode;
            details.BrokerDetails.BrokerBranchCode = common[0].BrokerBranchCode || data.Result?.BrokerDetails.BrokerBranchCode
            details.BrokerDetails.CustomerCode = common[0].CustomerCode || details?.BrokerDetails?.CustomerCode,
              details.PolicyDetails.CustomerName = common[0].CustomerName || details?.PolicyDetails?.CustomerName
          }
          this.commonDetails = [
            {
              "PolicyStartDate": startDate,
              "PolicyEndDate": endDate,
              "Currency": details?.PolicyDetails?.Currency,
              "SectionId": details?.PolicyDetails?.SectionIds,
              "AcexecutiveId": "",
              "ExchangeRate": this.exchangeRate || sessionStorage.getItem('exchangeRate'),
              "StateExtent": "",
              "NoOfDays": details?.PolicyDetails?.NoOfDays,
              "HavePromoCode": details?.PolicyDetails?.Havepromocode,
              "PromoCode": details?.PolicyDetails?.Promocode,
              "SourceType": details?.BrokerDetails.SourceTypeId,
              "BrokerCode": details?.BrokerDetails?.BrokerCode,
              "BranchCode": details?.BrokerDetails?.BranchCode,
              "BrokerBranchCode": details?.BrokerDetails?.BrokerBranchCode,
              "CustomerCode": details?.BrokerDetails?.CustomerCode,
              "CustomerName": details?.PolicyDetails?.CustomerName,
              "LoginId": null,
              "IndustryName": null
            }
          ]
          sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
          let locationList = [], PolicyDetails;
          if (details.PolicyDetails) PolicyDetails = details.PolicyDetails;
          if (PolicyDetails) {
            this.selectedCurrency = currency;
          }
          if (details.LocationList) locationList = details.LocationList; this.locationList = [];
          if (locationList.length != 0) {
            let i = 0;
            for (let loc of locationList) {
              loc["BuildingAddress"] = loc.Address;
              let obj = { "LocationId": loc.LocationId, "LocationName": loc.LocationName, "CoversRequired": loc?.CoversRequired, "BuildingOwnerYn": loc?.BuildingOwnerYn, "BuildingAddress": loc?.BuildingAddress, "SectionList": loc?.SectionList }
              this.locationList.push(obj)
              i += 1; 
              if (i == locationList.length) { 
                this.renderType = 'Direct'; this.locationDetails = locationList; this.tabIndex = 0; 
                if (this.productId == '79' || this.productId == '84' || this.productId == '82' || this.productId == '83' || this.productId == '85' || this.productId == '96' || this.productId == '97' || this.productId == '98' || this.productId == '99' || this.productId == '100' || this.productId == '101') {
                  let urlGetLink = `${this.motorApiUrl}api/getEngineerInfo?RequestReferenceno=${this.requestReferenceNo}`;
                  let ReqGetObj = {
                    "RequestReferenceNo": this.requestReferenceNo
                  }
                  this.sharedService.onPostMethodSync(urlGetLink, ReqGetObj).subscribe(
                    (engineerdata: any) => {
                      this.engineerData = engineerdata.Result;
                      this.onEditfirePhoneix(); 
                    });
                }
                else { this.onEditfirePhoneix(); }
              }
            }
          }
        }
      })
  }
  //Industry List
  getIndustryList() {
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'label': '-Select-', 'value': '', 'CodeDesc': '-Select-', 'Code': null }]
        let altObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
        this.industryTypeList = data.Result;
      });
  }
  //Set Product Based Atributes
  enableProductPages() {
    if (this.productId == '75') { this.DetoriationPhoenix = true; }
    else if (this.productId == '66') { this.FirePhoenix = true; }
    else if (this.productId == '67') { this.BuildingCombinedPhoenix = true; }
    else if (this.productId == '14') { this.EmployeePhoenix = true; }
    else if (this.productId == '72') { this.GlassPhoenix = true; }
    else if (this.productId == '74') { this.StateBenefitsPhoenix = true; }
    else if (this.productId == '92') { this.CommercialPackage = true; }
    else if (this.productId == '73') { this.UmbrellaPhoenix = true; }
    else if (this.productId == '71') { this.theftPhoenix = true; }
    else if (this.productId == '69') { this.AccountsRecivablePhoneix = true; }
    else if (this.productId == '70') { this.AccidentalDamagePhoneix = true; }
    else if (this.productId == '39') { this.MachineryPhoenix = true; }
    else if (this.productId == '25') { this.ElectronicEquipmentPhoenix = true; } else if (this.productId == '32') { this.FidelityPhoenix = true; }
    else if (this.productId == '26') { this.BusinessAllRiskPhoenix = true; }
    else if (this.productId == '16') { this.MoneyPhoenix = true; }
    else if (this.productId == '68') { this.OfficeContentPhoenix = true; }
    else if (this.productId == '76') { this.HouseOwnerPhoenix = true; }
    else if (this.productId == '49') { 
      if(this.insuranceId=='100046' || this.insuranceId=='100047' || this.insuranceId=='100048' || this.insuranceId=='100049' || this.insuranceId=='100050') this.GoodsInTransitPhoenix = true; 
      else if(this.insuranceId=='100002') this.GoodsInTransitTZA = true;
    }
    else if (this.productId == '80') { this.PersonalAllRisKPhoenix = true; }
    else if (this.productId == '88') { this.DirectorOfficerPhoenix = true; }
    else if (this.productId == '90') { this.KidnapAndRandomPhoenix = true; }
    else if (this.productId == '91') { this.CashInTransitPhoenix = true; }
    else if (this.productId == '27') { this.PublicLiablityPhoenix = true; }
    else if (this.productId == '78') { this.HouseHolderPhoenix = true; }
    else if (this.productId == '85') { this.ThirdPartLiabilityPhoenix = true; }
    else if (this.productId == '89') { this.PensionFundTrusteePhoenix = true; }
    else if (this.productId == '81') { this.PersonalLiabilityPhoenix = true; }
    else if (this.productId == '79') { this.ConstructionAllRiskPhoenix = true; }
    else if (this.productId == '87') { this.ProfessionalIndeminityPhoenix = true; }
    else if (this.productId == '99') { this.CountBondPhoenix = true; }
    else if (this.productId == '100') { this.FuelGuaranteePhoenix = true; }
    else if (this.productId == '106') { this.LiveStockPhoenix = true; }
    else if (this.productId == '21') { this.PlantAllRiskPhoenix = true; }
    else if (this.productId == '98') { this.PerfomanceGuranteePhoenix = true; }
    else if (this.productId == '57') { this.GroupPersonalAccidentPhoenix = true; }
    else if (this.productId == '97') { this.CustomsTransitPhoenix = true }
    else if (this.productId == '93') { this.PersonalPackagePlus = true; }
    else if (this.productId == '102') { this.NichePackagePlus = true; }
    else if (this.productId == '104') {this.AgriculturePhoenix = true;}
    else if (this.productId == '96') { this.BidTension = true; }
    else if (this.productId == '105') { this.CarrierLegalTZA = true; }
    else if (this.productId == '82') {this.carUptoTZA = true; }else if (this.productId == '83') {this.carAboveTZA = true; }
  }
  checkFieldNames() {
    if (this.fields.length != 0 && this.insuranceId != '100046' && this.insuranceId != '100047' && this.insuranceId != '100048' && this.insuranceId != '100049' && this.insuranceId != '100050') {
      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
      let i = 0;
      for (let field of fieldList) {
        let key = null;
        if (field.id) key = field.id
        else key = field.key
        this.translate.get('MOTORQUOTE.' + key).subscribe((translation: string) => {
          if (field.props) {
            field.props.label = translation;
            if (field.props.options) {
              for (let entry of field.props.options) {
                if (entry.CodeDescLocal == null || entry.CodeDescLocal == undefined) {
                  entry['CodeDescLocal'] = 'Other';
                }
                if (this.lang == 'en') entry['label'] = entry.CodeDesc
                else entry['label'] = entry.CodeDescLocal
              }
            }
          }
          else if (field.templateOptions) {
            field.templateOptions.label = translation;
            // if(field.templateOptions.options){
            //   for(let entry of field.templateOptions.options){
            //     if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
            //       entry['CodeDescLocal'] = 'Other';
            //     }
            //     if(this.lang=='en') entry['label'] = entry.CodeDesc
            //     else entry['label'] = entry.CodeDescLocal
            //   }
            // }
          }
        });
        i += 1;
        if (i == fieldList.length) console.log('Final Field Lang', fieldList);
      }
    }
  }
  onTabChange2(k) {
    this.tabIndex = this.locationIndex = k.index;
    const prevIndex = Number(sessionStorage.getItem('tabIndex') || '0');
  }
  checkLocationDetailAlt() {
    console.log()
    if (this.locationList.length != 0) {
      return (this.locationList[0].LocationName != '' && this.locationList[0].BuildingAddress != '' && this.locationList[0].LocationName != null && this.locationList[0].LocationName != undefined && this.locationList[0].BuildingAddress != null);
    }
    else return false;
  }
  //Add Location
  onAddLocationDetails(type?) {
    this.locationList.push({
      "RiskId": String(this.locationList.length + 1), "LocationName": null, "BuildingAddress": null, "CoversRequired": 'B', "BuildingOwnerYn": 'Y', "BuildingList": [{ "WallType": null, "RoofType": null, "FirstLossPayee": null, "BuildingSumInsured": 0 }], "PAList": [{ 'RelationType': null, 'DeathSI': null }], "ElecEquipList": [{ 'ItemId': null, 'SumInsured': null, 'SerialNo': null }],
      "FireList": [{ "BuildingUsageId": null, "WallType": null, "RoofType": null, "SumInsured": null }], "FireAddOnList": [{ "CoverId": null, "SumInsured": 0 }], "StockAddOnList": [{ "CoverId": null, "SumInsured": 0 }],
      "GeyserList": [{ "BuildingUsageId": null, "SumInsured": 0 }], "BIFireList": [{ "ContentId": null, "IndemityPeriod": "", "SumInsured": null, "IndemityPeriodDesc": null }], "GoodsTransitList": [{ "ContentId": null, "SumInsured": null, "ModeOfTransport": null }], "MachineryList": [{ 'ItemId': null, 'SumInsured': null, 'SerialNo': null }]
      , "PlateGlassList": [{ "SumInsured": null, "CategoryId": null }],
      "EmployeesLiabilityList": [], "contents": [],
      "electronicEquipment": [], "electronicPortableEquipment": [],
    });
    this.locationIndex = this.locationList.length - 1;
    this.tabIndex = 0; this.renderType = 'change';
  }
  //Delete Location
  deleteLocation(index) { this.locationList.splice(index, 1); if (this.locationList.length == 0) this.onAddLocationDetails() }
  //Previous Location
  onPreviousTab() {
    this.tabIndex -= 1; this.productItem = new ProductData(); if (this.productId == '59') this.onEditDomestic();
    else { this.renderType = 'change'; this.onEditfirePhoneix() }
  }
  //Edit Details
  onEditDomestic() {
  }
  //Phoenix Edit
  onEditfirePhoneix() {
    this.productItem = new ProductData();
    this.DetoriationPhoenix = false; this.FirePhoenix = false; this.BuildingCombinedPhoenix = false; this.EmployeePhoenix = false;
    this.ElectronicEquipmentPhoenix = false; this.FidelityPhoenix = false; this.GlassPhoenix = false; this.StateBenefitsPhoenix = false;
    this.CommercialPackage = false; this.MachineryPhoenix = false; this.AccidentalDamagePhoneix = false; this.AccountsRecivablePhoneix = false; this.BusinessAllRiskPhoenix = false; this.MoneyPhoenix = false;
    this.OfficeContentPhoenix = false; this.HouseOwnerPhoenix = false; this.GoodsInTransitPhoenix = false; this.PersonalAllRisKPhoenix = false; this.DirectorOfficerPhoenix = false;
    this.KidnapAndRandomPhoenix = false;this.GoodsInTransitTZA=false;
    this.CashInTransitPhoenix = false;
    this.PublicLiablityPhoenix = false;
    this.HouseHolderPhoenix = false;
    this.ThirdPartLiabilityPhoenix = false;
    this.PensionFundTrusteePhoenix = false;
    this.PersonalLiabilityPhoenix = false;
    this.ConstructionAllRiskPhoenix = false;
    this.ProfessionalIndeminityPhoenix = false;
    this.CountBondPhoenix = false;
    this.LiveStockPhoenix = false;
    this.FuelGuaranteePhoenix = false;
    this.PerfomanceGuranteePhoenix = false;
    this.PlantAllRiskPhoenix = false;
    this.GroupPersonalAccidentPhoenix = false;
    this.CustomsTransitPhoenix = false;this.carAboveTZA=false;
    this.PersonalPackagePlus = false;this.carUptoTZA=false;
    this.NichePackagePlus = false;this.CarrierLegalTZA=false;
    this.AgriculturePhoenix = false;this.BidTension = false;
    let i = 0;
    for (let loc of this.locationList) {
      if (loc.BuildingAddress == undefined && loc.Address != undefined && loc.Address != '') { loc['BuildingAddress'] = loc['Address'] }
      i += 1; if (i == this.locationList.length) {
        setTimeout(() => {
          if (this.productId == '75') this.DetoriationPhoenix = true; else if (this.productId == '66') { this.FirePhoenix = true; } else if (this.productId == '67') { this.BuildingCombinedPhoenix = true; }
          else if (this.productId == '14') { this.EmployeePhoenix = true; } else if (this.productId == '25') { this.ElectronicEquipmentPhoenix = true; }
          else if (this.productId == '32') { this.FidelityPhoenix = true; } else if (this.productId == '72') { this.GlassPhoenix = true; }
          else if (this.productId == '74') { this.StateBenefitsPhoenix = true; }
          else if (this.productId == '92') { this.CommercialPackage = true; }
          else if (this.productId == '73') { this.UmbrellaPhoenix = true; }
          else if (this.productId == '71') { this.theftPhoenix = true; }
          else if (this.productId == '69') { this.AccountsRecivablePhoneix = true; }
          else if (this.productId == '70') { this.AccidentalDamagePhoneix = true; }
          else if (this.productId == '39') { this.MachineryPhoenix = true; }
          else if (this.productId == '26') { this.BusinessAllRiskPhoenix = true; }
          else if (this.productId == '16') { this.MoneyPhoenix = true; }
          else if (this.productId == '68') { this.OfficeContentPhoenix = true; }
          else if (this.productId == '76') { this.HouseOwnerPhoenix = true; }
          else if (this.productId == '49') { 
            if(this.insuranceId=='100046' || this.insuranceId=='100047' || this.insuranceId=='100048' || this.insuranceId=='100049' || this.insuranceId=='100050') this.GoodsInTransitPhoenix = true; 
            else if(this.insuranceId=='100002') this.GoodsInTransitTZA = true;
          }
          else if (this.productId == '80') { this.PersonalAllRisKPhoenix = true; }
          else if (this.productId == '88') { this.DirectorOfficerPhoenix = true; }
          else if (this.productId == '90') { this.KidnapAndRandomPhoenix = true; }
          else if (this.productId == '91') { this.CashInTransitPhoenix = true; }
          else if (this.productId == '27') { this.PublicLiablityPhoenix = true; }
          else if (this.productId == '78') { this.HouseHolderPhoenix = true; }
          else if (this.productId == '85') { this.ThirdPartLiabilityPhoenix = true; }
          else if (this.productId == '89') { this.PensionFundTrusteePhoenix = true; }
          else if (this.productId == '81') { this.PersonalLiabilityPhoenix = true; }
          else if (this.productId == '79') { this.ConstructionAllRiskPhoenix = true; }
          else if (this.productId == '87') { this.ProfessionalIndeminityPhoenix = true; }
          else if (this.productId == '99') { this.CountBondPhoenix = true; }
          else if (this.productId == '100') { this.FuelGuaranteePhoenix = true; }
          else if (this.productId == '106') { this.LiveStockPhoenix = true; }
          else if (this.productId == '21') { this.PlantAllRiskPhoenix = true; }
          else if (this.productId == '98') { this.PerfomanceGuranteePhoenix = true; }
          else if (this.productId == '57') { this.GroupPersonalAccidentPhoenix = true; }
          else if (this.productId == '97') { this.CustomsTransitPhoenix = true }
          else if (this.productId == '93') { this.PersonalPackagePlus = true; }
          else if (this.productId == '102') { this.NichePackagePlus = true; }
          else if (this.productId == '104') {this.AgriculturePhoenix = true;}
          else if (this.productId == '96') { this.BidTension = true; }else if (this.productId == '83') {this.carAboveTZA = true; }
          else if (this.productId == '105') { this.CarrierLegalTZA = true; } else if (this.productId == '82') { this.carUptoTZA = true; }
        }, 100)
      }
    }
  }
  finalEnableProducts() {
    setTimeout(() => {
      if (this.productId == '75') this.DetoriationPhoenix = true; else if (this.productId == '66') { this.FirePhoenix = true; } else if (this.productId == '67') { this.BuildingCombinedPhoenix = true; }
      else if (this.productId == '14') { this.EmployeePhoenix = true; } else if (this.productId == '25') { this.ElectronicEquipmentPhoenix = true; }
      else if (this.productId == '32') { this.FidelityPhoenix = true; } else if (this.productId == '72') { this.GlassPhoenix = true; }
      else if (this.productId == '74') { this.StateBenefitsPhoenix = true; } else if (this.productId == '96') { this.BidTension = true; }
      else if (this.productId == '92') { this.CommercialPackage = true; }else if (this.productId == '105') { this.CarrierLegalTZA = true; }
      else if (this.productId == '73') { this.UmbrellaPhoenix = true; }else if (this.productId == '82') { this.carUptoTZA = true; }
      else if (this.productId == '71') { this.theftPhoenix = true; }else if (this.productId == '83') {this.carAboveTZA = true; }
      else if (this.productId == '69') { this.AccountsRecivablePhoneix = true; }
      else if (this.productId == '70') { this.AccidentalDamagePhoneix = true; }
      else if (this.productId == '39') { this.MachineryPhoenix = true; }
      else if (this.productId == '93') { this.PersonalPackagePlus = true; }
      else if (this.productId == '102') { this.NichePackagePlus = true;}
    }, 100)
  }
  //Save Details
  onSubmitAltDetails(type, packageType) {
    console.log("Before Submit", this.locationList)
    let i = 0;
    let commonDetals: any = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    if (commonDetals == null) commonDetals = this.commonDetails;
    let appId = "1", loginId = "", brokerbranchCode = ""; let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
    }
    else this.quoteRefNo = null;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId = this.loginId;
      }
      else {
        appId = this.loginId;
        loginId = this.loginId;
        this.brokerbranchCode = null;
      }
    }
    this.applicationId = appId;
    let havePromoYN = 'N'
    if (commonDetals[0].PromoCode != null && commonDetals[0].PromoCode != '' && commonDetals[0].PromoCode != undefined) havePromoYN = 'Y'
    let startDate = null, endDate = null;
    let startDateList = String(commonDetals[0].PolicyStartDate).split('/');
    if (startDateList.length > 1) startDate = commonDetals[0].PolicyStartDate
    else startDate = this.datePipe.transform(commonDetals[0].PolicyStartDate, 'dd/MM/yyyy');
    let endDateList = String(commonDetals[0].PolicyEndDate).split('/');
    if (endDateList.length > 1) endDate = commonDetals[0].PolicyEndDate
    else endDate = this.datePipe.transform(commonDetals[0].PolicyEndDate, 'dd/MM/yyyy');
    this.policyStartDate = startDate; this.policyEndDate = endDate;
    let status = 'Y';
    if (this.endorsementSection) { status = 'E'; }
    let quoteNo = null;
    if (sessionStorage.getItem('quoteNo')) { if (sessionStorage.getItem('quoteNo') != 'null') quoteNo = sessionStorage.getItem('quoteNo') }
    let ReqObj = {
      "PolicyDetails": {
        "SaveOrSubmit": 'Submit',
        "AcexecutiveId": "",
        "ProductType": null,
        "TiraCoverNoteNo": null,
        "CustomerReferenceNo": sessionStorage.getItem('customerReferenceNo'),
        "RequestReferenceNo": this.quoteRefNo,
        "QuoteNo": quoteNo,
        "BuildingOwnerYn": "N",
        "Createdby": this.loginId,
        "Currency": commonDetals[0].Currency,
        "ExchangeRate": commonDetals[0].ExchangeRate || sessionStorage.getItem('exchangeRate'),
        "Havepromocode": havePromoYN,
        "PolicyEndDate": endDate,
        "PolicyStartDate": startDate,
        "IndustryId": "99999",
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "BranchCode": this.branchCode,
        "Status": status
      },
      "BrokerDetails": {
        "CustomerCode": commonDetals[0]?.CustomerCode,
        "CustomerName": commonDetals[0]?.CustomerName,
        "BdmCode": commonDetals[0]?.CustomerCode,
        "BrokerCode": commonDetals[0]?.BrokerCode,
        "LoginId": loginId,
        "ApplicationId": this.applicationId,
        "AgencyCode": this.agencyCode,
        "BrokerBranchCode": this.brokerbranchCode,
        "SourceTypeId": commonDetals[0].SourceType,
        "UserType": "Broker"
      },
      "LocationList": this.locationList.filter(ele => ele.SectionList.length != 0)
    }
    if (this.endorsementSection) {
      if (this.endorsementDetails.PolicyNo == null || this.endorsementDetails.PolicyNo == undefined) {
        this.endorsementDetails['PolicyNo'] = this.endorsePolicyNo;
      }
      ReqObj['EndorsementDetails'] = this.endorsementDetails
    }
    else {
      ReqObj["EndorsementDetails"] = {
        "EndorsementDate": null,
        "EndorsementEffectiveDate": null,
        "EndorsementRemarks": null,
        "EndorsementType": null,
        "EndorsementTypeDesc": null,
        "EndtCategoryDesc": null,
        "EndtCount": null,
        "EndtPrevPolicyNo": null,
        "EndtPrevQuoteNo": null,
        "EndtStatus": null,
        "IsFinanceEndt": null,
        "OrginalPolicyNo": null,
        "PolicyNo": null,
      }
    }
    let saveDetails = sessionStorage.getItem('ApiCall');
    console.log("Submit Obj",this.locationList)
    if ((this.productId == '19' && saveDetails) || this.productId != '19') {
      if ((this.productId == '19' && (this.SectionSelectYn == 'UWQues' || this.SectionSelectYn == '')) || this.productId != '19') {
        let urlLink = `${this.motorApiUrl}api/slide/nonmotorsave`
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data.Result) {
              if (data?.Result.length != 0) {
                this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                if ((this.insuranceId != '59' && this.insuranceId != '19') || (this.locationList.length == (this.tabIndex + 1) && this.insuranceId != '59' && this.insuranceId != '19') || type == 'Submit') {
                  if (this.uwQuestionList.length != 0) {
                    let k = 0;
                    let uwList: any[] = new Array();
                    console.log("Final Lis UW", this.uwQuestionList)
                    for (let obj of this.uwQuestionList) {
                      let i = 0;
                      for (let ques of obj.UWQuestionsList) {
                        ques['BranchCode'] = this.branchCode;
                        let createdBy = "";
                        let quoteStatus = sessionStorage.getItem('QuoteStatus');
                        if (quoteStatus == 'AdminRP') {
                          createdBy = this.loginId;
                        }
                        else {
                          createdBy = this.loginId;
                        }
                        let status = null, loading = null;
                        if ((ques.Value == null || ques.Value == '')) ques.Value = 'N';
                        // if(ques.Value=='Yes') ques.Value='Y'
                        // else if(ques.Value=='No') ques.Value='N'
                        if (ques.QuestionType == '01' && ques.Value != null && ques.Value != '' && ques.Options != null) {
                          let obj = ques.Options.find(ele => ele.UwQuesOptionDesc == ques.Value);
                          if (obj) {
                            loading = obj.LoadingPercent
                            if (obj.ReferralYn == 'Y') status = 'R';
                            else status = 'Y';
                          }
                          else status = 'Y';
                        }
                        else status = ques.Status;
                        let entry = {
                          "InsuranceId": this.insuranceId,
                          "ProductId": this.productId,
                          "UwQuestionId": ques.UwQuestionId,
                          "UwQuestionDesc": ques.UwQuestionDesc,
                          "QuestionType": ques.QuestionType,
                          "QuestionCategory": ques.QuestionCategory,
                          "QuestionCategoryDesc": ques.questionCategoryDesc,
                          "questionCategoryDesc": ques.questionCategoryDesc,
                          "EffectiveDateStart": ques.EffectiveDateStart,
                          "SectionId": ques.SectionId,
                          "LocationId": String(this.tabIndex + 1),
                          "Status": status,
                          "LoadingPercent": loading,
                          "MandatoryYn": ques.MandatoryYn,
                          "DataType": ques.DataType,
                          "CreatedBy": createdBy,
                          "UpdatedBy": this.loginId,
                          "Value": ques.Value,
                          "BranchCode": this.branchCode,
                          "RequestReferenceNo": this.requestReferenceNo,
                          "VehicleId": String(this.tabIndex + 1)
                        }
                        uwList.push(entry);
                        i += 1;
                        if (i == obj.UWQuestionsList.length) { k += 1; if (k == this.uwQuestionList.length) this.onSaveUWQues(uwList, data.Result, type); }
                      }
                    }
                  }
                  else {
                    if (this.productItem.FirstLossPayeeYN == 'Y') {
                      let list = this.firstLossPayeeList.filter(ele => ele.FirstLossPayeeDesc != '' && ele.FirstLossPayeeDesc != null);
                      if (list.length != 0 && ((this.SectionSelectYn == 'UWQues' || this.SectionSelectYn == '') || this.productId != '19')) { this.onSaveFirstLossList(data.Result, type) }
                      else if ((list.length != 0 && this.productId == '19' && (this.SectionSelectYn == 'UWQues' || this.SectionSelectYn == '') || this.productId != '19')) {
                        if (this.tabIndex + 1 != this.locationList.length) {
                          this.tabIndex += 1; this.SectionSelectYn = 'FC';
                          this.productItem = new ProductData(); this.form.reset()
                          if (this.productId == '59' || this.productId == '19') this.onEditDomestic()
                          else { this.onEditfirePhoneix(); this.renderType = 'change'; }
                        }
                        else this.onCalculate(data.Result, type);
                      }
                    }
                    else {
                      if (this.productId == '19') {
                      }
                      else {
                        if (this.productId == '96' || this.productId=='82' || this.productId=='83') {
                          this.InsertEnginnerInfo(type, packageType, data.Result)
                        }
                        else {
                          if (type == 'Submit') this.onCalculate(data.Result, type);
                          else if (type == 'Next' && (this.tabIndex + 1) != this.locationList.length) { this.renderType = 'change'; this.tabIndex += 1; this.onEditfirePhoneix() }
                          else if (type == 'packageData') {
                            this.renderType = 'change';
                            this.sharedService.SkipSection(packageType);
                          }
                        }
                      }
                    }
                  }
                }
                else {
                  if (this.uwQuestionList.length != 0) {
                    let i = 0, k = 0;
                    let uwList: any[] = new Array();
                    for (let obj of this.uwQuestionList) {
                      for (let ques of obj.UWQuestionsList) {
                        ques['BranchCode'] = this.branchCode;
                        let createdBy = "";
                        let quoteStatus = sessionStorage.getItem('QuoteStatus');
                        if (quoteStatus == 'AdminRP') {
                          createdBy = this.loginId;
                        }
                        else {
                          createdBy = this.loginId;
                        }
                        let status = null, loading = null;
                        if ((ques.Value == null || ques.Value == '')) ques.Value = 'N';
                        // if(ques.Value=='Yes') ques.Value='Y'
                        // else if(ques.Value=='No') ques.Value='N'
                        if (ques.QuestionType == '01' && ques.Value != null && ques.Value != '' && ques.Options != null) {
                          let obj = ques.Options.find(ele => ele.UwQuesOptionDesc == ques.Value);
                          if (obj) {
                            loading = obj.LoadingPercent
                            if (obj.ReferralYn == 'Y') status = 'R';
                            else status = 'Y';
                          }
                          else status = 'Y';
                        }
                        else status = ques.Status;
                        let entry = {
                          "InsuranceId": this.insuranceId,
                          "ProductId": this.productId,
                          "UwQuestionId": ques.UwQuestionId,
                          "UwQuestionDesc": ques.UwQuestionDesc,
                          "QuestionType": ques.QuestionType,
                          "QuestionCategory": ques.QuestionCategory,
                          "QuestionCategoryDesc": ques.questionCategoryDesc,
                          "questionCategoryDesc": ques.questionCategoryDesc,
                          "EffectiveDateStart": ques.EffectiveDateStart,
                          "Status": status,
                          "LoadingPercent": loading,
                          "MandatoryYn": ques.MandatoryYn,
                          "DataType": ques.DataType,
                          "CreatedBy": createdBy,
                          "UpdatedBy": this.loginId,
                          "Value": ques.Value,
                          "BranchCode": this.branchCode,
                          "RequestReferenceNo": this.requestReferenceNo,
                          "VehicleId": String(this.tabIndex + 1)
                        }
                        uwList.push(entry);
                        i += 1;
                        if (i == obj.UWQuestionsList.length) { k += 1; if (k == this.uwQuestionList.length) this.onSaveUWQues(uwList, data.Result, type); }
                      }
                    }
                  }
                  else if ((this.productId == '59' || this.productId == '19') && this.productItem.FirstLossPayeeYN == 'Y') {
                    let list = this.firstLossPayeeList.filter(ele => ele.FirstLossPayeeDesc != '' && ele.FirstLossPayeeDesc != null);
                    if (list.length != 0) { this.onSaveFirstLossList(data.Result, type) }
                    else { if (this.tabIndex + 1 != this.locationList.length) { this.tabIndex += 1; this.SectionSelectYn = 'FC'; } this.productItem = new ProductData(); if (this.productId == '59' || this.productId == '19') this.onEditDomestic() }
                  }
                  else if (this.productId == '66' || this.productId == '67' || this.productId == '68' || this.productId == '69' || this.productId == '70' || this.productId == '71' || this.productId == '72' || this.productId == '75' || this.productId == '49' || this.productId == '14' || this.productId == '32' || this.productId == '39' || this.productId == '73' || this.productId == '74' || this.productId == '76' || this.productId == '26' || this.productId == '27' || this.productId == '16' || this.productId == '57' || this.productId == '48' || this.productId == '78' || this.productId == '77' || this.productId == '105' || this.productId == '61') { this.renderType = 'change'; this.tabIndex += 1; this.productItem = new ProductData(); this.onEditfirePhoneix() }
                  else {
                    if (this.tabIndex + 1 != this.locationList.length) { this.tabIndex += 1; this.SectionSelectYn = 'FC'; }
                    this.productItem = new ProductData();
                    if (this.productId == '59' || this.productId == '19') this.onEditDomestic()
                    else { this.renderType = 'change'; this.onEditfirePhoneix(); }
                  }
                }
              }
            }
          });
      }
      else { this.onTemporarySave(ReqObj, type, 'change') }
    }
  }
  onTemporarySave(ReqObj, type, callType) {
    let saveDetails = sessionStorage.getItem('ApiCall');
    if (saveDetails) {
      sessionStorage.removeItem('ApiCall');
      let urlLink = `${this.motorApiUrl}api/slide/nonmotorsave`
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if (this.SectionSelectYn == 'UWQues') {
            }
          }
          sessionStorage.setItem('ApiCall', 'true')
        })
    }
    else { this.onTemporarySave(ReqObj, type, 'direct') }
  }
  onSaveUWQues(uwList, entry, type) {
    if (uwList.length != 0) {
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if (data.Result) {
            if (this.productId == '66' || this.productId == '67' || this.productId == '68' || this.productId == '69' || this.productId == '70' || this.productId == '71' || this.productId == '72' || this.productId == '75' || this.productId == '49' || this.productId == '14' || this.productId == '32' || this.productId == '39' || this.productId == '73' || this.productId == '74' || this.productId == '76' || this.productId == '26' || this.productId == '27' || this.productId == '16' || this.productId == '57' || this.productId == '48' || this.productId == '78' || this.productId == '77' || this.productId == '25' || this.productId == '92') {
              if (this.tabIndex != this.locationList.length - 1) {
                this.tabIndex += 1; this.productItem = new ProductData();
                if (this.productId == '39' || this.productId == '92') {
                  this.form.controls['GrossProfit']?.setValue('0'); this.form.controls['IncreasedCostOfWorking']?.setValue('0');
                  this.form.controls['ClaimsPreparationCosts']?.setValue(null); this.form.controls['MClaimsPreparationCosts']?.setValue(null);
                }
                if (this.productId == '66' || this.productId == '67' || this.productId == '78') {
                  this.form.reset();
                  this.productItem = new ProductData();
                }
                this.renderType = 'change'; this.onEditfirePhoneix()
              }
              else { this.onCalculate(entry, type); }
            }
            else if (this.productId == '59' || this.productId == '24') {
              this.onFinalProceed();
            }
            else { this.onCalculate(entry, type); }
          }
        },
        (err) => { },
      );
    }
    else {
      if (this.productId == '59' || this.productId == '24') {
        this.onFinalProceed();
      }
      else { this.getCalculationDetails(entry); }
    }
  }
  getCalculationDetails(vehicleDetails) {
    let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
    }
    if (this.productId != '59') {
      let sectionId = null;
      if (this.productId == '13') sectionId = '35';
      else if (this.productId == '14') sectionId = '37';
      else if (this.productId == '15') sectionId = '38';
      else if (this.productId == '32') sectionId = '43';
      let effectiveDate = null;
      if (this.endorsementSection) {
        effectiveDate = this.endorseEffectiveDate;
      }
      else {
        effectiveDate = this.commonDetails[0].PolicyStartDate;
      }
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "SectionId": sectionId,
        "ProductId": this.productId,
        "MSRefNo": vehicleDetails?.MSRefNo,
        "VehicleId": vehicleDetails?.VehicleId,
        "CdRefNo": vehicleDetails?.CdRefNo,
        "VdRefNo": vehicleDetails?.VdRefNo,
        "CreatedBy": createdBy,
        "productId": this.productId,
        "sectionId": sectionId,
        "RequestReferenceNo": this.requestReferenceNo,
        "EffectiveDate": effectiveDate,
        "PolicyEndDate": this.commonDetails[0].PolicyEndDate
      }
      let urlLink = `${this.CommonApiUrl}calculator/calc`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let res: any = data;
          let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
          if (homeDetails) {
            if (this.productId != '59') {
              if (homeDetails.SectionId == undefined || homeDetails.SectionId == "undefined") homeDetails['SectionId'] = [sectionId];
              sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
            }
          }
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
        },
        (err) => { },
      );
    }
    else if (vehicleDetails.length != 0) {
      let i = 0;
      for (let veh of vehicleDetails) {
        let effectiveDate = null; let coverModificationYN = 'N';
        if (this.endorsementSection) {
          effectiveDate = this.endorseEffectiveDate;
          // let entry = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId!=850);
          // if (entry || (this.endorsementId == 846 && veh.Status =='D')) coverModificationYN = 'Y';
          // else coverModificationYN = 'N';
          if (this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
        }
        else {
          effectiveDate = this.commonDetails[0].PolicyStartDate;
        }
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
          "AgencyCode": this.agencyCode,
          "SectionId": veh.SectionId,
          "ProductId": this.productId,
          "MSRefNo": veh?.MSRefNo,
          "VehicleId": veh?.VehicleId,
          "CdRefNo": veh?.CdRefNo,
          "VdRefNo": veh?.VdRefNo,
          "CreatedBy": createdBy,
          "productId": this.productId,
          "sectionId": veh.SectionId,
          "RequestReferenceNo": this.requestReferenceNo,
          "EffectiveDate": effectiveDate,
          "PolicyEndDate": this.commonDetails[0].PolicyEndDate,
          "CoverModification": coverModificationYN
        }
        let urlLink = `${this.CommonApiUrl}calculator/calc`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let res: any = data;
            i += 1;
            if (i == vehicleDetails.length) {
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
            }
          },
          (err) => { },
        );
      }
    }
  }
  onCalculate(buildDetails, type) {
    if (this.productId == '19' && this.insuranceId == '100050') this.SectionSelectYn = '';
    if ((this.SectionSelectYn == 'UWQues' || this.SectionSelectYn == '') && this.productId == '19') {
      let createdBy = ""
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP') {
        createdBy = ""
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
      }
      else createdBy = this.loginId;
      console.log(buildDetails);
      if (buildDetails.length != 0) {
        this.requestReferenceNo = buildDetails[0]?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', buildDetails[0]?.RequestReferenceNo);
        let i = 0;
        let coverModificationYN = 'N';
        let entry = this.enableFieldsList.some(ele => ele == 'Covers');
        if (entry) coverModificationYN = 'Y';
        else coverModificationYN = 'N';
        if (this.endorsementSection) {
          if (this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
        }
        let endDate: any = null;
        if (this.policyEndDate) {
          if (this.policyEndDate) {
            let dateList = String(this.policyEndDate).split('/');
            if (dateList.length > 1) endDate = this.policyEndDate;
            else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          }
        }
        let effectiveDate = null;
        if (this.endorsementSection) {
          effectiveDate = this.endorseEffectiveDate;
        }
        else {
          if (this.policyStartDate) {
            let dateList = String(this.policyStartDate).split('/');
            if (dateList.length > 1) effectiveDate = this.policyStartDate;
            else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
          }
        }
        let ReqObj = {
          "RequestReferenceNo": this.requestReferenceNo,
          "CoverModification": coverModificationYN,
          "EffectiveDate": effectiveDate,
          "PolicyEndDate": endDate,
        }
        let urlLink = `${this.CommonApiUrl}calculator/calc/call`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data) {
              let entry = data?.Result;
              if (this.productId == '63' || this.productId == '59') {
                if ((type == 'Save' && this.LocationName.length == (this.tabIndex + 1) && this.insuranceId != '59') || (type == 'Save' && this.locationList.length == (this.currentIndex + 1) && this.insuranceId != '59') || type == 'Submit') {
                  this.onFinalProceed();
                }
                else { this.tabIndex += 1; if (this.uwQuestionList.length != 0) this.getEditUwQuestions(); if (this.productId == '59') this.onEditDomestic }
              }
              else this.onFinalProceed();
            }
          });
        // for (let build of buildDetails) {
        //   let effectiveDate = null, coverModificationYN = 'N';
        //   if (this.endorsementSection) {
        //     effectiveDate = this.endorseEffectiveDate;
        //     if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
        //   }
        //   else {
        //     effectiveDate = this.policyStartDate;
        //   }
        //   if(this.productId=='46') build['RiskId'] = '1';
        //   let sectionId = '';
        //   let locationId = '1';
        //   if(build.LocationId) locationId = build.LocationId
        //   let ReqObj = {
        //     "InsuranceId": this.insuranceId,
        //     "BranchCode": this.branchCode,
        //     "AgencyCode": this.agencyCode,
        //     "SectionId": build.SectionId,
        //     "ProductId": this.productId,
        //     "LocationId": locationId,
        //     "MSRefNo": build.MSRefNo,
        //     "VehicleId": build.RiskId,
        //     "CdRefNo": build.CdRefNo,
        //     "VdRefNo": build.VdRefNo,
        //     "CreatedBy": this.loginId,
        //     "productId": this.productId,
        //     "RequestReferenceNo": sessionStorage.getItem('quoteReferenceNo'),
        //     "EffectiveDate": effectiveDate,
        //     "PolicyEndDate": this.policyEndDate,
        //     "CoverModification": coverModificationYN
        //   }
        //   let urlLink = `${this.CommonApiUrl}calculator/calc`;
        //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        //     (data: any) => {
        //       if (data) {
        //         let entry = data?.Result;
        //         i += 1;
        //         if (i == buildDetails.length) {
        //           if(this.productId=='63' || this.productId=='59'){
        //               if((type=='Save' && this.LocationName.length==(this.tabIndex+1) && this.insuranceId!='59') || (type=='Save' && this.locationList.length==(this.currentIndex+1) && this.insuranceId!='59') || type=='Submit' ){
        //                     this.onFinalProceed();
        //               }
        //               else{ this.tabIndex+=1;if(this.uwQuestionList.length!=0)this.getEditUwQuestions();if(this.productId=='59')this.onEditDomestic}
        //             }
        //             else this.onFinalProceed();
        //         }
        //       }
        //     },
        //     (err) => { },
        //   );
        // }
      }
    }
    else if (this.productId != '19') {
      let createdBy = ""
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP') {
        createdBy = ""
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
      }
      else createdBy = this.loginId;
      if (buildDetails.length != 0) {
        this.requestReferenceNo = buildDetails[0]?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', buildDetails[0]?.RequestReferenceNo);
        let coverModificationYN = 'N';
        let entry = this.enableFieldsList.some(ele => ele == 'Covers');
        if (entry) coverModificationYN = 'Y';
        else coverModificationYN = 'N';
        if (this.endorsementSection) {
          if (this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
        }
        let endDate: any = null;
        if (this.policyEndDate) {
          if (this.policyEndDate) {
            let dateList = String(this.policyEndDate).split('/');
            if (dateList.length > 1) endDate = this.policyEndDate;
            else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          }
        }
        let effectiveDate = null;
        if (this.endorsementSection) {
          effectiveDate = this.endorseEffectiveDate;
        }
        else {
          if (this.policyStartDate) {
            let dateList = String(this.policyStartDate).split('/');
            if (dateList.length > 1) effectiveDate = this.policyStartDate;
            else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
          }
        }
        let ReqObj = {
          "RequestReferenceNo": this.requestReferenceNo,
          "CoverModification": coverModificationYN,
          "EffectiveDate": effectiveDate,
          "PolicyEndDate": endDate,
        }
        let urlLink = `${this.CommonApiUrl}calculator/calc/call`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data) {
              let entry = data?.Result;
              if (this.productId == '63' || this.productId == '59') {
                if ((type == 'Save' && this.LocationName.length == (this.tabIndex + 1) && this.insuranceId != '59') || (type == 'Save' && this.locationList.length == (this.currentIndex + 1) && this.insuranceId != '59') || type == 'Submit') {
                  this.onFinalProceed();
                }
                else { this.tabIndex += 1; if (this.uwQuestionList.length != 0) this.getEditUwQuestions(); if (this.productId == '59') this.onEditDomestic }
              }
              else this.onFinalProceed();
            }
          });
      }
    }
  }
  getEditUwQuestions() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "LoginId": this.loginId,
      "RequestReferenceNo": this.quoteRefNo,
      "LocationId": String(this.tabIndex + 1),
      "VehicleId": String(this.tabIndex + 1),
      "SectionId": null
    }
    let urlLink = `${this.CommonApiUrl}api/getuwquestionsdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let uwList = data?.Result;
        console.log("UW List", uwList, this.uwQuestionList)
        if (uwList.length != 0) {
          let i = 0;
          for (let ques of uwList) {
            let list = this.uwQuestionList.find(ele => ele.SectionId == ques.SectionId)?.UWQuestionsList;
            let entry = list.find(ele => ele.UwQuestionId == ques.UwQuestionId);
            if (entry) { entry.Value = ques.Value };
            console.log("Filtered UW", entry)
            i += 1;
            if (i == uwList.length) {
              for (let obj of this.uwQuestionList) {
                obj.UWQuestionsList.forEach(x => {
                  if (x.QuestionType == '01') {
                    x.Value = x.Value ? x.Value : 'N'
                    if (x.Value == null || x.Value == 'N') x.Value = 'No'
                    if (x.Options != null) this.showUWQUestion(x.Options.find(ele => ele.UwQuesOptionDesc == x.Value), x.Options, 'direct');
                  }
                });
              }
              this.questionSection = true; console.log("Final UW List", this.uwQuestionList);
            }
          }
        }
        else {
          let k = 0;
          for (let obj of this.uwQuestionList) {
            let i = 0
            for (let ques of obj.UWQuestionsList) {
              ques.Value = null;
              i += 1;
              if (i == obj.UWQuestionsList) { k += 1; if (k == this.uwQuestionList.length) { this.questionSection = true; console.log("Final UW List", this.uwQuestionList); } }
            }
          }
        }
      },
      (err) => { },
    );
  }
  showUWQUestion(rowData, optionList, type) {
    if (optionList.length != 0 && rowData != undefined) {
      for (let option of optionList) {
        if (option.DependentYn != null && option.DependentYn == 'Y') {
          if (option.DependentUnderwriterId == rowData.DependentUnderwriterId) {
            let ques = this.uwQuestionList.find(ele => ele.UwQuestionId == option.DependentUnderwriterId)
            ques['HiddenYN'] = 'N';
            if (type == 'change') ques['Value'] = null;
          }
          else {
            let ques = this.uwQuestionList.find(ele => ele.UwQuestionId == option.DependentUnderwriterId)
            ques['HiddenYN'] = 'Y';
          }
        }
      }
    }
  }
  onSaveUWQuestions(uwList, buildDetails, index) {
    if (uwList.length != 0) {
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if (data.Result) {
            if (index == buildDetails.length) { }
          }
        },
        (err) => { },
      );
    }
  }
  onFinalProceed() {
    if (this.endorsementSection) this.router.navigate(['/quotation/plan/premium-info']);
    else {
      this.router.navigate(['/quotation/plan/premium-details']);
    }
  }
  onSaveFirstLossList(buildDetails, type) {
    let list = this.firstLossPayeeList.filter(ele => ele.FirstLossPayeeDesc != '' && ele.FirstLossPayeeDesc != null);
    if (list.length != 0) {
      let sectionId = null;
      if (this.productId == '6') sectionId = this.productItem.Section;
      else if (this.productId == '59') {
        let entry = this.locationList[this.tabIndex];
        if (entry.CoversRequired == 'B' || entry.CoversRequired == 'BC') sectionId = '1';
        else sectionId = '47';
      }
      else if (this.productId == '19') sectionId = "40";
      else sectionId = '99999'
      let mainObj = this.locationList[this.tabIndex], finalList = [], i = 0
      for (let obj of list) {
        let entry = {
          "RequestReferenceNo": this.requestReferenceNo,
          "FirstLossPayeeId": i + 1,
          "FirstLossPayeeDesc": obj.FirstLossPayeeDesc,
          "SectionId": sectionId,
          "ProductId": this.productId,
          "LocationId": String(this.tabIndex + 1),
          "LocationName": mainObj.LocationName,
          "CompanyId": this.insuranceId,
          "CreatedBy": this.loginId,
          "Status": "Y",
          "BranchCode": this.branchCode
        }
        finalList.push(entry);
        i += 1;
        if (i == list.length) this.onFinalLossSubmit(finalList, buildDetails, type)
      }
    }
    else this.onCalculate(buildDetails, type)
  }
  onFinalLossSubmit(finalList, buildDetails, type) {
    let urlLink = `${this.motorApiUrl}api/savefirstlosspayee`;
    this.sharedService.onPostMethodSync(urlLink, finalList).subscribe(
      (data: any) => {
        if (data.Result) { this.onCalculate(buildDetails, type) }
      });
  }
  InsertEnginnerInfo(type, packageType, res) {
    console.log("Locations", this.locationList)
    let obj = [];
    let payload;
    for (let i = 0; i < this.locationList.length; i++) {
      if (this.productId == '101') {
        obj = [
          {
            "ProductId": this.productId,
            "SectionId": "247",
            "AnnualOpen": this.locationList[i]?.CARAnnual,
            "PrincipalOwner": this.locationList[i]?.FGPrincipal,
            "Description": this.locationList[i]?.FGDescription,
            "LocationId": i + 1,
            "RequestReferenceNo": this.requestReferenceNo,
            "QuoteNo": this.quoteNo,
            "PeriodOfActivity": this.locationList[i]?.FGPeriodOfActivity == '' ? 0 : this.locationList[i]?.FGPeriodOfActivity,
            "PeriodType": this.locationList[i]?.FGPeriodType == '' ? 0 : this.locationList[i]?.FGPeriodType,
            "StartDate": this.datePipe.transform(this.parseDateIfNeeded(this.locationList[i]?.FGStartDate || new Date()), 'dd/MM/yyyy'),
            "YearOfManufacture": new Date(this.locationList[i]?.manufactureYear).getFullYear(),
            "Manufacture": this.locationList[i]?.manufacturer,
            "EngineNumber": this.locationList[i]?.EngineNumber,
            "SerialNumber": this.locationList[i]?.SerialNumber,
            "OwnershipTypeId": null,
            "OwnershipDesc": this.locationList[i]?.Ownership,
            "BasisOfValuationId": null,
            "BasisOfValuationDesc": this.locationList[i]?.BasisOfValuation,
            "ConstructionType": null,
            "LocationName": this.locationList[i]?.CARLocationName,
            "RegionCode": this.locationList[i]?.RegionCode,
            "DistrictCode": this.locationList[i]?.DistrictCode,
            "RegionName": this.locationList[i]?.RegionName,
            "DistrictName": this.locationList[i]?.DistrictName,
          },
          {
            "ProductId": this.productId,
            "SectionId": "248",
            "AnnualOpen": this.locationList[i]?.CARAnnual,
            "PrincipalOwner": this.locationList[i]?.CBPrincipal,
            "Description": this.locationList[i]?.CBDescription,
            "LocationId": i + 1,
            "RequestReferenceNo": this.requestReferenceNo,
            "QuoteNo": this.quoteNo,
            "PeriodOfActivity": 0,
            "StartDate": this.datePipe.transform(this.parseDateIfNeeded(this.locationList[i]?.CBStartDate || new Date()), 'dd/MM/yyyy'),
            "YearOfManufacture": new Date(this.locationList[i]?.manufactureYear).getFullYear(),
            "Manufacture": this.locationList[i]?.manufacturer,
            "EngineNumber": this.locationList[i]?.EngineNumber,
            "SerialNumber": this.locationList[i]?.SerialNumber,
            "OwnershipTypeId": null,
            "OwnershipDesc": this.locationList[i]?.Ownership,
            "BasisOfValuationId": null,
            "BasisOfValuationDesc": this.locationList[i]?.BasisOfValuation,
            "ConstructionType": null,
            "LocationName": this.locationList[i]?.CARLocationName,
            "RegionCode": this.locationList[i]?.RegionCode,
            "DistrictCode": this.locationList[i]?.DistrictCode,
            "RegionName": this.locationList[i]?.RegionName,
            "DistrictName": this.locationList[i]?.DistrictName,
          },
          {
            "ProductId": this.productId,
            "SectionId": "249",
            "AnnualOpen": this.locationList[i]?.CARAnnual,
            "PrincipalOwner": this.locationList[i]?.PGPrincipal,
            "Description": this.locationList[i]?.PGDescription,
            "LocationId": i + 1,
            "RequestReferenceNo": this.requestReferenceNo,
            "QuoteNo": this.quoteNo,
            "PeriodOfActivity": this.locationList[i]?.PGPeriodOfActivity == '' ? 0 : this.locationList[i]?.PGPeriodOfActivity,
            "PeriodType": this.locationList[i]?.PGPeriodType == '' ? 0 : this.locationList[i]?.PGPeriodType,
            "StartDate": this.datePipe.transform(this.parseDateIfNeeded(this.locationList[i]?.PGStartDate || new Date()), 'dd/MM/yyyy'),
            "YearOfManufacture": new Date(this.locationList[i]?.manufactureYear).getFullYear(),
            "Manufacture": this.locationList[i]?.manufacturer,
            "EngineNumber": this.locationList[i]?.EngineNumber,
            "SerialNumber": this.locationList[i]?.SerialNumber,
            "OwnershipTypeId": null,
            "OwnershipDesc": this.locationList[i]?.Ownership,
            "BasisOfValuationId": null,
            "BasisOfValuationDesc": this.locationList[i]?.BasisOfValuation,
            "ConstructionType": null,
            "LocationName": this.locationList[i]?.CARLocationName,
            "RegionCode": this.locationList[i]?.RegionCode,
            "DistrictCode": this.locationList[i]?.DistrictCode,
            "RegionName": this.locationList[i]?.RegionName,
            "DistrictName": this.locationList[i]?.DistrictName,
          },
          {
            "ProductId": this.productId,
            "SectionId": "250",
            "AnnualOpen": this.locationList[i]?.CARAnnual,
            "PrincipalOwner": this.locationList[i]?.CTPrincipal,
            "Description": this.locationList[i]?.CTDescription,
            "LocationId": i + 1,
            "RequestReferenceNo": this.requestReferenceNo,
            "QuoteNo": this.quoteNo,
            "PeriodOfActivity": this.locationList[i]?.CTPeriodOfActivity == '' ? 0 : this.locationList[i]?.CTPeriodOfActivity,
            "PeriodType": this.locationList[i]?.CTPeriodType == '' ? 0 : this.locationList[i]?.CTPeriodType,
            "StartDate": this.datePipe.transform(this.parseDateIfNeeded(this.locationList[i]?.CTStartDate || new Date()), 'dd/MM/yyyy'),
            "YearOfManufacture": new Date(this.locationList[i]?.manufactureYear).getFullYear(),
            "Manufacture": this.locationList[i]?.manufacturer,
            "EngineNumber": this.locationList[i]?.EngineNumber,
            "SerialNumber": this.locationList[i]?.SerialNumber,
            "OwnershipTypeId": null,
            "OwnershipDesc": this.locationList[i]?.Ownership,
            "BasisOfValuationId": null,
            "BasisOfValuationDesc": this.locationList[i]?.BasisOfValuation,
            "ConstructionType": null,
            "LocationName": this.locationList[i]?.CARLocationName,
            "RegionCode": this.locationList[i]?.RegionCode,
            "DistrictCode": this.locationList[i]?.DistrictCode,
            "RegionName": this.locationList[i]?.RegionName,
            "DistrictName": this.locationList[i]?.DistrictName,
          },
          {
            "ProductId": this.productId,
            "SectionId": "251",
            "AnnualOpen": this.locationList[i]?.CARAnnual,
            "PrincipalOwner": this.locationList[i]?.BTPrincipal,
            "Description": this.locationList[i]?.BTDescription,
            "LocationId": i + 1,
            "RequestReferenceNo": this.requestReferenceNo,
            "QuoteNo": this.quoteNo,
            "PeriodOfActivity": this.locationList[i]?.BTPeriodOfActivity == '' ? 0 : this.locationList[i]?.BTPeriodOfActivity,
            "PeriodType": this.locationList[i]?.BTPeriodType == '' ? 0 : this.locationList[i]?.BTPeriodType,
            "StartDate": this.datePipe.transform(this.parseDateIfNeeded(this.locationList[i]?.BTStartDate || new Date()), 'dd/MM/yyyy'),
            "YearOfManufacture": new Date(this.locationList[i]?.manufactureYear).getFullYear(),
            "Manufacture": this.locationList[i]?.manufacturer,
            "EngineNumber": this.locationList[i]?.EngineNumber,
            "SerialNumber": this.locationList[i]?.SerialNumber,
            "OwnershipTypeId": null,
            "OwnershipDesc": this.locationList[i]?.Ownership,
            "BasisOfValuationId": null,
            "BasisOfValuationDesc": this.locationList[i]?.BasisOfValuation,
            "ConstructionType": null,
            "LocationName": this.locationList[i]?.CARLocationName,
            "RegionCode": this.locationList[i]?.RegionCode,
            "DistrictCode": this.locationList[i]?.DistrictCode,
            "RegionName": this.locationList[i]?.RegionName,
            "DistrictName": this.locationList[i]?.DistrictName,
          },
        ]
      }
      else if (this.productId == '85') {
        let entry;
        if (this.locationList[i]?.PALPPBasisOfValuation) {
          entry = {
            "ProductId": this.productId,
            "SectionId": "80",
            "AnnualOpen": this.locationList[i]?.PALPPmanufacturer,
            "PrincipalOwner": this.locationList[i]?.FGPrincipal,
            "Description": this.locationList[i]?.PALPPDescription,
            "LocationId": i + 1,
            "RequestReferenceNo": this.requestReferenceNo,
            "QuoteNo": this.quoteNo,
            "PeriodOfActivity": this.locationList[i]?.FGPeriodOfActivity == '' ? 0 : this.locationList[i]?.FGPeriodOfActivity,
            "PeriodType": this.locationList[i]?.FGPeriodType == '' ? 0 : this.locationList[i]?.FGPeriodType,
            "StartDate": this.datePipe.transform(this.parseDateIfNeeded(this.locationList[i]?.FGStartDate || new Date()), 'dd/MM/yyyy'),
            "YearOfManufacture": new Date(this.locationList[i]?.PALPPmanufactureYear).getFullYear(),
            "Manufacture": this.locationList[i]?.manufacturer,
            "EngineNumber": this.locationList[i]?.PALPPEngineNumber,
            "SerialNumber": this.locationList[i]?.PALPPSerialNumber,
            "OwnershipTypeId": null,
            "OwnershipDesc": this.locationList[i]?.PALPPOwnership,
            "BasisOfValuationId": null,
            "BasisOfValuationDesc": this.locationList[i]?.PALPPBasisOfValuation,
            "ConstructionType": null,
            "LocationName": this.locationList[i]?.PALPPLocationName,
            "RegionCode": this.locationList[i]?.RegionCode,
            "DistrictCode": this.locationList[i]?.DistrictCode,
            "RegionName": this.locationList[i]?.RegionName,
            "DistrictName": this.locationList[i]?.DistrictName,
          }
          obj.push(entry);
        }
        if (this.locationList[i]?.CARAnnual) {
          entry = {
            "ProductId": this.productId,
            "SectionId": "229",
            "AnnualOpen": this.locationList[i]?.CARAnnual,
            "PrincipalOwner": this.locationList[i]?.CARPrincipal,
            "Description": this.locationList[i]?.CARDescription,
            "LocationId": i + 1,
            "RequestReferenceNo": this.requestReferenceNo,
            "QuoteNo": this.quoteNo,
            "PeriodOfActivity": this.locationList[i]?.CARPeriodOfActivity == '' ? 0 : this.locationList[i]?.CARPeriodOfActivity,
            "StartDate": this.datePipe.transform(this.parseDateIfNeeded(this.locationList[i]?.CARStartDate || new Date()), 'dd/MM/yyyy'),
            "YearOfManufacture": new Date(this.locationList[i]?.manufactureYear).getFullYear(),
            "Manufacture": this.locationList[i]?.manufacturer,
            "EngineNumber": this.locationList[i]?.EngineNumber,
            "SerialNumber": this.locationList[i]?.SerialNumber,
            "OwnershipTypeId": null,
            "OwnershipDesc": this.locationList[i]?.Ownership,
            "BasisOfValuationId": null,
            "BasisOfValuationDesc": this.locationList[i]?.BasisOfValuation,
            "ConstructionType": null,
            "LocationName": this.locationList[i]?.CARLocationName,
            "RegionCode": this.locationList[i]?.RegionCode,
            "DistrictCode": this.locationList[i]?.DistrictCode,
            "RegionName": this.locationList[i]?.RegionName,
            "DistrictName": this.locationList[i]?.DistrictName,
          }
          obj.push(entry);
        }
        if (this.locationList[i]?.EARAnnual) {
          entry = {
            "ProductId": this.productId,
            "SectionId": "233",
            "AnnualOpen": this.locationList[i]?.EARAnnual,
            "PrincipalOwner": this.locationList[i]?.EARPrincipal,
            "Description": this.locationList[i]?.EARDescription,
            "LocationId": i + 1,
            "RequestReferenceNo": this.requestReferenceNo,
            "QuoteNo": this.quoteNo,
            "PeriodOfActivity": this.locationList[i]?.EARPeriodOfActivity == '' ? 0 : this.locationList[i]?.EARPeriodOfActivity,
            "StartDate": this.datePipe.transform(this.parseDateIfNeeded(this.locationList[i]?.EARStartDate || new Date()), 'dd/MM/yyyy'),
            "YearOfManufacture": new Date(this.locationList[i]?.manufactureYear).getFullYear(),
            "Manufacture": this.locationList[i]?.manufacturer,
            "EngineNumber": this.locationList[i]?.EngineNumber,
            "SerialNumber": this.locationList[i]?.SerialNumber,
            "OwnershipTypeId": null,
            "OwnershipDesc": this.locationList[i]?.Ownership,
            "BasisOfValuationId": null,
            "BasisOfValuationDesc": this.locationList[i]?.BasisOfValuation,
            "ConstructionType": null,
            "LocationName": this.locationList[i]?.EARLocationName,
            "RegionCode": this.locationList[i]?.RegionCode,
            "DistrictCode": this.locationList[i]?.DistrictCode,
            "RegionName": this.locationList[i]?.RegionName,
            "DistrictName": this.locationList[i]?.DistrictName,
          }
          obj.push(entry);
        }
      }
      else {
        let sectionId = null, desc = this.locationList[i]?.CARDescription, principal = this.locationList[i]?.CARPrincipal, startDate = this.locationList[i]?.CARStartDate,
          PeriodOfActivity = this.locationList[i]?.CARPeriodOfActivity, locName = this.locationList[i]?.CARLocationName, periodType = null;
        if (this.productId == '84') { sectionId = '233' }
        else if (this.productId == '82' || this.productId == '83') { sectionId = '232'; }
        else if (this.productId == '79' || this.productId == '85') { sectionId = '229' }
        else if (this.productId == '96') {
          sectionId = '251', desc = this.locationList[i]?.BTDescription, principal = this.locationList[i]?.BTPrincipal, startDate = this.locationList[i]?.BTStartDate,
            PeriodOfActivity = this.locationList[i]?.BTPeriodOfActivity, locName = this.locationList[i]?.BTLocationName, periodType = this.locationList[i]?.BTPeriodType
        }
        else if (this.productId == '97') { sectionId = '250' }
        else if (this.productId == '98') { sectionId = '249' }
        else if (this.productId == '99') { sectionId = '248' }
        else if (this.productId == '100') { sectionId = '247' }
        payload = {
          "ProductId": this.productId,
          "SectionId": sectionId,
          "AnnualOpen": this.locationList[i]?.CARAnnual,
          "PrincipalOwner": principal,
          "Description": desc,
          "LocationId": i + 1,
          "RequestReferenceNo": this.requestReferenceNo,
          "QuoteNo": this.quoteNo,
          "PeriodOfActivity": PeriodOfActivity == '' ? 0 : PeriodOfActivity,
          "StartDate": this.datePipe.transform(this.parseDateIfNeeded(startDate || new Date()), 'dd/MM/yyyy'),
          "YearOfManufacture": new Date(this.locationList[i]?.manufactureYear).getFullYear(),
          "Manufacture": this.locationList[i]?.manufacturer,
          "EngineNumber": this.locationList[i]?.EngineNumber,
          "SerialNumber": this.locationList[i]?.SerialNumber,
          "OwnershipTypeId": null,
          "OwnershipDesc": this.locationList[i]?.Ownership,
          "BasisOfValuationId": null,
          "BasisOfValuationDesc": this.locationList[i]?.BasisOfValuation,
          "ConstructionType": null,
          "LocationName": locName,
          "RegionCode": this.locationList[i]?.RegionCode,
          "DistrictCode": this.locationList[i]?.DistrictCode,
          "RegionName": this.locationList[i]?.RegionName,
          "DistrictName": this.locationList[i]?.DistrictName,
          "PeriodType": periodType
        }
        obj.push(payload)
      }
    }
    let urlLink = `${this.motorApiUrl}api/InsertEngineerInfo`;
    this.sharedService.onPostMethodSync(urlLink, obj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          if (type == 'Submit') this.onCalculate(res, type)
          else if (type == 'Next' && (this.tabIndex + 1) != this.locationList.length) {
               this.renderType = 'Direct'; this.locationDetails = this.locationList;this.tabIndex+=1;
               let urlGetLink = `${this.motorApiUrl}api/getEngineerInfo?RequestReferenceno=${this.requestReferenceNo}`;
                  let ReqGetObj = {
                    "RequestReferenceNo": this.requestReferenceNo
                  }
                  this.sharedService.onPostMethodSync(urlGetLink, ReqGetObj).subscribe(
                    (engineerdata: any) => {
                      this.engineerData = engineerdata.Result;
                     this.renderType = 'change'; this.onEditfirePhoneix()
                    });
          }
          else if (type == 'packageData') {
            this.renderType = 'change'; this.tabIndex += 1; this.onEditfirePhoneix()
          }
        }
      })
  }
  //Proceed from Child 
  onProceed(res) {
    if (res) {
      let list = res?.locationList, i = 0;
      this.locationList = list;
      console.log("Location List from Child2", list)
      let packageType: any = null;
      if (res?.currentCommercial) packageType = res?.currentCommercial
      if (res?.currentPersonalPackage) packageType = res?.currentPersonalPackage
      if (res?.currentNichePackage) packageType = res?.currentNichePackage
      if (res?.type == 'Previous') {this.renderType='change'; this.onPreviousTab() }
      else this.onSubmitAltDetails(res?.type, packageType)
      console.log("Location List from Child", list)
      // for (let loc of list) {
      //   if (loc.BuildingAddress == undefined && loc['Address'] != '' && loc['Address'] != 'undefined') { loc['BuildingAddress'] = loc['Address'] }
      //   if (loc.SectionList == undefined) loc['SectionList'] = [];
      //   i += 1;
      //   if (i == list.length) {
          
      //   }
      // }
    }
  }
  parseDateIfNeeded(date: any): Date {
    if (typeof date === 'string' && date.includes('/')) {
      const [day, month, year] = date.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date(date);
  }
} 
