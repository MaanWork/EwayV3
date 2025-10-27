import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
import { FidelityPhoenix } from '../../../models/phoneix/PhoenixZambia/FidelityPhoenix';
import { FidelityBotswana } from '../../../models/phoneix/PhoenixBotswana/Fidelity/Fidelity';
import { FidelityMosambique } from '../../../models/phoneix/PhoenixMozambique/Fidelity/Fidelity';
import { FidelitySwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Fidelity/Fidelity';
import { FidelityNamibia } from '../../../models/phoneix/PhoenixNamibia/Fidelity/Fidelity';
import { RepeatService } from '../../../Riskpage/repeat.service';
@Component({
  selector: 'app-fidelity',
  templateUrl: './fidelity.component.html',
  styleUrls: ['./fidelity.component.scss']
})
export class FidelityComponent {
    coversreuired:any=null;userDetails:any=null;insuranceId:any=null;loginId:any=null;productId:any=null;userType:any=null;
      branchCode:any=null;agencyCode:any=null;countryId:any=null;brokerbranchCode:any=null;fields:any[]=[];
      @Input() form:FormGroup;@Input() productItem:any;@Input() locationList:any[]=[];@Input() tabIndex:any=null;@Input() industryTypeList:any[]=[];
      @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails:any[]=[];@Input() renderType:any=null;
      @Output() skipSection = new EventEmitter<any>();
      @Output() previousSection = new EventEmitter<any>();
      @Output() saveSection = new EventEmitter<any>();
      public AppConfig: any = (Mydatas as any).default;IndustryError:boolean=false;fidelityForm: FormGroup;
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
              this.fidelityForm = this.fb.group({ fidelitys: this.fb.array([]) });
              let contentData4: any;
              if (this.insuranceId == '100046') contentData4 = new FidelityPhoenix();
              else if (this.insuranceId == '100047') contentData4 = new FidelityBotswana();
              else if (this.insuranceId == '100048') contentData4 = new FidelityMosambique();
              else if (this.insuranceId == '100049') contentData4 = new FidelitySwaziland();
              else if (this.insuranceId == '100050') contentData4 = new FidelityNamibia();
              this.fieldFidelityPhoenix[0] = contentData4?.policyfields1;
              this.getConstructionTypeList();
              this.addFidelity();
      }
  ngOnInit(){
    if(this.locationList.length!=0){
      this.onEditData();
    }
  }
  onEditData(){
    if(this.renderType=='Direct'){
      let k=0;
      for(let obj of this.locationList){
          if(this.locationDetails[k]){
            let FidelityPhoenix = this.locationDetails[k]?.SectionList.filter(ele => ele['SectionId'] == '43');
                console.log(FidelityPhoenix);
                if (FidelityPhoenix.length != 0) {
                  obj['entries'] = []; let j = 0
                  for (let fid of FidelityPhoenix) {
                    let ent = { "RiskId": fid.RiskId, "IndustryType": String(fid.IndustryId) }, i = 0
                    if (obj.entries.some(ele => ele.RiskId == fid.RiskId)) {
                      ent = obj.entries.find(ele => ele.RiskId == fid.RiskId); i += 1;
                    }
                    if (fid.CoverId == '372' || fid.CoverId == 372) ent['AdditionalClaimsPreparationCosts'] = fid.SumInsured;
                    if (fid.CoverId == '293' || fid.CoverId == 293) ent['Limitofindemnity'] = fid.SumInsured;
                    ent['IndustryId'] = fid.IndustryType;
                    if (i == 0) obj.entries.push(ent)
                    else { }
                    j += 1;
                    if (j == FidelityPhoenix.length) {
                      obj['entries'] = obj.entries
                      if(k==this.tabIndex){
                            obj['SectionList']=this.locationDetails[k]?.SectionList;
                            const fidelityArray = this.fidelityForm.get('fidelitys') as FormArray;
                              fidelityArray.clear();
                            console.log(obj['entries']);
                            if(obj['entries']){
                                  for (let i = 0; i < obj['entries']?.length; i++) {
                                    let cost = null;
                                    this.productItem.IndustryId = obj['entries'][i].IndustryType;
                                    if (obj['entries'][i].AdditionalClaimsPreparationCosts) cost = obj['entries'][i].AdditionalClaimsPreparationCosts
                                    else if (obj['entries'][i].Additionalclaimspreparationcosts) cost = obj['entries'][i].Additionalclaimspreparationcosts
                                    fidelityArray.push(
                                      this.fb.group({
                                        AdditionalClaimsPreparationCosts: this.CommaFormattedValue(cost),
                                        LimitOfIndemnity: this.CommaFormattedValue(obj['entries'][i].Limitofindemnity)
                                      })
                                    );
                                  }
                            }
                            else{this.addFidelity();}
                      }
                      k+=1;
                    }
                  }
                }
          }
      }
    }
    else{
        let k=0;
        for(let obj of this.locationList){
            if(k==this.tabIndex){
                  obj['SectionList']=this.locationDetails[k]?.SectionList;
                  const fidelityArray = this.fidelityForm.get('fidelitys') as FormArray;
                    fidelityArray.clear();
                  console.log(obj['entries']);
                  for (let i = 0; i < obj['entries']?.length; i++) {
                    let cost = null;
                    this.productItem.IndustryId = obj['entries'][i].IndustryType;
                    if (obj['entries'][i].AdditionalClaimsPreparationCosts) cost = obj['entries'][i].AdditionalClaimsPreparationCosts
                    else if (obj['entries'][i].Additionalclaimspreparationcosts) cost = obj['entries'][i].Additionalclaimspreparationcosts
                    fidelityArray.push(
                      this.fb.group({
                        AdditionalClaimsPreparationCosts: this.CommaFormattedValue(cost),
                        LimitOfIndemnity: this.CommaFormattedValue(obj['entries'][i].Limitofindemnity)
                      })
                    );
                  }
            }
        }
    }
  }
  getConstructionTypeList() {
    let type = "wall_type";
    if (this.productId == '84') { type = "ERECTION ALL RISKS" }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": type
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.constructionTypes = defaultObj.concat(data.Result);
        if (this.productId == '76' || this.productId == '78' || this.productId == '66' || this.productId == '67' || this.productId == '79' || this.productId == '84' || this.productId == '82' || this.productId == '83' || this.productId == '93' || this.productId == '85' || this.productId == '92') {
          let i = 0
          for (let entry of this.constructionTypes) {
            entry['label'] = entry.CodeDesc; entry['value'] = entry.Code;
            i += 1;
            if (i == this.constructionTypes.length) {}
          }
        }
      });
  }
  addFidelity() {
    const userGroup = this.fb.group({AdditionalClaimsPreparationCosts: [''],LimitOfIndemnity: ['']});
    this.FidelityArray.push(userGroup);
    console.log("Fidelity Array",)
  }
  addContent() {
    console.log('add content clicked');
    setTimeout(() => {
      this.repeatService.requestAdd();
    }, 100);
  }
  get FidelityArray(): FormArray {
      return this.fidelityForm.get('fidelitys') as FormArray;
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
                entry['fidelitys'] = this.fidelityForm.value.fidelitys
                  entry['IndustryType'] = this.productItem.IndustryId
                   if(entry.SectionList){
                    obj['SectionList']=entry.SectionList.filter(ele=>ele.SectionId!='43')
                  }
              }
              if(entry['IndustryType']!=undefined){
                  let FidelityForm = entry['fidelitys'];
                  if (FidelityForm) {
                    this.productItem.FidelityListPhoenix = [];
                    for (let i = 0; i < FidelityForm.length; i++) {
                      let d = {
                        "AdditionalClaimsPreparationCosts": FidelityForm[i].AdditionalClaimsPreparationCosts,
                        "LimitOfIndemnity": FidelityForm[i].LimitOfIndemnity,
                        "IndustryType": entry.IndustryType
                      }
                      this.productItem.FidelityListPhoenix.push(d)
                      if (i == FidelityForm.length - 1) {
                        entry['FidelityListPhoenix'] = this.productItem.FidelityListPhoenix;
                        if (entry.FidelityListPhoenix) {
                            for (let index = 0; index < entry.FidelityListPhoenix.length; index++) {
                              if (entry.FidelityListPhoenix[index]?.AdditionalClaimsPreparationCosts != null && entry.FidelityListPhoenix[index]?.AdditionalClaimsPreparationCosts != 0 && entry.FidelityListPhoenix[index]?.AdditionalClaimsPreparationCosts != '0') {
                                let altEntry = {
                                  "SectionId": "43",
                                  "CoverId": "372",
                                  "SectionName": "Fidelity",
                                  "SumInsured": entry.FidelityListPhoenix[index]?.AdditionalClaimsPreparationCosts.replace(/,/g, ''),
                                  "Status": "Y",
                                  "OtherOccupation": index
                                }
                                if (entry['IndustryType']) { altEntry['IndustryType'] = entry['IndustryType']; altEntry["IndustryTypeDesc"] = this.industryTypeList.find(ele => ele.Code == entry['IndustryType'])?.CodeDesc }
                                obj.SectionList.push(altEntry);
                              }
                              if (entry.FidelityListPhoenix[index]?.LimitOfIndemnity != null && entry.FidelityListPhoenix[index]?.LimitOfIndemnity != 0 && entry.FidelityListPhoenix[index]?.LimitOfIndemnity != '0') {
                                let altEntry = {
                                  "SectionId": "43",
                                  "CoverId": "293",
                                  "SectionName": "Fidelity",
                                  "SumInsured": entry.FidelityListPhoenix[index]?.LimitOfIndemnity.replace(/,/g, ''),
                                  "Status": "Y",
                                  "OtherOccupation": index
                                }
                                if (entry['IndustryType']) { altEntry['IndustryType'] = entry['IndustryType']; altEntry["IndustryTypeDesc"] = this.industryTypeList.find(ele => ele.Code == entry['IndustryType'])?.CodeDesc }
                                obj.SectionList.push(altEntry);
                              }
                            }
                        }
                      }
                    }
                  }
              }
              else if(entry.SectionList){obj.SectionList=entry['SectionList']}
              locationList.push(obj);
              j += 1;
              if (j == this.locationList.length) {
                let res={
                  "locationList":locationList,
                  "type":type
                }
                console.log("Final Object in Fidelity",res)
                if (type == 'packageData') {
                  if(this.tabIndex==this.locationList.length-1){res.type='Submit';this.finalProceed.emit(res)}
                  else {res.type='Next';this.finalProceed.emit(res)}
                }
                else { this.finalProceed.emit(res) }
              } 
          }
        }
  }
  IndustryChanged(){
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }   
  CommaFormattedValue(data){
    if (data) data = String(data).replace(/[^0-9.]|(?<=\-..*)\./g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return data
  }
  removeFidelity(index: number) {
    this.FidelityArray.removeAt(index);
  }
  skip() {
    this.skipSection.emit('Fidelity');
  }
  previous() {
    this.previousSection.emit(true);
  }
}