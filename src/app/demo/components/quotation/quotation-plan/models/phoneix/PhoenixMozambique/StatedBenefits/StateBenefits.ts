import { FormlyFieldConfig } from "@ngx-formly/core";
import * as Mydatas from '../../../../../../../../app-config.json';
import { SharedService } from "@app/_services/shared.service";
export class StateBenefitsMozambique {
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
          key: 'MedicalExpenses',
          type: 'commaSeparator',
          props: {
            label: 'Medical Expenses',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'Death',
          type: 'commaSeparator',
          props: {
            label: 'Death',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
         
        },
        {
          key: 'TemporaryTotalDisability',
          type: 'ngselect',
          props: {
            label: 'Temporary Total Disability',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
        },
        {
          key: 'PermanentTotalDisability',
          type: 'commaSeparator',
          props: {
            label: 'Permanent Total Disability - (PTD)',
            placeholder: 'Select an option',
            required: false,
            options: [

            ]
          },
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
  // getPhoenixListItem(type,sectionType):any{
  //   let ReqObj = {
  //     "InsuranceId": this.insuranceId,
  //     "ItemType": type
  //   }
  //   let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data: any) => {
  //       let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
  //       let list = [];
  //       if(type=="BUSINESS_INTRUPTION" || type=="GOODS_IN_TRANSIT"  || type=='PUBLIC_LIABILITY'){ list = defaultObj.concat(data.Result);}
  //       if(type=="NASRIA_FIRE" || type=='Indemnity_Period' || type=='NO_CLAIMS_BONUS' || type =='NO_OF_WEEKS'){ list = defaultObj.concat(data.Result);}
  //       for (let i = 0; i < list.length; i++) {
  //         list[i].label = list[i]['CodeDesc'];
  //         list[i].value = list[i]['Code'];
  //         // delete this.roofMaterialList[i].CodeDesc;       
  //         if (i == list.length - 1) {return list}
  //       }
  //     });
  // }
}