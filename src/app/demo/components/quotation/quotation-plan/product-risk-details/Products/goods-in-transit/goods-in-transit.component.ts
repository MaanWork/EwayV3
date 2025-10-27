import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services';
import { GoodsInTransitCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/GoodsInTransit/GoodsInTransit';
import { GoodsInTransitCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/GoodsInTransit/GoodsInTransit';
import { GoodsInTransitCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/GoodsInTransit/GoodsInTransit';
import { GoodsInTransitCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/GoodsInTransit/GoodsInTransit';
import { GoodsInTransitCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitPhoenix } from '../../../models/phoneix/PhoenixZambia/GoodsInTransit';
import { GoodsInTransitBotswana } from '../../../models/phoneix/PhoenixBotswana/GoodsInTransit/GoodsInTransit';
import { GoodsInTransitMozambique } from '../../../models/phoneix/PhoenixMozambique/GoodsInTransit/GoodsInTransit';
import { GoodsInTransitSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/GoodsInTransit/GoodsInTransit';
import { GoodsInTransitNamibia } from '../../../models/phoneix/PhoenixNamibia/GoodsInTransit/GoodsInTransit';
import { GoodsInTransitCommercialApiPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitCommercialApiBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitCommercialApiMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitCommercialApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitApiNamibia } from '../../../models/phoneix/PhoenixNamibia/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitApiMozambique } from '../../../models/phoneix/PhoenixMozambique/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitApiBotswana } from '../../../models/phoneix/PhoenixBotswana/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitApiPhoenix } from '../../../models/phoneix/PhoenixZambia/GoodsInTransit/GoodsInTransitApi';
import { GoodsInTransitCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/GoodsInTransit/GoodsInTransit';
@Component({
  selector: 'app-goods-in-transit',
  standalone: false,
  templateUrl: './goods-in-transit.component.html',
  styleUrls: ['./goods-in-transit.component.scss']
})
export class GoodsInTransitComponent {
  userType: any = null;
  productId: any = null;
  form2 = new FormGroup({});
  showExtensions = false;
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  GoodsTransitFields: any[] = [];
  GoodsTransitextentionsField: any[] = [];
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  goodsClaimCost: any[] = [];
  goodsTransit: any[] = [];
  GoodsInTransitList: any[] = [];
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
      if (this.insuranceId == "100046") contentData = new GoodsInTransitCommercialPhoenix();
      else if (this.insuranceId == '100047') contentData = new GoodsInTransitCommercialBotswana();
      else if (this.insuranceId == '100048') contentData = new GoodsInTransitCommercialMozambique();
      else if (this.insuranceId == '100049') contentData = new GoodsInTransitCommercialSwaziland();
      else if (this.insuranceId == '100050') contentData = new GoodsInTransitCommercialNamibia();
      this.GoodsTransitextentionsField = contentData?.ExtensionFields.fieldGroup;
      this.GoodsTransitFields = contentData?.fields.fieldGroup[0].fieldGroup;
    } else {
      if (this.insuranceId == '100046') contentData = new GoodsInTransitPhoenix();
      else if (this.insuranceId == '100047') contentData = new GoodsInTransitBotswana();
      else if (this.insuranceId == '100048') contentData = new GoodsInTransitMozambique();
      else if (this.insuranceId == '100049') contentData = new GoodsInTransitSwaziland();
      else if (this.insuranceId == '100050') contentData = new GoodsInTransitNamibia();
      this.GoodsTransitextentionsField = contentData?.ExtensionFields.fieldGroup;
      this.GoodsTransitFields = contentData?.fields.fieldGroup[0].fieldGroup;
    }
    this.getTransitList('GOODS_IN_TRANSIT');
    this.getTransitList('GOODS_IN_TRANSIT_TYPE');
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
          let goodsApi = null, subDetails = this.locationDetails[i]?.SectionList;
          if (this.productId == '92') {
            if (this.insuranceId == "100046") goodsApi = new GoodsInTransitCommercialApiPhoenix();
            else if (this.insuranceId == '100047') goodsApi = new GoodsInTransitCommercialApiBotswana();
            else if (this.insuranceId == '100048') goodsApi = new GoodsInTransitCommercialApiMozambique();
            else if (this.insuranceId == '100049') goodsApi = new GoodsInTransitCommercialApiSwaziland();
            else if (this.insuranceId == '100050') goodsApi = new GoodsInTransitCommercialApiNamibia();
          }
          else {
            if (this.insuranceId == "100046") goodsApi = new GoodsInTransitApiPhoenix();
            else if (this.insuranceId == '100047') goodsApi = new GoodsInTransitApiBotswana();
            else if (this.insuranceId == '100048') goodsApi = new GoodsInTransitApiMozambique();
            else if (this.insuranceId == '100049') goodsApi = new GoodsInTransitApiSwaziland();
            else if (this.insuranceId == '100050') goodsApi = new GoodsInTransitApiNamibia();
          }
          obj = goodsApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.TransitCoverage = obj['TransitCoverage'];
            this.productItem.Commodity = obj['Commodity'];
            this.productItem.CoverageType = obj['CoverageType'];
            this.productItem.GoodsInTransitSumInsured = obj['GoodsInTransitSumInsured'];
            this.productItem.vehicleCount = obj['vehicleCount'];
            this.productItem.TripsMonth = obj['TripsMonth'];
            this.productItem.MaximumLimitTrips = obj['MaximumLimitTrips'];
            this.productItem.FireExtingUserCharge = obj['FireExtingUserCharge'];
            this.productItem.DetoriationRemoval = obj['DetoriationRemoval'];
            this.productItem.GITClaimPreparationCost = obj['GITClaimPreparationCost'];
            this.productItem.ClaimPreparationCost = obj['ClaimPreparationCost'];
            this.productItem.IndustryId = obj['IndustryType'];
            if (obj['ClaimPreparationCost'] || obj['GITClaimPreparationCost'] || obj['FireExtingUserCharge'] || obj['DetoriationRemoval']) {
              this.showExtensions = true;
            }
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
          if (loc['TransitCoverage'] && loc['IndustryType']
          ) {
            this.productItem.TransitCoverage = loc['TransitCoverage'];
            this.productItem.Commodity = loc['Commodity'];
            this.productItem.CoverageType = loc['CoverageType'];
            this.productItem.GoodsInTransitSumInsured = loc['GoodsInTransitSumInsured'];
            this.productItem.vehicleCount = loc['vehicleCount'];
            this.productItem.TripsMonth = loc['TripsMonth'];
            this.productItem.MaximumLimitTrips = loc['MaximumLimitTrips'];
            this.productItem.FireExtingUserCharge = loc['FireExtingUserCharge'];
            this.productItem.DetoriationRemoval = loc['DetoriationRemoval'];
            this.productItem.GITClaimPreparationCost = loc['GITClaimPreparationCost'];
            this.productItem.ClaimPreparationCost = loc['ClaimPreparationCost'];
            this.productItem.IndustryId = loc['IndustryType']
            if (loc['ClaimPreparationCost'] || loc['GITClaimPreparationCost'] || loc['FireExtingUserCharge'] || loc['DetoriationRemoval']) {
              this.showExtensions = true;
            }
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let goodsApi = null, subDetails = this.locationDetails[i]?.SectionList;
              if (this.insuranceId == "100046") goodsApi = new GoodsInTransitApiPhoenix();
              else if (this.insuranceId == '100047') goodsApi = new GoodsInTransitApiBotswana();
              else if (this.insuranceId == '100048') goodsApi = new GoodsInTransitApiMozambique();
              else if (this.insuranceId == '100049') goodsApi = new GoodsInTransitApiSwaziland();
              else if (this.insuranceId == '100050') goodsApi = new GoodsInTransitApiNamibia();
              loc = goodsApi.getEditDetails(subDetails, loc);
              if (
                loc['TransitCoverageDesc'] && loc['TransitCoverage'] &&
                loc['CommodityDesc'] && loc['Commodity']
              ) {
                this.productItem.TransitCoverage = loc['TransitCoverage'];
                this.productItem.Commodity = loc['Commodity'];
                this.productItem.CoverageType = loc['CoverageType'];
                this.productItem.GoodsInTransitSumInsured = loc['GoodsInTransitSumInsured'];
                this.productItem.vehicleCount = loc['vehicleCount'];
                this.productItem.TripsMonth = loc['TripsMonth'];
                this.productItem.MaximumLimitTrips = loc['MaximumLimitTrips'];
                this.productItem.FireExtingUserCharge = loc['FireExtingUserCharge'];
                this.productItem.DetoriationRemoval = loc['DetoriationRemoval'];
                this.productItem.GITClaimPreparationCost = loc['GITClaimPreparationCost'];
                this.productItem.ClaimPreparationCost = loc['ClaimPreparationCost'];
                this.productItem.IndustryId = loc['IndustryType']
                if (loc['ClaimPreparationCost'] || loc['GITClaimPreparationCost'] || loc['FireExtingUserCharge'] || loc['DetoriationRemoval']) {
                  this.showExtensions = true;
                }
              }
            }
          }
        }
        i += 1;
      }
    }
    console.log("loggg", this.productItem);
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
        this.goodsClaimCost = defaultObj.concat(data.Result);
        for (let i = 0; i < this.goodsClaimCost.length; i++) {
          this.goodsClaimCost[i].label = this.goodsClaimCost[i]['CodeDesc'];
          this.goodsClaimCost[i].value = this.goodsClaimCost[i]['Code'];
          if (i == this.goodsClaimCost.length - 1) {
            if (this.productId == '92' || this.productId == '49') {
              let fieldCostClaim = this.GoodsTransitextentionsField[0].fieldGroup;
              if (fieldCostClaim) {
                for (let field of fieldCostClaim) {
                  if (field.key == 'ClaimPreparationCost' || field.key == 'GITClaimPreparationCost') {
                    field.props.options = this.goodsClaimCost;
                  }
                }
              }
            }
            else {
              let fieldLeakage = this.GoodsTransitextentionsField[0].fieldGroup;
              for (let field of fieldLeakage) { if (field.key == 'ClaimPreparationCost' || field.key == 'GITClaimPreparationCost') { field.props.options = this.goodsClaimCost; } }
            }
          }
        }
      })
  }
  getTransitList(type) {
    const ReqObj = {
      InsuranceId: this.insuranceId,
      ItemType: type
    };
    const urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.goodsTransit = defaultObj.concat(data.Result);
        for (let i = 0; i < this.goodsTransit.length; i++) {
          this.goodsTransit[i].label = this.goodsTransit[i]['CodeDesc'];
          this.goodsTransit[i].value = this.goodsTransit[i]['Code'];
          if (i == this.goodsTransit.length - 1) {
            if (type == 'GOODS_IN_TRANSIT') {
              if (this.productId == '92' || this.productId == '49') {
                let fieldCostClaim = this.GoodsTransitFields;
                console.log('fieldCostClaim', fieldCostClaim);
                if (fieldCostClaim) {
                  for (let field of fieldCostClaim) { if (field.key == 'TransitCoverage') { field.props.options = this.goodsTransit; } }
                }
              }
              else {
                let fieldLeakage = this.GoodsTransitFields;
                for (let field of fieldLeakage) { if (field.key == 'TransitCoverage') { field.props.options = this.goodsTransit; } }
              }
            }
            else if (type == 'GOODS_IN_TRANSIT_TYPE') {
              if (this.productId == '92' || this.productId == '49') {
                let fieldCostClaim = this.GoodsTransitFields;
                console.log('fieldCostClaim', fieldCostClaim);
                if (fieldCostClaim) {
                  for (let field of fieldCostClaim) { if (field.key == 'CoverageType') { field.props.options = this.goodsTransit; } }
                }
              }
              else {
                let fieldLeakage = this.GoodsTransitFields;
                for (let field of fieldLeakage) { if (field.key == 'CoverageType') { field.props.options = this.goodsTransit; } }
              }
            }
          }
        }
      })
  }
  //Industry Change
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryType = this.productItem.IndustryType;
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
          entry['TransitCoverage'] = this.productItem.TransitCoverage;
          entry['Commodity'] = this.productItem.Commodity;
          entry['CoverageType'] = this.productItem.CoverageType;
          entry['GoodsInTransitSumInsured'] = this.productItem.GoodsInTransitSumInsured;
          entry['vehicleCount'] = this.productItem.vehicleCount;
          entry['TripsMonth'] = this.productItem.TripsMonth;
          entry['MaximumLimitTrips'] = this.productItem.MaximumLimitTrips;
          entry['FireExtingUserCharge'] = this.productItem.FireExtingUserCharge;
          entry['DetoriationRemoval'] = this.productItem.DetoriationRemoval;
          entry['GITClaimPreparationCost'] = this.productItem.GITClaimPreparationCost;
          entry['ClaimPreparationCost'] = this.productItem.ClaimPreparationCost;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let goodsApi = null;
        if (this.insuranceId == "100046") goodsApi = new GoodsInTransitApiPhoenix();
        else if (this.insuranceId == '100047') goodsApi = new GoodsInTransitApiBotswana();
        else if (this.insuranceId == '100048') goodsApi = new GoodsInTransitApiMozambique();
        else if (this.insuranceId == '100049') goodsApi = new GoodsInTransitApiSwaziland();
        else if (this.insuranceId == '100050') goodsApi = new GoodsInTransitApiNamibia();
        if (entry['GoodsInTransitSumInsured'] != undefined && entry['TransitCoverage'] != undefined) {
          let goodsApilist: any = goodsApi.getSaveDetails(entry, this.goodsClaimCost, this.industryTypeList, obj);
          if (goodsApilist) { 
              let list =[];
              if(entry.SectionList) list = entry.SectionList.filter(ele=>ele.SectionId!='46');
                if(goodsApilist.SectionList) goodsApilist.SectionList = goodsApilist.SectionList.concat(list)
                obj = goodsApilist 
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
          console.log("Final Object", res)
         if (type == 'packageData') {
            this.saveSection.emit(res);
          }
          else {
            this.finalProceed.emit(res)
          }
        }
      }
    }
  }
  //this.finalProceed.emit(obj);
  skip() {
    this.skipSection.emit(true);
  }
  previous() {
    this.previousSection.emit(true);
  }
  onExtensionToggle() {
    if (!this.showExtensions) {
      this.form2.reset();
    }
  }
}
