

import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";

export class MotorShotQuoteEagle{
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
            props: { label: 'Policy Details' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    type: 'radioList',
                    key: 'InsuranceType',
                    id: 'InsuranceType',
                    defaultValue: '',
                    className: 'lg:col-offset-3 xl:col-offset-3 md:col-offset-3 col-9 md:col-9 lg:col-9 xl:col-9',
                    props: {
                      label: `Insurance Type`,
                      disabled: this.checkDisable('InsuranceType'),
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
                    type: 'ngselect',
                    key: 'MotorUsage',
                    id: 'MotorUsage',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Motor Usage`,
                      disabled: this.checkDisable('MotorUsage'),
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
                    type: 'ngselect',
                    key: 'BodyType',
                    id: 'BodyType',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Body Type`,
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
                    type: 'ngselect',
                    key: 'Make',
                    id: 'Make',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Make`,
                      disabled: this.checkDisable('Make'),
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
                    type: 'ngselect',
                    key: 'Model',
                    id: 'Model',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Model`,
                      disabled: this.checkDisable('Model'),
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
                    type: 'input',
                    key: 'ModelDesc',
                    id: 'ModelDesc',
                    defaultValue: '',
                    hide: true,
                    hideExpression:true,
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Model Description`,
                      disabled: this.checkDisable('ModelDesc'),
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
                    type: 'ngselect',
                    key: 'ManufactureYear',
                    id: 'ManufactureYear',
                    defaultValue: '',
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    props: {
                      label: `Manufacture Year`,
                      disabled: this.checkDisable('ManufactureYear'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    type: 'commaSeparator',
                    id:'EngineCapacity',
                    key: 'EngineCapacity',
                    props: {
                      label: `Engine Capacity`,
                      maxLength: 6,
                      disabled: this.checkDisable('EngineCapacity'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6  pl-2 pr-2 pt-1',
                    type: 'ngselect',
                    id: 'FuelType',
                    key: 'FuelType',
                    templateOptions: {
                      label: `FuelType`,
                      placeholder: '-Select FuelType-',
                      required: true,
                      disabled: this.checkDisable('FuelType'),
                      maxLength: 50,
                      options:[]
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  // {
                  //   className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                  //   type: 'input',
                  //   key: 'ChassisNo',
                  //   props: {
                  //     label: `Chassis No`,
                  //     maxLength: 15,
                  //     disabled: this.checkDisable('ChassisNo'),
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
                  // {
                  //   type: 'ngselect',
                  //   key: 'InsuranceClass',
                  //   id: 'InsuranceClass',
                  //   defaultValue: '',
                  //   className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                  //   props: {
                  //     label: `Insurance Class`,
                  //     disabled: this.checkDisable('InsuranceClass'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6  pl-2 pr-2 pt-1',
                    type: 'number',
                    id:'LicenseNo',
                    key: 'LicenseNo',
                    props: {
                      label: `License No`,
                      maxLength: 10,
                      disabled: this.checkDisable('LicenseNo'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6  pl-2 pr-2 pt-1',
                    type: 'number',
                    id:'DrivingExperience',
                    key: 'DriverExperience',
                    props: {
                      label: `Driving Experience`,
                      maxLength: 3,
                      disabled: this.checkDisable('DriverExperience'),
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
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6  pl-2 pr-2 pt-1',
                    type: 'ngselect',
                    id: 'ClaimType',
                    key: 'ClaimType',
                    templateOptions: {
                      label: `ClaimType`,
                      placeholder: '-Select ClaimType-',
                      required: true,
                      disabled: this.checkDisable('ClaimType'),
                      maxLength: 50,
                      options:[]
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                    type: 'commaSeparator',
                    key: 'VehicleSI',
                    id: 'VehicleSI',
                    props: {
                      label: `VehicleSI`,
                      maxLength: 15,
                      disabled: this.checkDisable('VehicleSI'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4',
                    key: 'RenewalYn',
                    id: 'RenewalYn',
                    type: 'radioList',
                    templateOptions: {
                      type: 'radioList',
                      
                      required: true,
                      disabled: this.checkDisable('RenewalYn'),
                      name: 'RenewalYn',
                     
                    },
                    props:{
                      label: 'Renewal',
                      options: [{ value: 'Y', label: 'Yes',CodeDesc:'Yes','CodeDescLocal':'Sim' }, { value: 'N', label: 'No',CodeDesc:'No','CodeDescLocal':'Não' }],
                    }
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
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
    }
}