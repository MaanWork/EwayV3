import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";

export class OfficeContents{
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
          props: { label: 'Power Surge'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Office Contents',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'OfficeContents',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('OfficeContents'),
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
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Gross Profit',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'GrossProfit',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('GrossProfit'),
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
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Gross Revenue',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'GrossRevenue',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('GrossRevenue'),
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
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Gross Rentals',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'GrossRentals',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('GrossRentals'),
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