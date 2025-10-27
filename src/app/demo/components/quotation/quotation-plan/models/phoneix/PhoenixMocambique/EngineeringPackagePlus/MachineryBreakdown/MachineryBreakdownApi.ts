import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class MachineryBreakdownEngineeringApiNamibia {
    customerDetails: any;
    commonDetails: any[] = [];
    endorsementSection: boolean = false; subuserType: any = null;
    enableFieldsList: any[] = []; finalizeYN: any = 'N';
    policyfields: FormlyFieldConfig;policyfields1: FormlyFieldConfig;
    extendsfields: FormlyFieldConfig;
    constructor() {

    }
    getEditDetails(subDetails, obj) {
        let MachineryBreakDownPhoenix = subDetails.filter(ele => ele['SectionId'] == '41');
        console.log(MachineryBreakDownPhoenix);
        
        if (MachineryBreakDownPhoenix.length != 0) {
            let GrossProfitList = MachineryBreakDownPhoenix.filter(ele => ele.CoverId == '470');
            if (GrossProfitList.length != 0) { obj['GrossProfit'] = GrossProfitList[0].SumInsured; }
            let ClaimsPreparationCostsList = MachineryBreakDownPhoenix.filter(ele => ele.CoverId == '367');
            if (ClaimsPreparationCostsList.length != 0) { obj['MClaimsPreparationCosts'] = ClaimsPreparationCostsList[0].CategoryId; }
            let IncreasedCostOfWorkingList = MachineryBreakDownPhoenix.filter(ele => ele.CoverId == '448');
            if (IncreasedCostOfWorkingList.length != 0) { obj['IncreasedCostOfWorking'] = IncreasedCostOfWorkingList[0].SumInsured; }
            obj['IndustryType'] = MachineryBreakDownPhoenix[0]['IndustryType']
            console.log(obj);
            
            return obj
        }
       
    }
    getSaveDetails(entry,ClaimCostList,IndustryId, industryTypeList, obj) {
        console.log(entry);
        
        if (entry.GrossProfit != null && entry.GrossProfit != 0 && entry.GrossProfit != '0') {
           let subEntry = {
               "SectionId": "41",
               "SectionName":'Machinery Breakdown',
               "CoverId": "470",
               "SumInsured": entry.GrossProfit,
               "Status": "Y",
           }
           if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
           obj.SectionList.push(subEntry);
           }
           if (entry.IncreasedCostOfWorking != null && entry.IncreasedCostOfWorking != 0 && entry.IncreasedCostOfWorking != '0') {
           let subEntry = {
               "SectionId": "41",
               "SectionName":'Machinery Breakdown',
               "CoverId": "448",
               "SumInsured": entry.IncreasedCostOfWorking,
               "Status": "Y",
           }
           if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
           obj.SectionList.push(subEntry);
           }
           if (entry.MClaimsPreparationCosts != null && entry.MClaimsPreparationCosts != 0 && entry.MClaimsPreparationCosts != '0') {
              
               let subEntry = {
               "SectionId": "41",
               "SectionName":'Machinery Breakdown',
               "CoverId": "367",
               "SumInsured": ClaimCostList.find(ele=>ele.Code==entry.MClaimsPreparationCosts)?.CodeDesc?.replaceAll(',',''),
               "CategoryId": entry.MClaimsPreparationCosts,
               "Status": "Y",
           }
           if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
           obj.SectionList.push(subEntry);
           }
           return obj;
   }
        fields: FormlyFieldConfig;

    }