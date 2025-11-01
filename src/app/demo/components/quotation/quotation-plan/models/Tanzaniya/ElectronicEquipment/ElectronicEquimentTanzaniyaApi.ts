import { FormlyFieldConfig } from "@ngx-formly/core";

export class ElectronicEquipmentTanzaniyaApi{
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
        let Section  = subDetails.filter(ele=>ele['SectionId']=='76');
        console.log(Section);
        
          if (Section.length != 0) {
            obj['EETanzaniya'] = [];
              let sectionList = Section.filter(ele => ele.CoverId == '90' || ele.CoverId == 90);
                for (let ele of sectionList) {
                  console.log('jhsakjak',ele, sectionList);
                  let data = {
                    SumInsured: ele.SumInsured,
                    DescriptionOfRisk: ele.DescriptionOfRisk,
                    SerialNo: ele.SerialNo,
                    ContentId: ele.ContentId
                  }
                  obj['EETanzaniya'].push(data);
                 if(Section[0].IndustryType) obj['IndustryType'] = Section[0].IndustryType
                  // if(ele.CoverId == 290 || ele.CoverId=='290'){
                  //       let houseData =  {
                  //           ContentInsured: ele.CoverId == 290 || ele.CoverId == "290" ? ele.SumInsured : null,
                  //           ContentDescription: ele.CoverId == 290 || ele.CoverId == "290" ? ele.DescriptionOfRisk : null,
                  //           ContentsType: ele.CoverId == 290 || ele.CoverId == "290" ? ele.CategoryId : null,
                  //           IndustryType: ele.IndustryType && ele.IndustryType != '0' ? ele.IndustryType : null
                  //         };
                    
                  //         obj['contents'].push(houseData);
                  // }
                }
            return obj;
        }
      }
     
    fields:FormlyFieldConfig;
      
}