import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class EngineeringErectionAllRiskPhoenix{
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
      
        this.EARfields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              key: 'EARAnnual',
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
              key: 'EARPrincipal',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Principal',
                placeholder: 'Enter Principal Owner',
                required: true,
              },
            },
            {
              key: 'EARDescription',
              type: 'primeTextArea',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Decription of Construction Project',
                placeholder: '',
                required: true,
              },
            },
            {
              key: 'EARLocationName',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Construction Site',
                placeholder: '',
                required: true,
              },
            },
          
            {
                key: 'EARStartDate',
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
                key: 'EARPeriodOfActivity',
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
        this.constructionEARfields = {
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    key: 'EARConstructionType',
                    type: 'ngselect',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3 specialcss',
                    defaultValue :'',
                    props: {
                      label: 'Construction Type',
                      disabled: this.checkDisable('EARConstructionType'),
                      placeholder: 'Select an option',
                      required: false,
                      options: [
          
                      ],
                    },
                  },
                 
                  {
                    key: 'EARBuildingSumInsureds',
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
        this.additionalEARfields = {
            fieldGroupClassName: 'grid',
            fieldGroup: [
             
              
              {
                key: 'EAREstimated',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Estimated Construction Value',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
             
             
            ]
        }
        this.extendsEARfields = {
            fieldGroupClassName: 'grid',
            fieldGroup: [
             
              // {
              //   key: 'EARTheft',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Theft restriction for electrical equipment and cables',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
              // {
              //   key: 'EARInland',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Inland transit to site',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
              // {
              //   key: 'EAROffSite',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Off-site storage and temporary storage',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
              // {
              //   key: 'EAROpentrench',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Open trench warranty',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
              // {
              //   key: 'EARFireBridge',
              //   type: 'commaSeparator',
              //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
              //   props: {
              //     label: 'Fire brigade charges',
              //     placeholder: 'Enter Sum Insured',
              //     required: true,
              //   },
              // },
              {
                key: 'EARDemolition',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Demolition and Removal of Debris Costs',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'EARProfessional',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Professional Fees',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'EAREscalation',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Escalation During the Contract Period',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'EARDevaluation',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Devaluation or Revaluation',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'EARClaimPreparation',
                type: 'commaSeparator',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Claims Preparation Costs',
                  placeholder: 'Enter Sum Insured',
                  required: true,
                },
              },
              {
                key: 'EARSurrounding',
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
  EARfields:FormlyFieldConfig;
  constructionEARfields:FormlyFieldConfig;
  additionalEARfields:FormlyFieldConfig;
  extendsEARfields:FormlyFieldConfig;
    getFieldDetails(){return this.EARfields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
      
}