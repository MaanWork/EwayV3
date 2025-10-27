import { FormlyFieldConfig } from "@ngx-formly/core";

export class FuelGuaranteeApiPPSwaziland{
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
                                obj['FuelGuranteeSumInsured']=Section[0].SumInsured;
                                obj['CollateralName']=Section[0].CollateralName;
                                obj['IndustryType']=null;
                              if(info){
                                let entry = info.find(ele=>ele.SectionId=='247')
                                if(entry){
                                   obj['FGDescription'] = entry?.Description
                                   obj['FGPrincipal'] = entry?.PrincipalOwner
                                   obj['FGPeriodOfActivity'] = entry?.PeriodOfActivity
                                   obj['FGStartDate'] = entry?.StartDate
                                }
                              }
                              // if(info){ obj['FGDescription']=info[0].Description;}
                              // if(info){ obj['CARAnnual']=info[0].AnnualOpen;}
                              // if(info){ obj['CARPrincipal']=info[0].PrincipalOwner;}
                              // if(info){ obj['CARLocationName']=info[0].LocationName;}
                              // if(info){ obj['CARStartDate']=info[0].StartDate;}
                              // if(info){ obj['CAREndDate']=info[0].CAREndDate;}
                              // if(info){ obj['CARPeriodOfActivity']=info[0].PeriodOfActivity;}
                              // if(info){ obj['EngineNumber']=info[0].EngineNumber;}  
                              

                              return obj
                            }
    }
    getSaveDetails(entry,obj){
        
          if(entry.FGSumInsured!='0' && entry.FGSumInsured!=null && entry.FGSumInsured!=''  && entry.FGSumInsured!='undefined' && entry.FGSumInsured!=undefined){
            let subEntry= {
              "SectionId": "247",
              "SectionName":"Fuel guarantee",
              "CoverId":"595",
              "SumInsured": entry.FGSumInsured,
              "CollateralName":entry.FGCollateral
            }
            
            obj.SectionList.push(subEntry);
          }
       
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}