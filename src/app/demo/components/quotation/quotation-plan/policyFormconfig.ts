import { FormlyFieldConfig } from '@ngx-formly/core';


export class policyFormConfig {
  policyfields: FormlyFieldConfig;
  primaryfields: FormlyFieldConfig;
  extensionfields: FormlyFieldConfig;
  extensionTablefields: FormlyFieldConfig;
  interruptionfields:FormlyFieldConfig;

  constructor() {
    this.policyfields = {
      fieldGroupClassName: 'grid',
      fieldGroup: [
        {
          key: 'plantMachinery',
          type: 'input',
          className: 'col-12 md:col-6 lg:col-4 xl:col-4',
          props: {
            label: 'Plant & Machinery',
            placeholder: 'Enter amount',
            required: true,
            type: 'text',   
            maxLength: 15, 
          },
          validators: {
            validation: ['numeric'],  
          },
        }
        ,
        {
          key: 'stockInTrade',
          type: 'input',
          className:'col-12 md:col-6 lg:col-4 xl:col-4',
          props: {
            label: 'Stock In Trade',
            placeholder: 'Enter amount',
            required: true,
          },
        },
        {
          key: 'miscellaneous',
          type: 'input',
          className:'col-12 md:col-4 lg:col-4 xl:col-4',
          props: {
            label: 'Miscellaneous',
            placeholder: 'Enter amount',
            required: true,
          },
        },
        {
          key: 'powerSurge',
          type: 'input',
          props: {
            label: 'Power Surge',
            placeholder: 'Enter amount',
            required: true,
          },
        },
        {
          key: 'hailDamage',
          type: 'input',
          props: {
            label: 'Hail Damage to Vehicle Open',
            placeholder: 'Enter amount',
            required: true,
          },
        },
        {
          key: 'rentReceivable',
          type: 'input',
          props: {
            label: 'Rent Receivable',
            placeholder: 'Enter amount',
            required: true,
          },
        },
        {
          key: 'leakageExtension',
          type: 'select',
          className: 'col-6',
          props: {
            label: 'Leakage Extension',
            placeholder: 'Select an option',
            required: true,
            options: [

            ],
          },
        },
     
      
        {
          key: 'PreventionofAccess',
          hide:true,
          fieldGroup: [
            {
              key: 'PreventionofAccessSelect',
              type: 'select',
              className: 'col-4',
              props: {
                label: 'Prevention of Access',
                required: true,
                placeholder: 'Select an Option',
                options: [
                  { label: 'Minor', value: 'minor' },
                  { label: 'Major', value: 'major' },
                  { label: 'Total Loss', value: 'totalLoss' },
                ],
              },
            },
            {
              key: 'PreventionofAccessInput',
              type: 'input',
              className: 'col-4',
              props: {
                placeholder: 'Enter amount',
                type: 'number',
                required: true
              },
            },
          ],
        },
        {
          key: 'PublicTelecommuncation',
          hide:true,
          fieldGroup: [
            {
              key: 'PublicTelecommuncationSelect',
              type: 'select',
              className: 'col-4',
              props: {
                label: 'Public Telecommuncation',
                required: true,
                placeholder: 'Select an Option',
                options: [
                  { label: 'Minor', value: 'minor' },
                  { label: 'Major', value: 'major' },
                  { label: 'Total Loss', value: 'totalLoss' },
                ],
              },
            },
            {
              key: 'PublicTelecommuncationInput',
              type: 'input',
              className: 'col-4',
              props: {
                placeholder: 'Enter amount',
                type: 'number',
                required: true
              },
            },
          ],
        },
        {
          key: 'PublicUtilities',
          hide:true,
          fieldGroup: [
            {
              key: 'PublicUtilitiesSelect',
              type: 'select',
              className: 'col-4',
              props: {
                label: 'Public Utilities',
                required: true,
                placeholder: 'Select an Option',
                options: [
                  { label: 'Minor', value: 'minor' },
                  { label: 'Major', value: 'major' },
                  { label: 'Total Loss', value: 'totalLoss' },
                ],
              },
            },
            {
              key: 'PublicUtilitiesInput',
              type: 'input',
              className: 'col-4',
              props: {
                placeholder: 'Enter amount',
                type: 'number',
                required: true
              },
            },
          ],
        },
        {
          key: 'CustomerSupplier',
          hide:true,
          fieldGroup: [
            {
              key: 'CustomerSupplierSelect',
              type: 'select',
              className: 'col-4',
              props: {
                label: 'Customer Supplier',
                required: true,
                placeholder: 'Select an Option',
                options: [
                  { label: 'Minor', value: 'minor' },
                  { label: 'Major', value: 'major' },
                  { label: 'Total Loss', value: 'totalLoss' },
                ],
              },
            },
            {
              key: 'CustomerSupplierInput',
              type: 'input',
              className: 'col-4',
              props: {
                placeholder: 'Enter amount',
                type: 'number',
                required: true
              },
            },
          ],
        }

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
                placeholder: 'Select an option',
                required: true,
                options: [
    
                ],
              },
            },
            {
              key: 'AdditonalInflation',
              type: 'ngselect',
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
              props: {
                label: 'Additonal Inflation',
                placeholder: 'Select an option',
                required: true,
                options: [
    
                ],
              },
            },
            {
              key: 'SumInsured',
              type: 'commaSeparator',
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',

              props: {
                label: 'Sum Insured',
                maxLength: 15,
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
              key: 'AccidentalDamage',
              type: 'input',
              className: 'col-4 md:col-4 lg:col-4 xl:col-4',
              props: {
                label: 'AccidentalDamage',
                placeholder: 'Enter amount',
                required: true,
               
              },
            },
            {
              key: 'ClaimPreparationCost',
              type: 'input',
              className: 'col-4 md:col-4 lg:col-4 xl:col-4',
              props: {
                label: 'Claim Preparation Cost',
                placeholder: 'Enter amount',
                required: true,
                
              },
            },
            {
              key: 'UnspecifiedSupplier',
              type: 'input',
              className: 'col-4 md:col-4 lg:col-4 xl:col-4',

              props: {
                label: 'Unspecified Supplier',
                placeholder: 'Enter amount',
                required: true,
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
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
              props: {
                label: 'Indeminity Period',
                placeholder: 'Select a Option',
                required: true,
               
              },
            },
            {
              key: 'Cover',
              type: 'ngselect',
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
              props: {
                label: 'Cover',
                placeholder: 'Select a Option',
                required: true,
                
              },
            },
            {
              key: 'SumInsured',
              type: 'input',
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',

              props: {
                label: 'Sum Insured',
                placeholder: 'Enter amount',
                required: true,
              },
            },
            {
              key: 'GrossRentals',
              type: 'input',
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',

              props: {
                label: 'Gross Rentals',
                placeholder: 'Enter amount',
                required: true,
              },
            },
          ]
        }
      ]
      
    }
    this.extensionTablefields = {
      fieldGroup: [
        {
          key: 'PreventionofAccess',
          type: 'ngselect',
          props: {
            label: 'Prevention of Access',
            placeholder: 'Select an option',
            required: false,
            options: [
              { label: 'Option 1', value: 'opt1' },
              { label: 'Option 2', value: 'opt2' }
            ]
          },
          fieldGroup: [
            {
              key: 'PreventionofAccessInput',
              type: 'input',
              props: {
                label: 'Sum Insured',
                placeholder: 'Enter Sum Insured',
                type: 'number',
                required: true
              }
            }
          ]
        },
        {
          key: 'PublicTelecommuncation',
          type: 'ngselect',
          props: {
            label: 'Public Telecommuncation',
            placeholder: 'Select an option',
            required: false,
            options: [
              { label: 'Option 1', value: 'opt1' },
              { label: 'Option 2', value: 'opt2' }
            ]
          },
          fieldGroup: [
            {
              key: 'PublicTelecommuncationInput',
              type: 'input',
              props: {
                label: 'Sum Insured',
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
            options: [
              { label: 'Option 1', value: 'opt1' },
              { label: 'Option 2', value: 'opt2' }
            ]
          },
          fieldGroup: [
            {
              key: 'PublicUtilitiesInput',
              type: 'input',
              props: {
                label: 'Sum Insured',
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
            required: false,
            options: [
              { label: 'Option 1', value: 'opt1' },
              { label: 'Option 2', value: 'opt2' }
            ]
          },
          fieldGroup: [
            {
              key: 'CustomerSupplierInput',
              type: 'input',
              props: {
                label: 'Sum Insured',
                placeholder: 'Enter Sum Insured',
                type: 'number',
                required: true
              }
            }
          ]
        }   
      ]
    };
    
  }
 
};
