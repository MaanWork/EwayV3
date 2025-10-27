import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class BusinessAllRiskApiPhoenix{
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
       
        let BussinessAllRiskList = subDetails.filter(ele => ele['SectionId'] == '223');
        if (BussinessAllRiskList.length != 0) {
          let elecEquipment = BussinessAllRiskList.filter(ele => ele.CoverId == 430 || ele.CoverId == '430')
          if (elecEquipment.length != 0) { obj['ClothingAndPersonalEffectsPhoenix'] = elecEquipment[0].SumInsured;obj['ClothingAndPersonalEffectsPhoenixDesc'] = elecEquipment[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = elecEquipment[0].IndustryType; }

          let elecEquipment1 = BussinessAllRiskList.filter(ele => ele.CoverId == 431 || ele.CoverId == '431')
          if (elecEquipment1.length != 0) { obj['ArticlesKeptOnPremisesPhoenix'] = elecEquipment1[0].SumInsured;obj['ArticlesKeptOnPremisesPhoenixDesc'] = elecEquipment1[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = elecEquipment1[0].IndustryType; }

          let elecEquipment2 = BussinessAllRiskList.filter(ele => ele.CoverId == 90 || ele.CoverId == '90')
          if (elecEquipment2.length != 0) { obj['ElectronicEquipmentPhoenix'] = elecEquipment2[0].SumInsured;obj['ElectronicEquipmentPhoenixDesc'] = elecEquipment2[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = elecEquipment2[0].IndustryType; }

          let elecEquipment3 = BussinessAllRiskList.filter(ele => ele.CoverId == 432 || ele.CoverId == '432')
          if (elecEquipment3.length != 0) { obj['CellularPhonesPhoenix'] = elecEquipment3[0].SumInsured;obj['CellularPhonesPhoenixDesc'] = elecEquipment3[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = elecEquipment3[0].IndustryType; }

          let elecEquipment4 = BussinessAllRiskList.filter(ele => ele.CoverId == 433 || ele.CoverId == '433')
          if (elecEquipment4.length != 0) { obj['CampingEquipmentPhoenix'] = elecEquipment4[0].SumInsured;obj['CampingEquipmentPhoenixDesc'] = elecEquipment4[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = elecEquipment4[0].IndustryType; }

          let elecEquipment5 = BussinessAllRiskList.filter(ele => ele.CoverId == 434 || ele.CoverId == '434')
          if (elecEquipment5.length != 0) { obj['SportingEquipmentPhoenix'] = elecEquipment5[0].SumInsured;obj['SportingEquipmentPhoenixDesc'] = elecEquipment5[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = elecEquipment4[0].IndustryType; }

          let elecEquipment6 = BussinessAllRiskList.filter(ele => ele.CoverId == 22 || ele.CoverId == '22')
          if (elecEquipment6.length != 0) { obj['JewelleryPhoenix'] = elecEquipment6[0].SumInsured;obj['JewelleryPhoenixDesc'] = elecEquipment6[0].DescriptionOfRisk; obj['IndustryType'] = null; obj['IndustryType'] = elecEquipment4[0].IndustryType; }
          return obj
        }
    }
    getSaveDetails(entry,ClaimCostList,industryTypeList,obj){
        

        if (entry.ClothingAndPersonalEffectsPhoenix != null && entry.ClothingAndPersonalEffectsPhoenix != '' && entry.ClothingAndPersonalEffectsPhoenix != '0') {
           
            
            let subEntry = {
              "SectionId": "223",
              "SectionName":"Business All Risk",
              "CoverId": "430",
              "DescriptionOfRisk": entry.ClothingAndPersonalEffectsPhoenixDesc,
              "SumInsured": entry.ClothingAndPersonalEffectsPhoenix,
              "Status": "Y",
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
            console.log(obj);
            
          }
  
          if (entry.ArticlesKeptOnPremisesPhoenix != null && entry.ArticlesKeptOnPremisesPhoenix != 0 && entry.ArticlesKeptOnPremisesPhoenix != '0') {
            let subEntry = {
              "SectionId": "223",
              "SectionName":"Business All Risk",
              "CoverId": "431",
              "DescriptionOfRisk": entry.ArticlesKeptOnPremisesPhoenixDesc,
              "SumInsured": entry.ArticlesKeptOnPremisesPhoenix,
              "Status": "Y",
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
  
          if (entry.ElectronicEquipmentPhoenix != null && entry.ElectronicEquipmentPhoenix != 0 && entry.ElectronicEquipmentPhoenix != '0') {
            let subEntry = {
              "SectionId": "223",
              "SectionName":"Business All Risk",
              "CoverId": "90",
              "DescriptionOfRisk": entry.ElectronicEquipmentPhoenixDesc,
              "SumInsured": entry.ElectronicEquipmentPhoenix,
              "Status": "Y",
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if (entry.CellularPhonesPhoenix != null && entry.CellularPhonesPhoenix != 0 && entry.CellularPhonesPhoenix != '0') {
            let subEntry = {
              "SectionId": "223",
              "SectionName":"Business All Risk",
              "CoverId": "432",
              "DescriptionOfRisk": entry.CellularPhonesPhoenixDesc,
              "SumInsured": entry.CellularPhonesPhoenix,
              "Status": "Y",
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if (entry.CampingEquipmentPhoenix != null && entry.CampingEquipmentPhoenix != 0 && entry.CampingEquipmentPhoenix != '0') {
            let subEntry = {
              "SectionId": "223",
              "SectionName":"Business All Risk",
              "CoverId": "433",
              "DescriptionOfRisk": entry.CampingEquipmentPhoenixDesc,
              "SumInsured": entry.CampingEquipmentPhoenix,
              "Status": "Y",
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if (entry.SportingEquipmentPhoenix != null && entry.SportingEquipmentPhoenix != 0 && entry.SportingEquipmentPhoenix != '0') {
            let subEntry = {
              "SectionId": "223",
              "SectionName":"Business All Risk",
              "CoverId": "434","DescriptionOfRisk": entry.SportingEquipmentPhoenixDesc,
              "SumInsured": entry.SportingEquipmentPhoenix,
              "Status": "Y",
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if (entry.JewelleryPhoenix != null && entry.JewelleryPhoenix != 0 && entry.JewelleryPhoenix != '0') {
            let subEntry = {
              "SectionId": "223",
              "SectionName":"Business All Risk",
              "CoverId": "22","DescriptionOfRisk": entry.JewelleryPhoenixDesc,
              "SumInsured": entry.JewelleryPhoenix,
              "Status": "Y",
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          console.log(obj);
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}