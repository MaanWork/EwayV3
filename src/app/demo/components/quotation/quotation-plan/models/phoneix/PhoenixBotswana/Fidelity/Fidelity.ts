import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class FidelityBotswana{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  policyfields1: any;
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
        this.policyfields1 =
        {
          props: { label: '' },
    
          fieldGroup: [
            {
              key: 'employers',
              type: 'repeat',
    
              templateOptions: {
                addText: 'Add Patient',
              },
              fieldArray: {
                fieldGroup: [
                  {
                    fieldGroupClassName: 'grid mt-2',
                    fieldGroup: [
                      {
                        type: 'commaSeparator',
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6',
                        //col-sm-12 col-md-6 col-lg-4',
                        key: 'AdditionalClaimsPreparationCosts',
    
                        props: {
                          label: `Additional Claims Preparation Costs`,
                          maxLength: 15,
                          disabled: this.checkDisable('NoEmpAdditionalClaimsPreparationCostsloyees'),
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
                        type: 'commaSeparator',
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6',
    
                        key: 'LimitOfIndemnity',
    
                        props: {
                          label: `Limit Of Indemnity`,
                          maxLength: 15,
                          disabled: this.checkDisable('LimitOfIndemnity'),
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
    
                    ]
                  }
                ],
              },
            },
          ]
        }
        // this.fields = {
        //   props: { label: 'Fidelity'},
        //   fieldGroup: [
        //     {
        //       fieldGroupClassName: 'grid',
        //       fieldGroup: [
        //         {
        //           className: 'col-12 md:col-4 lg:col-4 p-2',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: 'Limit of Indeminity',
        //             required: true,

        //           },
        //         },
        //         {
        //           type: 'commaSeparator',
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           key: 'LimitofIndeminity',
        //           defaultValue: '0',
        //           templateOptions: {
        //             label: '',
        //             maxLength: 15,
        //             disabled: this.checkDisable('LimitofIndeminity'),
        //             required:true,
        //             options: [
        //             ],
    
        //           },
        //           validators: {
        //             validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //           },
        //           hooks: {
        //           },
        //           expressions: {
        //           },
        //         },
        //         {
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: '',
        //             required: false,

        //           },
        //         },
        //         {
        //           className: 'col-12 md:col-4 lg:col-4 p-2',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: 'Additional Claims Preparation Costs',
        //             required: true,

        //           },
        //         },
        //         {
        //           type: 'commaSeparator',
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           key: 'FidelityClaimsPreparationCost',
        //           defaultValue: '0',
        //           templateOptions: {
        //             label: '',
        //             maxLength: 15,
        //             disabled: this.checkDisable('FidelityClaimsPreparationCost'),
        //             required:true,
        //             options: [
        //             ],
    
        //           },
        //           validators: {
        //             validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //           },
        //           hooks: {
        //           },
        //           expressions: {
        //           },
        //         },
        //         {
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: '',
        //             required: false,

        //           },
        //         },
               
               
               
        //       ]
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