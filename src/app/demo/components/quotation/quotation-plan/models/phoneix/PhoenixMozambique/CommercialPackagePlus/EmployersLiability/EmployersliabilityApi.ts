import { FormlyFieldConfig } from "@ngx-formly/core";


export class EmployersLiabilityApiMozambique{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
  policyfields:FormlyFieldConfig;
  policyfields1 :FormlyFieldConfig;
  extendsfields:FormlyFieldConfig
    constructor() {
      
    }
    getEditDetails(subDetails, obj) {
      let EmployeeLiabilitySection = subDetails.filter(ele => ele['SectionId'] == '37');
      if (EmployeeLiabilitySection.length != 0) {
          obj['employers'] = []; 
          for (let ele of EmployeeLiabilitySection) {
              let employerData = {
                  OccupationType: ele.CoverId == 293 ? ele.CategoryId : null,
                  NoEmployees: ele.CoverId == 293 ? ele.Count : null,
                  EmpSumInsured: ele.CoverId == 293 ? ele.SumInsured : null,
                  IndustryType: ele.IndustryType && ele.IndustryType != '0' ? ele.IndustryType : null
              };
              obj['employers'].push(employerData);
              obj['EmployersLiability'].push(employerData)
          }
          if(EmployeeLiabilitySection[0]?.IndustryType!='0')obj['IndustryType']=EmployeeLiabilitySection[0].IndustryType;
          return obj;
      }
  }
  
  getSaveDetails(entry,ClaimCostList,occupationList,industryTypeList,obj){
    let list = entry.EmployersLiability;
    if(list){
      for(let index=0;index<list.length;index++){
        if (list[index]?.OccupationType != null && list[index]?.OccupationType != 0 && list[index]?.OccupationType != '0') {
          let subEntry = {
            "SectionId": "37",
            "CoverId": "293",
            "SectionName": "Employers Liability",
            "Count": list[index]?.NoEmployees,
            "SumInsured": String(list[index]?.EmpSumInsured).replaceAll(',', '') ,
            "CategoryId":list[index]?.OccupationType,
            "Status": "Y",
          }
          if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
          if(subEntry['CategoryId']){subEntry["CategoryDesc"]= occupationList.find(ele=>ele.Code==subEntry['CategoryId'])?.CodeDesc}
          obj.SectionList.push(subEntry);
        }

      }
      return obj;
    }
    else return null;
  }
  fields:FormlyFieldConfig;
      
}