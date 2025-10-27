import { FormlyFieldConfig } from "@ngx-formly/core";

export class DeteriorationOfStockSwaziland{
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
        props: { label: 'Electronic Equipment' },
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
                                  label: `Deterioration Of Stock`,
                                  required: false,
              
                                },
                              },
                              {
                                type: 'input',
                                className:'formlymargin',
                                key: 'DeteriorationOfStockDesc',
              
                                templateOptions: {
                                  required: true,
                                  disabled: this.checkDisable('DeteriorationOfStockDesc'),
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
                                key: 'DeteriorationOfStock',
              
                                templateOptions: {
                                  disabled: this.checkDisable('DeteriorationOfStock'),
                                  maxLength:15,
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
                             
                            ]
                          },
                    ]
                  },
                  
                ]
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
        return !entry;
      }
      else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
      else return false;
    
    }
}