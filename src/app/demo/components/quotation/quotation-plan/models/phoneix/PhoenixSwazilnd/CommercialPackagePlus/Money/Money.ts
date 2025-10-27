import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../../personal-quote-details/personal-quote-details.component";

export class MoneyCommercialSwaziland{
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
          props: { label: 'Money'},
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
                                    label: `Major Money Limit`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'MajorMoneyLimitDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('MajorMoneyLimitDesc'),
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
                                  key: 'MajorMoneyLimit',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('MajorMoneyLimit'),
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
                                    label: `Seasonal Increase`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'SeasonalIncreaseDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('SeasonalIncreaseDesc'),
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
                                  key: 'SeasonalIncrease',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('SeasonalIncrease'),
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
                                    label: `Receptacles in Excess of Policylimit`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'ReceptaclesinexcessofpolicylimitDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('ReceptaclesinexcessofpolicylimitDesc'),
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
                                  key: 'Receptaclesinexcessofpolicylimit',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('Receptaclesinexcessofpolicylimit'),
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
                                    label: `Clothing & Personal Effects of Employees`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'ClothingPersonalEffectsofEmployeesDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('ClothingPersonalEffectsofEmployeesDesc'),
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
                                  key: 'ClothingPersonalEffectsofEmployees',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('ClothingPersonalEffectsofEmployees'),
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
                                    label: `Locks & Keys of Receptacle(s)`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'LocksKeysofReceptacleDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('LocksKeysofReceptacleDesc'),
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
                                  key: 'LocksKeysofReceptacle',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('LocksKeysofReceptacle'),
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