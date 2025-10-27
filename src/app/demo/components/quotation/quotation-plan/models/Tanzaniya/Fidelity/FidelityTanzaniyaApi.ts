import { FormlyFieldConfig } from "@ngx-formly/core";

export class FidelityTanzaniyaApi{
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
        let Section  = subDetails.filter(ele=>ele['SectionId']=='43');
        console.log(Section);
        
          if (Section.length != 0) {
            obj['FidelityTanzaniya'] = [];
              let sectionList = Section.filter(ele => ele.CoverId == '5' || ele.CoverId == 5);
                for (let ele of sectionList) {
                  console.log('jhsakjak',ele, sectionList);
                  let data = {
                    OccupationId: ele.OccupationId,
                    Count: ele.Count,
                    SumInsured: ele.SumInsured
                  }
                  obj['FidelityTanzaniya'].push(data);
                  obj['IndustryType'] = Section[0].IndustryType
                  
                }
            return obj;
        }
      }
     
    fields:FormlyFieldConfig;
      
}