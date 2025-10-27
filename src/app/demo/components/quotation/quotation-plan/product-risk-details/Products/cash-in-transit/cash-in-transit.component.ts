import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { CashInTransitNamibia } from '../../../models/namibia/CashinTransit/cashInTransit';
import { CashInTransitPhoenix } from '../../../models/phoneix/PhoenixZambia/CashinTransit/cashInTransit';
import { CashInTransitBotswana } from '../../../models/phoneix/PhoenixBotswana/CashinTransit/cashInTransit';
import { CashInTransitMozambique } from '../../../models/phoneix/PhoenixMozambique/CashinTransit/cashInTransit';
import { CashInTransitSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CashinTransit/cashInTransit';
import { CashInTransitApiPhoenix } from '../../../models/phoneix/PhoenixZambia/CashinTransit/cashInTransitApi';
import { CashInTransitApiBotswana } from '../../../models/phoneix/PhoenixBotswana/CashinTransit/cashInTransitApi';
import { CashInTransitApiMozambique } from '../../../models/phoneix/PhoenixMozambique/CashinTransit/cashInTransitApi';
import { CashInTransitApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CashinTransit/cashInTransitApi';
import { CashInTransitApiNamibia } from '../../../models/namibia/CashinTransit/cashInTransitApi';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-cash-in-transit',
  standalone: false,
  templateUrl: './cash-in-transit.component.html',
  styleUrls: ['./cash-in-transit.component.scss']
})
export class CashInTransitComponent {
  userType: any = null; productId: any = null;
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>(); countryId: any = null; brokerbranchCode: any = null;
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null;
  fieldCash: any[] = []; IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  cashClaimCost: any[] = [];
  CashInTransitTable: any[] = [];
  constructor(private sharedService: SharedService, private formBuilder: FormBuilder) {
    let Obj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || null);
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
    let data = null;
    if (this.insuranceId == '100046') data = new CashInTransitPhoenix(this.sharedService);
    if (this.insuranceId == '100047') data = new CashInTransitBotswana(this.sharedService);
    if (this.insuranceId == '100048') data = new CashInTransitMozambique(this.sharedService);
    if (this.insuranceId == '100049') data = new CashInTransitSwaziland(this.sharedService);
    if (this.insuranceId == '100050') data = new CashInTransitNamibia(this.sharedService)
    this.fieldCash[0] = data?.policyfields1.fieldGroup;
    this.CashInTransitTable = this.createCashInTransitTable(this.fieldCash[0]);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['form'] && this.form && this.fieldCash?.[0]) {
      this.addControlsForFields(this.fieldCash[0]);
    }
    if (changes['fieldCash'] && this.form && this.fieldCash?.[0]) {
      this.addControlsForFields(this.fieldCash[0]);
    }
  }
  ngOnInit() {
    if (this.locationList.length != 0) {
      this.onEditData();
    }
    this.CashInTransitTable = this.createCashInTransitTable(this.fieldCash[0]);
    if (this.fieldCash && this.fieldCash[0]) {
      for (const fieldGroup of this.fieldCash[0]) {
        if (fieldGroup.key && !this.form.controls[fieldGroup.key]) {
          // this.form.addControl(fieldGroup.key, this.sharedService.formBuilder.control(''));
        }
      }
    }
  }
  createCashInTransitTable(fields: any[]): any[] {
    const table: any[] = [];
    if (!fields) return table;
    // assuming each pair of fields forms one row (2 per row)
    for (let i = 0; i < fields.length; i += 2) {
      table.push([fields[i], fields[i + 1]]);
    }
    return table;
  }
  private addControlsForFields(fieldGroupArray: any[]) {
    for (const fieldGroup of fieldGroupArray) {
      const key = fieldGroup?.key;
      if (key && !this.form.contains(key)) {
        this.form.addControl(key, this.formBuilder.control('')); // or sharedService.formBuilder
      }
    }
  }
  CommaFormattedDynamic(event: KeyboardEvent, name: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      const numericValue = inputElement.value.replace(/[^0-9.]/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      inputElement.value = formattedValue;
      if (!name || !this.form.controls[name]) {
        return inputElement.value;
      } else {
        this.form.controls[name].setValue(inputElement.value, { emitEvent: false });
      }
    }
  }
  onEditData() {
    console.log("Locations On Edit", this.locationList);
    if (this.renderType == 'Direct') {
      let i = 0;
      for (let obj of this.locationList) {
        if (this.locationDetails[i]) {
          let cashInTransitApi = null, subDetails = this.locationDetails[i].SectionList;
          if (this.insuranceId == '100046') cashInTransitApi = new CashInTransitApiPhoenix();
          if (this.insuranceId == '100047') cashInTransitApi = new CashInTransitApiBotswana();
          if (this.insuranceId == '100048') cashInTransitApi = new CashInTransitApiMozambique();
          if (this.insuranceId == '100049') cashInTransitApi = new CashInTransitApiSwaziland();
          if (this.insuranceId == '100050') cashInTransitApi = new CashInTransitApiNamibia();
          obj = cashInTransitApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.cashStaticTransit = obj['cashStaticTransit'];
            this.productItem.cashVehicleTransit = obj['cashVehicleTransit'];
            this.productItem.cashContainer = obj['cashContainer'];
            this.productItem.cashPavementCarry = obj['cashPavementCarry'];
            this.productItem.cashSafeVault = obj['cashSafeVault'];
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
          if(loc.SectionList){
              let cashInTransitApi = null, subDetails = loc.SectionList;
              if (this.insuranceId == '100046') cashInTransitApi = new CashInTransitApiPhoenix();
              if (this.insuranceId == '100047') cashInTransitApi = new CashInTransitApiBotswana();
              if (this.insuranceId == '100048') cashInTransitApi = new CashInTransitApiMozambique();
              if (this.insuranceId == '100049') cashInTransitApi = new CashInTransitApiSwaziland();
              if (this.insuranceId == '100050') cashInTransitApi = new CashInTransitApiNamibia();
              loc = cashInTransitApi.getEditDetails(subDetails, loc);
          }
        if (loc.SectionList && this.tabIndex == i) {
            if(loc['cashStaticTransit']) this.productItem.cashStaticTransit = loc['cashStaticTransit'];
            if(loc['cashVehicleTransit']) this.productItem.cashVehicleTransit = loc['cashVehicleTransit'];
            if(loc['cashContainer']) this.productItem.cashContainer = loc['cashContainer'];
            if(loc['cashPavementCarry']) this.productItem.cashPavementCarry = loc['cashPavementCarry'];
            if(loc['cashSafeVault']) this.productItem.cashSafeVault = loc['cashSafeVault'];
            if(loc['IndustryType']) this.productItem.IndustryId = loc['IndustryType']
        }
        i += 1;
      }
    }
    console.log("Final Location", this.locationList)
  }
  //Industry Change
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  onProceedData(type) {
    console.log("Locations", this.locationList)
    let i = 0;
    // if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
    // else { this.IndustryError = false; }
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
          entry['cashStaticTransit'] = this.productItem.cashStaticTransit?.toString().replace(/,/g, '');
          entry['cashVehicleTransit'] = this.productItem.cashVehicleTransit?.toString().replace(/,/g, '');
          entry['cashContainer'] = this.productItem.cashContainer?.toString().replace(/,/g, '');
          entry['cashPavementCarry'] = this.productItem.cashPavementCarry?.toString().replace(/,/g, '');
          entry['cashSafeVault'] = this.productItem.cashSafeVault?.toString().replace(/,/g, '');
          entry['IndustryType'] = this.productItem.IndustryId;
           let cashInTransitApi = null;
            if (this.insuranceId == '100046') cashInTransitApi = new CashInTransitApiPhoenix();
            if (this.insuranceId == '100047') cashInTransitApi = new CashInTransitApiBotswana();
            if (this.insuranceId == '100048') cashInTransitApi = new CashInTransitApiMozambique();
            if (this.insuranceId == '100049') cashInTransitApi = new CashInTransitApiSwaziland();
            if (this.insuranceId == '100050') cashInTransitApi = new CashInTransitApiNamibia();
            if (entry['cashVehicleTransit'] != undefined && entry['cashContainer'] != undefined) {
              let cashApilist: any = cashInTransitApi.getSaveDetails(entry, obj)
              if (cashApilist) {
                let list = [];
                if (entry.SectionList) list = entry.SectionList.filter(ele => ele.SectionId != '237');
                if (cashApilist.SectionList) cashApilist.SectionList = cashApilist.SectionList.concat(list)
                obj = cashApilist
              }
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
          else {
            this.finalProceed.emit(res)
          }
        }
      }
    }
  }
  skip() {
    this.skipSection.emit('Cash In Transit');
  }
  previous() {
    this.previousSection.emit(true);
  }
  CommaFormattedValue(data: any) {
    if (data)
      data = String(data)
        .replace(/[^0-9.]|(?<=\-..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return data;
  }
  onKeyDown(event: KeyboardEvent, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length >= 19) {
      event.preventDefault();
    }
  }
}
