import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services';
import { FormGroup } from '@angular/forms';
import { ConstructionAllRiskPhoenix } from '../../../models/phoneix/PhoenixZambia/ConstructionAllRisk/constructionAllRisk';
import { ConstructionAllRiskApiPhoenix } from '../../../models/phoneix/PhoenixZambia/ConstructionAllRisk/constructionAllRiskApi';
import { ConstructionAllRiskEngineeringApiPhoenix } from '../../../models/namibia/EngineeringPackagePlus/ConstructionAllRisk/constructionAllRiskApi';

@Component({
  selector: 'app-construction-all-risk',
  templateUrl: './construction-all-risk.component.html',
  styleUrls: ['./construction-all-risk.component.scss']
})
export class ConstructionAllRiskComponent implements OnInit {

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

  form2 = new FormGroup({});
  showExtensions = false;
  IndustryError = false;

  userDetails: any = null;
  userType: any = null;
  productId: any = null;
  insuranceId: any = null;
  loginId: any = null;
  branchCode: any = null;
  agencyCode: any = null;
  countryId: any = null;
  brokerbranchCode: any = null;
  coversreuired: any = null;

  fieldsCAR: any[] = [];
  fieldsCARExtensions: any[] = [];
  fieldsCARAdditional: any[] = [];
  constructionCARfields: any[] = [];

  thirdClaimCost: any;
  wallTypeList: any; 
  
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

  constructor(private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails?.Result?.InsuranceId;
    this.productId = this.userDetails?.Result?.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.loginId = this.userDetails?.Result?.LoginId;
    this.branchCode = this.userDetails?.Result?.BranchCode;
    this.agencyCode = this.userDetails?.Result?.OaCode;
    this.countryId = this.userDetails?.Result?.CountryId;
    this.brokerbranchCode = this.userDetails?.Result?.BrokerBranchCode;
    this.coversreuired = sessionStorage.getItem('coversRequired');

    const constructionAllRisk = new ConstructionAllRiskPhoenix();
    this.fieldsCAR = this.groupFields(constructionAllRisk.CARfields?.fieldGroup || []);
    this.fieldsCARAdditional = this.groupFields(constructionAllRisk.additionalCARfields?.fieldGroup || []);
    this.fieldsCARExtensions = this.groupFields(constructionAllRisk.extendsCARfields?.fieldGroup || []);
  }

  private groupFields(fields: any[]): any[] {
    const grouped: any[] = [];
    const visibleFields = fields.filter(f => !f.hide);
    const newLineFields = ['IndemnityPeriod'];
    let tempGroup: any[] = [];
    for (const field of visibleFields) {
      if (newLineFields.includes(field.key)) {
        if (tempGroup.length) grouped.push(tempGroup);
        grouped.push([field]);
        tempGroup = [];
      } else {
        tempGroup.push(field);
        if (tempGroup.length === 2) {
          grouped.push(tempGroup);
          tempGroup = [];
        }
      }
    }
    if (tempGroup.length) grouped.push(tempGroup);
    return grouped;
  }

  ngOnInit() {
    if (!this.form) this.form = new FormGroup({});
    this.form2 = new FormGroup({});
    this.getClaimPreparationList();
    this.getWallTypeList(); 

    const constructionAllRisk = new ConstructionAllRiskPhoenix();
    this.fieldsCAR = constructionAllRisk.CARfields?.fieldGroup || [];
    this.constructionCARfields = constructionAllRisk.constructionCARfields?.fieldGroup || [];
    this.fieldsCARAdditional = constructionAllRisk.additionalCARfields?.fieldGroup || [];
    this.fieldsCARExtensions = constructionAllRisk.extendsCARfields?.fieldGroup || [];
    

    const stored = sessionStorage.getItem('ConstructionAllRiskData');
    if (stored) this.productItem = JSON.parse(stored);
  }

  getClaimPreparationList(): Promise<void> {
    return new Promise((resolve) => {
      const ReqObj = { InsuranceId: this.insuranceId, ItemType: 'CLAIM_COST' };
      const urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
        const defaultObj = [{ CodeDesc: '-Select-', Code: null }];
        this.thirdClaimCost = defaultObj.concat(data.Result || []).map(item => ({
          ...item,
          label: item.CodeDesc,
          value: item.Code ? String(item.Code).trim() : null
        }));
        resolve();
      });
    });
  }

 getWallTypeList(): Promise<void> {
  return new Promise((resolve) => {
    const ReqObj = { InsuranceId: this.insuranceId, ItemType: 'wall_type' };
    const urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
      const defaultObj = [{ CodeDesc: '-Select-', Code: null }];
      const raw = defaultObj.concat(data.Result || []);

      // map to label/value
      this.wallTypeList = raw.map(item => ({
        label: item.CodeDesc,
        value: item.Code !== null && item.Code !== undefined ? String(item.Code).trim() : null,
        // preserve original if needed:
        __raw: item
      }));

      // IMPORTANT: use the exact key of your Formly field


      this.setFieldOptions('ConstructionType', this.wallTypeList);

      if (this.productItem && this.productItem.ConstructionType) {
        if (this.form && this.form.patchValue) {
          this.form.patchValue({ ConstructionType: this.productItem.ConstructionType });
        }
      }

      console.log('Wall Type List:', this.wallTypeList);
      resolve();
    }, err => {
      console.error('WallType API error', err);
      resolve();
    });
  });
}


  onEditData() {
    if (!this.locationList?.length) return;

    const subDetails = this.locationDetails[this.tabIndex]?.SectionList || [];
    const engineerData = JSON.parse(sessionStorage.getItem('EngineerInfo'));

    let constructionApi: any;

    if (this.productId == '79') {
      constructionApi = new ConstructionAllRiskApiPhoenix();
    } else {
      constructionApi = new ConstructionAllRiskEngineeringApiPhoenix();
    }

    const loc = constructionApi.getEditDetails(subDetails, this.locationList[this.tabIndex], engineerData);
    if (loc) {
      this.productItem = { ...loc };
      sessionStorage.setItem('ConstructionAllRiskData', JSON.stringify(this.productItem));
    }
  }

  onProceedData(type: string) {
    const locationList: any[] = [];
    let constructionApi: any;

    if (this.productId == '79') {
      constructionApi = new ConstructionAllRiskApiPhoenix();
    } else {
      constructionApi = new ConstructionAllRiskEngineeringApiPhoenix();
    }

    this.locationList.forEach((entry, idx) => {
      const obj = {
        LocationId: idx + 1,
        LocationName: entry.LocationName,
        CoversRequired: entry.CoversRequired || 'BC',
        BuildingOwnerYn: entry.BuildingOwnerYn || 'Y',
        Address: entry.BuildingAddress,
        SectionList: []
      };

      if (idx === this.tabIndex) {
        Object.assign(entry, this.productItem);
      }

      const engineerInfo = JSON.parse(sessionStorage.getItem('EngineerInfo'));
      const saveResult = constructionApi.getSaveDetails(entry, entry.IndustryId, this.industryTypeList, obj);

      if (saveResult && saveResult.SectionList?.length) obj.SectionList = saveResult.SectionList;
      locationList.push(obj);
    });

    sessionStorage.setItem('ConstructionAllRiskData', JSON.stringify(this.productItem));
    this.finalProceed.emit({ locationList, type });
  }

private loopFields(fields: any[], cb: (field: any) => void) {
  if (!fields || !fields.length) return;
  fields.forEach(f => {
    cb(f);
    if (f.fieldGroup) this.loopFields(f.fieldGroup, cb);
  });
}


private setFieldOptions(key: string, options: Array<{ label: string, value: any }>) {
 
  const allFieldArrays = [
    this.fieldsCAR,                
    this.constructionCARfields,    
    this.fieldsCARAdditional,      
    this.fieldsCARExtensions       
  ];

  allFieldArrays.forEach(arr => {
    if (!arr) return;

    const flat = Array.isArray(arr) && arr.length && Array.isArray(arr[0]) ? arr.flat() : arr;
    this.loopFields(flat, (field: any) => {
      if (field.key === key) {
        
        if (field.props) field.props.options = [...options];
        else if (field.templateOptions) field.templateOptions.options = [...options];

        setTimeout(() => {
          try {
            const currentVal = this.productItem ? this.productItem[key] : undefined;
            if (field.formControl && currentVal !== undefined && currentVal !== null) {
              field.formControl.setValue(currentVal);
            }

            if (this.form && this.form.patchValue) {
              this.form.patchValue({ [key]: currentVal });
            }
          } catch (e) { console.warn('setFieldOptions error', e); }
        }, 0);
      }
    });
  });
}


  IndustryChanged() {
    if (this.locationList[this.tabIndex]) {
      this.locationList[this.tabIndex].IndustryType = this.productItem.IndustryType;
    }
  }

  skip() { this.skipSection.emit(true); }
  previous() { this.previousSection.emit(true); }

  onExtensionToggle() {
    if (!this.showExtensions) this.form2.reset();
  }
}
