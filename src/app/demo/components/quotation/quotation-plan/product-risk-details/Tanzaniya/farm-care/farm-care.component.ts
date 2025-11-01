import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
import { FarmCareTanzaniya } from '../../../models/Tanzaniya/FarmCare/FarmCare';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SharedService } from '@app/shared/shared.service';
import { FarmCareApiTanzaniya } from '../../../models/Tanzaniya/FarmCare/FarmCareApi';
@Component({
  selector: 'farm-care-tza',
  templateUrl: './farm-care.component.html',
  styleUrl: './farm-care.component.scss'
})
export class FarmCareTZAComponent {
  userType: any = null;stateList:any[]=[];distributorList:any[]=[];
  productId: any = null;fieldsFarmCare:any[]=[];fieldsFarmCarePrimary:any[]=[];regionList:any[]=[];
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;coveragePercentList:any[]=[];
  @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  IndustryError: boolean;fieldsCARupto:any[]=[];coverageList:any[]=[];cropTypeList:any[]=[];
    public AppConfig: any = (Mydatas as any).default;districtList:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  AEValue: any;
  constructor(private sharedService:SharedService){
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
    let fireData = null;
    if (this.productId == '86') {
      fireData = new FarmCareTanzaniya();
      if (fireData) {
        this.fieldsFarmCare = this.groupFields(fireData.CARuptofields.fieldGroup);
        this.fieldsFarmCarePrimary = this.groupFields(fireData.constructionCARuptofields.fieldGroup);
        let list = this.fieldsFarmCare[1]
        let primaryList = this.fieldsFarmCarePrimary[0]
        console.log("Fields at Farm", this.fieldsFarmCare)
        let regionHooks = {
          onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.ongetDistrictList('change', null)
            });
          }
        }
        let regionHooksAlt = {
          onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.ongetDistrictList('change', null)
            });
          }
        }
        for (let field of primaryList) {
          if (field.key == 'RegionCode') {
            field.hooks = regionHooksAlt;
          }
        }
        //this.getCropList();
        this.getCoveragePercentList();
        this.getCoverageList(); this.getRegionList();
        this.getDistributorList()
      }
    }
  }
  ngOnInit(){
     if (this.locationList.length != 0) {
      this.onEditData();
    }
  }
  onEditData() {
    console.log("Locations On Edit", this.locationList);
    let i = 0;
    for (let obj of this.locationList) {
        let subDetails = null;
        if(obj.SectionList){
          subDetails=obj.SectionList;
           let farmCareApi = new FarmCareApiTanzaniya();
           obj = farmCareApi.getEditDetails(subDetails, obj);
        }
         if(this.tabIndex==i && obj.SectionList){
              if (obj?.DistributorCode) this.productItem['DistributorCode'] = obj?.DistributorCode;
              if (obj?.DistributorName) this.productItem['DistributorName'] = obj?.DistributorName;
              if (obj?.RegionCode) this.productItem['RegionCode'] = obj?.RegionCode;
              if (obj?.DistrictCode) this.productItem['DistrictCode'] = obj?.DistrictCode;
              if (obj?.Crop) this.productItem['Crop'] = obj?.Crop;
              if (obj?.YaraPackageYN) this.productItem['YaraPackageYN'] = obj?.YaraPackageYN;
              if (obj?.CoverageID) this.productItem['CoverageID'] = obj?.CoverageID;
              if (obj?.NoOfAcres) this.productItem['NoOfAcres'] = obj?.NoOfAcres;
              if (obj?.farmCareSumInsured) this.productItem['farmCareSumInsured'] = obj?.farmCareSumInsured;
              if (obj?.FirstLossPercentId) this.productItem['FirstLossPercentId'] = obj?.FirstLossPercentId;
              this.ongetDistrictCropList('direct', null);
         }
    }
  }
  getDistributorList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "DISTRIBUTOR"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.distributorList = defaultObj.concat(data.Result);
        let i = 0
        for (let entry of this.distributorList) {
          entry['label'] = entry.CodeDesc; entry['value'] = entry.Code;
          i += 1;
          if (i == this.distributorList.length) {
            let list = this.fieldsFarmCare[0]
            if (list) {
              for (let field of list) {
                if (field.key == 'DistributorCode') {
                  field.props.options = this.distributorList;
                }
              }
            }
          }
        }
      });
  }
  getCoverageList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "FARM_BUILDING"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.coverageList = defaultObj.concat(data.Result);
        let i = 0
        for (let entry of this.coverageList) {
          entry['label'] = entry.CodeDesc; entry['value'] = entry.Code;
          i += 1;
          if (i == this.coverageList.length) {
            let list = this.fieldsFarmCarePrimary[2];
            if (list) {
              for (let field of list) {
                if (field.key == 'CoverageID') {
                  field.props.options = this.coverageList;
                }
              }
            }
          }
        }
      });
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
                let primaryList = this.fieldsFarmCarePrimary[0];
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
  getCoveragePercentList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "COVERAGE_PERCENTAGE"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.coveragePercentList = defaultObj.concat(data.Result);
        let i = 0
        for (let entry of this.coveragePercentList) {
          entry['label'] = entry.CodeDesc; entry['value'] = entry.Code;
          i += 1;
          if (i == this.coveragePercentList.length) {
            let list = this.fieldsFarmCarePrimary[2]
            for (let field of list) {
              if (field.key == 'FirstLossPercentId') {
                field.props.options = this.coveragePercentList;
              }
            }
          }
        }
      });
  }
  ongetDistrictList(type, value, code?) {
    let ReqObj, urlLink = null;
    let regionValue = this.productItem.RegionCode ? this.productItem.RegionCode : this.productItem['RegionCode'];
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
                let  list = this.fieldsFarmCarePrimary[0];
                for (let field of list) {
                  if (field.key == 'DistrictCode') {
                    field.props.options = this.stateList;
                    if (this.locationList[this.tabIndex].DistrictCode && (this.productId == '1' || this.productId == '106' || this.productId == '105')) {  field.formControl.setValue(code) }
                  }
                }
              }
            }
          }
        }
      });
  }
  private groupFields(fields: any[]): any[] {
    const grouped: any[] = [];
    const visibleFields = fields.filter(field => !field.hide);
    const newLineFields = ['IndemnityPeriod']; // Fields that must always start a new line
    let tempGroup: any[] = [];
    for (let i = 0; i < visibleFields.length; i++) {
      const field = visibleFields[i];
      if (newLineFields.includes(field.key)) {
        // Push any existing group before adding new-line field
        if (tempGroup.length > 0) {
          grouped.push(tempGroup);
          tempGroup = [];
        }
        grouped.push([field]); // Push IndemnityPeriod alone
      } else {
        // Pair fields together
        if (tempGroup.length === 0 || tempGroup.length === 1) {
          tempGroup.push(field);
        }
        if (tempGroup.length === 2) {
          grouped.push(tempGroup);
          tempGroup = [];
        }
      }
    }
    // Push remaining group if not empty
    if (tempGroup.length > 0) {
      grouped.push(tempGroup);
    }
    console.log(grouped);
    return grouped;
  }
  checkFarmSIDisabled(key) {
    if (key == 'farmCareSumInsured') {
      if (this.productItem['YaraPackageYN'] == 'Y') return true;
      else return false;
    }
    else return false
  }
  onChangeDropdown(key, type) {
    if (key == 'RegionCode') { if (this.productId == '106') this.ongetDistrictList('change', null); else this.ongetDistrictCropList(type, null) }
    if (key == 'DistrictCode') { this.ongetAgriCropList(type, null) }
    if (key == 'Crop') { this.onSetCropHAVal(type, null) }
    if (key == 'FirstLossPercentId' || key == 'NoOfAcres') this.onChangeYaraYN('change')
  }
  onDropdownChange(key) {
    if (key == 'RegionCode') this.ongetDistrictList('Region', null)
  }
onChangeYaraYN(type) {
  if (this.productItem['YaraPackageYN'] == 'Y') {
    let val = this.productItem['NoOfAcres'];
    let val2 = this.coveragePercentList.find(ele => ele.Code == this.productItem['FirstLossPercentId'])?.CodeDesc, val4 = null;
    let val3 = this.cropTypeList.find(ele => ele.CropId == this.productItem['Crop']);
    if (val3) { let entry = String(val3?.PerHACost).split('.'); val4 = entry[0] }
    if (val != null && val != '' && val != 0 && val != undefined && val2 != null && val2 != '' && val2 != 0 && val4 != null) {
      if (this.productItem['YaraPackageYN'] == 'Y') {
        this.productItem['farmCareSumInsured'] =Number(val) * (Number(val4) * (Number(val2) / 100))
      }
    }
  }
  else {
    if (this.productItem['NoOfAcres']) { this.productItem['farmCareSumInsured'] ='0' }
  }
}
onSetCropHAVal(type, value) {
    let val = this.productItem['Crop'];
    let obj = this.cropTypeList.find(ele => ele.CropId == val)
    if (obj) {
      if (this.productId == '104') {
        this.productItem['HACost'] = obj?.PerHACost
        let landSize = this.productItem['landSize'];
        if (landSize != '' && landSize != null && landSize != undefined) {
          this.onCheckSumInsured({ "target": { "value": landSize } }, 'landSize')
        }
      }
    }
  }
  onCheckSumInsured(event: any, key: string) {
    let inputValue = event.target.value;
    if (key === 'landSize') {
      inputValue = inputValue.replace(/[^0-9.]/g, '');
      const parts = inputValue.split('.');
      if (parts.length > 2) {
        inputValue = parts[0] + '.' + parts.slice(1).join('');
      }
      event.target.value = inputValue;
      this.productItem['landSize'] =inputValue;
    }
    const landSize = Number(this.productItem['landSize']);
    const haCost = Number(this.productItem['HACost']);
    if (!isNaN(landSize) && !isNaN(haCost)) {
      const result = landSize * haCost;
      const formattedResult = result.toLocaleString('en-US', {
        maximumFractionDigits: 3
      });
      this.productItem['AgricultureSumInsured'] = formattedResult;
    }
  }
  ongetAgriCropList(type, value) {
    let val = this.productItem['DistrictCode'];
    if (val) {
      let obj = this.districtList.find(ele => ele.DistrictId == val);
      console.log("Distr", this.districtList, val, obj)
      if (obj) {
        this.AEValue = obj?.AEZ;
        if (obj.CropList) {
          let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '', 'CropDesc': '-Select-', 'CropId': '' }]
          this.cropTypeList = defaultObj.concat(obj.CropList);
          for (let i = 0; i < this.cropTypeList.length; i++) {
            this.cropTypeList[i].label = this.cropTypeList[i]['CropDesc'];
            this.cropTypeList[i].value = this.cropTypeList[i]['CropId'];
            if (i == this.cropTypeList.length - 1) {
              let list;
               list = this.fieldsFarmCarePrimary[1];
              for (let field of list) {
                if (field.key == 'Crop') {
                  field.props.options = this.cropTypeList;
                }
              }
            }
          }
        }
      }
    }
  }
  ongetDistrictCropList(type, value) {
    let regionValue = this.productItem['RegionCode']
    if (regionValue != '' && regionValue != undefined && regionValue != null) {
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "Region": regionValue,
        "ProductId": this.productId
      }
      let urlLink = `${this.CommonApiUrl}api/agriculture/croplist`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            this.districtList = data.Result;
            if (data.Result.length != 0) {
              let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '', 'DistrictDesc': '-Select-', 'DistrictId': '' }]
              this.districtList = defaultObj.concat(data.Result);
              for (let i = 0; i < this.districtList.length; i++) {
                this.districtList[i].label = this.districtList[i]['DistrictDesc'];
                this.districtList[i].value = this.districtList[i]['DistrictId'];
                if (i == this.districtList.length - 1) {
                  let list = this.fieldsFarmCarePrimary[0];
                  for (let field of list) {
                    if (field.key == 'DistrictCode') {
                      field.props.options = this.districtList;
                      if (type == 'direct') { this.ongetAgriCropList(type, value) }
                    }
                  }
                }
              }
            }
          }
        });
    }
  }
  onCheckNoOfCalc(event, key) {
    if (key == 'NoOfAcres' || key == 'FirstLossPercentId') {
      let val = this.productItem['NoOfAcres'];
      let val2 = this.productItem['FirstLossPercentId'], val4 = null;
      let val3 = this.cropTypeList.find(ele => ele.CropId == this.productItem['Crop'])
      if (val3) val4 = val3?.PerHACost
      if (val != null && val != '' && val != 0 && val != undefined && val2 != null && val2 != '' && val2 != 0 && val4 != null) {
        if (this.productItem['YaraPackageYN'] == 'Y') {
          this.productItem['farmCareSumInsured'] = Number(val) * (Number(val4) * (val2 / 100))
          // if(this.productItem['Crop'].value=='1') this.productItem['farmCareSumInsured'].setValue(Number(this.productItem['NoOfAcres'].value)*2400000)
          // if(this.productItem['Crop'].value=='2') this.productItem['farmCareSumInsured'].setValue(Number(this.productItem['NoOfAcres'].value)*1920000)
        }
      }
    }
  }
  onProceedData(type){
            console.log("Locations", this.locationList)
      let i = 0;
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
                entry['DistributorCode']=obj['DistributorCode'] = this.productItem['DistributorCode'];
                entry['DistributorName']=obj['DistributorName'] = this.productItem['DistributorName'];
                entry['RegionCode']=obj['RegionCode'] = this.productItem['RegionCode'];
                entry['DistrictCode']=obj['DistrictCode'] = this.productItem['DistrictCode'];
                entry['Crop']=obj['Crop'] = this.productItem['Crop'];
                entry['YaraPackageYN']=obj['YaraPackageYN'] = this.productItem['YaraPackageYN'];
                entry['CoverageID']=obj['CoverageID'] = this.productItem['CoverageID'];
                entry['NoOfAcres']=obj['NoOfAcres'] = this.productItem['NoOfAcres'];
                entry['farmCareSumInsured']=obj['farmCareSumInsured'] = this.productItem['farmCareSumInsured'];
                entry['FirstLossPercentId']=obj['FirstLossPercentId'] = this.productItem['FirstLossPercentId'];
                let farmApi = new FarmCareApiTanzaniya();
                let farmlist: any = farmApi.getSaveDetails(entry, obj)
                if (farmlist) { obj = farmlist; }
                locationList.push(JSON.parse(JSON.stringify(obj)));j += 1;
                if (j == this.locationList.length) {this.finalRedirect(locationList,type)}
          }
           else if(entry?.SectionList){obj['SectionList']=entry?.SectionList;locationList.push(JSON.parse(JSON.stringify(obj)));j += 1;
                if (j == this.locationList.length) {this.finalRedirect(locationList,type)}}
        }
      }
  }
  finalRedirect(locationList,type){
      let res = {
        "locationList": locationList,
        "type": type
      }
      this.finalProceed.emit(res)
  }
  checkLimitValue(event: Event, key, type): void {
    if (type == 'max') {
    }
    if (type == 'min') {
      if (key == 'farmCareSumInsured') {
        const input = event.target as HTMLInputElement;
        const numericValue = parseFloat(input.value.replace(/,/g, ''));
      }
    }
  }
  previous() {
     let res = {
        "locationList": this.locationList,
        "type": 'Previous'
      }
    this.previousSection.emit(res);
  }
}
