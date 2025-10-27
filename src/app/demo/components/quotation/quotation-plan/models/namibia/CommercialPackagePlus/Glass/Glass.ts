import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class GlassCommercialNamibia{
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
          props: { label: 'Glass'},
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
                                    label: `Special Reinstatement`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'SpecialReinstatementDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('SpecialReinstatementDesc'),
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
                                  key: 'SpecialReinstatement',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('SpecialReinstatement'),
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
                                    label: `Internal Glass`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'InternalGlassDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('InternalGlassDesc'),
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
                                  key: 'InternalGlass',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('InternalGlass'),
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
                                    label: `External Glass`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'ExternalGlassDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('ExternalGlassDesc'),
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
                                  key: 'ExternalGlass',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('ExternalGlass'),
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
                                    label: `Additional Claims Preparation Costs`,
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
                                  key: 'GlassClaimsPreparationCosts',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('GlassClaimsPreparationCosts'),
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