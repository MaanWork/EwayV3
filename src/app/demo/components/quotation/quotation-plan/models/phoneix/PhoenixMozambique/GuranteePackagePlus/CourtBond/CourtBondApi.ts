import { FormlyFieldConfig } from "@ngx-formly/core";

export class CourtBondApiPPMozambique{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
        let Section  = subDetails.filter(ele=>ele['SectionId']=='248');
                            if(Section.length!=0){
                                
                                obj['CBCourtBondOccupation']=Section[0].CategoryId;
                                obj['CBGrossProfitLc']=Section[0].SumInsured;
                              if(info){
                                  let entry = info.find(ele=>ele.SectionId=='248')
                                  if(entry){
                                    obj['CBPrincipal'] = entry?.PrincipalOwner;
                                    obj['CBDescription'] = entry?.Description;
                                    obj['CBStartDate'] = entry?.StartDate;
                                  }
                                }

                              return obj
                            }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
        
          if(entry.CBGrossProfitLc!='0' && entry.CBGrossProfitLc!=null && entry.CBGrossProfitLc!=''  && entry.CBGrossProfitLc!='undefined' && entry.CBGrossProfitLc!=undefined){
            let subEntry= {
              "SectionId": "248",
              "SectionName":"Court bond",
              "CoverId":"595",
              "SumInsured": String(entry.CBGrossProfitLc).replaceAll(',', ''), 
              "CategoryId" : entry.CBCourtBondOccupation,
      
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}