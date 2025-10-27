import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Geyser{
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
            props: { label: 'Geyser' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  // {
                  //   type: 'ngselect',
                  //   key: 'ConstructionType',
                  //   defaultValue: '',
                  //   className: 'col-12 lg:col-5 md:col-5 xl:col-5',
                  //   templateOptions: {
                  //     label: `Construction Type`,
                  //     placeholder: 'Select Construction Type',
                  //    // disabled: true,
                  //     required:false,
                  //     options: [
      
                  //     ],
      
                  //   },
                  //   validators: {
                  //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  {
                    className: 'col-12 md:col-2 lg:col-2 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Geyser In Solar',
                      required: true,
  
                    },
                  },
                  {
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'InSolar',
                    defaultValue: '0',
                    templateOptions: {
                      label: 'SumInsured',
                      maxLength: 15,
                      disabled: this.checkDisable('InSolar'),
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
                    type: 'primeTextArea',
                    className: ' col-12 lg:col-3 md:col-3 xl:col-3',
                    key: 'InSolarDesc',
                    defaultValue: null,
                    templateOptions: {
                      label: 'Description',
                      maxLength: 200,
                      cols: 40,
                      rows:1,
                      disabled: this.checkDisable('InSolarDesc'),
                      required:true,
                      options: [
                      ],
      
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(200), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-3 lg:col-3 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: '',
                      required: true,
  
                    },
                  },
                  {
                    className: 'col-12 md:col-2 lg:col-2 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Geyser In House',
                      required: true,
  
                    },
                  },
                  {
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'InHouse',
                    defaultValue: '0',
                    templateOptions: {
                      label: 'SumInsured',
                      maxLength: 15,
                      disabled: this.checkDisable('InHouse'),
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
                    type: 'primeTextArea',
                    className: ' col-12 lg:col-3 md:col-3 xl:col-3',
                    key: 'InHouseDesc',
                    defaultValue: null,
                    templateOptions: {
                      label: 'Description',
                      maxLength: 200,
                      cols: 40,
                      rows:1,
                      disabled: this.checkDisable('Desc'),
                      required:true,
                      options: [
                      ],
      
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(200), ForceLengthValidators.min(1)]
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