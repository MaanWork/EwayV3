import { FormlyFieldConfig } from "@ngx-formly/core";


export class ElectronicEquipmentEngineeringApiBotswana {
    customerDetails: any;
    commonDetails: any[] = [];
    endorsementSection: boolean = false; subuserType: any = null;
    enableFieldsList: any[] = []; finalizeYN: any = 'N';
    policyfields: FormlyFieldConfig;
    policyfields1: FormlyFieldConfig;
    extendsfields: FormlyFieldConfig
    constructor() {

    }
    getEditDetails(subDetails, obj) {
        let ElectronicEquipSection  = subDetails.filter(ele=>ele['SectionId']=='76'); 
        if(ElectronicEquipSection.length!=0){
            let elecEquipment = ElectronicEquipSection.filter(ele=>ele.CoverId==90 || ele.CoverId=='90')
            if(elecEquipment.length!=0){obj['ElectronicEquipment']=elecEquipment[0].SumInsured;obj['IndustryType']=null;if(elecEquipment[0]?.IndustryType!='0')obj['IndustryType']=elecEquipment[0].IndustryType;if(elecEquipment[0]?.DescriptionOfRisk!=null)obj['ElectronicEquipmentDesc']=elecEquipment[0].DescriptionOfRisk;}
            let elecVarious = ElectronicEquipSection.filter(ele=>ele.CoverId==501 || ele.CoverId=='501')
            if(elecVarious.length!=0){obj['VariousPortableEquipment']=elecVarious[0].SumInsured;obj['IndustryType']=null;if(elecVarious[0]?.IndustryType!='0')obj['IndustryType']=elecVarious[0].IndustryType;if(elecVarious[0]?.DescriptionOfRisk!=null)obj['VariousPortableEquipmentDesc']=elecVarious[0].DescriptionOfRisk;}                              
            let elecIncreased = ElectronicEquipSection.filter(ele=>ele.CoverId==448 || ele.CoverId=='448')
            if(elecIncreased.length!=0){obj['IncreasedCostofWorking']=elecIncreased[0].SumInsured;obj['IndustryType']=null;if(elecIncreased[0]?.IndustryType!='0')obj['IndustryType']=elecIncreased[0].IndustryType;if(elecIncreased[0]?.DescriptionOfRisk!=null)obj['IncreasedCostofWorkingDesc']=elecIncreased[0].DescriptionOfRisk;}
            let elecIncompatability = ElectronicEquipSection.filter(ele=>ele.CoverId==449 || ele.CoverId=='449')
            if(elecIncompatability.length!=0){obj['IncompatibilityCover']=elecIncompatability[0].SumInsured;obj['IndustryType']=null;if(elecIncompatability[0]?.IndustryType!='0')obj['IndustryType']=elecIncompatability[0].IndustryType;if(elecIncompatability[0]?.DescriptionOfRisk!=null)obj['IncompatibilityCoverDesc']=elecIncompatability[0].DescriptionOfRisk;}
            let elecAdditional = ElectronicEquipSection.filter(ele=>ele.CoverId==372 || ele.CoverId=='372')
    
            if(elecAdditional.length!=0){obj['EEclaimsPreparationCosts']=elecAdditional[0].CategoryId;obj['IndustryType']=null;if(elecAdditional[0]?.IndustryType!='0')obj['IndustryType']=elecAdditional[0].IndustryType;if(elecAdditional[0]?.DescriptionOfRisk!=null)obj['EEclaimsPreparationCostsDesc']=elecAdditional[0].DescriptionOfRisk;}
            return obj
        }
    }
    getSaveDetails(entry,claimCostList,IndustryId, industryTypeList, obj) {
        if(entry.ElectronicEquipment!='0' && entry.ElectronicEquipment!=null && entry.ElectronicEquipment!=''){
          let subEntry= {
            "SectionId": "76",
            "SectionName":"Electronic Equipment",
            "CoverId":"90",
            "SumInsured": entry.ElectronicEquipment,
            "DescriptionOfRisk":entry.ElectronicEquipmentDesc
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
          
          if(entry.VariousPortableEquipment!='0' && entry.VariousPortableEquipment!=null && entry.VariousPortableEquipment!=''){
            let subEntry= {
              "SectionId": "76",
              "SectionName":"Electronic Equipment",
              "CoverId":"501",
              "SumInsured": entry.VariousPortableEquipment,
              "DescriptionOfRisk":entry.VariousPortableEquipmentDesc
              
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if(entry.IncreasedCostofWorking!='0' && entry.IncreasedCostofWorking!=null && entry.IncreasedCostofWorking!=''){
            let subEntry= {
              "SectionId": "76",
              "SectionName":"Electronic Equipment",
              "CoverId":"448",
              "SumInsured": entry.IncreasedCostofWorking,
              "DescriptionOfRisk":entry.IncreasedCostofWorkingDesc
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if(entry.IncompatibilityCover!='0' && entry.IncompatibilityCover!=null && entry.IncompatibilityCover!=''){
            let subEntry= {
              "SectionId": "76",
              "SectionName":"Electronic Equipment",
              "CoverId":"449",
              "SumInsured": entry.IncompatibilityCover,
              "DescriptionOfRisk":entry.IncompatibilityCoverDesc
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          if(entry.EEclaimsPreparationCosts!='0' && entry.EEclaimsPreparationCosts!=null && entry.EEclaimsPreparationCosts!=''){
            let subEntry= {
              "SectionId": "76",
              "SectionName":"Electronic Equipment",
              "CoverId":"372",
              "SumInsured": claimCostList.find(ele=>ele.Code==entry.EEclaimsPreparationCosts)?.CodeDesc?.replaceAll(',',''),
              "CategoryId":entry.EEclaimsPreparationCosts
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
          }
          return obj;
        }
        fields: FormlyFieldConfig;
}