import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployersLiabilityApiTanzaniya } from '../../../models/Tanzaniya/EmployersLiability/EmployersliabilityApi';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
@Component({
  selector: 'employers-liability-tza',
  templateUrl: './employers-liability.component.html',
  styleUrl: './employers-liability.component.scss'
})
export class EmployersLiabilityTZAComponent {
    coversreuired:any=null;userDetails:any=null;insuranceId:any=null;loginId:any=null;productId:any=null;userType:any=null;
      branchCode:any=null;agencyCode:any=null;countryId:any=null;brokerbranchCode:any=null;fields:any[]=[];
      @Input() form:FormGroup;@Input() productItem:any;@Input() locationList:any[]=[];@Input() tabIndex:any=null;@Input() industryTypeList:any[]=[];
      @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails:any[]=[];@Input() renderType:any=null;
      @Output() skipSection = new EventEmitter<any>();
      @Output() previousSection = new EventEmitter<any>();
      @Output() saveSection = new EventEmitter<any>();
      public AppConfig: any = (Mydatas as any).default;employersLiabilityForm: FormGroup;IndustryError:boolean=false;
      public ApiUrl1: any = this.AppConfig.ApiUrl1;endorsementSection:boolean=false;
      public MarineApiUrl: any = this.AppConfig.MarineApi; 
      public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
      public motorApiUrl: any = this.AppConfig.MotorApiUrl;
      occupationList: any;quoteNo:any=null;
      constructor(private sharedService: SharedService,private fb: FormBuilder,){
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
            this.employersLiabilityForm = this.fb.group({ EmployersLiability: this.fb.array([]) });
            this.addEmployers();
            this.getOccupationEmployers()
      }
      IndustryChanged(){
        this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
      }
      ngOnInit(){
        if(this.locationList.length!=0){
          this.onEditData();
        }
      }
      onEditData(){
        if(this.renderType=='Direct'){
          let i=0;
          for(let obj of this.locationList){
              if(this.locationDetails[i]){
                  let  employeerApi = new EmployersLiabilityApiTanzaniya(),subDetails=this.locationDetails[i].SectionList
                  obj = employeerApi.getEditDetails(subDetails, obj);
                  if(obj && this.tabIndex==i){
                      if (obj.EmployersLiability) {
                        if(obj?.IndustryType) this.productItem.IndustryId =obj?.IndustryType 
                        console.log(obj.EmployersLiability);
                        const EmployersArray = this.employersLiabilityForm.get('EmployersLiability') as FormArray;
                        EmployersArray.clear();
                        for (let i = 0; i < obj.EmployersLiability.length; i++) {
                          EmployersArray.push(
                            this.fb.group({
                              OccupationType: obj.EmployersLiability[i].OccupationType,
                              NoEmployees: obj.EmployersLiability[i].NoEmployees,
                              EmpSumInsured: this.CommaFormattedValue(obj.EmployersLiability[i].EmpSumInsured)
                            })
                          );
                        }
                      }
                  }
              }
              i+=1;
          }
        }
        else{
            let i=0;
              for(let obj of this.locationList){
                if(obj && this.tabIndex==i){
                      if(obj.SectionList){
                        let employeerApi = new EmployersLiabilityApiTanzaniya();
                        obj = employeerApi.getEditDetails(obj.SectionList, obj);
                      }
                     if (obj.EmployersLiability) {
                        if(obj?.IndustryType) this.productItem.IndustryId =obj?.IndustryType 
                        console.log(obj.EmployersLiability);
                        const EmployersArray = this.employersLiabilityForm.get('EmployersLiability') as FormArray;
                        EmployersArray.clear();
                        for (let i = 0; i < obj.EmployersLiability.length; i++) {
                          EmployersArray.push(
                            this.fb.group({
                              OccupationType: obj.EmployersLiability[i].OccupationType,
                              NoEmployees: obj.EmployersLiability[i].NoEmployees,
                              EmpSumInsured: this.CommaFormattedValue(obj.EmployersLiability[i].EmpSumInsured)
                            })
                          );
                        }
                     }
                }
                i+=1;
              }
        }
      }
      get EmployersArray(): FormArray {
        return this.employersLiabilityForm.get('EmployersLiability') as FormArray;
      }
      addEmployers() {
        const userGroup = this.fb.group({
          OccupationType: [''],
          NoEmployees: [''],
          EmpSumInsured: ['']
        });
        this.EmployersArray.push(userGroup);
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
              // if(this.insuranceId=='100040' || this.insuranceId=='100042'){
              this.occupationList = defaultRow.concat(data.Result);
            }
          },
          (err) => { },
        );
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
                      entry['EmployersLiability'] = this.employersLiabilityForm.value.EmployersLiability
                      entry['IndustryType'] = this.productItem.IndustryId
                      let employeerApi  = new EmployersLiabilityApiTanzaniya();
                      let employeerlist: any = employeerApi.getSaveDetails(entry, [], this.occupationList, this.industryTypeList, obj)
                      if (employeerlist) { obj = employeerlist }
                  }
                  else if(entry.SectionList){obj.SectionList=entry['SectionList']}
                  locationList.push(obj);
                  j += 1;
                  if (j == this.locationList.length) {
                    let res={
                      "locationList":locationList,
                      "type":type
                    }
                    console.log("Final Object",res);
                    if (type == 'packageData') {
                      this.saveSection.emit(res);
                    }
                    else { this.finalProceed.emit(res) }
                  }
               }
          }
      }
      removeEmployersLiability(index: number) {
        this.EmployersArray.removeAt(index);
      }
      CommaFormattedValue(data){
        if (data) data = String(data).replace(/[^0-9.]|(?<=\-..*)\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return data
      }
      skip() {
        this.skipSection.emit('Employers Liability');
      }
      previous() {
        let res = {
            "locationList": this.locationList,
            "type": 'Previous'
          }
        this.previousSection.emit(res);
      }
}
