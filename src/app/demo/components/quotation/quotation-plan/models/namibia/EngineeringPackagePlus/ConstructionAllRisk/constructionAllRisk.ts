import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class ConstructionAllRiskEngineeringPhoenix{
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
      
        this.CARfields = {
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
              {
                key: 'CARPeriodOfActivity',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Construction Period in Months',
                  placeholder: '',
                  required: true,
                  options:[]
                },
              },
          ]
        }
        this.constructionCARfields = {
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    key: 'ConstructionType',
                    type: 'ngselect',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3 specialcss',
                    defaultValue :'',
                    props: {
                      label: 'Construction Type',
                      disabled: this.checkDisable('ConstructionType'),
                      placeholder: 'Select an option',
                      required: false,
                      options: [
          
                      ],
                    },
                  },
                 
                  {
                    key: 'BuildingSumInsureds',
                    type: 'commaSeparator',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3',
      
                    props: {
                      label: 'Building SumInsured',
                    
                      maxLength: 15,
                      disabled: this.checkDisable('SumInsured'),
                      placeholder: 'Enter amount',
                      required: false,
                    },
                  },
                ]
              }
            ]
            
        }
        this.additionalCARfields = {
            fieldGroupClassName: 'grid',
            fieldGroup: [
             
              
              {
                key: 'CAREstimated',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Estimated Construction Value',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              // {
              //   key: 'CARAnnualTurnover',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Annual Turnover',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
              // {
              //   key: 'CarMaximumContract',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Maximum Per Contract',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
             
            ]
        }
        this.extendsCARfields = {
            fieldGroupClassName: 'grid',
            fieldGroup: [
             
              // {
              //   key: 'CARTheft',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Theft restriction for electrical equipment and cables',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
              // {
              //   key: 'CARInland',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Inland transit to site',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
              // {
              //   key: 'CAROffSite',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Off-site storage and temporary storage',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
              {
                key: 'CAROpentrench',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Open trench warranty',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'CARFireBridge',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Fire brigade charges',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'CARDemolition',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Demolition and Removal of Debris Costs',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'CARProfessional',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Professional Fees',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'CAREscalation',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Escalation During the Contract Period',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'CARDevaluation',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Devaluation or Revaluation',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'CARClaimPreparation',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Claims Preparation Costs',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'CARSurrounding',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Surrounding Property Damage',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
            ]
          }
    }
  CARfields:FormlyFieldConfig;
  constructionCARfields:FormlyFieldConfig;
  additionalCARfields:FormlyFieldConfig;
  extendsCARfields:FormlyFieldConfig;
    getFieldDetails(){return this.CARfields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
      
}