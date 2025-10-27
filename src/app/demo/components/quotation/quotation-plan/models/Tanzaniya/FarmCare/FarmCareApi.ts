import { FormlyFieldConfig } from "@ngx-formly/core";

export class FarmCareApiTanzaniya{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
       getEditDetails(subDetails,obj){
      let farmCareSection  = subDetails.filter(ele=>ele['SectionId']=='243');
      if(farmCareSection.length!=0){
        obj['DistributorCode']=farmCareSection[0].ContentId;
        obj['DistributorName']=farmCareSection[0].ContentDesc;
        obj['CoverageID']=farmCareSection[0].CategoryId;
        obj['RegionCode']=farmCareSection[0].RegionCode;
        obj['DistrictCode']=farmCareSection[0].DistrictCode;
        obj['YaraPackageYN']=farmCareSection[0].WallType;
        obj['Crop']=farmCareSection[0].BuildingUsageId;
        obj['NoOfAcres']=farmCareSection[0].BuildingFloors;
        obj['farmCareSumInsured']=farmCareSection[0].SumInsured;
        obj['FirstLossPercentId']=farmCareSection[0].FirstLossPercentId;
        return obj
      }
}
    getSaveDetails(entry,obj){
          let sumInsured = null;
          sumInsured = entry.farmCareSumInsured;
          let subEntry= {
              "SectionId": "243",
              "SectionName":"Farm Care",
              "CoverId":"572",
              "ContentId": entry.DistributorCode,
              "ContentDesc": entry.DistributorName,
              "CategoryId": entry.CoverageID,
              "RegionCode": entry.RegionCode,
              "DistrictCode": entry.DistrictCode,
              "WallType": entry.YaraPackageYN,
              "BuildingUsageId": entry.Crop,
              "BuildingFloors": entry.NoOfAcres,
              "SumInsured": sumInsured,
              "FirstLossPercentId": entry.FirstLossPercentId
            }
          obj.SectionList.push(subEntry);
        return obj;
    }
  fields:FormlyFieldConfig;
      
}