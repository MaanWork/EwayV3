import { FormlyFieldConfig } from "@ngx-formly/core";


export class PlantAllRiskEngineeringSwazilandApi{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  policyfields:FormlyFieldConfig;
  policyfields1 :FormlyFieldConfig;
  extendsfields:FormlyFieldConfig
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
        let plantSection  = subDetails.filter(ele=>ele['SectionId']=='80');
        if(plantSection.length!=0){
          let building = plantSection.filter(ele=>ele.CoverId==105 || ele.CoverId=='105')
          if(building.length!=0){obj['BuildingCover']=building[0].SumInsured;obj['IndustryType']=null;if(building[0]?.IndustryType!='0')obj['IndustryType']=building[0].IndustryType;}
          let Continuinghirecharges = plantSection.filter(ele=>ele.CoverId==570 || ele.CoverId=='570')
          if(Continuinghirecharges.length!=0){obj['Continuinghirecharges']=Continuinghirecharges[0].SumInsured;obj['IndustryType']=null;if(Continuinghirecharges[0]?.IndustryType!='0')obj['IndustryType']=Continuinghirecharges[0].IndustryType;}
          let Temporaryhire = plantSection.filter(ele=>ele.CoverId==571 || ele.CoverId=='571')
          if(Temporaryhire.length!=0){obj['Temporaryhire']=Temporaryhire[0].SumInsured;obj['IndustryType']=null;if(Temporaryhire[0]?.IndustryType!='0')obj['IndustryType']=Temporaryhire[0].IndustryType;}
          if(info){ obj['CARDescription']=info[0]?.Description;}
          if(info){ obj['BasisOfValuationDesc']=info[0]?.BasisOfValuationDesc;}
          if(info){ obj['EngineNumber']=info[0]?.EngineNumber;}
          if(info){ obj['OwnershipDesc']=info[0]?.OwnershipDesc;}
          if(info){ obj['CARPrincipal']=info[0]?.Manufacture;}
          if(info){ obj['SerialNumber']=info[0]?.SerialNumber;}
          if(info){ obj['YearOfManufacture']=info[0]?.YearOfManufacture;}
          if(info){ obj['LocationName']=info[0]?.LocationName;}
        return obj
      }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
        if(entry.BuildingCover!='0' && entry.BuildingCover!=null && entry.BuildingCover!=''){
            let subEntry= {
              "SectionId": "80",
              "SectionName":"Plant All Risk",
              "CoverId":"105",
              "SumInsured": entry.BuildingCover
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if(entry.Continuinghirecharges!='0' && entry.Continuinghirecharges!=null && entry.Continuinghirecharges!=''){
            let subEntry= {
              "SectionId": "80",
              "SectionName":"Plant All Risk",
              "CoverId":"570",
              "SumInsured": entry.Continuinghirecharges
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if(entry.Temporaryhire!='0' && entry.Temporaryhire!=null && entry.Temporaryhire!=''){
            let subEntry= {
              "SectionId": "80",
              "SectionName":"Plant All Risk",
              "CoverId":"571",
              "SumInsured": entry.Temporaryhire
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}