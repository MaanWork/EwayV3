import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class AccidentalDamageCommercialNamibiaApi{
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
        let AccDamageSection  = subDetails.filter(ele=>ele['SectionId']=='56');
        console.log(AccDamageSection);
        
        // this.loopProductItem.push(AccDamageSection);
        // console.log(this.loopProductItem);
        if(AccDamageSection.length!=0){
          let accPhysical = AccDamageSection.filter(ele=>ele.CoverId==417 || ele.CoverId=='417')
          if(accPhysical.length!=0){obj['AccidentalPhysicalLossDamage']=accPhysical[0].SumInsured;obj['AccidentalPhysicalLossDamageDesc']=accPhysical[0].DescriptionOfRisk;obj['IndustryType']=null;if(accPhysical[0]?.IndustryType!='0')obj['IndustryType']=accPhysical[0].IndustryType;}
          let accMaximum = AccDamageSection.filter(ele=>ele.CoverId==416 || ele.CoverId=='416')
          if(accMaximum.length!=0){obj['MaximumLimitperOccurrence']=accMaximum[0].SumInsured;obj['MaximumLimitperOccurrenceDesc']=accMaximum[0].DescriptionOfRisk;obj['IndustryType']=null;if(accMaximum[0]?.IndustryType!='0')obj['IndustryType']=accMaximum[0].IndustryType;}
          let accAdditional = AccDamageSection.filter(ele=>ele.CoverId==367 || ele.CoverId=='367')
          if(accAdditional.length!=0){obj['AccidentalAdditionalclaimsPreparationCosts']=accAdditional[0].CategoryId;obj['IndustryType']=null;if(accAdditional[0]?.IndustryType!='0')obj['IndustryType']=accAdditional[0].IndustryType;}
          let accAccidental = AccDamageSection.filter(ele=>ele.CoverId==491 || ele.CoverId=='491')
          if(accAccidental.length!=0){obj['Accidentaloilandchemical']=accAccidental[0].SumInsured;obj['AccidentaloilandchemicalDesc']=accAccidental[0].DescriptionOfRisk;obj['IndustryType']=null;if(accAccidental[0]?.IndustryType!='0')obj['IndustryType']=accAccidental[0].IndustryType;}
          obj['filled'] = AccDamageSection.length > 0 ? true: false
          return obj
      }
    }
    getSaveDetails(entry,ClaimCostList,industryTypeList,obj,PackageIndustryType,FireIndustryList){
      console.log(entry.AccidentalAdditionalclaimsPreparationCosts);
      
        if(entry.MaximumLimitperOccurrence!='0' && entry.MaximumLimitperOccurrence!=null && entry.MaximumLimitperOccurrence!=''){
            let subEntry= {
              "SectionId": "56",
              "SectionName":"AccidentalDamage",
              "CoverId":"416",
              "SumInsured": entry.MaximumLimitperOccurrence,
              "DescriptionOfRisk": entry.MaximumLimitperOccurrenceDesc,
              "IndustryType":PackageIndustryType,
              "IndustryTypeDesc":FireIndustryList.find(ele=>ele.Code==PackageIndustryType)?.CodeDesc,
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.AccidentalPhysicalLossDamage!='0' && entry.AccidentalPhysicalLossDamage!=null && entry.AccidentalPhysicalLossDamage!=''){
            let subEntry= {
              "SectionId": "56",
              "SectionName":"AccidentalDamage",
              "CoverId":"417",
              "SumInsured": entry.AccidentalPhysicalLossDamage,
              "DescriptionOfRisk": entry.AccidentalPhysicalLossDamageDesc,
              "IndustryType":PackageIndustryType,
              "IndustryTypeDesc":FireIndustryList.find(ele=>ele.Code==PackageIndustryType)?.CodeDesc,
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.AccidentalAdditionalclaimsPreparationCosts!='0' && entry.AccidentalAdditionalclaimsPreparationCosts!=null && entry.AccidentalAdditionalclaimsPreparationCosts!=''){
            let subEntry= {
              "SectionId": "56",
              "SectionName":"AccidentalDamage",
              "CoverId":"367",
              "SumInsured": ClaimCostList.find(ele=>ele.Code==entry.AccidentalAdditionalclaimsPreparationCosts)?.CodeDesc?.replaceAll(',',''),
              "CategoryId": entry.AccidentalAdditionalclaimsPreparationCosts,
              "IndustryType":PackageIndustryType,
              "IndustryTypeDesc":FireIndustryList.find(ele=>ele.Code==PackageIndustryType)?.CodeDesc,
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.Accidentaloilandchemical!='0' && entry.Accidentaloilandchemical!=null && entry.Accidentaloilandchemical!=''){
            let subEntry= {
              "SectionId": "56",
              "SectionName":"AccidentalDamage",
              "CoverId":"491",
              "SumInsured": entry.Accidentaloilandchemical,
              "DescriptionOfRisk": entry.AccidentaloilandchemicalDesc,
              "IndustryType":PackageIndustryType,
              "IndustryTypeDesc":FireIndustryList.find(ele=>ele.Code==PackageIndustryType)?.CodeDesc,
            }
            if(entry['IndustryType']){subEntry['IndustryType'] = entry['IndustryType'];subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==entry['IndustryType'])?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}