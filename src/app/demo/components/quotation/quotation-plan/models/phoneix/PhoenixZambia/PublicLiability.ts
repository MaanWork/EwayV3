import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";

export class PublicLiabilityPhoenix{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  policyfields:FormlyFieldConfig;
  policyfields1 :FormlyFieldConfig;
  extendsfields:FormlyFieldConfig
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
              key: 'GeneralLiability',
              type: 'ngselect',
              className: 'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'General Liability',
                placeholder: '--select--',
                required: true,
                type: 'text',   
                maxLength: 15,
                options:[]
              },
              validators: {
                //validation: ['numeric'],  
              },
            },
            {
              key: 'LegalDefenceCosts',
              type: 'ngselect',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Legal Defence Cost',
                placeholder: '--Select--',
                required: true,
                options:[]
              },
            },
            {
              key: 'WrongfulArrestandDefamation',
              type: 'ngselect',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Wrongful Arrest and Defamation',
                placeholder: '--select--',
                required: true,
                options:[]
              },
            },
          ]
        },
        this.policyfields1 = {
          fieldGroup: [
            {
              key: 'ProductsLiability',
              type: 'ngselect',
              props: {
                label: 'Product Liability',
                placeholder: 'Select an option',
                required: false,
                options: [
                  
                ]
              },
              fieldGroup: [
                {
                  key: 'SumInsuredEnd',
                  type: 'commaSeparator',
                  props: {
                    label: 'Revenue',
                    placeholder: 'Enter Sum Insured',
                    type: 'number',
                    required: true
                  }
                }
              ]
            },
            {
              key: 'DefectiveWorkmanship',
              type: 'ngselect',
              props: {
                label: 'Defective Workmanship',
                placeholder: 'Select an option',
                required: false,
                options: [
                  
                ]
              },
              fieldGroup: [
                {
                  key: 'SumInsuredEnd',
                  type: 'commaSeparator',
                  props: {
                    label: 'Revenue',
                    placeholder: 'Enter Sum Insured',
                    type: 'number',
                    required: true
                  }
                }
              ]
            },
          ]
        },
        this.extendsfields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              key: 'SpreadofFire',
              type: 'commaSeparator',
              className: 'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Spread of Fire',
                placeholder: 'Enter Sum Insured',
                required: true,
                //type: 'text',   
                maxLength: 15, 
              },
              validators: {
                //validation: ['numeric'],  
              },
            }
            ,
            {
              key: 'FoodandDrink',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Food and Drink',
                placeholder: 'Enter Sum Insured',
                required: true,
              },
            },
            {
              key: 'ForecourtServiceStationExtension\t',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Forecourt Service Station Extension',
                placeholder: 'Enter Sum Insured',
                required: true,
              },
            },
            {
              key: 'CarWashandValetExtension',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Car Wash and Valet Extension',
                placeholder: 'Enter Sum Insured',
                required: true,
              },
            },
            {
              key: 'AdditionalclaimsPreparationCosts',
              type: 'ngselect',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Claim Preparation Cost',
                placeholder: '--select--',
                required: true,
                options:[]
              },
            },
          ]
        }
       
        // this.fields = {
        //   props: { label: 'Burglary'},
        //   fieldGroup: [
        //     {
        //       fieldGroupClassName: 'grid',
        //         fieldGroup: [
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'General Liability',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'ngselect',
        //             className: 'col-12 lg:col-4 md:col-4 xl:col-4',
        //             key: 'GeneralLiability',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: '',
        //               maxLength: 15,
        //               disabled: this.checkDisable('GeneralLiability'),
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Legal Defence Cost',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'ngselect',
        //             className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //             key: 'LegalDefenceCost',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('LegalDefenceCost'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },


        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Wrongful Arrest and Defamation',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'ngselect',
        //             className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //             key: 'WrongfulArrestandDefamation',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('WrongfulArrestandDefamation'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },


                  
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Product Liability',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'commaSeparator',
        //             className: ' col-12 lg:col-2 md:col-2 xl:col-2',
        //             key: 'ProductLiabilitySI',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('ProductLiabilitySI'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             type: 'ngselect',
        //             className: ' col-12 lg:col-2 md:col-2 xl:col-2',
        //             key: 'ProductLiabilityDesc',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('ProductLiabilityDesc'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },




        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Defective Workmanship',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'commaSeparator',
        //             className: ' col-12 lg:col-2 md:col-2 xl:col-2',
        //             key: 'DefectiveWorkmanship',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('DefectiveWorkmanship'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             type: 'ngselect',
        //             className: ' col-12 lg:col-2 md:col-2 xl:col-2',
        //             key: 'DefectiveWorkmanshipDesc',
        //             //defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('DefectiveWorkmanshipDesc'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },


        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Extensions',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 xl:col-4 pl-2 pr-2 pt-1',
        //             key: 'Extensions',
        //             type: 'radioList',
        //             // hide: false,
        //             // hideExpression:false,
        //             templateOptions: {
        //               type: 'radioList',
        //               // required: true,
        //               disabled: this.checkDisable('Extensions'),
        //              // name: 'Extensions',
        //             },
        //             props: {
        //               // label: 'Extensions',
        //               options: [{ value: 'Y', label: 'Yes', 'CodeDesc':'Yes', 'CodeDescLocal':'Yes' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'No' }],
        //             }
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 xl:col-4  p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
        //             },
        //           },


        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Spread of Fire',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'commaSeparator',
        //             className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //             key: 'SpreadofFire',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('SpreadofFire'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },


        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Food and Drint',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'commaSeparator',
        //             className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //             key: 'FoodandDrint',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('FoodandDrint'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },


        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Forecourt Service Station Extension',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'commaSeparator',
        //             className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //             key: 'ForecourtServiceStationExtension',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('ForecourtServiceStationExtension'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },

        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Car Wash and Valet Extension',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'commaSeparator',
        //             className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //             key: 'CarWashandValetExtension',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('CarWashandValetExtension'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },

        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: 'Claim Preparation Cost',
        //               required: true,
  
        //             },
        //           },
        //           {
        //             type: 'commaSeparator',
        //             className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //             key: 'ClaimPreparationCost',
        //             defaultValue: '0',
        //             templateOptions: {
        //               label: ``,
        //               maxLength: 15,
        //               disabled: this.checkDisable('ClaimPreparationCost'),
        //              // required:true,
        //               options: [
        //               ],
      
        //             },
        //             validators: {
        //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //             },
        //             hooks: {
        //             },
        //             expressions: {
        //             },
        //           },
        //           {
        //             className: 'col-12 md:col-4 lg:col-4 p-2',
        //             type: 'displays',
        //             templateOptions: {
        //               label: ''
  
        //             },
        //           },
        //         ]
        //     }
        //   ]
        // }
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