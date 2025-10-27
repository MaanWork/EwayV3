import { FormlyFieldConfig } from "@ngx-formly/core";
export class BidTensionBondApiNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
    }
    getEditDetails(subDetails,obj,info){
        let Section  = subDetails.filter(ele=>ele['SectionId']=='251');
        if(Section.length!=0){
          let BidDetails = Section.filter(ele=>ele.CoverId==594|| ele.CoverId=='594')
          if(BidDetails.length!=0){
            obj['BidTensionSumInsured']=BidDetails[0].SumInsured;
            obj['GrossProfitLc']=BidDetails[0].GrossProfitLc;
            obj['FirstLossPercentId']=BidDetails[0].FirstLossPercentId;
            obj['CollateralName']=BidDetails[0].CollateralName;
            obj['ProjectSite']=BidDetails[0].DescriptionOfRisk;
            obj['BTCollateralType']=Section[0].IndustryType;
            obj['IndustryType']=null;
          }
          console.log("Edit Info:", info, obj)
          if(info){
              let entry = info.find(ele=>ele.LocationId==obj.LocationId)
              if(entry){
                if(entry?.Description){ obj['BTDescription']=entry.Description;}
                if(entry?.PrincipalOwner){ obj['BTPrincipal']=entry.PrincipalOwner;}
                if(entry?.StartDate){ obj['BTStartDate']=entry.StartDate;}
                if(entry?.PeriodOfActivity){ obj['BTPeriodOfActivity']=entry.PeriodOfActivity;}
                if(entry?.PeriodType){ obj['BTPeriodType']=entry.PeriodType;}
              }
          }
          return obj
        }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
           console.log(entry.BTCollateralType);
          if(entry.ProjectSite!='0' && entry.ProjectSite!=null && entry.ProjectSite!=''  && entry.ProjectSite!='undefined' && entry.ProjectSite!=undefined){
            let subEntry= {
              "SectionId": "251",
              "SectionName":"Bid and tender bond",
              "CoverId":"594",
              "SumInsured": entry.BidTensionSumInsured,
              "GrossProfitLc" : String(entry.GrossProfitLc).replaceAll(',',''),
              "FirstLossPercentId": entry.FirstLossPercentId,
              "CollateralName":entry.CollateralName,
              "DescriptionOfRisk":entry.ProjectSite,
              "IndustryType": entry.BTCollateralType
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
}