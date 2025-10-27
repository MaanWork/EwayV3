import { ForceLengthValidators } from "../../../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class StateBenefitsPhoenix{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    finalizeYN: any='N';
    subuserType: any=null;dobDate:any=null;
    stateBenefit:FormlyFieldConfig;
    constructor() {
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      this.dobDate = new Date(year - 18, month, day);
      const finalize = sessionStorage.getItem('FinalizeYN');
      if(finalize) this.finalizeYN = finalize;
      this.subuserType = sessionStorage.getItem('typeValue');
        // this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        // let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        // if (commonDetails) this.commonDetails = commonDetails;
        // if (sessionStorage.getItem('endorsePolicyNo')) {
        //     this.endorsementSection = true;
        //     let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
        //     if (endorseObj) {
        //       this.enableFieldsList = endorseObj.FieldsAllowed;
        //     }
        // }
        // this.fields={
        //     props: { label: 'State Benefits' },
        //     fieldGroup: [
        //       {
        //         fieldGroupClassName: 'grid',
        //         fieldGroup: [
        //         ]
        //       }
        //     ]
        //   }

          this.stateBenefit = {
            fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              type: 'ngselect',
              key: 'Death',
              defaultValue: '',
              className: 'col-12 lg:col-4 md:col-4 xl:col-4',
              templateOptions: {
                label: `Occupation `,
                placeholder: '--Select--',
               // disabled: true,
                required:false,
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
              className: ' col-12 lg:col-4 md:col-4 xl:col-4',
              key: 'AnnualRemuneration',
              defaultValue: '0',
              templateOptions: {
                label: `Annual Remuneration`,
                maxLength: 14,
                disabled: this.checkDisable('AnnualRemuneration'),
                required:true,
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
              type: 'ngselect',
              key: 'TemporaryTotalDisability',
              defaultValue: '',
              className: 'col-12 lg:col-4 md:col-4 xl:col-4',
              templateOptions: {
                label: `Temporary Disablement`,
                placeholder: '--Select--',
               // disabled: true,
                required:false,
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
              type: 'ngselect',
              key: 'PermanentTotalDisability-(PTD)',
              defaultValue: '',
              className: 'col-12 lg:col-4 md:col-4 xl:col-4',
              templateOptions: {
                label: `Coverage`,
                placeholder: '--Select--',
               // disabled: true,
                required:false,
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
              type: 'radioList',
              key: 'MedicalExpenses',
              defaultValue: '',
              className: 'col-12 lg:col-4 md:col-4 xl:col-4',
              templateOptions: {
                label: `Medical Expenses`,
                // placeholder: '--Select--',
               // disabled: true,
                required:false,
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
    }
  fields:FormlyFieldConfig;
    getFieldDetails(){return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          const entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}