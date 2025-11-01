import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
import { BurglaryTanzaniya } from '../../../models/Tanzaniya/Burglary/Burglary';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BurglaryApiTanzaniya } from '../../../models/Tanzaniya/Burglary/BurglaryApi';
@Component({
  selector: 'burglary-tza',
  templateUrl: './burglary.component.html',
  styleUrl: './burglary.component.scss'
})
export class BurglaryTZAComponent {
  userType: any = null;
  productId: any = null;
  form2 = new FormGroup({});IndustryError: boolean;burglaryfields:any[]=[]
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;
  @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  public AppConfig: any = (Mydatas as any).default;stateList:any[]=[];regionList:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;burglaryFirlossList:any[]=[];
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  constructor(private sharedService: SharedService,private cdr: ChangeDetectorRef){
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
      if (this.insuranceId == '100002') contentData4 = new BurglaryTanzaniya();
      this.burglaryfields[0] = contentData4.fields;
      this.getRegionList(); this.getBurglaryFirstLossList();
      let regionHooks = {
        onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.ongetDistrictList('change', null)
          });
        }
      }
      let fieldList = this.burglaryfields[0].fieldGroup[0].fieldGroup;
      console.log("Final Field List", fieldList)
      for (let field of fieldList) {
        if (field.key == 'RegionCode') field.hooks = regionHooks;
      }
  }
  ngOnInit() {
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
            let Api = null;
            if (this.insuranceId == '100002') Api = new BurglaryApiTanzaniya();
            obj = Api.getEditDetails(subDetails, obj);
          }
          if(this.tabIndex==i && subDetails){
              if (obj.FireSumInsured) this.productItem.FireSumInsured = String(obj.FireSumInsured);
              if (obj.BurglarySi) this.productItem.BurglarySi = obj.BurglarySi;
              if (obj.DescriptionOfRisk) this.productItem.DescriptionOfRisk = obj.DescriptionOfRisk;
              if (obj.CoveringDetails) this.productItem.CoveringDetails = obj.CoveringDetails;
              if (obj.RegionCode) { this.productItem.RegionCode = obj.RegionCode; this.ongetDistrictList('change', obj.RegionCode, obj.DistrictCode); this.cdr.detectChanges(); }
              if (obj.DistrictCode) { this.productItem.DistrictCode = obj.DistrictCode; }
              if(obj.IndustryType) this.productItem.IndustryId = obj.IndustryType;
          }
          i+=1;
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
                  let primaryList;
                  if (this.productId == '1') primaryList = this.burglaryfields[0].fieldGroup[0].fieldGroup;for (let field of primaryList) {
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
                  let list;
                  list = this.burglaryfields[0].fieldGroup[0].fieldGroup;
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
    getBurglaryFirstLossList() {
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ItemType": "BURGLARY_FIRST_LOSS"
      }
      let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let defaultObj = [{ 'label': '-Select-', 'value': null, "Code": null, "CodeDesc": "-Select-" }]
          this.burglaryFirlossList = defaultObj.concat(data.Result);
          for (let i = 0; i < this.burglaryFirlossList.length; i++) {
            this.burglaryFirlossList[i].label = this.burglaryFirlossList[i]['CodeDesc'];
            this.burglaryFirlossList[i].value = this.burglaryFirlossList[i]['Code'];
            if (i == this.burglaryFirlossList.length - 1) {
              let fieldList;
              if (this.productId == '1') fieldList = this.burglaryfields[0].fieldGroup[0].fieldGroup;
              for (let field of fieldList) { if (field.key == 'FireSumInsured') { field.templateOptions.options = this.burglaryFirlossList; if (field.options) field.props.options = this.burglaryFirlossList } }
              console.log(this.burglaryfields);
            }
          }
        })
    }
    onProceedData(type){
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
            if (this.productItem['FireSumInsured']) obj['FireSumInsured']=entry['FireSumInsured']=this.productItem.FireSumInsured;
              if (this.productItem['BurglarySi']) obj['BurglarySi']=entry['BurglarySi']=this.productItem.BurglarySi;
              if (this.productItem['DescriptionOfRisk']) obj['DescriptionOfRisk']=entry['DescriptionOfRisk']=this.productItem.DescriptionOfRisk;
              if (this.productItem['CoveringDetails']) obj['CoveringDetails']=entry['CoveringDetails']=this.productItem.CoveringDetails;
              if (this.productItem['RegionCode']) { obj['RegionCode']=entry['RegionCode']=this.productItem.RegionCode;  }
              if (this.productItem['DistrictCode']) { obj['DistrictCode']=entry['DistrictCode']=this.productItem.DistrictCode; }
                obj['IndustryType']=entry['IndustryType'] = this.productItem.IndustryId;
                let Api = null;
                  Api = new BurglaryApiTanzaniya();
                  let burglaryApilist: any = Api.getSaveDetails(entry, this.industryTypeList, obj)
                  if (burglaryApilist) { 
                    let list =[];
                    if(entry.SectionList) list = entry.SectionList.filter(ele=>ele.SectionId!='52');
                    if(burglaryApilist.SectionList) burglaryApilist.SectionList = burglaryApilist.SectionList.concat(list)
                    obj = burglaryApilist
                  }
          }
          else if(entry?.SectionList){obj['SectionList']=entry?.SectionList;}
          locationList.push(JSON.parse(JSON.stringify(obj)));
          j += 1;
          if (j == this.locationList.length) {this.finalRedirect(locationList,type)}
        }
      }
  }
  finalRedirect(locationList,type){
    console.log("Received Obj",locationList)
      let res = {
        "locationList": locationList,
        "type": type
      }
      console.log("Final Object", res)
      this.finalProceed.emit(res)
  }
  //Industry Change
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  previous() {
     let res = {
        "locationList": this.locationList,
        "type": 'Previous'
      }
    this.previousSection.emit(res);
  }
}
