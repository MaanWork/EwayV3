import { FormlyFieldConfig } from "@ngx-formly/core";


export class DeteriorationOfStockEngineeringApiSwaziland{
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
    getSaveDetails(entry,ClaimCostList,IndustryId,industryTypeList,obj){
      if (entry.DeteriorationOfStock != 0 && entry.DeteriorationOfStock != null && entry.DeteriorationOfStock != '' && entry.DeteriorationOfStockDesc != null && entry.DeteriorationOfStockDesc != '') {
        let subEntry = {
          "SectionId": "226","SectionName":"Deterioration Of Stock",
          "Status": "Y", "SumInsured": entry.DeteriorationOfStock,
          "CoverId": "471",
          "DescriptionOfRisk": entry.DeteriorationOfStockDesc
        }
         if (IndustryId) { subEntry['IndustryType'] = IndustryId; subEntry["IndustryTypeDesc"] = industryTypeList.find(ele => ele.Code == IndustryId)?.CodeDesc }
        obj.SectionList.push(subEntry);
      }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}