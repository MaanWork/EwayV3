import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
import { RepeatService } from '../../../Riskpage/repeat.service';
import { Fidelitytwo } from '../../../models/Tanzaniya/Fidelitytwo';
import { FidelityTanzaniyaApi } from '../../../models/Tanzaniya/Fidelity/FidelityTanzaniyaApi';
@Component({
  selector: 'fidelity-tza',
  templateUrl: './fidelity.component.html',
  styleUrls: ['./fidelity.component.scss']
})
export class FidelityTZAComponent {
    coversreuired:any=null;userDetails:any=null;insuranceId:any=null;loginId:any=null;productId:any=null;userType:any=null;
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
      occupationList: any[]=[];quoteNo:any=null;fieldFidelityPhoenix: any[]=[];
  constructionTypes: { CodeDesc: string; Code: any; }[];
      constructor(private sharedService: SharedService,private fb: FormBuilder,private repeatService: RepeatService){
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
              this.FidelityTanzaniyaForm = this.fb.group({ FidelityTanzaniya: this.fb.array([]) });
              let contentData4 = new Fidelitytwo()
              this.fieldFidelityPhoenix[0] = contentData4?.fields[0];
              this.getOccupationEmployers();this.getFidelitySIList();
      }
  ngOnInit(){
    if(this.locationList.length!=0){
      this.onEditData();
    }
  }
  onEditData(){
    let i = 0;
        for (let obj of this.locationList) {
            let subDetails = null;
            if(obj.SectionList){
              subDetails = obj.SectionList;
              let Api = new FidelityTanzaniyaApi();
              const householdersResult = Api.getEditDetails(subDetails, obj);
              if (householdersResult !== undefined) {
                obj = householdersResult;
                console.log(obj);
              }
            }
            if(this.tabIndex==i && subDetails){
                const fidelityArray = this.FidelityTanzaniyaForm.get('FidelityTanzaniya') as FormArray;
                fidelityArray.clear();
                if (fidelityArray) {
                  for (let i = 0; i < obj.FidelityTanzaniya.length; i++) {
                    fidelityArray.push(
                      this.fb.group({
                        OccupationId: obj.FidelityTanzaniya[i].OccupationId,
                        Count: obj.FidelityTanzaniya[i].Count,
                        SumInsured: obj.FidelityTanzaniya[i].SumInsured,
                      })
                    );
                  }
                }
                if(obj['IndustryType']) this.productItem.IndustryId = obj['IndustryType'];
            }
            else{this.addFidelityTanzaniya()}
            i+=1;
        }
  }
  getOccupationEmployers() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId,
      "TitleType": 'I'
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
          this.occupationList = defaultRow.concat(data.Result);
          // if(this.insuranceId=='100040' || this.insuranceId=='100042'){
        }
      },
      (err) => { },
    );
  }
  getFidelitySIList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "FIDELITY_SI"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'label': '-Select-', 'value': null, "Code": null, "CodeDesc": "-Select-" }]
        this.fidelityContentList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.fidelityContentList.length; i++) {
          this.fidelityContentList[i].label = this.fidelityContentList[i]['CodeDesc'];
          this.fidelityContentList[i].value = this.fidelityContentList[i]['Code'];
          if (this.productId != '19' && this.insuranceId != '100002') {
            if (i == this.fidelityContentList.length - 1) {
            }
          }
        }
      })
  }
  get FidelityTanzaniyaArray(): FormArray {
    return this.FidelityTanzaniyaForm.get('FidelityTanzaniya') as FormArray;
  }
  addFidelityTanzaniya() {
    const userGroup = this.fb.group({
      OccupationId: [''],
      Count: [''],
      SumInsured: ['']
    });
    this.FidelityTanzaniyaArray.push(userGroup);
  }
  removeFidelityTanzaniya(index: number) {
    this.FidelityTanzaniyaArray.removeAt(index);
  }
  onKeyDown(event: KeyboardEvent, field) {
    const inputElement = event.target as HTMLInputElement;
    let maxLength = 0;
    maxLength = 19;
    if (inputElement.value.length >= maxLength) {
      event.preventDefault();
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
      }
      else this.form.controls[name].setValue(inputElement.value, { emitEvent: false });
    }
  }
   onProceedData(type){
    console.log("Final Location List",this.locationList)
      let i=0;
      if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
      else{this.IndustryError = false;}
        let locationList =[];
        if(i==0 || type=='Previous'){let j=0;
          for (let entry of this.locationList) {
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
              if(j==this.tabIndex){
                let Form = this.FidelityTanzaniyaForm.value.FidelityTanzaniya;
                for (let i = 0; i < Form.length; i++) {
                  if (Form[i].SumInsured != '0' && Form[i].SumInsured != 0 && Form[i].SumInsured != null && Form[i].SumInsured != 'null') {
                    let d = {
                      "SectionId": "43",
                      "SectionName": "Fidelity Guarantee",
                      "CoverId": "5",
                      "RiskId": null,
                      "OccupationId": Form[i].OccupationId,
                      "FidEmpCount": Form[i].Count,
                      "SumInsured": Form[i].SumInsured,
                      "OtherOccupation": i,
                      "IndustryType": this.productItem.IndustryId,
                      "IndustryTypeDesc": this.industryTypeList.find(ele => ele.Code == this.productItem.IndustryId)?.CodeDesc
                    }
                    obj.SectionList.push(d);
                  }
                  
                }
              }
              else if(entry.SectionList){obj.SectionList=entry['SectionList']}
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
  IndustryChanged(){
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }   
  CommaFormattedValue(data){
    if (data) data = String(data).replace(/[^0-9.]|(?<=\-..*)\./g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return data
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