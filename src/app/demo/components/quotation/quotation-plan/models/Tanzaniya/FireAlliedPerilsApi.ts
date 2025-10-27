import { FormlyFieldConfig } from "@ngx-formly/core";


export class FireAlliedPerilsApiTanzaniya{
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
       
        let Section = subDetails.filter(ele => ele['SectionId'] == '107' || ele['SectionId'] == '108' || ele['SectionId'] == '109' || ele['SectionId'] == '110' || ele['SectionId'] == '111' ||
          ele['SectionId'] == '112' || ele['SectionId'] == '113' || ele['SectionId'] == '114' || ele['SectionId'] == '115' || ele['SectionId'] == '116'
        );
        console.log(Section);
        if (Section.length != 0) {
          
          let FireSection = Section.filter(ele => ele.CoverId == 244 || ele.CoverId == '244' || 
            ele.CoverId == 248 || ele.CoverId == '248' || ele.CoverId == 249 || ele.CoverId == '249' || ele.CoverId == 250 || ele.CoverId == '250' || ele.CoverId == 251 || ele.CoverId == '251' || ele.CoverId == 252 || ele.CoverId == '252' || ele.CoverId == 253 || ele.CoverId == '253' || ele.CoverId == 254 || ele.CoverId == '254'
          )
          if (FireSection.length != 0) { 
            // obj['RegionCode'] = FireSection[0].RegionCode;
            // obj['InsuranceType'] = FireSection[0].IndustryType;
            // obj['OccupationId'] = FireSection[0].OccupationId;
            // obj['DescriptionOfRiskBI'] = FireSection[0].DescriptionOfRisk;
            // obj['FireSumInsured'] = FireSection[0].FireSumInsured;
            // obj['DescriptionOfRisk'] = FireSection[0].DescriptionOfRisk;
            // obj['BusinessExtension'] = FireSection[0].RegionCode;
            // obj['DistrictCode'] = FireSection[0].DistrictCode;
            obj['InsuranceType'] = FireSection[0].IndustryType;
            obj['Section'] = FireSection[0].SectionId;
            obj['DescriptionOfRisk'] = FireSection[0].DescriptionOfRisk;
            obj['FireSumInsured'] = FireSection[0].SumInsured;
            obj['OccupationId'] = FireSection[0].OccupationId;
           }

          let BISection = Section.filter(ele => ele.CoverId == 245 || ele.CoverId == '245' ||  ele.CoverId == 246 || ele.CoverId == '246')
          if (BISection.length != 0) { 
              if(BISection[0].SectionId) obj['BusinessName'] = Number(BISection[0].SectionId);
              obj['BusinessSI'] = BISection[0].SumInsured;
              obj['DescriptionOfRiskBI'] = BISection[0].DescriptionOfRisk;
              
          }
          return obj
        }
    }
    getSaveDetails(entry,ClaimCostList,industryTypeList,fireIndustryList,obj,type?,getBIList?,sectionList?){
        if(entry.FireSumInsured!=null && entry.FireSumInsured!='' && entry.FireSumInsured!=0){
          let subEntry = {
            "SectionId": entry.Section,
            "SectionName": sectionList.find(ele=>ele.Code==entry.Section)?.CodeDesc, 
              "CategoryId": entry.OccupationId,
              "CategoryDesc": fireIndustryList.find(ele=>ele.Code==entry.OccupationId)?.CodeDesc,
              "Status": entry.SectionDesc,
              "RiskId": entry.RiskId,
              "LocationName": entry.LocationName,
              "BuildingAddress":  entry.BuildingAddress,
              "IndustryId": entry.InsuranceType,
              "IndustryType": entry.InsuranceType,
              "IndustryTypeDesc": industryTypeList.find(ele=>ele.Code==entry.InsuranceType)?.CodeDesc,
              "OccupationId": entry.OccupationId,
                "OccupationDesc": fireIndustryList.find(ele=>ele.Code==entry.OccupationId)?.CodeDesc,
              "CoveringDetails": entry.CoveringDetailsBI,
              "DescriptionOfRisk": entry.DescriptionOfRisk,
              'BusinessInterruption' : entry.BusinessName,
              'FirePlantSi': entry.FireSumInsured,
              "SumInsured": entry.FireSumInsured,
              'BusinessNameDesc' : entry.BusinessNameDesc,
              "RegionCode": entry.RegionCode,
              "DistrictCode": entry.DistrictCode,
              "BuildingSumInsured":  entry.BusinessSI,
              "CoverId":entry.Section == '107' ? '244' : entry.Section == '110' ? '248' : entry.Section == '111' ? '249' : entry.Section == '112' ? '250' : entry.Section == '113' ? '251' : entry.Section == '114' ? '252' : entry.Section == '115' ? '253' : entry.Section == '116' ? '254' : null  
          }
          obj.SectionList.push(subEntry);
        }
        if(entry.BusinessSI!=null && entry.BusinessSI!='' && entry.BusinessSI!=0){
            let coverId=null;
            if(entry.BusinessName=='108' || entry.BusinessName==108) coverId='245'
            else  if(entry.BusinessName=='109' || entry.BusinessName==109) coverId='246'
            let subEntry = {
              "SectionId": entry.BusinessName,
              "SectionName": getBIList.find(ele=>ele.Code==entry.BusinessName)?.CodeDesc, 
              "CategoryId": entry.OccupationId,
              "CategoryDesc": fireIndustryList.find(ele=>ele.Code==entry.OccupationId)?.CodeDesc,
              "Status": entry.SectionDesc,
              "RiskId": entry.RiskId,
              "IndustryId": entry.InsuranceType,
              "IndustryType": entry.InsuranceType,
              "IndustryTypeDesc": industryTypeList.find(ele=>ele.Code==entry.InsuranceType)?.CodeDesc,
              "LocationName": entry.LocationName,
              "BuildingAddress":  entry.BuildingAddress,
                "OccupationId": entry.OccupationId,
                "OccupationDesc": fireIndustryList.find(ele=>ele.Code==entry.OccupationId)?.CodeDesc,
                "CoveringDetails": entry.CoveringDetailsBI,
              "DescriptionOfRisk": entry.DescriptionOfRiskBI,
              'BusinessInterruption' : entry.BusinessName,
              "SumInsured": entry.BusinessSI,
              'BusinessNameDesc' : entry.BusinessNameDesc,
              "RegionCode": entry.RegionCode,
              "DistrictCode": entry.DistrictCode,
              "BuildingSumInsured":  entry.BusinessSI,
              "CoverId": coverId
            }
            obj.SectionList.push(subEntry);
        }
        return obj;    
    }
  fields:FormlyFieldConfig;
      
}