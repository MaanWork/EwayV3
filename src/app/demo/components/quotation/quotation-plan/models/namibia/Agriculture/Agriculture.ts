import { FormlyFieldConfig } from "@ngx-formly/core";

export class AgricultureNamibia{
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
          fieldGroupClassName: 'grid',
          fieldGroup: [
             {
              key: 'YaraPackageYN',
              type: 'radioList',
              className: 'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Policy Type',
                placeholder: '',
                required: true,
                options: [
                    {
                        value: 'Y',
                        label: 'Group'
                    },
                    {
                        value: 'N',
                        label: 'Individual'
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
              key: 'agriGroupMember',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Group Members',
                placeholder: 'Enter Group Members',
                required: true,
                maxLength:2
              },
             
            },
            
            {
              key: 'RegionCode',
              type: 'ngselect',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Province',
                options:[],
                required: true,
              },
            },
             {
              key: 'DistrictCode',
              type: 'ngselect',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'District',
                options:[],
                required: true,
              },
            },
           {
              key: 'Crop',
              type: 'ngselect',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Crop',
                placeholder: 'Select Crop',
                required: true,
                options:[]
              },
            },
           {
                key: 'landSize',
                type: 'input',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Land Size (HA)',
                  placeholder: 'Enter Land Size',
                  required: true,
                  maxLength: 5,
                },
              },
              {
                key: 'HACost',
                type: 'input',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Cost Per HA',
                  placeholder: 'Enter No Of Acres',
                  required: true,
                  maxLength: 5,
                },
              },
            {
              key: 'AgricultureSumInsured',
              type: 'commaSeparator',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Sum Insured',
                placeholder: 'Enter Sum Insured',
                required: true,
                maxLength:2
              },
            },
            
          ]
        }
      
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