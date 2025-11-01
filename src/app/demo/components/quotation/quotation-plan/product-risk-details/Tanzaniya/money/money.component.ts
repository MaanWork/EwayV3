import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { Money } from '../../../models/Tanzaniya/Money';
import { MoneyApiTanzaniya } from '../../../models/Tanzaniya/Money/MoneyApi';
import { FormlyFieldConfig } from '@ngx-formly/core';
@Component({
  selector: 'money-tza',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyTZAComponent implements OnInit {
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  IndustryError: boolean=false;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  moneyClaimCost: any[] = [];MoneyTanzaniyaList:any[]=[];regionList:any[]=[];
  userType: any;productId: any;moneyLockerList: any[] = [];occupationList: any[]=[];fieldsMoneyTanzaniya: any[]=[];stateList: any[]=[];
  tableIndex: any=null;
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
    let fireData = new Money()
    let districtHooks = {
      onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.ongetDistrictList('change', null);
        });
      }
    };
    this.fieldsMoneyTanzaniya[0] = fireData?.fields;
    console.log("Form Here",this.fieldsMoneyTanzaniya)
    this.fieldsMoneyTanzaniya[0].fieldGroup[0].fieldGroup[0].hooks = districtHooks;
    this.getRegionList();
  }
  ngOnInit() {
    if (this.locationList.length != 0) {
      this.onEditData();
    }
  }
  onEditData() {
     let i = 0;
      for (let obj of this.locationList) {
        let subDetails = obj?.SectionList;
        if(subDetails && this.tabIndex==i){
            let Section = subDetails.filter(ele => ele['SectionId'] == '42');
            const coverMapping: Record<number, keyof typeof Section[0]> = {
              79: 'MoneyAnnualEstimate',
              81: 'MoneySafeLimit',
              82: 'MoneyOutofSafe',
              83: 'MoneyDirectorResidence',
              75: 'MoneyInTransit',
              76: 'MoneyCollector',
              77: 'MoneyInSafe'
            };
            const grouped: { [key: string]: any } = {};
            Section.forEach(ele => {
              const occ = ele.OtherOccupation;
              if (!grouped[occ]) {
                grouped[occ] = { OtherOccupation: occ };
              }
              const prop = coverMapping[ele.CoverId as keyof typeof coverMapping];
              if (prop) {
                grouped[occ][prop] = ele.SumInsured;
                grouped[occ]['DescriptionOfRisk'] = ele.DescriptionOfRisk;
                grouped[occ]['CoveringDetails'] = ele.CoveringDetails;
                grouped[occ]['RegionCode'] = ele.RegionCode;
                grouped[occ]['DistrictCode'] = ele.DistrictCode;
              }
            });
            this.productItem.IndustryId = String(Section[i].IndustryType)
            this.MoneyTanzaniyaList = Object.values(grouped);
        }
        i+=1;
      }
  }
  //Industry Change
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  addToTable(category) {
     if (category == 'MoneyTanzaniya') {
      var obj2 = {
        RegionCode: this.form.value.RegionCode,
        DistrictCode: this.form.value.DistrictCode,
        CoveringDetails: this.form.value.CoveringDetails,
        DescriptionOfRisk: this.form.value.DescriptionOfRisk,
        MoneyAnnualEstimate: this.form.value.MoneyAnnualEstimate,
        MoneyInTransit: this.form.value.MoneyInTransit,
        MoneyCollector: this.form.value.MoneyCollector,
        MoneySafeLimit: this.form.value.MoneySafeLimit,
        MoneyOutofSafe: this.form.value.MoneyOutofSafe,
        MoneyDirectorResidence: this.form.value.MoneyDirectorResidence,
        MoneyInSafe: this.form.value.MoneyInSafe
      }
      if (this.tableIndex !== undefined && this.tableIndex !== null && this.tableIndex > -1) this.MoneyTanzaniyaList[this.tableIndex] = obj2;
      else this.MoneyTanzaniyaList.push(obj2);
      this.tableIndex=null;
      this.form.reset();
    }
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
          let Api = new MoneyApiTanzaniya();
          let list: any = Api.getSaveDetails(entry, this.occupationList, this.industryTypeList, this.MoneyTanzaniyaList, entry.IndustryId, obj)
          if (list.SectionList.length != 0) { obj = list; console.log(obj); }
        }
        else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        locationList.push(obj);
        j += 1;
        if (j == this.locationList.length) {
          let res = { "locationList": locationList,"type": type}
          if (type == 'packageData') {this.saveSection.emit(res);}
          else { this.finalProceed.emit(res) }
        }
      }
    }
  }
  getRegionList() {
    let ReqObj = null, urlLink = null;
    if (this.productId == '104' || this.productId == '86' || this.productId == '106') {
      ReqObj = {
        "InsuranceId": this.insuranceId
      }
      urlLink = `${this.CommonApiUrl}api/agriculture/regionlist`;
    }
    else {
      ReqObj = {
        "InsuranceId": this.insuranceId,
        "ItemType": "REGION"
      }
      urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.regionList = data.Result;
          if (data.Result.length != 0) {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
            this.regionList = defaultObj.concat(data.Result);
            console.log(this.regionList, "this.regionList");
            let i = 0;
            for (let entry of this.regionList) {
              entry.label = entry['CodeDesc'];
              entry.value = entry['Code'];
              i += 1;
              if (i == this.regionList.length) {
                // let list = this.fieldsFarmCare[1]
                // console.log("Fields at Farm",this.fieldsFarmCare)
                // for(let field of list){
                //   if(field.key=='RegionCode'){
                //       field.props.options = this.regionList;
                //   }
                // }             
                let primaryList = this.fieldsMoneyTanzaniya[0].fieldGroup[0].fieldGroup;
                console.log("Fields at Farm", primaryList)
                for (let field of primaryList) {
                  if (field.key == 'RegionCode') {
                    if (field?.props?.options) field.props.options = this.regionList;
                    else field.templateOptions.options = this.regionList;
                  }
                }
              }
            }
          }
        }
      });
  }
  ongetDistrictList(type, value, code?) {
    let ReqObj, urlLink = null;
    let regionValue = this.productItem.RegionCode ? this.productItem.RegionCode : this.form.controls['RegionCode']?.value;
    if (type == 'region') {
      ReqObj = {
        "CountryId": this.countryId,
        "RegionCode": regionValue
      }
    }
    else {
      ReqObj = {
        "CountryId": this.countryId,
        "RegionCode": regionValue
      }
    }
    urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.stateList = data.Result;
          if (data.Result.length != 0) {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
            this.stateList = defaultObj.concat(data.Result);
            for (let i = 0; i < this.stateList.length; i++) {
              this.stateList[i].label = this.stateList[i]['CodeDesc'];
              this.stateList[i].value = this.stateList[i]['Code'];
              if (i == this.stateList.length - 1) {
                let  list = this.fieldsMoneyTanzaniya[0].fieldGroup[0].fieldGroup;
                for (let field of list) {
                  if (field.key == 'DistrictCode') {
                    field.props.options = this.stateList;
                    if (this.locationList[this.tabIndex].DistrictCode && (this.productId == '1' || this.productId == '106' || this.productId == '105')) { ; field.formControl.setValue(code) }
                  }
                }
              }
            }
          }
        }
      });
  }
  //this.finalProceed.emit(obj);
  skip() {
    this.skipSection.emit('Money');
  }
  previous() {
     let res = {
        "locationList": this.locationList,
        "type": 'Previous'
      }
    this.previousSection.emit(res);
  }
}
