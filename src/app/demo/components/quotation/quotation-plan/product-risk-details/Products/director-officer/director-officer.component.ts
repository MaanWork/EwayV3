import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
@Component({
  selector: 'app-director-officer',
  templateUrl: './director-officer.component.html',
  styleUrls: ['./director-officer.component.scss']
})
export class DirectorOfficerComponent {
  coversreuired: any = null;
  userDetails: any = null;
  insuranceId: any = null;
  loginId: any = null;
  productId: any = null;
  userType: any = null;
  branchCode: any = null;
  agencyCode: any = null;
  countryId: any = null;
  brokerbranchCode: any = null;
  fields: any[] = [];
  @Input() form: FormGroup;
  @Input() productItem: any;
  @Input() locationList: any[] = [];
  @Input() tabIndex: any = null;
  @Input() industryTypeList: any[] = [];
  @Input() locationDetails: any[] = [];
  @Input() renderType: any = null;
  @Output() finalProceed = new EventEmitter<any>();
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  IndustryError: boolean = false;
  DirectorOfficerForm: FormGroup;
  endorsementSection: boolean = false;
  occupationList: any[] = [];
  quoteNo: any = null;
  constructionTypes: { CodeDesc: string; Code: any; }[];
  constructor(private sharedService: SharedService, private fb: FormBuilder) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails') || '{}');
    this.coversreuired = sessionStorage.getItem('coversRequired');
    this.insuranceId = this.userDetails.Result?.InsuranceId;
    this.loginId = this.userDetails.Result?.LoginId;
    this.productId = this.userDetails.Result?.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result?.BranchCode;
    this.agencyCode = this.userDetails.Result?.OaCode;
    this.countryId = this.userDetails.Result?.CountryId;
    this.brokerbranchCode = this.userDetails.Result?.BrokerBranchCode;
    this.DirectorOfficerForm = this.fb.group({
      directorOfficer: this.fb.array([])
    });
    this.addDirectorOfficer();
  }
  ngOnInit() {
    if (this.locationList.length != 0) {
      this.onEditData();
    }
  }
  get DirectorOfficerArray(): FormArray {
    return this.DirectorOfficerForm.get('directorOfficer') as FormArray;
  }
  addDirectorOfficer(): void {
    const group = this.fb.group({
      NickName: [''],
      DomesticServantType: [''],
      BuildingBuildYear: [''],
      DirectorOfficerSumInsured: ['']
    });
    this.DirectorOfficerArray.push(group);
  }
  removeDirectorOfficer(index: number): void {
    this.DirectorOfficerArray.removeAt(index);
  }
  onEditData() {
    let k = 0;
    console.log("Location Directors",this.locationList)
    for (let obj of this.locationList) {
      if (k == this.tabIndex) {
        obj['SectionList'] = this.locationDetails[k]?.SectionList;
        const formArray = this.DirectorOfficerForm.get('directorOfficer') as FormArray;
        formArray.clear();
        const directorList = obj['SectionList']?.filter((ele: any) => ele['SectionId'] == '234');
        if (directorList && directorList.length) {
          for (let item of directorList) {
            formArray.push(
              this.fb.group({
                NickName: item.NickName,
                DomesticServantType: item.DomesticServantType,
                BuildingBuildYear: item.Age,
                DirectorOfficerSumInsured: this.CommaFormattedValue(item.SumInsured)
              })
            );
          }
        } else {
          this.addDirectorOfficer();
        }
      }
      k++;
    }
  }
  onProceedData(type: string) {
    let i = 0;
    let locationList = [];
    if (i == 0) {
      let j = 0;
      for (let entry of this.locationList) {
        // Create obj first — your original structure
        let obj = {
          LocationId: j + 1,
          LocationName: entry.LocationName,
          CoversRequired: entry.CoversRequired ?? 'BC',
          BuildingOwnerYn: entry.BuildingOwnerYn ?? 'Y',
          Address: entry.BuildingAddress,
          BuildingAddress: entry.BuildingAddress,
          SectionList: [] 
        };
        if (j == this.tabIndex) {
          if (entry.SectionList) {
            obj.SectionList = entry.SectionList.filter((ele: any) => ele.SectionId != '234');
          }
          entry['directorOfficer'] = this.DirectorOfficerForm.value.directorOfficer;
          entry['IndustryType'] = this.productItem.IndustryId;
          console.log(this.DirectorOfficerForm.value);
          let DirectorOfficerList = entry['directorOfficer'];
          if (DirectorOfficerList?.length!=0) {
            for (let index = 0; index < DirectorOfficerList.length; index++) {
              const row = DirectorOfficerList[index];
              if (row.DirectorOfficerSumInsured) {
                let altEntry = {
                  SectionId: "234",
                  CoverId: "581",
                  SectionName: "Directors & Officers",
                  Age: row.BuildingBuildYear,
                  NickName: row.NickName,
                  DomesticServantType: row.DomesticServantType,
                  SumInsured: row.DirectorOfficerSumInsured.replace(/,/g, ''),
                  Status: "Y",
                  OtherOccupation: index
                };
                obj.SectionList.push(altEntry); 
              }
              if(index==DirectorOfficerList.length-1){
                locationList.push(obj);
                j += 1;
                if (j == this.locationList.length) {this.finalRedirect(locationList,type)}
              }
            }
          }
        }
        else if(entry.SectionList){
          obj['SectionList'] = entry.SectionList;
          locationList.push(obj);
          j += 1;
          if (j == this.locationList.length) {this.finalRedirect(locationList,type)}
        }
      }
    }
  }
  finalRedirect(locationList,type){
    let res = {
      "locationList": locationList,
      "type": type
    }
    console.log("Location On Directors",locationList)
    if (type == 'packageData') {
      this.saveSection.emit(res);
    }
    else { this.finalProceed.emit(res) }
  }
  CommaFormattedDynamic(event: KeyboardEvent, name: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      const numericValue = inputElement.value.replace(/[^0-9.]/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      inputElement.value = formattedValue;
      if (!name || !this.DirectorOfficerForm.controls[name]) {
        return inputElement.value;
      } else {
        this.DirectorOfficerForm.controls[name].setValue(inputElement.value, { emitEvent: false });
      }
    }
  }
  CommaFormattedValue(data: any) {
    if (data)
      data = String(data)
        .replace(/[^0-9.]|(?<=\-..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return data;
  }
  onKeyDown(event: KeyboardEvent, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length >= 19) {
      event.preventDefault();
    }
  }
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  skip() {
    this.skipSection.emit('Directors & Officers');
  }
  previous() {
    this.previousSection.emit(true);
  }
}
