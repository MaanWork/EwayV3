import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Money{
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
          props: { label: 'Money' },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
                fieldGroup:[
                  {
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Region',
                      required: true,
  
                    },
                  },
                  {
                    type: 'ngselect',
                    className: ' col-12 lg:col-3 md:col-3 xl:col-3',
                    key: 'RegionCode',
                    defaultValue: '0',
                    templateOptions: {
                      label: '',
                      maxLength: 15,
                      disabled: this.checkDisable('RegionCode'),
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
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'District',
                      required: true,
  
                    },
                  },
                  {
                    type: 'ngselect',
                    className: ' col-12 lg:col-3 md:col-3 xl:col-3',
                    key: 'DistrictCode',
                    defaultValue: '0',
                    templateOptions: {
                      label: '',
                      maxLength: 15,
                      disabled: this.checkDisable('DistrictCode'),
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
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Covering Details',
                      required: true,
  
                    },
                  },
                  {
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3 textarea-fixed-height',
                  type: 'textarea',
                    key: 'CoveringDetails',
                    
                    props: { 
                  
                      maxLength: 1000,
                      
                    },
                    templateOptions: {
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
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Description Of Risk',
                      required: true,
  
                    },
                  },
                   {
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3 textarea-fixed-height',
                  type: 'textarea',
                    key: 'DescriptionOfRisk',
                    
                    props: { 
                      maxLength: 1000,
                     
                    },
                    templateOptions: {
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
                //1
                 {
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Estimated Annual Carryings',
                      required: true,
  
                    },
                  },
                   {
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  type: 'commaSeparator',
                  key: 'MoneyAnnualEstimate',
                  props: { 
                    maxLength: 15
                  },
                  templateOptions: {
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                  
                  },
                },
                  //2
                 {
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Cash in transit limit',
                      required: true,
  
                    },
                  },
                   {
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  type: 'commaSeparator',
                  key: 'MoneyInTransit',
                  props: { 
                    maxLength: 15
                  },
                  templateOptions: {
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                  
                  },
                },
                  //3
                 {
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Custody of collectors',
                      required: true,
  
                    },
                  },
                   {
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  type: 'commaSeparator',
                  key: 'MoneyCollector',
                  props: { 
                    maxLength: 15
                  },
                  templateOptions: {
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                  
                  },
                },
                  //4
                 {
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Safe during working hours',
                      required: true,
  
                    },
                  },
                   {
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  type: 'commaSeparator',
                  key: 'MoneySafeLimit',
                  props: { 
                    maxLength: 15
                  },
                  templateOptions: {
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                  
                  },
                },
                  //5
                 {
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Safe outside working hours',
                      required: true,
  
                    },
                  },
                   {
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  type: 'commaSeparator',
                  key: 'MoneyOutofSafe',
                  props: { 
                    maxLength: 15
                  },
                  templateOptions: {
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                  
                  },
                },
                  //6
                 {
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Residence of director or partner',
                      required: true,
  
                    },
                  },
                   {
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  type: 'commaSeparator',
                  key: 'MoneyDirectorResidence',
                  props: { 
                    maxLength: 15
                  },
                  templateOptions: {
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                  
                  },
                },
                  //7
                 {
                    className: 'col-12 md:col-3 lg:col-3 p-2 flex align-items-center justify-content-start font-medium',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Value of safe',
                      required: true,
  
                    },
                  },
                   {
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  type: 'commaSeparator',
                  key: 'MoneyInSafe',
                  props: { 
                    maxLength: 15
                  },
                  templateOptions: {
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
                //   className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //   type: 'ngselect',
                //   key: 'RegionCode',
                //   props: { 
                //     label: `Region`,
                //     maxLength: 15
                //   },
                //   templateOptions: {
                //    required: true,
                //    options:[

                //    ]
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   hooks: {
                //   },
  
                //   expressions: {
                  
                //   },
                // },
                // {
                //   className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //   type: 'ngselect',
                //   key: 'DistrictCode',
                //   props: { 
                //     label: `District`,
                //     maxLength: 15
                //   },
                //   templateOptions: {
                //     required: true,
                //     options:[

                //    ]
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   hooks: {
                //   },
  
                //   expressions: {
                  
                //   },
                // },
                // {
                //   className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //   type: 'textarea',
                //     key: 'CoveringDetails',
                    
                //     props: { 
                //       label: `Covering Details`,
                //       maxLength: 1000,
                      
                //     },
                //     templateOptions: {
                //       required: true,
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(1000), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
    
                //     expressions: {
                    
                //     },
                // },
                // {
                //   className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //   type: 'textarea',
                //     key: 'DescriptionOfRisk',
                    
                //     props: { 
                //       maxLength: 1000,
                //       label: `Description Of Risk`,
                //     },
                //     templateOptions: {
                //       required: true,
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(1000), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
    
                //     expressions: {
                    
                //     },
                // },
                // {
                //   className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //   type: 'commaSeparator',
                //   key: 'MoneyAnnualEstimate',
                //   props: { 
                //     label: `Estimated Annual Earnings`,
                //     maxLength: 15
                //   },
                //   templateOptions: {
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   hooks: {
                //   },
  
                //   expressions: {
                  
                //   },
                // },
                // {
                //     className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //     type: 'commaSeparator',
                //     key: 'MoneyInTransit',
                //     props: { 
                //       label: `Cash in transit limit`,
                //       maxLength: 15
                //     },
                //     templateOptions: {
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
    
                //     expressions: {
                    
                //     },
                //   },
                //   {
                //     className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //     type: 'commaSeparator',
                //     key: 'MoneyCollector',
                //     props: { 
                //       label: `Custody of collectors`,
                //       maxLength: 15
                //     },
                //     templateOptions: {
            
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
    
                //     expressions: {
                    
                //     },
                //   },
                //   {
                //     className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //     type: 'commaSeparator',
                //     key: 'MoneySafeLimit',
                //     props: { 
                //       label: `Safe during working hours`,
                //       maxLength: 15
                //     },
                //     templateOptions: {
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
    
                //     expressions: {
                    
                //     },
                //   },
                //   {
                //     className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //     type: 'commaSeparator',
                //     key: 'MoneyOutofSafe',
                //     props: { 
                //       label: `safe outside working hours`,
                //       maxLength: 15
                //     },
                //     templateOptions: {
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
    
                //     expressions: {
                    
                //     },
                //   },
                //   {
                //     className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //     type: 'commaSeparator',
                //     key: 'MoneyDirectorResidence',
                //     props: { 
                //       label: `Residence of director or partner`,
                //       maxLength: 15
                //     },
                //     templateOptions: {
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
    
                //     expressions: {
                    
                //     },
                //   },
                 
                //   {
                //     className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                //     type: 'commaSeparator',
                //     key: 'MoneyInSafe',
                //     props: { 
                //       label: `Value of safe`,
                //       maxLength: 15
                //     },
                //     templateOptions: {
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
    
                //     expressions: {
                    
                //     },
                //   },
                  
                 
                ]
              },
             
              
          ],
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