import { FormlyFieldConfig } from "@ngx-formly/core";


export class PublicLiabilityApiTanzaniya{
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
      let PublicLiabilityPhoenix = subDetails.filter(ele => ele['SectionId'] == '54');
      if (PublicLiabilityPhoenix.length != 0) {
        let publicLiabilitySI = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '259');
        if (publicLiabilitySI.length != 0) { obj['publicLiabilitySI'] = publicLiabilitySI[0].SumInsured; }
        let publicLimitSI = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '623');
        if (publicLimitSI.length != 0) { obj['publicLimitSI'] = publicLimitSI[0].SumInsured; }
        let productLiabilitySI = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '436');
        if (productLiabilitySI.length != 0) { obj['productLiabilitySI'] = productLiabilitySI[0].SumInsured; }
        let productLimitSI = PublicLiabilityPhoenix.filter(ele => ele.CoverId == '624');
        if (productLimitSI.length != 0) { obj['productLimitSI'] = productLimitSI[0].SumInsured; }
        obj['IndustryType'] = PublicLiabilityPhoenix[0]['IndustryType']
        return obj
      }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
        
        if(entry.publicLiabilitySI!=null && entry.publicLiabilitySI!='' && entry.publicLiabilitySI!='0' && entry.publicLiabilitySI!='null' 
          && entry.publicLiabilitySI!=undefined
        ){
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "259",
            "SumInsured": entry.publicLiabilitySI,
            "CategoryId": null,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
        if(entry.publicLimitSI!=null && entry.publicLimitSI!='' && entry.publicLimitSI!='0' && entry.publicLimitSI!='null' 
          && entry.publicLimitSI!=undefined
        ){
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "623",
            "SumInsured": entry.publicLimitSI,
            "CategoryId": null,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
        if(entry.productLiabilitySI!=null && entry.productLiabilitySI!='' && entry.productLiabilitySI!='0' && entry.productLiabilitySI!='null' 
          && entry.productLiabilitySI!=undefined){
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "436",
            "SumInsured": entry.productLiabilitySI,
            "CategoryId": null,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
        if(entry.productLimitSI!=null && entry.productLimitSI!='' && entry.productLimitSI!='0' && entry.productLimitSI!='null' 
          && entry.productLimitSI!=undefined
        ){
          let subEntry = {
            "SectionId": "54","SectionName": "Public Liabilty",
            "CoverId": "624",
            "SumInsured": entry.productLimitSI,
            "CategoryId": null,
            "Status": "Y",
          }
          if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
          obj.SectionList.push(subEntry);
        }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}