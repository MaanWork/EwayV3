import { FormlyFieldConfig } from "@ngx-formly/core";


export class PersonalAllRiskPhoenix{
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
        props: { label: 'Personal All  Risk' },
        fieldGroup: [
          {
            fieldGroupClassName: 'grid',
            fieldGroup: [
              {
                className: 'col-12 md:col-12 lg:col-12 xl:col-12',
                type: 'table',
                fieldGroup: [
                  {
                      fieldGroup:[
                        {props:{label:`Coverage`}},
                      //   {props:{label:`Description`},className:"col-2"},
                        {props:{label:`Description`}},
                        {props:{label:`Sum Insured`}},
                        
                      ]
                  },
                  {
                    fieldGroup:[
                          {
                            fieldGroup:[
                              {
                                className: "mt-1",
                                type: 'display',
              
                                templateOptions: {
                                  label: `Clothing And Personal Effects`,
                                  required: false,
              
                                },
                              },
                              {
                                className: "mt-1",
                                type: 'input',
                                key: 'ClothingAndPersonalEffectsPhoenixDesc',
              
                                templateOptions: {
                                  disabled: this.checkDisable('ClothingAndPersonalEffectsPhoenixDesc'),
                                  maxLength:200,
                                  required: false,
                                  options: [
              
                                  ],
              
                                },
                                validators: {
                                },
                                hooks: {
                                },
                                expressions: {
                                },
                              },
                              {
                                className: "mt-1",
                                type: 'commaSeparator',
                                key: 'ClothingAndPersonalEffectsPhoenix',
              
                                templateOptions: {
                                  disabled: this.checkDisable('ClothingAndPersonalEffectsPhoenix'),
                                  maxLength:15,
                                  required: false,
                                  options: [
              
                                  ],
              
                                },
                                validators: {
                                },
                                hooks: {
                                },
                                expressions: {
                                },
                              },
                              
                            ]
                          },
                         
                         
                         
                          {
                            fieldGroup:[
                              {
                                className: "mt-1",
                                type: 'display',
              
                                templateOptions: {
                                  label: `Camping Equipment`,
                                  required: false,
              
                                },
                              },
                              {
                                className: "mt-1",
                                type: 'input',
                                key: 'CampingEquipmentPhoenixDesc',
              
                                templateOptions: {
                                  disabled: this.checkDisable('CampingEquipmentPhoenixDesc'),
                                  maxLength:200,
                                  required: false,
                                  options: [
              
                                  ],
              
                                },
                                validators: {
                                },
                                hooks: {
                                },
                                expressions: {
                                },
                              },
                              {
                                className: "mt-1 rightAlign",
                                type: 'commaSeparator',
                                key: 'CampingEquipmentPhoenix',
              
                                templateOptions: {
                                  disabled: this.checkDisable('CampingEquipmentPhoenix'),
                                  maxLength:15,
                                  required: false,
                                  options: [
              
                                  ],
              
                                },
                                validators: {
                                },
                                hooks: {
                                },
                                expressions: {
                                },
                              },
                          
                            ]
                          },
                          {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Sporting Equipment`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'input',
                                  key: 'SportingEquipmentPhoenixDesc',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('SportingEquipmentPhoenixDesc'),
                                    maxLength:200,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                {
                                  className: "mt-1 rightAlign",
                                  type: 'commaSeparator',
                                  key: 'SportingEquipmentPhoenix',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('SportingEquipmentPhoenix'),
                                    maxLength:15,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                            
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Jewellery, Watches and Spectacles`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'input',
                                  key: 'JewelleryPhoenixDesc',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('JewelleryPhoenixDesc'),
                                    maxLength:200,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                {
                                  className: "mt-1 rightAlign",
                                  type: 'commaSeparator',
                                  key: 'JewelleryPhoenix',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('JewelleryPhoenix'),
                                    maxLength:15,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                            
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Mobile Phones`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className: "mt-1",
                                  type: 'input',
                                  key: 'MobilephoneDesc',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('MobilephoneDesc'),
                                    maxLength:200,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                                {
                                  className: "mt-1 rightAlign",
                                  type: 'commaSeparator',
                                  key: 'Mobilephone',
                
                                  templateOptions: {
                                    disabled: this.checkDisable('Mobilephone'),
                                    maxLength:15,
                                    required: false,
                                    options: [
                
                                    ],
                
                                  },
                                  validators: {
                                  },
                                  hooks: {
                                  },
                                  expressions: {
                                  },
                                },
                            
                              ]
                            },
                    ]
                  },
                  
                ]
              }
            ]
          }
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