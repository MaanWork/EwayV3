import { FormlyFieldConfig } from "@ngx-formly/core";

export class CustomTransitApiPPNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
        let Section  = subDetails.filter(ele=>ele['SectionId']=='250');
                            if(Section.length!=0){
                                obj['CTBidTensionSumInsured']=Section[0].SumInsured;
                                obj['CTGrossProfitLc']=Section[0].GrossProfitLc;
                                obj['CTFirstLossPercentId']=Section[0].FirstLossPercentId;
                                obj['CTCollateralName']=Section[0].CollateralName;
                                obj['CTProjectSite']=Section[0].DescriptionOfRisk;
                                obj['CTCollateralType']=Section[0].IndustryType;
                                obj['IndustryType']=null;
                              if(info){
                                let entry = info.find(ele=>ele.SectionId=='250')
                                if(entry){
                                   obj['CTDescription'] = entry?.Description
                                   obj['CTPrincipal'] = entry?.PrincipalOwner
                                   obj['CTPeriodOfActivity'] = entry?.PeriodOfActivity
                                   obj['CTStartDate'] = entry?.StartDate
                                }
                              }
                             
                              obj['filled'] = Section.length > 0 ? true: false;
                              return obj
                            }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
        
          if(entry.CTProjectSite!='0' && entry.CTProjectSite!=null && entry.CTProjectSite!=''  && entry.CTProjectSite!='undefined' && entry.CTProjectSite!=undefined){
            let subEntry= {
              "SectionId": "250",
              "SectionName":"Customs and transit bond",
              "CoverId":"594",
              "SumInsured": entry.CTBidTensionSumInsured,
              "GrossProfitLc" : String(entry.CTGrossProfitLc).replaceAll(',', ''),
              "FirstLossPercentId": entry.CTFirstLossPercentId,
              "CollateralName":entry.CTCollateralName,
              "DescriptionOfRisk":entry.CTProjectSite,
              "IndustryType": entry.CTCollateralType
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}