import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";


export class FidelityCorporate{
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
                  fieldGroupClassName: 'grid',
                  fieldGroup: [
                    {
                      className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                      type: 'ngselect',
                      key: 'OccupationId',
                      id: 'OccupationId',
                      templateOptions: {
                        label: 'Nature Of Loss',
                        disabled: this.checkDisable('OccupationId'),
                        required: true,
                        options:[]
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
                      },
                    },
                    {
                      className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                      type: 'input',
                      key: 'FidEmpCount',
                      id: 'FidEmpCount',
                      templateOptions: {
                        label: 'No.Of Employees',
                        disabled: this.checkDisable('FidEmpCount'),
                        required: true,
                        options:[]
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
                      },
                    },
                    {
                      type: 'ngselect',
                      className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                      key: 'FidEmpSi',
                      id:'FidEmpSi',
                      defaultValue: '0',
                      templateOptions: {
                        label: `Sum Insured`,
                        disabled: this.checkDisable('FidEmpSi'),
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