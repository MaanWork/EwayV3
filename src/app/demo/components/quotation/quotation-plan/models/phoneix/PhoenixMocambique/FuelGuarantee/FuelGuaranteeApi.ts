import { FormlyFieldConfig } from "@ngx-formly/core";

export class FuelGuaranteeApiNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
      console.log(info);
      
        let Section  = subDetails.filter(ele=>ele['SectionId']=='247');
                            if(Section.length!=0){
                              let BidDetails = Section.filter(ele=>ele.CoverId==595|| ele.CoverId=='595')
                              if(BidDetails.length!=0){
                                obj['FuelGuranteeSumInsured']=BidDetails[0].SumInsured;
                                obj['CollateralName']=BidDetails[0].CollateralName;
                                obj['IndustryType']=null;
                              }

                              if(info){ obj['CARDescription']=info[0].Description;}
                              if(info){ obj['CARAnnual']=info[0].AnnualOpen;}
                              if(info){ obj['CARPrincipal']=info[0].PrincipalOwner;}
                              if(info){ obj['CARLocationName']=info[0].LocationName;}
                              if(info){ obj['CARStartDate']=info[0].StartDate;}
                              if(info){ obj['CAREndDate']=info[0].CAREndDate;}
                              if(info){ obj['CARPeriodOfActivity']=info[0].PeriodOfActivity;}
                              if(info){ obj['EngineNumber']=info[0].EngineNumber;}  
                              

                              return obj
                            }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
        
          if(entry.FuelGuranteeSumInsured!='0' && entry.FuelGuranteeSumInsured!=null && entry.FuelGuranteeSumInsured!=''  && entry.FuelGuranteeSumInsured!='undefined' && entry.FuelGuranteeSumInsured!=undefined){
            let subEntry= {
              "SectionId": "247",
              "SectionName":"Fuel guarantee",
              "CoverId":"595",
              "SumInsured": entry.FuelGuranteeSumInsured,
              "CollateralName":entry.CollateralName
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}