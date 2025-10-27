import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class AccountsRecievableNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  endorsementSectionId: string;
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        if (commonDetails) this.commonDetails = commonDetails;
        let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
        if (endorseObj) {
           this.endorsementSection = true;
          this.enableFieldsList = endorseObj.FieldsAllowed;
        }
        this.fields = {
          props: { label: 'Accounts Receivable'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Outstanding Debit Balances',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'OutstandingDebitBalances',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: false,
                    required:true,
                    options: [
                    ],
    
                  },
                  props:{
                    disabled: false,
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
                    label: 'Transit Extension',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'TransitExtension',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('TransitExtension'),
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
                    label: 'Claims Preparation Costs',
                    required: true,

                  },
                },
                {
                  type: 'ngselect',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4 rightAlign',
                  key: 'ClaimsPreparationCosts',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('ClaimsPreparationCosts'),
                    required:false,
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
        return false
        // let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
        // if (endorseObj) {this.endorsementSectionId = endorseObj?.SectionId;}
        //   return this.endorsementSectionId!='219';
      }
      else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
      else return false;
    
    }
}