import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class HouseHoldersContentsApiPhoenix{
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
        let HouseContentsSection  = subDetails.filter(ele=>ele['SectionId']=='228');
        if (HouseContentsSection.length != 0) {
          obj['contents'] = [];
            let AccidentalDamageList = HouseContentsSection.filter(ele => ele.CoverId == '156');
            if (AccidentalDamageList.length != 0) { obj['AccidentalDamage'] = AccidentalDamageList[0].SumInsured; obj['AccidentalDamageDesc'] = AccidentalDamageList[0].DescriptionOfRisk; }
            let PowerSurgeList = HouseContentsSection.filter(ele => ele.CoverId == '356');
            if (PowerSurgeList.length != 0) { obj['HHPowerSurge'] = PowerSurgeList[0].SumInsured; obj['PowerSurgeDesc'] = PowerSurgeList[0].DescriptionOfRisk; }
            let TheftCoverFromDomesticAndOutbuildingsList = HouseContentsSection.filter(ele => ele.CoverId == '502');
            if (TheftCoverFromDomesticAndOutbuildingsList.length != 0) { obj['HolderTheft'] = TheftCoverFromDomesticAndOutbuildingsList[0].SumInsured; obj['HolderTheftDesc'] = TheftCoverFromDomesticAndOutbuildingsList[0].DescriptionOfRisk; }
            let MechanicalAndElectricalBreakdownList = HouseContentsSection.filter(ele => ele.CoverId == '503');
            if (MechanicalAndElectricalBreakdownList.length != 0) { obj['HolderBreakdown'] = MechanicalAndElectricalBreakdownList[0].SumInsured; obj['HolderBreakdownDesc'] = MechanicalAndElectricalBreakdownList[0].DescriptionOfRisk; }
           let sectionList = HouseContentsSection.filter(ele => ele.CoverId == '290' || ele.CoverId == 290);
           console.log(sectionList);
           
            for (let ele of sectionList) {
              let houseData = {
                ContentInsured: ele.CoverId == 290 ? ele.SumInsured : null,
                ContentDescription: ele.CoverId == 290 ? ele.DescriptionOfRisk : null,
                ContentsType: ele.CoverId == 290 ? ele.CategoryId : null,
                  IndustryType: ele.IndustryType && ele.IndustryType != '0' ? ele.IndustryType : null
              };
              obj['contents'].push(houseData);
          }
          
          return obj;
      }
      //   if(HouseContentsSection.length!=0){
      //     let houseInsured = HouseContentsSection.filter(ele=>ele.CoverId==290 || ele.CoverId=='290')
      //     if(houseInsured.length!=0){obj['ContentInsured']=houseInsured[0].SumInsured;obj['IndustryType']=null;if(houseInsured[0]?.IndustryType!='0')obj['IndustryType']=houseInsured[0].IndustryType;}
      //     let houseDescription = HouseContentsSection.filter(ele=>ele.CoverId==290 || ele.CoverId=='290')
      //     if(houseDescription.length!=0){obj['ContentDescription']=houseDescription[0].SumInsured;obj['IndustryType']=null;if(houseDescription[0]?.IndustryType!='0')obj['IndustryType']=houseDescription[0].IndustryType;}
      //     let houseContentsType = HouseContentsSection.filter(ele=>ele.CoverId==290 || ele.CoverId=='290')
      //     if(houseContentsType.length!=0){obj['ContentsType']=houseContentsType[0].CategoryId;obj['IndustryType']=null;if(houseContentsType[0]?.IndustryType!='0')obj['IndustryType']=houseContentsType[0].IndustryType;}
         
      //   return obj
      // }
    }
    getSaveDetails(entry,constructionList,IndustryId,industryTypeList,obj,list){
      console.log(list);
      
          if(list){
            for(let i =0; i < list.length; i++){
              if(list[i].HHSumInsured!="" && list[i].HHSumInsured!="undefined" && list[i].HHSumInsured!=undefined){
                let subEntry= {
                  "SectionId": "228",
                  "SectionName":"House Holders",
                  "CoverId":"290",
                  "CategoryId": constructionList.find(ele=>ele.Code==list[i].HHContentType)?.Code,
                  "SumInsured": String(list[i].HHSumInsured).replaceAll(',', ''),
                  "DescriptionOfRisk":list[i].HHDescription,
                  "IndustryType": IndustryId
                }
                obj.SectionList.push(subEntry);   
              }   
            } 
          }
          
          if (entry.AccidentalDamage != null && entry.AccidentalDamage != '' && entry.AccidentalDamage != undefined) {
            let subEntry = {
              "SectionId": "228",
              "SectionName": "House Holders",
              "CoverId": "156",
              "SumInsured": entry.AccidentalDamage,
              "DescriptionOfRisk": entry.AccidentalDamageDesc,
              "Status": "Y"
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if (entry.HHPowerSurge != null && entry.HHPowerSurge != '' && entry.HHPowerSurge != undefined) {
            let subEntry = {
              "SectionId": "228",
              "SectionName": "House Holders",
              "CoverId": "356",
              "SumInsured": entry.HHPowerSurge,
              "DescriptionOfRisk": entry.PowerSurgeDesc,
              "Status": "Y"
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if (entry.HolderTheft != null && entry.HolderTheft != '' && entry.HolderTheft != undefined) {
            let subEntry = {
              "SectionId": "228",
              "SectionName": "House Holders",
              "CoverId": "502",
              "SumInsured": entry.HolderTheft,
              "DescriptionOfRisk": entry.HolderTheftDesc,
              "Status": "Y"
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if (entry.HolderBreakdown != null && entry.HolderBreakdown != '' && entry.HolderBreakdown != undefined) {
            let subEntry = {
              "SectionId": "228",
              "SectionName": "House Holders",
              "CoverId": "503",
              "SumInsured": entry.HolderBreakdown,
              "DescriptionOfRisk": entry.HolderBreakdownDesc,
              "Status": "Y"
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}