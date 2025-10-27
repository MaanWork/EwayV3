import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import { StatedBenefitsApiBotswana } from '../../../models/phoneix/PhoenixBotswana/StatedBenefits/StatedBenefitsApi';
import { StatedBenefitsApiMozambique } from '../../../models/phoneix/PhoenixMozambique/StatedBenefits/StatedBenefitsApi';
import { StatedBenefitsApiNamibia } from '../../../models/phoneix/PhoenixNamibia/StatedBenefits/StatedBenefitsApi';
import { StatedBenefitsApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/StatedBenefits/StatedBenefitsApi';
import { StatedBenefitsApi } from '../../../models/phoneix/PhoenixZambia/StatedBenefits/StatedBenefitsApi';
import * as Mydatas from '../../../../../../../app-config.json';
import { StateBenefitsBotswana } from '../../../models/phoneix/PhoenixBotswana/StatedBenefits/StateBenefits';
import { StateBenefitsNamibia } from '../../../models/phoneix/PhoenixNamibia/StatedBenefits/StateBenefits';
import { StateBenefitsMozambique } from '../../../models/phoneix/PhoenixMozambique/StatedBenefits/StateBenefits';
import { StateBenefitsSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/StatedBenefits/StateBenefits';
import { StateBenefitsPhoenix } from '../../../models/phoneix/PhoenixZambia/StatedBenefits/StateBenefits';
import { StateBenefitsCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/StatedBenefits/StateBenefits';
import { StatedBenefitsCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/StatedBenefits/StatedBenefitsApi';

@Component({
  selector: 'app-state-benefits',
  standalone: false,
  templateUrl: './state-benefits.component.html',
  styleUrls: ['./state-benefits.component.scss']
})
export class StateBenefitsComponent {
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];@Output() saveSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();@Output() skipSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  fieldStateBenefits: any[] = [];
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  glassClaimCost: any[] = [];
  productId: any;
  userType: any;
  fireLeakage: any[] = [];
  constructor(private sharedService: SharedService) {
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
    let stateList: any;
    if (this.productId == '92') {
      stateList = new StateBenefitsCommercialNamibia();
      this.fieldStateBenefits = stateList?.policyfields1.fieldGroup;
      console.log('fieldStateBenefits',this.fieldStateBenefits);
      
    }
    else {
      if (this.insuranceId == "100046") stateList = new StateBenefitsPhoenix();
      else if (this.insuranceId == '100047') stateList = new StateBenefitsBotswana();
      else if (this.insuranceId == '100048') stateList = new StateBenefitsMozambique();
      else if (this.insuranceId == '100049') stateList = new StateBenefitsSwaziland();
      else if (this.insuranceId == '100050') stateList = new StateBenefitsNamibia();
      this.fieldStateBenefits = stateList?.policyfields1.fieldGroup;
    }
    console.log('stateList', this.fieldStateBenefits[0]);
    this.getLeakageFire();
  }

  ngOnInit() {
    if (this.locationList.length != 0) {
      this.onEditData();
    }
  }

  onEditData() {
    console.log("Locations On Edit", this.locationList);
    if (this.renderType == 'Direct') {
      let i = 0;
      for (let obj of this.locationList) {
        if (this.locationDetails[i]) {
          let stateList: any, subDetails = this.locationDetails[i].SectionList;
          if (this.productId == '92') {
            stateList = new StatedBenefitsCommercialApiNamibia();
          }
          else {
            if (this.insuranceId == "100046") stateList = new StatedBenefitsApi();
            else if (this.insuranceId == '100047') stateList = new StatedBenefitsApiBotswana();
            else if (this.insuranceId == '100048') stateList = new StatedBenefitsApiMozambique();
            else if (this.insuranceId == '100049') stateList = new StatedBenefitsApiSwaziland();
            else if (this.insuranceId == '100050') stateList = new StatedBenefitsApiNamibia();
          }
          obj = stateList.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.MedicalExpenses = obj['MedicalExpenses'];
            this.productItem.Death = obj['Death'];
            this.productItem.TemporaryTotalDisability = obj['TemporaryTotalDisability'];
            this.productItem.PermanentTotalDisability = obj['PermanentTotalDisability'];

            this.productItem.MedicalExpensesSB = obj['MedicalExpensesSB'];
            this.productItem.DeathSB = obj['DeathSB'];
            this.productItem.TemporaryTotalDisabilitySB = obj['TemporaryTotalDisabilitySB'];
            this.productItem.PermanentTotalDisabilitySB = obj['PermanentTotalDisabilitySB'];

            this.productItem.IndustryId = obj['IndustryType'];
          }
          i += 1;
        }
      }
      if (this.locationDetails.length != 0) {
      }
    }
    else {
      let i = 0;
      for (let loc of this.locationList) {
        if (loc && this.tabIndex == i) {
          console.log("On Next Loc", loc)
          if (loc['MedicalExpenses'] != undefined && loc['Death'] != undefined && loc['TemporaryTotalDisability'] != undefined && loc['PermanentTotalDisability'] != undefined && loc['IndustryType'] != undefined) {
            this.productItem.MedicalExpenses = loc['MedicalExpenses'];
            this.productItem.Death = loc['Death'];
            this.productItem.TemporaryTotalDisability = loc['TemporaryTotalDisability'];
            this.productItem.PermanentTotalDisability = loc['PermanentTotalDisability'];

            this.productItem.MedicalExpensesSB = loc['MedicalExpensesSB'];
            this.productItem.DeathSB = loc['DeathSB'];
            this.productItem.TemporaryTotalDisabilitySB = loc['TemporaryTotalDisabilitySB'];
            this.productItem.PermanentTotalDisabilitySB = loc['PermanentTotalDisabilitySB'];

            this.productItem.IndustryId = loc['IndustryType']
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let stateList: any, subDetails = this.locationDetails[i].SectionList;
              if (this.productId == '92') {
                stateList = new StatedBenefitsCommercialApiNamibia();
              }
              else {
                if (this.insuranceId == "100046") stateList = new StatedBenefitsApi();
                else if (this.insuranceId == '100047') stateList = new StatedBenefitsApiBotswana();
                else if (this.insuranceId == '100048') stateList = new StatedBenefitsApiMozambique();
                else if (this.insuranceId == '100049') stateList = new StatedBenefitsApiSwaziland();
                else if (this.insuranceId == '100050') stateList = new StatedBenefitsApiNamibia();
              }
              loc = stateList.getEditDetails(subDetails, loc);
              if ((loc['MedicalExpenses'] != undefined && loc['Death'] != undefined) || (loc['MedicalExpensesSB'] != undefined) && loc['IndustryType'] != undefined) {
                this.productItem.MedicalExpenses = loc['MedicalExpenses'];
                this.productItem.Death = loc['Death'];
                this.productItem.TemporaryTotalDisability = loc['TemporaryTotalDisability'];
                this.productItem.PermanentTotalDisability = loc['PermanentTotalDisability'];

                this.productItem.MedicalExpensesSB = loc['MedicalExpensesSB'];
                this.productItem.DeathSB = loc['DeathSB'];
                this.productItem.TemporaryTotalDisabilitySB = loc['TemporaryTotalDisabilitySB'];
                this.productItem.PermanentTotalDisabilitySB = loc['PermanentTotalDisabilitySB'];

                this.productItem.IndustryId = loc['IndustryType'];


              }
            }
          }
        }
        i += 1;
      }
    }
    console.log("Final Location", this.locationList)
  }

  getLeakageFire() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "LEAKAGE_TYPE"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.fireLeakage = defaultObj.concat(data.Result);
        for (let i = 0; i < this.fireLeakage.length; i++) {
          this.fireLeakage[i].label = this.fireLeakage[i]['CodeDesc'];
          this.fireLeakage[i].value = this.fireLeakage[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.fireLeakage.length - 1) {
            if (this.productId == '74' || this.productId == '92') {
              let fieldLeakage = this.fieldStateBenefits;
              console.log("Final Fields", fieldLeakage)
              if (fieldLeakage) {
                for (let field of fieldLeakage) { if (field.key == 'TemporaryTotalDisability' || field.key == 'TemporaryTotalDisabilitySB') { field.props.options = this.fireLeakage; } }
              }
            }
            else {
              let fieldLeakage = this.fieldStateBenefits;
              for (let field of fieldLeakage) { if (field.key == 'TemporaryTotalDisability' || field.key == 'TemporaryTotalDisabilitySB') { field.props.options = this.fireLeakage; } }
            }
          }
        }
      })
  }

  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }

  onProceedData(type) {
    console.log("Locations", this.locationList)
    let i = 0;
    if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
    else { this.IndustryError = false; }
    let locationList = [];
    if (i == 0) {
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
          entry['MedicalExpenses'] = this.productItem.MedicalExpenses;
          entry['Death'] = this.productItem.Death;
          entry['TemporaryTotalDisability'] = this.productItem.TemporaryTotalDisability;
          entry['PermanentTotalDisability'] = this.productItem.PermanentTotalDisability;

          entry['MedicalExpensesSB'] = this.productItem.MedicalExpensesSB;
          entry['DeathSB'] = this.productItem.DeathSB;
          entry['TemporaryTotalDisabilitySB'] = this.productItem.TemporaryTotalDisabilitySB;
          entry['PermanentTotalDisabilitySB'] = this.productItem.PermanentTotalDisabilitySB;

          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let stateList: any;
        if (this.productId == '92') {
          stateList = new StatedBenefitsCommercialApiNamibia();
        }
        else {
          if (this.insuranceId == "100046") stateList = new StatedBenefitsApi();
          else if (this.insuranceId == '100047') stateList = new StatedBenefitsApiBotswana();
          else if (this.insuranceId == '100048') stateList = new StatedBenefitsApiMozambique();
          else if (this.insuranceId == '100049') stateList = new StatedBenefitsApiSwaziland();
          else if (this.insuranceId == '100050') stateList = new StatedBenefitsApiNamibia();
        }
        if (entry['IndustryType'] != undefined) {
          let stateApilist: any = stateList.getSaveDetails(entry, entry['IndustryType'], this.industryTypeList, obj)
          if (stateApilist) { 
              console.log("Final Obj",stateApilist)
              let list =[];
              if (this.productId == '92') {  if(entry.SectionList){list = entry.SectionList.filter(ele=>ele.SectionId!='225');}}
              if(stateApilist.SectionList) stateApilist.SectionList = stateApilist.SectionList.concat(list)
              obj= stateApilist;
            console.log("Final Obj After",obj);
          }
        }
        else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        // if (obj.SectionList.length != 0) {
        // }
        locationList.push(obj);
         j += 1;
          if (j == this.locationList.length) {
            let res = {
              "locationList": locationList,
              "type": type
            }
          if (type == 'packageData') {this.saveSection.emit(res);}
            else { this.finalProceed.emit(res) }
          }
      }
    }
  }
  skip() {
      this.skipSection.emit('Office contents');
  }
  previous() {
      this.previousSection.emit(true);
  }
}
