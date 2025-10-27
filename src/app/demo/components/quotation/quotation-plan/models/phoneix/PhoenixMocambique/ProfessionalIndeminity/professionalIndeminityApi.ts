import { FormlyFieldConfig } from "@ngx-formly/core";

export class ProfessionalIdeminityApiNamibia {
    customerDetails: any;
    commonDetails: any[] = [];
    endorsementSection: boolean = false; subuserType: any = null;
    enableFieldsList: any[] = []; finalizeYN: any = 'N';
    policyfields: FormlyFieldConfig;policyfields1: FormlyFieldConfig;
    extendsfields: FormlyFieldConfig;
    constructor() {

    }
    getEditDetails(subDetails, obj) {
        let ProfessionalIndeminity = subDetails.filter(ele => ele['SectionId'] == '246');
        if (ProfessionalIndeminity.length != 0) {
            let professionalCompany = ProfessionalIndeminity.filter(ele => ele.CoverId == '579');
            if (professionalCompany.length != 0) { 
                obj['PISumInsured'] = professionalCompany[0].SumInsured; 
                obj['PIYears'] = professionalCompany[0].BuildingBuildYear;
                obj['PIIndustryType'] = professionalCompany[0].IndustryType;
            }
            
           
            return obj
        }
       
    }
    getSaveDetails(entry, obj) {
        if (entry.PISumInsured != null && entry.PISumInsured != 0 && entry.PISumInsured != '0' && entry.PIYears != null && entry.PIYears != 0 && entry.PIYears != '0' && entry.PIIndustryType != null && entry.PIIndustryType != 0 && entry.PIIndustryType != '0' ) {
           let subEntry = {
               "SectionId": "246",
               "SectionName":'Professional Indeminity',
               "CoverId": "579",
               "SumInsured": entry.PISumInsured,
               "Status": "Y",
               "IndustryType": entry.PIIndustryType,
               "BuildingBuildYear": String(entry.PIYears)
           }
        //    if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
           obj.SectionList.push(subEntry);
           }
       
           return obj;
   }
        fields: FormlyFieldConfig;

    }