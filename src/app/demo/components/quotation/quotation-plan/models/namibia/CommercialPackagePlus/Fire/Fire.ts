import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";
export class FireCommercialNamibia{
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
                  key: 'fireSumInsured',
                  type: 'input',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
                  props: {
                    label: 'Building Sum Insured',
                    maxLength: 15,
                    placeholder: 'Enter amount',
                    required: false,
                  },
                },
                {
                  key: 'AdditonalInflation',
                  type: 'select',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
                  props: {
                    label: 'Additional Inflation',
                    placeholder: 'Select an option',
                    required: false,
                    options: [
                    ],
                  },
                },
                {
          key: 'firecontents',
          type: 'input',
          props: {
            label: 'Contents',
            disabled: this.checkDisable('firecontents'),
            placeholder: 'Enter amount',
            type: 'number',
            maxLength: 15,
            required: false,
          },
                },
                {
                  key: 'plantMachinery',
                  type: 'input',
                  className: 'col-12 md:col-6 lg:col-4 xl:col-4',
                  props: {
                    label: 'Plant & Machinery',
                    placeholder: 'Enter amount',
                    required: false,
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
                    required: false,
                  },
                },
                {
                  key: 'miscellaneous',
                  type: 'input',
                  className:'col-12 md:col-4 lg:col-4 xl:col-4',
                  props: {
                    label: 'Miscellaneous',
                    placeholder: 'Enter amount',
                    required: false,
                  },
                },
                {
                  key: 'powerSurge',
                  type: 'input',
                  props: {
                    label: 'Power Surge',
                    placeholder: 'Enter amount',
                    required: false,
                  },
                },
                {
                  key: 'hailDamage',
                  type: 'input',
                  props: {
                    label: 'Hail Damage to Vehicle Open',
                    placeholder: 'Enter amount',
                    required: false,
                  },
                },
        {
          key: 'GeyserInhouse',
          type: 'input',
          props: {
            label: 'Geyser',
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
          key: 'leakageExtension',
          type: 'select',
          className: 'col-6',
          props: {
            label: 'Leakage Extension',
            placeholder: '--Select--',
            required: false,
            options: [
            ],
          },
        },
        {
          key: 'leakageExtensionSumInsured',
          type: 'input',
          className: 'col-6',
          props: {
            label: 'Leakage Extension SumInsured',
            placeholder: 'Enter SumInsured',
            required: false,
            options: [
            ],
          },
        },
         {
          key: 'rentReceivable',
          type: 'input',
          props: {
            label: 'Rent Receivable',
            placeholder: 'Enter amount',
            required: false,
          },
        },
        {
          key: 'rentReceivable',
          type: 'display',
          props: {
            label: '',
            required: false,
          },
        },
        {
          hide:true,
          fieldGroup: [
            {
              key: 'PreventionofAccess',
              type: 'input',
              className: 'col-4',
              props: {
                placeholder: 'Enter Fire Amount',
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
                required: false,
                options: [
                ],
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
              className: 'sm:col-12 md:col-4 lg:col-4 xl:col-4',
              props: {
                label: 'Accidental Damage',
                placeholder: 'Enter amount',
                required: false,
              },
            },
            {
              key: 'ClaimPreparationCost',
              type: 'commaSeparator',
              className: 'sm:col-12 md:col-4 lg:col-4 xl:col-4',
              props: {
                label: 'Claim Preparation Cost',
                placeholder: 'Enter amount',
                required: false,
              },
            },
            {
              key: 'UnspecifiedSupplier',
              type: 'commaSeparator',
              className: 'sm:col-12 md:col-4 lg:col-4 xl:col-4',
              props: {
                label: 'Unspecified Supplier',
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
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3 ',
              props: {
                label: 'Indeminity Period',
                placeholder: 'Select a Option',
                required: false,
                options:[]
              },
            },
            {
              key: 'Cover',
              type: 'ngselect',
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3  ',
              props: {
                label: 'Cover',
                placeholder: 'Select a Option',
                required: false,
                options:[]
              },
            },
            {
              key: 'BISumInsured',
              type: 'commaSeparator',
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
              props: {
                label: 'Sum Insured',
                placeholder: 'Enter amount',
                required: false,
              },
            },
            {
              key: 'GrossRentals',
              type: 'commaSeparator',
              className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
              props: {
                label: 'Gross Rentals',
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
            required: false,
            options: [
            ]
          },
          fieldGroup: [
            {
              key: 'PublicTelecommuncationSI',
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
              key: 'PublicUtilitiesSI',
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
              key: 'CustomerSupplierSI',
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
          key: 'PreventionofAccess',
          type: 'input',
          props: {
            label: 'Prevention Of Access',
            placeholder: 'Enter Sum Insured',
            type: 'number',
            required: true
          }
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