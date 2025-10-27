import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";

export class GPAPhoenix{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  policyfields:FormlyFieldConfig;
  groupPersonalAccident :FormlyFieldConfig;
  extendsfields:FormlyFieldConfig
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
       
        this.groupPersonalAccident = {
            fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              key: 'occupation',
              type: 'ngselect',
              props: {
                label: 'occupation',
                placeholder: '--Select--',
                required: false,
                options: [
                  
                ]
              }
            },
              {
                key: 'NumberofEmployees',
                type: 'input',
                props: {
                  label: 'Number of Employees',
                  placeholder: 'Enter Sum Insured',
                  type: 'number',
                  required: true
                }
              },
              {
                key: 'AnnualRemuneration',
                type: 'commaSeparator',
                props: {
                  label: 'Annual Remuneration',
                  placeholder: 'Select an option',
                  required: false,
                  options: [
                    
                  ]
                },
                },
            {
                key: 'TemporaryDisablement',
                type: 'ngselect',
                props: {
                  label: 'Temporary Disablement',
                  placeholder: '--select--',
                  //type: 'number',
                  required: true
                }
            },
            {
                key: 'Coverage',
                type: 'ngselect',
                props: {
                  label: 'Coverage',
                  placeholder: '--select--',
                  //type: 'number',
                  required: true
                }
            },
            {
                key: 'MedicalExpenses',
                type: 'ngselect',
                props: {
                  label: 'Medical Expenses',
                  placeholder: '--select--',
                  //type: 'number',
                  required: true
                }
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