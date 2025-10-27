import { FormlyFieldConfig } from "@ngx-formly/core";

export class GoodsInTransitCommercialMozambique{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    ExtensionFields: any;
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

          this.fields = {
            props: { label: 'Burglary'},
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    key: 'TransitCoverage',
                    type: 'ngselect',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-6 xl:col-6',
                    defaultValue :'',
                    props: {
                      label: 'Transit Coverage',
                      placeholder: 'Select an option',
                      required: false,
                      options: [
          
                      ],
                    },
                  },
                  {
                    key: '',
                    type: 'display',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-6 xl:col-6',
                    props: {
                      label: '',
                      placeholder: 'Select an option',
                      required: false,
                      options: [
          
                      ],
                    },
                  },
                  {
                    key: 'Commodity',
                    type: 'input',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
                    defaultValue :'',
                    props: {
                      label: 'Commodity',
                      placeholder: '',
                      required: false,
                      options: [
          
                      ],
                    },
                  },
                  {
                    key: 'CoverageType',
                    type: 'ngselect',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
                    props: {
                      label: 'Coverage Type',
                      placeholder: 'Select an option',
                      required: false,
                      options: [
          
                      ],
                    },
                  },
                  {
                    key: 'GoodsInTransitSumInsured',
                    type: 'commaSeparator',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
      
                    props: {
                      label: 'Sum Insured',
                      maxLength: 15,
                      placeholder: 'Enter amount',
                      required: false,
                    },
                  },
                  {
                    key: '',
                    type: 'display',
                    className: 'col-12 md:col-12 sm:col-12 lg:col-12 xl:col-12',
                    props: {
                      label: 'Annual Carry',
                      placeholder: 'Select an option',
                      required: false,
                      hidden:true,
                      options: [
          
                      ],
                    },
                    hideExpression: (model) => {
                      return !model.TransitCoverage || model.TransitCoverage == "1";
                    }

                  },
                  {
                    key: 'vehicleCount',
                    type: 'input',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
                    defaultValue :'',
                    props: {
                      label: 'vehicle Count',
                      placeholder: '',
                      required: false,
                      hidden: true,
                      options: [
          
                      ],
                    },
                    hideExpression: (model) => {
                      return !model.TransitCoverage || model.TransitCoverage == "1";
                    }
                  

                  },
                  {
                    key: 'TripsMonth',
                    type: 'input',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
                    props: {
                      label: 'Trips/Month',
                      placeholder: '',
                      required: false,
                      hidden:true,
                      options: [
          
                      ],
                    },
                    hideExpression: (model) => {
                      return !model.TransitCoverage || model.TransitCoverage == "1";
                    }
                  },
                  {
                    key: 'MaximumLimitTrips',
                    type: 'commaSeparator',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
      
                    props: {
                      label: 'Maximun Limit/Trips',
                      maxLength: 15,
                      placeholder: 'Enter amount',
                      required: false,
                      hidden:true
                    },
                    hideExpression: (model) => {
                      return !model.TransitCoverage || model.TransitCoverage == "1";
                    }

                  },
                ]
              }
            ]
          }

          this.ExtensionFields = {
            props: { label: 'Burglary'},
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    key: 'FireExtingUserCharge',
                    type: 'commaSeparator',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
                    defaultValue :'',
                    props: {
                      label: 'Fire Exting User Charge',
                      placeholder: '',
                      required: false,
                      options: [
          
                      ],
                    },
                  },
                  {
                    key: 'DetoriationRemoval',
                    type: 'commaSeparator',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
                    defaultValue :'0',
                    props: {
                      label: 'Detoriation Removal',
                      placeholder: 'Select an option',
                      required: false,
                      options: [
          
                      ],
                    },
                  },
                  {
                    key: 'GITClaimPreparationCost',
                    type: 'ngselect',
                    className: 'col-12 md:col-6 sm:col-12 lg:col-4 xl:col-4',
      
                    props: {
                      label: 'Claim Preparation Cost',
                      placeholder: 'Enter amount',
                      required: false,
                      options:[],
                    },
                  },
                ]
              }
            ]
          }
          // this.fields = {
          //   props: { label: 'Burglary'},
          //   fieldGroup: [
          //     {
          //       fieldGroupClassName: 'grid',
          //         fieldGroup: [
          //           {
          //             className: 'col-12 md:col-1 lg:col-1 p-2',
          //             type: 'displays',
              
          //             templateOptions: {
          //               label: '',
          //               required: true,
    
          //             },
          //           },
          //           {
          //             type: 'ngselect',
          //             className: ' col-12 lg:col-3 md:col-3 xl:col-3',
          //             key: 'TransitCoverage',
          //             defaultValue: '0',
          //             templateOptions: {
          //               label: 'Transit Coverage',
          //               maxLength: 15,
          //               disabled: this.checkDisable('TransitCoverage'),
          //               required:false,
          //               options: [
          //                 {"label":"--Select--","value":null},
          //                 {"label":"Load Limit","value":"01"},
          //                 {"label":"Annual Carry","value":"02"},
          //               ],
        
          //             },
          //             validators: {
          //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
          //             },
          //             hooks: {
          //             },
          //             expressions: {
          //             },
          //           },
          //           {
          //             type: 'input',
          //             className: ' col-12 lg:col-3 md:col-3 xl:col-3',
          //             key: 'Commodity',
          //             defaultValue: null,
          //             templateOptions: {
          //               label: 'Commodity',
          //               maxLength: 150,
          //               disabled: this.checkDisable('Commodity'),
          //               required:true,
          //               options: [
          //               ],
        
          //             },
          //             validators: {
          //               validation: [ForceLengthValidators.maxLength(150), ForceLengthValidators.min(1)]
          //             },
          //             hooks: {
          //             },
          //             expressions: {
          //             },
          //           },
          //           {
          //             type: 'ngselect',
          //             className: ' col-12 lg:col-3 md:col-3 xl:col-3',
          //             key: 'CoverageType',
          //             defaultValue: '0',
          //             templateOptions: {
          //               label: 'Coverage Type',
          //               maxLength: 15,
          //               disabled: this.checkDisable('CoverageType'),
          //               required:false,
          //               options: [
          //                 {"label":"--Select--","value":null},
          //                 {"label":"All Risk","value":"01"},
          //                 {"label":"FCO","value":"02"},
          //                 {"label":"FCO,T","value":"03"},
          //               ],
        
          //             },
          //             validators: {
          //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
          //             },
          //             hooks: {
          //             },
          //             expressions: {
          //             },
          //           },
          //           {
          //             className: 'col-12 md:col-2 lg:col-2 p-2',
          //             type: 'displays',
              
          //             templateOptions: {
          //               label: '',
          //               required: true,
    
          //             },
          //           },
          //           {
          //             className: 'col-12 md:col-1 lg:col-1 p-2',
          //             type: 'displays',
              
          //             templateOptions: {
          //               label: '',
          //               required: true,
    
          //             },
          //           },
          //           {
          //             type: 'commaSeparator',
          //             className: ' col-12 lg:col-3 md:col-3 xl:col-3',
          //             key: 'SumInsured',
          //             defaultValue: '0',
          //             templateOptions: {
          //               label: 'SumInsured',
          //               maxLength: 15,
          //               disabled: this.checkDisable('SumInsured'),
          //               required:true,
          //               options: [
          //               ],
        
          //             },
          //             validators: {
          //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
          //             },
          //             hooks: {
          //             },
          //             expressions: {
          //             },
          //           },
          //           {
          //             type: 'input',
          //             className: ' col-12 lg:col-3 md:col-3 xl:col-3',
          //             key: 'VehicleCount',
          //             defaultValue: null,
          //             templateOptions: {
          //               label: 'Vehicle Count',
          //               maxLength: 3,
          //               disabled: this.checkDisable('VehicleCount'),
          //               required:true,
          //               options: [
          //               ],
        
          //             },
          //             validators: {
          //               validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
          //             },
          //             hooks: {
          //             },
          //             expressions: {
          //             },
          //           },
          //           {
          //             type: 'input',
          //             className: ' col-12 lg:col-3 md:col-3 xl:col-3',
          //             key: 'TripsPerMonth',
          //             defaultValue: null,
          //             templateOptions: {
          //               label: 'Trips Per Month',
          //               maxLength: 3,
          //               disabled: this.checkDisable('TripsPerMonth'),
          //               required:true,
          //               options: [
          //               ],
          //             },
          //             validators: {
          //               validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
          //             },
          //             hooks: {
          //             },
          //             expressions: {
          //             },
          //           },
          //           {
          //             className: 'col-12 md:col-2 lg:col-2 p-2',
          //             type: 'displays',
              
          //             templateOptions: {
          //               label: '',
          //               required: true,
    
          //             },
          //           },
          //           {
          //             className: 'col-12 md:col-1 lg:col-1 p-2',
          //             type: 'displays',
              
          //             templateOptions: {
          //               label: '',
          //               required: true,
    
          //             },
          //           },
          //           {
          //             type: 'commaSeparator',
          //             className: ' col-12 lg:col-3 md:col-3 xl:col-3',
          //             key: 'MaximumLimitPerconveyance',
          //             defaultValue: '0',
          //             templateOptions: {
          //               label: 'Maximum Limit Per conveyance',
          //               maxLength: 15,
          //               disabled: this.checkDisable('MaximumLimitPerconveyance'),
          //               required:true,
          //               options: [
          //               ],
        
          //             },
          //             validators: {
          //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
          //             },
          //             hooks: {
          //             },
          //             expressions: {
          //             },
          //           },
          //         ]
          //     }
          //   ]
          // }
      }
    fields:FormlyFieldConfig;
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