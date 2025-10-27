import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";


export class StockAddOn{
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
                          label: `Deterioration of Stocks in Cold Storage premises due to accidental power failure
                            consequent to damage at the premises of
                            Power Station due to an insured peril`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'StockAddOnSumInsured1',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('StockAddOnSumInsured1'),
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
                          label: `Deterioration of stocks in cold storage premises due to change in temperature arising
                                  out of loss or damage to the cold storage
                                  machinery(ies) in the Insured‟s premises due
                                  to operation of insured peril.`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'StockAddOnSumInsured2',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('StockAddOnSumInsured2'),
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
                          label: `Impact Damage due to Insured‟s own Rail/Road Vehicles, Fork lifts, Cranes,
                                  Stackers and the like and articles dropped therefrom.`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'StockAddOnSumInsured3',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('StockAddOnSumInsured3'),
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
                          label: `Spontaneous Combustion`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'StockAddOnSumInsured5',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('StockAddOnSumInsured5'),
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
                          label: `Spoilage Material Damage – in specified  Blocks`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'StockAddOnSumInsured6',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('StockAddOnSumInsured6'),
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
                          label: `Spoilage Material – Machinery, Container, Equipments in specified Blocks`,
                          required: true,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-3 lg:col-3',
                        type: 'commaSeparator',
                        key: 'StockAddOnSumInsured7',
                        defaultValue: '0',
                        props: {
                          required: true,
                          disabled: this.checkDisable('StockAddOnSumInsured7'),
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