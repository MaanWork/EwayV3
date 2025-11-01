import { ForceLengthValidators } from "../../../common-product-details/common-product-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class BurglaryApiTanzaniya{
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
      console.log(subDetails);
        let Section  = subDetails.filter(ele=>ele['SectionId']=='52');
                            if(Section.length!=0){
                              let burglarySection = Section.filter(ele=>ele.CoverId==116|| ele.CoverId=='116')
                              if(burglarySection.length!=0){
                                obj['FireSumInsured']=burglarySection[0].FirstLossPercentId;
                                obj['BurglarySi']=burglarySection[0].SumInsured;
                                obj['RegionCode']=burglarySection[0].RegionCode;
                                obj['DistrictCode']=burglarySection[0].DistrictCode;
                                obj['DescriptionOfRisk']=burglarySection[0].DescriptionOfRisk;
                                obj['CoveringDetails']=burglarySection[0].CoveringDetails;
                                obj['IndustryType']=null;
                                if(burglarySection[0]?.IndustryType!='0')obj['IndustryType']=burglarySection[0].IndustryType;
                              }
                              
                              return obj
                            }
        return obj;
    }
    getSaveDetails(entry,industryTypeList,obj){  
      console.log(entry);
        
        if(entry.RegionCode!=null && entry.RegionCode!='' && entry.BurglarySi!='0' && entry.BurglarySi!=0 && entry.BurglarySi!=null){
            let subEntry = {
              "SectionId": "52",
              "SectionName": "Burglary",
              "RegionCode": entry.RegionCode,
              "DistrictCode": entry.DistrictCode,
              "CoveringDetails": entry.CoveringDetails,
              "DescriptionOfRisk": entry.DescriptionOfRisk,
              "FirstLossPercentId": entry.FireSumInsured,
              "BurglarySi": entry.BurglarySi,
              "SumInsured": entry.BurglarySi,
              "CoverId":"116",
              "IndustryType":entry.IndustryType,
              "IndustryTypeDesc":industryTypeList.find(ele=>ele.Code==entry.IndustryType)?.CodeDesc,
              RiskId: null
            }
            
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}