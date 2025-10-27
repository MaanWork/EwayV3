import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeteriorationOfStockNamibia } from '../../../models/phoneix/PhoenixNamibia/Deteroitation/Deteroitation';
import { DeteriorationOfStockPhoenix } from '../../../models/phoneix/PhoenixZambia/Deteroitation/Deteroitation';
import { DeteriorationOfStockBotswana } from '../../../models/phoneix/PhoenixBotswana/Deteroitation/Deteroitation';
import { DeteriorationOfStockMozambique } from '../../../models/phoneix/PhoenixMozambique/Deteroitation/Deteroitation';
import { DeteriorationOfStockSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Deteroitation/Deteroitation';
import { DeteriorationOfStockApiPhoenix } from '../../../models/phoneix/PhoenixZambia/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockApiBotswana } from '../../../models/phoneix/PhoenixBotswana/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockApiMozambique } from '../../../models/phoneix/PhoenixMozambique/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockApiNamibia } from '../../../models/phoneix/PhoenixNamibia/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockCommercialApiBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockCommercialApiMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockCommercialApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockCommercialApiPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/Deteroitation/DeteroitationApi';
import { DeteriorationOfStockCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/Deteroitation/Deteroitation';
import { DeteriorationOfStockCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/Deteroitation/Deteroitation';
import { DeteriorationOfStockCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/Deteroitation/Deteroitation';
import { DeteriorationOfStockCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/Deteroitation/Deteroitation';
import { DeteriorationOfStockCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/Deteroitation/Deteroitation';
@Component({
  selector: 'app-detoriation-of-stock',
  standalone: false,
  templateUrl: './detoriation-of-stock.component.html',
  styleUrls: ['./detoriation-of-stock.component.scss']
})
export class DetoriationOfStockComponent {
  deteriorationOfStockDescError: boolean = false; userType: any = null;
  deteriorationOfStockError: boolean = false; productId: any = null;
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  fieldEE: any[] = [];
  IndustryError: boolean;
  constructor() {
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
    let contentData4 = null;
    if (this.productId == '92') {
      if (this.insuranceId == "100046") contentData4 = new DeteriorationOfStockCommercialPhoenix();
      else if (this.insuranceId == '100047') contentData4 = new DeteriorationOfStockCommercialBotswana();
      else if (this.insuranceId == '100048') contentData4 = new DeteriorationOfStockCommercialMozambique();
      else if (this.insuranceId == '100049') contentData4 = new DeteriorationOfStockCommercialSwaziland();
      else if (this.insuranceId == '100050') contentData4 = new DeteriorationOfStockCommercialNamibia();
    }
    else {
      if (this.insuranceId == '100046') contentData4 = new DeteriorationOfStockPhoenix();
      else if (this.insuranceId == '100047') contentData4 = new DeteriorationOfStockBotswana();
      else if (this.insuranceId == '100048') contentData4 = new DeteriorationOfStockMozambique();
      else if (this.insuranceId == '100049') contentData4 = new DeteriorationOfStockSwaziland();
      else if (this.insuranceId == '100050') contentData4 = new DeteriorationOfStockNamibia();
    }
    this.fieldEE[0] = contentData4?.fields;
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
          let deterApi = null, subDetails = this.locationDetails[i].SectionList;
          if (this.productId == '92') {
            if (this.insuranceId == "100046") deterApi = new DeteriorationOfStockCommercialApiPhoenix();
            else if (this.insuranceId == '100047') deterApi = new DeteriorationOfStockCommercialApiBotswana();
            else if (this.insuranceId == '100048') deterApi = new DeteriorationOfStockCommercialApiMozambique();
            else if (this.insuranceId == '100049') deterApi = new DeteriorationOfStockCommercialApiSwaziland();
            else if (this.insuranceId == '100050') deterApi = new DeteriorationOfStockCommercialApiNamibia();
          } else {
            if (this.insuranceId == '100046') deterApi = new DeteriorationOfStockApiPhoenix();
            else if (this.insuranceId == '100047') deterApi = new DeteriorationOfStockApiBotswana();
            else if (this.insuranceId == '100048') deterApi = new DeteriorationOfStockApiMozambique();
            else if (this.insuranceId == '100049') deterApi = new DeteriorationOfStockApiSwaziland();
            else if (this.insuranceId == '100050') deterApi = new DeteriorationOfStockApiNamibia();
          }
          obj = deterApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.DeteriorationOfStock = obj['DeteriorationOfStock'];
            this.productItem.DeteriorationOfStockDesc = obj['DeteriorationOfStockDesc'];
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
          if (loc['DeteriorationOfStock'] != undefined && loc['DeteriorationOfStockDesc'] != undefined && loc['IndustryType'] != undefined) {
            this.productItem.DeteriorationOfStock = loc['DeteriorationOfStock'];
            this.productItem.DeteriorationOfStockDesc = loc['DeteriorationOfStockDesc'];
            this.productItem.IndustryId = loc['IndustryType']
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let deterApi = null, subDetails = this.locationDetails[i].SectionList;
              if (this.productId == '92') {
                if (this.insuranceId == "100046") deterApi = new DeteriorationOfStockCommercialApiPhoenix();
                else if (this.insuranceId == '100047') deterApi = new DeteriorationOfStockCommercialApiBotswana();
                else if (this.insuranceId == '100048') deterApi = new DeteriorationOfStockCommercialApiMozambique();
                else if (this.insuranceId == '100049') deterApi = new DeteriorationOfStockCommercialApiSwaziland();
                else if (this.insuranceId == '100050') deterApi = new DeteriorationOfStockCommercialApiNamibia();
              } else {
                if (this.insuranceId == '100046') deterApi = new DeteriorationOfStockApiPhoenix();
                else if (this.insuranceId == '100047') deterApi = new DeteriorationOfStockApiBotswana();
                else if (this.insuranceId == '100048') deterApi = new DeteriorationOfStockApiMozambique();
                else if (this.insuranceId == '100049') deterApi = new DeteriorationOfStockApiSwaziland();
                else if (this.insuranceId == '100050') deterApi = new DeteriorationOfStockApiNamibia();
              }
              loc = deterApi.getEditDetails(subDetails, loc);
              if(loc){
                  if (loc['DeteriorationOfStock'] != undefined && loc['DeteriorationOfStockDesc'] != undefined && loc['IndustryType'] != undefined) {
                    this.productItem.DeteriorationOfStock = loc['DeteriorationOfStock'];
                    this.productItem.DeteriorationOfStockDesc = loc['DeteriorationOfStockDesc'];
                    this.productItem.IndustryId = loc['IndustryType']
                  }
              } 
              
            }
          }
        }
        i += 1;
      }
    }
  }
  onProceedData(type) {
    console.log("Locations", this.locationList)
    let i = 0;
    if (this.productItem.DeteriorationOfStock == '' || this.productItem.DeteriorationOfStock == null || this.productItem.DeteriorationOfStock == undefined || this.productItem.DeteriorationOfStock == '0') { i += 1; this.deteriorationOfStockError = true; }
    else { this.deteriorationOfStockError = false; }
    if (this.productItem.DeteriorationOfStockDesc == '' || this.productItem.DeteriorationOfStockDesc == null || this.productItem.DeteriorationOfStockDesc == undefined || this.productItem.DeteriorationOfStockDesc == '0') { i += 1; this.deteriorationOfStockDescError = true; }
    else { this.deteriorationOfStockDescError = false; }
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
          "BuildingAddress": entry.BuildingAddress,
          "SectionList": []
        }
        if (j == this.tabIndex) {
          entry['DeteriorationOfStock'] = this.productItem.DeteriorationOfStock;
          entry['DeteriorationOfStockDesc'] = this.productItem.DeteriorationOfStockDesc;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let deterApi = null;
        if (this.productId == '92') {
          if (this.insuranceId == "100046") deterApi = new DeteriorationOfStockCommercialApiPhoenix();
          else if (this.insuranceId == '100047') deterApi = new DeteriorationOfStockCommercialApiBotswana();
          else if (this.insuranceId == '100048') deterApi = new DeteriorationOfStockCommercialApiMozambique();
          else if (this.insuranceId == '100049') deterApi = new DeteriorationOfStockCommercialApiSwaziland();
          else if (this.insuranceId == '100050') deterApi = new DeteriorationOfStockCommercialApiNamibia();
        } else {
          if (this.insuranceId == '100046') deterApi = new DeteriorationOfStockApiPhoenix();
          else if (this.insuranceId == '100047') deterApi = new DeteriorationOfStockApiBotswana();
          else if (this.insuranceId == '100048') deterApi = new DeteriorationOfStockApiMozambique();
          else if (this.insuranceId == '100049') deterApi = new DeteriorationOfStockApiSwaziland();
          else if (this.insuranceId == '100050') deterApi = new DeteriorationOfStockApiNamibia();
        }
        if (entry['DeteriorationOfStock'] != undefined && entry['IndustryType'] != undefined && entry['DeteriorationOfStockDesc'] != undefined) {
         let deterApilist: any = deterApi.getSaveDetails(entry,this.industryTypeList, obj)
            if (deterApilist) { 
              let list =[];
             if (this.productId == '92') {  if(entry.SectionList){list = entry.SectionList.filter(ele=>ele.SectionId!='226');}}
              if(deterApilist.SectionList) deterApilist.SectionList = deterApilist.SectionList.concat(list)
              obj= deterApilist;
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
          if (type == 'packageData') {
            this.saveSection.emit(res);
          }
          else { this.finalProceed.emit(res) }
        }
      }
    }
  }
  //Industry Change
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  skip() {
    this.skipSection.emit('Deterioration');
  }
  previous() {
    this.previousSection.emit(true);
  }
}
