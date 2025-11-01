import { FormlyFieldConfig } from "@ngx-formly/core";
export class FarmCareTanzaniya{
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
              key: 'DistributorCode',
              type: 'group',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Distributor Code',
                placeholder: 'Enter Distributor Code',
                required: true,
                options:[]
              },
            },
            {
              key: 'DistributorName',
              type: 'input',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Distributor Name',
                placeholder: 'Enter Distributor Name',
                required: true,
                disabled:true
              },
            },
            // {
            //   key: 'RegionCode',
            //   type: 'ngselect',
            //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
            //   props: {
            //     label: 'Region',
            //     options:[],
            //     required: true,
            //   },
            // },
            //  {
            //   key: 'DistrictCode',
            //   type: 'ngselect',
            //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
            //   props: {
            //     label: 'District',
            //     options:[],
            //     required: true,
            //   },
            // },
            //  {
            //   key: 'Ward',
            //   type: 'ngselect',
            //   className:'col-12 md:col-6 lg:col-4 xl:col-4',
            //   props: {
            //     label: 'Ward',
            //     options:[],
            //     required: true,
            //   },
            // },
          ]
        }
        this.constructionCARuptofields = {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              key: 'RegionCode',
              type: 'ngselect',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Region',
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
                key: 'NoOfAcres',
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
                key: 'FirstLossPercentId',
                type: 'ngselect',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Coverage (%)',
                  placeholder: 'Select Coverage',
                  required: true,
                  options:[]
                },
              },
            {
                key: 'CoverageID',
                type: 'ngselect',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Coverage',
                  placeholder: 'Select Coverage ID',
                  required: true,
                  options:[]
                },
              },
               {
              key: 'YaraPackageYN',
              type: 'radioList',
              className: 'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Yara Package',
                placeholder: '',
                required: true,
                options: [
                    {
                        value: 'Y',
                        label: 'Yes'
                    },
                    {
                        value: 'N',
                        label: 'No'
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
              key: 'farmCareSumInsured',
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