import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services';
import { ThirdPartyLiabilityEngineeringNamibia } from '../../../models/namibia/EngineeringPackagePlus/ThirdPartyLiability/ThirdPartyLiability';
import { ThirdPartyLiabilityEngineeringNamibiaApi } from '../../../models/namibia/EngineeringPackagePlus/ThirdPartyLiability/ThirdPartyLiabilityApi';

@Component({
  selector: 'app-thirdparty-liability',
  standalone: false,
  templateUrl: './thirdparty-liability.component.html',
  styleUrls: ['./thirdparty-liability.component.scss']
})
export class ThirdpartyLiabilityComponent implements OnInit {

  @Input() form: any;
  @Input() productItem: any = {};
  @Input() renderType: any = null;
  @Input() locationList: any[] = [];
  @Input() tabIndex: any = null;
  @Input() industryTypeList: any[] = [];
  @Input() locationDetails: any[] = [];

  @Output() finalProceed = new EventEmitter<any>();
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();

  userType: any = null;
  productId: any = null;
  insuranceId: any = null;
  userDetails: any = null;
  loginId: any = null;
  branchCode: any = null;
  agencyCode: any = null;
  countryId: any = null;
  brokerbranchCode: any = null;
  coversRequired: any = null;

  fieldthirdparty: any[] = [];
  IndustryError: boolean = false;

  thirdClaimCost: any[] = [];
  liabilityList: any[] = [];

  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

  constructor(private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails') || '{}');
    this.insuranceId = this.userDetails?.Result?.InsuranceId;
    this.loginId = this.userDetails?.Result?.LoginId;
    this.productId = this.userDetails?.Result?.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails?.Result?.BranchCode;
    this.agencyCode = this.userDetails?.Result?.OaCode;
    this.countryId = this.userDetails?.Result?.CountryId;
    this.brokerbranchCode = this.userDetails?.Result?.BrokerBranchCode;
    this.coversRequired = sessionStorage.getItem('coversRequired');

    const tplData = new ThirdPartyLiabilityEngineeringNamibia();
    this.fieldthirdparty[0] = tplData?.fields || [];
  }

  ngOnInit() {
    // Fetch dropdowns first, then patch model
    Promise.all([this.getClaimPreparationList(), this.getLiabilityList()]).then(() => {
      if (this.locationList.length) {
        this.onEditData();
      }
    });
  }

  getClaimPreparationList(): Promise<void> {
    return new Promise((resolve) => {
      const ReqObj = { InsuranceId: this.insuranceId, ItemType: 'CLAIM_COST' };
      const urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;

      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
        const defaultObj = [{ CodeDesc: '-Select-', Code: null }];
        this.thirdClaimCost = defaultObj.concat(data.Result || []);
        this.thirdClaimCost.forEach(item => {
          item.label = item.CodeDesc;
          item.value = item.Code !== null ? String(item.Code).trim() : null;
        });

        this.setDropdownOptions('TPLClaimPreparationCosts', this.thirdClaimCost);
        resolve();
      });
    });
  }

  getLiabilityList(): Promise<void> {
    return new Promise((resolve) => {
      const ReqObj = { InsuranceId: this.insuranceId, ItemType: 'THIRD_PARTY_TYPES' };
      const urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;

      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
        const defaultObj = [{ CodeDesc: '-Select-', Code: null }];
        this.liabilityList = defaultObj.concat(data.Result || []);
        this.liabilityList.forEach(item => {
          item.label = item.CodeDesc;
          item.value = item.Code !== null ? String(item.Code).trim() : null;
        });

        this.setDropdownOptions('ThirdPartyLiabilityDesc', this.liabilityList);
        resolve();
      });
    });
  }

  private setDropdownOptions(key: string, options: any[]) {
    if (!this.fieldthirdparty[0]?.fieldGroup) return;

    const loopFields = (fields: any[]) => {
      fields.forEach(field => {
        if (field.key === key) {
          field.templateOptions.options = [...options];
          // Ensure FormControl exists
          setTimeout(() => {
            if (this.productItem && this.productItem[key] !== undefined && field.formControl) {
              field.formControl.setValue(this.productItem[key]);
            }
          });
        }
        if (field.fieldGroup) loopFields(field.fieldGroup);
      });
    };

    loopFields(this.fieldthirdparty[0].fieldGroup);
  }

  onEditData() {
    if (!this.locationList?.length) return;

    const tplApi = new ThirdPartyLiabilityEngineeringNamibiaApi();
    const subDetails = this.locationDetails[this.tabIndex]?.SectionList || [];
    const loc = tplApi.getEditDetails(subDetails, this.locationList[this.tabIndex]);

    if (loc) {
      this.productItem = {
        ThirdPartyLiabilityDesc: loc['ThirdPartyLiabilityDesc'] ? String(loc['ThirdPartyLiabilityDesc']).trim() : null,
        ThirdPartyLiability: loc['ThirdPartyLiability'],
        SpreadoffireDesc: loc['SpreadoffireDesc'],
        Spreadoffire: loc['Spreadoffire'],
        TPLClaimPreparationCosts: loc['TPLClaimPreparationCosts'] ? String(loc['TPLClaimPreparationCosts']).trim() : null,
      };

      this.setDropdownOptions('TPLClaimPreparationCosts', this.thirdClaimCost);
      this.setDropdownOptions('ThirdPartyLiabilityDesc', this.liabilityList);
      this.refreshFormlyModel();
    }

    sessionStorage.setItem('ThirdPartyLiabilityData', JSON.stringify(this.productItem));
  }

 // Triggered when clicking Next / Previous / Proceed
onProceedData(type: string) {
  // if (!this.productItem?.IndustryId && type === 'Submit') {
  //   this.IndustryError = true;
  //   return;
  // }
  // this.IndustryError = false;

  const locationList: any[] = [];
  const tplApi = new ThirdPartyLiabilityEngineeringNamibiaApi();

  this.locationList.forEach((entry, idx) => {
    const obj = {
      LocationId: idx + 1,
      LocationName: entry.LocationName,
      CoversRequired: entry.CoversRequired || 'BC',
      BuildingOwnerYn: entry.BuildingOwnerYn || 'Y',
      Address: entry.BuildingAddress,
      SectionList: []
    };

    // Patch the current tab's productItem values
    if (idx === this.tabIndex) {
      entry['ThirdPartyLiabilityDesc'] = this.productItem.ThirdPartyLiabilityDesc;
      entry['ThirdPartyLiability'] = this.productItem.ThirdPartyLiability;
      entry['SpreadoffireDesc'] = this.productItem.SpreadoffireDesc;
      entry['Spreadoffire'] = this.productItem.Spreadoffire;
      entry['TPLClaimPreparationCosts'] = this.productItem.TPLClaimPreparationCosts;
    }

    // Save details using API class
    const saveObj = tplApi.getSaveDetails(entry, this.thirdClaimCost, this.productItem.IndustryId, this.industryTypeList, obj, this.liabilityList);
    if (saveObj) obj.SectionList = saveObj.SectionList;

    locationList.push(obj);
  });

  // Save session and emit to parent
  sessionStorage.setItem('ThirdPartyLiabilityData', JSON.stringify(this.productItem));
  this.finalProceed.emit({ locationList, type });
}

// Triggered when clicking Skip
skip() { 
  this.skipSection.emit(true); 
}

// Triggered when clicking Previous
previous() { 
  this.previousSection.emit(true); 
}

  IndustryChanged() {
    if (this.locationList[this.tabIndex]) {
      this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
      sessionStorage.setItem('ThirdPartyLiabilityData', JSON.stringify(this.productItem));
    }
  }

  private refreshFormlyModel() {
    this.productItem = { ...this.productItem };
    if (this.form) this.form.patchValue(this.productItem);
  }
}
