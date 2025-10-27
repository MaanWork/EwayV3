import { FormlyFieldConfig } from "@ngx-formly/core";

export class KidnapRansomApiNamibia {
    customerDetails: any;
    commonDetails: any[] = [];
    endorsementSection: boolean = false; subuserType: any = null;
    enableFieldsList: any[] = []; finalizeYN: any = 'N';
    policyfields: FormlyFieldConfig;policyfields1: FormlyFieldConfig;
    extendsfields: FormlyFieldConfig;
    constructor() {

    }
    getEditDetails(subDetails, obj) {
        let kipnapRansom = subDetails.filter(ele => ele['SectionId'] == '236');
        if (kipnapRansom.length != 0) {
            let kidnapRansom = kipnapRansom.filter(ele => ele.CoverId == '584');
            if (kidnapRansom.length != 0) { obj['kidnapRansom'] = kidnapRansom[0].SumInsured; }
            let kidnapRansomTransit = kipnapRansom.filter(ele => ele.CoverId == '585');
            if (kidnapRansomTransit.length != 0) { obj['kidnapRansomTransit'] = kidnapRansomTransit[0].SumInsured; }
            let kidnapResponse = kipnapRansom.filter(ele => ele.CoverId == '586');
            if (kidnapResponse.length != 0) { obj['kidnapResponse'] = kidnapResponse[0].SumInsured; }
            let kidnapAdditional = kipnapRansom.filter(ele => ele.CoverId == '587');
            if (kidnapAdditional.length != 0) { obj['kidnapAdditional'] = kidnapAdditional[0].SumInsured; }
            let kidnaprehabilitation = kipnapRansom.filter(ele => ele.CoverId == '588');
            if (kidnaprehabilitation.length != 0) { obj['kidnaprehabilitation'] = kidnaprehabilitation[0].SumInsured; }
            let kidnapLegalLiability = kipnapRansom.filter(ele => ele.CoverId == '589');
            if (kidnapLegalLiability.length != 0) { obj['kidnapLegalLiability'] = kidnapLegalLiability[0].SumInsured; }
            let kidnapPersonalCapital = kipnapRansom.filter(ele => ele.CoverId == '590');
            if (kidnapPersonalCapital.length != 0) { obj['kidnapPersonalCapital'] = kidnapPersonalCapital[0].SumInsured; }
    
          
            return obj
        }
       
    }
    getSaveDetails(entry, obj) {
        if (entry.kidnapRansom != null && entry.kidnapRansom != 0 && entry.kidnapRansom != '0') {
           let subEntry = {
               "SectionId": "236",
               "SectionName":'Kidnap & Ransom',
               "CoverId": "584",
               "SumInsured": entry.kidnapRansom,
               "Status": "Y",
           }
        //    if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
           obj.SectionList.push(subEntry);
           }
           if (entry.kidnapRansomTransit != null && entry.kidnapRansomTransit != 0 && entry.kidnapRansomTransit != '0') {
           let subEntry = {
               "SectionId": "236",
               "SectionName":'Kidnap & Ransom',
               "CoverId": "585",
               "SumInsured": entry.kidnapRansomTransit,
               "Status": "Y",
           }
        //    if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
           obj.SectionList.push(subEntry);
           }
         if (entry.kidnapResponse != null && entry.kidnapResponse != 0 && entry.kidnapResponse != '0') {
           let subEntry = {
               "SectionId": "236",
               "SectionName":'Kidnap & Ransom',
               "CoverId": "586",
               "SumInsured": entry.kidnapResponse,
               "Status": "Y",
           }
        //    if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
           obj.SectionList.push(subEntry);
           }
           if (entry.kidnapAdditional != null && entry.kidnapAdditional != 0 && entry.kidnapAdditional != '0') {
           let subEntry = {
               "SectionId": "236",
               "SectionName":'Kidnap & Ransom',
               "CoverId": "587",
               "SumInsured": entry.kidnapAdditional,
               "Status": "Y",
           }
        //    if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
           obj.SectionList.push(subEntry);
           }
           if (entry.kidnaprehabilitation != null && entry.kidnaprehabilitation != 0 && entry.kidnaprehabilitation != '0') {
           let subEntry = {
               "SectionId": "236",
               "SectionName":'Kidnap & Ransom',
               "CoverId": "588",
               "SumInsured": entry.kidnaprehabilitation,
               "Status": "Y",
           }
        //    if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
           obj.SectionList.push(subEntry);
           }
           if (entry.kidnapLegalLiability != null && entry.kidnapLegalLiability != 0 && entry.kidnapLegalLiability != '0') {
           let subEntry = {
               "SectionId": "236",
               "SectionName":'Kidnap & Ransom',
               "CoverId": "589",
               "SumInsured": entry.kidnapLegalLiability,
               "Status": "Y",
           }
        //    if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
           obj.SectionList.push(subEntry);
           }
           if (entry.kidnapPersonalCapital != null && entry.kidnapPersonalCapital != 0 && entry.kidnapPersonalCapital != '0') {
           let subEntry = {
               "SectionId": "236",
               "SectionName":'Kidnap & Ransom',
               "CoverId": "590",
               "SumInsured": entry.kidnapPersonalCapital,
               "Status": "Y",
           }
        //    if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
           obj.SectionList.push(subEntry);
           }
           return obj;
   }
        fields: FormlyFieldConfig;

    }