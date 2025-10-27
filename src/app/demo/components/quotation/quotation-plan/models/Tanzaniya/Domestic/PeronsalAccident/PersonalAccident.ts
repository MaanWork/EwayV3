import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class PersonalAccident{
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
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields={
            props: { label: 'Personal Accident' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid mx-0',
                fieldGroup: [
                  {
                    type: 'ngselect',
                    key: 'OccupationType',
                    defaultValue: '',
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4 ',
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
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4 ',
                    key: 'PersonalDeath',
                    defaultValue: '0',
                    templateOptions: {
                      label: `Death Cover`,
                      maxLength: 15,
                      disabled: this.checkDisable('PersonalDeath'),
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
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4 ',
                    key: 'PersonalPermanent',
                    defaultValue: '0',
                    templateOptions: {
                      label: `Permanent Disablement`,
                      maxLength: 15,
                      disabled: this.checkDisable('PersonalPermanent'),
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
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4 ',
                    key: 'PersonalTemporary',
                    defaultValue: '0',
                    templateOptions: {
                      label: `Temporary Total Disability`,
                      maxLength: 15,
                      disabled: this.checkDisable('PersonalTemporary'),
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
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4 ',
                    key: 'PersonalMedical',
                    defaultValue: '0',
                    templateOptions: {
                      label: `Medical Expenses`,
                      maxLength: 15,
                      disabled: this.checkDisable('PersonalMedical'),
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
              },
              // {
              //   fieldGroupClassName: 'grid mx-0',
              //   fieldGroup: [
                  
              //     {
              //       className: 'col-12 lg:col-5 md:col-5 xl:col-3 ',
              //       type: 'input',
              //       key: 'PersonalDescription',
              //       templateOptions: {
              //         label: `Description`,
              //         required: true,
              //         disabled: this.checkDisable('PersonalDescription'),
              //         maxLength: 15
              //       },
                    
              //       validators: {
              //       },
              //       hooks: {
              //       },
              //       expressions: {
              //       },
              //     },
                  
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