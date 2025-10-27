import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Glass{
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
            props: { label: 'Glass' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                   {
                      className: 'col-12 md:col-4 lg:col-4 p-2',
                      type: 'displays',
              
                      templateOptions: {
                        label: 'Internal Glass',
                        required: true,
    
                      },
                    },
                    {
                      type: 'commaSeparator',
                      className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                      key: 'InternalGlass',
                      defaultValue: '0',
                      templateOptions: {
                        label: 'SumInsured',
                        maxLength: 15,
                        disabled: this.checkDisable('InternalGlass'),
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
                      className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                      key: 'InternalGlassDesc',
                      defaultValue: null,
                      templateOptions: {
                        label: 'Description',
                        maxLength: 200,
                        cols: 40,
                        rows:1,
                        disabled: this.checkDisable('InternalGlassDesc'),
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
                      className: 'col-12 md:col-4 lg:col-4 p-2',
                      type: 'displays',
              
                      templateOptions: {
                        label: 'External Glass',
                        required: true,
    
                      },
                    },
                    {
                      type: 'commaSeparator',
                      className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                      key: 'ExternalGlass',
                      defaultValue: '0',
                      templateOptions: {
                        label: 'SumInsured',
                        maxLength: 15,
                        disabled: this.checkDisable('ExternalGlass'),
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
                      className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                      key: 'ExternalGlassDesc',
                      defaultValue: null,
                      templateOptions: {
                        label: 'Description',
                        maxLength: 200,
                        cols: 40,
                        rows:1,
                        disabled: this.checkDisable('ExternalGlassDesc'),
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
                      className: 'col-12 md:col-4 lg:col-4 p-2',
                      type: 'displays',
              
                      templateOptions: {
                        label: 'Additional ClaimPrepartion Cost',
                        required: true,
    
                      },
                    },
                    {
                      type: 'commaSeparator',
                      className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                      key: 'AdditionalClaimPrepartionCost',
                      defaultValue: '0',
                      templateOptions: {
                        label: 'SumInsured',
                        maxLength: 15,
                        disabled: this.checkDisable('AdditionalClaimPrepartionCost'),
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
                    className: 'col-12 md:col-4 lg:col-4 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: '',
                      required: true,
  
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'SpecialReinstatement',
                      required: true,
  
                    },
                  },
                  {
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'SpecialReinstatement',
                    defaultValue: '0',
                    templateOptions: {
                      label: 'SumInsured',
                      maxLength: 15,
                      disabled: this.checkDisable('SpecialReinstatement'),
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