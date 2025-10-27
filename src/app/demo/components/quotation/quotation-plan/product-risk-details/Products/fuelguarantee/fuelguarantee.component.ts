import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services';
import { FuelGuaranteeApiNamibia } from '../../../models/namibia/FuelGuarantee/FuelGuaranteeApi';
import { FuelGuaranteeNamibia } from '../../../models/namibia/FuelGuarantee/FuelGuarantee';
import { FuelGuaranteeApiPPNamibia } from '../../../models/namibia/GuranteePackagePlus/FuelGuarantee/FuelGuaranteeApi';
import { FuelGuaranteePPNamibia } from '../../../models/namibia/GuranteePackagePlus/FuelGuarantee/FuelGuarantee';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-fuel-guarantee',
  standalone: false,
  templateUrl: './fuelguarantee.component.html',
  styleUrls: ['./fuelguarantee.component.scss']
})
export class FuelGuaranteeComponent {

  @Input() form: any;
  @Input() engineerData: any;
  @Input() productItem: any;
  @Input() renderType: any = null;
  @Input() locationList: any[] = [];
  @Input() locationDetails: any[] = [];
  @Input() tabIndex: any = null;
  @Input() industryTypeList: any[] = [];
  @Input() IsPackage: boolean;
  @Output() finalProceed = new EventEmitter<any>();
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();

   public AppConfig: any = (Mydatas as any).default;

   public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  coversreuired: any = null;
  insuranceId: any = null;
  userDetails: any = null;
  loginId: any = null;
  productId: any = null;
  userType: any = null;
  branchCode: any = null;
  agencyCode: any = null;
  countryId: any = null;
  brokerbranchCode: any = null;
  RequestReferenceNo:any=null;

  IndustryError: boolean;
  FuelGuranteeEngineerfields: any[] = [];
  FuelGuranteeAdditionalfields: any[] = [];

  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

  PeriodTypeList: any[] = [];
  CollateralTypeList: any[] = [];
  const 
  requestReferenceNo: any;

  constructor(private sharedService: SharedService, private fb: FormBuilder) {
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
     let referenceo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceo != undefined && referenceo != 'undefined') {
      this.requestReferenceNo = referenceo;
      
    }
    this.form = this.fb.group({});
  }

  private groupFields(fields: any[]): any[] {
    const grouped: any[][] = [];
    let currentGroup: any[] = [];
    for (const field of fields) {
      currentGroup.push(field);
      if (currentGroup.length === 2) {
        grouped.push(currentGroup);
        currentGroup = [];
      }
    }
    if (currentGroup.length > 0) grouped.push(currentGroup);
    return grouped;
  }

  ngOnInit() {
    let fireData: any;
    if (this.productId == '101') fireData = new FuelGuaranteePPNamibia();
    else fireData = new FuelGuaranteeNamibia();

    this.addControlsToForm(fireData.FuelGuranteeEngineerfields.fieldGroup);
    this.addControlsToForm(fireData.FuelGuranteeAdditionalfields.fieldGroup);

    this.FuelGuranteeEngineerfields = this.groupFields(fireData.FuelGuranteeEngineerfields.fieldGroup);
    this.FuelGuranteeAdditionalfields = this.groupFields(fireData.FuelGuranteeAdditionalfields.fieldGroup);

      if(this.requestReferenceNo){
      this.getEngineerInfo();
    }
    this.getPeriodTypeList();
    this.getCollateralTypeList();

    if (this.locationList.length != 0) {
      this.onEditData();
    }
  }

  onEditData() {
       if (this.renderType == 'Direct') {
    let i = 0;
    for (let obj of this.locationList) {
      if (this.locationDetails[i]) {
        let subDetails = this.locationDetails[i].SectionList;
        let engineerInfo = JSON.parse(sessionStorage.getItem('EngineerInfo'));
        let fuelApi: any;
        let updatedObj: any;

        if (this.productId == '100') {
          fuelApi = new FuelGuaranteeApiNamibia();
          updatedObj = fuelApi.getEditDetails(subDetails, obj, engineerInfo);
        } else if (this.productId == '101') {
          fuelApi = new FuelGuaranteeApiPPNamibia();
          updatedObj = fuelApi.getEditDetails(subDetails, obj, engineerInfo);
        }

        if (updatedObj) obj = updatedObj;

        if (obj && this.tabIndex == i) {
          this.form.controls['CARPrincipal']?.setValue(obj['CARPrincipal']);
          this.form.controls['CARDescription']?.setValue(obj['CARDescription']);
          this.form.controls['PeriodType']?.setValue(obj['PeriodType']);
          this.form.controls['CARPeriodOfActivity']?.setValue(obj['CARPeriodOfActivity']);
          this.form.controls['CARStartDate']?.setValue(obj['CARStartDate']);
          this.form.controls['BTCollateralType']?.setValue(obj['BTCollateralType']);
          this.form.controls['CollateralName']?.setValue(obj['CollateralName']);
          this.form.controls['FuelGuranteeSumInsured']?.setValue(obj['FuelGuranteeSumInsured']);
          if (obj['IndustryType']) this.productItem.IndustryId=obj['IndustryType'];   
        }
      }
      i += 1;
    }
  }else{
    let i = 0;
      for (let loc of this.locationList) {
        if (loc && this.tabIndex == i) {
    if (loc['IndustryType']) this.productItem.IndustryId=loc['IndustryType'];  
  this.form.controls['CARPrincipal']?.setValue(loc['CARPrincipal']);
  this.form.controls['CARDescription']?.setValue(loc['CARDescription']);
  this.form.controls['PeriodType']?.setValue(loc['PeriodType']);
  this.form.controls['CARPeriodOfActivity']?.setValue(loc['CARPeriodOfActivity']);
  this.form.controls['CARStartDate']?.setValue(loc['CARStartDate']);
  this.form.controls['BTCollateralType']?.setValue(loc['BTCollateralType']);
  this.form.controls['CollateralName']?.setValue(loc['CollateralName']);
  this.form.controls['FuelGuranteeSumInsured']?.setValue(loc['FuelGuranteeSumInsured']);
          
        }
        i += 1;
      }
  }
  }

  private addControlsToForm(fields: any[]) {
    if (fields) {
      fields.forEach((field) => {
        if (field?.key) this.form.addControl(field.key, new FormControl(''));
        if (field?.fieldGroup) this.addControlsToForm(field.fieldGroup);
      });
    }
  }

  getPeriodTypeList() {
    let ReqObj = { InsuranceId: this.insuranceId, ItemType: "Project Period" };
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
      let defaultObj = [{ CodeDesc: '-Select-', Code: null }];
      this.PeriodTypeList = defaultObj.concat(data.Result);
      this.PeriodTypeList.forEach(item => {
        item.label = item.CodeDesc;
        item.value = item.Code;
      });
      let fieldlist = this.FuelGuranteeAdditionalfields[2];
      if (fieldlist) {
        for (let field of fieldlist) {
          if (field.key == 'BTPeriodType') field.props.options = this.PeriodTypeList;
        }
      }
    });
  }

   IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  getCollateralTypeList() {
    let ReqObj = { InsuranceId: this.insuranceId, ItemType: "Collateral Value" };
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
      let defaultObj = [{ CodeDesc: '-Select-', Code: null }];
      this.CollateralTypeList = defaultObj.concat(data.Result);
      this.CollateralTypeList.forEach(item => {
        item.label = item.CodeDesc;
        item.value = item.Code;
      });
      let fieldlist = this.FuelGuranteeAdditionalfields[2];
      if (fieldlist) {
        for (let field of fieldlist) {
          if (field.key == 'BTCollateralType' || field.key == 'CollateralType')
            field.props.options = this.CollateralTypeList;
        }
      }
    });
  }


onProceedData(type) {
  let j = 0, locationList = [];
  // const engineerInfo = JSON.parse(sessionStorage.getItem('EngineerInfo'));
  // const EngineerApiUrl = `${this.motorApiUrl}api/InsertEngineerInfo`;
//    const requestRef = sessionStorage.getItem('quoteReferenceNo');
// this.RequestReferenceNo = requestRef;

  let engineerPayload: any[] = [];

  for (let entry of this.locationList) {
    let obj = {
      LocationId: j + 1,
      LocationName: entry.LocationName,
      CoversRequired: entry.CoversRequired || 'BC',
      BuildingOwnerYn: entry.BuildingOwnerYn || 'Y',
      Address: entry.BuildingAddress,
      SectionList: []
    };

     let startDateValue = this.form.controls['CARStartDate']?.value;
  if (startDateValue instanceof Date) {
    const day = String(startDateValue.getDate()).padStart(2, '0');
    const month = String(startDateValue.getMonth() + 1).padStart(2, '0');
    const year = startDateValue.getFullYear();
    startDateValue = `${day}/${month}/${year}`;
  }
    if (this.productId == '100') {
      engineerPayload.push({
        ProductId: this.productId,
        SectionId: "247",
        PrincipalOwner: this.form.controls['CARPrincipal']?.value || '',
        Description: this.form.controls['CARDescription']?.value || '',
        LocationId: obj.LocationId,
        PeriodOfActivity: this.form.controls['CARPeriodOfActivity']?.value || 0,
        StartDate: startDateValue|| '',
        RequestReferenceNo: this.RequestReferenceNo
      });
    }

    if (this.productId == '101') {
      const sections = [
        { id: "247", prefix: "FG" },
        { id: "248", prefix: "CB" },
        { id: "249", prefix: "PG" },
        { id: "250", prefix: "CT" },
        { id: "251", prefix: "BT" },
      ];
      for (let sec of sections) {
        engineerPayload.push({
          ProductId: this.productId,
          SectionId: sec.id,
          PrincipalOwner: entry[`${sec.prefix}Principal`] || '',
          Description: entry[`${sec.prefix}Description`] || '',
          LocationId: obj.LocationId,
          PeriodOfActivity: entry[`${sec.prefix}PeriodOfActivity`] || 0,
          StartDate: entry[`${sec.prefix}StartDate`] || '',
          RequestReferenceNo: this.RequestReferenceNo
        });
      }
    }
    if (j == this.tabIndex) {
      entry['CARPrincipal'] = this.form.controls['CARPrincipal']?.value;
      entry['CARDescription'] = this.form.controls['CARDescription']?.value;
      entry['PeriodType'] = this.form.controls['PeriodType']?.value;
      entry['CARPeriodOfActivity'] = this.form.controls['CARPeriodOfActivity']?.value;
      entry['CARStartDate'] = this.form.controls['CARStartDate']?.value;
      entry['BTCollateralType'] = this.form.controls['BTCollateralType']?.value;
      entry['CollateralName'] = this.form.controls['CollateralName']?.value;
      entry['FuelGuranteeSumInsured'] = this.form.controls['FuelGuranteeSumInsured']?.value;
       entry['IndustryType'] = this.productItem.IndustryId;
    }

    let fuelApi: any;
    let fuelList: any;

    if (this.productId == '100') {
      fuelApi = new FuelGuaranteeApiNamibia();
      fuelList = fuelApi.getSaveDetails(entry, entry.IndustryId, this.industryTypeList, obj);
    } else if (this.productId == '101') {
      fuelApi = new FuelGuaranteeApiPPNamibia();
      fuelList = fuelApi.getSaveDetails(entry, obj);
    }

    if (fuelList) obj = fuelList;
    else if (entry.SectionList) obj.SectionList = entry['SectionList'];

    locationList.push(obj);
    locationList[j]['Description']=this.form.controls['CARDescription']?.value || '';
    locationList[j]['Principal']=this.form.controls['CARPrincipal']?.value || '';
    locationList[j]['PeriodOfActivity']=this.form.controls['CARPeriodOfActivity']?.value || '';
    locationList[j]['PeriodType']=this.form.controls['PeriodType']?.value || '';
    j += 1;
  }


    this.finalProceed.emit({ locationList, type });


}

  getEngineerInfo(){
    let urlGetLink = `${this.motorApiUrl}api/getEngineerInfo?RequestReferenceno=${this.requestReferenceNo}`;
      const ReqGetObj = { "RequestReferenceNo": this.requestReferenceNo };

  this.sharedService.onPostMethodSync(urlGetLink, ReqGetObj).subscribe(
    (engineerdata: any) => {
       this.engineerData = engineerdata.Result;
      sessionStorage.setItem('EngineerInfo', JSON.stringify(this.engineerData));
        if (this.locationList.length != 0) {
      this.onEditData();
    }
      
    },
    (err) => {
      console.error('Error fetching EngineerInfo', err);
    }
  );
  }


  onDigitLimit(event: Event, num: number): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, num);
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
  }z
}
