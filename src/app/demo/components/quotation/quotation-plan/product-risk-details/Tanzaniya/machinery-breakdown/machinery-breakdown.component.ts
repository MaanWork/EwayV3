import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { MachineryBreakdownApiTanzaniya } from '../../../models/Tanzaniya/MachineryBreakdown/machineryBreakdownApi';
import { MachineryBreakDown } from '../../../models/Tanzaniya/MachineryBreakdown/machineryBreakdown';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'machinery-breakdown-tza',
  templateUrl: './machinery-breakdown.component.html',
  styleUrl: './machinery-breakdown.component.scss'
})
export class MachineryBreakdownTZAComponent {

    MachineryTanzaniyaList:any[]=[];fieldMachineryTanzaniya:any[]=[];tableIndex:any=null;
    userDetails:any=null;insuranceId:any=null;loginId:any=null;productId:any=null;userType:any=null;
      branchCode:any=null;agencyCode:any=null;countryId:any=null;brokerbranchCode:any=null;fields:any[]=[];
      @Input() form:FormGroup;@Input() productItem:any;@Input() locationList:any[]=[];@Input() tabIndex:any=null;@Input() industryTypeList:any[]=[];
      @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails:any[]=[];@Input() renderType:any=null;
      @Output() skipSection = new EventEmitter<any>();fidelityContentList:any[]=[];
      @Output() previousSection = new EventEmitter<any>();
      @Output() saveSection = new EventEmitter<any>();
      public AppConfig: any = (Mydatas as any).default;IndustryError:boolean=false;FidelityTanzaniyaForm: FormGroup;
      public ApiUrl1: any = this.AppConfig.ApiUrl1;endorsementSection:boolean=false;
      public MarineApiUrl: any = this.AppConfig.MarineApi; 
      public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
      public motorApiUrl: any = this.AppConfig.MotorApiUrl;
      dropList: any[]=[];machineryContentList: any[]=[];
    constructor(private sharedService:SharedService){
        let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || null);
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
              let fireData = new MachineryBreakDown();
              let entry = [];
              this.fieldMachineryTanzaniya[0] = fireData?.fields;
              console.log("Field Machinery", this.fieldMachineryTanzaniya);
              this.getMachineryContentList();
              this.getBIList();
              let modelHooks3 = {
                onInit: (field: FormlyFieldConfig) => {
                  field.formControl.valueChanges.subscribe(() => {
                    this.onChangeBusiness();
                  });
                }
              }
              let fieldList = this.fieldMachineryTanzaniya[0].fieldGroup[0].fieldGroup;
              for (let field of fieldList) {
                if (field.key == 'BusinessName') field.hooks = modelHooks3;
              }
    }
    ngOnInit(){
      if(this.locationList.length!=0){
        this.onEditData();
      }
    }
    onEditData(){
        let i =0;
        for(let obj of this.locationList){
          let subDetails=null;
          if(obj.SectionList) subDetails = obj.SectionList;
          if(i==this.tabIndex && subDetails!=null){
              let BusineessSection = subDetails.filter(ele => ele['CoverId'] == '337');
              let MachinerySection = subDetails.filter(ele => ele['CoverId'] == '339');
              if (BusineessSection.length > 0 && MachinerySection.length > 0) {
                for (let i = 0; i < BusineessSection.length; i++) {
                  const newItem = {
                    ContentId: MachinerySection[i].ContentId,
                    PowerPlantSi: MachinerySection[i].SumInsured,
                    CoveringDetails: MachinerySection[i].CoveringDetails,
                    DescriptionOfRisk: MachinerySection[i].DescriptionOfRisk,
                    BusinessName: BusineessSection[i].BusinessInterruption,
                    BusinessSI: BusineessSection[i].SumInsured,
                    CoveringDetailsBI: BusineessSection[i].CoveringDetails,
                    DescriptionOfRiskBI: BusineessSection[i].DescriptionOfRisk
                  };
                  this.MachineryTanzaniyaList.push(newItem);
                  if(MachinerySection[i].IndustryType) this.productItem.IndustryId = BusineessSection[i].IndustryType;
                }
              }
              console.log(this.MachineryTanzaniyaList);
          }
          i+=1;
        }
        
    }
    getMachineryDesc(rowData) {
      return this.machineryContentList.find(ele => (ele.Code == rowData))?.CodeDesc
    }
    getBIDesc(rowData) {
      return this.dropList.find(ele => (ele.Code == rowData))?.CodeDesc
    }
    getBIList() {
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "IndustryType": "41",
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
              console.log(this.fields);
              let fieldList = this.fieldMachineryTanzaniya[0]?.fieldGroup[0]?.fieldGroup;
              for (let field of fieldList) {
                if (field.key == 'BusinessName') { console.log("Fields", field); field.props['options'] = defaultObj.concat(this.dropList); }
              }
            }
          }
        }
      });
    }
    onEditTable(rowData, index, category) {
      if (category == 'MachineryTanzaniya') {
        this.tableIndex = index;
        this.form.patchValue({
          ContentId: rowData.ContentId,
          PowerPlantSi: rowData.PowerPlantSi,
          CoveringDetails: rowData.CoveringDetails,
          DescriptionOfRisk: rowData.DescriptionOfRisk,
          BusinessName: Number(rowData.BusinessName),
          BusinessSI: rowData.BusinessSI
        });
      }
    }
    onChangeBusiness() {
      if ((this.productId == '39' || this.productId == '6') && this.insuranceId == '100002') {
        let entry = this.productItem.BusinessName;
        let fieldList = this.fieldMachineryTanzaniya[0].fieldGroup[0].fieldGroup;
        console.log(fieldList);
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
    }
    getMachineryContentList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "MACHINERY_BREAKDOWN"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'label': '-Select-', 'value': null, "Code": null, "CodeDesc": "-Select-" }]
        this.machineryContentList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.machineryContentList.length; i++) {
          this.machineryContentList[i].label = this.machineryContentList[i]['CodeDesc'];
          this.machineryContentList[i].value = this.machineryContentList[i]['Code'];
        }
        if (this.productId == '39' && this.insuranceId == '100002') {
          let fieldList = this.fieldMachineryTanzaniya[0]?.fieldGroup[0]?.fieldGroup;
          for (let field of fieldList) {
            if (field.key == 'ContentId') { console.log("Fields", field); field.templateOptions['options'] = this.machineryContentList; }
          }
        }
      })
  }
    addToTable(category) {
    if (category == 'MachineryTanzaniya') {
      var obj3 = {
        ContentId: this.form.value.ContentId,
        PowerPlantSi: this.form.value.PowerPlantSi,
        CoveringDetails: this.form.value.CoveringDetails,
        DescriptionOfRisk: this.form.value.DescriptionOfRisk,
        BusinessName: this.form.value.BusinessName,
        BusinessSI: this.form.value.BusinessSI,
      }
      if (this.tableIndex !== undefined && this.tableIndex !== null && this.tableIndex > -1) this.MachineryTanzaniyaList[this.tableIndex] = obj3;
      else this.MachineryTanzaniyaList.push(obj3);
      this.form.reset({
        rows: [],
        ContentId: null,
        PowerPlantSi: '',
        CoveringDetails: '',
        DescriptionOfRisk: '',
        BusinessName: null,
        BusinessSI: ''
      });
    }
    }
    onDeleteTable(rowData, index, category) {
      if (category == 'MachineryTanzaniya') this.MachineryTanzaniyaList.splice(index, 1);
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
              entry['IndustryId'] = this.productItem.IndustryId;
             let machineryApi = new MachineryBreakdownApiTanzaniya();
            let list: any = machineryApi.getSaveDetails(entry, this.machineryContentList, entry.IndustryId, obj, this.MachineryTanzaniyaList,this.dropList);
            if (list) { obj = list }
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
      IndustryChanged(){
        this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
      }   
      skip() {
        this.skipSection.emit('Fidelity');
      }
      previous() {
        let res = {
            "locationList": this.locationList,
            "type": 'Previous'
          }
        this.previousSection.emit(res);
      }
}
