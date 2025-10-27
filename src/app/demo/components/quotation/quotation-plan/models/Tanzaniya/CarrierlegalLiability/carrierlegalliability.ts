import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";


export class CarrierLegalLiability {
  customerDetails: any;
  commonDetails: any[] = [];
  endorsementSection: boolean = false;
  enableFieldsList: any[] = [];
  enableAllSection: boolean = false;
  buildingSection: boolean = false;
  subuserType: any = null;
  finalizeYN: any = 'N';
  constructor() {
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
    this.fields = [
      {
        fieldGroup: [
          {
            fieldGroupClassName: 'grid',
            fieldGroup: [
              {
                type: 'primeTextArea',
                key: 'CommodityDesc',
                defaultValue: '',
                className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                props: {
                  maxLength: 1000,
                  label: `Commodity Description`,
                  
                },
                templateOptions: {
                  required: true,
                   minLength: 1,
                   maxLength: 1000
                },
                
                hooks: {
                },
                expressions: {
                },
              },
              {
                type: 'primeTextArea',
                key: 'TerritorialLimits',
                defaultValue: '',
                className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                props: {
                  maxLength: 1000,
                  label: `Territorial Limits`,

                 
                },
                templateOptions: {
                  //disabled: this.checkDisable('BuildingSuminsured')
                  required: true,
                   minLength: 1,
                   maxLength: 1000
                },
                
                hooks: {
                },
                expressions: {
                },
              },

              {
                type: 'commaSeparator',
                className: 'col-12 lg:col-6 md:col-6 xl:col-6 input-fixed-height',
                key: 'LiablitySumInsured',
                defaultValue: '0',
                props: {
                  label: `Limit of Liablity`,
                  disabled: this.checkDisable('SumInsured'),
                  maxLength: 15,
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
                className: 'col-12 lg:col-6 md:col-6 xl:col-6 input-fixed-height',
                key: 'IndeminitySumInsured',
                defaultValue: '0',
                props: {
                  label: `Limit of Indeminity`,
                  disabled: this.checkDisable('SumInsured'),
                  maxLength: 15,
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
            ]
          }
        ]
      }
    ];
  }
  fields: FormlyFieldConfig[] = [];
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
    else if (this.subuserType == 'low') return this.finalizeYN == 'Y';
    else return false;

  }

}