import { FormlyFieldConfig } from "@ngx-formly/core";

export class PerformanceGuranteeApiPPMozambique{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
        let Section  = subDetails.filter(ele=>ele['SectionId']=='249');
                            if(Section.length!=0){
                                obj['PGBidTensionSumInsured']=Section[0].SumInsured;
                                obj['PGGrossProfitLc']=Section[0].GrossProfitLc;
                                obj['PGFirstLossPercentId']=Section[0].FirstLossPercentId;
                                obj['PGCollateralName']=Section[0].CollateralName;
                                obj['PGProjectSite']=Section[0].DescriptionOfRisk;
                                obj['IndustryType']=null;
                                if(info){
                                  let entry = info.find(ele=>ele.SectionId=='249')
                                  if(entry){
                                     obj['PGDescription'] = entry?.Description
                                    obj['PGPrincipal'] = entry?.PrincipalOwner
                                    obj['PGPeriodOfActivity'] = entry?.PeriodOfActivity
                                    obj['PGStartDate'] = entry?.StartDate
                                  }
                                }


                              return obj
                            }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
          if(entry.PGProjectSite!='0' && entry.PGProjectSite!=null && entry.PGProjectSite!=''  && entry.PGProjectSite!='undefined' && entry.PGProjectSite!=undefined){
            let subEntry= {
              "SectionId": "249",
              "SectionName":"Performance guarantee",
              "CoverId":"594",
              "SumInsured": entry.PGBidTensionSumInsured,
              "GrossProfitLc" : String(entry.PGGrossProfitLc).replaceAll(',',''),
              "FirstLossPercentId": entry.PGFirstLossPercentId,
              "CollateralName":entry.PGCollateralName,
              "DescriptionOfRisk":entry.PGProjectSite
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}