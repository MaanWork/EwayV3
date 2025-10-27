import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";


export class FireAlliedPerilsCorporate{
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
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'commaSeparator',
                        key: 'AssetSumInsured',
                        defaultValue: '0',
                        props: {
                          label: `Asset SumInsured`,
                          required: true,
                          disabled: this.checkDisable('AssetSumInsured'),
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
                        className: 'col-12 md:col-6 lg:col-6',
                        type: 'commaSeparator',
                        key: 'OnstockSumInsured',
                        defaultValue: '0',
                        props: {
                          label: `OnStock SumInsured`,
                          required: true,
                          disabled: this.checkDisable('OnstockSumInsured'),
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
                        className: 'col-12 md:col-12 lg:col-12',
                        type: 'commaSeparator',
                        key: 'BuildingSumInsured',
                        defaultValue: '0',
                        props: {
                          label: `Building SumInsured`,
                          required: true,
                          disabled: this.checkDisable('BuildingSumInsured'),
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
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                        key: 'WallType',
                        id: 'WallType',
                        type: 'ngselect',
                        props: {
                          required: true,
                          disabled: this.checkDisable('WallType'),
                          name: 'WallType',
                          label: 'Wall Type',
                          options: [
                            
                          ],
                        }
                      },

                      {
                        type: 'ngselect',
                        key: 'RoofType',
                        id: 'RoofType',
                        defaultValue: '',
                        className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                        props: {
                          label: `Roof Type`,
                          disabled: this.checkDisable('RoofType'),
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