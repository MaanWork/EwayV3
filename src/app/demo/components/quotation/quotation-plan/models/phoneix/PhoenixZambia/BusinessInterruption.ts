import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";

export class BIPhoenix{
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
          props: { label: 'Burglary'},
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
                  className: 'col-12 md:col-1 lg:col-1 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  type: 'ngselect',
                  className: ' col-12 lg:col-3 md:col-3 xl:col-3',
                  key: 'CoverageType',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'Coverage Type',
                    maxLength: 15,
                    disabled: this.checkDisable('BuildingUsageId'),
                    required:true,
                    options: [
                      {"label":"--Select--","value":null},
                      {"label":"Gross Profit","value":"01"},
                      {"label":"Gross Revenue","value":"02"},
                      {"label":"Gross Renewals","value":"03"},
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
                  className: ' col-12 lg:col-3 md:col-3 xl:col-3',
                  key: 'BuildingUsageId',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'Indemnity Period',
                    maxLength: 15,
                    disabled: this.checkDisable('BuildingUsageId'),
                    required: false,
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
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'CoverageSI',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'SumInsured',
                    maxLength: 15,
                    disabled: this.checkDisable('CoverageSI'),
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
                  className: 'col-12 md:col-1 lg:col-1 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-1 lg:col-1  text-bold',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  type: 'primeTextArea',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'AccidentalDamageDesc',
                  defaultValue: null,
                  templateOptions: {
                    label: 'Accidental Damage Description',
                    maxLength: 200,
                    cols: 40,
                    rows:1,
                    disabled: this.checkDisable('AccidentalDamageDesc'),
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
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'AccidentalDamageSumInsured',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'Accidental Damage SumInsured',
                    maxLength: 15,
                    disabled: this.checkDisable('AccidentalDamageSumInsured'),
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
                  className: 'col-12 md:col-3 lg:col-3  text-bold',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                
                {
                  className: 'col-12 md:col-1 lg:col-1 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  type: 'primeTextArea',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'PreventionofAccessDesc',
                  defaultValue: null,
                  templateOptions: {
                    label: 'Prevention Of Access Description',
                    maxLength: 200,
                    cols: 40,
                    rows:1,
                    disabled: this.checkDisable('PreventionofAccessDesc'),
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
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'PreventionofAccess',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'Prevention of Access SumInsured',
                    maxLength: 15,
                    disabled: this.checkDisable('PreventionofAccess'),
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
                  className: 'col-12 md:col-3 lg:col-3 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-1 lg:col-1 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  type: 'ngselect',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'PublicTelecommunication',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'Public Telecommunication',
                    maxLength: 15,
                    disabled: this.checkDisable('PublicTelecommunication'),
                    required:false,
                    options: [
                      {"label":"--Select--","value":null},
                      {"label":"Insured Perils","value":"01"},
                      {"label":"Extended Cover","value":"02"},
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
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'PublicTeleCommunicationSumInsured',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'SumInsured',
                    maxLength: 15,
                    disabled: this.checkDisable('PublicTeleCommunicationSumInsured'),
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
                  className: 'col-12 md:col-3 lg:col-3 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-1 lg:col-1 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  type: 'ngselect',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'PublicUtilities',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'Public Utilities',
                    maxLength: 15,
                    disabled: this.checkDisable('PublicUtilities'),
                    required:false,
                    options: [
                      {"label":"--Select--","value":null},
                      {"label":"Insured Perils","value":"01"},
                      {"label":"Extended Cover","value":"02"},
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
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'PublicUtilitiesSumInsured',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'SumInsured',
                    maxLength: 15,
                    disabled: this.checkDisable('PublicUtilitiesSumInsured'),
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
                  className: 'col-12 md:col-3 lg:col-3 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-1 lg:col-1 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  type: 'primeTextArea',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'UnspecifiedSuppliersDesc',
                  defaultValue: null,
                  templateOptions: {
                    label: 'Unspecified Suppliers Description',
                    maxLength: 200,
                    cols: 40,
                    rows:1,
                    disabled: this.checkDisable('UnspecifiedSuppliersDesc'),
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
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'UnspecifiedSuppliers',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'UnSpecified Supplier SumInsured',
                    maxLength: 15,
                    disabled: this.checkDisable('UnspecifiedSuppliers'),
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
                  className: 'col-12 md:col-3 lg:col-3 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-1 lg:col-1 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'AlternativeExistSI',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'Customers & Suppliers (Alternative Exist)',
                    maxLength: 15,
                    disabled: this.checkDisable('AlternativeExistSI'),
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
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'AlternativeNotExistSI',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'Customers & Suppliers (Alternative Not Exist)',
                    maxLength: 15,
                    disabled: this.checkDisable('AlternativeNotExistSI'),
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
                  className: 'col-12 md:col-3 lg:col-3 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  className: 'col-12 md:col-1 lg:col-1 ',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: true,

                  },
                },
                {
                  type: 'primeTextArea',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'AdditionalClaimPreparationCostDesc',
                  defaultValue: null,
                  templateOptions: {
                    label: 'Additional Claim Preparation Cost Description',
                    maxLength: 200,
                    cols: 40,
                    rows:1,
                    disabled: this.checkDisable('AdditionalClaimPreparationCostDesc'),
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
                  type: 'commaSeparator',
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  key: 'AdditionalClaimPreparationCost',
                  defaultValue: '0',
                  templateOptions: {
                    label: 'Additional Claim Preparation Cost SumInsured',
                    maxLength: 15,
                    disabled: this.checkDisable('AdditionalClaimPreparationCost'),
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