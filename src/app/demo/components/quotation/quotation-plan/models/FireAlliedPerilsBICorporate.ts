import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";


export class FireAlliedPerilsBICorporate{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    enableAllSection: boolean = false;
    buildingSection: boolean = false;
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
        this.fields = [
            {
              fieldGroup: [
                {
                  fieldGroupClassName: 'grid mt-2',
                    fieldGroup: [
                      {
                        className: 'col-12 md:col-12 lg:col-12',
                        type: 'commaSeparator',
                        key: 'GrossProfitSI',
                        defaultValue: '0',
                        props: {
                          label: `Gross Profit [Incl. Standing & Wages] Sum Insured`,
                          required: true,
                          disabled: this.checkDisable('GrossProfitSI'),
                          maxLength: 15,
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
                        className: 'col-12',
                        type: 'commaSeparator',
                        key: 'AdditionalIncreaseSI',
                        defaultValue: '0',
                        props: {
                          label: `Additional Cost of Working ( AICOW) Sum Insured`,
                          required: true,
                          disabled: this.checkDisable('AdditionalIncreaseSI'),
                          maxLength: 15,
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
                        type: 'ngselect',
                        key: 'IndemnityPeriod',
                        id: 'IndemnityPeriod',
                        defaultValue: '',
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                        props: {
                          label: `Indemnity Period`,
                          disabled: this.checkDisable('IndemnityPeriod'),
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
                      }
                    ]
                }
              ]
            }
          ];
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          // let occupationEntry = this.enableFieldsList.some(ele => ele == 'OccupationType');
          // if (occupationEntry) {
          //     return false;
          // }
          // else{
            let entry = this.enableFieldsList.some(ele => ele == fieldName);
            return !entry;
          //}
          
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
    
}