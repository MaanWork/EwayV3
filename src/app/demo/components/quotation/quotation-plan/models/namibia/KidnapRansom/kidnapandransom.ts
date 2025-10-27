import { FormlyFieldConfig } from "@ngx-formly/core";
import { SharedService } from "@app/_services/shared.service";
export class KidnapRansomNamibia {
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
          key: 'kidnapRansom',
          type: 'commaSeparator',
          props: {
            label: 'Ransom',
            placeholder: 'Enter Sum Insured',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'kidnapRansomTransit',
          type: 'commaSeparator',
          props: {
            label: 'Ransom In Transit',
            placeholder: 'Enter Sum Insured',
            required: false,
          },
         
        },
       {
          key: 'kidnapResponse',
          type: 'commaSeparator',
          props: {
            label: 'Response Consultants fees and expenses',
            placeholder: 'Enter Sum Insured',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'kidnapAdditional',
          type: 'commaSeparator',
          props: {
            label: 'Additional Expenses',
            placeholder: 'Enter Sum Insured',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'kidnaprehabilitation',
          type: 'commaSeparator',
          props: {
            label: 'Rest of rehabilitation',
            placeholder: 'Enter Sum Insured',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'kidnapLegalLiability',
          type: 'commaSeparator',
          props: {
            label: 'Legal Liability',
            placeholder: 'Enter Sum Insured',
            required: false,
            options: [

            ]
          },
         
        },
         {
          key: 'kidnapPersonalCapital',
          type: 'commaSeparator',
          props: {
            label: 'Personal Accident Capital',
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