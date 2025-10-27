import { FormlyFieldConfig } from "@ngx-formly/core";

export class ConstructionAllRiskUptoApiTanzaniya{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
      let CARSection  = subDetails.filter(ele=>ele['SectionId']=='232');
      if(CARSection.length!=0){
        obj['CARuptoConstruction']=CARSection[0].CategoryId;
        obj['IndustryType']=CARSection[0].IndustryType;
        obj['CARuptoStoreys']=CARSection[0].BuildingFloors;
        obj['CARuptoMonths']=CARSection[0].BuildingAge;
        obj['CARuptoSumInsured']=CARSection[0].SumInsured;
        obj['EARMaintenance']=CARSection[0].DescriptionOfRisk;
        if(info){
            if(info.length!=0){
            if(info){ obj['CARDescription']=info[0].Description;}
            if(info){ obj['CARAnnual']=info[0].AnnualOpen;}
            if(info){ obj['CARPrincipal']=info[0].PrincipalOwner;}
            if(info){ obj['CARLocationName']=info[0].LocationName;}
            if(info){ obj['CARStartDate']=info[0].StartDate;}
            if(info){ obj['CARPeriodOfActivity']=info[0].PeriodOfActivity;}
            }
        }
        return obj
      }
}
    getSaveDetails(entry,IndustryId,industryTypeList,buildingContactorTypes,obj){  
          if(entry.CARuptoConstruction!='0' && entry.CARuptoConstruction!=null && entry.CARuptoConstruction!='' && entry.CARuptoStoreys!='0' && entry.CARuptoStoreys!=null && entry.CARuptoStoreys!='' && entry.CARuptoMonths!='0' && entry.CARuptoMonths!=null && entry.CARuptoMonths!='' && entry.CARuptoSumInsured!='0' && entry.CARuptoSumInsured!=null && entry.CARuptoSumInsured!=''){
            let subEntry= {

              "SectionId": "232",
              "SectionName":"Contractors All Risks",
              "CoverId":"566",
              "SumInsured": entry.CARuptoSumInsured,
              "CategoryId": entry.CARuptoConstruction,
              "CategoryDesc": buildingContactorTypes.find(ele => ele.Code == entry.CARuptoConstruction)?.CodeDesc ,
              "BuildingUsageId": entry.CARuptoConstruction,
              "BuildingFloors": entry.CARuptoStoreys,
              "BuildingBuildYear": entry.CARuptoMonths,
              "DescriptionOfRisk": entry.EARMaintenance
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
        
        
        return obj;
    }
  fields:FormlyFieldConfig;
      
}