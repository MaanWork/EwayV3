import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";
export class HouseOwnerCommercialApiNamibia{
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
      let HouseOwnerPhoenix = subDetails.filter(ele => ele['SectionId'] == '227');
      console.log(HouseOwnerPhoenix);
      if (HouseOwnerPhoenix.length != 0) {
        let buildingList = HouseOwnerPhoenix.filter(ele => String(ele.CoverId) == '105');
        if (buildingList.length != 0) { obj['BuildingSumInsuredFullcover'] = buildingList[0].SumInsured;obj['NoClaimBonus'] = buildingList[0].NoOfClaim; obj['BuildingSumInsuredFullcoverDesc'] = buildingList[0].DescriptionOfRisk; }
        let HomeownersList = HouseOwnerPhoenix.filter(ele => String(ele.CoverId) == '472');
        if (HomeownersList.length != 0) { obj['HomeownersLiability'] = HomeownersList[0].SumInsured; obj['HomeownersLiabilityDesc'] = HomeownersList[0].DescriptionOfRisk; }
        let AccidentalDamageToMachineryList = HouseOwnerPhoenix.filter(ele => String(ele.CoverId) == '156');
        if (AccidentalDamageToMachineryList.length != 0) { obj['AccidentalDamageToMachinery'] = AccidentalDamageToMachineryList[0].SumInsured; obj['AccidentalDamageToMachineryDesc'] = AccidentalDamageToMachineryList[0].DescriptionOfRisk; }
        let SolarGeyserList = HouseOwnerPhoenix.filter(ele => String(ele.CoverId) == '488');
        if (SolarGeyserList.length != 0) { obj['SolarGeyser'] = SolarGeyserList[0].SumInsured; obj['SolarGeyserDesc'] = SolarGeyserList[0].DescriptionOfRisk; }
        let InHouseGeyserList = HouseOwnerPhoenix.filter(ele => String(ele.CoverId) == '364');
        if (InHouseGeyserList.length != 0) { obj['InHouseGeyser'] = InHouseGeyserList[0].SumInsured; obj['InHouseGeyserDesc'] = InHouseGeyserList[0].DescriptionOfRisk; }
        let PowersurgeList = HouseOwnerPhoenix.filter(ele => String(ele.CoverId) == '356');
        if (PowersurgeList.length != 0) { obj['Powersurge'] = PowersurgeList[0].SumInsured; }
        let SubsidenceAndLandslipList = HouseOwnerPhoenix.filter(ele => String(ele.CoverId) == '473');
        if (SubsidenceAndLandslipList.length != 0) { obj['SubsidenceAndLandslip'] = SubsidenceAndLandslipList[0].SumInsured; }
        console.log(HouseOwnerPhoenix,"HouseOwnerPhoenix");
        obj['filled'] = HouseOwnerPhoenix.length > 0 ? true: false
        return obj
      }
    }
    getSaveDetails(entry,claimList,obj){
      if (entry.BuildingSumInsuredFullcover != 0 && entry.BuildingSumInsuredFullcover != null && entry.BuildingSumInsuredFullcover != '' && entry.BuildingSumInsuredFullcoverDesc != null && entry.BuildingSumInsuredFullcoverDesc != '') {
        let subEntry = {
          "SectionId": "227","SectionName": "House Owners",
          "Status": "Y", "SumInsured": entry.BuildingSumInsuredFullcover,
          "CoverId": "105","DescriptionOfRisk": entry.BuildingSumInsuredFullcoverDesc,
          "NoOfClaim": entry.NoClaimBonus,
          "NoOfClaimDesc" : claimList.find(ele=>ele.Code==entry.NoClaimBonus)?.CodeDesc
        }
        obj.SectionList.push(subEntry);
      }
      if (entry.HomeownersLiability != 0 && entry.HomeownersLiability != null && entry.HomeownersLiability != '' && entry.HomeownersLiabilityDesc != null && entry.HomeownersLiabilityDesc != '') {
        let subEntry = {
          "SectionId": "227","SectionName": "House Owners",
          "Status": "Y", "SumInsured": entry.HomeownersLiability,
          "CoverId": "472",
          "DescriptionOfRisk": entry.HomeownersLiabilityDesc
        }
        obj.SectionList.push(subEntry);
      }
      if (entry.AccidentalDamageToMachinery != 0 && entry.AccidentalDamageToMachinery != null && entry.AccidentalDamageToMachinery != '' && entry.AccidentalDamageToMachineryDesc != null && entry.AccidentalDamageToMachineryDesc != '') {
        let subEntry = {
          "SectionId": "227","SectionName": "House Owners",
          "Status": "Y", "SumInsured": entry.AccidentalDamageToMachinery,
          "CoverId": "156",
          "DescriptionOfRisk": entry.AccidentalDamageToMachineryDesc
        }
        obj.SectionList.push(subEntry);
      }
      if (entry.SolarGeyser != 0 && entry.SolarGeyser != null && entry.SolarGeyser != '' && entry.SolarGeyserDesc != null && entry.SolarGeyserDesc != '') {
        let subEntry = {
          "SectionId": "227","SectionName": "House Owners",
          "Status": "Y", "SumInsured": entry.SolarGeyser,
          "CoverId": "488",
          "DescriptionOfRisk": entry.SolarGeyserDesc
        }
        obj.SectionList.push(subEntry);
      }
      if (entry.InHouseGeyser != 0 && entry.InHouseGeyser != null && entry.InHouseGeyser != '' && entry.InHouseGeyserDesc != null && entry.InHouseGeyserDesc != '') {
        let subEntry = {
          "SectionId": "227","SectionName": "House Owners",
          "Status": "Y", "SumInsured": entry.InHouseGeyser,
          "CoverId": "364",
          "DescriptionOfRisk": entry.InHouseGeyserDesc
        }
        obj.SectionList.push(subEntry);
      }
      if (entry.Powersurge != 0 && entry.Powersurge != null && entry.Powersurge != '' && entry.Powersurge != true) {
        let subEntry = {
          "SectionId": "227","SectionName": "House Owners",
          "Status": "Y", "SumInsured": entry.Powersurge,
          "CoverId": "356",
          "DescriptionOfRisk": null
        }
        obj.SectionList.push(subEntry);
      }
      if (entry.SubsidenceAndLandslip != 0 && entry.SubsidenceAndLandslip != null && entry.SubsidenceAndLandslip != '') {
        let subEntry = {
          "SectionId": "227","SectionName": "House Owners",
          "Status": "Y", "SumInsured": entry.SubsidenceAndLandslip,
          "CoverId": "473",
          "DescriptionOfRisk": null
        }
        obj.SectionList.push(subEntry);
      }
        return obj;
    }
  fields:FormlyFieldConfig;
}