import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";


export class FireAddOn{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    enableAllSection: boolean = false;
    buildingSection: boolean = false;
    subuserType: any=null;
    finalizeYN: any='N';
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
        this.fields = [
            {
              fieldGroup: [
                {
                  fieldGroupClassName: 'grid mt-2 ',
                    fieldGroup: [
                      {
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: ``,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Sum Insured`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Architects, Surveyors and Consulting Engineers Fees`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured1',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured1'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Removal of Debris`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured2',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured2'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Forest Fire`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured3',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured3'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Impact Damage due to Insured‟s own 10% of Policy Rate Policy Sum insured Rail/Road
                           Vehicles, Fork lifts, Cranes, Stackers and the like and articles dropped therefrom`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured4',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured4'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Loss Of Rent clause`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured5',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured5'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Leakage – Water Tank in the Premises`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured6',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured6'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Leakage & Contamination Cover  In the Premises`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured7',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured7'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Leakage – Water Tank in other Premises`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured8',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured8'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Leakage & Contamination Cover In other Premises`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured9',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured9'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Insurance Of Additional Expenses of Rent For An Alternative Accommodation`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured10',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured10'),
                          maxLength: 15,
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
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displayFire',
                
                        templateOptions: {
                          label: `Omission to Insure additions, alteration or ofextensions`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'FireAddOnSumInsured11',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('FireAddOnSumInsured11'),
                          maxLength: 15,
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




                    ]
                }
              ]
            }
          ];
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          // let occupationEntry = this.enableFieldsList.some(ele => ele == 'OccupationType');
          // if (occupationEntry) {
          //     return false;
          // }
          // else{
            let entry = this.enableFieldsList.some(ele => ele == fieldName);
            return !entry;
          //}
          
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
    
}