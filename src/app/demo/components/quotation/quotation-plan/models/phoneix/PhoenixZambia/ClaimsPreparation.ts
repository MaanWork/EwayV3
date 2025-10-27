import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class ClaimsPreparation{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    finalizeYN: any='N';
    subuserType: any=null;dobDate:any=null;
    constructor() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.dobDate = new Date(year - 18, month, day);
      let finalize = sessionStorage.getItem('FinalizeYN');
      if(finalize) this.finalizeYN = finalize;
      this.subuserType = sessionStorage.getItem('typeValue');
        this.fields={
            props: { label: 'ClaimsPreparation' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    className: 'col-12 md:col-2 lg:col-2 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: '',
                      required: true,
  
                    },
                  },
                  {
                    type: 'ngselect',
                    className: ' col-12 lg:col-8 md:col-8 xl:col-8',
                    key: 'ClaimsPreparationCost',
                    defaultValue: '0',
                    templateOptions: {
                      label: 'Claims Preparation Cost',
                      maxLength: 15,
                      disabled: this.checkDisable('ClaimsPreparationCost'),
                      required:false,
                      options: [],
      
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
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