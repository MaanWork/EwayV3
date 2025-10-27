import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import { GlassApiBotswana } from '../../../models/phoneix/PhoenixBotswana/Glass/GlassApi';
import { GlassApiMozambique } from '../../../models/phoneix/PhoenixMozambique/Glass/GlassApi';
import { GlassApiNamibia } from '../../../models/phoneix/PhoenixNamibia/Glass/GlassApi';
import { GlassApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Glass/GlassApi';
import { GlassApiPhoenix } from '../../../models/phoneix/PhoenixZambia/Glass/GlassApi';
import * as Mydatas from '../../../../../../../app-config.json';
import { GlassPhoenix } from '../../../models/phoneix/PhoenixZambia/Glass/Glass';
import { GlassBotswana } from '../../../models/phoneix/PhoenixBotswana/Glass/Glass';
import { GlassMozambique } from '../../../models/phoneix/PhoenixMozambique/Glass/Glass';
import { GlassNamibia } from '../../../models/phoneix/PhoenixNamibia/Glass/Glass';
import { GlassSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Glass/Glass';
import { GlassCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/Glass/Glass';
import { GlassCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/Glass/Glass';
import { GlassCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/Glass/Glass';
import { GlassCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/Glass/Glass';
import { GlassCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/Glass/Glass';
import { GlassCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/Glass/GlassApi';
import { GlassCommercialApiBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/Glass/GlassApi';
import { GlassCommercialApiMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/Glass/GlassApi';
import { GlassCommercialApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/Glass/GlassApi';
import { GlassCommercialApiPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/Glass/GlassApi';

@Component({
  selector: 'app-glass',
  standalone: false,
  templateUrl: './glass.component.html',
  styleUrls: ['./glass.component.scss']
})
export class GlassComponent {
  deteriorationOfStockDescError: boolean = false; userType: any = null;
  deteriorationOfStockError: boolean = false; productId: any = null;
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>(); @Output() saveSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  fieldGlass: any[] = [];
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  glassClaimCost: any[] = [];
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
      if (this.insuranceId == "100046") contentData = new GlassCommercialPhoenix();
      else if (this.insuranceId == '100047') contentData = new GlassCommercialBotswana();
      else if (this.insuranceId == '100048') contentData = new GlassCommercialMozambique();
      else if (this.insuranceId == '100049') contentData = new GlassCommercialSwaziland();
      else if (this.insuranceId == '100050') contentData = new GlassCommercialNamibia();
      this.fieldGlass[0] = contentData.fields;
    } else {
      if (this.insuranceId == '100046') contentData = new GlassPhoenix();
      else if (this.insuranceId == '100047') contentData = new GlassBotswana();
      else if (this.insuranceId == '100048') contentData = new GlassMozambique();
      else if (this.insuranceId == '100049') contentData = new GlassSwaziland();
      else if (this.insuranceId == '100050') contentData = new GlassNamibia();
      this.fieldGlass[0] = contentData?.fields;
    }
    this.getClaimPreparationList();
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
          let glassApi = null, subDetails = this.locationDetails[i].SectionList;
          if (this.productId == '92') {
            if (this.insuranceId == "100046") glassApi = new GlassCommercialApiPhoenix();
            else if (this.insuranceId == '100047') glassApi = new GlassCommercialApiBotswana();
            else if (this.insuranceId == '100048') glassApi = new GlassCommercialApiMozambique();
            else if (this.insuranceId == '100049') glassApi = new GlassCommercialApiSwaziland();
            else if (this.insuranceId == '100050') glassApi = new GlassCommercialApiNamibia();
          }
          else {
            if (this.insuranceId == '100046') glassApi = new GlassApiPhoenix();
            else if (this.insuranceId == '100047') glassApi = new GlassApiBotswana();
            else if (this.insuranceId == '100048') glassApi = new GlassApiMozambique();
            else if (this.insuranceId == '100049') glassApi = new GlassApiSwaziland();
            else if (this.insuranceId == '100050') glassApi = new GlassApiNamibia();
          }
          obj = glassApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.SpecialReinstatementDesc = obj['SpecialReinstatementDesc'];
            this.productItem.SpecialReinstatement = obj['SpecialReinstatement'];
            this.productItem.InternalGlassDesc = obj['InternalGlassDesc'];
            this.productItem.InternalGlass = obj['InternalGlass'];
            this.productItem.ExternalGlassDesc = obj['ExternalGlassDesc'];
            this.productItem.ExternalGlass = obj['ExternalGlass'];
            this.productItem.GlassClaimsPreparationCosts = obj['GlassClaimsPreparationCosts'];
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
          if (loc['SpecialReinstatementDesc'] && loc['SpecialReinstatement'] && loc['InternalGlassDesc'] && loc['InternalGlass'] && loc['ExternalGlassDesc'] && loc['GlassClaimsPreparationCosts'] && loc['IndustryType']) {
            this.productItem.SpecialReinstatementDesc = loc['SpecialReinstatementDesc'];
            this.productItem.SpecialReinstatement = loc['SpecialReinstatement'];
            this.productItem.InternalGlassDesc = loc['InternalGlassDesc'];
            this.productItem.InternalGlass = loc['InternalGlass'];
            this.productItem.ExternalGlassDesc = loc['ExternalGlassDesc'];
            this.productItem.ExternalGlass = loc['ExternalGlass'];
            this.productItem.GlassClaimsPreparationCosts = loc['GlassClaimsPreparationCosts'];
            this.productItem.IndustryId = loc['IndustryType']
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let glassApi = null, subDetails = this.locationDetails[i].SectionList;
              if (this.insuranceId == '100046') glassApi = new GlassApiPhoenix();
              else if (this.insuranceId == '100047') glassApi = new GlassApiBotswana();
              else if (this.insuranceId == '100048') glassApi = new GlassApiMozambique();
              else if (this.insuranceId == '100049') glassApi = new GlassApiSwaziland();
              else if (this.insuranceId == '100050') glassApi = new GlassApiNamibia();
              loc = glassApi.getEditDetails(subDetails, loc);
              if (loc['SpecialReinstatementDesc'] && loc['SpecialReinstatement'] && loc['InternalGlassDesc'] && loc['InternalGlass'] && loc['ExternalGlassDesc'] && loc['GlassClaimsPreparationCosts'] && loc['IndustryType']) {
                this.productItem.SpecialReinstatementDesc = loc['SpecialReinstatementDesc'];
                this.productItem.SpecialReinstatement = loc['SpecialReinstatement'];
                this.productItem.InternalGlassDesc = loc['InternalGlassDesc'];
                this.productItem.InternalGlass = loc['InternalGlass'];
                this.productItem.ExternalGlassDesc = loc['ExternalGlassDesc'];
                this.productItem.ExternalGlass = loc['ExternalGlass'];
                this.productItem.GlassClaimsPreparationCosts = loc['GlassClaimsPreparationCosts'];
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
        this.glassClaimCost = defaultObj.concat(data.Result);
        for (let i = 0; i < this.glassClaimCost.length; i++) {
          this.glassClaimCost[i].label = this.glassClaimCost[i]['CodeDesc'];
          this.glassClaimCost[i].value = this.glassClaimCost[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.glassClaimCost.length - 1) {
            if (this.productId == '92' || this.productId == '72') {
              let fieldCostClaim = this.fieldGlass[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[3].fieldGroup;
              console.log('fieldCostClaim', fieldCostClaim);

              if (fieldCostClaim) {
                for (let field of fieldCostClaim) { if (field.key == 'GlassClaimsPreparationCosts') { field.props.options = this.glassClaimCost; } }
              }
            }
            else {
              let fieldLeakage = this.fieldGlass[0].fieldGroup;
              for (let field of fieldLeakage) { if (field.key == 'GlassClaimsPreparationCosts') { field.props.options = this.glassClaimCost; } }
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
          entry['SpecialReinstatementDesc'] = this.productItem.SpecialReinstatementDesc;
          entry['SpecialReinstatement'] = this.productItem.SpecialReinstatement;
          entry['InternalGlassDesc'] = this.productItem.InternalGlassDesc;
          entry['InternalGlass'] = this.productItem.InternalGlass;
          entry['ExternalGlassDesc'] = this.productItem.ExternalGlassDesc;
          entry['ExternalGlass'] = this.productItem.ExternalGlass;
          entry['GlassClaimsPreparationCosts'] = this.productItem.GlassClaimsPreparationCosts;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let glassApi = null;
        if (this.insuranceId == '100046') glassApi = new GlassApiPhoenix();
        else if (this.insuranceId == '100047') glassApi = new GlassApiBotswana();
        else if (this.insuranceId == '100048') glassApi = new GlassApiMozambique();
        else if (this.insuranceId == '100049') glassApi = new GlassApiSwaziland();
        else if (this.insuranceId == '100050') glassApi = new GlassApiNamibia();

        if (entry['SpecialReinstatement'] != undefined && entry['InternalGlass'] != undefined && entry['ExternalGlass'] != undefined && entry['GlassClaimsPreparationCosts'] != undefined && entry['IndustryType'] != undefined) {
          let glassApiList: any = glassApi.getSaveDetails(entry, this.glassClaimCost, this.productItem.IndustryId, this.industryTypeList, obj)
          if (glassApiList) {
            let list = [];
            if (entry.SectionList) list = entry.SectionList.filter(ele => ele.SectionId != '222');
            if (glassApiList.SectionList) glassApiList.SectionList = glassApiList.SectionList.concat(list)
            obj = glassApiList
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
          if (type == 'packageData') { this.saveSection.emit(res); }
          else { this.finalProceed.emit(res) }
        }
      }
    }
  }
  //this.finalProceed.emit(obj);

  skip() {
    this.skipSection.emit('Glass');
  }
  previous() {
    this.previousSection.emit(true);
  }
}
