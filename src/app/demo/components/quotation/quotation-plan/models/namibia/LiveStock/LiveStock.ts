import { FormlyFieldConfig } from "@ngx-formly/core";

export class LiveStockNamibia{
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
              key: 'LiveStock',
              type: 'radioList',
              className: 'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Stock Type',
                placeholder: '',
                required: true,
                options: [
                    {
                        value: '1',
                        label: 'LiveStock'
                    },
                    {
                        value: '2',
                        label: 'Small Stock'
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
                  className: ' col-12 lg:col-4 md:col-4 xl:col-4',
                  type: 'displays',
          
                  templateOptions: {
                    label: '',
                    required: false,

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
              key: 'StockType',
              type: 'ngselect',
              className:'col-12 md:col-6 lg:col-4 xl:col-4',
              props: {
                label: 'Stock Breed',
                placeholder: 'Select Stock Breed',
                required: true,
                options:[]
              },
            },
           {
                key: 'NooFLiveStock',
                type: 'input',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Number of Stock',
                  placeholder: 'Enter No Of Stock',
                  required: true,
                  maxLength: 5,
                },
              },
              {
                key: 'StockPrice',
                type: 'input',
                className:'col-12 md:col-6 lg:col-4 xl:col-4',
                props: {
                  label: 'Stockprice per Unit',
                  placeholder: 'Enter Stock Price',
                  required: true,
                  maxLength: 5,
                },
              },
            {
              key: 'LiveStockSumInsured',
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