import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services';
import { AgricultureApiNamibia } from '../../../models/namibia/Agriculture/AgricultureApi';
import { AgricultureNamibia } from '../../../models/namibia/Agriculture/Agriculture';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agriculture',
  standalone: false,
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.scss']
})
export class AgricultureComponent implements OnInit {
  userType: any = null;
  productId: any = null;
  AEValue: any = null;
  cropTypeList: any[] = [];
  @Input() form: FormGroup;
  coversreuired: any = null;
  insuranceId: any = null;
  @Input() productItem: any;
  userDetails: any = null;
  loginId: any = null;
  @Input() renderType: any = null;
  @Input() locationList: any[] = [];
  @Input() tabIndex: any = null;
  @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>();
  @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  branchCode: any = null;
  agencyCode: any = null;
  countryId: any = null;
  brokerbranchCode: any = null;
  fieldAgriculture: any[] = [];
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  agricultureClaimCost: any[] = [];
  districtList: any[] = [];
  stateList: any[] = [];
  coveragePercentList: any[] = [];
  regionList: any[] = [];

  constructor(private sharedService: SharedService) {
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || '{}');
    this.coversreuired = sessionStorage.getItem('coversRequired');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails') || '{}');
    this.insuranceId = this.userDetails.Result?.InsuranceId;
    this.loginId = this.userDetails.Result?.LoginId;
    this.productId = this.userDetails.Result?.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result?.BranchCode;
    this.agencyCode = this.userDetails.Result?.OaCode;
    this.countryId = this.userDetails.Result?.CountryId;
    this.brokerbranchCode = this.userDetails.Result?.BrokerBranchCode;

    let agricultureData = new AgricultureNamibia();
    this.fieldAgriculture = agricultureData?.fields?.fieldGroup || [];
  }

  ngOnInit() {
    this.getRegionList();
    if (this.locationList.length !== 0) {
      this.onEditData();
    }
  }
  getAESValue() {
    if (this.AEValue) {
      return `${this.AEValue} (AEZ)`
    }
    else null;
  }
  onChangePolicyType(event) {
    if (event.value === 'N') {
      this.fieldAgriculture = this.fieldAgriculture.map((row: any[]) =>
        row.filter((field: any) => field.key !== 'agriGroupMember')
      );
    }
    else {
      let agriGroupMemberField = {
        key: 'agriGroupMember',
        type: 'input',
        className: 'col-12 md:col-6 lg:col-4 xl:col-4',
        props: {
          label: 'Group Members',
          placeholder: 'Enter Group Members',
          required: true,
          maxLength: 2
        }
      };
      this.fieldAgriculture = this.fieldAgriculture.map((row: any[]) => {
        if (row.find(f => f.key === 'YaraPackageYN')) {
          return [...row, agriGroupMemberField];
        }
        return row;
      });
    }
  }
  getRegionList() {
    const ReqObj = { "InsuranceId": this.insuranceId };
    const urlLink = `${this.CommonApiUrl}api/agriculture/regionlist`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result?.length > 0) {
          this.regionList = data.Result.map((item: any) => ({
            label: item.CodeDesc || item.Code,
            value: item.Code
          }));
          this.regionList.unshift({ label: '-Select-', value: '' });
          this.updateFieldOptions('RegionCode', this.regionList);

          ['RegionCode', 'DistrictCode'].forEach(key => {
            this.form.get(key)?.valueChanges.subscribe(value => {
              this.onChangeDropdown(key, { value });
            });
          });
        }
      },
      (error) => console.error('Region list error', error)
    );
  }

  ongetDistrictList(type?: string, code?: any) {
    const regionValue = this.productItem.RegionCode || this.form.controls['RegionCode']?.value;
    if (!regionValue) return;

    const ReqObj = { "CountryId": this.countryId, "RegionCode": regionValue };
    const urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.stateList = (data.Result || []).map((item: any) => ({
          label: item.CodeDesc || item.Code,
          value: item.Code,
          CodeDesc: item.CodeDesc,
          Code: item.Code
        }));

        this.stateList.unshift({ label: '-Select-', value: '', CodeDesc: '-Select-', Code: '' });
        this.updateFieldOptions('DistrictCode', this.stateList);

        if (code && this.form.controls['DistrictCode']) {
          this.form.controls['DistrictCode'].setValue(code);
        }
      },
      (error) => console.error('District list error', error)
    );
  }

  ongetDistrictCropList(regionCode?: string) {
    const regionValue = regionCode || this.productItem.RegionCode || this.form.controls['RegionCode']?.value;
    if (!regionValue) return;

    const ReqObj = {
      "InsuranceId": this.insuranceId,
      "Region": regionValue,
      "ProductId": this.productId
    };
    const urlLink = `${this.CommonApiUrl}api/agriculture/croplist`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.districtList = (data.Result || []).map((item: any) => ({
          label: item.DistrictDesc || item.DistrictId,
          value: item.DistrictId,
          DistrictDesc: item.DistrictDesc,
          DistrictId: item.DistrictId,
          CropList: item.CropList,
          AEZ: item.AEZ
        }));
        this.districtList.unshift({
          label: '-Select-', value: '', DistrictDesc: '-Select-', DistrictId: '', CropList: [], AEZ: null
        });
        this.updateFieldOptions('DistrictCode', this.districtList);
        if (this.form.controls['Crop']) this.form.controls['Crop'].setValue('');
      },
      (error) => console.error('District crop list error', error)
    );
  }

  ongetAgriCropList(districtCode?: string) {
    const val = districtCode || this.productItem.DistrictCode || this.form.controls['DistrictCode']?.value;
    if (!val || !this.districtList?.length) return;

    const obj = this.districtList.find(ele => ele.DistrictId == val || ele.value == val);
    if (!obj) return;

    this.AEValue = obj?.AEZ;
    if (obj.CropList?.length > 0) {
      this.cropTypeList = obj.CropList.map((item: any) => ({
        label: item.CropDesc || item.CropId,
        value: item.CropId,
        CropDesc: item.CropDesc,
        CropId: item.CropId,
        PerHACost: item.PerHACost
      }));
    } else {
      this.cropTypeList = [];
    }

    this.cropTypeList.unshift({ label: '-Select-', value: '', CropDesc: '-Select-', CropId: '', PerHACost: null });
    this.updateFieldOptions('Crop', this.cropTypeList);
  }

  updateFieldOptions(fieldKey: string, options: any[]) {
    const field = this.fieldAgriculture.find(f => f.key === fieldKey);
    if (field?.props) field.props.options = options;
  }

  onChangeDropdown(key: string, event?: any) {
    if (key === 'RegionCode') {
      const regionValue = event?.value || this.form.controls['RegionCode']?.value;
      if (!regionValue) return;

      this.resetDistrictAndCrop();
      this.productItem.RegionCode = regionValue;
      if (this.productId === '106') this.ongetDistrictList('change', null);
      else this.ongetDistrictCropList(regionValue);
    }

    if (key === 'DistrictCode') {
      const districtValue = event?.value || this.form.controls['DistrictCode']?.value;
      if (!districtValue) return;
      this.resetCrop();
      this.productItem.DistrictCode = districtValue;
      this.ongetAgriCropList(districtValue);
    }

    if (key === 'Crop') {
      const cropValue = event?.value || this.form.controls['Crop']?.value;
      if (cropValue) this.productItem.Crop = cropValue;
      this.onSetCropHAVal();
    }

    if (key === 'FirstLossPercentId' || key === 'NoOfAcres') {
      this.onChangeYaraYN('change');
    }
  }

  resetDistrictAndCrop() {
    if (this.form.controls['DistrictCode']) this.form.controls['DistrictCode'].setValue('');
    if (this.form.controls['Crop']) this.form.controls['Crop'].setValue('');
    this.districtList = [{ label: '-Select-', value: '', DistrictDesc: '-Select-', DistrictId: '', CropList: [], AEZ: null }];
    this.cropTypeList = [{ label: '-Select-', value: '', CropDesc: '-Select-', CropId: '', PerHACost: null }];
    this.updateFieldOptions('DistrictCode', this.districtList);
    this.updateFieldOptions('Crop', this.cropTypeList);
  }

  resetCrop() {
    if (this.form.controls['Crop']) this.form.controls['Crop'].setValue('');
    this.cropTypeList = [{ label: '-Select-', value: '', CropDesc: '-Select-', CropId: '', PerHACost: null }];
    this.updateFieldOptions('Crop', this.cropTypeList);
  }

  onCheckSumInsured(event: any, key: string) {
    let inputValue = event.target.value;

    if (key === 'landSize') {
      inputValue = inputValue.replace(/[^0-9.]/g, '');
      const parts = inputValue.split('.');
      if (parts.length > 2) {
        inputValue = parts[0] + '.' + parts.slice(1).join('');
      }
      event.target.value = inputValue;
      this.form.controls['landSize'].setValue(inputValue);
    }

    const landSize = Number(this.form.controls['landSize']?.value || 0);
    const haCost = Number(this.form.controls['HACost']?.value || 0);

    if (!isNaN(landSize) && !isNaN(haCost) && landSize > 0 && haCost > 0) {
      const result = landSize * haCost;
      const formattedResult = result.toLocaleString('en-US', { maximumFractionDigits: 3 });
      this.form.controls['AgricultureSumInsured'].setValue(formattedResult);
      this.productItem.AgricultureSumInsured = formattedResult;
    }
  }

  onSetCropHAVal() {
    let val = this.form.controls['Crop']?.value;
    if (!val || !this.cropTypeList) return;

    let obj = this.cropTypeList.find(ele => ele.CropId == val);
    if (obj && this.productId === '104') {
      this.form.controls['HACost'].setValue(obj?.PerHACost);
      let landSize = this.form.controls['landSize']?.value;
      if (landSize) {
        this.onCheckSumInsured({ "target": { "value": landSize } }, 'landSize');
      }
    }
  }

  onChangeYaraYN(type: string) {
    if (this.form.controls['YaraPackageYN']?.value === 'Y') {
      let val = this.form.controls['NoOfAcres']?.value;
      let val2 = this.coveragePercentList.find(
        ele => ele.Code == this.form.controls['FirstLossPercentId']?.value
      )?.CodeDesc;
      let val3 = this.cropTypeList.find(
        ele => ele.CropId == this.form.controls['Crop']?.value
      );

      let val4 = null;
      if (val3) {
        let entry = String(val3?.PerHACost).split('.');
        val4 = entry[0];
      }

      if (val && val2 && val4) {
        const farmCareSumInsured = Number(val) * (Number(val4) * (Number(val2) / 100));
        this.form.controls['farmCareSumInsured'].setValue(farmCareSumInsured);
      }
    } else {
      if (this.form.controls['NoOfAcres']?.value) {
        this.form.controls['farmCareSumInsured'].setValue('0');
      }
    }
  }

  IndustryChanged() {
    if (this.locationList[this.tabIndex]) {
      this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
      this.IndustryError = false;
    }
  }

  onProceedData(type) {
    console.log(this.locationList,'location')
    let i = 0;
    if (!this.productItem?.IndustryId || this.productItem?.IndustryId === '0') {
      i += 1;
      this.IndustryError = true;
    } else {
      this.IndustryError = false;
    }
    let locationList = [];
    if (i == 0) {
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
        };
        if (j == this.tabIndex) {
          entry['YaraPackageYN'] = this.productItem.YaraPackageYN;
          entry['agriGroupMember'] = this.productItem.agriGroupMember;
          entry['RegionCode'] = this.productItem.RegionCode;
          entry['DistrictCode'] = this.productItem.DistrictCode;
          entry['Crop'] = this.productItem.Crop;
          entry['landSize'] = this.productItem.landSize;
          entry['HACost'] = this.productItem.HACost;
          entry['AgricultureSumInsured'] = this.productItem.AgricultureSumInsured;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        console.log(entry,'entry')
        let agricultureApi = new AgricultureApiNamibia();
        let agriculturelist: any = agricultureApi.getSaveDetails(entry, obj, this.AEValue);
        if (agriculturelist) { obj = agriculturelist; }
        else if (entry.SectionList) { obj.SectionList = entry['SectionList']; }
        locationList.push(obj);
      }

      j += 1;
      if (j == this.locationList.length) {
        let res = {
          "locationList": locationList,
          "type": type
        };
        this.finalProceed.emit(res);
      }
    }
  }

  onEditData() {
    console.log("Locations On Edit", this.locationList);
    if (this.renderType == 'Direct') {
      let i = 0;
      for (let obj of this.locationList) {
        if (this.locationDetails[i]) {
          let agricultureApi = null, subDetails = this.locationDetails[i].SectionList;
          agricultureApi = new AgricultureApiNamibia();
          obj = agricultureApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.YaraPackageYN = obj['YaraPackageYN'];
            this.productItem.agriGroupMember = obj['agriGroupMember'];
            this.productItem.RegionCode = obj['RegionCode'];
            this.productItem.DistrictCode = obj['DistrictCode'];
            this.productItem.Crop = obj['Crop'];
            this.productItem.landSize = obj['landSize'];
            this.productItem.HACost = obj['HACost'];
            this.productItem.AgricultureSumInsured = obj['AgricultureSumInsured']
          }
          i += 1;
        }
      }
      if (this.locationDetails.length != 0) {
      }
    }
    else {
      let i = 0;
      for (let loc of this.locationList) {
        if (loc && this.tabIndex == i) {
          console.log("On Next Loc", loc)
          if (
            loc['YaraPackageYN'] &&
            loc['agriGroupMember'] &&
            loc['RegionCode'] &&
            loc['DistrictCode'] &&
            loc['Crop'] &&
            loc['landSize'] &&
            loc['HACost'] &&
            loc['AgricultureSumInsured']
          ) {
            this.productItem.YaraPackageYN = loc['YaraPackageYN'];
            this.productItem.agriGroupMember = loc['agriGroupMember'];
            this.productItem.RegionCode = loc['RegionCode'];
            this.productItem.DistrictCode = loc['DistrictCode'];
            this.productItem.Crop = loc['Crop'];
            this.productItem.landSize = loc['landSize'];
            this.productItem.HACost = loc['HACost'];
            this.productItem.AgricultureSumInsured = loc['AgricultureSumInsured'];

            this.productItem.IndustryId = loc['IndustryType']
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let agricultureApi = null, subDetails = this.locationDetails[i].SectionList;
              agricultureApi = new AgricultureApiNamibia();
              loc = agricultureApi.getEditDetails(subDetails, loc);
              if (
                loc['YaraPackageYN'] &&
                loc['agriGroupMember'] &&
                loc['RegionCode'] &&
                loc['DistrictCode'] &&
                loc['Crop'] &&
                loc['landSize'] &&
                loc['HACost'] &&
                loc['AgricultureSumInsured'] &&
                loc['IndustryType']
              ) {
                this.productItem.YaraPackageYN = loc['YaraPackageYN'];
                this.productItem.agriGroupMember = loc['agriGroupMember'];
                this.productItem.RegionCode = loc['RegionCode'];
                this.productItem.DistrictCode = loc['DistrictCode'];
                this.productItem.Crop = loc['Crop'];
                this.productItem.landSize = loc['landSize'];
                this.productItem.HACost = loc['HACost'];
                this.productItem.AgricultureSumInsured = loc['AgricultureSumInsured'];
                this.productItem.IndustryId = loc['IndustryType'];
              }

            }
          }
        }
        i += 1;
      }
    }
    console.log("Final Location", this.locationList)
  }

  skip() {
    this.skipSection.emit(true);
  }

  previous() {
    this.previousSection.emit(true);
  }
}