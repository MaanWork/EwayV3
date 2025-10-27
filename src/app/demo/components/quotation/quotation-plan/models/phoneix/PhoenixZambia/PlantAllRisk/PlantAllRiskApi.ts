import { FormlyFieldConfig } from "@ngx-formly/core";

export class PlantAllRiskZambiaApi{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  policyfields:FormlyFieldConfig;
  policyfields1 :FormlyFieldConfig;
  extendsfields:FormlyFieldConfig
    constructor() {
      
    }
    getEditDetails(subDetails,obj){
        let plantSection  = subDetails.filter(ele=>ele['SectionId']=='80');
        if(plantSection.length!=0){
          let building = plantSection.filter(ele=>ele.CoverId==105 || ele.CoverId=='105')
          if(building.length!=0){
            obj['BuildingCover']=building[0].SumInsured;
            obj['PlantConstructionType']=building[0].CategoryId; obj['PlantDescription']=building[0].DescriptionOfRisk;
            obj['PlantSumInsured']=building[0].SumInsured;
            obj['IndustryType']=null;if(building[0]?.IndustryType!='0')obj['IndustryType']=building[0].IndustryType;
          }
        
        return obj
      }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj,phonixWallType){
        if(entry.PlantSumInsured!='0' && entry.PlantSumInsured!=null && entry.PlantSumInsured!=''){
            let subEntry= {
              "SectionId": "80",
              "SectionName":"Plant All Risk",
              "CoverId":"105",
              "SumInsured": entry.PlantSumInsured,
              "CategoryId": entry.PlantConstructionType,
              "CategoryDesc": phonixWallType.find(ele => ele.value == entry.PlantConstructionType).CodeDesc ,
              "DescriptionOfRisk": entry.PlantDescription
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          // if(entry.Continuinghirecharges!='0' && entry.Continuinghirecharges!=null && entry.Continuinghirecharges!=''){
          //   let subEntry= {
          //     "SectionId": "80",
          //     "SectionName":"Plant All Risk",
          //     "CoverId":"570",
          //     "SumInsured": entry.Continuinghirecharges,
          //     "CategoryId":entry.PlantConstructionType,
          //     "CategoryDesc":phonixWallType.find(ele => ele.Code == entry.PlantConstructionType).CodeDesc
          //   }
          //   if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          //   obj.SectionList.push(subEntry);
          // }
          // if(entry.Temporaryhire!='0' && entry.Temporaryhire!=null && entry.Temporaryhire!=''){
          //   let subEntry= {
          //     "SectionId": "80",
          //     "SectionName":"Plant All Risk",
          //     "CoverId":"571",
          //     "SumInsured": entry.Temporaryhire,
          //     "CategoryId":entry.PlantConstructionType,
          //     "CategoryDesc":phonixWallType.find(ele => ele.Code == entry.PlantConstructionType).CodeDesc
          //   }
          //   if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          //   obj.SectionList.push(subEntry);
          // }
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}