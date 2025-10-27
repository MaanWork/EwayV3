import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class FarmCarePhoenix {
  customerDetails: any;
  commonDetails: any[] = [];
  endorsementSection: boolean = false;
  subuserType: any = null;
  enableFieldsList: any[] = [];
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

    this.fields = {
      fieldGroup: [
        {
          fieldGroupClassName: 'grid mb-3',
          fieldGroup: [
            {
              className: 'col-4 mt-2',
              key: 'coveragePeriod',
              type: 'ngselect',
              templateOptions: {
                label: 'Coverage Period',
                required: true,
                options: [
                  { label: 'Season 1', value: 'season1' },
                  { label: 'Season 2', value: 'season2' }
                ]
              }
            },
            {
              className: 'col-4 mt-2',
              key: 'optionToInsured',
              type: 'ngselect',
              templateOptions: {
                label: 'Option to Insured',
                required: true,
                options: [
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' }
                ]
              }
            },
            {
              className: 'col-4 mt-2',
              key: 'district',
              type: 'ngselect',
              templateOptions: {
                label: 'District',
                required: true,
                options: [
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' }
                ]
              }
            },
            {
              className: 'col-4',
              key: 'noOfAcres',
              type: 'input',
              templateOptions: {
                label: 'Land Details: No. of Acres',
                type: 'number',
                required: true
              }
            },
            {
              className: 'col-4',
              key: 'perAcreInput',
              type: 'input',
              templateOptions: {
                label: 'Per Acre Input',
                type: 'number',
                required: true
              }
            },
            {
              className: 'col-4',
              key: 'totalSumInsured',
              type: 'input',
              templateOptions: {
                label: 'Total Sum Insured',
                type: 'number',
                disabled: true
              },
              expressionProperties: {
                'model.totalSumInsured': (model: any) => {
                  const acres = Number(model.noOfAcres) || 0;
                  const input = Number(model.perAcreInput) || 0;
                  return acres * input;
                }
              }
            },
          ]
        },
      
      ]
    };
    
  }

  fields: FormlyFieldConfig;
  
  getFieldDetails() { 
    return this.fields; 
  }
  
  checkDisable(fieldName) {
    if (this.endorsementSection) {
      let entry = this.enableFieldsList.some(ele => ele == fieldName);
      return !entry;
    }
    else if (this.subuserType == 'low') return this.finalizeYN == 'Y';
    else return false;
  }
}