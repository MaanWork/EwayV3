import { FormlyFieldConfig } from "@ngx-formly/core";

export class CarrierLegalLiabilityApi{
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
      let Section  = subDetails.filter(ele=>ele['SectionId']=='272');
      
      if(Section.length!=0){
        let liabilitySection  = subDetails.filter(ele=>ele['CoverId']=='627');
        obj['LiablitySumInsured']=liabilitySection[0].SumInsured;
        obj['CommodityDesc']=Section[0].DescriptionOfRisk;
        obj['TerritorialLimits']=Section[0].GeographicalCoverage;
        let IndeminitySection  = subDetails.filter(ele=>ele['CoverId']=='293');
        obj['IndeminitySumInsured']=IndeminitySection[0].SumInsured;
        obj['CommodityDesc']=IndeminitySection[0].DescriptionOfRisk;
        obj['TerritorialLimits']=IndeminitySection[0].GeographicalCoverage;
        return obj
      }
    }
    getSaveDetails(entry,obj){  
        if(entry.LiablitySumInsured!='0' && entry.LiablitySumInsured!=null && entry.LiablitySumInsured!='' && entry.LiablitySumInsured != 'undefined' && entry.LiablitySumInsured != undefined){
            let subEntry= {
              "SectionId": '272',
              "SectionName":'Carrier Legal Liability',
              "CoverId": '627' ,
              "SumInsured": entry.LiablitySumInsured,
              "GeographicalCoverage":entry.TerritorialLimits,
              "DescriptionOfRisk": entry.CommodityDesc
            }
            obj.SectionList.push(subEntry);
          }
            if(entry.IndeminitySumInsured!='0' && entry.IndeminitySumInsured!=null && entry.IndeminitySumInsured!='' && entry.IndeminitySumInsured != 'undefined' && entry.IndeminitySumInsured != undefined){
            let subEntry= {
              "SectionId": '272',
              "SectionName":'Carrier Legal Liability',
              "CoverId": '293' ,
              "SumInsured": entry.IndeminitySumInsured,
              "GeographicalCoverage":entry.TerritorialLimits,
              "DescriptionOfRisk": entry.CommodityDesc
            }
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}