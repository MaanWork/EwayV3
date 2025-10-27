import { FormlyFieldConfig } from "@ngx-formly/core";
import * as Mydatas from '../../../../../../../../app-config.json';
import { SharedService } from "@app/_services/shared.service";
export class MachineryBreakDownPhoenix {
  customerDetails: any;
  commonDetails: any[] = [];userDetails:any;insuranceId:any;
  endorsementSection: boolean = false; subuserType: any = null;
  enableFieldsList: any[] = []; finalizeYN: any = 'N';
  public AppConfig: any = (Mydatas as any).default;firstLossOptions:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;firstLossPayeeList:any[]=[];
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;firstLossSection: boolean;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  policyfields1: any;
  constructor(private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    let finalize = sessionStorage.getItem('FinalizeYN');
    if (finalize) this.finalizeYN = finalize;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    if (commonDetails) this.commonDetails = commonDetails;
    if (sessionStorage.getItem('endorsePolicyNo')) {
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if (endorseObj) {
        this.enableFieldsList = endorseObj.FieldsAllowed;
      }
    }

    this.policyfields1 = {
      fieldGroup: [

        {
          key: 'GrossProfit',
          type: 'commaSeparator',
          props: {
            label: 'Gross Profit',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'IncreasedCostOfWorking',
          type: 'commaSeparator',
          props: {
            label: 'Increased Cost Of Working',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'ClaimsPreparationCosts',
          type: 'ngselect',
          props: {
            label: 'Claims Preparation Costs',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
        },
      ]
    }

    
  }
  fields: FormlyFieldConfig;
  getFieldDetails() { return this.fields; }
  checkDisable(fieldName) {
    if (this.endorsementSection) {
      let entry = this.enableFieldsList.some(ele => ele == fieldName);
      return !entry;
    }
    else if (this.subuserType == 'low') return this.finalizeYN == 'Y';
    else return false;

  }

}