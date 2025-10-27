import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class AccountsRecievableApiPhoenix{
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
       
      let AccRecievableSection  = subDetails.filter(ele=>ele['SectionId']=='219');
      if(AccRecievableSection.length!=0){
        let accOutstanding = AccRecievableSection.filter(ele=>ele.CoverId==414 || ele.CoverId=='414')
        if(accOutstanding.length!=0){obj['OutstandingDebitBalances']=accOutstanding[0].SumInsured;obj['IndustryType']=null;if(accOutstanding[0]?.IndustryType!='0')obj['IndustryType']=accOutstanding[0].IndustryType;}
        let accTransit = AccRecievableSection.filter(ele=>ele.CoverId==415 || ele.CoverId=='415')
        if(accTransit.length!=0){obj['TransitExtension']=accTransit[0].SumInsured;obj['IndustryType']=null;if(accTransit[0]?.IndustryType!='0')obj['IndustryType']=accTransit[0].IndustryType;}
        let accClaims = AccRecievableSection.filter(ele=>ele.CoverId==367 || ele.CoverId=='367')
        if(accClaims.length!=0){obj['ClaimsPreparationCosts']=accClaims[0].CategoryId;obj['IndustryType']=null;if(accClaims[0]?.IndustryType!='0')obj['IndustryType']=accClaims[0].IndustryType;}

        return obj
      }
    }
    getSaveDetails(entry,ClaimCostList,industryTypeList,obj){
        if(entry.OutstandingDebitBalances!='0' && entry.OutstandingDebitBalances!=null && entry.OutstandingDebitBalances!='' ){
            let subEntry= {
              "SectionId": "219",
              "SectionName":"Accounts Receivable",
              "CoverId":"414",
              "SumInsured": entry.OutstandingDebitBalances
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.TransitExtension!='0' && entry.TransitExtension!=null && entry.TransitExtension!=''){
            let subEntry= {
              "SectionId": "219",
              "SectionName":"Accounts Receivable",
              "CoverId":"415",
              "SumInsured": entry.TransitExtension
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.ClaimsPreparationCosts!='0' && entry.ClaimsPreparationCosts!=null && entry.ClaimsPreparationCosts!='' ){
            let subEntry= {
              "SectionId": "219",
              "SectionName":"Accounts Receivable",
              "CoverId":"367",
              "CategoryId":entry.ClaimsPreparationCosts,
              "SumInsured": ClaimCostList.find(ele=>ele.Code==entry.ClaimsPreparationCosts)?.CodeDesc?.replaceAll(',','')
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}