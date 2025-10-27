import { FormlyFieldConfig } from "@ngx-formly/core";
export class ConstructionAllRiskUptoTanzaniya{
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
        this.CARuptofields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              key: 'CARAnnual',
              type: 'radioList',
              className: 'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Annual Open Construction All Risks',
                placeholder: '',
                required: true,
                options: [
                    {
                        value: 'Yes',
                        label: 'Yes'
                    },
                    {
                        value: 'No',
                        label: 'No'
                    }
                  ],
                //type: 'text',   
                maxLength: 15, 
              },
              validators: {
                //validation: ['numeric'],  
              },
            }
            ,
            {
              key: 'CARPrincipal',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Principal',
                placeholder: 'Enter Principal Owner',
                required: true,
              },
            },
            {
              key: 'CARDescription',
              type: 'primeTextArea',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Decription of Construction Project',
                placeholder: '',
                required: true,
              },
            },
            {
              key: 'CARLocationName',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Construction Site',
                placeholder: '',
                required: true,
              },
            },
            {
                key: 'CARStartDate',
                type: 'datepicker',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Construction Date From',
                  required: true,
                  options:[]
                },
              },
              // {
              //   key: 'AdditionalclaimsPreparationCosts',
              //   type: 'datepicker',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Construction Date To',
              //     required: true,
              //     options:[]
              //   },
              // },
              // {
              //   key: 'CARPeriodOfActivity',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Construction Period in Months',
              //     placeholder: '',
              //     required: true,
              //     options:[]
              //   },
              // },
          ]
        }
        this.constructionCARuptofields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              key: 'CARuptoConstruction',
              type: 'ngselect',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Construction Type',
                options:[],
                required: true,
              },
            },
            {
              key: 'CARuptoStoreys',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'No of Storeys',
                placeholder: 'Enter No of Storeys',
                required: true,
                maxLength:2
              },
            },
            {
              key: 'CARuptoMonths',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Construction No Of Months',
                placeholder: 'Enter No Of Months',
                required: true,
                maxLength:3
              },
            },
            {
              key: 'CARuptoSumInsured',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Sum Insured',
                placeholder: 'Enter Sum Insured',
                required: true,
                maxLength:15
              },
            },
             {
                  key: 'EARMaintenance',
                  type: 'input',
                  className: 'col-12 md:col-6 lg:col-4 xl:col-3',
                  props: {
                    type: 'text',
                    label: 'Maintenance Period',
                    placeholder: 'Enter Period',
                    required: true,
                    maxLength: 3,
                    attributes: {
                      onkeypress: 'return event.charCode >= 48 && event.charCode <= 57'
                    }
                  },
                  validation: {
                    messages: {
                      pattern: () => `Only numbers (max 3 digits) allowed`
                    }
                  }
                  }
          ]
        }
    }
    CARuptofields:FormlyFieldConfig;
    constructionCARuptofields:FormlyFieldConfig;
    getFieldDetails(){return this.CARuptofields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      }
}