import { FormlyFieldConfig } from "@ngx-formly/core";

export class IPAApiTanzaniya {
    customerDetails: any;
    commonDetails: any[] = [];
    endorsementSection: boolean = false; subuserType: any = null;
    enableFieldsList: any[] = []; finalizeYN: any = 'N';
    policyfields: FormlyFieldConfig;
    policyfields1: FormlyFieldConfig;
    extendsfields: FormlyFieldConfig
    constructor() {

    }
    
    getSaveDetails(entry, occupationList,industryTypeList,IPAList,IndustryId, obj) {
      if(IPAList.length > 0){
        for(let i = 0; i < IPAList.length;i++){
          if(IPAList[i].PersonalDeath!='0' && IPAList[i].PersonalDeath!=null && IPAList[i].PersonalDeath!=''){
          let subEntry= {
            "SectionId": "35",
            "SectionName":"Personal Accident",
            "CoverId":"5",
            "SumInsured": IPAList[i].PersonalDeath,
            "Status": 'Y',
            "OtherOccupation":i,
            "OccupationId": IPAList[i].OccupationType,
            "OccupationDesc": occupationList.find(ele=>ele.Code==IPAList[i].OccupationType)?.CodeDesc,
           
          }
          if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
          obj.SectionList.push(subEntry);
         }
         if(IPAList[i].PersonalPermanent!='0' && IPAList[i].PersonalPermanent!=null && IPAList[i].PersonalPermanent!=''){
          let subEntry= {
            "SectionId": "35",
            "SectionName":"Personal Accident",
            "CoverId":"47",
            "SumInsured": IPAList[i].PersonalPermanent,
            "Status": 'Y',
            "OtherOccupation":i,
            "OccupationId": IPAList[i].OccupationType,
            "OccupationDesc": occupationList.find(ele=>ele.Code==IPAList[i].OccupationType)?.CodeDesc,           
          }
          if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
          obj.SectionList.push(subEntry);
         }
         if(IPAList[i].PersonalTemporary!='0' && IPAList[i].PersonalTemporary!=null && IPAList[i].PersonalTemporary!=''){
          let subEntry= {
            "SectionId": "35",
            "SectionName":"Personal Accident",
            "CoverId":"50",
            "SumInsured": IPAList[i].PersonalTemporary,
            "Status": 'Y',
            "OtherOccupation":i,
            "OccupationId": IPAList[i].OccupationType,
            "OccupationDesc": occupationList.find(ele=>ele.Code==IPAList[i].OccupationType)?.CodeDesc,
           
          }
          if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
          obj.SectionList.push(subEntry);
         }
         if(IPAList[i].PersonalMedical!='0' && IPAList[i].PersonalMedical!=null && IPAList[i].PersonalMedical!=''){
          let subEntry= {
            "SectionId": "35",
            "SectionName":"Personal Accident",
            "CoverId":"48",
            "SumInsured": IPAList[i].PersonalMedical,
            "Status": 'Y',
            "OtherOccupation":i,
            "OccupationId": IPAList[i].OccupationType,
            "OccupationDesc": occupationList.find(ele=>ele.Code==IPAList[i].OccupationType)?.CodeDesc,
           
          }
          if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
          obj.SectionList.push(subEntry);
         }
        }
        
      }
      return obj;
      }
      fields: FormlyFieldConfig;
}