import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '@app/shared/shared.service';
import * as Mydatas from '../../../../../../../../app-config.json';
import { FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'electronic-equipment-pp-tza',
  templateUrl: './electronic-equipment-pp-tza.component.html',
  styleUrl: './electronic-equipment-pp-tza.component.scss'
})
export class ElectronicEquipmentPpTzaComponent {
  dropList:any[]=[];coversreuired:any=null;userDetails:any=null;insuranceId:any=null;loginId:any=null;
  productId:any=null;userType:any=null;branchCode:any=null;agencyCode:any=null;
  countryId:any=null;brokerbranchCode:any=null;EERiskForm: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;orgCountryList:any[]=[];
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  @Input() form: any; @Input() productItem: any;  @Input() renderType: any = null;
  @Input() locationList: any[] = [];@Input() CoversRequired:any; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();IndustryError: boolean;
  @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  constructor(private sharedService:SharedService,private fb: FormBuilder){
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
    this.EERiskForm = this.fb.group({ EERisk: this.fb.array([]) });
    this.getdropListAlt();
  }
  ngOnInit(){
     console.log("Loc2",this.locationList)  
      this.EERiskArray.clear();
      if(this.locationList.length!=0){
        if(this.locationList[this.tabIndex]['EERiskDomestic']){
          let equipDetails = this.locationList[this.tabIndex]['EERiskDomestic'];
          if(equipDetails.length!=0){
            for (let all of equipDetails) {
              const userGroup = this.fb.group({
                 'ElectronicEquipmentSI': all.SumInsured,
                  "ContentTypeId": all.ContentId,
                  'ElectronicDescription': all.Description,
                  'IndustryType': all.IndustryType
              });
              this.EERiskArray.push(userGroup);
            }
          }
          else this.addEERisk();
        } else this.addEERisk();
      }
    }
  get EERiskArray(): FormArray {
    return this.EERiskForm.get('EERisk') as FormArray;
  }
  addEERisk() {
    const userGroup = this.fb.group({
      'ElectronicEquipmentSI': null,
      "ContentTypeId": null,
      'ElectronicDescription': null,
      'IndustryType': null
    });
    this.EERiskArray.push(userGroup);
  }
  removeEERisk(index: number) {
    this.EERiskArray.removeAt(index);
  }
  getdropListAlt() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/electronicitems`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': null, 'CodeDesc': '-Select-', 'Code': null }]
          this.dropList = defaultObj.concat(data.Result);
          for (let i = 0; i < this.dropList.length; i++) {
            this.dropList[i].label = this.dropList[i]['CodeDesc'];
            this.dropList[i].value = this.dropList[i]['Code'];
            if (i == this.dropList.length - 1) {
            }
          }
        }
      },
      (err) => { },
    );
  }
  listProceed(type){
    let EERiskForm = this.EERiskForm.controls.EERisk.value;
    console.log(EERiskForm);
    if (EERiskForm) {
      console.log("Final Form Values", EERiskForm)
      this.productItem.EERiskDomestic = [];
      for (let i = 0; i < EERiskForm.length; i++) {
        if (EERiskForm[i].ContentTypeId != null && EERiskForm[i].ContentTypeId != '' &&
          EERiskForm[i].ElectronicEquipmentSI != '' && EERiskForm[i].ElectronicEquipmentSI != null && EERiskForm[i].ElectronicEquipmentSI != '0' &&
          EERiskForm[i].ElectronicDescription != '' && EERiskForm[i].ElectronicDescription != null
        ) {
          let d = {
            "ContentId": EERiskForm[i].ContentTypeId,
            "ContentDesc": this.dropList.find(ele => ele.Code == EERiskForm[i].ContentTypeId)?.CodeDesc,
            "SumInsured": EERiskForm[i].ElectronicEquipmentSI,
            "Description": EERiskForm[i].ElectronicDescription,
          }
          this.productItem.EERiskDomestic.push(d)
        }
        if (i == EERiskForm.length - 1) {
          this.locationList[this.tabIndex]['EERiskDomestic'] = this.productItem.EERiskDomestic;
          console.log("Loc",this.locationList)
          let res = {
            "locationList": this.locationList,
            "type": type
          }
          this.finalProceed.emit(res)
        }
      }
    }
  }
  previous(){
    this.previousSection.emit('ElectronicEquipment');
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
}
