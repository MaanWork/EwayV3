import { FormlyFieldConfig } from "@ngx-formly/core";
import { SharedService } from "@app/_services/shared.service";
export class CashInTransitNamibia {
  customerDetails: any;
  commonDetails: any[] = [];userDetails:any;insuranceId:any;
  endorsementSection: boolean = false; subuserType: any = null;
  enableFieldsList: any[] = []; finalizeYN: any = 'N';
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
          key: 'cashStaticTransit',
          type: 'commaSeparator',
          props: {
            label: 'Static and Transit Cover',
            placeholder: 'Enter Sum Insured',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'cashVehicleTransit',
          type: 'commaSeparator',
          props: {
            label: 'Limit Per Vehicle Per Transit',
            placeholder: 'Enter Sum Insured',
            required: false
          },
         
        },
         {
          key: 'cashContainer',
          type: 'commaSeparator',
          props: {
            label: 'Limit Cash Per Container',
            placeholder: 'Enter Sum Insured',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'cashPavementCarry',
          type: 'commaSeparator',
          props: {
            label: 'Limit Per Cross Pavement Carry',
            placeholder: 'Enter Sum Insured',
            required: false,
            options: [

            ]
          },
         
        },
         {
          key: 'cashSafeVault',
          type: 'commaSeparator',
          props: {
            label: 'Limit On Site In Safe/Vault At Address (Stock)',
            placeholder: 'Enter Sum Insured',
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