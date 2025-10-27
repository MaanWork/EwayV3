import { FormlyFieldConfig } from "@ngx-formly/core";

export class Building{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    finalizeYN: any='N';subuserType:any=null;
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
        this.fields={
          props: { label: 'Building Risk' },
        
          fieldGroup: [
            {
              fieldGroupClassName: 'newclassname',
              fieldGroup: [
                {
                  className: 'w-full md:mt-0 mt-3 mdw4',
                  type: 'commaSeparator',
                  key: 'BuildingSuminsured',
                  templateOptions: {
                    label: `Building Sum Insured`,
                    required: true,
                    disabled: this.checkDisable('BuildingSuminsured'),
                    maxLength: 15
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    
                  },
                }
  
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