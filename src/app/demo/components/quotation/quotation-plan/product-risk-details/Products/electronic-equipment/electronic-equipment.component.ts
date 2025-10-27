import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
import { ElectronicEquipmentNamibia } from '../../../models/phoneix/PhoenixNamibia/ElectronicEquipment/Electronicequipment';
import { ElectronicEquipmentSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/ElectronicEquipment/Electronicequipment';
import { ElectronicEquipmentMozambique } from '../../../models/phoneix/PhoenixMozambique/ElectronicEquipment/Electronicequipment';
import { ElectronicEquipmentBotswana } from '../../../models/phoneix/PhoenixBotswana/ElectronicEquipment/Electronicequipment';
import { ElectronicEquipmentPhoenix } from '../../../models/phoneix/PhoenixZambia/ElectronicEquipment/Electronicequipment';
import { ElectronicEquipmentApi } from '../../../models/phoneix/PhoenixZambia/ElectronicEquipment/ElectronicEquipmentApi';
import { ElectronicEquipmentPersonalApiBotswana } from '../../../models/phoneix/PhoenixBotswana/PersonalPackagePlus/ElectronicEquipment/ElectronicEquipmentApi';
import { ElectronicEquipmentApiMozambique } from '../../../models/phoneix/PhoenixMozambique/ElectronicEquipment/ElectronicEquipmentApi';
import { ElectronicEquipmentPersonalApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/PersonalPackagePlus/ElectronicEquipment/ElectronicEquipmentApi';
import { ElectronicEquipmentApiNamibia } from '../../../models/phoneix/PhoenixNamibia/ElectronicEquipment/ElectronicEquipmentApi';
import { ElectronicEquipmentPersonalApiNamibia } from '../../../models/namibia/PersonalPackagePlus/ElectronicEquipment/ElectronicEquipmentApi';
import { ElectronicEquipmentApiTanzaniya } from '../../../models/Tanzaniya/ElectronicEquipmentApi';
@Component({
  selector: 'app-electronic-equipment',
  templateUrl: './electronic-equipment.component.html',
  styleUrls: ['./electronic-equipment.component.scss']
})
export class ElectronicEquipmentComponent {
  coversreuired: any = null; userDetails: any = null; insuranceId: any = null; loginId: any = null; productId: any = null; userType: any = null;
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null; fields: any[] = [];
  @Input() form: FormGroup; @Input() productItem: any; @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = []; @Input() renderType: any = null;
  public AppConfig: any = (Mydatas as any).default; employersLiabilityForm: FormGroup; IndustryError: boolean = false; electronicPortableEquipmentForm: FormGroup;
  public ApiUrl1: any = this.AppConfig.ApiUrl1; endorsementSection: boolean = false; electronicEquipmentForm: FormGroup;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  fieldEE: any[] = []; claimCostList: any; electronicEquipList: any[] = [];
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
    let contentData4: any;
    if (this.insuranceId == "100046") contentData4 = new ElectronicEquipmentPhoenix();
    else if (this.insuranceId == '100047') contentData4 = new ElectronicEquipmentBotswana();
    else if (this.insuranceId == '100048') contentData4 = new ElectronicEquipmentMozambique();
    else if (this.insuranceId == '100049') contentData4 = new ElectronicEquipmentSwaziland();
    else if (this.insuranceId == '100050') contentData4 = new ElectronicEquipmentNamibia();
    this.fieldEE[0] = contentData4?.fields;
    this.electronicEquipmentForm = this.fb.group({ ElectronicEquipment: this.fb.array([]) });
    this.electronicPortableEquipmentForm = this.fb.group({ ElectronicPortableEquipment: this.fb.array([]) });
    this.addElectronicEquipment(); this.addElectronicPortableEquipment()
    this.getClaimPreparationList(); this.getElectronicEquipmentList();
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
    if (this.renderType == 'Direct') {
      let i = 0;
      for (let obj of this.locationList) {
        if (this.locationDetails[i]) {
          let electronicEquipment: any, subDetails = this.locationDetails[i].SectionList
          if (this.insuranceId == "100046") electronicEquipment = new ElectronicEquipmentApi();
          else if (this.insuranceId == '100047') electronicEquipment = new ElectronicEquipmentPersonalApiBotswana();
          else if (this.insuranceId == '100048') electronicEquipment = new ElectronicEquipmentApiMozambique();
          else if (this.insuranceId == '100049') electronicEquipment = new ElectronicEquipmentPersonalApiSwaziland();
          else if (this.insuranceId == '100050' && this.productId != '93') electronicEquipment = new ElectronicEquipmentApiNamibia();
          else if (this.insuranceId == '100050' && this.productId == '93') electronicEquipment = new ElectronicEquipmentPersonalApiNamibia();
          if (electronicEquipment && electronicEquipment.getEditDetails(subDetails, obj)) {
            if (obj && this.tabIndex == i) {
              obj = electronicEquipment.getEditDetails(subDetails, obj);
              console.log('editobj', obj);

              if (obj?.IndustryType) this.productItem.IndustryId = obj?.IndustryType
              if (obj?.ElectronicEquipment) {
                const electronicEquipmentArray = this.electronicEquipmentForm.get('ElectronicEquipment') as FormArray;
                electronicEquipmentArray.clear();
                for (let i = 0; i < obj.ElectronicEquipment.length; i++) {
                  electronicEquipmentArray.push(
                    this.fb.group({
                      CategoryId: obj.ElectronicEquipment[i].CategoryId,
                      SumInsured: this.CommaFormattedValue(obj.ElectronicEquipment[i].SumInsured),
                      Description: obj.ElectronicEquipment[i].Description
                    })
                  );
                }
              }
              if (obj?.ElectronicPortableEquipment) {
                const electronicEquipmentPortableArray = this.electronicPortableEquipmentForm.get('ElectronicPortableEquipment') as FormArray;
                electronicEquipmentPortableArray.clear();
                for (let i = 0; i < obj.ElectronicPortableEquipment.length; i++) {
                  electronicEquipmentPortableArray.push(
                    this.fb.group({
                      SumInsured: this.CommaFormattedValue(obj.ElectronicPortableEquipment[i].SumInsured),
                      Description: obj.ElectronicPortableEquipment[i].Description
                    })
                  );
                }
              }
              if (obj?.IncreasedCostofWorking) this.productItem.IncreasedCostofWorking = obj?.IncreasedCostofWorking;
              if (obj?.IncompatibilityCover) this.productItem.IncompatibilityCover = obj?.IncompatibilityCover;
              if (obj?.EEclaimsPreparationCosts) this.productItem.EEclaimsPreparationCosts = obj?.EEclaimsPreparationCosts;
              if (obj?.ElectronicEquipmentDesc) this.productItem.ElectronicEquipmentDesc = obj?.ElectronicEquipmentDesc;
              if (obj?.VariousPortableEquipmentDesc) this.productItem.VariousPortableEquipmentDesc = obj?.VariousPortableEquipmentDesc;
              if (obj?.IncreasedCostofWorkingDesc) this.productItem.IncreasedCostofWorkingDesc = obj?.IncreasedCostofWorkingDesc;
              if (obj?.IncompatibilityCoverDesc) this.productItem.IncompatibilityCoverDesc = obj?.IncompatibilityCoverDesc;
              if (obj?.EEclaimsPreparationCostsDesc) this.productItem.EEclaimsPreparationCostsDesc = obj?.EEclaimsPreparationCostsDesc;
            }
          }
        }
        i += 1;
      }
    }
    else {
      let i = 0;
      console.log("On Edit Location", this.locationList)
      for (let obj of this.locationList) {
        if (obj && this.tabIndex == i) {
          if (obj.SectionList) {
            let electronicEquipment: any;
            if (this.insuranceId == "100046") electronicEquipment = new ElectronicEquipmentApi();
            else if (this.insuranceId == '100047') electronicEquipment = new ElectronicEquipmentPersonalApiBotswana();
            else if (this.insuranceId == '100048') electronicEquipment = new ElectronicEquipmentApiMozambique();
            else if (this.insuranceId == '100049') electronicEquipment = new ElectronicEquipmentPersonalApiSwaziland();
            else if (this.insuranceId == '100050' && this.productId != '93') electronicEquipment = new ElectronicEquipmentApiNamibia();
            else if (this.insuranceId == '100050' && this.productId == '93') electronicEquipment = new ElectronicEquipmentPersonalApiNamibia();
            obj = electronicEquipment.getEditDetails(obj.SectionList, obj);
            if (obj?.IndustryType) this.productItem.IndustryId = obj?.IndustryType
            if (obj?.ElectronicEquipment) {
                const electronicEquipmentArray = this.electronicEquipmentForm.get('ElectronicEquipment') as FormArray;
                electronicEquipmentArray.clear();
                for (let i = 0; i < obj.ElectronicEquipment.length; i++) {
                  electronicEquipmentArray.push(
                    this.fb.group({
                      CategoryId: obj.ElectronicEquipment[i].CategoryId,
                      SumInsured: this.CommaFormattedValue(obj.ElectronicEquipment[i].SumInsured),
                      Description: obj.ElectronicEquipment[i].Description
                    })
                  );
                }
              }
              if (obj?.ElectronicPortableEquipment) {
                const electronicEquipmentPortableArray = this.electronicPortableEquipmentForm.get('ElectronicPortableEquipment') as FormArray;
                electronicEquipmentPortableArray.clear();
                for (let i = 0; i < obj.ElectronicPortableEquipment.length; i++) {
                  electronicEquipmentPortableArray.push(
                    this.fb.group({
                      SumInsured: this.CommaFormattedValue(obj.ElectronicPortableEquipment[i].SumInsured),
                      Description: obj.ElectronicPortableEquipment[i].Description
                    })
                  );
                }
              }
            if (obj?.IncreasedCostofWorking) this.productItem.IncreasedCostofWorking = obj?.IncreasedCostofWorking;
            if (obj?.IncompatibilityCover) this.productItem.IncompatibilityCover = obj?.IncompatibilityCover;
            if (obj?.EEclaimsPreparationCosts) this.productItem.EEclaimsPreparationCosts = obj?.EEclaimsPreparationCosts;
            if (obj?.ElectronicEquipmentDesc) this.productItem.ElectronicEquipmentDesc = obj?.ElectronicEquipmentDesc;
            if (obj?.VariousPortableEquipmentDesc) this.productItem.VariousPortableEquipmentDesc = obj?.VariousPortableEquipmentDesc;
            if (obj?.IncreasedCostofWorkingDesc) this.productItem.IncreasedCostofWorkingDesc = obj?.IncreasedCostofWorkingDesc;
            if (obj?.IncompatibilityCoverDesc) this.productItem.IncompatibilityCoverDesc = obj?.IncompatibilityCoverDesc;
            if (obj?.EEclaimsPreparationCostsDesc) this.productItem.EEclaimsPreparationCostsDesc = obj?.EEclaimsPreparationCostsDesc;
          }
        }
        i += 1;
      }
    }
  } CommaFormattedValue(data) {
    if (data) data = String(data).replace(/[^0-9.]|(?<=\-..*)\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return data
  }
  getElectronicEquipmentList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "Electronic Items"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.electronicEquipList = defaultObj.concat(data.Result);
      })
  }
  getClaimPreparationList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "CLAIM_COST"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.claimCostList = defaultObj.concat(data.Result);
        console.log(this.claimCostList);
        for (let i = 0; i < this.claimCostList.length; i++) {
          this.claimCostList[i].label = this.claimCostList[i]['CodeDesc'];
          this.claimCostList[i].value = this.claimCostList[i]['Code'];
          if (i == this.claimCostList.length - 1) {
            if (this.productId != '68') {
              let field4 = this.fieldEE[0]?.fieldGroup[0]?.fieldGroup;
              if (field4) {
                for (let field of field4) { if (field.key == 'AdditionalClaimsPreparationCosts') { field.templateOptions.options = this.claimCostList; } }
              }
            }
            let field5 = this.fieldEE[0]?.fieldGroup[0]?.fieldGroup[0]?.fieldGroup[1]?.fieldGroup;
            if (field5) {
              for (let field of field5) {
                for (let field1 of field.fieldGroup)
                  if (field1.key == 'EEclaimsPreparationCosts') { field1.templateOptions.options = this.claimCostList; }
              }
            }
          }
        }
      })
  }
  get ElectronicEquipmentArray(): FormArray {
    return this.electronicEquipmentForm.get('ElectronicEquipment') as FormArray;
  }
  get ElectronicPortableEquipmentArray(): FormArray {
    return this.electronicPortableEquipmentForm.get('ElectronicPortableEquipment') as FormArray;
  }
  addElectronicEquipment() {
    const userGroup = this.fb.group({ CategoryId: [''], Description: [''], SumInsured: [''] });
    this.ElectronicEquipmentArray.push(userGroup);
  }
  addElectronicPortableEquipment() {
    const userGroup = this.fb.group({ Description: [''], SumInsured: [''] });
    this.ElectronicPortableEquipmentArray.push(userGroup);
  }
  removeElectronicPortableEquipment(index: number) {
    this.ElectronicPortableEquipmentArray.removeAt(index);
  }
  removeElectronicEquipment(index: number) {
    this.ElectronicEquipmentArray.removeAt(index);
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
          "SectionList": []
        }
        if (j == this.tabIndex) {
          entry['ElectronicEquipment'] = this.electronicEquipmentForm.value.ElectronicEquipment
          entry['ElectronicPortableEquipment'] = this.electronicPortableEquipmentForm.value.ElectronicPortableEquipment
          entry['IncreasedCostofWorking'] = this.productItem.IncreasedCostofWorking
          entry['IncompatibilityCover'] = this.productItem.IncompatibilityCover
          entry['EEclaimsPreparationCosts'] = this.productItem.EEclaimsPreparationCosts
          entry['ElectronicEquipmentDesc'] = this.productItem.ElectronicEquipmentDesc
          entry['VariousPortableEquipmentDesc'] = this.productItem.VariousPortableEquipmentDesc
          entry['IncreasedCostofWorkingDesc'] = this.productItem.IncreasedCostofWorkingDesc
          entry['IncompatibilityCoverDesc'] = this.productItem.IncompatibilityCoverDesc
          entry['EEclaimsPreparationCostsDesc'] = this.productItem.EEclaimsPreparationCostsDesc;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        if (entry['ElectronicEquipment'] || entry['VariousPortableEquipment'] || entry['IncreasedCostofWorking'] ||
          entry['IncompatibilityCover'] || entry['EEclaimsPreparationCosts'] || entry['ElectronicEquipmentDesc'] ||
          entry['VariousPortableEquipmentDesc'] || entry['IncreasedCostofWorkingDesc'] || entry['IncompatibilityCoverDesc'] || entry['EEclaimsPreparationCostsDesc']) {
          let elecEquipment: any;
          if (this.insuranceId == "100046") elecEquipment = new ElectronicEquipmentApi();
          else if (this.insuranceId == '100047') elecEquipment = new ElectronicEquipmentPersonalApiBotswana();
          else if (this.insuranceId == '100048') elecEquipment = new ElectronicEquipmentApiMozambique();
          else if (this.insuranceId == '100049') elecEquipment = new ElectronicEquipmentPersonalApiSwaziland();
          else if (this.insuranceId == '100050' && this.productId != '93') elecEquipment = new ElectronicEquipmentApiNamibia();
          else if (this.insuranceId == '100050' && this.productId == '93') elecEquipment = new ElectronicEquipmentPersonalApiNamibia();
          else if (this.insuranceId == '100002') elecEquipment = new ElectronicEquipmentApiTanzaniya();
          let elecEquipmentList: any = elecEquipment.getSaveDetails(entry, this.industryTypeList, this.claimCostList, obj, []);
          if (elecEquipmentList) {
            let list = [];
            if (entry.SectionList) list = entry.SectionList.filter(ele => ele.SectionId != '76');
            if (elecEquipmentList.SectionList) elecEquipmentList.SectionList = elecEquipmentList.SectionList.concat(list)
            obj = elecEquipmentList
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
    this.previousSection.emit(true);
  }
}