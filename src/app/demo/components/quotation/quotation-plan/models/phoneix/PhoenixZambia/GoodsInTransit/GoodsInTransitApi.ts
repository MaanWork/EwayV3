import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class GoodsInTransitApiPhoenix{
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
          let GoodsInTranist = subDetails.filter(ele => ele['SectionId'] == '46');
          if (GoodsInTranist.length != 0) {
            let TransitCoverage = GoodsInTranist.filter(ele => ele.CoverId == 469 || ele.CoverId == '469')
            if (TransitCoverage.length != 0) { 
              obj['GoodsInTransitSumInsured'] = TransitCoverage[0].SumInsured; 
              obj['TransitCoverage'] = TransitCoverage[0].BuildingUsageId; 
              obj['CoverageType'] = TransitCoverage[0].CategoryId; 
              obj['vehicleCount'] = TransitCoverage[0].ContentId; 
              obj['MaximumLimitTrips'] = TransitCoverage[0].GeographicalCoverage; 
              obj['TripsMonth'] = TransitCoverage[0].ModeOfTransport; 
              obj['Commodity'] = TransitCoverage[0].DescriptionOfRisk; 
              obj['IndustryType'] = null; 
              if (TransitCoverage[0]?.IndustryType != '0') obj['IndustryType'] = TransitCoverage[0].IndustryType; }
              let  FireExtingUserCharge= GoodsInTranist.filter(ele => ele.CoverId == 477 || ele.CoverId == '477')
              if (FireExtingUserCharge.length != 0) { obj['FireExtingUserCharge'] = FireExtingUserCharge[0].SumInsured; obj['IndustryType'] = null; if (FireExtingUserCharge[0]?.IndustryType != '0') obj['IndustryType'] = FireExtingUserCharge[0].IndustryType; }
              let  DetoriationRemoval= GoodsInTranist.filter(ele => ele.CoverId == 478 || ele.CoverId == '478')
              if (DetoriationRemoval.length != 0) { obj['DetoriationRemoval'] = DetoriationRemoval[0].SumInsured; obj['IndustryType'] = null; if (DetoriationRemoval[0]?.IndustryType != '0') obj['IndustryType'] = DetoriationRemoval[0].IndustryType; }
              let  ClaimPreparationCost= GoodsInTranist.filter(ele => ele.CoverId == 374 || ele.CoverId == '374')
              if (ClaimPreparationCost.length != 0) { obj['GITClaimPreparationCost'] = ClaimPreparationCost[0].CategoryId; obj['IndustryType'] = null; if (ClaimPreparationCost[0]?.IndustryType != '0') obj['IndustryType'] = ClaimPreparationCost[0].IndustryType; }
              return obj
          }
      }
      getSaveDetails(entry,ClaimCostList,industryTypeList,obj){
        if (entry.TransitCoverage != null && entry.TransitCoverage != '' && entry.TransitCoverage != undefined && entry.CoverageType != null && entry.CoverageType != '' && entry.CoverageType != undefined && entry.GoodsInTransitSumInsured != null && entry.GoodsInTransitSumInsured != '' && entry.GoodsInTransitSumInsured != undefined) {
            let subEntry = {
              "SectionId": "46",
              "SectionName": "Goods In Transit",
              "CoverId": "469",
              "SumInsured": entry.GoodsInTransitSumInsured,
              "BuildingUsageId": entry.TransitCoverage,
              "CategoryId": entry.CoverageType,
              "Status": "Y",
              "ContentId": entry.vehicleCount,
              "ModeOfTransport": entry.TripsMonth,
              "GeographicalCoverage": entry.MaximumLimitTrips,
              "DescriptionOfRisk": entry.Commodity
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
        }
        if (entry.GITClaimPreparationCost != null && entry.GITClaimPreparationCost != '' && entry.GITClaimPreparationCost != undefined && entry.CoverageType!=undefined) {
          let sumInsured = ClaimCostList.find(ele => ele.Code == entry.GITClaimPreparationCost)?.CodeDesc?.replaceAll(',', '');
          if(sumInsured){
              let subEntry = {
                "SectionId": "46",
                "SectionName": "Goods In Transit",
                "CoverId": "374",
                "SumInsured": ClaimCostList.find(ele => ele.Code == entry.GITClaimPreparationCost)?.CodeDesc?.replaceAll(',', ''),
                "Status": "Y",
                "ContentId": entry.vehicleCount,
                "ModeOfTransport": entry.TripsMonth,
                "GeographicalCoverage": entry.MaximumLimitTrips,
                "CategoryId": entry.GITClaimPreparationCost,
              }
              if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
              obj.SectionList.push(subEntry);
          }
        }
        if (entry.DetoriationRemoval != null && entry.DetoriationRemoval != '' && entry.DetoriationRemoval != undefined) {
          let subEntry = {
            "SectionId": "46",
            "SectionName": "Goods In Transit",
            "CoverId": "478",
            "SumInsured": entry.DetoriationRemoval,
            "Status": "Y",
            "ContentId": entry.vehicleCount,
            "ModeOfTransport": entry.TripsMonth,
            "GeographicalCoverage": entry.MaximumLimitTrips,
          }
          if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
          obj.SectionList.push(subEntry);
        }
        if (entry.FireExtingUserCharge != null && entry.FireExtingUserCharge != '' && entry.FireExtingUserCharge != undefined) {
          let subEntry = {
            "SectionId": "46",
            "SectionName": "Goods In Transit",
            "CoverId": "477",
            "SumInsured": entry.FireExtingUserCharge,
            "Status": "Y",
            "ContentId": entry.vehicleCount,
            "ModeOfTransport": entry.TripsMonth,
            "GeographicalCoverage": entry.MaximumLimitTrips,
          }
          if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
          obj.SectionList.push(subEntry);
        }
      return obj;
    }
    fields:FormlyFieldConfig;
      
}