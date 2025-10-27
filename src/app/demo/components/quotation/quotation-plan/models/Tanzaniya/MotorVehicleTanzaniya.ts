

import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";

export class MotorVehicleTanzaniya{
    customerDetails: any;userType:any=null;
    commonDetails: any[]=[];statusValue:any=null;
    endorsementSection: boolean=false;subuserType:any=null;userDetails:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';adminSection:boolean=false;
    constructor() {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.statusValue =  sessionStorage.getItem('QuoteStatus');
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      this.userType = this.userDetails?.Result?.UserType;
      if(quoteStatus) this.statusValue = quoteStatus;
      if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
        this.adminSection = true;
      }
      else{this.adminSection = false;}
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    props: {
                      label: `InsuranceType`,
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
                    key: 'InsuranceClass',
                    id:'InsuranceClass',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    props: {
                      label: `Insurance Class`,
                      disabled: this.checkDisable('InsuranceClass'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
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
                    key: 'MotorUsage',
                    id: 'MotorUsage',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    key: 'ClaimsYN',
                    id: 'Claims',
                    type: 'radioList',
                    templateOptions: {
                      type: 'radioList',
                      required: true,
                      disabled: this.checkDisable('ClaimsYN'),
                      name: 'ClaimsYN',
                    },
                    props: {
                      label: 'Claims',
                      options: [{ value: 'Y', label: 'Yes', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                    }
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    key: 'GpsYN',
                    id: 'GPS',
                    type: 'radioList',
                    templateOptions: {
                      type: 'radioList',
                      required: true,
                      disabled: this.checkDisable('ClaimsYN'),
                      name: 'GpsYN',
                      
                    },
                    props: {
                      label: 'GPS',
                      options: [{ value: 'Y', label: 'Yes', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                    }
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    type: 'commaSeparator',
                    key: 'AccessoriesSI',
                    id: 'AccessoriesSI',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `Accessories SumInured`,
                      maxLength: 15,
                      disabled: this.checkDisable('AccessoriesSI'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    type: 'commaSeparator',
                    key: 'WindShieldSI',
                    id: 'WindShieldSI',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `WindShield SumInured`,
                      maxLength: 15,
                      disabled: this.checkDisable('WindShieldSI'),
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
                    type: 'commaSeparator',
                    key: 'ExtendedTPPDSI',
                    id: 'ExtendedTPPDSI',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `Extended TPPD SumInsured`,
                      disabled: this.checkDisable('ExtendedTPPDSI'),
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
        console.log("Entry ", fieldName, entry)
        return !entry;
      }
      else if(this.subuserType=='low') return (this.finalizeYN=='Y' || ((this.statusValue == 'AdminRA') || (this.statusValue == 'RA') || ((this.finalizeYN == 'Y') && !this.adminSection))); 
      else return (((this.statusValue == 'AdminRA') || (this.statusValue == 'RA') || ((this.finalizeYN == 'Y') && !this.adminSection)))
      
    }
}