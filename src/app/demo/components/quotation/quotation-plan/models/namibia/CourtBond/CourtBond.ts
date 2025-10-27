import { FormlyFieldConfig } from "@ngx-formly/core";

export class CourtBondBondNamibia{
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
      
        this.CourtBondEngineerfields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
           
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
                label: 'Decription',
                placeholder: '',
                required: true,
              },
            },
           
            {
                key: 'CARStartDate',
                type: 'datepicker',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Appointment Date',
                 
                  required: true,
                  options:[]
                },
              },
             
          ]
        }
       
                  this.CourtBondAdditionalfields = {
            fieldGroupClassName: 'grid',
            fieldGroup: [
                  {
                            type: 'ngselect',
                            className: ' col-12 lg:col-3 md:col-3 xl:col-3 paddingReduced',
                            key: 'CourtBondOccupation',
                            defaultValue: '0',
                            props: {
                              label: `In What Capacity Appointed`,
                              maxLength: 15,
                              disabled: this.checkDisable('CourtBondOccupation'),
                              placeholder:'Select Occupation',
                              required:true,
                              options: [
                              ],
              
                            },
                            
                            hooks: {
                            },
                            expressions: {
                            },
                          },
                         {
                            type: 'commaSeparator',
                            className: ' col-12 lg:col-3 md:col-3 xl:col-3 paddingReduced',
                            key: 'GrossProfitLc',
                            defaultValue: '0',
                            props: {
                              label: `Value Of Bond`,
                              maxLength: 15,
                              disabled: this.checkDisable('GrossProfitLc'),
                              required:true,
                              placeholder:'Enter Sum Insured',
                              options: [
                              ],
              
                            },
                            
                            hooks: {
                            },
                            expressions: {
                            },
                          },
            ]
        }
       
    }
  CourtBondEngineerfields:FormlyFieldConfig;
  CourtBondAdditionalfields:FormlyFieldConfig;
    getFieldDetails(){return this.CourtBondEngineerfields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
      
}