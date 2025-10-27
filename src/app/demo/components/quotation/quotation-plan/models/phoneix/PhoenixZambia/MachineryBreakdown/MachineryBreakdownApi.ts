import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class MachineryBreakdownApi {
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
        let MachineryBreakDownPhoenix = subDetails.filter(ele => ele['SectionId'] == '41');
        if (MachineryBreakDownPhoenix.length != 0) {
            let GrossProfitList = MachineryBreakDownPhoenix.filter(ele => ele.CoverId == '470');
            if (GrossProfitList.length != 0) { obj['GrossProfit'] = GrossProfitList[0].SumInsured; }
            let ClaimsPreparationCostsList = MachineryBreakDownPhoenix.filter(ele => ele.CoverId == '367');
            if (ClaimsPreparationCostsList.length != 0) { obj['ClaimsPreparationCosts'] = ClaimsPreparationCostsList[0].CategoryId; }
            let IncreasedCostOfWorkingList = MachineryBreakDownPhoenix.filter(ele => ele.CoverId == '448');
            if (IncreasedCostOfWorkingList.length != 0) { obj['IncreasedCostOfWorking'] = IncreasedCostOfWorkingList[0].SumInsured; }
            obj['IndustryType'] = MachineryBreakDownPhoenix[0]['IndustryType']
            return obj
        }
       
    }
    getSaveDetails(entry,ClaimCostList, industryTypeList, obj) {
         if (entry.GrossProfit != null && entry.GrossProfit != 0 && entry.GrossProfit != '0') {
            let subEntry = {
                "SectionId": "41",
                "SectionName":'Machinery Breakdown',
                "CoverId": "470",
                "SumInsured": entry.GrossProfit,
                "Status": "Y",
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
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
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
            }
            if (entry.ClaimsPreparationCosts != null && entry.ClaimsPreparationCosts != 0 && entry.ClaimsPreparationCosts != '0') {
                let desc = ClaimCostList.find(ele=>ele.Code==entry.ClaimsPreparationCosts)?.CodeDesc?.replaceAll(',','');
                let subEntry = {
                "SectionId": "41",
                "SectionName":'Machinery Breakdown',
                "CoverId": "367",
                "SumInsured": desc,
                "CategoryId": entry.ClaimsPreparationCosts,
                "Status": "Y",
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
            }
            return obj;
    }
    fields: FormlyFieldConfig;

}