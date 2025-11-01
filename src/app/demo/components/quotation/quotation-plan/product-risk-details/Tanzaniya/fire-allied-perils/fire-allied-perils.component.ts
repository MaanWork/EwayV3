import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FireAlliedPerils } from '../../../models/Tanzaniya/FireAlliedPerils';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { FireAlliedPerilsApiTanzaniya } from '../../../models/Tanzaniya/FireAlliedPerilsApi';
@Component({
  selector: 'fire-allied-perils',
  templateUrl: './fire-allied-perils.component.html',
  styleUrl: './fire-allied-perils.component.scss'
})
export class FireAlliedPerilsComponent {
  regionList: any[]=[];
   userType: any = null;
    productId: any = null;
    form2 = new FormGroup({});fieldsFireAlliedTanzaniya:any[]=[];
    showExtensions = false;carrierlegalliabilityFields:any[]=[];fieldsCARPrimaryupto:any[]=[];
    @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
    @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
    @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
    @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
    @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;
    @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
    branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  fireIndustryList: any[]=[];productNameList: any[]=[];dropList: any[]=[];
  firstLossSection: boolean=false;firstLossPayeeList: any[]=[];fireSectionList: any[]=[];stateList: any[]=[];
  constructor(private sharedService: SharedService){
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
    let fireData = new FireAlliedPerils();
            console.log(fireData);
            let entry = [];
            this.fieldsFireAlliedTanzaniya = fireData?.fields;
            let modelHooks = {
              onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.getFireIndustryList('change');
                  // this.filterSectionList('change')
                });
              }
            }
            let occupationHooks = {
              onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.onChangeIndusty()
                });
              }
            }
            let modelHooks2 = {
              onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.productItem.Section = field.formControl.value;
                  this.onChangeSection(); this.getBIList()
                });
              }
            }
            let modelHooks3 = {
              onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.onChangeBusiness();
                });
              }
            }
            let modelHooks4 = {
              onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.onFirstLossPayeeYNChange();
                });
              }
            }
            // let modelHooks6 = { onInit: (field: FormlyFieldConfig) => {
            //   field.formControl.valueChanges.subscribe(() => {
            //     this.onBusinessInterruptionChange();
            //   });
            // } }
            let districtHooks = {
              onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.ongetDistrictList('change', null);
                });
              }
            };
            // console.log("Fields",this.fields)
            let fieldList = this.fieldsFireAlliedTanzaniya[0].fieldGroup[0].fieldGroup;
            for (let field of fieldList) {
              if (field.key == 'InsuranceType') field.hooks = modelHooks;
              if (field.key == 'Section') field.hooks = modelHooks2;
              if (field.key == 'RegionCode') field.hooks = districtHooks;
              if (field.key == 'BusinessName') field.hooks = modelHooks3;
              if (field.key == 'OccupationId') field.hooks = occupationHooks;
              // if(field.key=='FirstLossPayeeYN') field.hooks = modelHooks4;
              // if(field.key=='BusinessExtension') field.hooks = modelHooks6;
            }
            // this.productItem = new ProductData();
            // this.productItem.InsuranceType = '56';
            // this.productItem.FirstLossPayeeYN = 'N';
            // // this.TableRowFire=[];
            // this.formSection = true;
            this.getRegionList();
            this.getIndustryList();
            // this.getFireIndustryList('direct');
            this.getFireSectionList();
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
          let Api = new FireAlliedPerilsApiTanzaniya();
          const Result = Api.getEditDetails(subDetails, obj);
          if (Result != undefined) obj = Result;
        }
        if(this.tabIndex==i && obj.SectionList){
            if (obj.InsuranceType) this.productItem.InsuranceType = obj.InsuranceType;
            if (obj.FireSumInsured) this.productItem.FireSumInsured = obj.FireSumInsured;
            if (obj.Section) this.productItem.Section = obj.Section;
            if (obj.DescriptionOfRisk) this.productItem.DescriptionOfRisk = obj.DescriptionOfRisk;
            if (obj.OccupationId) this.productItem.OccupationId = obj.OccupationId;
            //if(entry.BusinessExtension) this.productItem.BusinessExtension = entry.BusinessExtension;
            this.getFireIndustryList('direct')
            if (this.productItem.Section) this.getBIList();
            if (obj.BusinessSI != null && obj.BusinessSI != '0' && obj.BusinessSI != 0) {
              this.productItem.BusinessExtension = 'Y';
              this.productItem.BusinessName = obj.BusinessName;
              this.productItem.BusinessSI = obj.BusinessSI;
              this.productItem.DescriptionOfRiskBI = obj.DescriptionOfRiskBI;
            }
            else { this.productItem.BusinessExtension = 'N'; }
        }
        i+=1;
    }
  }
  getIndustryList() {
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'label': '-Select-', 'value': '', 'CodeDesc': '-Select-', 'Code': null }]
        let altObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
        this.industryTypeList = data.Result;
        console.log(data.Result);
        if (this.productId == '6') {
          for (let i = 0; i < this.industryTypeList.length; i++) {
            this.industryTypeList[i].label = this.industryTypeList[i]['CodeDesc'];
            this.industryTypeList[i].value = this.industryTypeList[i]['Code'];
            let fieldList = this.fieldsFireAlliedTanzaniya[0]?.fieldGroup[0]?.fieldGroup;
            if (fieldList) {
              for (let field of fieldList) {
                if (field.key == 'InsuranceType') {
                  field.props.options = this.industryTypeList;
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
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
                let primaryList = this.fieldsFireAlliedTanzaniya[0].fieldGroup[0].fieldGroup;
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
  getFireIndustryList(type) {
    let ReqObj = {
      "CategoryId": this.productItem.InsuranceType,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/dp/occupation`;
    //let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.fireIndustryList = data.Result;
          if (this.fireIndustryList.length != 0) {
            for (let i = 0; i < this.fireIndustryList.length; i++) {
              this.fireIndustryList[i].label = this.fireIndustryList[i]['CodeDesc'];
              this.fireIndustryList[i].value = this.fireIndustryList[i]['Code'];
              if (i == this.fireIndustryList.length - 1) {
                let fieldList = this.fieldsFireAlliedTanzaniya[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'OccupationId') {
                    field.props.options = defaultObj.concat(this.fireIndustryList);
                  }
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  onChangeIndusty() {
    let entry = this.fireIndustryList.find(ele => ele.Code == this.productItem.OccupationId)?.CodeDesc;
    if (entry) this.productItem.OccupationDesc = entry;
  }
  onChangeSection() {
    let entry = this.productNameList.find(ele => ele.Code == this.productItem.Section)?.CodeDesc;
    if (entry) this.productItem.SectionDesc = entry;
  }
  getBIList() {
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "IndustryType": this.productItem.Section ? this.productItem.Section : "41",
      "LoginId": this.loginId
    }
    let urlLink = `${this.CommonApiUrl}api/getByIndsutryType`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': null }]
          this.dropList = data.Result;
          for (let i = 0; i < this.dropList.length; i++) {
            this.dropList[i].label = this.dropList[i]['CodeDesc'];
            this.dropList[i].value = this.dropList[i]['Code'];
            if (i == this.dropList.length - 1) {
              let fieldList = this.fieldsFireAlliedTanzaniya[0]?.fieldGroup[0]?.fieldGroup;
               for (let field of fieldList) {
                if (field.key == 'BusinessName') { console.log("Fields", field); field.props['options'] = defaultObj.concat(this.dropList); }
              }
            }
          }
        }
      });
  }
  onChangeBusiness() {
        let entry = this.productItem.BusinessName;
        let fieldList;
        console.log("FieldList",this.fieldsFireAlliedTanzaniya[0])
        if (this.productId == '6') fieldList = this.fieldsFireAlliedTanzaniya[0].fieldGroup[0].fieldGroup;
        for (let field of fieldList) {
          if (field.key == 'BusinessSI') {
            if (entry != '' && entry != '0' && entry != undefined && entry != null) { field.props.disabled = false; }
            else { this.productItem.BusinessSI = '0'; field.formControl?.setValue('0'); field.props.disabled = true; }
          }
          else if (field.key == 'CoveringDetailsBI' || field.key == 'DescriptionOfRiskBI') {
            if (entry != '' && entry != '0' && entry != undefined && entry != null) { field.props.disabled = false; }
            else { this.productItem.CoveringDetailsBI = ''; this.productItem.DescriptionOfRiskBI = ''; field.formControl?.setValue(''); field.props.disabled = true; }
          }
        }
    }
    onFirstLossPayeeYNChange() {
      if (this.productItem.FirstLossPayeeYN == 'Y') {
        this.firstLossSection = true;
        if (this.firstLossPayeeList.length == 0) this.addFirstLossPayee();
      }
      else this.firstLossSection = false;
    }
    addFirstLossPayee() {
      let obj = { "FirstLossPayeeDesc": null };
      this.firstLossPayeeList.push(obj);
    }
    onDeleteFistLoss(index) { this.firstLossPayeeList.splice(index, 1) }
    getFireSectionList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "Insurance_type"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ "Code": null, "CodeDesc": "- - Select - -" }]
          this.fireSectionList = data.Result;
          this.productNameList = data.Result;
          this.filterSectionList('direct')
          this.onChangeSection();
        }
      },
      (err) => { },
    );
  }
  filterSectionList(type) {
    if (this.productItem.InsuranceType == '57') { }
    else { this.productNameList = this.fireSectionList.filter(ele => ele.IndustryType != 'G') };
    if (this.productNameList.length != 0) {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      for (let i = 0; i < this.productNameList.length; i++) {
        this.productNameList[i].label = this.productNameList[i]['CodeDesc'];
        this.productNameList[i].value = this.productNameList[i]['Code'];
        if (i == this.productNameList.length - 1) {
          let fieldList = this.fieldsFireAlliedTanzaniya[0].fieldGroup[0].fieldGroup;
          for (let field of fieldList) {
            if (field.key == 'Section') {
              field.props.options = defaultObj.concat(this.productNameList);
            }
          }
        }
      }
    }
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
                if (this.productId == '6') list = this.fieldsFireAlliedTanzaniya[0].fieldGroup[0].fieldGroup;
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
                entry['InsuranceType'] = this.productItem.InsuranceType;
                entry['OccupationId'] = String(this.productItem.OccupationId).replaceAll(',', '');
                entry['Section'] = this.productItem.Section;
                entry['FireSumInsured'] = this.productItem.FireSumInsured;
                entry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;
                entry['BusinessExtension'] = String(this.productItem.BusinessExtension).replaceAll(',', '');
                entry['BusinessName'] = this.productItem.BusinessName;
                entry['BusinessSI'] = this.productItem.BusinessSI;
                entry['RegionCode'] = this.productItem.RegionCode;
                entry['DistrictCode'] = this.productItem.DistrictCode;
                entry['CoveringDetailsBI'] = this.productItem.CoveringDetailsBI;
                entry['DescriptionOfRiskBI'] = this.productItem.DescriptionOfRiskBI;
                let FuelGuaranteeApi = new FireAlliedPerilsApiTanzaniya();
                let fuelGuranteelist: any = FuelGuaranteeApi.getSaveDetails(entry, entry.IndustryId, this.industryTypeList, this.fireIndustryList, obj, '', this.dropList, this.productNameList)
                if (fuelGuranteelist) { obj = fuelGuranteelist; }
              }
               else if(entry?.SectionList){obj['SectionList']=entry?.SectionList;}
              j += 1;
              locationList.push(JSON.parse(JSON.stringify(obj)));
                if (j == this.locationList.length) {console.log("Final Obj", JSON.parse(JSON.stringify(obj)), locationList);this.finalRedirect(locationList,type)}
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
      previous() {
        let res = {
            "locationList": this.locationList,
            "type": 'Previous'
          }
        this.previousSection.emit(res);
      }
}
