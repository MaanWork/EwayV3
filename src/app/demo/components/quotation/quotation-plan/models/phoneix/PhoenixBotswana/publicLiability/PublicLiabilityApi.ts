import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class PublicLiabilityApiBotswana{
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
      let PublicLiabilityPhoenix = subDetails.filter(ele => ele['SectionId'] == '54');
      if (PublicLiabilityPhoenix.length != 0) {
        let GeneralLiabilityList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '435');
        if (GeneralLiabilityList.length != 0) { obj['GeneralLiability'] = GeneralLiabilityList[0].CategoryId; }
        let LegalDefenceCostsList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '438');
        if (LegalDefenceCostsList.length != 0) { obj['LegalDefenceCosts'] = LegalDefenceCostsList[0].CategoryId; }
        let WrongfulArrestandDefamationList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '439');
        if (WrongfulArrestandDefamationList.length != 0) { obj['WrongfulArrestandDefamation'] = WrongfulArrestandDefamationList[0].CategoryId; }
        let SpreadofFireList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '440');
        if (SpreadofFireList.length != 0) { obj['SpreadofFire'] = SpreadofFireList[0].SumInsured; }
        let FoodandDrinkList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '441');
        if (FoodandDrinkList.length != 0) { obj['FoodandDrink'] = FoodandDrinkList[0].SumInsured; }
        let ForecourtServiceStationExtensionList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '442');
        if (ForecourtServiceStationExtensionList.length != 0) { obj['ForecourtServiceStationExtension'] = ForecourtServiceStationExtensionList[0].SumInsured; }
        let CarWashandValetExtensionList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '443');
        if (CarWashandValetExtensionList.length != 0) { obj['CarWashandValetExtension'] = CarWashandValetExtensionList[0].SumInsured; }
        let AdditionalclaimsPreparationCostsList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '372');
        if (AdditionalclaimsPreparationCostsList.length != 0) { obj['AdditionalclaimsPreparationCosts'] = AdditionalclaimsPreparationCostsList[0].SumInsured; }
        let ProductsLiabilityList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '436');
        if (ProductsLiabilityList.length != 0) { obj['ProductsLiability'] = ProductsLiabilityList[0].CategoryId; obj['ProductsLiabilityRevenue'] = ProductsLiabilityList[0].SumInsured; }
        let DefectiveWorkmanshipList = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '437');
        if (DefectiveWorkmanshipList.length != 0) { obj['DefectiveWorkmanship'] = DefectiveWorkmanshipList[0].CategoryId;obj['DefectiveWorkmanshipRevenue'] = DefectiveWorkmanshipList[0].SumInsured; }
        obj['IndustryType'] = PublicLiabilityPhoenix[0]['IndustryType']
        return obj
      }
    }
    getSaveDetails(entry,GeneralLiabilityList,LiabilityLegalList,ArrestList,IndustryId,industryTypeList,obj){
        if (entry.GeneralLiability != null && entry.GeneralLiability != 0 && entry.GeneralLiability != '0') {
          let SI = GeneralLiabilityList.find(ele=>ele.Code==entry.GeneralLiability)?.CodeDesc;
          if(SI){SI = String(SI).replaceAll(',','');
            SI = SI.split('.')[0]
          }
        
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "435",
            "SumInsured": SI,
            "CategoryId": entry.GeneralLiability,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
         if (entry.LegalDefenceCosts != null && entry.LegalDefenceCosts != 0 && entry.LegalDefenceCosts != '0') {
          let SI = LiabilityLegalList.find(ele=>ele.Code==entry.LegalDefenceCosts)?.CodeDesc;
          if(SI){SI = String(SI).replaceAll(',','');
            SI = SI.split('.')[0]
          }
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "438",
            "SumInsured": SI,
            "CategoryId": entry.LegalDefenceCosts,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
         if (entry.WrongfulArrestandDefamation != null && entry.WrongfulArrestandDefamation != 0 && entry.WrongfulArrestandDefamation != '0') {
          let SI = ArrestList.find(ele=>ele.Code==entry.WrongfulArrestandDefamation)?.CodeDesc;
          if(SI){SI = String(SI).replaceAll(',','');
            SI = SI.split('.')[0]
          }
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "439",
            "SumInsured": SI,
            "CategoryId": entry.WrongfulArrestandDefamation,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
         if (entry.ProductsLiability != null && entry.ProductsLiability != 0 && entry.ProductsLiability != '0') {
          let subEntry = {
            "SectionId": "54",
            "CoverId": "436","SectionName": "Public Liabilty",
            "CategoryId": entry.ProductsLiability,
            "CategoryDesc": GeneralLiabilityList.find(ele=>ele.Code==entry.ProductsLiability)?.CodeDesc,
            "SumInsured": entry.ProductsLiabilityRevenue,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
         if (entry.DefectiveWorkmanship != null && entry.DefectiveWorkmanship != 0 && entry.DefectiveWorkmanship != '0') {
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "437",
            "CategoryDesc": GeneralLiabilityList.find(ele=>ele.Code==entry.DefectiveWorkmanship)?.CodeDesc,
            "CategoryId": entry.DefectiveWorkmanship,
            "SumInsured": entry.DefectiveWorkmanshipRevenue,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
         if (entry.SpreadofFire != null && entry.SpreadofFire != 0 && entry.SpreadofFire != '0') {
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "440",
            "SumInsured": entry.SpreadofFire,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
         if (entry.FoodandDrink != null && entry.FoodandDrink != 0 && entry.FoodandDrink != '0') {
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "441",
            "SumInsured": entry.FoodandDrink,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
         if (entry.ForecourtServiceStationExtension != null && entry.ForecourtServiceStationExtension != 0 && entry.ForecourtServiceStationExtension != '0') {
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "442",
            "SumInsured": entry.ForecourtServiceStationExtension,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
         if (entry.CarWashandValetExtension != null && entry.CarWashandValetExtension != 0 && entry.CarWashandValetExtension != '0') {
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "443",
            "SumInsured": entry.CarWashandValetExtension,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
         if (entry.AdditionalclaimsPreparationCosts != null && entry.AdditionalclaimsPreparationCosts != 0 && entry.AdditionalclaimsPreparationCosts != '0') {
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "372",
            "SumInsured": entry.AdditionalclaimsPreparationCosts,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}