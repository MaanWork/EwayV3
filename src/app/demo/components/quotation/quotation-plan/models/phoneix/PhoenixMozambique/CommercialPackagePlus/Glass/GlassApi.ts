import { FormlyFieldConfig } from "@ngx-formly/core";


export class GlassCommercialApiMozambique{
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
          let GlassSection  = subDetails.filter(ele=>ele['SectionId']=='222');
          if(GlassSection.length!=0){
            let glassReinstate = GlassSection.filter(ele=>ele.CoverId==429|| ele.CoverId=='429')
            if(glassReinstate.length!=0){obj['SpecialReinstatement']=glassReinstate[0].SumInsured;obj['SpecialReinstatementDesc']=glassReinstate[0].DescriptionOfRisk;obj['IndustryType']=null;if(glassReinstate[0]?.IndustryType!='0')obj['IndustryType']=glassReinstate[0].IndustryType;}
            let glassInternal = GlassSection.filter(ele=>ele.CoverId==489|| ele.CoverId=='489')
            if(glassInternal.length!=0){obj['InternalGlass']=glassInternal[0].SumInsured;obj['InternalGlassDesc']=glassInternal[0].DescriptionOfRisk;obj['IndustryType']=null;if(glassInternal[0]?.IndustryType!='0')obj['IndustryType']=glassInternal[0].IndustryType;}
            let glassExternal = GlassSection.filter(ele=>ele.CoverId==490|| ele.CoverId=='490')
            if(glassExternal.length!=0){obj['ExternalGlass']=glassExternal[0].SumInsured;obj['ExternalGlassDesc']=glassExternal[0].DescriptionOfRisk;obj['IndustryType']=null;if(glassExternal[0]?.IndustryType!='0')obj['IndustryType']=glassExternal[0].IndustryType;}
            let glassClaims = GlassSection.filter(ele=>ele.CoverId==372|| ele.CoverId=='372')
            if(glassClaims.length!=0){obj['GlassClaimsPreparationCosts']=glassClaims[0].CategoryId;obj['IndustryType']=null;if(glassClaims[0]?.IndustryType!='0')obj['IndustryType']=glassClaims[0].IndustryType;} 
            obj['filled'] = GlassSection.length > 0 ? true: false
            return obj
          }
      }
      getSaveDetails(entry,ClaimCostList,IndustryId,industryTypeList,obj){
          if(entry.SpecialReinstatement!='0' && entry.SpecialReinstatement!=null && entry.SpecialReinstatement!=''){
              let subEntry= {
                "SectionId": "222",
                "SectionName":"Glass",
                "CoverId":"429",
                "SumInsured": entry.SpecialReinstatement,
                "DescriptionOfRisk":entry.SpecialReinstatementDesc,
              }
              if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
              obj.SectionList.push(subEntry);
            }
          if(entry.InternalGlass!='0' && entry.InternalGlass!=null && entry.InternalGlass!=''){
              let subEntry= {
                "SectionId": "222",
                "SectionName":"Glass",
                "CoverId":"489",
                "SumInsured": entry.InternalGlass,
                "DescriptionOfRisk":entry.InternalGlassDesc,
              }
              if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
              obj.SectionList.push(subEntry);
            }
            if(entry.ExternalGlass!='0' && entry.ExternalGlass!=null && entry.ExternalGlass!=''){
              let subEntry= {
                "SectionId": "222",
                "SectionName":"Glass",
                "CoverId":"490",
                "SumInsured": entry.ExternalGlass,
                "DescriptionOfRisk":entry.ExternalGlassDesc,
              }
              if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
              obj.SectionList.push(subEntry);
            }
            if(entry.GlassClaimsPreparationCosts!='0' && entry.GlassClaimsPreparationCosts!=null && entry.GlassClaimsPreparationCosts!=''){
              let subEntry= {
                "SectionId": "222",
                "SectionName":"Glass",
                "CoverId":"372",
                "CategoryId": entry.GlassClaimsPreparationCosts,
                "SumInsured": ClaimCostList.find(ele=>ele.Code==entry.GlassClaimsPreparationCosts)?.CodeDesc?.replaceAll(',','')
              }
              if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
              obj.SectionList.push(subEntry);
            }
          return obj;
      }
    fields:FormlyFieldConfig;
      
}