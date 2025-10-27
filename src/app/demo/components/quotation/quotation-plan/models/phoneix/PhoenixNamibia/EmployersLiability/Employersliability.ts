import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";
import { FormGroup } from "@angular/forms";

export class EmployersLiabilityNamibia {
  customerDetails: any;
  commonDetails: any[] = [];
  endorsementSection: boolean = false; subuserType: any = null;
  enableFieldsList: any[] = []; finalizeYN: any = 'N';
  // policyfields1: any;
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

   

    // this.fields = {
    //   props: { label: 'Electronic Equipment' },
    //   fieldGroup: [
    //     {
    //       fieldGroupClassName: 'grid',
    //       fieldGroup: [
    //         {
    //           className: 'col-12 md:col-12 lg:col-12 xl:col-12',
    //           type: 'table',
    //           fieldGroup: [
    //             {
    //               fieldGroup: [
    //                 { props: { label: `Coverage` } },
    //                 { props: { label: `Sum Insured` } },
    //                 // { props: { label: `Description` }, className: "col-2" },

    //               ]
    //             },
    //             {
    //               fieldGroup: [
    //                 {
    //                   fieldGroup: [
    //                     {
    //                       className: "mt-1",
    //                       type: 'display',

    //                       templateOptions: {
    //                         label: `Employer's Liability`,
    //                         required: false,

    //                       },
    //                     },

    //                     {
    //                       className: "mt-1",
    //                       type: 'commaSeparator',
    //                       key: 'EmployersLiability',

    //                       templateOptions: {
    //                         disabled: this.checkDisable('EmployersLiability'),
    //                         maxLength: 15,
    //                         required: false,
    //                         options: [

    //                         ],

    //                       },
    //                       validators: {
    //                       },
    //                       hooks: {
    //                       },
    //                       expressions: {
    //                       },
    //                     },
                        

    //                   ]
    //                 },
                    
    //               ]
    //             },

    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }
  }
  policyfields1: FormlyFieldConfig[] = [
    {
          key: 'employers',
          type: 'repeat',

          templateOptions: {
            addText: 'Add Patient',
          },
          fieldArray: {
            fieldGroup: [
              {
                fieldGroupClassName: 'grid mt-2',
                fieldGroup: [
                  {
                    type: 'ngselect',
                    key: 'OccupationType',

                    className: 'col-12 md:col-3 lg:col-4 xl:col-4 mt-2',

                    props: {
                      label: `Occupation Type`,
                     
                      required: false,
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
                    className: 'col-12 md:col-3 lg:col-3 xl:col-4',
                    //col-sm-12 col-md-6 col-lg-4',
                    key: 'NoEmployees',

                    props: {
                      label: `No Of Employees`,
                      maxLength: 15,
                    
                      required: false,
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
                    className: 'col-12 md:col-3 lg:col-3 xl:col-4',

                    key: 'EmpSumInsured',

                    props: {
                      label: `SumInsured`,
                      maxLength: 15,
                    
                      required: false,
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
            ],
          },
        
      
    }
  ]
   form = new FormGroup({});
 
  options: FormlyFormOptions = {};
  model = {
    employers: [{}],
};
  
}