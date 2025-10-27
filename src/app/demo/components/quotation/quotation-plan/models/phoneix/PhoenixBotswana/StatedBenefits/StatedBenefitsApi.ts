import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class StatedBenefitsApiBotswana {
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
        let StateBenefitsPhoenix = subDetails.filter(ele => ele['SectionId'] == '225');
        if (StateBenefitsPhoenix.length != 0) {
            let MedicalExpensesList = StateBenefitsPhoenix.filter(ele => ele.CoverId == '126');
            if (MedicalExpensesList.length != 0) { obj['MedicalExpenses'] = MedicalExpensesList[0].SumInsured; }
            let DeathList = StateBenefitsPhoenix.filter(ele => ele.CoverId == '123');
            if (DeathList.length != 0) { obj['Death'] = DeathList[0].SumInsured;obj['TemporaryTotalDisability']=DeathList[0].CategoryId; }
            let PermanentTotalDisabilityList = StateBenefitsPhoenix.filter(ele => ele.CoverId == '124');
            if (PermanentTotalDisabilityList.length != 0) { obj['PermanentTotalDisability'] = PermanentTotalDisabilityList[0].SumInsured; }
            // let TemporaryTotalDisabilityList = StateBenefitsPhoenix.filter(ele => ele.CoverId == '50');
            // if (TemporaryTotalDisabilityList.length != 0) { obj['TemporaryTotalDisability'] = TemporaryTotalDisabilityList[0].CategoryId; }
            obj['IndustryType'] = StateBenefitsPhoenix[0]['IndustryType']
            return obj
        }
    }
    getSaveDetails(entry, IndustryId, industryTypeList, obj) {
        if (entry.PermanentTotalDisability != null && entry.PermanentTotalDisability != 0 && entry.PermanentTotalDisability != '0') {
            let subEntry = {
                "SectionId": "225",
                "SectionName": "Stated Benefits",
                "CoverId": "124",
                "SumInsured": entry.PermanentTotalDisability,
                "Status": "Y",
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }

        // if (entry.TemporaryTotalDisability != null && entry.TemporaryTotalDisability != '' && entry.TemporaryTotalDisability != undefined) {
        //     let subEntry = {
        //         "SectionId": "225",
        //         "SectionName": "Stated Benefits",
        //         "CoverId": "50",
        //         "SumInsured": entry.TemporaryTotalDisability,
        //         "CategoryId": entry.TemporaryTotalDisability,
        //         "Status": "Y",
        //     }
        //     if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
        //     obj.SectionList.push(subEntry);
        // }

        if (entry.Death != null && entry.Death != 0 && entry.Death != '0' && entry.TemporaryTotalDisability != null && entry.TemporaryTotalDisability != '' && entry.TemporaryTotalDisability != undefined) {
            let subEntry = {
                "SectionId": "225",
                "SectionName": "Stated Benefits",
                "CoverId": "123",
                "SumInsured": entry.Death,
                "CategoryId": entry.TemporaryTotalDisability,
                "Status": "Y",
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
        if (entry.Death != null && entry.Death != 0 && entry.Death != '0') {
            let subEntry = {
                "SectionId": "225",
                "SectionName": "Stated Benefits",
                "CoverId": "50",
                "SumInsured": entry.Death,
                "CategoryId": entry.TemporaryTotalDisability,
                "Status": "Y",
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
        if (entry.MedicalExpenses != null && entry.MedicalExpenses != 0 && entry.MedicalExpenses != '0') {
            let subEntry = {
                "SectionId": "225",
                "SectionName": "Stated Benefits",
                "CoverId": "126",
                "SumInsured": entry.MedicalExpenses,
                "Status": "Y",
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
            return obj;
        }
        fields: FormlyFieldConfig;

    }