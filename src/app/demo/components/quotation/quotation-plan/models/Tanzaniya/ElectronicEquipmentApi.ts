import { FormlyFieldConfig } from "@ngx-formly/core";

export class ElectronicEquipmentApiTanzaniya {
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
        console.log(ElectronicEquipSection);
        
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
    getSaveDetails(entry, industryTypeList,claimCostList, obj,dropList?) {
      console.log(entry.EETanzaniya);
      if(entry.EETanzaniya.length > 0){
        for(let i = 0; i < entry.EETanzaniya.length;i++){
          let d = {
                        "SectionId": "76",
                        "SectionName": "Electronic Equipments",
                        "RiskId": null,
                        "ElecEquipSuminsured": String(entry.EETanzaniya[i].SumInsured).replaceAll(',',''),
                        "SumInsured": String(entry.EETanzaniya[i].SumInsured).replaceAll(',',''),
                        "ContentId": entry.EETanzaniya[i].ContentId,
                        "ContentDesc": dropList.find(ele=>ele.Code==entry.EETanzaniya[i].ContentId)?.CodeDesc,
                        "DescriptionOfRisk": entry.EETanzaniya[i].DescriptionOfRisk,
                        "SerialNo": entry.EETanzaniya[i].SerialNo,
                        "CoverId":"90",
                        "IndustryType":entry.IndustryType, 
                        "IndustryTypeDesc": industryTypeList.find(ele => ele.Code == entry.IndustryType)?.CodeDesc
          }
          obj.SectionList.push(d);
        }
        
      }
        if(entry.ElectronicEquipment!='0' && entry.ElectronicEquipment!=null && entry.ElectronicEquipment!=''){
          let subEntry= {
            "SectionId": "76",
            "SectionName":"Electronic Equipment",
            "CoverId":"90",
            "SumInsured": entry.ElectronicEquipment,
            "DescriptionOfRisk":entry.ElectronicEquipmentDesc
          }
          if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
          obj.SectionList.push(subEntry);
        }
          
          return obj;
        }
        fields: FormlyFieldConfig;
}