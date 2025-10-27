import { FormlyFieldConfig } from "@ngx-formly/core";

export class BuildingCombinedCommercialNamibia{
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
              key: 'GeyserInhouseBC',
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
              key: 'GeyserSolarBC',
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
              key: 'EscalationBC',
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
                  key: 'ConstructionTypeBC',
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
                  key: 'fireBuildingSumInsuredBC',
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
                  key: 'AccidentalDamageBC',
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
                  key: 'ClaimPreparationCostBC',
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
                  key: 'UnspecifiedSupplierBC',
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
                  key: 'IndeminityPeriodBC',
                  type: 'ngselect',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3 ',
                  props: {
                    label: 'Indeminity Period',
                    disabled: this.checkDisable('IndeminityPeriod'),
                    placeholder: 'Select a Option',
                    options:[],
                    required: true,
                   
                  },
                },
                {
                  key: 'CoverBC',
                  type: 'ngselect',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3  ',
                  props: {
                    label: 'Cover',
                    disabled: this.checkDisable('Cover'),
                    placeholder: 'Select a Option',
                    options:[],
                    required: true,
                    
                  },
                },
                {
                  key: 'BISumInsuredBC',
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
                  key: 'GrossRentalsBC',
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
              key: 'PublicTelecommuncationBC',
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
                  key: 'PublicTelecommuncationSIBC',
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
              key: 'PublicUtilitiesBC',
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
                  key: 'PublicUtilitiesSIBC',
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
              key: 'CustomerSupplierBC',
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
                  key: 'CustomerSupplierSIBC',
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
              key: 'PreventionofAccessBC',
              type: 'ngselect',
              props: {
                label: 'Prevention of Access',
                disabled: this.checkDisable('PreventionofAccess'),
                placeholder: 'Select an option',
                required: false,
                options: [
                  
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