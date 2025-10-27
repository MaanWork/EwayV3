import { FormlyFieldConfig } from "@ngx-formly/core";

export class StatedBenefitsCommercialApiNamibia {
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
            if (MedicalExpensesList.length != 0) { obj['MedicalExpensesSB'] = MedicalExpensesList[0].SumInsured; }
            let DeathList = StateBenefitsPhoenix.filter(ele => ele.CoverId == '123');
            if (DeathList.length != 0) { obj['DeathSB'] = DeathList[0].SumInsured;obj['TemporaryTotalDisabilitySB']=DeathList[0].CategoryId; }
            let PermanentTotalDisabilityList = StateBenefitsPhoenix.filter(ele => ele.CoverId == '124');
            if (PermanentTotalDisabilityList.length != 0) { obj['PermanentTotalDisabilitySB'] = PermanentTotalDisabilityList[0].SumInsured; }
            // let TemporaryTotalDisabilityList = StateBenefitsPhoenix.filter(ele => ele.CoverId == '50');
            // if (TemporaryTotalDisabilityList.length != 0) { obj['TemporaryTotalDisability'] = TemporaryTotalDisabilityList[0].CategoryId; }
            obj['IndustryType'] = StateBenefitsPhoenix[0]['IndustryType']
            return obj
        }
    }
    getSaveDetails(entry, IndustryId, industryTypeList, obj) {
        if (entry.PermanentTotalDisabilitySB != null && entry.PermanentTotalDisabilitySB != 0 && entry.PermanentTotalDisabilitySB != '0') {
            let subEntry = {
                "SectionId": "225",
                "SectionName": "Stated Benefits",
                "CoverId": "124",
                "SumInsured": entry.PermanentTotalDisabilitySB,
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

        if (entry.DeathSB != null && entry.DeathSB != 0 && entry.DeathSB != '0' && entry.TemporaryTotalDisabilitySB != null && entry.TemporaryTotalDisabilitySB != '' && entry.TemporaryTotalDisabilitySB != undefined) {
            let subEntry = {
                "SectionId": "225",
                "SectionName": "Stated Benefits",
                "CoverId": "123",
                "SumInsured": entry.DeathSB,
                "CategoryId": entry.TemporaryTotalDisabilitySB,
                "Status": "Y",
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
        if (entry.DeathSB != null && entry.DeathSB != 0 && entry.DeathSB != '0') {
            let subEntry = {
                "SectionId": "225",
                "SectionName": "Stated Benefits",
                "CoverId": "50",
                "SumInsured": entry.DeathSB,
                "CategoryId": entry.TemporaryTotalDisabilitySB,
                "Status": "Y",
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
        if (entry.MedicalExpensesSB != null && entry.MedicalExpensesSB != 0 && entry.MedicalExpensesSB != '0') {
            let subEntry = {
                "SectionId": "225",
                "SectionName": "Stated Benefits",
                "CoverId": "126",
                "SumInsured": entry.MedicalExpensesSB,
                "Status": "Y",
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
        }
            return obj;
        }
        fields: FormlyFieldConfig;
}