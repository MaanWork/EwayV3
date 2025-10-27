import { FormlyFieldConfig } from "@ngx-formly/core";

export class MoneyApiTanzaniya{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  policyfields:FormlyFieldConfig;
  policyfields1 :FormlyFieldConfig;
  extendsfields:FormlyFieldConfig
    constructor() {
      
    }
    
     getSaveDetails(entry, occupationList,industryTypeList,MoneyList,IndustryId, obj) {
      console.log(MoneyList);
      if(MoneyList.length > 0){
        for(let i = 0; i < MoneyList.length;i++){
          if(MoneyList[i].MoneyAnnualEstimate!=null && MoneyList[i].MoneyAnnualEstimate!='' && MoneyList[i].MoneyAnnualEstimate!='0' && MoneyList[i].MoneyAnnualEstimate!=0){
              let subObj = {
                "SectionId": "42",
                "SectionName": "Money",
                "BuildingUsageId": i,
                "IndustryId": IndustryId,
                "RiskId": null,
                "CoverId":"79",
                "SumInsured": MoneyList[i].MoneyAnnualEstimate,
                "RegionCode": MoneyList[i].RegionCode,
                "DistrictCode": MoneyList[i].DistrictCode,
                "CoveringDetails": MoneyList[i].CoveringDetails,
                "DescriptionOfRisk": MoneyList[i].DescriptionOfRisk
              }
              obj.SectionList.push(subObj);
            }
            if(MoneyList[i].MoneyInTransit!=null && MoneyList[i].MoneyInTransit!='' && MoneyList[i].MoneyInTransit!='0' && MoneyList[i].MoneyInTransit!=0){
              let subObj = {
                "SectionId": "42",
                "SectionName": "Money",
                 "BuildingUsageId": i,
                "IndustryId": IndustryId,
                "RiskId": null,
                "CoverId":"75",
                "SumInsured": MoneyList[i].MoneyInTransit,
                "RegionCode": MoneyList[i].RegionCode,
                "DistrictCode": MoneyList[i].DistrictCode,
                "CoveringDetails": MoneyList[i].CoveringDetails,
                "DescriptionOfRisk": MoneyList[i].DescriptionOfRisk
              }
              obj.SectionList.push(subObj);
            }
            if(MoneyList[i].MoneyCollector!=null && MoneyList[i].MoneyCollector!='' && MoneyList[i].MoneyCollector!='0' && MoneyList[i].MoneyCollector!=0){
              let subObj = {
                "SectionId": "42",
                "SectionName": "Money",
                 "BuildingUsageId": i,
                "IndustryId": IndustryId,
                "RiskId": null,
                "CoverId":"76",
                "SumInsured": MoneyList[i].MoneyCollector,
                "RegionCode": MoneyList[i].RegionCode,
                "DistrictCode": MoneyList[i].DistrictCode,
                "CoveringDetails": MoneyList[i].CoveringDetails,
                "DescriptionOfRisk": MoneyList[i].DescriptionOfRisk
              }
              obj.SectionList.push(subObj);
            }
            if(MoneyList[i].MoneySafeLimit!=null && MoneyList[i].MoneySafeLimit!='' && MoneyList[i].MoneySafeLimit!='0' && MoneyList[i].MoneySafeLimit!=0){
              let subObj = {
                "SectionId": "42",
                "SectionName": "Money",
                 "BuildingUsageId": i,
                "IndustryId": IndustryId,
                "RiskId": null,
                "CoverId":"81",
                "SumInsured": MoneyList[i].MoneySafeLimit,
                "RegionCode": MoneyList[i].RegionCode,
                "DistrictCode": MoneyList[i].DistrictCode,
                "CoveringDetails": MoneyList[i].CoveringDetails,
                "DescriptionOfRisk": MoneyList[i].DescriptionOfRisk
              }
              obj.SectionList.push(subObj);
            }
            if(MoneyList[i].MoneyOutofSafe!=null && MoneyList[i].MoneyOutofSafe!='' && MoneyList[i].MoneyOutofSafe!='0' && MoneyList[i].MoneyOutofSafe!=0){
              let subObj = {
                "SectionId": "42",
                "SectionName": "Money",
                 "BuildingUsageId": i,
                "IndustryId": IndustryId,
                "RiskId": null,
                "CoverId":"82",
                "SumInsured": MoneyList[i].MoneyOutofSafe,
                "RegionCode": MoneyList[i].RegionCode,
                "DistrictCode": MoneyList[i].DistrictCode,
                "CoveringDetails": MoneyList[i].CoveringDetails,
                "DescriptionOfRisk": MoneyList[i].DescriptionOfRisk
              }
              obj.SectionList.push(subObj);
            }
            if(MoneyList[i].MoneyDirectorResidence!=null && MoneyList[i].MoneyDirectorResidence!='' && MoneyList[i].MoneyDirectorResidence!='0' && MoneyList[i].MoneyDirectorResidence!=0){
              let subObj = {
                "SectionId": "42",
                "SectionName": "Money",
                 "BuildingUsageId": i,
                "IndustryId": IndustryId,
                "RiskId": null,
                "CoverId":"83",
                "SumInsured":MoneyList[i].MoneyDirectorResidence,
                "RegionCode": MoneyList[i].RegionCode,
                "DistrictCode": MoneyList[i].DistrictCode,
                "CoveringDetails": MoneyList[i].CoveringDetails,
                "DescriptionOfRisk": MoneyList[i].DescriptionOfRisk
              }
              obj.SectionList.push(subObj);
            }
            if(MoneyList[i].MoneyInSafe!=null && MoneyList[i].MoneyInSafe!='' && MoneyList[i].MoneyInSafe!='0' && MoneyList[i].MoneyInSafe!=0){
              let subObj = {
                "SectionId": "42",
                "SectionName": "Money",
                 "BuildingUsageId": i,
                "IndustryId": IndustryId,
                "RiskId": null,
                "CoverId":"77",
                "SumInsured": MoneyList[i].MoneyInSafe,
                "RegionCode": MoneyList[i].RegionCode,
                "DistrictCode": MoneyList[i].DistrictCode,
                "CoveringDetails": MoneyList[i].CoveringDetails,
                "DescriptionOfRisk": MoneyList[i].DescriptionOfRisk
              }
              obj.SectionList.push(subObj);
            }
        }
        
      }
      return obj;
      }
  fields:FormlyFieldConfig;
  getBusinessNameDesc(val,dropList){
    if(val!=null && val!='' && val!=undefined) return dropList.find(ele=>ele.Code==val)?.CodeDesc;
    else return '';
}
}