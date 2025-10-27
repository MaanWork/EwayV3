import { FormlyFieldConfig } from "@ngx-formly/core";


export class OfficeContentsCommercialApiMozambique{
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
        let OfficeContentSection  = subDetails.filter(ele=>ele['SectionId']=='198');
       if(OfficeContentSection.length!=0){
          let officeContents = OfficeContentSection.filter(ele=>ele.CoverId==369 || ele.CoverId=='369')
          if(officeContents.length!=0){obj['OfficeContents']=officeContents[0].SumInsured;obj['IndustryType']=null;if(officeContents[0]?.IndustryType!='0')obj['IndustryType']=officeContents[0].IndustryType;obj['OfficeContentsDesc']=officeContents[0].DescriptionOfRisk;}
          let officeTheftAspect = OfficeContentSection.filter(ele=>ele.CoverId==370 || ele.CoverId=='370')
          if(officeTheftAspect.length!=0){obj['TheftAspect']=officeTheftAspect[0].SumInsured;obj['IndustryType']=null;if(officeTheftAspect[0]?.IndustryType!='0')obj['IndustryType']=officeTheftAspect[0].IndustryType;}
          let officeWaterLeakage = OfficeContentSection.filter(ele=>ele.CoverId==371 || ele.CoverId=='371')
          if(officeWaterLeakage.length!=0){obj['WaterLeakage']=officeWaterLeakage[0].SumInsured;obj['IndustryType']=null;if(officeWaterLeakage[0]?.IndustryType!='0')obj['IndustryType']=officeWaterLeakage[0].IndustryType;}
          let officeAdditionalClaimsPreparationCosts = OfficeContentSection.filter(ele=>ele.CoverId==372 || ele.CoverId=='372')
          if(officeAdditionalClaimsPreparationCosts.length!=0){obj['OfficeClaimCosts']=officeAdditionalClaimsPreparationCosts[0].CategoryId;obj['IndustryType']=null;if(officeAdditionalClaimsPreparationCosts[0]?.IndustryType!='0')obj['IndustryType']=officeAdditionalClaimsPreparationCosts[0].IndustryType;}
          let officeLiabilityForLossOfDocuments = OfficeContentSection.filter(ele=>ele.CoverId==373 || ele.CoverId=='373')
          if(officeLiabilityForLossOfDocuments.length!=0){obj['LiabilityForLossOfDocuments']=officeLiabilityForLossOfDocuments[0].SumInsured;obj['IndustryType']=null;if(officeLiabilityForLossOfDocuments[0]?.IndustryType!='0')obj['IndustryType']=officeLiabilityForLossOfDocuments[0].IndustryType;}
          let officePowerSurge = OfficeContentSection.filter(ele=>ele.CoverId==356 || ele.CoverId=='356')
          if(officePowerSurge.length!=0){obj['OfficePowerSurge']=officePowerSurge[0].SumInsured;obj['IndustryType']=null;if(officePowerSurge[0]?.IndustryType!='0')obj['IndustryType']=officePowerSurge[0].IndustryType;}
        return obj
      }
    }
    getSaveDetails(entry,ClaimCostList,IndustryId,industryTypeList,obj){
      if (entry.OfficeContents != 0 && entry.OfficeContents != null && entry.OfficeContents != '' && entry.OfficeContentsDesc != null && entry.OfficeContentsDesc != '' && entry.OfficeContentsDesc != 'null') {
          let subEntry = {
            "SectionId": "198","SectionName":"Office Contents",
            "Status": "Y", "SumInsured": entry.OfficeContents,
            "CoverId": "369",
            "DescriptionOfRisk": entry.OfficeContentsDesc
          }
         if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
        if (entry.TheftAspect != null && entry.TheftAspect != 0 && entry.TheftAspect != '0') {
          let subEntry = {
            "SectionId": "198","SectionName":"Office Contents",
            "CoverId": "370",
            "SumInsured": entry.TheftAspect,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
        if (entry.WaterLeakage != null && entry.WaterLeakage != 0 && entry.WaterLeakage != '0') {
          let subEntry = {
            "SectionId": "198","SectionName":"Office Contents",
            "CoverId": "371",
            "SumInsured": entry.WaterLeakage,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
        if (entry.OfficePowerSurge != null && entry.OfficePowerSurge != 0 && entry.OfficePowerSurge != '0' && entry.OfficePowerSurge != 'null') {
          let subEntry = {
            "SectionId": "198","SectionName":"Office Contents",
            "CoverId": "356",
            "SumInsured": entry.OfficePowerSurge,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
        if (entry.OfficeClaimCosts != null) {
          let subEntry = {
            "SectionId": "198","SectionName":"Office Contents",
            "CoverId": "372","CategoryId":entry.OfficeClaimCosts,
            "SumInsured": ClaimCostList.find(ele => ele.Code == entry.OfficeClaimCosts)?.CodeDesc?.replaceAll(',', ''),
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
        if (entry.LiabilityForLossOfDocuments != null && entry.LiabilityForLossOfDocuments != 0 && entry.LiabilityForLossOfDocuments != '0') {
          let subEntry = {
            "SectionId": "198","SectionName":"Office Contents",
            "CoverId": "373",
            "SumInsured": entry.LiabilityForLossOfDocuments,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
      return obj;
    }
  fields:FormlyFieldConfig;
      
}