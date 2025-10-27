import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class ThirdPartyLiabilityEngineeringNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
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
          props: { label: 'ThirdPartyLiability'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-12 lg:col-12 xl:col-12',
                  type: 'table',
                  fieldGroup: [
                    {
                        fieldGroup:[
                          {props:{label:`Coverage`}},
                          {props:{label:`Description`},className:"col-2"},
                          {props:{label:`Sum Insured`}},
                        ]
                    },
                    {
                      fieldGroup:[
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Liability`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'ngselect',
                                  className:'formlymargin no-top',
                                  key: 'ThirdPartyLiabilityDesc',
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('ThirdPartyLiabilityDesc'),
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                    //disabled: (this.checkDisable('StockLossPercent') || this.model.StockInTradeSi =='' || this.model.StockInTradeSi =='0'),
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'commaSeparator',
                                  key: 'ThirdPartyLiability',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('ThirdPartyLiability'),
                                    maxLength:15,
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
                               
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Spread Of Fire`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'SpreadoffireDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('SpreadoffireDesc'),
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                    //disabled: (this.checkDisable('StockLossPercent') || this.model.StockInTradeSi =='' || this.model.StockInTradeSi =='0'),
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'commaSeparator',
                                  key: 'Spreadoffire',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('Spreadoffire'),
                                    maxLength:15,
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
                               
                              ]
                            },
                           
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Claim Preparation Costs`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: '',  
                                  className: 'formly-col description-col'
                                },
                                {
                                  type: 'ngselect',
                                  className:'formlymargin no-top table-drop-padding rightAlign',
                                  key: 'TPLClaimPreparationCosts',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('TPLClaimPreparationCosts'),
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                    //disabled: (this.checkDisable('StockLossPercent') || this.model.StockInTradeSi =='' || this.model.StockInTradeSi =='0'),
                                  },
                                },
                               
                               
                              ]
                            },
                          
                      ]
                    },
                    
                  ]
                }
              ],
              
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