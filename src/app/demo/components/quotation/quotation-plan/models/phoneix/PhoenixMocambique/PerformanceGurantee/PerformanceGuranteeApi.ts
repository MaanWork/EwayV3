import { FormlyFieldConfig } from "@ngx-formly/core";

export class PerformanceGuranteeApiNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
        let Section  = subDetails.filter(ele=>ele['SectionId']=='249');
                            if(Section.length!=0){
                              let performace = Section.filter(ele=>ele.CoverId==594|| ele.CoverId=='594')
                              if(performace.length!=0){
                                obj['BidTensionSumInsured']=performace[0].SumInsured;
                                obj['GrossProfitLc']=performace[0].GrossProfitLc;
                                obj['FirstLossPercentId']=performace[0].FirstLossPercentId;
                                obj['CollateralName']=performace[0].CollateralName;
                                obj['DescriptionOfRisk']=performace[0].DescriptionOfRisk;
                                obj['IndustryType']=null;
                              }
                              
                              if(info){ obj['CARDescription']=info[0].Description;}
                              if(info){ obj['CARAnnual']=info[0].AnnualOpen;}
                              if(info){ obj['CARPrincipal']=info[0].PrincipalOwner;}
                              if(info){ obj['CARLocationName']=info[0].LocationName;}
                              if(info){ obj['CARStartDate']=info[0].StartDate;}
                              if(info){ obj['CAREndDate']=info[0].CAREndDate;}
                              if(info){ obj['CARPeriodOfActivity']=info[0].PeriodOfActivity;}

                              return obj
                            }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
        
          if(entry.ProjectSite!='0' && entry.ProjectSite!=null && entry.ProjectSite!=''  && entry.ProjectSite!='undefined' && entry.ProjectSite!=undefined){
            let subEntry= {
              "SectionId": "249",
              "SectionName":"Performance guarantee",
              "CoverId":"594",
              "SumInsured": entry.BidTensionSumInsured,
              "GrossProfitLc" : String(entry.GrossProfitLc).replaceAll(',',''),
              "FirstLossPercentId": entry.FirstLossPercentId,
              "CollateralName":entry.CollateralName,
              "DescriptionOfRisk":entry.ProjectSite
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}