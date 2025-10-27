import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class PersonalLiability{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
  subuserType: any=null;
  finalizeYN: any='N';
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
            props: { label: 'Personal Liability' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid mx-0',
                fieldGroup: [
                  {
                    className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                    type: 'commaSeparator',
                    key: 'EmpLiabilitySi',
                    props: {
                      label: `Sum Insured`,
                      maxLength: 15,
                      disabled: this.checkDisable('EmpLiabilitySi'),
                      required: true,
                      options: [],
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {},
                    expressions: {},
                  },
                  {
                    className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                    type: 'input',
                    key: 'EmpDescription',
                    props: {
                      label: `Description`,
                      maxLength: 200,
                      disabled: this.checkDisable('EmpDescription'),
                      required: true,
                      options: [],
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                    },
                    hooks: {},
                    expressions: {},
                  }
                ]
              },
              // {
              //   fieldGroupClassName: 'grid mx-0', // New fieldGroup to separate ContentDescription
              //   fieldGroup: [
              //     {
              //       className: 'col-12 lg:col-11 md:col-11 xl:col-11 py-0 specialcss',
              //       type: 'input',
              //       key: 'EmpDescription',
              //       props: {
              //         label: `Description`,
              //         maxLength: 15,
              //         disabled: this.checkDisable('EmpDescription'),
              //         required: true,
              //         options: [],
              //       },
              //       validators: {
              //         validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
              //       },
              //       hooks: {},
              //       expressions: {},
              //     }
              //   ]
              // }
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