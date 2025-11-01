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
      getEditDetails(subDetails, obj) {
          let Money  = subDetails.filter(ele=>ele['SectionId']=='42');
          if(Money.length!=0){
              let majorMoney = Money.filter(ele=>ele.CoverId==424 || ele.CoverId=='424')
              if(majorMoney.length!=0){obj['MajorMoneyLimit']=majorMoney[0].SumInsured;obj['MajorMoneyLimitDesc']=majorMoney[0].DescriptionOfRisk;obj['SafeLockerGrade']=majorMoney[0].CategoryId;obj['IndustryType']=null;if(majorMoney[0]?.IndustryType!='0')obj['IndustryType']=majorMoney[0].IndustryType;}
              let seasonalIncrease = Money.filter(ele=>ele.CoverId==425 || ele.CoverId=='425')
              if(seasonalIncrease.length!=0){obj['SeasonalIncrease']=seasonalIncrease[0].SumInsured;obj['SeasonalIncreaseDesc']=seasonalIncrease[0].DescriptionOfRisk;obj['IndustryType']=null;if(seasonalIncrease[0]?.IndustryType!='0')obj['IndustryType']=seasonalIncrease[0].IndustryType;obj['SafeLockerGrade']=seasonalIncrease[0].CategoryId;}
              let LocksKeysofReceptacle = Money.filter(ele=>ele.CoverId==422 || ele.CoverId=='422')
              if(LocksKeysofReceptacle.length!=0){obj['LocksKeysofReceptacle']=LocksKeysofReceptacle[0].SumInsured;obj['LocksKeysofReceptacleDesc']=LocksKeysofReceptacle[0].DescriptionOfRisk;obj['IndustryType']=null;if(LocksKeysofReceptacle[0]?.IndustryType!='0')obj['IndustryType']=LocksKeysofReceptacle[0].IndustryType;}
              let ClothingPersonalEffectsofEmployees = Money.filter(ele=>ele.CoverId==427 || ele.CoverId=='427')
              if(ClothingPersonalEffectsofEmployees.length!=0){obj['ClothingPersonalEffectsofEmployees']=ClothingPersonalEffectsofEmployees[0].SumInsured;obj['ClothingPersonalEffectsofEmployeesDesc']=ClothingPersonalEffectsofEmployees[0].DescriptionOfRisk;obj['IndustryType']=null;if(ClothingPersonalEffectsofEmployees[0]?.IndustryType!='0')obj['IndustryType']=ClothingPersonalEffectsofEmployees[0].IndustryType;}
              let Receptaclesinexcessofpolicylimit = Money.filter(ele=>ele.CoverId==426 || ele.CoverId=='426')
              if(Receptaclesinexcessofpolicylimit.length!=0){obj['Receptaclesinexcessofpolicylimit']=Receptaclesinexcessofpolicylimit[0].SumInsured;obj['ReceptaclesinexcessofpolicylimitDesc']=Receptaclesinexcessofpolicylimit[0].DescriptionOfRisk;obj['IndustryType']=null;if(Receptaclesinexcessofpolicylimit[0]?.IndustryType!='0')obj['IndustryType']=Receptaclesinexcessofpolicylimit[0].IndustryType;}
              return obj
          }
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