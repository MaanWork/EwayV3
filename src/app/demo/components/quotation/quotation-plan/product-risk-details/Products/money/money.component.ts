import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { MoneyCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/Money/Money';
import { MoneyCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/Money/Money';
import { MoneyCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/Money/Money';
import { MoneyCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/Money/Money';
import { MoneyCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/Money/Money';
import { MoneyPhoenix } from '../../../models/phoneix/PhoenixZambia/Money';
import { MoneyBotswana } from '../../../models/phoneix/PhoenixBotswana/Money/Money';
import { MoneyMozambique } from '../../../models/phoneix/PhoenixMozambique/Money/Money';
import { MoneySwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Money/Money';
import { MoneyNamibia } from '../../../models/phoneix/PhoenixNamibia/Money/Money';
import { MoneyApiCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/Money/MoneyApi';
import { MoneyApiCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/Money/MoneyApi';
import { MoneyApiCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/Money/MoneyApi';
import { MoneyApiCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/Money/MoneyApi';
import { MoneyApiCommercialNamibia } from '../../../models/phoneix/PhoenixMocambique/CommercialPackagePlus/Money/MoneyApi';
import { MoneyApi } from '../../../models/phoneix/PhoenixZambia/Money/MoneyApi';
import { MoneyApiBotswana } from '../../../models/phoneix/PhoenixBotswana/Money/MoneyApi';
import { MoneyApiMozambique } from '../../../models/phoneix/PhoenixMozambique/Money/MoneyApi';
import { MoneyApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Money/MoneyApi';
import { MoneyApiNamibia } from '../../../models/phoneix/PhoenixNamibia/Money/MoneyApi';

@Component({
  selector: 'app-money',
  standalone: false,
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent implements OnInit {
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  fieldMoney: any[] = [];IndustryError: boolean=false;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  moneyClaimCost: any[] = [];
  userType: any;
  productId: any;
  moneyLockerList: any[] = [];
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
    this.getSafeLockerList();

    if (this.productId == '92') {
      let contentData = null;
      if (this.insuranceId == "100046") contentData = new MoneyCommercialPhoenix();
      else if (this.insuranceId == '100047') contentData = new MoneyCommercialBotswana();
      else if (this.insuranceId == '100048') contentData = new MoneyCommercialMozambique();
      else if (this.insuranceId == '100049') contentData = new MoneyCommercialSwaziland();
      else if (this.insuranceId == '100050') contentData = new MoneyCommercialNamibia();
      this.fieldMoney[0] = contentData.fields;
    } else {
      if (this.insuranceId == '100046') contentData = new MoneyPhoenix();
      else if (this.insuranceId == '100047') contentData = new MoneyBotswana();
      else if (this.insuranceId == '100048') contentData = new MoneyMozambique();
      else if (this.insuranceId == '100049') contentData = new MoneySwaziland();
      else if (this.insuranceId == '100050') contentData = new MoneyNamibia();
      this.fieldMoney[0] = contentData?.fields;
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
          let moneyApi = null, subDetails = this.locationDetails[i]?.SectionList;
          if (this.productId == '92') {
            if (this.insuranceId == "100046") moneyApi = new MoneyApiCommercialPhoenix();
            else if (this.insuranceId == '100047') moneyApi = new MoneyApiCommercialBotswana();
            else if (this.insuranceId == '100048') moneyApi = new MoneyApiCommercialMozambique();
            else if (this.insuranceId == '100049') moneyApi = new MoneyApiCommercialSwaziland();
            else if (this.insuranceId == '100050') moneyApi = new MoneyApiCommercialNamibia();
          }
          else {
            if (this.insuranceId == '100046') moneyApi = new MoneyApi();
            else if (this.insuranceId == '100047') moneyApi = new MoneyApiBotswana();
            else if (this.insuranceId == '100048') moneyApi = new MoneyApiMozambique();
            else if (this.insuranceId == '100049') moneyApi = new MoneyApiSwaziland();
            else if (this.insuranceId == '100050') moneyApi = new MoneyApiNamibia();
          }
          obj = moneyApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.SafeLockerGrade = obj['SafeLockerGrade'];
            this.productItem.MajorMoneyLimitDesc = obj['MajorMoneyLimitDesc'];
            this.productItem.MajorMoneyLimit = obj['MajorMoneyLimit'];
            this.productItem.SeasonalIncreaseDesc = obj['SeasonalIncreaseDesc'];
            this.productItem.SeasonalIncrease = obj['SeasonalIncrease'];
            this.productItem.ReceptaclesinexcessofpolicylimitDesc = obj['ReceptaclesinexcessofpolicylimitDesc'];
            this.productItem.Receptaclesinexcessofpolicylimit = obj['Receptaclesinexcessofpolicylimit'];
            this.productItem.ClothingPersonalEffectsofEmployeesDesc = obj['ClothingPersonalEffectsofEmployeesDesc'];
            this.productItem.ClothingPersonalEffectsofEmployees = obj['ClothingPersonalEffectsofEmployees'];
            this.productItem.LocksKeysofReceptacleDesc = obj['LocksKeysofReceptacleDesc'];
            this.productItem.LocksKeysofReceptacle = obj['LocksKeysofReceptacle'];
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
          if (
            loc['SafeLockerGrade'] &&
            loc['MajorMoneyLimitDesc'] && loc['MajorMoneyLimit'] &&
            loc['SeasonalIncreaseDesc'] && loc['SeasonalIncrease'] &&
            loc['ReceptaclesinexcessofpolicylimitDesc'] && loc['Receptaclesinexcessofpolicylimit'] &&
            loc['ClothingPersonalEffectsofEmployeesDesc'] && loc['ClothingPersonalEffectsofEmployees'] &&
            loc['LocksKeysofReceptacleDesc'] && loc['LocksKeysofReceptacle'] &&
            loc['IndustryType']
          ) {
            this.productItem.SafeLockerGrade = loc['SafeLockerGrade'];
            this.productItem.MajorMoneyLimitDesc = loc['MajorMoneyLimitDesc'];
            this.productItem.MajorMoneyLimit = loc['MajorMoneyLimit'];
            this.productItem.SeasonalIncreaseDesc = loc['SeasonalIncreaseDesc'];
            this.productItem.SeasonalIncrease = loc['SeasonalIncrease'];
            this.productItem.ReceptaclesinexcessofpolicylimitDesc = loc['ReceptaclesinexcessofpolicylimitDesc'];
            this.productItem.Receptaclesinexcessofpolicylimit = loc['Receptaclesinexcessofpolicylimit'];
            this.productItem.ClothingPersonalEffectsofEmployeesDesc = loc['ClothingPersonalEffectsofEmployeesDesc'];
            this.productItem.ClothingPersonalEffectsofEmployees = loc['ClothingPersonalEffectsofEmployees'];
            this.productItem.LocksKeysofReceptacleDesc = loc['LocksKeysofReceptacleDesc'];
            this.productItem.LocksKeysofReceptacle = loc['LocksKeysofReceptacle'];
            this.productItem.IndustryId = loc['IndustryType'];
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let moneyApi = null, subDetails = this.locationDetails[i]?.SectionList;
              if (this.productId == '92') {
                if (this.insuranceId == "100046") moneyApi = new MoneyApiCommercialPhoenix();
                else if (this.insuranceId == '100047') moneyApi = new MoneyApiCommercialBotswana();
                else if (this.insuranceId == '100048') moneyApi = new MoneyApiCommercialMozambique();
                else if (this.insuranceId == '100049') moneyApi = new MoneyApiCommercialSwaziland();
                else if (this.insuranceId == '100050') moneyApi = new MoneyApiCommercialNamibia();
              }
              else {
                if (this.insuranceId == '100046') moneyApi = new MoneyApi();
                else if (this.insuranceId == '100047') moneyApi = new MoneyApiBotswana();
                else if (this.insuranceId == '100048') moneyApi = new MoneyApiMozambique();
                else if (this.insuranceId == '100049') moneyApi = new MoneyApiSwaziland();
                else if (this.insuranceId == '100050') moneyApi = new MoneyApiNamibia();
              }
              loc = moneyApi.getEditDetails(subDetails, loc);
              if (
                loc['SafeLockerGrade'] && loc['SeasonalIncrease'] &&
                loc['IndustryType']
              ) {
                this.productItem.SafeLockerGrade = loc['SafeLockerGrade'];
                this.productItem.MajorMoneyLimitDesc = loc['MajorMoneyLimitDesc'];
                this.productItem.MajorMoneyLimit = loc['MajorMoneyLimit'];
                this.productItem.SeasonalIncreaseDesc = loc['SeasonalIncreaseDesc'];
                this.productItem.SeasonalIncrease = loc['SeasonalIncrease'];
                this.productItem.ReceptaclesinexcessofpolicylimitDesc = loc['ReceptaclesinexcessofpolicylimitDesc'];
                this.productItem.Receptaclesinexcessofpolicylimit = loc['Receptaclesinexcessofpolicylimit'];
                this.productItem.ClothingPersonalEffectsofEmployeesDesc = loc['ClothingPersonalEffectsofEmployeesDesc'];
                this.productItem.ClothingPersonalEffectsofEmployees = loc['ClothingPersonalEffectsofEmployees'];
                this.productItem.LocksKeysofReceptacleDesc = loc['LocksKeysofReceptacleDesc'];
                this.productItem.LocksKeysofReceptacle = loc['LocksKeysofReceptacle'];
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

  getSafeLockerList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "Safe_Locker_Grade"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.moneyLockerList = defaultObj.concat(data.Result);
        let i = 0
        for (let entry of this.moneyLockerList) {
          entry['label'] = entry.CodeDesc; entry['value'] = entry.Code;
          i += 1;
          if (i == this.moneyLockerList.length) {
            let fieldList = [];
            if (this.productId == '92' || this.productId == '16') {
              let field11 = this.fieldMoney[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
              if (field11) {
                for (let i = 0; i < field11.length; i++) {
                  for (let j = 0; j < field11[i].fieldGroup.length; j++) {
                    if (field11[i].fieldGroup[j].key == 'SafeLockerGrade') { field11[i].fieldGroup[j].templateOptions.options = this.moneyLockerList; }
                  }
                }
              }
            }
            else fieldList = this.fieldMoney[0]?.fieldGroup[0]?.fieldGroup;
            for (let field of fieldList) {
              if (field.key == 'SafeLockerGrade') { field.templateOptions.options = this.moneyLockerList }
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
          entry['SafeLockerGrade'] = this.productItem.SafeLockerGrade;
          entry['MajorMoneyLimitDesc'] = this.productItem.MajorMoneyLimitDesc;
          entry['MajorMoneyLimit'] = this.productItem.MajorMoneyLimit;
          entry['SeasonalIncreaseDesc'] = this.productItem.SeasonalIncreaseDesc;
          entry['SeasonalIncrease'] = this.productItem.SeasonalIncrease;
          entry['ReceptaclesinexcessofpolicylimitDesc'] = this.productItem.ReceptaclesinexcessofpolicylimitDesc;
          entry['Receptaclesinexcessofpolicylimit'] = this.productItem.Receptaclesinexcessofpolicylimit;
          entry['ClothingPersonalEffectsofEmployeesDesc'] = this.productItem.ClothingPersonalEffectsofEmployeesDesc;
          entry['ClothingPersonalEffectsofEmployees'] = this.productItem.ClothingPersonalEffectsofEmployees;
          entry['LocksKeysofReceptacleDesc'] = this.productItem.LocksKeysofReceptacleDesc;
          entry['LocksKeysofReceptacle'] = this.productItem.LocksKeysofReceptacle;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let moneyApi = null;
        if (this.productId == '92') {
          if (this.insuranceId == "100046") moneyApi = new MoneyApiCommercialPhoenix();
          else if (this.insuranceId == '100047') moneyApi = new MoneyApiCommercialBotswana();
          else if (this.insuranceId == '100048') moneyApi = new MoneyApiCommercialMozambique();
          else if (this.insuranceId == '100049') moneyApi = new MoneyApiCommercialSwaziland();
          else if (this.insuranceId == '100050') moneyApi = new MoneyApiCommercialNamibia();
        }
        else {
          if (this.insuranceId == '100046') moneyApi = new MoneyApi();
          else if (this.insuranceId == '100047') moneyApi = new MoneyApiBotswana();
          else if (this.insuranceId == '100048') moneyApi = new MoneyApiMozambique();
          else if (this.insuranceId == '100049') moneyApi = new MoneyApiSwaziland();
          else if (this.insuranceId == '100050') moneyApi = new MoneyApiNamibia();
        }

        if (entry['MajorMoneyLimit'] != undefined && entry['SeasonalIncrease'] != undefined && entry['IndustryType'] != undefined) {
          let moneyApilist: any = moneyApi.getSaveDetails(entry, this.productItem.IndustryId, this.industryTypeList, obj)
          if (moneyApilist) { 
              let list =[];
             if (this.productId == '92') {  if(entry.SectionList){list = entry.SectionList.filter(ele=>ele.SectionId!='42');}}
              if(moneyApilist.SectionList) moneyApilist.SectionList = moneyApilist.SectionList.concat(list)
              obj= moneyApilist;
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
    this.skipSection.emit('Money');
  }
  previous() {
    this.previousSection.emit(true);
  }
}

