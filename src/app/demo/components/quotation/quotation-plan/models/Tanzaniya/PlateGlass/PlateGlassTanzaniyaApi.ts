import { FormlyFieldConfig } from "@ngx-formly/core";

export class PlateGlassTanzaniyaApi{
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
        let Section  = subDetails.filter(ele=>ele['SectionId']=='53');
        console.log(Section);
        
          if (Section.length != 0) {
            obj['plateglass'] = [];
              let sectionList = Section.filter(ele => ele.CoverId == '386' || ele.CoverId == 386);
                for (let ele of sectionList) {
                  console.log('jhsakjak',ele, sectionList);
                  let data = {
                    CategoryId: ele.CategoryId,
                    SumInsured: ele.SumInsured
                  }
                  obj['plateglass'].push(data);
                  obj['IndustryType'] = Section[0].IndustryType
                  
                }
            return obj;
        }
      }
     
    fields:FormlyFieldConfig;
      
}