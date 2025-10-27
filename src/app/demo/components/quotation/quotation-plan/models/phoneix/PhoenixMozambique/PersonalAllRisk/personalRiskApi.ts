import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class PersonalAllRiskApiMozambique{
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
      let personalAllRiskList = subDetails.filter(ele => ele['SectionId'] == '230');
      if (personalAllRiskList.length != 0) {
        let clothes = personalAllRiskList.filter(ele => ele.CoverId == 430 || ele.CoverId == '430')
        if (clothes.length != 0) { obj['ClothingAndPersonalEffectsPhoenix'] = clothes[0].SumInsured;obj['ClothingAndPersonalEffectsPhoenixDesc'] = clothes[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = clothes[0].IndustryType; }

        let camping = personalAllRiskList.filter(ele => ele.CoverId == 433 || ele.CoverId == '433')
        if (camping.length != 0) { obj['CampingEquipmentPhoenix'] = camping[0].SumInsured;obj['CampingEquipmentPhoenixDesc'] = camping[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = camping[0].IndustryType; }

        let sporting = personalAllRiskList.filter(ele => ele.CoverId == 434 || ele.CoverId == '434')
        if (sporting.length != 0) { obj['SportingEquipmentPhoenix'] = sporting[0].SumInsured;obj['SportingEquipmentPhoenixDesc'] = sporting[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = sporting[0].IndustryType; }

        let jewellery = personalAllRiskList.filter(ele => ele.CoverId == 546 || ele.CoverId == '546')
        if (jewellery.length != 0) { obj['JewelleryPhoenix'] = jewellery[0].SumInsured;obj['JewelleryPhoenixDesc'] = jewellery[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = jewellery[0].IndustryType; }
        
        let mobile = personalAllRiskList.filter(ele => ele.CoverId == 545 || ele.CoverId == '545')
        if (mobile.length != 0) { obj['Mobilephone'] = mobile[0].SumInsured;obj['MobilephoneDesc'] = mobile[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = mobile[0].IndustryType; }
        return obj
      }
  }
  getSaveDetails(entry,ClaimCostList,IndustryId,industryTypeList,obj){
      if (entry.ClothingAndPersonalEffectsPhoenix != null && entry.ClothingAndPersonalEffectsPhoenix != '' && entry.ClothingAndPersonalEffectsPhoenix != '0') {
         
          
          let subEntry = {
            "SectionId": "230",
            "SectionName":"PERSONAL ALL RISKS",
            "CoverId": "430",
            "DescriptionOfRisk": entry.ClothingAndPersonalEffectsPhoenixDesc,
            "SumInsured": entry.ClothingAndPersonalEffectsPhoenix,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
          console.log(obj);
          
        }

        if (entry.CampingEquipmentPhoenix != null && entry.CampingEquipmentPhoenix != 0 && entry.CampingEquipmentPhoenix != '0') {
          let subEntry = {
            "SectionId": "230",
            "SectionName":"PERSONAL ALL RISKS",
            "CoverId": "433",
            "DescriptionOfRisk": entry.CampingEquipmentPhoenixDesc,
            "SumInsured": entry.CampingEquipmentPhoenix,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
        if (entry.SportingEquipmentPhoenix != null && entry.SportingEquipmentPhoenix != 0 && entry.SportingEquipmentPhoenix != '0') {
          let subEntry = {
            "SectionId": "230",
            "SectionName":"PERSONAL ALL RISKS",
            "CoverId": "434","DescriptionOfRisk": entry.SportingEquipmentPhoenixDesc,
            "SumInsured": entry.SportingEquipmentPhoenix,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
        if (entry.JewelleryPhoenix != null && entry.JewelleryPhoenix != 0 && entry.JewelleryPhoenix != '0') {
          let subEntry = {
            "SectionId": "230",
            "SectionName":"PERSONAL ALL RISKS",
            "CoverId": "546","DescriptionOfRisk": entry.JewelleryPhoenixDesc,
            "SumInsured": entry.JewelleryPhoenix,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
        if (entry.Mobilephone != null && entry.Mobilephone != 0 && entry.Mobilephone != '0') {
          let subEntry = {
            "SectionId": "230",
            "SectionName":"PERSONAL ALL RISKS",
            "CoverId": "545","DescriptionOfRisk": entry.MobilephoneDesc,
            "SumInsured": entry.Mobilephone,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
      return obj;
  }
fields:FormlyFieldConfig;
      
}