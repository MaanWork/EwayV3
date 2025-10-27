import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class DeteriorationOfStockApiMozambique{
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
    let DeteriorationOfStockPhoenix = subDetails.filter(ele => ele['SectionId'] == '226');
                        if (DeteriorationOfStockPhoenix.length != 0) {
                          let DeteriorationOfStockList = DeteriorationOfStockPhoenix.filter(ele => ele.CoverId == '471' ||  ele.CoverId == 471);
                          if (DeteriorationOfStockList.length != 0) { obj['DeteriorationOfStock'] = DeteriorationOfStockList[0].SumInsured;obj['DeteriorationOfStockDesc']= DeteriorationOfStockList[0].DescriptionOfRisk;obj['IndustryType']=DeteriorationOfStockList[0].IndustryType;}
                          return obj
                        }
  }
  getSaveDetails(entry,Industry,industryTypeList,obj){
    if (entry.DeteriorationOfStock != 0 && entry.DeteriorationOfStock != null && entry.DeteriorationOfStock != '' && entry.DeteriorationOfStockDesc != null && entry.DeteriorationOfStockDesc != '') {
      let subEntry = {
        "SectionId": "226","SectionName":"Deterioration Of Stock",
        "Status": "Y", "SumInsured": entry.DeteriorationOfStock,
        "CoverId": "471",
        "DescriptionOfRisk": entry.DeteriorationOfStockDesc
      }
      if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
      obj.SectionList.push(subEntry);
    }
      return obj;
  }
fields:FormlyFieldConfig;
      
}