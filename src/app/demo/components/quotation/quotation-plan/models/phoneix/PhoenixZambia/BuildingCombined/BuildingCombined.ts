import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class BuildingCombinedPhoenix{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    policyfields: FormlyFieldConfig;
    primaryfields: FormlyFieldConfig;
    extensionfields: FormlyFieldConfig;
    extensionTablefields: FormlyFieldConfig;
    interruptionfields:FormlyFieldConfig;
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
        this.policyfields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              key: 'GeyserInhouse',
              type: 'input',
              props: {
                label: 'Geyser In house',
                disabled: this.checkDisable('GeyserInhouse'),
                placeholder: 'Enter amount',
                maxLength: 15,
                type: 'number',
                required: false,
              },
            },
            {
              key: 'GeyserSolar',
              type: 'input',
              props: {
                label: 'Geyser Solar',
                disabled: this.checkDisable('GeyserSolar'),
                placeholder: 'Enter amount',
                type: 'number',
                maxLength: 15,
                required: false,
              },
            },
            {
              key: 'Escalation',
              type: 'input',
              props: {
                label: 'Escalation (1st Year)',
                disabled: this.checkDisable('Escalation'),
                placeholder: 'Enter amount',
                type: 'number',
                maxLength: 15,
                required: false,
              },
            },    
          ]
        }
        this.primaryfields = {
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  key: 'ConstructionType',
                  type: 'ngselect',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
                  defaultValue :'',
                  props: {
                    label: 'Construction Type',
                    disabled: this.checkDisable('ConstructionType'),
                    placeholder: 'Select an option',
                    required: true,
                    options: [
        
                    ],
                  },
                },
                // {
                //   key: 'AdditonalInflation',
                //   type: 'ngselect',
                //   className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
                //   props: {
                //     label: 'Additonal Inflation',
                //     disabled: this.checkDisable('AdditonalInflation'),
                //     placeholder: 'Select an option',
                //     required: false,
                //     options: [
        
                //     ],
                //   },
                // },
                {
                  key: 'fireBuildingSumInsured',
                  type: 'commaSeparator',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
    
                  props: {
                    label: 'Sum Insured',
                    
                    maxLength: 15,
                    disabled: this.checkDisable('SumInsured'),
                    placeholder: 'Enter amount',
                    required: true,
                  },
                },
              ]
            }
          ]
          
        }
        this.extensionfields = {
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  key: 'AccidentalSumInsured',
                  type: 'commaSeparator',
                  className: 'col-4 md:col-4 lg:col-4 xl:col-4',
                  props: {
                    label: 'Accidental Damage',
                    disabled: this.checkDisable('SumInsured'),
                    placeholder: 'Enter amount',
                    required: false,
                   
                  },
                },
                {
                  key: 'ClaimPreparationCost',
                  type: 'commaSeparator',
                  className: 'col-4 md:col-4 lg:col-4 xl:col-4',
                  props: {
                    label: 'Claim Preparation Cost',
                    disabled: this.checkDisable('SumInsured'),
                    placeholder: 'Enter amount',
                    required: false,
                    
                  },
                },
                {
                  key: 'UnspecifiedSupplier',
                  type: 'commaSeparator',
                  className: 'col-4 md:col-4 lg:col-4 xl:col-4',
    
                  props: {
                    label: 'Unspecified Supplier',
                    disabled: this.checkDisable('SumInsured'),
                    placeholder: 'Enter amount',
                    required: false,
                  },
                },
              ]
            }
          ]
          
        }
        this.interruptionfields = {
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  key: 'IndeminityPeriod',
                  type: 'ngselect',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3 mt-2',
                  props: {
                    label: 'Indeminity Period',
                    disabled: this.checkDisable('IndeminityPeriod'),
                    placeholder: 'Select a Option',
                    options:[],
                    required: true,
                   
                  },
                },
                {
                  key: 'Cover',
                  type: 'ngselect',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3  mt-2',
                  props: {
                    label: 'Cover',
                    disabled: this.checkDisable('Cover'),
                    placeholder: 'Select a Option',
                    options:[],
                    required: true,
                    
                  },
                },
                {
                  key: 'BISumInsured',
                  type: 'commaSeparator',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
    
                  props: {
                    label: 'Sum Insured',
                    disabled: this.checkDisable('SumInsured'),
                    placeholder: 'Enter amount',
                    required: true,
                  },
                },
                {
                  key: 'GrossRentals',
                  type: 'commaSeparator',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
    
                  props: {
                    label: 'Gross Rentals',
                    disabled: this.checkDisable('SumInsured'),
                    placeholder: 'Enter amount',
                    required: false,
                  },
                },
              ]
            }
          ]
          
        }
        this.extensionTablefields = {
          fieldGroup: [
            
            {
              key: 'PublicTelecommuncation',
              type: 'ngselect',
              props: {
                label: 'Public Telecommuncation',
                placeholder: 'Select an option',
                disabled: this.checkDisable('PublicTelecommuncation'),
                required: false,
                options: [
                  { label: 'Option 1', value: 'opt1' },
                  { label: 'Option 2', value: 'opt2' }
                ]
              },
              fieldGroup: [
                {
                  key: 'PublicTelecommuncationSI',
                  type: 'commaSeparator',
                  props: {
                    label: 'Sum Insured',
                    disabled: this.checkDisable('SumInsured'),
                    placeholder: 'Enter Sum Insured',
                    type: 'number',
                    required: true
                  }
                }
              ]
            },
            {
              key: 'PublicUtilities',
              type: 'ngselect',
              props: {
                label: 'Public Utilities',
                placeholder: 'Select an option',
                required: false,
                disabled: this.checkDisable('PublicUtilities'),
                options: [
                  { label: 'Option 1', value: 'opt1' },
                  { label: 'Option 2', value: 'opt2' }
                ]
              },
              fieldGroup: [
                {
                  key: 'PublicUtilitiesSI',
                  type: 'commaSeparator',
                  props: {
                    label: 'Sum Insured',
                    disabled: this.checkDisable('SumInsured'),
                    placeholder: 'Enter Sum Insured',
                    type: 'number',
                    required: true
                  }
                }
              ]
            },
            {
              key: 'CustomerSupplier',
              type: 'ngselect',
              props: {
                label: 'Customer Supplier',
                placeholder: 'Select an option',
                disabled: this.checkDisable('CustomerSupplier'),
                required: false,
                options: [
                  { label: 'Option 1', value: 'opt1' },
                  { label: 'Option 2', value: 'opt2' }
                ]
              },
              fieldGroup: [
                {
                  key: 'CustomerSupplierSI',
                  type: 'commaSeparator',
                  props: {
                    label: 'Sum Insured',
                    disabled: this.checkDisable('SumInsured'),
                    placeholder: 'Enter Sum Insured',
                    type: 'number',
                    required: true
                  }
                }
              ]
            },
            {
              key: 'PreventionofAccess',
              type: 'ngselect',
              props: {
                label: 'Prevention of Access',
                disabled: this.checkDisable('PreventionofAccess'),
                placeholder: 'Select an option',
                required: false,
                options: [
                  { label: 'Option 1', value: 'opt1' },
                  { label: 'Option 2', value: 'opt2' }
                ]
              },
              fieldGroup: [
                
              ]
            },   
          ]
        };
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