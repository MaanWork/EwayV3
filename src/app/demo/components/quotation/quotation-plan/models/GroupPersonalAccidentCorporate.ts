import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class GroupPersonalAccidentCorporate{
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
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        if (commonDetails) this.commonDetails = commonDetails;
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if (endorseObj) { this.enableFieldsList = endorseObj.FieldsAllowed; }
        }
        this.fields={
            props: { label: 'Personal Accident' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    type: 'ngselect',
                    key: 'GroupOccupationType',
                    defaultValue: '',
                    className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                    templateOptions: {
                      label: `Occupation`,
                      placeholder: 'Select OccupationType',
                     // disabled: true,
                      required: true,
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
                    className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                    type: 'number',
                    key: 'TotalNoOfGroupMemeber',
                    templateOptions: {
                      label: 'Members Count',
                      disabled: this.checkDisable('TotalNoOfGroupMemeber'),
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
                    },
                  },
                  {
                    type: 'ngselect',
                    key: 'IndemnityType',
                    defaultValue: '',
                    className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                    templateOptions: {
                      label: `Period`,
                      placeholder: 'Select Period',
                     // disabled: true,
                      required: true,
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
                    className: ' col-12 lg:col-6 md:col-6 xl:col-6',
                    key: 'GroupSumInsured',
                    defaultValue: '0',
                    templateOptions: {
                      label: `Sum Insured`,
                      maxLength: 15,
                      disabled: this.checkDisable('GroupSumInsured'),
                      required: true,
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