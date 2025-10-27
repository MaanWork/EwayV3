import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";


export class FireAlliedPerils{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    enableAllSection: boolean = false;
    buildingSection: boolean = false;
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
        this.fields = [
            {
              fieldGroup: [
                {
                  fieldGroupClassName: 'grid mt-2',
                  
                    fieldGroup: [
                      // {
                      //   className: 'col-12 md:col-12 lg:col-12 pt-2 px-1',
                      //   type: 'display',
                
                      //   templateOptions: {
                      //     label: `Fire & Allied Perils`,
                      //     required: true,
                          
                      //   },
                      // },
                      {
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-3 px-3',
                        key: 'InsuranceType',
                        id: 'InsuranceType',
                        type: 'ngselect',
                        templateOptions: {
                          
                          required: true,
                          disabled: this.checkDisable('InsuranceType'),
                          name: 'InsuranceType',
                        },
                        props: {
                          label: 'Insurance Type',
                          options: [],
                        }
                      },
                      {
                        type: 'ngselect',
                        key: 'OccupationId',
                        id: 'OccupationId',
                        defaultValue: '',
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-3 pr-2 pt-3',
                        props: {
                          label: `Occupation`,
                          disabled: this.checkDisable('OccupationId'),
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
                        type: 'ngselect',
                        key: 'Section',
                        id: 'Section',
                        defaultValue: '',
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-3 pr-2',
                        props: {
                          label: `Industry Cover`,
                          disabled: this.checkDisable('Section'),
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
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 input-fixed-height',
                        type: 'commaSeparator',
                        key: 'FireSumInsured',
                        defaultValue: '0',
                        props: {
                          label: `Sum Insured`,
                          required: true,
                          disabled: this.checkDisable('FireSumInsured'),
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
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                        type: 'primeTextArea',
                          key: 'DescriptionOfRisk',
                          
                          props: { 
                            maxLength: 1000,
                            label: `Description Of Risk`,
                        
                            cols:60
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
                        className: 'col-12 md:col-12 lg:col-12 p-2 mx-2',
                        type: 'radioList',
                        key: 'BusinessExtension',
                        id: 'BusinessExtension',
                        // templateOptions: {
                        //   label: `Business Interruption Details`,
                        //   required: true,
      
                        // },
                         templateOptions: {
                          type: 'radioList',
                          required: true,
                          disabled: this.checkDisable('InsuranceType'),
                          name: 'Business Interruption Details',
                        },
                        props: {
                          label: 'Business Interruption Details(BI)',
                          options: [{"label":"Yes","value":"Y"},{"label":"No","value":"N"}],
                        }
                      },
                      {
                        type: 'ngselect',
                        key: 'BusinessName',
                        id: 'BusinessName',
                        defaultValue: '',
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6',
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
                         hideExpression: (model: any) => model.BusinessExtension === 'N',
                      },
                      {
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 input-fixed-height',
                        type: 'commaSeparator',
                        key: 'BusinessSI',
                        defaultValue: '0',
                        props: {
                          label: `BI Sum Insured`,
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
                        hideExpression: (model: any) => model.BusinessExtension === 'N',
                      },
                      // {
                      //   className: 'col-12 md:col-12 lg:col-12',
                      //   type: 'ngselect',
                      //     key: 'RegionCode',
                          
                      //     props: { 
                      //       maxLength: 15,
                      //       label: `Region`,
                      //       options: []
                      //     },
                      //     templateOptions: {
                      //       //disabled: this.checkDisable('BuildingSuminsured')
                      //       required: true,
                            
                      //     },
                      //     validators: {
                      //       validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                      //     },
                      //     hooks: {
                      //     },
          
                      //     expressions: {
                          
                      //     },
                      //     hideExpression: (model: any) => model.BusinessExtension === 'N',
                      // },
                      // {
                      //   className: 'col-12 md:col-12 lg:col-12',
                      //   type: 'ngselect',
                      //     key: 'DistrictCode',
                          
                      //     props: { 
                      //       maxLength: 15,
                      //       label: `District`,
                      //     },
                      //     templateOptions: {
                      //       //disabled: this.checkDisable('BuildingSuminsured')
                      //       required: true,
                      //       options: []
                      //     },
                      //     validators: {
                      //       validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                      //     },
                      //     hooks: {
                      //     },
          
                      //     expressions: {
                          
                      //     },
                      //     hideExpression: (model: any) => model.BusinessExtension === 'N',
                      // },
                      {
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                        type: 'primeTextArea',
                          key: 'DescriptionOfRiskBI',
                          
                          props: { 
                            maxLength: 1000,
                            label: `BI Risk Details`,
                           
                            cols:60
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
                          hideExpression: (model: any) => model.BusinessExtension === 'N',
                      }                  
                    ]
                }
              ]
            }
          ];
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          // let occupationEntry = this.enableFieldsList.some(ele => ele == 'OccupationType');
          // if (occupationEntry) {
          //     return false;
          // }
          // else{
            let entry = this.enableFieldsList.some(ele => ele == fieldName);
            return !entry;
          //}
          
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
    
}