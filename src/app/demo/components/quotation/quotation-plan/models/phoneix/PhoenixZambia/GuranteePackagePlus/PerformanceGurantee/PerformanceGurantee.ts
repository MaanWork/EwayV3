import { FormlyFieldConfig } from "@ngx-formly/core";

export class PerformanceGuranteePPPhoenix{
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
      
        this.BidTensionEngineerfields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
           
            {
              key: 'PGPrincipal',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Principal',
                placeholder: 'Enter Principal Owner',
                required: true,
              },
            },
            {
              key: 'PGDescription',
              type: 'primeTextArea',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Decription of Project',
                placeholder: '',
                required: true,
              },
            },
             
              {
                key: 'PGPeriodOfActivity',
                type: 'number',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Project Period',
                  placeholder: '',
                  required: true,
                  options:[]
                },
              },
            {
                key: 'PGStartDate',
                type: 'datepicker',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Project Date From',
                 
                  required: true,
                  options:[]
                },
              },
           
          ]
        }
        this.BidTensionAdditionalfields = {
            fieldGroupClassName: 'grid',
            fieldGroup: [
                 {
                            type: 'input',
                            className: ' col-12 lg:col-3 md:col-3 xl:col-3 paddingReduced',
                            key: 'PGProjectSite',
                            defaultValue: '0',
                            props: {
                              label: `Project Site`,
                              maxLength: 15,
                              disabled: this.checkDisable('ProjectSite'),
                              required:true,
                              placeholder:'Enter Project Site',
                              options: [
                              ],
                              lettersOnly: true,
                            },
                            
                            hooks: {
                            },
                            expressions: {
                            },
                          },
                          {
                            type: 'commaSeparator',
                            className: ' col-12 lg:col-3 md:col-3 xl:col-3 paddingReduced',
                            key: 'PGGrossProfitLc',
                            defaultValue: '0',
                            props: {
                              label: `Value Of Bond`,
                              maxLength: 15,
                              disabled: this.checkDisable('GrossProfitLc'),
                              required:true,
                              placeholder:'Enter Value Of Bond',
                              options: [
                              ],
              
                            },
                            
                            hooks: {
                            },
                            expressions: {
                            },
                          },
                          {
                            type: 'commaSeparator',
                            className: ' col-12 lg:col-3 md:col-3 xl:col-3 paddingReduced',
                            key: 'PGFirstLossPercentId',
                            defaultValue: '0',
                            props: {
                              label: `Percentage Guarantee Required %`,
                              maxLength: 15,
                              disabled: this.checkDisable('FirstLossPercentId'),
                              placeholder:'Enter Percentage Guarantee(%)',
                              options: [
                              ],
              
                            },
                            
                            hooks: {
                            },
                            expressions: {
                            },
                          },
                          {
                            type: 'commaSeparator',
                            className: ' col-12 lg:col-3 md:col-3 xl:col-3 paddingReduced',
                            key: 'PGBidTensionSumInsured',
                            defaultValue: '0',
                            props: {
                              label: `Percentage Guarantee Required N$`,
                              maxLength: 15,
                              disabled: this.checkDisable('BidTensionSumInsured'),
                              placeholder:'Enter Percentage Guarantee',
                              options: [
                              ],
              
                            },
                            
                            hooks: {
                            },
                            expressions: {
                            },
                          },
                          {
                            type: 'commaSeparator',
                            className: ' col-12 lg:col-3 md:col-3 xl:col-3 paddingReduced',
                            key: 'PGCollateralName',
                            defaultValue: '0',
                            props: {
                              label: `Collateral Value`,
                              maxLength: 15,
                              disabled: this.checkDisable('CollateralName'),
                              required:true,
                              placeholder:'Enter Collateral Value',
                              options: [
                              ],
              
                            },
                            
                            hooks: {
                            },
                            expressions: {
                            },
                          },
            ]
        }
        
       
    }
  BidTensionEngineerfields:FormlyFieldConfig;
  BidTensionAdditionalfields:FormlyFieldConfig;
    getFieldDetails(){return this.BidTensionEngineerfields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
      
}