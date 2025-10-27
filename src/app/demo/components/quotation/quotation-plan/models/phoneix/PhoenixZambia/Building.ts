import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";

export class BuildingPhoenix{
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
            props: { label: 'Building' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    type: 'ngselect',
                    key: 'WallType',
                    defaultValue: '',
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    props: {
                      label: `Construction Type`,
                      placeholder: 'Select Construction Type',
                     // disabled: true,
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
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'BuildingSuminsured',
                    defaultValue: '0',
                    templateOptions: {
                      label: `Sum Insured`,
                      maxLength: 15,
                     // disabled: true,
                      required:true,
                      options: [
                      ],
      
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(15), ForceLengthValidators.min(1)]
                    },
                    hooks: {
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