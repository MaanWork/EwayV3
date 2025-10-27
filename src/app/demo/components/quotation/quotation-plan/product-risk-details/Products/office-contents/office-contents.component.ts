import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { OfficeContents } from '../../../models/phoneix/PhoenixZambia/OfficeContents/OfficeContent';
import { OfficeContentsBotswana } from '../../../models/phoneix/PhoenixBotswana/OfficeContents/OfficeContent';
import { OfficeContentsMozambique } from '../../../models/phoneix/PhoenixMozambique/OfficeContents/OfficeContent';
import { OfficeContentsSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/OfficeContents/OfficeContent';
import { OfficeContentsNamibia } from '../../../models/phoneix/PhoenixNamibia/OfficeContents/OfficeContent';
import { OfficeContentsApiPhoenix } from '../../../models/phoneix/PhoenixZambia/OfficeContents/OfficeContentApi';
import { OfficeContentsApiBotswana } from '../../../models/phoneix/PhoenixBotswana/OfficeContents/OfficeContentApi';
import { OfficeContentsApiMozambique } from '../../../models/phoneix/PhoenixMozambique/OfficeContents/OfficeContentApi';
import { OfficeContentsApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/OfficeContents/OfficeContentApi';
import { OfficeContentsApiNamibia } from '../../../models/phoneix/PhoenixNamibia/OfficeContents/OfficeContentApi';
import { OfficeContentsCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/OfficeContents/OfficeContentApi';
import { OfficeContentsCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/OfficeContents/OfficeContent';

@Component({
  selector: 'app-office-contents',
  templateUrl: './office-contents.component.html',
  styleUrls: ['./office-contents.component.css']
})
export class OfficeContentsComponent implements OnInit {
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  fieldOfficeContent: any[] = [];
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  officecontentClaimCost: any[] = [];
  productId: any;
  userType: any;
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
        contentData = new OfficeContentsCommercialNamibia();
        this.fieldOfficeContent[0] = contentData?.fields;
        this.getClaimPreparationList();
        console.log("Final Fields", this.fieldOfficeContent[0], contentData?.fields)
      } 
      else {
      if (this.insuranceId == '100046') contentData = new OfficeContents();
      else if (this.insuranceId == '100047') contentData = new OfficeContentsBotswana();
      else if (this.insuranceId == '100048') contentData = new OfficeContentsMozambique();
      else if (this.insuranceId == '100049') contentData = new OfficeContentsSwaziland();
      else if (this.insuranceId == '100050') contentData = new OfficeContentsNamibia();
      this.fieldOfficeContent[0] = contentData?.fields;
      this.getClaimPreparationList();
    }
    
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
          let officecontentsApi = null, subDetails = this.locationDetails[i]?.SectionList;
          if (this.productId == '92') {
            officecontentsApi = new OfficeContentsCommercialApiNamibia();
          }
          else {
            if (this.insuranceId == '100046') officecontentsApi = new OfficeContentsApiPhoenix();
            else if (this.insuranceId == '100047') officecontentsApi = new OfficeContentsApiBotswana();
            else if (this.insuranceId == '100048') officecontentsApi = new OfficeContentsApiMozambique();
            else if (this.insuranceId == '100049') officecontentsApi = new OfficeContentsApiSwaziland();
            else if (this.insuranceId == '100050') officecontentsApi = new OfficeContentsApiNamibia();
          }
          obj = officecontentsApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.OfficeContents = obj['OfficeContents'];
            this.productItem.OfficeContentsDesc = obj['OfficeContentsDesc'];
            this.productItem.TheftAspect = obj['TheftAspect'];
            this.productItem.WaterLeakage = obj['WaterLeakage'];
            this.productItem.LiabilityForLossOfDocuments = obj['LiabilityForLossOfDocuments'];
            this.productItem.OfficePowerSurge = obj['OfficePowerSurge'];
            this.productItem.OfficeClaimCosts = obj['OfficeClaimCosts'];
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
          if (loc['OfficeContents'] && loc['OfficeContentsDesc'] && loc['TheftAspect'] && loc['WaterLeakage'] && loc['LiabilityForLossOfDocuments'] && loc['OfficePowerSurge'] && loc['IndustryType']) {
            this.productItem.OfficeContents = loc['OfficeContents'];
            this.productItem.OfficeContentsDesc = loc['OfficeContentsDesc'];
            this.productItem.TheftAspect = loc['TheftAspect'];
            this.productItem.WaterLeakage = loc['WaterLeakage'];
            this.productItem.LiabilityForLossOfDocuments = loc['LiabilityForLossOfDocuments'];
            this.productItem.OfficePowerSurge = loc['OfficePowerSurge'];
            this.productItem.OfficeClaimCosts = loc['OfficeClaimCosts'];
            this.productItem.IndustryId = loc['IndustryType']
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let officecontentsApi = null, subDetails = this.locationDetails[i]?.SectionList;
              if (this.productId == '92') {
                officecontentsApi = new OfficeContentsCommercialApiNamibia();
              }
              else {
                if (this.insuranceId == '100046') officecontentsApi = new OfficeContentsApiPhoenix();
                else if (this.insuranceId == '100047') officecontentsApi = new OfficeContentsApiBotswana();
                else if (this.insuranceId == '100048') officecontentsApi = new OfficeContentsApiMozambique();
                else if (this.insuranceId == '100049') officecontentsApi = new OfficeContentsApiSwaziland();
                else if (this.insuranceId == '100050') officecontentsApi = new OfficeContentsApiNamibia();
              }
              loc = officecontentsApi.getEditDetails(subDetails, loc);
              if (loc['OfficeContents'] && loc['OfficeContentsDesc'] && loc['TheftAspect'] && loc['WaterLeakage'] && loc['LiabilityForLossOfDocuments'] && loc['OfficePowerSurge'] && loc['IndustryType']) {
                this.productItem.OfficeContents = loc['OfficeContents'];
                this.productItem.OfficeContentsDesc = loc['OfficeContentsDesc'];
                this.productItem.TheftAspect = loc['TheftAspect'];
                this.productItem.WaterLeakage = loc['WaterLeakage'];
                this.productItem.LiabilityForLossOfDocuments = loc['LiabilityForLossOfDocuments'];
                this.productItem.OfficePowerSurge = loc['OfficePowerSurge'];
                this.productItem.OfficeClaimCosts = loc['OfficeClaimCosts'];
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
        this.officecontentClaimCost = defaultObj.concat(data.Result);
        for (let i = 0; i < this.officecontentClaimCost.length; i++) {
          this.officecontentClaimCost[i].label = this.officecontentClaimCost[i]['CodeDesc'];
          this.officecontentClaimCost[i].value = this.officecontentClaimCost[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.officecontentClaimCost.length - 1) {
            if (this.productId == '92' || this.productId == '68') {
              console.log('fieldCostClaim', this.fieldOfficeContent[0]);
              let fieldCostClaim = this.fieldOfficeContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[5].fieldGroup;
              
              if (fieldCostClaim) {
                for (let field of fieldCostClaim) { if (field.key == 'OfficeClaimCosts') { field.props.options = this.officecontentClaimCost; } }
              }
            }
            else {
              let fieldLeakage = this.fieldOfficeContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[5].fieldGroup;
              for (let field of fieldLeakage) { if (field.key == 'OfficeClaimCosts') { field.props.options = this.officecontentClaimCost; } }
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
          entry['OfficeContents'] = this.productItem.OfficeContents;
          entry['OfficeContentsDesc'] = this.productItem.OfficeContentsDesc;
          entry['TheftAspect'] = this.productItem.TheftAspect;
          entry['WaterLeakage'] = this.productItem.WaterLeakage;
          entry['LiabilityForLossOfDocuments'] = this.productItem.LiabilityForLossOfDocuments;
          entry['OfficePowerSurge'] = this.productItem.OfficePowerSurge;
          entry['OfficeClaimCosts'] = this.productItem.OfficeClaimCosts;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let officecontentsApi = null;
        if (this.productId == '92') {
          officecontentsApi = new OfficeContentsCommercialApiNamibia();
        }
        else {
          if (this.insuranceId == '100046') officecontentsApi = new OfficeContentsApiPhoenix();
          else if (this.insuranceId == '100047') officecontentsApi = new OfficeContentsApiBotswana();
          else if (this.insuranceId == '100048') officecontentsApi = new OfficeContentsApiMozambique();
          else if (this.insuranceId == '100049') officecontentsApi = new OfficeContentsApiSwaziland();
          else if (this.insuranceId == '100050') officecontentsApi = new OfficeContentsApiNamibia();
        }
        if (entry['OfficeContents'] != undefined && entry['OfficeContentsDesc'] != undefined && entry['OfficePowerSurge'] != undefined && entry['OfficeClaimCosts'] != undefined && entry['IndustryType'] != undefined) {
          let OfficeContentApilist: any = officecontentsApi.getSaveDetails(entry, this.officecontentClaimCost,entry['IndustryType'], this.industryTypeList, obj)
          if (OfficeContentApilist) { 
              let list =[];
             if (this.productId == '92') {  if(entry.SectionList){list = entry.SectionList.filter(ele=>ele.SectionId!='198');}}
              if(OfficeContentApilist.SectionList) OfficeContentApilist.SectionList = OfficeContentApilist.SectionList.concat(list)
              obj= OfficeContentApilist;
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
  //this.finalProceed.emit(obj);

  skip() {
    this.skipSection.emit('Office contents');
  }
  previous() {
    this.previousSection.emit(true);
  }
}


