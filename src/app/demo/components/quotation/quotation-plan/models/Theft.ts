import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";

export class TheftPhoenix{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
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
          props: { label: 'Theft'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                  {
                    className: 'col-12 md:col-4 lg:col-4 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Locks and Keys',
                      required: true,
  
                    },
                  },
                  {
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'LocksandKeys',
                    defaultValue: '0',
                    templateOptions: {
                      label: '',
                      maxLength: 15,
                      disabled: this.checkDisable('LocksandKeys'),
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
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'displays',
            
                    templateOptions: {
                      label: '',
                      required: false,
  
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Loss/Damage to Personal Effects',
                      required: true,
  
                    },
                  },
                  {
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'LossDamagetoPersonalEffects',
                    defaultValue: '0',
                    templateOptions: {
                      label: '',
                      maxLength: 15,
                      disabled: this.checkDisable('LossDamagetoPersonalEffects'),
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
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'displays',
            
                    templateOptions: {
                      label: '',
                      required: false,
  
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Fuel in Aboveground tanks',
                      required: true,
  
                    },
                  },
                  {
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'FuelinAbovegroundtanks',
                    defaultValue: '0',
                    templateOptions: {
                      label: '',
                      maxLength: 15,
                      disabled: this.checkDisable('FuelinAbovegroundtanks'),
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
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'displays',
            
                    templateOptions: {
                      label: '',
                      required: false,
  
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Fuel in Underground tanks',
                      required: true,
  
                    },
                  },
                  {
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'FuelinUndergroundtanks',
                    defaultValue: '0',
                    templateOptions: {
                      label: '',
                      maxLength: 15,
                      disabled: this.checkDisable('FuelinUndergroundtanks'),
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
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: false,

                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'First Loss Limit',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'FirstLossLimit',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('FirstLossLimit'),
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
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: false,

                  },
                },
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Vehicles in the Open',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'VehiclesintheOpen',
                  defaultValue: '0',
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('VehiclesintheOpen'),
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
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: false,

                  },
                },
                {
                    className: 'col-12 md:col-4 lg:col-4 p-2',
                    type: 'displays',
            
                    templateOptions: {
                      label: 'Damage to Buildings caused by Thieves',
                      required: true,
  
                    },
                  },
                  {
                    type: 'commaSeparator',
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    key: 'DamagetoBuildingscausedbyThieves',
                    defaultValue: '0',
                    templateOptions: {
                      label: '',
                      maxLength: 15,
                      disabled: this.checkDisable('DamagetoBuildingscausedbyThieves'),
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
                    className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'displays',
            
                    templateOptions: {
                      label: '',
                      required: false,
  
                    },
                  },
                  
                 
                {
                  className: 'col-12 md:col-4 lg:col-4 p-2',
                  type: 'displays',
          
                  templateOptions: {
                    label: 'Additional Claims Preparation Costs',
                    required: true,

                  },
                },
                {
                  type: 'ngselect',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'AdditionalClaimsPreparationCosts',
                  
                  templateOptions: {
                    label: '',
                    maxLength: 15,
                    disabled: this.checkDisable('AdditionalClaimsPreparationCosts'),
                    
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