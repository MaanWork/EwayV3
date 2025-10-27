import { FormlyFieldConfig } from "@ngx-formly/core";

export class PensionTrusteeAPINamibia {
    customerDetails: any;
    commonDetails: any[] = [];
    endorsementSection: boolean = false; subuserType: any = null;
    enableFieldsList: any[] = []; finalizeYN: any = 'N';
    policyfields: FormlyFieldConfig;policyfields1: FormlyFieldConfig;
    extendsfields: FormlyFieldConfig;
    constructor() {

    }
    getEditDetails(subDetails, obj) {
        let PensionTrustee = subDetails.filter(ele => ele['SectionId'] == '235');
        if (PensionTrustee.length != 0) {
            let pensionCompany = PensionTrustee.filter(ele => ele.CoverId == '582');
            if (pensionCompany.length != 0) { 
                obj['PFSumInsured'] = pensionCompany[0].SumInsured; 
                obj['PFYears'] = pensionCompany[0].BuildingBuildYear;
                obj['PFIndustryType'] = pensionCompany[0].IndustryType;
            }
            return obj
        }   
    }
    getSaveDetails(entry, obj) {
        if (entry.PFSumInsured != null && entry.PFSumInsured != 0 && entry.PFSumInsured != '0' && entry.PFYears != null && entry.PFYears != 0 && entry.PFYears != '0' && entry.PFIndustryType != null && entry.PFIndustryType != 0 && entry.PFIndustryType != '0' ) {
           let subEntry = {
               "SectionId": "235",
               "SectionName":'Pension Fund Trustee',
               "CoverId": "582",
               "SumInsured": entry.PFSumInsured,
               "Status": "Y",
               "IndustryType": entry.PFIndustryType,
               "BuildingBuildYear": String(entry.PFYears)
           }   
           obj.SectionList.push(subEntry);
           }
           return obj;
   }
        fields: FormlyFieldConfig;
    }