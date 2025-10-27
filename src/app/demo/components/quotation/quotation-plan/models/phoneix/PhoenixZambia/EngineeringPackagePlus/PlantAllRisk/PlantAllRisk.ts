import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class PlantAllRiskEngineeringPhoenix{
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
        // this.fields = {
        //   props: { label: 'Plant All Risk'},
        //   fieldGroup: [
        //     {
        //       fieldGroupClassName: 'grid',
        //       fieldGroup: [
        //         {
        //           className: 'col-12 md:col-4 lg:col-4 p-2',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: 'Building Cover',
        //             required: true,

        //           },
        //         },
        //         {
        //           type: 'commaSeparator',
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           key: 'BuildingCover',
        //           defaultValue: '0',
        //           templateOptions: {
        //             label: '',
        //             maxLength: 15,
        //             disabled: this.checkDisable('BuildingCover'),
        //             required:true,
        //             options: [
        //             ],
    
        //           },
        //           validators: {
        //             validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //           },
        //           hooks: {
        //           },
        //           expressions: {
        //           },
        //         },
        //         {
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: '',
        //             required: false,

        //           },
        //         },
        //         {
        //           className: 'col-12 md:col-4 lg:col-4 p-2',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: 'Continuing hire charges',
        //             required: true,

        //           },
        //         },
        //         {
        //           type: 'commaSeparator',
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           key: 'Continuinghirecharges',
        //           defaultValue: '0',
        //           templateOptions: {
        //             label: '',
        //             maxLength: 15,
        //             disabled: this.checkDisable('Continuinghirecharges'),
        //             required:true,
        //             options: [
        //             ],
    
        //           },
        //           validators: {
        //             validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //           },
        //           hooks: {
        //           },
        //           expressions: {
        //           },
        //         },
        //         {
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: '',
        //             required: false,

        //           },
        //         },
        //         {
        //           className: 'col-12 md:col-4 lg:col-4 p-2',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: 'Temporary hire charges',
        //             required: true,

        //           },
        //         },
        //         {
        //           type: 'commaSeparator',
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           key: 'Temporaryhire',
        //           defaultValue: '0',
        //           templateOptions: {
        //             label: '',
        //             maxLength: 15,
        //             disabled: this.checkDisable('Temporaryhire'),
        //             required:true,
        //             options: [
        //             ],
    
        //           },
        //           validators: {
        //             validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
        //           },
        //           hooks: {
        //           },
        //           expressions: {
        //           },
        //         },
        //         {
        //           className: ' col-12 lg:col-4 md:col-4 xl:col-4',
        //           type: 'displays',
          
        //           templateOptions: {
        //             label: '',
        //             required: false,

        //           },
        //         },
              
        //       ]
        //     }
        //   ]
        // }
        this.fields={
                    props: { label: 'Plant All Risk' },
                    fieldGroup: [
                      {
                        fieldGroupClassName: 'grid mx-0',
                        fieldGroup: [
                             {
                                key: 'PlantConstructionType',
                                type: 'ngselect',
                                className: 'col-12 md:col-6 sm:col-12 lg:col-3 xl:col-3 specialcss',
                                defaultValue :'',
                                props: {
                                  label: 'Construction Type',
                                  disabled: this.checkDisable('PlantConstructionType'),
                                  placeholder: 'Select an option',
                                  required: false,
                                  options: [
          
                                  ],
                                },
                          },
                          {
                            className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                            type: 'commaSeparator',
                            key: 'BuildingCover',
                            props: {
                              label: `Building Cover`,
                              maxLength: 15,
                              disabled: this.checkDisable('BuildingCover'),
                              required: true,
                              options: [],
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            },
                            hooks: {},
                            expressions: {},
                          },
                          {
                            className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                            type: 'commaSeparator',
                            key: 'Continuinghirecharges',
                            props: {
                              label: `Continuing hire charges`,
                              maxLength: 200,
                              disabled: this.checkDisable('Continuinghirecharges'),
                              required: true,
                              options: [],
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                            },
                            hooks: {},
                            expressions: {},
                          },
                            {
                            className: 'col-12 lg:col-3 md:col-3 xl:col-3',
                            type: 'commaSeparator',
                            key: 'Temporaryhire',
                            props: {
                              label: `Temporary hire charges`,
                              maxLength: 200,
                              disabled: this.checkDisable('Temporaryhire'),
                              required: true,
                              options: [],
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                            },
                            hooks: {},
                            expressions: {},
                          }
                        ]
                      },
                      // {
                      //   fieldGroupClassName: 'grid mx-0', // New fieldGroup to separate ContentDescription
                      //   fieldGroup: [
                      //     {
                      //       className: 'col-12 lg:col-11 md:col-11 xl:col-11 py-0 specialcss',
                      //       type: 'input',
                      //       key: 'EmpDescription',
                      //       props: {
                      //         label: `Description`,
                      //         maxLength: 15,
                      //         disabled: this.checkDisable('EmpDescription'),
                      //         required: true,
                      //         options: [],
                      //       },
                      //       validators: {
                      //         validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                      //       },
                      //       hooks: {},
                      //       expressions: {},
                      //     }
                      //   ]
                      // }
                    ]
                  
                  }
         this.engineerfields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
          
            {
              key: 'PALPPmanufacturer',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Manufacturer',
                placeholder: 'Enter Manufacturer',
                required: true,
              },
            },
            {
              key: 'PALPPDescription',
              type: 'primeTextArea',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Decription of Machinery',
                placeholder: 'Enter Decription',
                required: true,
              },
            },
            {
              key: 'PALPPLocationName',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Site',
                placeholder: 'Enter Site Details',
                required: true,
              },
            },
          
            {
                key: 'PALPPmanufactureYear',
                type: 'datepicker',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Manufacture Year',
                  required: true,
                  options:[]
                },
              },
             {
              key: 'PALPPEngineNumber',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Engine Number',
                placeholder: 'Enter Engine Number',
                required: true,
              },
            },
             {
              key: 'PALPPSerialNumber',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Serial Number',
                placeholder: 'Enter Serial Number',
                required: true,
              },
            },
             {
              key: 'PALPPOwnership',
              type: 'radioList',
              className: 'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Ownership',
                placeholder: '',
                required: true,
                options: [
                    {
                        value: 'Owned',
                        label: 'Own Plant'
                    },
                    {
                        value: 'Rented',
                        label: 'Rented'
                    }
                  ],
                //type: 'text',   
                maxLength: 15, 
              },
              validators: {
                //validation: ['numeric'],  
              },
            },
             {
              key: 'PALPPBasisOfValuation',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Plant Value',
                placeholder: 'Enter Value',
                required: true,
              },
            }, 
          ]
        }
    }
  fields:FormlyFieldConfig;
  engineerfields:FormlyFieldConfig;
    getFieldDetails(){return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}