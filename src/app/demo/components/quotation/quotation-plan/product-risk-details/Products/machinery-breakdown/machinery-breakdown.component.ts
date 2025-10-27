import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { MachineryBreakDownPhoenix } from '../../../models/phoneix/PhoenixZambia/MachineryBreakdown/MachineryBreakdown';
import { MachineryBreakDownBotswana } from '../../../models/phoneix/PhoenixBotswana/MachineryBreakdown/MachineryBreakdown';
import { MachineryBreakDownMozambique } from '../../../models/phoneix/PhoenixMozambique/MachineryBreakdown/MachineryBreakdown';
import { MachineryBreakDownSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/MachineryBreakdown/MachineryBreakdown';
import { MachineryBreakDownNamibia } from '../../../models/phoneix/PhoenixNamibia/MachineryBreakdown/MachineryBreakdown';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MachineryBreakdownApi } from '../../../models/phoneix/PhoenixZambia/MachineryBreakdown/MachineryBreakdownApi';
import { MachineryBreakdownApiBotswana } from '../../../models/phoneix/PhoenixBotswana/MachineryBreakdown/MachineryBreakdownApi';
import { MachineryBreakdownApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/MachineryBreakdown/MachineryBreakdownApi';
import { MachineryBreakdownApiNamibia } from '../../../models/phoneix/PhoenixNamibia/MachineryBreakdown/MachineryBreakdownApi';
import { MachineryBreakdownApiMozambique } from '../../../models/phoneix/PhoenixMozambique/MachineryBreakdown/MachineryBreakdownApi';
import { MachineryBreakdownCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/MachineryBreakdown/MachineryBreakdownApi';
import { MachineryBreakDownCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/MachineryBreakdown/MachineryBreakdown';
@Component({
  selector: 'app-machinery-breakdown',
  templateUrl: './machinery-breakdown.component.html',
  standalone: false,
  styleUrls: ['./machinery-breakdown.component.scss']
})
export class MachineryBreakdownComponent implements OnInit {
  @Input() form: any; coversreuired: any = null; insuranceId: any = null; productId: any = null; userType: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  fieldMachinery: any[] = [];
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  MachineryClaimCost: any[] = []; glassClaimCost: any[] = [];
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
    let contentData4: any;
    if (this.productId == '92') {
      contentData4 = new MachineryBreakDownCommercialNamibia(this.sharedService);
    }
    else {
      if (this.insuranceId == '100046') contentData4 = new MachineryBreakDownPhoenix(this.sharedService)
      else if (this.insuranceId == '100047') contentData4 = new MachineryBreakDownBotswana(this.sharedService)
      else if (this.insuranceId == '100048') contentData4 = new MachineryBreakDownMozambique(this.sharedService)
      else if (this.insuranceId == '100049') contentData4 = new MachineryBreakDownSwaziland(this.sharedService)
      else if (this.insuranceId == '100050') contentData4 = new MachineryBreakDownNamibia(this.sharedService)
    }
    this.fieldMachinery = contentData4?.policyfields1.fieldGroup;
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
          let machinerybreakdownApi = null, subDetails = this.locationDetails[i]?.SectionList;
          if (this.productId == '92') {
            machinerybreakdownApi = new MachineryBreakdownCommercialApiNamibia();
          }
          else {
            if (this.insuranceId == '100046') machinerybreakdownApi = new MachineryBreakdownApi()
            else if (this.insuranceId == '100047') machinerybreakdownApi = new MachineryBreakdownApiBotswana()
            else if (this.insuranceId == '100048') machinerybreakdownApi = new MachineryBreakdownApiMozambique()
            else if (this.insuranceId == '100049') machinerybreakdownApi = new MachineryBreakdownApiSwaziland()
            else if (this.insuranceId == '100050') machinerybreakdownApi = new MachineryBreakdownApiNamibia()
          }
          obj = machinerybreakdownApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.GrossProfit = obj['GrossProfit'];
            this.productItem.IncreasedCostOfWorking = obj['IncreasedCostOfWorking'];
            this.productItem.ClaimsPreparationCosts = obj['ClaimsPreparationCosts'];
            this.productItem.MClaimsPreparationCosts = obj['MClaimsPreparationCosts'];
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
          if (loc['GrossProfit'] != undefined && loc['IndustryType'] != undefined) {
            this.productItem.GrossProfit = loc['GrossProfit'];
            this.productItem.IncreasedCostOfWorking = loc['IncreasedCostOfWorking'];
            this.productItem.ClaimsPreparationCosts = loc['ClaimsPreparationCosts'];
            this.productItem.MClaimsPreparationCosts = loc['MClaimsPreparationCosts'];
            this.productItem.IndustryId = loc['IndustryType']
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let machinerybreakdownApi = null, subDetails = this.locationDetails[i]?.SectionList;
              if (this.productId = '92') {
                machinerybreakdownApi = new MachineryBreakdownCommercialApiNamibia();
              }
              else {
                if (this.insuranceId == '100046') machinerybreakdownApi = new MachineryBreakdownApi()
                else if (this.insuranceId == '100047') machinerybreakdownApi = new MachineryBreakdownApiBotswana()
                else if (this.insuranceId == '100048') machinerybreakdownApi = new MachineryBreakdownApiMozambique()
                else if (this.insuranceId == '100049') machinerybreakdownApi = new MachineryBreakdownApiSwaziland()
                else if (this.insuranceId == '100050') machinerybreakdownApi = new MachineryBreakdownApiNamibia()
              }
              loc = machinerybreakdownApi.getEditDetails(subDetails, loc);
              if (loc['GrossProfit'] != undefined && loc['IndustryType'] != undefined) {
                this.productItem.GrossProfit = loc['GrossProfit'];
                this.productItem.IncreasedCostOfWorking = loc['IncreasedCostOfWorking'];
                this.productItem.ClaimsPreparationCosts = loc['ClaimsPreparationCosts'];
                this.productItem.MClaimsPreparationCosts = loc['MClaimsPreparationCosts'];
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
            if (this.productId == '92' || this.productId == '39') {
              let fieldCostClaim = this.fieldMachinery;
              console.log('fieldCostClaim', fieldCostClaim);
              if (fieldCostClaim) {
                for (let field of fieldCostClaim) { if (field.key == 'ClaimsPreparationCosts' || field.key == 'MClaimsPreparationCosts') { field.props.options = this.glassClaimCost; } }
              }
            }
            else {
              let fieldCostClaim = this.fieldMachinery;
              for (let field of fieldCostClaim) { if (field.key == 'ClaimsPreparationCosts' || field.key == 'MClaimsPreparationCosts') { field.props.options = this.glassClaimCost; } }
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
          entry['GrossProfit'] = this.productItem.GrossProfit;
          entry['IncreasedCostOfWorking'] = this.productItem.IncreasedCostOfWorking;
          entry['ClaimsPreparationCosts'] = this.productItem.ClaimsPreparationCosts;
          entry['MClaimsPreparationCosts'] = this.productItem.MClaimsPreparationCosts;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let machineryApi = null;
        if (this.productId == '92') {
          machineryApi = new MachineryBreakdownCommercialApiNamibia();
          if (entry['GrossProfit'] != undefined && entry['IndustryType'] != undefined) {
            let machineryApilist: any = machineryApi.getSaveDetails(entry, this.glassClaimCost, this.productItem.IndustryId, this.industryTypeList, obj)
            if (machineryApilist) {
              let list = [];
              if (entry.SectionList) list = entry.SectionList.filter(ele => ele.SectionId != '46');
              if (machineryApilist.SectionList) machineryApilist.SectionList = machineryApilist.SectionList.concat(list)
              obj = machineryApilist
            }
          }
          else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        }
        else {
          if (this.insuranceId == '100046') machineryApi = new MachineryBreakdownApi();
          else if (this.insuranceId == '100047') machineryApi = new MachineryBreakdownApiBotswana();
          else if (this.insuranceId == '100048') machineryApi = new MachineryBreakdownApiMozambique();
          else if (this.insuranceId == '100049') machineryApi = new MachineryBreakdownApiSwaziland();
          else if (this.insuranceId == '100050') machineryApi = new MachineryBreakdownApiNamibia();
          if (entry['GrossProfit'] != undefined && entry['IndustryType'] != undefined) {
            let machineryApilist: any = machineryApi.getSaveDetails(entry, this.glassClaimCost, this.industryTypeList, obj)
            if (machineryApilist) {
              let list = [];
              if (entry.SectionList) list = entry.SectionList.filter(ele => ele.SectionId != '41');
              if (machineryApilist.SectionList) machineryApilist.SectionList = machineryApilist.SectionList.concat(list)
              obj = machineryApilist
            }
          }
          else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        }

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
  CommaFormattedCorp(event: KeyboardEvent, field) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) inputElement.value = String(inputElement.value).replace(/[^0-9.]|(?<=\-..*)\./g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return inputElement.value;
  }
  onKeyDown(event: KeyboardEvent, field) {
    const inputElement = event.target as HTMLInputElement;
    let maxLength = 0;
    maxLength = 19;
    if (inputElement.value.length >= maxLength) {
      event.preventDefault();
    }
  }
  skip() {
    this.skipSection.emit('Machinery Breakdown');
  }
  previous() {
    this.previousSection.emit(true);
  }
}
