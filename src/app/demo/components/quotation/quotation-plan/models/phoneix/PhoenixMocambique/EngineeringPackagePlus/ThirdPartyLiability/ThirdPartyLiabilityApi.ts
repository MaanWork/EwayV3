import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class ThirdPartyLiabilityEngineeringNamibiaApi{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  policyfields:FormlyFieldConfig;
  policyfields1 :FormlyFieldConfig;
  extendsfields:FormlyFieldConfig
    constructor() {
      
    }
    getEditDetails(subDetails,obj){
        let TPLSection  = subDetails.filter(ele=>ele['SectionId']=='185');
        if(TPLSection.length!=0){
          let Spreadoffire = TPLSection.filter(ele=>ele.CoverId==440 || ele.CoverId=='440')
          if(Spreadoffire.length!=0){obj['Spreadoffire']=Spreadoffire[0].SumInsured;obj['IndustryType']=null;if(Spreadoffire[0]?.IndustryType!='0')obj['IndustryType']=Spreadoffire[0].IndustryType;}
          let ThirdPartyLiability = TPLSection.filter(ele=>ele.CoverId==460 || ele.CoverId=='460')
          if(ThirdPartyLiability.length!=0){obj['ThirdPartyLiability']=ThirdPartyLiability[0].SumInsured;obj['IndustryType']=null;if(ThirdPartyLiability[0]?.IndustryType!='0')obj['IndustryType']=ThirdPartyLiability[0].IndustryType;}
          let TPLClaimPreparationCosts = TPLSection.filter(ele=>ele.CoverId==367 || ele.CoverId=='367')
          if(TPLClaimPreparationCosts.length!=0){obj['TPLClaimPreparationCosts']=TPLClaimPreparationCosts[0].CategoryId;obj['IndustryType']=null;if(TPLClaimPreparationCosts[0]?.IndustryType!='0')obj['IndustryType']=TPLClaimPreparationCosts[0].IndustryType;}
          
        return obj
      }
    }
    getSaveDetails(entry,claimCostList,IndustryId,industryTypeList,obj){
        if(entry.Spreadoffire!='0' && entry.Spreadoffire!=null && entry.Spreadoffire!=''){
            let subEntry= {
              "SectionId": "185",
              "SectionName":"THIRD PARTY LIABILITY",
              "CoverId":"440",
              "SumInsured": entry.Spreadoffire
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if(entry.ThirdPartyLiability!='0' && entry.ThirdPartyLiability!=null && entry.ThirdPartyLiability!=''){
            let subEntry= {
              "SectionId": "185",
              "SectionName":"THIRD PARTY LIABILITY",
              "CoverId":"460",
              "SumInsured": entry.ThirdPartyLiability
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if(entry.TPLClaimPreparationCosts!='0' && entry.TPLClaimPreparationCosts!=null && entry.TPLClaimPreparationCosts!=''){
            let subEntry= {
              "SectionId": "185",
              "SectionName":"THIRD PARTY LIABILITY",
              "CoverId":"367",
              "SumInsured": claimCostList.find(ele=>ele.Code==entry.TPLClaimPreparationCosts)?.CodeDesc?.replaceAll(',',''),
              "CategoryId": entry.TPLClaimPreparationCosts,
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}