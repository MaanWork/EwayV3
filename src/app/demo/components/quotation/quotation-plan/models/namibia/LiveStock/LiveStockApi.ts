import { FormlyFieldConfig } from "@ngx-formly/core";

export class LiveStockApiNamibia{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
       getEditDetails(subDetails,obj){
      let agriSection  = subDetails.filter(ele=>ele['SectionId']=='273');
      console.log(agriSection);
      
      if(agriSection.length!=0){
        obj['RegionCode']=agriSection[0].RegionCode;
        obj['DistrictCode']=agriSection[0].DistrictCode;
        obj['LiveStock']=agriSection[0].WallType;
        obj['StockType']=agriSection[0].BuildingUsageId;
        obj['NooFLiveStock']=agriSection[0].BuildingFloors;
        obj['LiveStockSumInsured']=agriSection[0].SumInsured;
        obj['agriGroupMember'] = agriSection[0].RoofType;
        obj['StockPrice'] = agriSection[0].DescriptionOfRisk;
        return obj
      }
}
    getSaveDetails(entry,obj,category){
          console.log(entry);
          
          let subEntry= {
              "SectionId": "273",
              "SectionName":"Livestock",
              "CoverId":"630",
              "ContentId": entry.DistributorCode,
              "ContentDesc": entry.DistributorName,
              "CategoryId": entry.LiveStock,
              "RegionCode": entry.RegionCode,
              "DistrictCode": entry.DistrictCode,
              "WallType": entry.LiveStock,
              "BuildingUsageId": entry.StockType,
              "BuildingFloors": entry.NooFLiveStock,
              "DescriptionOfRisk": entry.StockPrice,
              "SumInsured": (entry.LiveStockSumInsured).replaceAll(',', '')
            }
          obj.SectionList.push(subEntry);
        return obj;
    }
  fields:FormlyFieldConfig;
      
}