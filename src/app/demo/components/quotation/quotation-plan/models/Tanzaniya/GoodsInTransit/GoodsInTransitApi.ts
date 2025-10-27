import { FormlyFieldConfig } from "@ngx-formly/core";
export class GoodsInTransitApiTanzaniya{
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
        let GoodsInTranist = subDetails;
        if (GoodsInTranist.length != 0) {
          let TransitCoverage = GoodsInTranist
          if (TransitCoverage.length != 0) { 
            obj['GoodsInTransitSumInsured'] = TransitCoverage[0].SumInsured; 
            obj['GoodsOccupationType'] = TransitCoverage[0].BuildingUsageId; 
            obj['GoodsBuildingUsage'] = TransitCoverage[0].SectionId; 
            // obj['RegionCode'] = TransitCoverage[0].RegionCode; 
            // obj['DistrictCode'] = TransitCoverage[0].DistrictCode; 
            obj['RegionCode'] = TransitCoverage[0].WallType; 
            obj['DistrictCode'] = TransitCoverage[0].RoofType; 
            obj['DescriptionOfRisk'] = TransitCoverage[0].DescriptionOfRisk; 
             obj['RegionCode'] = TransitCoverage[0].GeographicalCoverage;
             obj['DistrictCode'] = TransitCoverage[0].ModeOfTransport;
            obj['IndustryType'] = null; 
            return obj
          }
        }
    }
    getSaveDetails(entry,ClaimCostList,industryTypeList,obj){
      console.log("Entry Obj",entry,ClaimCostList,obj)
      console.log(industryTypeList,"entryentryentryentryentryentry");
        if (entry.GoodsBuildingUsage != null && entry.GoodsBuildingUsage != '' && entry.GoodsBuildingUsage != undefined && entry.GoodsInTransitSumInsured != null && entry.GoodsInTransitSumInsured != '' && entry.GoodsInTransitSumInsured != undefined) {
          let coverId=null;
          let coverList = ClaimCostList.find(ele=>ele.Code==entry.GoodsBuildingUsage)?.CoverList
          if(coverList) coverId = coverList[0].CoverId
          // if(entry.GoodsBuildingUsage=='262' || entry.GoodsBuildingUsage==262) coverId='606';
          // if(entry.GoodsBuildingUsage=='263' || entry.GoodsBuildingUsage==263) coverId='607';
          // if(entry.GoodsBuildingUsage=='266' || entry.GoodsBuildingUsage==266) coverId='610';
          // if(entry.GoodsBuildingUsage=='267' || entry.GoodsBuildingUsage==267) coverId='611';
          //  if(entry.GoodsBuildingUsage=='254' || entry.GoodsBuildingUsage==254) coverId='598';
          //  if(entry.GoodsBuildingUsage=='255' || entry.GoodsBuildingUsage==255) coverId='599';
          //  if(entry.GoodsBuildingUsage=='260' || entry.GoodsBuildingUsage==260) coverId='604';
          //  if(entry.GoodsBuildingUsage=='261' || entry.GoodsBuildingUsage==261) coverId='605';
          //  if(entry.GoodsBuildingUsage=='264' || entry.GoodsBuildingUsage==264) coverId='608';
          //  if(entry.GoodsBuildingUsage=='265' || entry.GoodsBuildingUsage==265) coverId='609';
          //  if(entry.GoodsBuildingUsage=='252' || entry.GoodsBuildingUsage==252) coverId='596';
          //  if(entry.GoodsBuildingUsage=='253' || entry.GoodsBuildingUsage==253) coverId='597';
          //  if(entry.GoodsBuildingUsage=='258' || entry.GoodsBuildingUsage==258) coverId='602';
          //  if(entry.GoodsBuildingUsage=='259' || entry.GoodsBuildingUsage==259) coverId='603';
          //  if(entry.GoodsBuildingUsage=='256' || entry.GoodsOccupationType==256) coverId='600';
          //  if(entry.GoodsBuildingUsage=='257' || entry.GoodsBuildingUsage==257) coverId='601';
          let subEntry = {
              "SectionId": entry.GoodsBuildingUsage,
              "SectionName": ClaimCostList.find(ele => ele.Code == entry.GoodsBuildingUsage)?.CodeDesc,
              "CoverId": coverId,
              "SumInsured": entry.GoodsInTransitSumInsured,
              "BuildingUsageId": entry.GoodsOccupationType,
              "CategoryId": entry.GoodsOccupationType,
              "CategoryDesc": entry.GoodsOccupationTypeDesc,
              "Status": "Y",
              // "RegionCode": entry.RegionCode,
              // "DistrictCode": entry.DistrictCode,
              // "RegionCode": entry.RegionCode,
              "GeographicalCoverage": entry.RegionCode,
              "ModeOfTransport":  entry.DistrictCode,
              // "WallType": entry.RegionCode,
              // "RoofType":  entry.DistrictCode,
              // "DistrictCode": entry.DistrictCode,
              // "ContentId": entry.vehicleCount,
              // "ModeOfTransport": entry.TripsMonth,
              // "GeographicalCoverage": entry.MaximumLimitTrips,
              "DescriptionOfRisk": entry.DescriptionOfRisk
            }
            console.log("Edit Section",subEntry)
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
}