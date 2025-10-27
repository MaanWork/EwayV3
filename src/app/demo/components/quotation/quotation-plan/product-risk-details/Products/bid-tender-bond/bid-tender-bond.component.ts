import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { BidTensionBondPPPhoenix } from '../../../models/phoneix/PhoenixZambia/GuranteePackagePlus/BidTension/BidTension';
import { BidTensionBondPPBotswana } from '../../../models/phoneix/PhoenixBotswana/GuranteePackagePlus/BidTension/BidTension';
import { BidTensionBondPPMozambique } from '../../../models/phoneix/PhoenixMozambique/GuranteePackagePlus/BidTension/BidTension';
import { BidTensionBondPPSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/GuranteePackagePlus/BidTension/BidTension';
import { BidTensionBondPPNamibia } from '../../../models/namibia/GuranteePackagePlus/BidTension/BidTension';
import { BidTensionBondPhoenix } from '../../../models/phoneix/PhoenixZambia/BidTension/BidTension';
import { BidTensionBondBotswana } from '../../../models/phoneix/PhoenixBotswana/BidTension/BidTension';
import { BidTensionBondMozambique } from '../../../models/phoneix/PhoenixMozambique/BidTension/BidTension';
import { BidTensionBondSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/BidTension/BidTension';
import { BidTensionBondNamibia } from '../../../models/namibia/BidTension/BidTension';
import { FormBuilder, FormControl } from '@angular/forms';
import { BidTensionBondApiPhoenix } from '../../../models/phoneix/PhoenixZambia/BidTension/BidTensionApi';
import { BidTensionBondApiBotswana } from '../../../models/phoneix/PhoenixBotswana/BidTension/BidTensionApi';
import { BidTensionBondApiMozambique } from '../../../models/phoneix/PhoenixMozambique/BidTension/BidTensionApi';
import { BidTensionBondApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/BidTension/BidTensionApi';
import { BidTensionBondApiNamibia } from '../../../models/namibia/BidTension/BidTensionApi';
@Component({
  selector: 'app-bid-tender-bond',
  standalone: false,
  templateUrl: './bid-tender-bond.component.html',
  styleUrls: ['./bid-tender-bond.component.scss']
})
export class BidTenderBondComponent {
  @Input() form: any; @Input() engineerData: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = []; productId: any = null;
  @Output() skipSection = new EventEmitter<any>(); userType: any = null;
  @Output() previousSection = new EventEmitter<any>();
  @Input() IsPackage: boolean; branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  IndustryError: boolean; BidTensionEngineerfields: any[] = []; BidTensionAdditionalfields: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  PeriodTypeList: any[] = []; CollateralTypeList: any[] = [];
  engineerObj: any;
  constructor(private sharedService: SharedService, private fb: FormBuilder) {
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
    this.form = this.fb.group({});
  }
  ngOnInit() {
    let fireData = null;
    if (this.productId == '101') {
      if (this.insuranceId == '100046') fireData = new BidTensionBondPPPhoenix();
      if (this.insuranceId == '100047') fireData = new BidTensionBondPPBotswana();
      if (this.insuranceId == '100048') fireData = new BidTensionBondPPMozambique();
      if (this.insuranceId == '100049') fireData = new BidTensionBondPPSwaziland();
      if (this.insuranceId == '100050') fireData = new BidTensionBondPPNamibia();
    }
    else {
      if (this.insuranceId == '100046') fireData = new BidTensionBondPhoenix();
      if (this.insuranceId == '100047') fireData = new BidTensionBondBotswana();
      if (this.insuranceId == '100048') fireData = new BidTensionBondMozambique();
      if (this.insuranceId == '100049') fireData = new BidTensionBondSwaziland();
      if (this.insuranceId == '100050') fireData = new BidTensionBondNamibia();
    }
    this.addControlsToForm(fireData.BidTensionEngineerfields.fieldGroup);
    this.addControlsToForm(fireData.BidTensionAdditionalfields.fieldGroup);
    this.BidTensionEngineerfields = this.sharedService.groupFields(fireData.BidTensionEngineerfields.fieldGroup);
    this.BidTensionAdditionalfields = this.sharedService.groupFields(fireData.BidTensionAdditionalfields.fieldGroup);
    this.getPeriodTypeList();
    this.getCollateralTypeList();
    if (this.locationList.length != 0) { this.onEditData(); }
  }
  onEditData() {
    if (this.renderType == 'Direct') {
      let i = 0;
      for (let obj of this.locationList) {
        if (this.locationDetails[i]) {
          let BidTensionApi = null, subDetails = this.locationDetails[i].SectionList;
          if (this.insuranceId == '100046') BidTensionApi = new BidTensionBondApiPhoenix();
          if (this.insuranceId == '100047') BidTensionApi = new BidTensionBondApiBotswana();
          if (this.insuranceId == '100048') BidTensionApi = new BidTensionBondApiMozambique();
          if (this.insuranceId == '100049') BidTensionApi = new BidTensionBondApiSwaziland();
          if (this.insuranceId == '100050') BidTensionApi = new BidTensionBondApiNamibia();
          obj = BidTensionApi.getEditDetails(subDetails, obj, this.engineerData);
          if (obj && this.tabIndex == i) {
            if (obj['ProjectSite']) this.productItem['ProjectSite'] = obj['ProjectSite'];
            if (obj['GrossProfitLc']) this.productItem['GrossProfitLc'] = obj['GrossProfitLc'];
            if (obj['FirstLossPercentId']) this.productItem['FirstLossPercentId'] = obj['FirstLossPercentId'];
            if (obj['BidTensionSumInsured']) this.productItem['BidTensionSumInsured'] = obj['BidTensionSumInsured'];
            if (obj['BTCollateralType']) this.productItem['BTCollateralType'] = obj['BTCollateralType'];
            if (obj['CollateralName']) this.productItem['CollateralName'] = obj['CollateralName'];
            if (obj['BTDescription']) this.productItem['BTDescription'] = obj['BTDescription'];
            if (obj['BTPrincipal']) this.productItem['BTPrincipal'] = obj['BTPrincipal'];
            if (obj['BTPeriodOfActivity']) this.productItem['BTPeriodOfActivity'] = obj['BTPeriodOfActivity'];
            if (obj['BTPeriodType']) this.productItem['BTPeriodType'] = obj['BTPeriodType'];
            if (obj['BTStartDate']) this.productItem['BTStartDate'] = obj['BTStartDate'];
          }
        }
        i += 1;
      }
    }
    else {
      let i = 0;
      for (let loc of this.locationList) {
        if (loc.SectionList && this.locationDetails[i]) {
          let BidTensionApi = null, subDetails = this.locationDetails[i].SectionList;
          if (this.insuranceId == '100046') BidTensionApi = new BidTensionBondApiPhoenix();
          if (this.insuranceId == '100047') BidTensionApi = new BidTensionBondApiBotswana();
          if (this.insuranceId == '100048') BidTensionApi = new BidTensionBondApiMozambique();
          if (this.insuranceId == '100049') BidTensionApi = new BidTensionBondApiSwaziland();
          if (this.insuranceId == '100050') BidTensionApi = new BidTensionBondApiNamibia();
          loc = BidTensionApi.getEditDetails(subDetails, loc, this.engineerData);
        }
        if (loc && this.tabIndex == i) {
          if (loc['ProjectSite']) this.productItem['ProjectSite'] = loc['ProjectSite'];
          if (loc['GrossProfitLc']) this.productItem['GrossProfitLc'] = loc['GrossProfitLc'];
          if (loc['FirstLossPercentId']) this.productItem['FirstLossPercentId'] = loc['FirstLossPercentId'];
          if (loc['BidTensionSumInsured']) this.productItem['BidTensionSumInsured'] = loc['BidTensionSumInsured'];
          if (loc['BTCollateralType']) this.productItem['BTCollateralType'] = loc['BTCollateralType'];
          if (loc['CollateralName']) this.productItem['CollateralName'] = loc['CollateralName'];
          if (loc['BTDescription']) this.productItem['BTDescription'] = loc['BTDescription'];
          if (loc['BTPrincipal']) this.productItem['BTPrincipal'] = loc['BTPrincipal'];
          if (loc['BTPeriodOfActivity']) this.productItem['BTPeriodOfActivity'] = loc['BTPeriodOfActivity'];
          if (loc['BTPeriodType']) this.productItem['BTPeriodType'] = loc['BTPeriodType'];
          if (loc['BTStartDate']) this.productItem['BTStartDate'] = loc['BTStartDate'];
        }
        i += 1;
      }
    }
    console.log("Edit Res", this.locationList)
  }
  private addControlsToForm(fields: any[]) {
    if (fields) {
      fields.forEach((field) => {
        if (field?.key) {
          this.form.addControl(field.key, new FormControl(''));
        }
        if (field?.fieldGroup) {
          this.addControlsToForm(field.fieldGroup);
        }
      });
    }
  }
  getPeriodTypeList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "Project Period"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.PeriodTypeList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.PeriodTypeList.length; i++) {
          this.PeriodTypeList[i].label = this.PeriodTypeList[i]['CodeDesc'];
          this.PeriodTypeList[i].value = this.PeriodTypeList[i]['Code'];
        }
        console.log(this.BidTensionAdditionalfields);
        let fieldlist = this.BidTensionAdditionalfields[2];
        if (fieldlist) {
          for (let field of fieldlist) {
            if (field.key == 'BTPeriodType') {
              field.props.options = this.PeriodTypeList
            }
          }
        }
      })
  }
  getCollateralTypeList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "Collateral Required"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.CollateralTypeList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.CollateralTypeList.length; i++) {
          this.CollateralTypeList[i].label = this.CollateralTypeList[i]['CodeDesc'];
          this.CollateralTypeList[i].value = this.CollateralTypeList[i]['Code'];
        }
        let fieldlist = this.BidTensionAdditionalfields[2];
        console.log("BT F", fieldlist);
        if (fieldlist) {
          for (let field of fieldlist) {
            if (field.key == 'BTCollateralType' || field.key == 'CollateralType') {
              field.props.options = this.CollateralTypeList
            }
          }
        }
      })
  }
  onProceedData(type) {
    let j = 0, locationList = [];
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
        obj['ProjectSite'] = entry['ProjectSite'] = this.productItem['ProjectSite'];
        obj['GrossProfitLc'] = entry['GrossProfitLc'] = this.productItem['GrossProfitLc'];
        obj['FirstLossPercentId'] = entry['FirstLossPercentId'] = this.productItem['FirstLossPercentId'];
        obj['BidTensionSumInsured'] = entry['BidTensionSumInsured'] = this.productItem['BidTensionSumInsured'];
        obj['BTCollateralType'] = entry['BTCollateralType'] = this.productItem['BTCollateralType'];
        obj['CollateralName'] = entry['CollateralName'] = this.productItem['CollateralName'];
        obj['BTPeriodType'] = entry['BTPeriodType'] = this.productItem['BTPeriodType'];
        obj['BTPrincipal'] = entry['BTPrincipal'] = this.productItem['BTPrincipal'];
        obj['BTDescription'] = entry['BTDescription'] = this.productItem['BTDescription'];
        obj['BTPeriodOfActivity'] = entry['BTPeriodOfActivity'] = this.productItem['BTPeriodOfActivity'];
        obj['BTStartDate'] = entry['BTStartDate'] = this.productItem['BTStartDate'];
      }
      else {
        if(entry['BTPeriodType']) obj['BTPeriodType'] = entry['BTPeriodType']
        if(entry['BTPrincipal']) obj['BTPrincipal'] = entry['BTPrincipal']
        if(entry['BTDescription']) obj['BTDescription'] = entry['BTDescription']
        if(entry['BTPeriodOfActivity']) obj['BTPeriodOfActivity'] = entry['BTPeriodOfActivity']
        if(entry['BTStartDate']) obj['BTStartDate'] = entry['BTStartDate']
      }
      let bidTenderRisk = null;
      if (this.insuranceId == '100046') bidTenderRisk = new BidTensionBondApiPhoenix();
      if (this.insuranceId == '100047') bidTenderRisk = new BidTensionBondApiBotswana();
      if (this.insuranceId == '100048') bidTenderRisk = new BidTensionBondApiMozambique();
      if (this.insuranceId == '100049') bidTenderRisk = new BidTensionBondApiSwaziland();
      if (this.insuranceId == '100050') bidTenderRisk = new BidTensionBondApiNamibia();
      if (entry['ProjectSite'] || entry['GrossProfitLc'] || entry['FirstLossPercentId'] || entry['BidTensionSumInsured'] || entry['BTCollateralType'] || entry['CollateralName']) {
        let constructionAllRiskList = bidTenderRisk.getSaveDetails(entry, entry.IndustryId, this.industryTypeList, obj)
        if (constructionAllRiskList) {
          obj = constructionAllRiskList;
        }
      }
      else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
      locationList.push(obj);
      j += 1;
      if (j == this.locationList.length) {
        let res = { "locationList": locationList, "type": type }
        console.log("Finallllll", locationList, this.engineerData)
         this.finalProceed.emit(res)
      }
    }
  }
  onDigitLimit(event: Event, num): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, num);
  }
  CommaFormattedDynamic(event: KeyboardEvent, name: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      const numericValue = inputElement.value.replace(/[^0-9.]/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      inputElement.value = formattedValue;
      if (!name || !this.form.controls[name]) {
        return inputElement.value;
      }
      else this.form.controls[name].setValue(inputElement.value, { emitEvent: false });
    }
  }
  onLetterLimit(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
  }
}
