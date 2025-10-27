import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class PersonalLiabilityApiPhoenix{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  policyfields:FormlyFieldConfig;
  policyfields1 :FormlyFieldConfig;
  extendsfields:FormlyFieldConfig
    constructor() {
      
    }
    getEditDetails(subDetails,obj){
        let PersonalSection  = subDetails.filter(ele=>ele['SectionId']=='231');
       
        if(PersonalSection.length!=0){
          let Accidental = PersonalSection.filter(ele=>ele.CoverId==560 || ele.CoverId=='560')
          if(Accidental.length!=0){obj['PersonalAccidental']=Accidental[0].SumInsured;obj['IndustryType']=null;if(Accidental[0]?.IndustryType!='0')obj['IndustryType']=Accidental[0].IndustryType;}
          let wrongful = PersonalSection.filter(ele=>ele.CoverId==439 || ele.CoverId=='439')
          if(wrongful.length!=0){obj['PersonalWrongful']=wrongful[0].SumInsured;obj['IndustryType']=null;if(wrongful[0]?.IndustryType!='0')obj['IndustryType']=wrongful[0].IndustryType;}
          
        return obj
      }
    }
    getSaveDetails(entry,ClaimCostList,IndustryId,industryTypeList,obj){
        if(entry.PersonalAccidental!='0' && entry.PersonalAccidental!=null && entry.PersonalAccidental!=''){
            let subEntry= {
              "SectionId": "231",
              "SectionName":"PERSONAL LIABILITY SECTION",
              "CoverId":"560",
              "SumInsured": entry.PersonalAccidental
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.PersonalWrongful!='0' && entry.PersonalWrongful!=null && entry.PersonalWrongful!=''){
            let subEntry= {
              "SectionId": "231",
              "SectionName":"PERSONAL LIABILITY SECTION",
              "CoverId":"439",
              "SumInsured": entry.PersonalWrongful
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          
        return obj;
    }
  fields:FormlyFieldConfig;
      
}