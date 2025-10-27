

import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";

export class MotorVehicleEagle{
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
                    type: 'ngselect',
                    key: 'InsuranceType',
                    id: 'InsuranceType',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4',
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
                  // {
                  //   type: 'ngselect',
                  //   key: 'BodyType',
                  //   defaultValue: '',
                  //   className: 'col-12 col-md-4 col-lg-4 col-xl-4',
                  //   props: {
                  //     label: `Body Type`,
                  //     disabled: this.checkDisable('BodyType'),
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
                  //   type: 'ngselect',
                  //   key: 'MotorUsage',
                  //   defaultValue: '',
                  //   className: 'col-12 col-md-4 col-lg-4 col-xl-4',
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4',
                    type: 'commaSeparator',
                    key: 'VehicleSI',
                    id: 'VehicleSI',
                    hide: true,
                    hideExpression:true,
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
                    type: 'ngselect',
                    key: 'PaCoverId',
                    id: 'PaCoverId',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4',
                    props: {
                      label: `Motor Passenger Injury`,
                      disabled: this.checkDisable('PaCoverId'),
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
                    key: 'AboutVehicle',
                    id: 'AboutVehicle',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4',
                    props: {
                      label: `About Vehicle`,
                      disabled: this.checkDisable('AboutVehicle'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4',
                    type: 'input',
                    id: 'NoOfPassengers',
                    key: 'NoOfPassengers',
                    templateOptions: {
                      label: `Number Of Passengers`,
                      placeholder: 'Number Of Passengers',
                      required: true,
                      disabled: this.checkDisable('NoOfPassengers'),
                      maxLength: 3
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-2 lg:col-2 xl:col-2',
                    type: 'input',
                    id: 'MaleCount',
                    key: 'MaleCount',
                    templateOptions: {
                      label: `MaleCount`,
                      placeholder: '',
                      required: true,
                      disabled: this.checkDisable('MaleCount'),
                      maxLength: 3
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-2 lg:col-2 xl:col-2',
                    type: 'input',
                    id: 'FemaleCount',
                    key: 'FemaleCount',
                    templateOptions: {
                      label: `FemaleCount`,
                      placeholder: '',
                      required: true,
                      disabled: this.checkDisable('FemaleCount'),
                      maxLength: 3
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
                      
                      name: 'RenewalYn',
                    },
                    props:{
                      label: 'Renewal',
                      disabled: this.checkDisable('RenewalYn'),
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
      let status = sessionStorage.getItem('QuoteStatus');
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType!='high') return (this.finalizeYN=='Y' || status=='RA'); 
        else return false;
      
    }
}