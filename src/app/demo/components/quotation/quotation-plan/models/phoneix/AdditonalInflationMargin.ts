import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class AdditonalInflationMargin{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    finalizeYN: any='N';
    subuserType: any=null;dobDate:any=null;
    constructor() {
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      this.dobDate = new Date(year - 18, month, day);
      const finalize = sessionStorage.getItem('FinalizeYN');
      if(finalize) this.finalizeYN = finalize;
      this.subuserType = sessionStorage.getItem('typeValue');
        // this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        // let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        // if (commonDetails) this.commonDetails = commonDetails;
        // if (sessionStorage.getItem('endorsePolicyNo')) {
        //     this.endorsementSection = true;
        //     let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
        //     if (endorseObj) {
        //       this.enableFieldsList = endorseObj.FieldsAllowed;
        //     }
        // }
        this.fields={
            props: { label: 'Additonal Inflation Margin' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    type: 'ngselect',
                    key: 'InflationConstructionType',
                    defaultValue: '',
                    className: 'col-12 lg:col-5 md:col-5 xl:col-5',
                    props: {
                      label: `Inflation %`,
                      placeholder: 'Select Inflation %',
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
                    className: ' col-12 lg:col-5 md:col-5 xl:col-5',
                    key: 'InflationSumInsured',
                    defaultValue: '0',
                    templateOptions: {
                      label: `Sum Insured`,
                      maxLength: 15,
                      disabled: this.checkDisable('SumInsured'),
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
          const entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}