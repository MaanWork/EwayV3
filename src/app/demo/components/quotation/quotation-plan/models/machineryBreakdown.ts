import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class MachineryBreakDown{
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
        this.fields = {
          props: { label: 'Machinery BreakDown' },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [ 
                {
                  className: 'col-12 md:col-12 lg:col-12 p-2',
                  type: 'display2',
          
                  templateOptions: {
                    label: `Machinery Details`,
                    required: true,

                  },
                },
                {
                  type: 'ngselect',
                  key: 'ContentId',
                  defaultValue: '',
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  templateOptions: {
                    label: `Machinery`,
                    placeholder: 'Select Machinery',
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
                // {
                //   type: 'ngselect',
                //   key: 'Section',
                //   id: 'Section',
                //   defaultValue: '',
                //   className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                //   props: {
                //     label: `Industry Cover`,
                //     disabled: this.checkDisable('Section'),
                //     required: true,
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
                  type: 'commaSeparator',
                  key: 'PowerPlantSi',
                  defaultValue: '',
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  templateOptions: {
                    label: `Sum Insured`,
                    placeholder: 'Enter Sum Insured',
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
                  className: 'col-12 md:col-6 lg:col-6',
                  type: 'textarea',
                    key: 'CoveringDetails',
                    
                    props: { 
                      label: `Covering Details`,
                      maxLength: 1000,
                      
                    },
                    templateOptions: {
                      //disabled: this.checkDisable('BuildingSuminsured')
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(1000), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                    
                    },
                },
                {
                className: 'col-12 md:col-6 lg:col-6',
                type: 'textarea',
                  key: 'DescriptionOfRisk',
                  
                  props: { 
                    maxLength: 1000,
                    label: `Description Of Risk`,
                  },
                  templateOptions: {
                    //disabled: this.checkDisable('BuildingSuminsured')
                    required: true,
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(1000), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                  
                  },
                },
                {
                  className: 'col-12 md:col-12 lg:col-12 p-2',
                  type: 'display2',
          
                  templateOptions: {
                    label: `Business Interruption Details`,
                    required: true,

                  },
                },
                {
                  type: 'ngselect',
                  key: 'BusinessName',
                  id: 'BusinessName',
                  defaultValue: '',
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  props: {
                    label: `Business Interruption`,
                    disabled: this.checkDisable('BusinessName'),
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
                  className: 'col-12 md:col-6 lg:col-6',
                  type: 'commaSeparator',
                  key: 'BusinessSI',
                  defaultValue: '0',
                  props: {
                    label: `Business SI`,
                    required: true,
                    disabled: true,
                    maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'textarea',
                          key: 'CoveringDetailsBI',
                          
                          props: { 
                            label: `Covering Details`,
                            maxLength: 1000,
                            
                          },
                          templateOptions: {
                            //disabled: this.checkDisable('BuildingSuminsured')
                            required: true,
                            disabled: true,
                          },
                          validators: {
                            validation: [ForceLengthValidators.maxLength(1000), ForceLengthValidators.min(1)]
                          },
                          hooks: {
                          },
          
                          expressions: {
                          
                          },
                      },
                      {
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'textarea',
                          key: 'DescriptionOfRiskBI',
                          
                          props: { 
                            maxLength: 1000,
                            label: `Description Of Risk`,
                          },
                          templateOptions: {
                            required: true,
                            disabled: true,
                          },
                          validators: {
                            validation: [ForceLengthValidators.maxLength(1000), ForceLengthValidators.min(1)]
                          },
                          hooks: {
                          },
          
                          expressions: {
                          
                          },
                      },
                  
                  // {
                  //   type: 'ngselect',
                  //   key: 'FirstLossPayee',
                  //   defaultValue: '',
                  //   className: 'col-12 md:col-4 lg:col-4',
                  //   templateOptions: {
                  //     label: `First Loss Payee`,
                  //     placeholder: 'Select First Loss Payee',
                  //    // disabled: true,
                  //     required: true,
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
                ]
            }
          ]
        }
    }
    fields:FormlyFieldConfig;
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}