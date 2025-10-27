import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";

export class HouseOwnerPhoenix{
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
          props: { label: 'Burglary'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    className: 'col-12 md:col-4 lg:col-4 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Construction Type',
                      required: true,
  
                    },
                  },
                  {
                    type: 'ngselect',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'CategoryId',
                    defaultValue: '0',
                    templateOptions: {
                      label: '',
                      maxLength: 15,
                      disabled: this.checkDisable('CategoryId'),
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
                      label: ''
  
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