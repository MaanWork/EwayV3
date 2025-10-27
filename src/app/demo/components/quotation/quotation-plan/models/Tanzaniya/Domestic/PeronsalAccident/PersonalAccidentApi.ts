import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class PersonalAccidentApiPhoenix{
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
        let PersonalAccidentSection  = subDetails.filter(ele=>ele['SectionId']=='35');
        
        if(PersonalAccidentSection.length!=0){
          let death = PersonalAccidentSection.filter(ele=>ele.CoverId==5 || ele.CoverId=='5')
          if(death.length!=0){obj['PersonalDeath']=death[0].SumInsured;obj['IndustryType']=null;if(death[0]?.IndustryType!='0')obj['IndustryType']=death[0].IndustryType;}
          let permanent = PersonalAccidentSection.filter(ele=>ele.CoverId==47 || ele.CoverId=='47')
          if(permanent.length!=0){obj['PersonalPermanent']=permanent[0].SumInsured;obj['IndustryType']=null;if(permanent[0]?.IndustryType!='0')obj['IndustryType']=permanent[0].IndustryType;}
          let temporary = PersonalAccidentSection.filter(ele=>ele.CoverId==50 || ele.CoverId=='50')
          if(temporary.length!=0){obj['PersonalTemporary']=temporary[0].CategoryId;obj['IndustryType']=null;if(temporary[0]?.IndustryType!='0')obj['IndustryType']=temporary[0].IndustryType;}
          let medical = PersonalAccidentSection.filter(ele=>ele.CoverId==48 || ele.CoverId=='48')
          if(medical.length!=0){obj['PersonalMedical']=medical[0].SumInsured;obj['IndustryType']=null;if(medical[0]?.IndustryType!='0')obj['IndustryType']=medical[0].IndustryType;}
       
          
          return obj
      }
    }
    getSaveDetails(entry,occupationList,industryTypeList,obj){
        console.log(obj);
        
        if(entry.PersonalDeath!='0' && entry.PersonalDeath!=null && entry.PersonalDeath!=''){
            let subEntry= {
              "SectionId": "35",
              "SectionName":"Personal Accident",
              "CoverId":"5",
              "SumInsured": entry.PersonalDeath,
              "Status": 'Y',
              "OccupationId": entry.OccupationType,
              "OccupationDesc": occupationList.find(ele=>ele.Code==entry.OccupationType)?.CodeDesc,
             
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.PersonalPermanent!='0' && entry.PersonalPermanent!=null && entry.PersonalPermanent!=''){
            let subEntry= {
              "SectionId": "35",
              "SectionName":"Personal Accident",
              "CoverId":"47",
              "SumInsured": entry.PersonalPermanent,
               "Status": 'Y',
              "OccupationId": entry.OccupationType,
              "OccupationDesc": occupationList.find(ele=>ele.Code==entry.OccupationType)?.CodeDesc,
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.PersonalTemporary!='0' && entry.PersonalTemporary!=null && entry.PersonalTemporary!=''){
            let subEntry= {
              "SectionId": "35",
              "SectionName":"Personal Accident",
              "CoverId":"50",
              "SumInsured": entry.PersonalTemporary,
              "Status": 'Y',
              "OccupationId": entry.OccupationType,
              "OccupationDesc": occupationList.find(ele=>ele.Code==entry.OccupationType)?.CodeDesc,
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.PersonalMedical!='0' && entry.PersonalMedical!=null && entry.PersonalMedical!=''){
            let subEntry= {
              "SectionId": "35",
              "SectionName":"Personal Accident",
              "CoverId":"48",
              "SumInsured": entry.PersonalMedical,
              "Status": 'Y',
             "OccupationId": entry.OccupationType,
              "OccupationDesc": occupationList.find(ele=>ele.Code==entry.OccupationType)?.CodeDesc,
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
        return obj;
    }
  fields:FormlyFieldConfig;
      
}