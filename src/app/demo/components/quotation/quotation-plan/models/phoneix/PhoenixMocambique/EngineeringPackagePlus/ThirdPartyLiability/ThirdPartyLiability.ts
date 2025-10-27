import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class ThirdPartyLiabilityEngineeringNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
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
        this.fields = {
          props: { label: 'ThirdPartyLiability'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Spread Of Fire',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'Spreadoffire',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('Spreadoffire'),
                    required:true,
                    options: [
                    ],
    
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: false,

                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Third Party Liability',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'ThirdPartyLiability',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('ThirdPartyLiability'),
                    required:true,
                    options: [
                    ],
    
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: false,

                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Claim Preparation Costs',

                  },
                },
                {
                  type: 'ngselect',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4 rightAlign ',
                  key: 'TPLClaimPreparationCosts',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('TPLClaimPreparationCosts'),
                    required:true,
                    options: [
                    ],
    
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: false,

                  },
                },
              
              ]
            }
          ]
        }
    }
  fields:FormlyFieldConfig;
    getFieldDetails(){return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}