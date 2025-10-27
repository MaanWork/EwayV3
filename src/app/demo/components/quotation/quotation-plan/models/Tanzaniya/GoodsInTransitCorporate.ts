import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class GoodsInTransitCorporate {
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
        this.fields = [
          {
              fieldGroup: [
                {
                  fieldGroupClassName: 'grid',
                  fieldGroup: [
                    {
                      type: 'ngselect',
                      key: 'GoodsCategoryId',
                      id: 'GoodsCategoryId',
                      defaultValue: '',
                      className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                      props: {
                        label: `Goods Package`,
                        disabled: this.checkDisable('GoodsCategoryId'),
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
                    },
                    {
                      type: 'ngselect',
                      key: 'GoodsBuildingUsage',
                      id: 'GoodsBuildingUsage',
                      defaultValue: '',
                      className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                      props: {
                        label: `Cover Type`,
                        disabled: this.checkDisable('GoodsBuildingUsage'),
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
                    },
                    {
                      type: 'ngselect',
                      key: 'GoodsOccupationType',
                      id: 'GoodsOccupationType',
                      defaultValue: '',
                      className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                      props: {
                        label: `Commodity`,
                        disabled: this.checkDisable('GoodsOccupationType'),
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
                    },
                    {
                      type: 'commaSeparator',
                      key: 'GoodsSi',
                      id: 'GoodsSi',
                      defaultValue: '',
                      className: 'col-12 md:col-6 lg:col-6 py-0',
                      props: {
                        label: `Sum Insured`,
                        disabled: this.checkDisable('GoodsSi'),
                        required: true,
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(15), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                      type: 'input',
                      key: 'GoodsLimit',
                      id: 'GoodsLimit',
                      defaultValue: '',
                      className: 'col-12 md:col-6 lg:col-6',
                      props: {
                        label: `Limit Per Trip`,
                        disabled: this.checkDisable('GoodsLimit'),
                        required: true,
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                   
                  ]
                }
              ],
          },
        ];
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}