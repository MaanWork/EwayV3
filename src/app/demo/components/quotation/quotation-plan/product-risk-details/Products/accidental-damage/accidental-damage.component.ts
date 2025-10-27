import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { AccidentalDamagePhoenix } from '../../../models/AccidentalDamage';
import { AccidentalDamageBotswana } from '../../../models/phoneix/PhoenixBotswana/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageMozambique } from '../../../models/phoneix/PhoenixMozambique/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageNamibia } from '../../../models/phoneix/PhoenixNamibia/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageApiPhoenix } from '../../../models/phoneix/PhoenixZambia/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageMozambiqueApi } from '../../../models/phoneix/PhoenixMozambique/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageSwazilandApi } from '../../../models/phoneix/PhoenixSwazilnd/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageNamibiaApi } from '../../../models/phoneix/PhoenixNamibia/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageBotswanaApi } from '../../../models/phoneix/PhoenixBotswana/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageCommercialNamibiaApi } from '../../../models/namibia/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageCommercialBotswanaApi } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageCommercialMozambiqueApi } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageCommercialSwazilandApi } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageCommercialPhoenixApi } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
@Component({
  selector: 'app-accidental-damage',
  standalone: false,
  templateUrl: './accidental-damage.component.html',
  styleUrls: ['./accidental-damage.component.scss']
})
export class AccidentalDamageComponent implements OnInit {
  userType: any = null;
  productId: any = null;
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Input() IsPackage: boolean;@Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  fieldAccidental: any[] = [];
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  accidentalClaimCost: any[] = [];
  constructor(private sharedService: SharedService) {
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
    let contentData = null;
    if (this.productId == '92') {
      let contentData = null;
      if (this.insuranceId == "100046") contentData = new AccidentalDamageCommercialPhoenix();
      else if (this.insuranceId == '100047') contentData = new AccidentalDamageCommercialBotswana();
      else if (this.insuranceId == '100048') contentData = new AccidentalDamageCommercialMozambique();
      else if (this.insuranceId == '100049') contentData = new AccidentalDamageCommercialSwaziland();
      else if (this.insuranceId == '100050') contentData = new AccidentalDamageCommercialNamibia();
      this.fieldAccidental[0] = contentData.fields;
    } else {
      if (this.insuranceId == '100046') contentData = new AccidentalDamagePhoenix();
      else if (this.insuranceId == '100047') contentData = new AccidentalDamageBotswana();
      else if (this.insuranceId == '100048') contentData = new AccidentalDamageMozambique();
      else if (this.insuranceId == '100049') contentData = new AccidentalDamageSwaziland();
      else if (this.insuranceId == '100050') contentData = new AccidentalDamageNamibia();
      this.fieldAccidental[0] = contentData?.fields;
    };
    this.getClaimPreparationList();;
  };
  ;
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
          let accidentalApi = null, subDetails = this.locationDetails[i]?.SectionList;
          if (this.productId == '92') {
            if (this.insuranceId == "100046") accidentalApi = new AccidentalDamageApiPhoenix();
            else if (this.insuranceId == '100047') accidentalApi = new AccidentalDamageBotswana();
            else if (this.insuranceId == '100048') accidentalApi = new AccidentalDamageMozambiqueApi();
            else if (this.insuranceId == '100049') accidentalApi = new AccidentalDamageSwazilandApi();
            else if (this.insuranceId == '100050') accidentalApi = new AccidentalDamageNamibiaApi();
          }
          else {
            if (this.insuranceId == '100046') accidentalApi = new AccidentalDamageApiPhoenix();
            else if (this.insuranceId == '100047') accidentalApi = new AccidentalDamageBotswanaApi();
            else if (this.insuranceId == '100048') accidentalApi = new AccidentalDamageMozambiqueApi();
            else if (this.insuranceId == '100049') accidentalApi = new AccidentalDamageSwazilandApi();
            else if (this.insuranceId == '100050') accidentalApi = new AccidentalDamageNamibiaApi();
          }
          obj = accidentalApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.AccidentalPhysicalLossDamage = obj['AccidentalPhysicalLossDamage'];
            this.productItem.Accidentaloilandchemical = obj['Accidentaloilandchemical'];
            this.productItem.MaximumLimitperOccurrence = obj['MaximumLimitperOccurrence'];
            this.productItem.AccidentalAdditionalclaimsPreparationCosts = obj['AccidentalAdditionalclaimsPreparationCosts'];
            this.productItem.AccidentalPhysicalLossDamageDesc = obj['AccidentalPhysicalLossDamageDesc'];
            this.productItem.AccidentaloilandchemicalDesc = obj['AccidentaloilandchemicalDesc'];
            this.productItem.MaximumLimitperOccurrenceDesc = obj['MaximumLimitperOccurrenceDesc'];
            this.productItem.IndustryId = obj['IndustryType']
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
          if (loc['IndustryType'] != undefined) {
            this.productItem.AccidentalPhysicalLossDamage = loc['AccidentalPhysicalLossDamage'];
            this.productItem.Accidentaloilandchemical = loc['Accidentaloilandchemical'];
            this.productItem.MaximumLimitperOccurrence = loc['MaximumLimitperOccurrence'];
            this.productItem.AccidentalPhysicalLossDamageDesc = loc['AccidentalPhysicalLossDamageDesc'];
            this.productItem.AccidentaloilandchemicalDesc = loc['AccidentaloilandchemicalDesc'];
            this.productItem.MaximumLimitperOccurrenceDesc = loc['MaximumLimitperOccurrenceDesc'];
            this.productItem.AccidentalAdditionalclaimsPreparationCosts = loc['AccidentalAdditionalclaimsPreparationCosts'];
            this.productItem.IndustryId = loc['IndustryType']
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let accidentalApi = null, subDetails = this.locationDetails[i]?.SectionList;
              if (this.productId == '92') {
                if (this.insuranceId == '100046') accidentalApi = new AccidentalDamageCommercialPhoenixApi();
                if (this.insuranceId == '100047') accidentalApi = new AccidentalDamageCommercialBotswanaApi();
                if (this.insuranceId == '100048') accidentalApi = new AccidentalDamageCommercialMozambiqueApi();
                if (this.insuranceId == '100049') accidentalApi = new AccidentalDamageCommercialSwazilandApi();
                if (this.insuranceId == '100050') accidentalApi = new AccidentalDamageCommercialNamibiaApi()
              }
              else {
                if (this.insuranceId == '100046') accidentalApi = new AccidentalDamageApiPhoenix();
                else if (this.insuranceId == '100047') accidentalApi = new AccidentalDamageBotswanaApi();
                else if (this.insuranceId == '100048') accidentalApi = new AccidentalDamageMozambiqueApi();
                else if (this.insuranceId == '100049') accidentalApi = new AccidentalDamageSwazilandApi();
                else if (this.insuranceId == '100050') accidentalApi = new AccidentalDamageNamibiaApi();
              }
              loc = accidentalApi.getEditDetails(subDetails, loc);
              if (loc['AccidentalAdditionalclaimsPreparationCosts'] != undefined && loc['Accidentaloilandchemical'] != undefined && loc['IndustryType'] != undefined) {
                this.productItem.AccidentalPhysicalLossDamage = loc['AccidentalPhysicalLossDamage'];
                this.productItem.Accidentaloilandchemical = loc['Accidentaloilandchemical'];
                this.productItem.MaximumLimitperOccurrence = loc['MaximumLimitperOccurrence'];
                this.productItem.AccidentalPhysicalLossDamageDesc = loc['AccidentalPhysicalLossDamageDesc'];
                this.productItem.AccidentaloilandchemicalDesc = loc['AccidentaloilandchemicalDesc'];
                this.productItem.MaximumLimitperOccurrenceDesc = loc['MaximumLimitperOccurrenceDesc'];
                this.productItem.AccidentalAdditionalclaimsPreparationCosts = loc['AccidentalAdditionalclaimsPreparationCosts'];
                this.productItem.IndustryId = loc['IndustryType']
              }
            }
          }
        }
        i += 1;
      }
    }
    console.log("Final Location", this.locationList)
  }
  getClaimPreparationList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "CLAIM_COST"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.accidentalClaimCost = defaultObj.concat(data.Result);
        for (let i = 0; i < this.accidentalClaimCost.length; i++) {
          this.accidentalClaimCost[i].label = this.accidentalClaimCost[i]['CodeDesc'];
          this.accidentalClaimCost[i].value = this.accidentalClaimCost[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.accidentalClaimCost.length - 1) {
            if (this.productId == '92' || this.productId == '70') {
              let fieldCostClaim = this.fieldAccidental[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[3].fieldGroup;
              console.log('fieldCostClaim', fieldCostClaim);
              if (fieldCostClaim) {
                for (let field of fieldCostClaim) {
                  if (field.key == "AccidentalAdditionalclaimsPreparationCosts") {
                    field.props.options = this.accidentalClaimCost;
                  }
                }
              }
            }
            else {
              let fieldLeakage = this.fieldAccidental[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[3].fieldGroup;
              for (let field of fieldLeakage) {
                if (field.key == 'AccidentalAdditionalclaimsPreparationCosts') {
                  field.props.options = this.accidentalClaimCost;
                }
              }
            }
          }
        }
      })
  }
  //Industry Change
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
          entry['AccidentalPhysicalLossDamage'] = this.productItem.AccidentalPhysicalLossDamage;
          entry['Accidentaloilandchemical'] = this.productItem.Accidentaloilandchemical;
          entry['MaximumLimitperOccurrence'] = this.productItem.MaximumLimitperOccurrence;
          entry['AccidentalPhysicalLossDamageDesc'] = this.productItem.AccidentalPhysicalLossDamageDesc;
          entry['AccidentaloilandchemicalDesc'] = this.productItem.AccidentaloilandchemicalDesc;
          entry['MaximumLimitperOccurrenceDesc'] = this.productItem.MaximumLimitperOccurrenceDesc;
          entry['AccidentalAdditionalclaimsPreparationCosts'] = this.productItem.AccidentalAdditionalclaimsPreparationCosts;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let accidentalApi = null;
        if (this.productId == '92') {
          if (this.insuranceId == '100046') accidentalApi = new AccidentalDamageCommercialPhoenixApi();
          if (this.insuranceId == '100047') accidentalApi = new AccidentalDamageCommercialBotswanaApi();
          if (this.insuranceId == '100048') accidentalApi = new AccidentalDamageCommercialMozambiqueApi();
          if (this.insuranceId == '100049') accidentalApi = new AccidentalDamageCommercialSwazilandApi();
          if (this.insuranceId == '100050') accidentalApi = new AccidentalDamageCommercialNamibiaApi()
        }
        else {
          if (this.insuranceId == '100046') accidentalApi = new AccidentalDamageApiPhoenix();
          else if (this.insuranceId == '100047') accidentalApi = new AccidentalDamageBotswanaApi();
          else if (this.insuranceId == '100048') accidentalApi = new AccidentalDamageMozambiqueApi();
          else if (this.insuranceId == '100049') accidentalApi = new AccidentalDamageSwazilandApi();
          else if (this.insuranceId == '100050') accidentalApi = new AccidentalDamageNamibiaApi();
        }
        if (entry['AccidentalAdditionalclaimsPreparationCosts'] != undefined || entry['Accidentaloilandchemical'] != undefined || entry['IndustryType'] != undefined) {
          let accidentalApilist: any = accidentalApi.getSaveDetails(entry, this.accidentalClaimCost, this.industryTypeList, obj,this.productItem.IndustryId, this.industryTypeList)
          if (accidentalApilist) { 
            let list =[];
            if(entry.SectionList) list = entry.SectionList.filter(ele=>ele.SectionId!='56');
              if(accidentalApilist.SectionList) accidentalApilist.SectionList = accidentalApilist.SectionList.concat(list)
              obj = accidentalApilist
           }
        }
        else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        locationList.push(obj);
        j += 1;
        if (j == this.locationList.length) {
          let res = {
            "locationList": locationList,
            "type": type
          }
          if (type == 'packageData') {
            this.saveSection.emit(res);
          }
          else { this.finalProceed.emit(res) }
        }
      }
    }
  }
  skip() {
    this.skipSection.emit('Deterioration');
  }
  previous() {
    this.previousSection.emit(true);
  }
}
