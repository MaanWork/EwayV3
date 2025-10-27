import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class FirePhoenix{
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
                  key: 'AdditonalInflation',
                  type: 'select',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
                  props: {
                    label: 'Additonal Inflation',
                    placeholder: 'Select an option',
                    required: false,
                    options: [
        
                    ],
                  },
                },
                {
                  key: 'fireBuildingSumInsured',
                  type: 'input',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
    
                  props: {
                    label: 'Sum Insured',
                    maxLength: 15,
                    placeholder: 'Enter amount',
                    required: false,
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
                  className: 'col-4 md:col-4 lg:col-4 xl:col-4',
                  props: {
                    label: 'Accidental Damage',
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
                    placeholder: 'Select a Option',
                    required: false,
                    options:[]
                   
                  },
                },
                {
                  key: 'Cover',
                  type: 'ngselect',
                  className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3  mt-2',
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
                label: 'Sum Insured',
                placeholder: 'Enter Sum Insured',
                type: 'number',
                required: true
              }
            },   
          ]
        };
        this.fields = {
          props: { label: 'Fire' },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-12 lg:col-12 xl:col-12',
                  type: 'double-table',
                  fieldGroup: [
                    {
                        fieldGroup:[
                          {props:{label:`Coverage`}},
                          {props:{label:`Description`}},
                          {props:{label:`Sum Insured`}},
                          
                        ]
                    },
                    {
                      fieldGroup:[
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Contents`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'input',
                                  key: 'contentsDesc',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('contentsDesc'),
                                    maxLength:200,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'commaSeparator',
                                  key: 'contents',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('contents'),
                                    maxLength:15,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                
                              ]
                            },
                            {
                              fieldGroup:[
                             
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Plant & Machinery`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'input',
                                  key: 'plantMachineryDesc',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('plantMachineryDesc'),
                                    maxLength:200,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                {
                                  className: "mt-3",
                                  type: 'commaSeparator',
                                  key: 'plantMachinery',
                
                                  templateOptions: {
                                    maxLength:15,
                                    disabled: this.checkDisable('plantMachinery'),
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Stock In Trade`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'input',
                                  key: 'stockInTradeDesc',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('stockInTradeDesc'),
                                    maxLength:200,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'commaSeparator',
                                  key: 'stockInTrade',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('stockInTrade'),
                                    maxLength:15,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                               
                              ]
                            },
                            {
                              fieldGroup:[
                             
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Miscellaneous`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'input',
                                  key: 'miscellaneousDesc',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('miscellaneousDesc'),
                                    maxLength:200,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                {
                                  className: "mt-3",
                                  type: 'commaSeparator',
                                  key: 'miscellaneous',
                
                                  templateOptions: {
                                    maxLength:15,
                                    disabled: this.checkDisable('miscellaneous'),
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                               
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Power Surge`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'input',
                                  key: 'powerSurgeDesc',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('powerSurgeDesc'),
                                    maxLength:200,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                {
                                  className: "mt-1 rightAlign",
                                  type: 'commaSeparator',
                                  key: 'powerSurge',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('powerSurge'),
                                    maxLength:15,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                            
                              ]
                            },
                            {
                                fieldGroup:[
                                  {
                                    className: "mt-1",
                                    type: 'display',
                  
                                    templateOptions: {
                                      label: `Hail Damage to Vehicle Open`,
                                      required: false,
                  
                                    },
                                  },
                                  {
                                    className: "mt-1",
                                    type: 'input',
                                    key: 'hailDamageDesc',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('hailDamageDesc'),
                                      maxLength:200,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                                  {
                                    className: "mt-1 rightAlign",
                                    type: 'commaSeparator',
                                    key: 'hailDamage',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('hailDamage'),
                                      maxLength:15,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                              
                                ]
                            },
                            {
                                fieldGroup:[
                                  {
                                    className: "mt-1",
                                    type: 'display',
                  
                                    templateOptions: {
                                      label: `Rent Receivable`,
                                      required: false,
                  
                                    },
                                  },
                                  {
                                    className: "mt-1",
                                    type: 'input',
                                    key: 'rentReceivableDesc',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('rentReceivableDesc'),
                                      maxLength:200,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                                  {
                                    className: "mt-1 rightAlign",
                                    type: 'commaSeparator',
                                    key: 'rentReceivable',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('rentReceivable'),
                                      maxLength:15,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                              
                                ]
                            },
                            {
                                fieldGroup:[
                                  {
                                    className: "mt-1",
                                    type: 'display',
                  
                                    templateOptions: {
                                      label: `Geyser In house`,
                                      required: false,
                  
                                    },
                                  },
                                  {
                                    className: "mt-1",
                                    type: 'input',
                                    key: 'GeyserInhouseDesc',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('GeyserInhouseDesc'),
                                      maxLength:200,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                                  {
                                    className: "mt-1 rightAlign",
                                    type: 'commaSeparator',
                                    key: 'GeyserInhouse',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('GeyserInhouse'),
                                      maxLength:15,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                              
                                ]
                            },
                            {
                                fieldGroup:[
                                  {
                                    className: "mt-1",
                                    type: 'display',
                  
                                    templateOptions: {
                                      label: `Geyser Solar`,
                                      required: false,
                  
                                    },
                                  },
                                  {
                                    className: "mt-1",
                                    type: 'input',
                                    key: 'GeyserSolarDesc',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('GeyserSolarDesc'),
                                      maxLength:200,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                                  {
                                    className: "mt-1 rightAlign",
                                    type: 'commaSeparator',
                                    key: 'GeyserSolar',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('GeyserSolar'),
                                      maxLength:15,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                              
                                ]
                            },
                            {
                                fieldGroup:[
                                  {
                                    className: "mt-1",
                                    type: 'display',
                  
                                    templateOptions: {
                                      label: `Leakage Extension`,
                                      required: false,
                  
                                    },
                                  },
                                  {
                                    className: "mt-1",
                                    type: 'input',
                                    key: 'leakageExtensionDesc',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('leakageExtensionDesc'),
                                      maxLength:200,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                                  {
                                    className: "mt-1 rightAlign",
                                    type: 'commaSeparator',
                                    key: 'leakageExtension',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('leakageExtension'),
                                      maxLength:15,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                              
                                ]
                            },
                            {
                                fieldGroup:[
                                  {
                                    className: "mt-1",
                                    type: 'display',
                  
                                    templateOptions: {
                                      label: `Leakage Extension SumInsured`,
                                      required: false,
                  
                                    },
                                  },
                                  {
                                    className: "mt-1",
                                    type: 'input',
                                    key: 'leakageExtensionSumInsuredDesc',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('leakageExtensionSumInsuredDesc'),
                                      maxLength:200,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                                  {
                                    className: "mt-1 rightAlign",
                                    type: 'commaSeparator',
                                    key: 'leakageExtensionSumInsured',
                  
                                    templateOptions: {
                                      disabled: this.checkDisable('leakageExtensionSumInsured'),
                                      maxLength:15,
                                      required: false,
                                      options: [
                  
                                      ],
                  
                                    },
                                    validators: {
                                    },
                                    hooks: {
                                    },
                                    expressions: {
                                    },
                                  },
                              
                                ]
                            },
                      ]
                    },
                    
                  ]
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