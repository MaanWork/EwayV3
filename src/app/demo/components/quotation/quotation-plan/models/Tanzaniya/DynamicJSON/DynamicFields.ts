import { ForceLengthValidators } from "@app/demo/components/common-quote-details/common-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class DynamicFields{
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
        this.fields = {
          props: { label: 'Accidental Damage'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                
              ]
            }
          ]
        }
        this.fields1 = {
          props: { label: 'Accidental Damage'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                
              ]
            }
          ]
        }
        this.fields2 = {
          props: { label: 'Accidental Damage'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                
              ]
            }
          ]
        }
        this.fields3 = {
          props: { label: 'Accidental Damage'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                
              ]
            }
          ]
        }
        this.fields4 = {
          props: { label: 'Accidental Damage'},
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                
              ]
            }
          ]
        }
    }
  fields:FormlyFieldConfig;fields1:FormlyFieldConfig;fields2:FormlyFieldConfig;
  fields3:FormlyFieldConfig;
  fields4:FormlyFieldConfig;
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