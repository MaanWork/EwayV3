import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class BusinessInterruption{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
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
        this.fields = {
          props: { label: 'Business Interruption' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row mt-2',
              fieldGroup: [
                {
                  className: 'col-12',
                  type: 'tables',
                  fieldGroup: [
                    {
                        fieldGroup:[
                          {props:{label:`Items to be Insured`}},
                          {props:{label:`Sum Insured`}},
                        ]
                    },
                    {
                      fieldGroup:[
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `Gross Profit including standing charges & wages`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'GrossProfitSi',
                                    props: {
                                    label: `  `,
                                    disabled: this.checkDisable('SumInsured'),
                                    maxLength: 15
                                  },
                                  templateOptions: {
                                    
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.PowerPlantSIYN'
                                  },
                                }
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `Indemnity period - 6 Months `,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'IndemnityPeriodSi',
                                    props: {
                                    label: `  `,
                                    disabled: this.checkDisable('SumInsured'),
                                    maxLength: 15
                                  },
                                  templateOptions: {
                                    
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.PowerPlantSIYN'
                                  },
                                }
                              ]
                            },
                           
                      ]
                    }
                  ]
                },
              ]
            },
           
          ],
        }
    }
    fields:FormlyFieldConfig;
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}