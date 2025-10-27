import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class ProfessionalIndemnityPhoenix{
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
      fieldGroup: [
        {
          fieldGroupClassName: 'grid mb-3',
          fieldGroup: [
            {
              className: 'col-3',
              key: 'noOfYears',
              type: 'input',
              templateOptions: {
                label: 'Company Name',
                type: 'number',
                required: true
              }
            },
            {
              className: 'col-3 mt-2',
              key: 'industryType',
              type: 'ngselect',
              templateOptions: {
                label: 'Industry Type',
                required: true,
                options: [
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' }
                ]
              }
            },
             {
              className: 'col-3',
              key: 'noOfYears',
              type: 'input',
              templateOptions: {
                label: 'No. of Years',
                type: 'number',
                required: true
              }
            },
             {
              className: 'col-3',
              key: 'sumInsured',
              type: 'input',
              templateOptions: {
                label: 'Sum Insured',
                type: 'number',
                required: true
              }
            },
          ]
        },
      
      ]
        };
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