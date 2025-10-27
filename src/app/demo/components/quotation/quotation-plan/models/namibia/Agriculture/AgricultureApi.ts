import { FormlyFieldConfig } from "@ngx-formly/core";

export class AgricultureApiNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
       getEditDetails(subDetails,obj){
      let agriSection  = subDetails.filter(ele=>ele['SectionId']=='270');
      console.log(agriSection);
      
      if(agriSection.length!=0){
        obj['RegionCode']=agriSection[0].RegionCode;
        obj['DistrictCode']=agriSection[0].DistrictCode;
        obj['YaraPackageYN']=agriSection[0].WallType;
        obj['Crop']=agriSection[0].BuildingUsageId;
        obj['landSize']=agriSection[0].BuildingFloors;
        obj['AgricultureSumInsured']=agriSection[0].SumInsured;
        obj['agriGroupMember'] = agriSection[0].RoofType;
        obj['HACost'] = agriSection[0].DescriptionOfRisk;
        return obj
      }
}
    getSaveDetails(entry,obj,category){
          let subEntry= {
              "SectionId": "270",
              "SectionName":"Agriculture",
              "CoverId":"618",
              "RoofType": entry?.agriGroupMember,
              "ContentId": entry.DistributorCode,
              "ContentDesc": entry.DistributorName,
              "CategoryId": category,
              "RegionCode": entry.RegionCode,
              "DistrictCode": entry.DistrictCode,
              "WallType": entry.YaraPackageYN,
              "BuildingUsageId": entry.Crop,
              "BuildingFloors": entry.landSize,
              "DescriptionOfRisk": entry.HACost,
              "SumInsured": String(entry.AgricultureSumInsured)?.replaceAll(',', '')
            }
          obj.SectionList.push(subEntry);
        return obj;
    }
  fields:FormlyFieldConfig;
      
}