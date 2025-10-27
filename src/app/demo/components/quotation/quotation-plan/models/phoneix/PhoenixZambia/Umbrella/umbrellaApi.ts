import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class UmbrellaApi {
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
        let UmbrellaPhoenix = subDetails.filter(ele => ele['SectionId'] == '224');
        console.log(UmbrellaPhoenix,"");
        
        if (UmbrellaPhoenix.length != 0) {
            let  UmbrellaSum = UmbrellaPhoenix.filter(ele => ele.CoverId == 290 || ele.CoverId == '290')
            console.log(UmbrellaSum);
            
            if (UmbrellaSum.length != 0) { obj['UmbrellasumInsured'] = UmbrellaSum[0].SumInsured; obj['IndustryType'] = null; if (UmbrellaSum[0]?.IndustryType != '0') obj['IndustryType'] = UmbrellaSum[0].IndustryType; }
            return obj
        }
       
    }
    getSaveDetails(entry,ClaimCostList, IndustryId, industryTypeList, obj) {
        console.log(entry);
        
         if (entry.UmbrellasumInsured != null && entry.UmbrellasumInsured != 0 && entry.UmbrellasumInsured != '0') {
            let subEntry = {
                "SectionId": "224",
                "SectionName":'Umbrella',
                "CoverId": "290",
                "SumInsured": entry.UmbrellasumInsured,
                "Status": "Y",
            }
            if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
            obj.SectionList.push(subEntry);
            }
            return obj;
        }
        fields: FormlyFieldConfig;

    }