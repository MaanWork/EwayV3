import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElectronicEquipmentApiTanzaniya } from '../../../models/Tanzaniya/ElectronicEquipmentApi';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ElectronicEquipmentNew } from '../../../models/Tanzaniya/ElectronicEquipmentNew';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { ElectronicEquipmentTanzaniyaApi } from '../../../models/Tanzaniya/ElectronicEquipment/ElectronicEquimentTanzaniyaApi';
@Component({
  selector: 'electronic-equipment-tza',
  templateUrl: './electronic-equipment.component.html',
  styleUrl: './electronic-equipment.component.scss'
})
export class ElectronicEquipmentTZAComponent {
    coversreuired: any = null; userDetails: any = null; insuranceId: any = null; loginId: any = null; productId: any = null; userType: any = null;
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null; fields: any[] = [];
  @Input() form: FormGroup; @Input() productItem: any; @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = []; @Input() renderType: any = null;
  public AppConfig: any = (Mydatas as any).default; employersLiabilityForm: FormGroup; IndustryError: boolean = false;
  public ApiUrl1: any = this.AppConfig.ApiUrl1; endorsementSection: boolean = false; EETanzaniyaForm:any;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  fieldEE: any[] = []; claimCostList: any; electronicEquipList: any[] = [];
  dropList: any[]=[];
  constructor(private sharedService: SharedService, private fb: FormBuilder,) {
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
    this.EETanzaniyaForm = this.fb.group({ EETanzaniya: this.fb.array([]) });
     const EETanzaniyaArray = this.EETanzaniyaForm.get('EETanzaniya') as FormArray;
      EETanzaniyaArray.clear();
      this.addEETanzaniya();
    this.getdropList();
  }
  ngOnInit() {
    if (this.locationList.length != 0) {
      this.onEditData();
    }
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
  onEditData() {
      let i = 0;
      for (let obj of this.locationList) {
        let subDetails = null;
        if (obj.SectionList) {
          subDetails = obj.SectionList;
          let Api = new ElectronicEquipmentTanzaniyaApi();
          const electronicEquipmentResult = Api.getEditDetails(subDetails, obj);
          if (electronicEquipmentResult !== undefined) {
            obj = electronicEquipmentResult;
          }
        }
       if(this.tabIndex==i && subDetails){
            this.productItem.IndustryId = obj?.IndustryType;
            if (obj.EETanzaniya && obj.EETanzaniya.length > 0) {
              const EETanzaniyaArray = this.EETanzaniyaForm.get('EETanzaniya') as FormArray;
              EETanzaniyaArray.clear();
              for (let entry of obj.EETanzaniya) {
                const userGroup = this.fb.group({
                  ContentId: entry.ContentId,
                  SerialNo: entry.SerialNo,
                  SumInsured: this.CommaFormattedValue(entry.SumInsured),
                  DescriptionOfRisk: entry.DescriptionOfRisk
                });
                EETanzaniyaArray.push(userGroup);
              }
            }
        }
        i += 1;
      }
  }
  CommaFormattedValue(data) {
    if (data) data = String(data).replace(/[^0-9.]|(?<=\-..*)\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return data
  }
  getdropList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/content`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': null, 'CodeDesc': '-Select-', 'Code': null }]
          this.dropList = defaultObj.concat(data.Result);
        }
      },
      (err) => { },
    );
  }
  addEETanzaniya() {
    const userGroup = this.fb.group({
      ContentId: [''],
      SerialNo: [''],
      SumInsured: [''],
      DescriptionOfRisk: ['']
    });
    this.EETanzaniyaArray.push(userGroup);
  }
  get EETanzaniyaArray(): FormArray {
    return this.EETanzaniyaForm.get('EETanzaniya') as FormArray;
  }
  removeEmployersLiability(index: number) {
    this.EETanzaniyaArray.removeAt(index);
  }
  onProceedData(type) {
    console.log("Final Location List", this.locationList)
    let i = 0;
    if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
    else { this.IndustryError = false; }
    let locationList = [];
    if (i == 0 || type == 'Previous') {
      let j = 0;
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
        if (j == this.tabIndex) {
         entry['IndustryType'] = obj['IndustryType'] = this.productItem.IndustryId;
         entry['EETanzaniya'] = obj['EETanzaniya'] = this.EETanzaniyaForm.value.EETanzaniya;
         let Form = this.EETanzaniyaForm.value.EETanzaniya;
            let result: any[] = [];
            if (Form) {
              obj['SectionList'] = [];
              for (let i = 0; i < Form.length; i++) {
                if (Form[i].SumInsured != '0' && Form[i].SumInsured != 0 && Form[i].SumInsured != null && Form[i].SumInsured != 'null') {
                  let d = {
                    "ElecEquipSuminsured": String(Form[i].SumInsured).replaceAll(',', ''),
                    "SumInsured": String(Form[i].SumInsured).replaceAll(',', ''),
                    "SectionId": "76",
                    "SectionName": "Electronic Equipment",
                    "CoverId": '90',
                    "ContentId": Form[i].ContentId,
                    "ContentDesc": this.dropList.find(ele => ele.Code == Form[i].ContentId)?.CodeDesc,
                    "DescriptionOfRisk": Form[i].DescriptionOfRisk,
                    "SerialNo": Form[i].SerialNo,
                    "IndustryType": entry.IndustryType,
                    "IndustryId": entry.IndustryType,
                    "OtherOccupation":j,
                    "IndustryTypeDesc": this.industryTypeList.find(ele => ele.Code == entry.IndustryId)?.CodeDesc
                  }
                  obj.SectionList.push(d);
                }
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
          else { this.finalProceed.emit(res) }
        }
      }
    }
  }
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  skip() {
    this.skipSection.emit('Electronic Equipment');
  }
  previous() {
      let res = {
          "locationList": this.locationList,
          "type": 'Previous'
        }
      this.previousSection.emit(res);
    }
}
