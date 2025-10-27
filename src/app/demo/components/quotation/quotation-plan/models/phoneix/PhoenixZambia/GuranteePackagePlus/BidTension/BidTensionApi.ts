import { FormlyFieldConfig } from "@ngx-formly/core";

export class BidTensionBondApiPPPhoenix{
     customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
        let Section  = subDetails.filter(ele=>ele['SectionId']=='251');
                            if(Section.length!=0){
                                obj['BTBidTensionSumInsured']=Section[0].SumInsured;
                                obj['BTGrossProfitLc']=Section[0].GrossProfitLc;
                                obj['BTFirstLossPercentId']=Section[0].FirstLossPercentId;
                                obj['BTCollateralName']=Section[0].CollateralName;
                                obj['BTProjectSite']=Section[0].DescriptionOfRisk;
                                obj['BTCollateralType']=Section[0].IndustryType;
                                obj['IndustryType']=null;

                              if(info){
                                let entry = info.find(ele=>ele.SectionId=='251')
                                if(entry){
                                   obj['BTDescription'] = entry?.Description
                                   obj['BTPrincipal'] = entry?.PrincipalOwner
                                   obj['BTPeriodOfActivity'] = entry?.PeriodOfActivity
                                   obj['BTStartDate'] = entry?.StartDate
                                }
                              }
                              return obj
                            }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
        
          if(entry.BTProjectSite!='0' && entry.BTProjectSite!=null && entry.BTProjectSite!=''  && entry.BTProjectSite!='undefined' && entry.BTProjectSite!=undefined){
            let subEntry= {
              "SectionId": "251",
              "SectionName":"Bid and tender bond",
              "CoverId":"594",
              "SumInsured": entry.BTBidTensionSumInsured,
              "GrossProfitLc" : String(entry.BTGrossProfitLc).replaceAll(',',''),
              "FirstLossPercentId": entry.BTFirstLossPercentId,
              "CollateralName":entry.BTCollateralName,
              "DescriptionOfRisk":entry.BTProjectSite,
              "IndustryType": entry.BTCollateralType
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}