import { FormlyFieldConfig } from "@ngx-formly/core";

export class OfficeContents {
  customerDetails: any;
  commonDetails: any[] = [];
  endorsementSection: boolean = false; subuserType: any = null;
  enableFieldsList: any[] = []; finalizeYN: any = 'N';
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

    this.fields = {
      props: { label: 'Electronic Equipment' },
      fieldGroup: [
        {
          fieldGroupClassName: 'grid',
          fieldGroup: [
            {
              className: 'col-12 md:col-12 lg:col-12 xl:col-12',
              type: 'table',
              fieldGroup: [
                {
                  fieldGroup: [
                    { props: { label: `Coverage` } },
                    { props: { label: `Sum Insured` } },
                    { props: { label: `Description` }, className: "col-2" },

                  ]
                },
                {
                  fieldGroup: [
                    {
                      fieldGroup: [
                        {
                          className: "mt-1",
                          type: 'display',

                          templateOptions: {
                            label: `Office Contents`,
                            required: false,

                          },
                        },

                        {
                          className: "mt-1",
                          type: 'commaSeparator',
                          key: 'OfficeContents',

                          templateOptions: {
                            disabled: this.checkDisable('OfficeContents'),
                            maxLength: 15,
                            required: true,
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
                          type: 'input',
                          className: 'formlymargin',
                          key: 'OfficeContentsDesc',

                          templateOptions: {
                            required: true,
                            disabled: this.checkDisable('OfficeContentsDesc'),
                            options: [

                            ],

                          },
                          validators: {
                          },
                          hooks: {
                          },
                          expressions: {
                            //disabled: (this.checkDisable('StockLossPercent') || this.model.StockInTradeSi =='' || this.model.StockInTradeSi =='0'),
                          },
                        },

                      ]
                    },
                    {
                      fieldGroup: [
                        {
                          className: "mt-1",
                          type: 'display',

                          templateOptions: {
                            label: `Theft Aspect`,
                            required: false,

                          },
                        },

                        {
                          className: "mt-1",
                          type: 'commaSeparator',
                          key: 'TheftAspect',

                          templateOptions: {
                            disabled: this.checkDisable('TheftAspect'),
                            maxLength: 15,
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
                      fieldGroup: [
                        {
                          className: "mt-1",
                          type: 'display',

                          templateOptions: {
                            label: `Water Leakage/Loss of Water`,
                            required: false,

                          },
                        },

                        {
                          className: "mt-1",
                          type: 'commaSeparator',
                          key: 'WaterLeakage',

                          templateOptions: {
                            disabled: this.checkDisable('WaterLeakage'),
                            maxLength: 15,
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
                      fieldGroup: [
                        {
                          className: "mt-1",
                          type: 'display',
                          templateOptions: {
                            label: `Liability for Loss of Documents`,
                            required: false,
                          },
                        },
                        {
                          className: "mt-1",
                          type: 'commaSeparator',
                          key: 'LiabilityForLossOfDocuments',
                          templateOptions: {
                            disabled: this.checkDisable('LiabilityForLossOfDocuments'),
                            maxLength: 15,
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
                      fieldGroup: [
                        {
                          className: "mt-1",
                          type: 'display',

                          templateOptions: {
                            label: `Power Surge`,
                            required: false,

                          },
                        },

                        {
                          className: "mt-1",
                          type: 'commaSeparator',
                          key: 'OfficePowerSurge',

                          templateOptions: {
                            disabled: this.checkDisable('OfficePowerSurge'),
                            maxLength: 15,
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
                      fieldGroup: [
                        {
                          className: "mt-1",
                          type: 'display',

                          templateOptions: {
                            label: `Additional Claims Preparation Costs`,
                            required: false,

                          },
                        },
                        {
                          className: "mt-1 rightAlign",
                          type: 'ngselect',
                          key: 'OfficeClaimCosts',
                          templateOptions: {
                            disabled: this.checkDisable('OfficeClaimCosts'),
                            maxLength: 15,
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
  fields: FormlyFieldConfig;
  getFieldDetails() { return this.fields; }
  checkDisable(fieldName) {
    if (this.endorsementSection) {
      let entry = this.enableFieldsList.some(ele => ele == fieldName);
      return !entry;
    }
    else if (this.subuserType == 'low') return this.finalizeYN == 'Y';
    else return false;

  }
}