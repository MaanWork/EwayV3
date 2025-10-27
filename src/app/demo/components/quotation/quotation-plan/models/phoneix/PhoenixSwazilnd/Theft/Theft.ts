import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class TheftSwaziland{
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
          props: { label: 'Theft'},
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
                                    label: `Locks and Keys`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'LocksandKeysDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('LocksandKeysDesc'),
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
                                  key: 'LocksandKeys',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('LocksandKeys'),
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
                                    label: `Loss/Damage to Personal Effects`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'LossDamagetoPersonalEffectsDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('LossDamagetoPersonalEffectsDesc'),
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
                                  key: 'LossDamagetoPersonalEffects',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('LossDamagetoPersonalEffects'),
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
                                    label: `Fuel in Aboveground tanks`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'FuelinAbovegroundtanksDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('FuelinAbovegroundtanksDesc'),
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
                                  key: 'FuelinAbovegroundtanks',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('FuelinAbovegroundtanks'),
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
                                    label: `Fuel in Underground tanks`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'FuelinUndergroundtanksDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('FuelinUndergroundtanksDesc'),
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
                                  key: 'FuelinUndergroundtanks',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('FuelinUndergroundtanks'),
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
                                    label: `First Loss Limit`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'FirstLossLimitDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('FirstLossLimitDesc'),
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
                                  key: 'FirstLossLimit',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('FirstLossLimit'),
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
                                    label: `Vehicles in the Open`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'VehiclesintheOpenDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('VehiclesintheOpenDesc'),
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
                                  key: 'VehiclesintheOpen',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('VehiclesintheOpen'),
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
                                    label: `Damage to Buildings caused by Thieves`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'input',
                                  className:'formlymargin',
                                  key: 'DamagetoBuildingscausedbyThievesDesc',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('DamagetoBuildingscausedbyThievesDesc'),
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
                                  key: 'DamagetoBuildingscausedbyThieves',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('DamagetoBuildingscausedbyThieves'),
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
                                  key: 'TheftAdditionalClaimsPreparationCosts',
                
                                  templateOptions: {
                                    required: false,
                                    disabled: this.checkDisable('TheftAdditionalClaimsPreparationCosts'),
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