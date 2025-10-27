

import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";

export class MotorVehicleInfoSanlamIvory{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields={
            props: { label: 'All Risk' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
               

                fieldGroup: [
                  
                  {
                    type: 'ngselect',
                    key: 'MotorUsage',
                    id:'MotorUsage',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    props: {
                      label: `MotorUsage`,
                      disabled: this.checkDisable('MotorUsage'),
                      required: true,
                      options: [
      
                      ],
      
                    },
                    validators: {
                        validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)],
                        //  message: ( field: FormlyFieldConfig) =>"This Field is Required",
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    type: 'ngselect',
                    id:'BodyType',
                    key: 'BodyType',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `BodyType`,
                      disabled: this.checkDisable('BodyType'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ngselect',
                    key: 'Make',
                    id:'Make',
                    props: {
                      label: `Make`,
                      disabled: this.checkDisable('Make'),
                      required:true,
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ngselect',
                    key: 'Model',
                    id:'Model',
                    props: {
                      label: `Model`,
                      disabled: this.checkDisable('Model'),
                      required:true,
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'ModelDescription',
                    id:'ModelDescription',
                    props: {
                      label: `ModelDescription`,
                      disabled: this.checkDisable('ModelDescription'),
                      required:true,
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
                  // {
                  //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  //     id:'PurchaseDate',
                  //     key: 'PurchaseDate',
                  //     type: 'datepicker',
                  //     defaultValue: '',
                  //     templateOptions: {
                  //       defaultValue: '',
                  //     },
                  //     props: {
                  //       label: 'Purchase Date',
                  //       required: true,
                  //       type: 'date',
                  //       datepickerOptions: {
                  //         defaultValue: '',
                  //       },
                  //     }
                  // },
                  // {
                  //   type: 'ngselect',
                  //   id:'MotorUsage',
                  //   key: 'MotorUsage',
                  //   defaultValue: '',
                  //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  //   props: {
                  //     label: `Motor Usage`,
                  //     disabled: this.checkDisable('MotorUsage'),
                  //     required: true,
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
                    type: 'ngselect',
                    id:'MotorCategory',
                    key: 'MotorCategory',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `MotorCategory`,
                      disabled: this.checkDisable('MotorCategory'),
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
                  
                  // {
                  //   type: 'ngselect',
                  //   id:'DefenceCost',
                  //   key: 'DefenceCost',
                  //   defaultValue: '',
                  //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  //   props: {
                  //     label: `Defence Cost`,
                  //     disabled: this.checkDisable('DefenceCost'),
                  //     required: true,
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
                 
                  // {
                  //   type: 'commaSeparator',
                  //   id:'Newvalue',
                  //   key: 'Newvalue',
                  //   defaultValue: '',
                  //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  //   hide: true,
                  //   hideExpression:true,
                  //   props: {
                  //     label: `New  Value`,
                  //     disabled: this.checkDisable('Newvalue'),
                  //     required: true,
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
                    type: 'input',
                    id:'RegistrationNo',
                    key: 'RegistrationNo',
                    defaultValue: '',
                    hide: false,
                    hideExpression:false,
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `RegistrationNo`,
                      disabled: this.checkDisable('RegistrationNo'),
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
                 
                 
                 
                  // {
                  //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  //   type: 'commaSeparator',
                  //   key: 'InflationSumInsured',
                  //   id:'InflationSumInsured',
                  //   hide: false,
                  //   hideExpression:false,
                  //   props: {
                  //     label: `Inflation SumInsured`,
                  //     maxLength: 15,
                  //     disabled: this.checkDisable('InflationSumInsured'),
                  //     required: true,
                  //     options: [
  
                  //     ],
  
                  //   },
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  {
                    type: 'input',
                    id:'ChassisNo',
                    key: 'ChassisNo',
                    defaultValue: '',
                    hide: true,
                    hideExpression:true,
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `ChassisNo`,
                      disabled: this.checkDisable('ChassisNo'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ngselect',
                    key: 'EngineNumber',
                    id:'EngineNumber',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `EngineNumber`,
                      maxLength: 15,
                      disabled: this.checkDisable('EngineNumber'),
                      required: true,
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
                  // {
                  //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  //   type: 'input',
                  //   id:'VehicleSI',
                  //   key: 'VehicleSI',
                  //   hide: true,
                  //   hideExpression:true,
                  //   props: {
                  //     label: `SumInsured`,
                  //     maxLength: 15,
                  //     disabled: this.checkDisable('VehicleSI'),
                  //     required: true,
                  //     options: [
  
                  //     ],
  
                  //   },
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                 
                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'SeatingCapacity',
                    id:'SeatingCapacity',
                    props: {
                      label: ``,
                      maxLength: 15,
                      disabled: this.checkDisable('SeatingCapacity'),
                      required: true,
                      //className: "text-danger",
                      // options: [
  
                      // ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ng-select',
                    key: 'ManufactureYear',
                    id:'ManufactureYear',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `ManufactureYear`,
                      maxLength: 15,
                      disabled: this.checkDisable('ManufactureYear'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ng-select',
                    key: 'Color',
                    id:'Color',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `Color`,
                      maxLength: 15,
                      disabled: this.checkDisable('Color'),
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

                  // {
                  //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  //   type: 'input',
                  //   key: 'Mileage',
                  //   id:'Mileage',
                  //   props: {
                  //     label: `Mileage (Km/lit)`,
                  //     maxLength: 15,
                  //     disabled: this.checkDisable('Mileage'),
                  //     required: false,
                  //     options: [
  
                  //     ],
  
                  //   },
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ng-select',
                    key: 'FuelType',
                    id:'FuelType',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `FuelType`,
                      maxLength: 15,
                      disabled: this.checkDisable('FuelType'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ng-select',
                    key: 'PlateType',
                    id:'PlateType',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `PlateType`,
                      maxLength: 15,
                      disabled: this.checkDisable('PlateType'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'TareWeight',
                    id:'TareWeight',
                    props: {
                      label: `TareWeight`,
                      maxLength: 15,
                      disabled: this.checkDisable('TareWeight'),
                      required: true,
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'Tonnage',
                    id:'Tonnage',
                    props: {
                      label: `Tonnage`,
                      disabled: this.checkDisable('Tonnage'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'HorsePower',
                    id:'HorsePower',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `HorsePower`,
                      maxLength: 15,
                      disabled: this.checkDisable('HorsePower'),
                      required: true,
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ngselect',
                    key: 'DisplacementinCM3',
                    id:'DisplacementinCM3',
                    props: {
                      label: `DisplacementinCM3`,
                      disabled: this.checkDisable('DisplacementinCM3'),
                      required:true,
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ngselect',
                    key: 'NumberOfCylinder',
                    id:'NumberOfCylinder',
                    props: {
                      label: `NumberOfCylinder`,
                      disabled: this.checkDisable('NumberOfCylinder'),
                      required:true,
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'ngselect',
                    key: 'RegistrationDate',
                    id:'RegistrationDate',
                    props: {
                      label: `RegistrationDate`,
                      disabled: this.checkDisable('RegistrationDate'),
                      required:true,
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
                    // {
                    //   type: 'number',
                    //   key: 'HorsePower',
                    //   id: 'HorsePower',
                    //   defaultValue: '',
                    //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    //   props: {
                        
                    //     label: `Horse Power`,
                    //     disabled: this.checkDisable('HorsePower'),
                    //     required: true,
                    //     options: [
        
                    //     ],
        
                    //   },
                    //   validators: {
                    //     validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
                    //   },
                    //   hooks: {
                    //   },
                    //   expressions: {
                    //   },
                    // },
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
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}