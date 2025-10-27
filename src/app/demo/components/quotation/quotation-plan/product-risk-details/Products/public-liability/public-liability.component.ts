import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services';
import { PublicLiabilityPhoenix } from '../../../models/phoneix/PhoenixZambia/PublicLiability';
import { PublicLiabilityTanzaniya } from '../../../models/Tanzaniya/publicLiability/PublicLiability';
import { PublicLiabilityBotswana } from '../../../models/phoneix/PhoenixBotswana/publicLiability/PublicLiability';
import { PublicLiabilityMozambique } from '../../../models/phoneix/PhoenixMozambique/publicLiability/PublicLiability';
import { PublicLiabilitySwaziland } from '../../../models/phoneix/PhoenixSwazilnd/publicLiability/PublicLiability';
import { PublicLiabilityNamibia } from '../../../models/phoneix/PhoenixNamibia/publicLiability/PublicLiability';
import { PublicLiabilityApiPhoenix } from '../../../models/phoneix/PhoenixZambia/publicLiability/PublicLiabilityApi';
import { PublicLiabilityApiTanzaniya } from '../../../models/Tanzaniya/publicLiability/PublicLiabilityApi';
import { PublicLiabilityApiBotswana } from '../../../models/phoneix/PhoenixBotswana/publicLiability/PublicLiabilityApi';
import { PublicLiabilityApiMozambique } from '../../../models/phoneix/PhoenixMozambique/publicLiability/PublicLiabilityApi';
import { PublicLiabilityApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/publicLiability/PublicLiabilityApi';
import { PublicLiabilityCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/publicLiability/PublicLiability';
import { PublicLiabilityCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/publicLiability/PublicLiability';
import { PublicLiabilityCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/publicLiability/PublicLiability';
import { PublicLiabilityCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/publicLiability/PublicLiability';
import { PublicLiabilityCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/publicLiability/PublicLiability';
import { PublicLiabilityApiNamibia } from '../../../models/phoneix/PhoenixNamibia/publicLiability/PublicLiabilityApi';
import { PublicLiabilityCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/publicLiability/PublicLiabilityApi';
import { PublicLiabilityCommercialApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/publicLiability/PublicLiabilityApi';
import { PublicLiabilityCommercialApiMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/publicLiability/PublicLiabilityApi';
import { PublicLiabilityCommercialApiBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/publicLiability/PublicLiabilityApi';
import { PublicLiabilityCommercialApiPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/publicLiability/PublicLiabilityApi';

@Component({
  selector: 'app-public-liability',
  standalone: false,
  templateUrl: './public-liability.component.html',
  styleUrls: ['./public-liability.component.scss']
})
export class PublicLiabilityComponent {

  userType: any = null;
  productId: any = null;
  form2 = new FormGroup({});
  showExtensions = false;
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  publicFields: any[] = [];
  publicextentionsField: any[] = [];
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  publicClaimCost: any[] = [];
  IndemityRevenue: any[] = [];
  GeneralLiabilityList: any[] = [];
  ArrestList: any[] = [];
  LiabilityLegalList: any[] = [];
  ExtendsList: any[] = [];
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
    let contentData = null;
    if (this.productId == '92') {
      if (this.insuranceId == "100046") contentData = new PublicLiabilityCommercialPhoenix();
      else if (this.insuranceId == '100047') contentData = new PublicLiabilityCommercialBotswana();
      else if (this.insuranceId == '100048') contentData = new PublicLiabilityCommercialMozambique();
      else if (this.insuranceId == '100049') contentData = new PublicLiabilityCommercialSwaziland();
      else if (this.insuranceId == '100050') contentData = new PublicLiabilityCommercialNamibia();

      this.publicextentionsField = contentData?.extendsfields.fieldGroup;
      this.publicFields = contentData?.policyfields.fieldGroup;
      this.IndemityRevenue = contentData.policyfields1.fieldGroup;

    } else {
      if (this.insuranceId == '100046') contentData = new PublicLiabilityPhoenix();
      if (this.insuranceId == '100002') contentData = new PublicLiabilityTanzaniya();
      else if (this.insuranceId == '100047') contentData = new PublicLiabilityBotswana();
      else if (this.insuranceId == '100048') contentData = new PublicLiabilityMozambique();
      else if (this.insuranceId == '100049') contentData = new PublicLiabilitySwaziland();
      else if (this.insuranceId == '100050') contentData = new PublicLiabilityNamibia();
      this.publicextentionsField = contentData?.extendsfields.fieldGroup;
      this.publicFields = contentData?.policyfields.fieldGroup;
      this.IndemityRevenue = contentData.policyfields1.fieldGroup;

    }
    this.getClaimCostSi();
    this.getGeneralLiability();
    this.getArrestSi();
    this.getLiabilityLegalSi();
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
          let publicApi = null, subDetails = this.locationDetails[i]?.SectionList;
          if (this.productId == '92') {
            if (this.insuranceId == "100046") publicApi = new PublicLiabilityCommercialApiPhoenix();
            else if (this.insuranceId == '100047') publicApi = new PublicLiabilityCommercialApiBotswana();
            else if (this.insuranceId == '100048') publicApi = new PublicLiabilityCommercialApiMozambique();
            else if (this.insuranceId == '100049') publicApi = new PublicLiabilityCommercialApiSwaziland();
            else if (this.insuranceId == '100050') publicApi = new PublicLiabilityCommercialApiNamibia();
          }
          else {
            if (this.insuranceId == "100046") publicApi = new PublicLiabilityApiPhoenix();
            else if (this.insuranceId == '100047') publicApi = new PublicLiabilityApiBotswana();
            else if (this.insuranceId == '100048') publicApi = new PublicLiabilityApiMozambique();
            else if (this.insuranceId == '100049') publicApi = new PublicLiabilityApiSwaziland();
            else if (this.insuranceId == '100050') publicApi = new PublicLiabilityApiNamibia();
          }
          obj = publicApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.GeneralLiability = obj['GeneralLiability'];
            this.productItem.LegalDefenceCosts = obj['LegalDefenceCosts'];
            this.productItem.WrongfulArrestandDefamation = obj['WrongfulArrestandDefamation'];
            this.productItem.ProductsLiability = obj['ProductsLiability'];
            this.productItem.ProductsLiabilityRevenue = obj['ProductsLiabilityRevenue'];
            this.productItem.DefectiveWorkmanship = obj['DefectiveWorkmanship'];
            this.productItem.DefectiveWorkmanshipRevenue = obj['DefectiveWorkmanshipRevenue'];
            this.productItem.SpreadofFire = obj['SpreadofFire'];
            this.productItem.FoodandDrink = obj['FoodandDrink'];
            this.productItem.ForecourtServiceStationExtension = obj['ForecourtServiceStationExtension'];
            this.productItem.CarWashandValetExtension = obj['CarWashandValetExtension'];
            this.productItem.AdditionalclaimsPreparationCosts = obj['AdditionalclaimsPreparationCosts'];

            this.productItem.IndustryId = obj['IndustryType']

            if (obj['AdditionalclaimsPreparationCosts'] || obj['FoodandDrink'] || obj['SpreadofFire'] || obj['CarWashandValetExtension'] || obj['ForecourtServiceStationExtension']) {
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
          if (
            loc['GeneralLiability'] && loc['LegalDefenceCosts'] &&
            loc['WrongfulArrestandDefamation'] && loc['ProductsLiability']
          ) {
            this.productItem.GeneralLiability = loc['GeneralLiability'];
            this.productItem.LegalDefenceCosts = loc['LegalDefenceCosts'];
            this.productItem.WrongfulArrestandDefamation = loc['WrongfulArrestandDefamation'];
            this.productItem.ProductsLiability = loc['ProductsLiability'];
            this.productItem.ProductsLiabilityRevenue = loc['ProductsLiabilityRevenue'];
            this.productItem.DefectiveWorkmanship = loc['DefectiveWorkmanship'];
            this.productItem.DefectiveWorkmanshipRevenue = loc['DefectiveWorkmanshipRevenue'];
            this.productItem.SpreadofFire = loc['SpreadofFire'];
            this.productItem.FoodandDrink = loc['FoodandDrink'];
            this.productItem.ForecourtServiceStationExtension = loc['ForecourtServiceStationExtension'];
            this.productItem.CarWashandValetExtension = loc['CarWashandValetExtension'];
            this.productItem.AdditionalclaimsPreparationCosts = loc['AdditionalclaimsPreparationCosts'];
            this.productItem.IndustryId = loc['IndustryType']
            if (loc['AdditionalclaimsPreparationCosts'] || loc['FoodandDrink'] || loc['SpreadofFire'] || loc['CarWashandValetExtension'] || loc['ForecourtServiceStationExtension']) {
              this.showExtensions = true;
            }
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let publicApi = null, subDetails = this.locationDetails[i]?.SectionList;
              if (this.productId == '92') {
                if (this.insuranceId == "100046") publicApi = new PublicLiabilityCommercialApiPhoenix();
                else if (this.insuranceId == '100047') publicApi = new PublicLiabilityCommercialApiBotswana();
                else if (this.insuranceId == '100048') publicApi = new PublicLiabilityCommercialApiMozambique();
                else if (this.insuranceId == '100049') publicApi = new PublicLiabilityCommercialApiSwaziland();
                else if (this.insuranceId == '100050') publicApi = new PublicLiabilityCommercialApiNamibia();
              }
              else {
                if (this.insuranceId == "100046") publicApi = new PublicLiabilityApiPhoenix();
                else if (this.insuranceId == '100047') publicApi = new PublicLiabilityApiBotswana();
                else if (this.insuranceId == '100048') publicApi = new PublicLiabilityApiMozambique();
                else if (this.insuranceId == '100049') publicApi = new PublicLiabilityApiSwaziland();
                else if (this.insuranceId == '100050') publicApi = new PublicLiabilityApiNamibia();
              }
              loc = publicApi.getEditDetails(subDetails, loc);
              if (
                loc['GeneralLiability'] && loc['LegalDefenceCosts'] &&
                loc['WrongfulArrestandDefamation'] && loc['ProductsLiability']
              ) {
                this.productItem.GeneralLiability = loc['GeneralLiability'];
            this.productItem.LegalDefenceCosts = loc['LegalDefenceCosts'];
            this.productItem.WrongfulArrestandDefamation = loc['WrongfulArrestandDefamation'];
            this.productItem.ProductsLiability = loc['ProductsLiability'];
            this.productItem.ProductsLiabilityRevenue = loc['ProductsLiabilityRevenue'];
            this.productItem.DefectiveWorkmanship = loc['DefectiveWorkmanship'];
            this.productItem.DefectiveWorkmanshipRevenue = loc['DefectiveWorkmanshipRevenue'];
            this.productItem.SpreadofFire = loc['SpreadofFire'];
            this.productItem.FoodandDrink = loc['FoodandDrink'];
            this.productItem.ForecourtServiceStationExtension = loc['ForecourtServiceStationExtension'];
            this.productItem.CarWashandValetExtension = loc['CarWashandValetExtension'];
            this.productItem.AdditionalclaimsPreparationCosts = loc['AdditionalclaimsPreparationCosts'];
            this.productItem.IndustryId = loc['IndustryType']
            
                if (loc['AdditionalclaimsPreparationCosts'] || loc['FoodandDrink'] || loc['SpreadofFire'] || loc['CarWashandValetExtension'] || loc['ForecourtServiceStationExtension']) {
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

  getClaimCostSi() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "CLAIM_COST"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.ExtendsList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.ExtendsList.length; i++) {
          this.ExtendsList[i].label = this.ExtendsList[i]['CodeDesc'];
          this.ExtendsList[i].value = this.ExtendsList[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.ExtendsList.length - 1) {
            let ExtendsList = this.publicextentionsField;
            for (let field of ExtendsList) { if (field.key == 'AdditionalclaimsPreparationCosts') { field.props.options = this.ExtendsList; } }
            // let ArrestList = this.IndemityRevenue;
            // for(let field of ArrestList){if(field.key=='ProductLiability' || field.key=='DefectiveWorkmanship'  ){field.props.options = this.GeneralLiabilityList;}}
          }
        }
      })
  }

  getArrestSi() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "PUBLIC LIABILITY Wrongful Arrest"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.ArrestList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.ArrestList.length; i++) {
          this.ArrestList[i].label = this.ArrestList[i]['CodeDesc'];
          this.ArrestList[i].value = this.ArrestList[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.ArrestList.length - 1) {
            let ArrestList = this.publicFields;
            for (let field of ArrestList) { if (field.key == 'WrongfulArrestandDefamation') { field.props.options = this.ArrestList; } }
            // let ArrestList = this.IndemityRevenue;
            // for(let field of ArrestList){if(field.key=='ProductLiability' || field.key=='DefectiveWorkmanship'  ){field.props.options = this.GeneralLiabilityList;}}
          }
        }
      })
  }

  getLiabilityLegalSi() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "PUBLIC LIABILITY LEGAL"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.LiabilityLegalList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.LiabilityLegalList.length; i++) {
          this.LiabilityLegalList[i].label = this.LiabilityLegalList[i]['CodeDesc'];
          this.LiabilityLegalList[i].value = this.LiabilityLegalList[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.LiabilityLegalList.length - 1) {
            let LiabilityLegalList = this.publicFields;
            for (let field of LiabilityLegalList) { if (field.key == 'LegalDefenceCosts') { field.props.options = this.LiabilityLegalList; } }
            // let productLiabilityList = this.IndemityRevenue;
            // for(let field of productLiabilityList){if(field.key=='ProductLiability' || field.key=='DefectiveWorkmanship'  ){field.props.options = this.GeneralLiabilityList;}}
          }
        }
      })
  }
  getGeneralLiability() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "PUBLIC LIABILITY SUMINSURED"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.GeneralLiabilityList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.GeneralLiabilityList.length; i++) {
          this.GeneralLiabilityList[i].label = this.GeneralLiabilityList[i]['CodeDesc'];
          this.GeneralLiabilityList[i].value = this.GeneralLiabilityList[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.GeneralLiabilityList.length - 1) {
            let GeneralLiabilityList = this.publicFields;
            for (let field of GeneralLiabilityList) { if (field.key == 'GeneralLiability') { field.props.options = this.GeneralLiabilityList; } }
            let productLiabilityList1 = this.IndemityRevenue[0].fieldGroup[1].fieldGroup[0].fieldGroup;
            let productLiabilityList2 = this.IndemityRevenue[0].fieldGroup[1].fieldGroup[1].fieldGroup;
            console.log(productLiabilityList1, "productLiabilityListproductLiabilityList");
            for (let field of productLiabilityList1) { if (field.key == 'ProductsLiability' || field.key == 'DefectiveWorkmanship') { field.templateOptions.options = this.GeneralLiabilityList; } }
            for (let field of productLiabilityList2) { if (field.key == 'ProductsLiability' || field.key == 'DefectiveWorkmanship') { field.templateOptions.options = this.GeneralLiabilityList; } }
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
          entry['GeneralLiability'] = this.productItem.GeneralLiability;
          entry['LegalDefenceCosts'] = this.productItem.LegalDefenceCosts;
          entry['WrongfulArrestandDefamation'] = this.productItem.WrongfulArrestandDefamation;
          entry['ProductsLiability'] = this.productItem.ProductsLiability;
          entry['ProductsLiabilityRevenue'] = this.productItem.ProductsLiabilityRevenue;
          entry['DefectiveWorkmanship'] = this.productItem.DefectiveWorkmanship;
          entry['DefectiveWorkmanshipRevenue'] = this.productItem.DefectiveWorkmanshipRevenue;
          entry['SpreadofFire'] = this.productItem.SpreadofFire;
          entry['FoodandDrink'] = this.productItem.FoodandDrink;
          entry['ForecourtServiceStationExtension'] = this.productItem.ForecourtServiceStationExtension;
          entry['CarWashandValetExtension'] = this.productItem.CarWashandValetExtension;
          entry['AdditionalclaimsPreparationCosts'] = this.productItem.AdditionalclaimsPreparationCosts;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let publicApi = null;

        if (this.productId == '92') {
          if (this.insuranceId == "100046") publicApi = new PublicLiabilityCommercialApiPhoenix();
          else if (this.insuranceId == '100047') publicApi = new PublicLiabilityCommercialApiBotswana();
          else if (this.insuranceId == '100048') publicApi = new PublicLiabilityCommercialApiMozambique();
          else if (this.insuranceId == '100049') publicApi = new PublicLiabilityCommercialApiSwaziland();
          else if (this.insuranceId == '100050') publicApi = new PublicLiabilityCommercialApiNamibia();

          if (entry['ProductsLiability'] != undefined && entry['DefectiveWorkmanship'] != undefined) {
            let publicLiabilityList: any = publicApi.getSaveDetails(entry, this.GeneralLiabilityList, this.LiabilityLegalList,
              this.ArrestList, this.productItem.IndustryId, this.industryTypeList, obj, this.ExtendsList)
            if (publicLiabilityList) {
              let list = [];
              if (this.productId == '92') { if (entry.SectionList) { list = entry.SectionList.filter(ele => ele.SectionId != '54'); } }
              if (publicLiabilityList.SectionList) publicLiabilityList.SectionList = publicLiabilityList.SectionList.concat(list)
              obj = publicLiabilityList;
            }
          }
          else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        }
        else {
          if (this.insuranceId == "100046") publicApi = new PublicLiabilityApiPhoenix();
          else if (this.insuranceId == '100047') publicApi = new PublicLiabilityApiBotswana();
          else if (this.insuranceId == '100048') publicApi = new PublicLiabilityApiMozambique();
          else if (this.insuranceId == '100049') publicApi = new PublicLiabilityApiSwaziland();
          else if (this.insuranceId == '100050') publicApi = new PublicLiabilityApiNamibia();

          if (entry['ProductsLiability'] != undefined && entry['DefectiveWorkmanship'] != undefined) {
            let publicLiabilityList: any = publicApi.getSaveDetails(entry, this.GeneralLiabilityList, this.LiabilityLegalList, this.ArrestList, this.productItem.IndustryId, this.industryTypeList, obj);
            if (publicLiabilityList) {
              let list = [];
              if (this.productId == '92') { if (entry.SectionList) { list = entry.SectionList.filter(ele => ele.SectionId != '54'); } }
              if (publicLiabilityList.SectionList) publicLiabilityList.SectionList = publicLiabilityList.SectionList.concat(list)
              obj = publicLiabilityList;
            }
          }
          else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        }

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


  deleteRow(item: any, index: number, type: string) {
    if (!item || !type) return;

    // Confirm deletion (optional)
    // if (!confirm('Are you sure you want to delete this entry?')) return;

    const listName = `${type}List`;

    if (Array.isArray(item[listName]) && item[listName].length > index) {
      item[listName].splice(index, 1);
    }
  }


  skip() {
    this.skipSection.emit('Public Liability');
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
