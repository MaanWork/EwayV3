import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class WorkOrder {
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    public model = {}
    subuserType: any=null;
    finalizeYN: any='N';
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        let commonDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
        if (commonDetails) this.commonDetails = commonDetails;
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields= {
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                    {
                        type: 'ngselect',
                        key: 'WorkOrderType',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        props: {
                          label: `Work Order Type`,
                          disabled: false,
                        //   required: true,
                          options: [
          
                          ],
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                      type: 'input',
                      key: 'WorkOrderNumber',
                      defaultValue: '',
                      className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                      props: {
                        label: `Work Order Number`,
                        disabled: false,
                        // required: true,
                        options: [
        
                        ],
                      },
                    //   validators: {
                    //     validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                    //   },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        type: 'datepicker',
                        key: 'WorkOrderDate',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        
                        props: {
                          label: `WorkOrderDate`,
                          disabled: false,
                        //   required: true,
                          options: [
          
                          ],
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                      type: 'ngselect',
                      key: 'SettlementType',
                      defaultValue: '',
                      className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                      props: {
                        label: `Account For Settlement Type`,
                        disabled: false,
                        // required: true,
                        options: [
        
                        ],
                      },
                    //   validators: {
                    //     validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                    //   },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        type: 'ngselect',
                        key: 'Settlement',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        props: {
                          label: `Account For Settlement`,
                          disabled: false,
                        // required: true,
                          options: [
          
                          ],
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                      type: 'input',
                      key: 'DefaultGarageName',
                      defaultValue: '',
                      className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                      props: {
                        label: `Default Garage Name`,
                        disabled: false,
                        // required: true,
                        options: [
        
                        ],
                      },
                    //   validators: {
                    //     validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                    //   },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'DefaultGarageCode',
                        templateOptions: {
                          label: 'Default Garage Code',
                          disabled: false,
                        //   required: true,
                        },
                      //   parsers: [
                      //     value => {
                      //         return (value = value.toUpperCase());
                      //     }
                      // ],
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                    },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'PrimaryLocation',
                        templateOptions: {
                          label: 'Primary Location',
                          disabled: false,
                        //   required: false,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        // },
                    },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'RepairType',
                        templateOptions: {
                          label: 'Repair Type',
                          disabled: false,
                        //   required: true,
                        },
                        parsers: [
                          value => {
                              return (value = value.toUpperCase());
                          }
                       ],
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                    },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'GarageName',
                        templateOptions: {
                          label: 'Garage Name',
                          disabled: false,
                        //   required: true,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                    },
                    {
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        type: 'input',
                        key: 'GarageCode',
                        templateOptions: {
                          label: 'Garage Code',
                          disabled: false,
                        //   required: true,
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
                        // },
                    },
                    {
                        type: 'input',
                        key: 'GarageQuotationNumber',
                        defaultValue: '',
                        className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                        props: {
                          label: `Garage Quotation Number`,
                          disabled: false,
                        //   required: true,
                          options: [
          
                          ],
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                        type: 'datepicker',
                        key: 'DeliveryDate',
                        defaultValue: '',
                        className: 'col-12 lg:col-2 md:col-2 xl:col-2',
                        props: {
                          label: `Delivery Date`,
                          disabled: false,
                        //   required: true,
                          options: [
          
                          ],
                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                      type: 'radioList',
                        key: 'Subrogation',
                        defaultValue: '',
                        className: 'col-12 lg:col-2 md:col-2 xl:col-2',
                        templateOptions: {
                          type: 'radioList',
                          label: `Subrogation`,
                          disabled: false,
                        //   required: true,
                        options: [{ value: 'Y', label: 'Yes',CodeDesc:'Yes','CodeDescLocal':'Sim' }, { value: 'N', label: 'No',CodeDesc:'No','CodeDescLocal':'Não' }],

                        },
                        // validators: {
                        //   validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                        // },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    
                    
                    {
                      type: 'radioList',
                      key: 'JoinOrder',
                      defaultValue: '',
                      className: 'col-12 lg:col-2 md:col-2 xl:col-2',
                      templateOptions: {
                        type: 'radioList',
                        label: `Join Order`,
                        disabled: false,
                        // required: true,
                        options: [{ value: 'Y', label: 'Yes',CodeDesc:'Yes','CodeDescLocal':'Sim' }, { value: 'N', label: 'No',CodeDesc:'No','CodeDescLocal':'Não' }],

                      },
                    //   validators: {
                    //     validation: [ForceLengthValidators.maxLength(5), ForceLengthValidators.min(1)]
                    //   },
                      hooks: {
                      },
                      expressions: {
                      },
                  },
                  {
                    type: 'input',
                    key: 'TottalLoss',
                    defaultValue: '',
                    className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                    props: {
                      label: `Tottal Loss`,
                      disabled: false,
                    //   required: true,
                      // options: [
      
                      // ],
                    },
                    // validators: {
                    //   validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                    // },
                    hooks: {
                    },
                    expressions: {
                    },
                },
                {
                  type: 'ngselect',
                  key: 'TottalLossType',
                  defaultValue: '',
                  className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                  props: {
                    label: `Tottal Loss Type`,
                    disabled: false,
                  //   required: true,
                    options: [
    
                    ],
                  },
                  // validators: {
                  //   validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                  // },
                  hooks: {
                  },
                  expressions: {
                  },
              },
              {
                type: 'textarea',
                key: 'Remarks',
                defaultValue: '',
                className: 'col-12 lg:col-12 md:col-12 xl:col-12',
                props: {
                  label: `Remarks`,
                  disabled: false,
                //   required: true,
                  // options: [
  
                  // ],
                },
                // validators: {
                //   validation: [ForceLengthValidators.maxLength(10), ForceLengthValidators.min(1)]
                // },
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