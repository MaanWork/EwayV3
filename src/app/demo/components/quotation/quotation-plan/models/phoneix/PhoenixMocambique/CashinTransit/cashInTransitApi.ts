import { FormlyFieldConfig } from "@ngx-formly/core";

export class CashInTransitApiNamibia {
    customerDetails: any;
    commonDetails: any[] = [];
    endorsementSection: boolean = false; subuserType: any = null;
    enableFieldsList: any[] = []; finalizeYN: any = 'N';
    policyfields: FormlyFieldConfig;policyfields1: FormlyFieldConfig;
    extendsfields: FormlyFieldConfig;
    constructor() {

    }
    getEditDetails(subDetails, obj) {
        let cashInTransit = subDetails.filter(ele => ele['SectionId'] == '237');
        if (cashInTransit.length != 0) {
            let cashStaticTransit = cashInTransit.filter(ele => ele.CoverId == '574');
            if (cashStaticTransit.length != 0) { obj['cashStaticTransit'] = cashStaticTransit[0].SumInsured; }
            let cashVehicleTransit = cashInTransit.filter(ele => ele.CoverId == '575');
            if (cashVehicleTransit.length != 0) { obj['cashVehicleTransit'] = cashVehicleTransit[0].SumInsured; }
            let cashContainer = cashInTransit.filter(ele => ele.CoverId == '576');
            if (cashContainer.length != 0) { obj['cashContainer'] = cashContainer[0].SumInsured; }
            let cashPavementCarry = cashInTransit.filter(ele => ele.CoverId == '577');
            if (cashPavementCarry.length != 0) { obj['cashPavementCarry'] = cashPavementCarry[0].SumInsured; }
            let cashSafeVault = cashInTransit.filter(ele => ele.CoverId == '578');
            if (cashSafeVault.length != 0) { obj['cashSafeVault'] = cashSafeVault[0].SumInsured; }
            
            return obj
        }
       
    }
    getSaveDetails(entry, obj) {
        if (entry.cashStaticTransit != null && entry.cashStaticTransit != 0 && entry.cashStaticTransit != '0') {
           let subEntry = {
               "SectionId": "237",
               "SectionName":'Cash In Transit',
               "CoverId": "574",
               "SumInsured": entry.cashStaticTransit,
               "Status": "Y",
           }
           
           obj.SectionList.push(subEntry);
           }
         if (entry.cashVehicleTransit != null && entry.cashVehicleTransit != 0 && entry.cashVehicleTransit != '0') {
           let subEntry = {
               "SectionId": "237",
               "SectionName":'Cash In Transit',
               "CoverId": "575",
               "SumInsured": entry.cashVehicleTransit,
               "Status": "Y",
           }
           
           obj.SectionList.push(subEntry);
           }
           if (entry.cashContainer != null && entry.cashContainer != 0 && entry.cashContainer != '0') {
           let subEntry = {
               "SectionId": "237",
               "SectionName":'Cash In Transit',
               "CoverId": "576",
               "SumInsured": entry.cashContainer,
               "Status": "Y",
           }
           
           obj.SectionList.push(subEntry);
           }
           if (entry.cashPavementCarry != null && entry.cashPavementCarry != 0 && entry.cashPavementCarry != '0') {
           let subEntry = {
               "SectionId": "237",
               "SectionName":'Cash In Transit',
               "CoverId": "577",
               "SumInsured": entry.cashPavementCarry,
               "Status": "Y",
           }
           
           obj.SectionList.push(subEntry);
           }
           if (entry.cashSafeVault != null && entry.cashSafeVault != 0 && entry.cashSafeVault != '0') {
           let subEntry = {
               "SectionId": "237",
               "SectionName":'Cash In Transit',
               "CoverId": "578",
               "SumInsured": entry.cashSafeVault,
               "Status": "Y",
           }
           
           obj.SectionList.push(subEntry);
           }
           return obj;
   }
        fields: FormlyFieldConfig;

    }