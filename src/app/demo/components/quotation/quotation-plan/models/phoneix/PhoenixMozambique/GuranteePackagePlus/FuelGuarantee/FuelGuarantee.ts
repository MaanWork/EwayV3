import { FormlyFieldConfig } from "@ngx-formly/core";

export class FuelGuaranteePPMozambique{
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
      
        this.FuelGuranteeEngineerfields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
           
            {
              key: 'FGPrincipal',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Principal',
                placeholder: 'Enter Principal Owner',
                required: true,
              },
            },
            {
              key: 'FGDescription',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Contact Person',
                placeholder: '',
                required: true,
              },
            },
          
            {
              key: 'FGPeriodOfActivity',
              type: 'number',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Project Period',
                placeholder: '',
                required: true,
              },
            },
            {
                key: 'FGStartDate',
                type: 'datepicker',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Guarantee Date From',
                 
                  required: true,
                  options:[]
                },
              },
            
             
          ]
        }
        this.FuelGuranteeAdditionalfields = {
            fieldGroupClassName: 'grid',
            fieldGroup: [
                  {
                            type: 'commaSeparator',
                            className: ' col-12 lg:col-3 md:col-3 xl:col-3 paddingReduced',
                            key: 'FGSumInsured',
                            defaultValue: '0',
                            props: {
                              label: `Value of the Guarantee`,
                              maxLength: 15,
                              disabled: this.checkDisable('FGSumInsured'),
                              placeholder:'Enter Sum Insured',
                              required:true,
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
                            key: 'FGCollateral',
                            defaultValue: '0',
                            props: {
                              label: `Collateral Value`,
                              maxLength: 15,
                              disabled: this.checkDisable('CollateralName'),
                              required:true,
                              placeholder:'Enter Sum Insured',
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
  FuelGuranteeEngineerfields:FormlyFieldConfig;
  FuelGuranteeAdditionalfields:FormlyFieldConfig;
    getFieldDetails(){return this.FuelGuranteeEngineerfields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
      
}