import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { EngineeringAllRiskTanzaniya } from '../../../models/Tanzaniya/EngineeringAllRisk/engineeringAllRisk';
import { EngineeringAllRiskApiTanzaniya } from '../../../models/Tanzaniya/EngineeringAllRisk/engineeringAllRiskApi';
@Component({
  selector: 'erection-all-risk',
  templateUrl: './erection-all-risk.component.html',
  styleUrl: './erection-all-risk.component.scss'
})
export class ErectionAllRiskComponent {
  userType: any = null;
  productId: any = null;
  form2 = new FormGroup({});constructionTypes:any[]=[];
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];fieldsEARPrimary:any[]=[];
  @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;fieldsEAR:any[]=[];
  @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  public AppConfig: any = (Mydatas as any).default;fieldsEARExtensions:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  constructor(private sharedService: SharedService){
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || null);
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
     let fireData = null;
    fireData = new EngineeringAllRiskTanzaniya();
    // this.addControlsToForm(fireData.additionalEARfields.fieldGroup);
    this.fieldsEAR = this.groupFields(fireData.EARfields.fieldGroup);
    this.fieldsEARPrimary = fireData.constructionEARfields.fieldGroup;
    // this.fieldsEARAdditional = this.groupFields(fireData.additionalEARfields.fieldGroup);
    this.fieldsEARExtensions = this.groupFields(fireData.extendsEARfields.fieldGroup);
    this.getConstructionTypeList();
  }
  ngOnInit() {
    if (this.locationList.length != 0) {
      this.onEditData();
    }
  }
  onEditData() {
    console.log("Locations On Edit", this.locationList,this.engineerData);
    let i = 0;
    for (let obj of this.locationList) {
        let subDetails = null;
        if(obj.SectionList){
          subDetails=obj.SectionList;
          let engineeringAllRiskApi = null;
          if (this.insuranceId == '100002') engineeringAllRiskApi = new EngineeringAllRiskApiTanzaniya();
          obj = engineeringAllRiskApi.getEditDetails(subDetails, obj, this.engineerData);
        }
        if(this.tabIndex==i && subDetails){
            if(obj?.CARAnnual)  this.productItem['CARAnnual'] = obj['CARAnnual'];
            if(obj?.CARPrincipal) this.productItem['CARPrincipal'] = obj['CARPrincipal'];
            if(obj?.CARDescription) this.productItem['CARDescription'] = obj['CARDescription'];
            if(obj?.CARLocationName) this.productItem['CARLocationName'] = obj['CARLocationName'];
            if(obj?.CARStartDate) this.productItem['CARStartDate'] = obj['CARStartDate'];
            if(obj?.CARPeriodOfActivity) this.productItem['CARPeriodOfActivity'] = obj['CARPeriodOfActivity'];
            if(obj?.ConstructionType) this.productItem['ConstructionType'] = obj['ConstructionType'];
            if(obj?.BuildingSumInsureds) this.productItem['BuildingSumInsureds'] = obj['BuildingSumInsureds'];
            if(obj?.EARMaintenance) this.productItem['EARMaintenance'] = obj['EARMaintenance'];
        }
        i+=1;
    }
  }
  getConstructionTypeList() {
    let type = "wall_type";
    if (this.productId == '84') { type = "ERECTION ALL RISKS" }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": type
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.constructionTypes = defaultObj.concat(data.Result);
        if (this.productId == '76' || this.productId == '78' || this.productId == '66' || this.productId == '67' || this.productId == '79' || this.productId == '84' || this.productId == '82' || this.productId == '83' || this.productId == '93' || this.productId == '85' || this.productId == '92') {
          let i = 0
          for (let entry of this.constructionTypes) {
            entry['label'] = entry.CodeDesc; entry['value'] = entry.Code;
            i += 1;
            if (i == this.constructionTypes.length) {
              let fieldList = [], fieldList4 = [];
               fieldList = this.fieldsEARPrimary[0].fieldGroup;
              if (this.constructionTypes?.length > 0 && fieldList && this.productId != '93') {
                for (let field of fieldList) {
                  if (field.key == 'CategoryId') {
                    field.templateOptions.options = [...this.constructionTypes];
                  } else if (field.key == 'ConstructionType' || field.key == 'ConstructionTypeBC' || field.key == 'EARConstructionType' || field.key == 'ContentsType') { field.props.options = this.constructionTypes; }
                }
                //this.cdr.detectChanges();  
              }
            }
          }
        }
      });
  }
  private groupFields(fields: any[]): any[] {
    const grouped: any[] = [];
    const visibleFields = fields.filter(field => !field.hide);
    const newLineFields = ['IndemnityPeriod']; // Fields that must always start a new line
    let tempGroup: any[] = [];
    for (let i = 0; i < visibleFields.length; i++) {
      const field = visibleFields[i];
      if (newLineFields.includes(field.key)) {
        // Push any existing group before adding new-line field
        if (tempGroup.length > 0) {
          grouped.push(tempGroup);
          tempGroup = [];
        }
        grouped.push([field]); // Push IndemnityPeriod alone
      } else {
        // Pair fields together
        if (tempGroup.length === 0 || tempGroup.length === 1) {
          tempGroup.push(field);
        }
        if (tempGroup.length === 2) {
          grouped.push(tempGroup);
          tempGroup = [];
        }
      }
    }
    // Push remaining group if not empty
    if (tempGroup.length > 0) {
      grouped.push(tempGroup);
    }
    console.log(grouped);
    return grouped;
  }
  onProceedData(type){
    console.log("Locations", this.locationList)
    let locationList = [];
    let j = 0;
    for (let entry of this.locationList) {
      let i = 0;
      if (entry.BuildingOwnerYn == null) entry.BuildingOwnerYn = 'Y';
      if (entry.CoversRequired == null) entry.CoversRequired = 'BC';
      let obj = {
        "LocationId": j + 1,
        "LocationName": entry.LocationName,
        "CoversRequired": entry.CoversRequired,
        "BuildingOwnerYn": entry.BuildingOwnerYn,
        "Address": entry.BuildingAddress,
        "SectionList": []
      }
      if (j == this.tabIndex) {
        obj['CARAnnual']=entry['CARAnnual'] = this.productItem['CARAnnual'];
        obj['CARPrincipal']=entry['CARPrincipal'] = this.productItem['CARPrincipal'];
        obj['CARDescription']=entry['CARDescription'] = this.productItem['CARDescription'];
        obj['CARLocationName']=entry['CARLocationName'] = this.productItem['CARLocationName'];
        obj['CARStartDate']=entry['CARStartDate'] = this.productItem['CARStartDate'];
        obj['CARPeriodOfActivity']=entry['CARPeriodOfActivity'] = this.productItem['CARPeriodOfActivity'];
        obj['ConstructionType']=entry['ConstructionType'] = this.productItem['ConstructionType'];
        obj['BuildingSumInsureds']=entry['BuildingSumInsureds'] = this.productItem['BuildingSumInsureds'];
        obj['EARMaintenance']=entry['EARMaintenance'] = this.productItem['EARMaintenance'];
        let erectionApi = new EngineeringAllRiskApiTanzaniya();
        let erectionList = erectionApi.getSaveDetails(entry, entry.IndustryId, this.industryTypeList, obj);
        if (erectionList.SectionList.length !== 0) { obj = erectionList; console.log(obj); }
      }
       else if(entry?.SectionList){
        obj['SectionList']=entry?.SectionList;
        if(entry['CARAnnual']) obj['CARAnnual']=entry['CARAnnual'];
        if(entry['CARPrincipal']) obj['CARPrincipal']=entry['CARPrincipal'];
        if(entry['CARDescription']) obj['CARDescription']=entry['CARDescription'];
        if(entry['CARLocationName']) obj['CARLocationName']=entry['CARLocationName'];
        if(entry['CARStartDate']) obj['CARStartDate']=entry['CARStartDate'];
        if(entry['CARPeriodOfActivity']) obj['CARPeriodOfActivity']=entry['CARPeriodOfActivity'];
      }
       locationList.push(JSON.parse(JSON.stringify(obj)));j += 1;
       if (j == this.locationList.length) {this.finalRedirect(locationList,type)}
    }
  }
  finalRedirect(locationList,type){
      console.log("Received Obj",locationList)
        let res = {
          "locationList": locationList,
          "type": type
        }
        console.log("Final Object", res)
        this.finalProceed.emit(res)
    }
    previous() {
      let res = {
          "locationList": this.locationList,
          "type": 'Previous'
        }
      this.previousSection.emit(res);
    }
}
