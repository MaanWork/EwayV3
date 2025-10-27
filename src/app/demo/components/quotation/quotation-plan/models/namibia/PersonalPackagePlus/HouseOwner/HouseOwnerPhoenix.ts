import { FormlyFieldConfig } from "@ngx-formly/core";
import * as Mydatas from '../../../../../../../../app-config.json';
import { SharedService } from "@app/_services/shared.service";
export class HouseOwnerPersonalNamibia {
  customerDetails: any;
  commonDetails: any[] = [];userDetails:any;insuranceId:any;
  endorsementSection: boolean = false; subuserType: any = null;
  enableFieldsList: any[] = []; finalizeYN: any = 'N';
  public AppConfig: any = (Mydatas as any).default;firstLossOptions:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;firstLossPayeeList:any[]=[];
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;firstLossSection: boolean;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  policyfields1: any;
  constructor() {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
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

    this.policyfields1 = {
      fieldGroup: [

        {
          key: 'BuildingSumInsuredFullcover',
          type: 'commaSeparator',
          props: {
            label: 'Building sum insured - Full cover',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
          fieldGroup: [
            {
              key: 'BuildingSumInsuredFullcoverDesc',
              type: 'textarea',
              props: {
                label: 'Revenue',
                placeholder: 'Enter Sum Insured',
                type: 'text',
                required: false
              }
            }
          ]
        },
        // {
        //   key: 'HomeownersLiability',
        //   type: 'commaSeparator',
        //   props: {
        //     label: 'Homeowners Liability',
        //     placeholder: 'Select an option',
        //     required: false,
        //     options: [

        //     ]
        //   },
        //   fieldGroup: [
        //     {
        //       key: 'HomeownersLiabilityDesc',
        //       type: 'textarea',
        //       props: {
        //         label: 'Revenue',
        //         placeholder: 'Enter Sum Insured',
        //         type: 'text',
        //         required: false
        //       }
        //     }
        //   ]
        // },
        {
          key: 'AccidentalDamageToMachinery',
          type: 'commaSeparator',
          props: {
            label: 'Accidental damage to machinery',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
          fieldGroup: [
            {
              key: 'AccidentalDamageToMachineryDesc',
              type: 'textarea',
              props: {
                label: 'Revenue',
                placeholder: 'Enter Sum Insured',
                type: 'text',
                required: false
              }
            }
          ]
        },
        {
          key: 'SolarGeyser',
          type: 'commaSeparator',
          props: {
            label: 'Solar Geyser',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
          fieldGroup: [
            {
              key: 'SolarGeyserDesc',
              type: 'textarea',
              props: {
                label: 'Revenue',
                placeholder: 'Enter Sum Insured',
                type: 'text',
                required: false
              }
            }
          ]
        },
        {
          key: 'InHouseGeyser',
          type: 'commaSeparator',
          props: {
            label: 'In House Geyser',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
          fieldGroup: [
            {
              key: 'InHouseGeyserDesc',
              type: 'textarea',
              props: {
                label: 'Revenue',
                placeholder: 'Enter Sum Insured',
                type: 'text',
                required: false
              }
            }
          ]
        },
        {
          key: 'Powersurge',
          type: 'commaSeparator',
          props: {
            label: 'Power Surge',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
          fieldGroup: [
            {
              key: 'PowersurgeDesc',
              type: 'textarea',
              props: {
                label: 'Revenue',
                placeholder: 'Enter Sum Insured',
                type: 'text',
                required: false
              }
            }
          ]
        },
        {
          key: 'SubsidenceAndLandslip',
          type: 'commaSeparator',
          props: {
            label: 'Subsidence and Landslip (Full Value Cover)',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
          fieldGroup: [
            {
              key: 'SubsidenceAndLandslipDesc',
              type: 'textarea',
              props: {
                label: 'Revenue',
                placeholder: 'Enter Sum Insured',
                type: 'text',
                required: false
              }
            }
          ]
        },
        {
          key: 'NoClaimBonus',
          type: 'ngselect',
          props: {
            label: 'No Claim Bonus',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
          fieldGroup: [
            {
              key: 'NoClaimBonusDesc',
              type: 'textarea',
              props: {
                label: 'Revenue',
                placeholder: 'Enter Sum Insured',
                type: 'text',
                required: false
              }
            }
          ]
        },
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