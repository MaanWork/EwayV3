import { FormlyFieldConfig } from "@ngx-formly/core";

export class CourtBondApiNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
        let Section  = subDetails.filter(ele=>ele['SectionId']=='248');
                            if(Section.length!=0){
                              let BidDetails = Section.filter(ele=>ele.CoverId==595|| ele.CoverId=='595')
                              if(BidDetails.length!=0){
                                console.log(BidDetails);
                                
                                obj['CourtBondOccupation']=BidDetails[0].CategoryId;
                                obj['GrossProfitLc']=BidDetails[0].SumInsured;
                               
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
        
          if(entry.GrossProfitLc!='0' && entry.GrossProfitLc!=null && entry.GrossProfitLc!=''  && entry.GrossProfitLc!='undefined' && entry.GrossProfitLc!=undefined){
            let subEntry= {
              "SectionId": "248",
              "SectionName":"Court bond",
              "CoverId":"595",
              "SumInsured": String(entry.GrossProfitLc).replaceAll(',', ''), 
              "CategoryId" : entry.CourtBondOccupation,
      
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}