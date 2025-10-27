import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import * as Mydatas from '../../../../../../../../app-config.json';
import { SharedService } from "@app/_services/shared.service";
import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
export class HouseHoldersPersonalNamibia {
  customerDetails: any;
  commonDetails: any[] = [];userDetails:any;insuranceId:any;
  endorsementSection: boolean = false; subuserType: any = null;
  enableFieldsList: any[] = []; finalizeYN: any = 'N';
  public AppConfig: any = (Mydatas as any).default;firstLossOptions:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;firstLossPayeeList:any[]=[];
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;firstLossSection: boolean;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  policyfields1: any;
  policyfields2: any;
  fieldGroup: any[];

  constructor() {
    this.fieldGroup = []
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    let finalize = sessionStorage.getItem('FinalizeYN');
    if (finalize) this.finalizeYN = finalize;
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

    // this.policyfields1 = {
    //   fieldGroup: [

    //     {
    //       key: 'AccidentalDamage',
    //       type: 'commaSeparator',
    //       props: {
    //         label: 'Accidental Damage',
    //         placeholder: 'Select an option',
    //         required: false,
    //         options: [

    //         ]
    //       },
    //       fieldGroup: [
    //         {
    //           key: 'AccidentalDamageDesc',
    //           type: 'textarea',
    //           props: {
    //             label: 'Revenue',
    //             placeholder: 'Enter Sum Insured',
    //             type: 'text',
    //             required: false
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       key: 'PowerSurge',
    //       type: 'commaSeparator',
    //       props: {
    //         label: 'Power Surge',
    //         placeholder: 'Select an option',
    //         required: false,
    //         options: [

    //         ]
    //       },
    //       fieldGroup: [
    //         {
    //           key: 'PowerSurgeDesc',
    //           type: 'textarea',
    //           props: {
    //             label: 'Revenue',
    //             placeholder: 'Enter Sum Insured',
    //             type: 'text',
    //             required: false
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       key: 'TheftCoverFromDomesticAndOutbuildings',
    //       type: 'commaSeparator',
    //       props: {
    //         label: 'Theft Cover From Domestic And Outbuildings',
    //         placeholder: 'Select an option',
    //         required: false,
    //         options: [

    //         ]
    //       },
    //       fieldGroup: [
    //         {
    //           key: 'TheftCoverFromDomesticAndOutbuildingsDesc',
    //           type: 'textarea',
    //           props: {
    //             label: 'Revenue',
    //             placeholder: 'Enter Sum Insured',
    //             type: 'text',
    //             required: false
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       key: 'MechanicalAndElectricalBreakdown',
    //       type: 'commaSeparator',
    //       props: {
    //         label: 'Mechanical And Electrical Breakdown',
    //         placeholder: 'Select an option',
    //         required: false,
    //         options: [

    //         ]
    //       },
    //       fieldGroup: [
    //         {
    //           key: 'MechanicalAndElectricalBreakdownDesc',
    //           type: 'textarea',
    //           props: {
    //             label: 'Revenue',
    //             placeholder: 'Enter Sum Insured',
    //             type: 'text',
    //             required: false
    //           }
    //         }
    //       ]
    //     },
     
    //   ]
    // }

    // this.policyfields2 = {
    //   fieldGroup: [
    //     {
    //       key: 'Contant',
    //       type: 'ngselect',
    //       props: {
    //         label: 'Contant Type',
    //         placeholder: 'Select an option',
    //         required: false,
    //         options: []
    //       },
    //       fieldGroup: [
    //         {
    //           key: 'SumInsured',
    //           type: 'commaSeparator',
    //           props: {
    //             label: 'Revenue',
    //             placeholder: 'Enter Sum Insured',
    //             type: 'number',
    //             required: false
    //           }
    //         },
    //         {
    //           key: 'Description',
    //           type: 'textarea',
    //           props: {
    //             label: 'Description',
    //             placeholder: 'Enter description',
    //             required: false
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // };
    
    // this.policyfields2 = {
    //   key: 'contents', 
    //   type: 'repeat', 
    //   isArray: true, 
    //   fieldArray: {
    //     fieldGroup: [
    //       {
    //         key: 'Contant',
    //         type: 'ngselect',
    //         props: {
    //           label: 'Content Type',
    //           placeholder: 'Select an option',
    //           required: false,
    //           options: []
    //         }
    //       },
    //       {
    //         key: 'SumInsured',
    //         type: 'commaSeparator',
    //         props: {
    //           label: 'Revenue',
    //           placeholder: 'Enter Sum Insured',
    //           type: 'number',
    //           required: false
    //         }
    //       },
    //       {
    //         key: 'Description',
    //         type: 'textarea',
    //         props: {
    //           label: 'Description',
    //           placeholder: 'Enter description',
    //           required: false
    //         }
    //       }
    //     ]
    //   }
    // };
    
 this.policyfields1 = 
          
            
              {
                props: { label: '' },
               
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
                                          label: `House Accidental Damage`,
                                          required: false,
                      
                                        },
                                      },
                                      {
                                        type: 'input',
                                        className:'formlymargin',
                                        key: 'HouseAccidentalDamageDesc',
                      
                                        templateOptions: {
                                          required: false,
                                          disabled: this.checkDisable('HouseAccidentalDamageDesc'),
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
                                        key: 'HouseAccidentalDamage',
                      
                                        templateOptions: {
                                          disabled: this.checkDisable('HouseAccidentalDamage'),
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
                                          label: `Power Surge`,
                                          required: false,
                      
                                        },
                                      },
                                      {
                                        type: 'input',
                                        key: 'PowerSurgeDesc',
                                        className:'formlymargin',
                                        templateOptions: {
                                          disabled: this.checkDisable('PowerSurgeDesc'),
                                          required: false,
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                          //disabled: (this.checkDisable('GoodsLossPercent') || this.model.GoodsSi =='' || this.model.GoodsSi =='0'),
                                        },
                                      },
                                      {
                                        className: "mt-3",
                                        type: 'commaSeparator',
                                        key: 'PowerSurge',
                      
                                        templateOptions: {
                                          maxLength:15,
                                          disabled: this.checkDisable('PowerSurge'),
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
                                          label: `Theft Cover From Domestic and OutBuildings`,
                                          required: false,
                      
                                        },
                                      },
                                      {
                                        type: 'input',
                                        className:'formlymargin',
                                        key: 'HolderTheftDesc',
                      
                                        templateOptions: {
                                          required: false,
                                          disabled: this.checkDisable('HolderTheftDesc'),
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
                                        key: 'HolderTheft',
                      
                                        templateOptions: {
                                          disabled: this.checkDisable('HolderTheft'),
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
                                          label: `Mechanical and Electrical Breakdown`,
                                          required: false,
                      
                                        },
                                      },
                                      {
                                        type: 'input',
                                        key: 'HolderBreakdownDesc',
                                        className:'formlymargin',
                                        templateOptions: {
                                          disabled: this.checkDisable('HolderBreakdownDesc'),
                                          required: false,
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                          //disabled: (this.checkDisable('GoodsLossPercent') || this.model.GoodsSi =='' || this.model.GoodsSi =='0'),
                                        },
                                      },
                                      {
                                        className: "mt-3",
                                        type: 'commaSeparator',
                                        key: 'HolderBreakdown',
                      
                                        templateOptions: {
                                          maxLength:15,
                                          disabled: this.checkDisable('HolderBreakdown'),
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
                    ]
                  }
                ]
              }
            
         
          
          
        

  }
  fields: FormlyFieldConfig;
  model = {
    contents: [{}],
  };
   options: FormlyFormOptions = {};
  getFieldDetails() { return this.fields; }
  checkDisable(fieldName) {
    if (this.endorsementSection) {
      let entry = this.enableFieldsList.some(ele => ele == fieldName);
      return !entry;
    }
    else if (this.subuserType == 'low') return this.finalizeYN == 'Y';
    else return false;

  }
  getPhoenixListItem(type,sectionType):any{
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": type
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    // this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    //   (data: any) => {
    //     let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
    //     let list = [];
    //     if(type=="BUSINESS_INTRUPTION" || type=="GOODS_IN_TRANSIT"  || type=='PUBLIC_LIABILITY'){ list = defaultObj.concat(data.Result);}
    //     if(type=="NASRIA_FIRE" || type=='Indemnity_Period' || type=='NO_CLAIMS_BONUS'){ list = defaultObj.concat(data.Result);}
    //     for (let i = 0; i < list.length; i++) {
    //       list[i].label = list[i]['CodeDesc'];
    //       list[i].value = list[i]['Code'];
    //       // delete this.roofMaterialList[i].CodeDesc;
    //       if (i == list.length - 1) {return list}
    //     }
    //   });
  }
}