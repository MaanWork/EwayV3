import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { KidnapRansomApiNamibia } from '../../../models/namibia/KidnapRansom/kidnapandransomApi';
import { KidnapRansomNamibia } from '../../../models/namibia/KidnapRansom/kidnapandransom';
@Component({
  selector: 'app-kidnapAndRansom',
  templateUrl: './kidnapAndRansom.component.html',
  styleUrls: ['./kidnapAndRansom.component.scss']
})
export class KidnapAndRansomComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() productItem: any;
  @Input() renderType: any = null;
  @Input() locationList: any[] = [];
  @Input() tabIndex: any = null;
  @Input() industryTypeList: any[] = [];
  @Input() locationDetails: any[] = [];
  @Output() finalProceed = new EventEmitter<any>();
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  IndustryError: boolean;
  userDetails: any = null;
  insuranceId: any = null;
  loginId: any = null;
  branchCode: any = null;
  agencyCode: any = null;
  countryId: any = null;
  brokerbranchCode: any = null;
  productId: any;
  userType: any;
  KidnapAndRansomTable: any[] = [];
  fieldKidnapRansom: any[] = [];
  constructor(private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails?.Result?.InsuranceId;
    this.loginId = this.userDetails?.Result?.LoginId;
    this.productId = this.userDetails?.Result?.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails?.Result?.BranchCode;
    this.agencyCode = this.userDetails?.Result?.OaCode;
    this.countryId = this.userDetails?.Result?.CountryId;
    this.brokerbranchCode = this.userDetails?.Result?.BrokerBranchCode;
    // Load Kidnap & Ransom Fields dynamically (Namibia)
    if (this.productId == '90' || this.productId == '102') {
      const data = new KidnapRansomNamibia(this.sharedService);
      this.fieldKidnapRansom[0] = data.policyfields1.fieldGroup;
      this.KidnapAndRansomTable = this.groupFields(data.policyfields1.fieldGroup);
    }
  }
  ngOnInit() {
    // Dynamically add reactive form controls
    if (this.KidnapAndRansomTable?.length) {
      this.addDynamicControls();
    }
    if (this.locationList.length !== 0) {
      this.onEditData();
    }
  }
  /** Group the fields in pairs for table display */
  groupFields(fieldGroup: any[]) {
    const grouped = [];
    for (let i = 0; i < fieldGroup.length; i += 2) {
      grouped.push([fieldGroup[i], fieldGroup[i + 1]]);
    }
    return grouped;
  }
  /** Dynamically add form controls for Kidnap & Ransom table */
  addDynamicControls() {
    if (!this.form) return;
    this.KidnapAndRansomTable.forEach(row => {
      // Column 1
      if (row[0]?.key && !this.form.contains(row[0].key)) {
        this.form.addControl(
          row[0].key,
          new FormControl(
            this.productItem[row[0].key] || '',
            row[0]?.props?.required ? Validators.required : null
          )
        );
      }
      // Column 2
      if (row[1]?.key && !this.form.contains(row[1].key)) {
        this.form.addControl(
          row[1].key,
          new FormControl(
            this.productItem[row[1].key] || '',
            row[1]?.props?.required ? Validators.required : null
          )
        );
      }
    });
  }
  onEditData() {
    console.log("Locations On Edit", this.locationList);
    if (this.renderType == 'Direct') {
      let kidnapApi = null;
      kidnapApi = new KidnapRansomApiNamibia();
      let i = 0;
      for (let obj of this.locationList) {
        const subDetails = this.locationDetails[i]?.SectionList;
        const updatedObj = kidnapApi?.getEditDetails(subDetails, obj);
        if (updatedObj && this.tabIndex == i) {
          this.productItem.kidnapRansom = updatedObj['kidnapRansom'];
          this.productItem.kidnapRansomTransit = updatedObj['kidnapRansomTransit'];
          this.productItem.kidnapResponse = updatedObj['kidnapResponse'];
          this.productItem.kidnapAdditional = updatedObj['kidnapAdditional'];
          this.productItem.kidnaprehabilitation = updatedObj['kidnaprehabilitation'];
          this.productItem.kidnapLegalLiability = updatedObj['kidnapLegalLiability'];
          this.productItem.kidnapPersonalCapital = updatedObj['kidnapPersonalCapital'];
          this.productItem.IndustryId = updatedObj['IndustryType'];
          // if (this.form) {
          //   this.form.patchValue({
          //     kidnapRansom: this.productItem.kidnapRansom,
          //     kidnapRansomTransit: this.productItem.kidnapRansomTransit,
          //     kidnapResponse: this.productItem.kidnapResponse,
          //     kidnapAdditional: this.productItem.kidnapAdditional,
          //     kidnaprehabilitation: this.productItem.kidnaprehabilitation,
          //     kidnapLegalLiability: this.productItem.kidnapLegalLiability,
          //     kidnapPersonalCapital: this.productItem.kidnapPersonalCapital
          //   });
          // }
        }
        i++;
      }
    } else {
      let i = 0;
      for (let loc of this.locationList) {
        if (this.tabIndex == i) {
          console.log("On Next Loc", loc);
          if (loc['kidnapRansom'] && loc['kidnapResponse']) {
            this.productItem.kidnapRansom = loc['kidnapRansom'];
            this.productItem.kidnapRansomTransit = loc['kidnapRansomTransit'];
            this.productItem.kidnapResponse = loc['kidnapResponse'];
            this.productItem.kidnapAdditional = loc['kidnapAdditional'];
            this.productItem.kidnaprehabilitation = loc['kidnaprehabilitation'];
            this.productItem.kidnapLegalLiability = loc['kidnapLegalLiability'];
            this.productItem.kidnapPersonalCapital = loc['kidnapPersonalCapital'];
            this.productItem.IndustryId = loc['IndustryType'];
          } else if (loc.SectionList && loc.SectionList.length > 0) {
            const subDetails = this.locationDetails[i]?.SectionList;
            let kidnapApi = null;
            kidnapApi = new KidnapRansomApiNamibia();
            const updatedLoc = kidnapApi?.getEditDetails(subDetails, loc);
            if (updatedLoc?.kidnapRansom || updatedLoc?.kidnapResponse) {
              this.productItem.kidnapRansom = updatedLoc['kidnapRansom'];
              this.productItem.kidnapRansomTransit = updatedLoc['kidnapRansomTransit'];
              this.productItem.kidnapResponse = updatedLoc['kidnapResponse'];
              this.productItem.kidnapAdditional = updatedLoc['kidnapAdditional'];
              this.productItem.kidnaprehabilitation = updatedLoc['kidnaprehabilitation'];
              this.productItem.kidnapLegalLiability = updatedLoc['kidnapLegalLiability'];
              this.productItem.kidnapPersonalCapital = updatedLoc['kidnapPersonalCapital'];
              this.productItem.IndustryId = updatedLoc['IndustryType'];
            }
          }
        }
        i++;
      }
    }
  }
  onProceedData(type) {
    console.log("Locations", this.locationList);
    let i = 0;
    // if (
    //   this.productItem?.IndustryId === '' ||
    //   this.productItem?.IndustryId === null ||
    //   this.productItem?.IndustryId === undefined ||
    //   this.productItem?.IndustryId === '0'
    // ) {
    //   i += 1;
    //   this.IndustryError = true;
    // } else {
    //   this.IndustryError = false;
    // }
    let locationList = [];
    if (i == 0) {
      let j = 0;
      for (let entry of this.locationList) {
        if (entry.BuildingOwnerYn == null) entry.BuildingOwnerYn = 'Y';
        if (entry.CoversRequired == null) entry.CoversRequired = 'BC';
        let obj = {
          LocationId: j + 1,
          LocationName: entry.LocationName,
          CoversRequired: entry.CoversRequired,
          BuildingOwnerYn: entry.BuildingOwnerYn,
          Address: entry.BuildingAddress,
          SectionList: []
        };
        if (j == this.tabIndex) {
          if (entry.SectionList) {
            obj['SectionList'] = entry.SectionList.filter((ele: any) => ele.SectionId != '236');
          }
          if (this.productItem.kidnapRansom != null) entry['kidnapRansom'] = String(this.productItem.kidnapRansom).replaceAll(',', '');
          if (this.productItem.kidnapRansomTransit != null) entry['kidnapRansomTransit'] = String(this.productItem.kidnapRansomTransit).replaceAll(',', '');;
          if (this.productItem.kidnapResponse != null) entry['kidnapResponse'] = String(this.productItem.kidnapResponse).replaceAll(',', '');;
          if (this.productItem.kidnapAdditional != null) entry['kidnapAdditional'] = String(this.productItem.kidnapAdditional).replaceAll(',', '');;
          if (this.productItem.kidnaprehabilitation != null) entry['kidnaprehabilitation'] = String(this.productItem.kidnaprehabilitation).replaceAll(',', '');;
          if (this.productItem.kidnapLegalLiability != null) entry['kidnapLegalLiability'] = String(this.productItem.kidnapLegalLiability).replaceAll(',', '');;
          if (this.productItem.kidnapPersonalCapital != null) entry['kidnapPersonalCapital'] = String(this.productItem.kidnapPersonalCapital).replaceAll(',', '');;
          entry['IndustryType'] = this.productItem.IndustryId;
          let kidnapApi = new KidnapRansomApiNamibia();
          console.log("entry",kidnapApi);
          if (entry['kidnapResponse'] != undefined || entry['kidnapRansom'] != undefined) {
            let kidnapList = kidnapApi?.getSaveDetails(entry, obj);
            if (kidnapList) {
              console.log("Final Log",kidnapList);
              let list = [];
              if (entry.SectionList) list = entry.SectionList.filter(ele => ele.SectionId != '236');
              if (kidnapList.SectionList) kidnapList.SectionList = kidnapList.SectionList.filter(ele=>ele.SectionId == '236').concat(list)
              obj = kidnapList
            }
          }
        }
        else if (entry.SectionList) {
          obj.SectionList = entry['SectionList'];
        }
        locationList.push(obj);
        j++;
        if (j == this.locationList.length) {
          const res = {
            locationList: locationList,
            type: type
          };
          console.log("Location List",this.locationList)
          if (type == 'packageData') {
            console.log('ress', res);
            this.saveSection.emit(res);
          }
          else {
            this.finalProceed.emit(res)
          }
        }
      }
    }
  }
  skip() {
    this.skipSection.emit('Kidnap & Ransom');
  }
  previous() {
    this.previousSection.emit(true);
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
  onKeyDown(event: KeyboardEvent, field) {
    const inputElement = event.target as HTMLInputElement;
    let maxLength = 0;
    maxLength = 19;
    if (inputElement.value.length >= maxLength) {
      event.preventDefault();
    }
  }
}
