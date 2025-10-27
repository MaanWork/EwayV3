
import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class EngineeringErectionAllRiskApiPhoenix{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
        let EARSection  = subDetails.filter(ele=>ele['SectionId']=='233'); 
        let z;
        for (let x = 0; x < info.length; x++) {
          if(info[x].SectionId == 233) z=x;
        }
                            if(EARSection.length!=0){
                              let EARTheft = EARSection.filter(ele=>ele.CoverId==551|| ele.CoverId=='551')
                              if(EARTheft.length!=0){obj['EARTheft']=EARTheft[0].SumInsured;obj['IndustryType']=null;if(EARTheft[0]?.IndustryType!='0')obj['IndustryType']=EARTheft[0].IndustryType;}
                              let EARInland = EARSection.filter(ele=>ele.CoverId==552|| ele.CoverId=='552')
                              if(EARInland.length!=0){obj['EARInland']=EARInland[0].SumInsured;obj['IndustryType']=null;if(EARInland[0]?.IndustryType!='0')obj['IndustryType']=EARInland[0].IndustryType;}
                              let EAROffSite = EARSection.filter(ele=>ele.CoverId==553|| ele.CoverId=='553')
                              if(EAROffSite.length!=0){obj['EAROffSite']=EAROffSite[0].SumInsured;obj['IndustryType']=null;if(EAROffSite[0]?.IndustryType!='0')obj['IndustryType']=EAROffSite[0].IndustryType;}
                              let EAROpentrench = EARSection.filter(ele=>ele.CoverId==554|| ele.CoverId=='554')
                              if(EAROpentrench.length!=0){obj['EAROpentrench']=EAROpentrench[0].SumInsured;obj['IndustryType']=null;if(EAROpentrench[0]?.IndustryType!='0')obj['IndustryType']=EAROpentrench[0].IndustryType;} 
                              let EARFireBridge = EARSection.filter(ele=>ele.CoverId==519|| ele.CoverId=='519')
                              if(EARFireBridge.length!=0){obj['EARFireBridge']=EARFireBridge[0].SumInsured;obj['IndustryType']=null;if(EARFireBridge[0]?.IndustryType!='0')obj['IndustryType']=EARFireBridge[0].IndustryType;}
                              let EARDemolition = EARSection.filter(ele=>ele.CoverId==558|| ele.CoverId=='558')
                              if(EARDemolition.length!=0){obj['EARDemolition']=EARDemolition[0].SumInsured;obj['IndustryType']=null;if(EARDemolition[0]?.IndustryType!='0')obj['IndustryType']=EARDemolition[0].IndustryType;}
                              let EARProfessional = EARSection.filter(ele=>ele.CoverId==556|| ele.CoverId=='556')
                              if(EARProfessional.length!=0){obj['EARProfessional']=EARProfessional[0].SumInsured;obj['IndustryType']=null;if(EARProfessional[0]?.IndustryType!='0')obj['IndustryType']=EARProfessional[0].IndustryType;}
                              let EAREscalation = EARSection.filter(ele=>ele.CoverId==569|| ele.CoverId=='569')
                              if(EAREscalation.length!=0){obj['EAREscalation']=EAREscalation[0].SumInsured;obj['IndustryType']=null;if(EAREscalation[0]?.IndustryType!='0')obj['IndustryType']=EAREscalation[0].IndustryType;} 
                              let EARDevaluation = EARSection.filter(ele=>ele.CoverId==567|| ele.CoverId=='567')
                              if(EARDevaluation.length!=0){obj['EARDevaluation']=EARDevaluation[0].SumInsured;obj['IndustryType']=null;if(EARDevaluation[0]?.IndustryType!='0')obj['IndustryType']=EARDevaluation[0].IndustryType;}
                              let EARClaimPreparation = EARSection.filter(ele=>ele.CoverId==367|| ele.CoverId=='367')
                              if(EARClaimPreparation.length!=0){obj['EARClaimPreparation']=EARClaimPreparation[0].SumInsured;obj['IndustryType']=null;if(EARClaimPreparation[0]?.IndustryType!='0')obj['IndustryType']=EARClaimPreparation[0].IndustryType;}
                              let EARSurrounding = EARSection.filter(ele=>ele.CoverId==557|| ele.CoverId=='557')
                              if(EARSurrounding.length!=0){obj['EARSurrounding']=EARSurrounding[0].SumInsured;obj['IndustryType']=null;if(EARSurrounding[0]?.IndustryType!='0')obj['IndustryType']=EARSurrounding[0].IndustryType;}
                              let EAREstimated = EARSection.filter(ele=>ele.CoverId==549|| ele.CoverId=='549')
                              if(EAREstimated.length!=0){obj['EAREstimated']=EAREstimated[0].SumInsured;obj['IndustryType']=null;if(EAREstimated[0]?.IndustryType!='0')obj['IndustryType']=EAREstimated[0].IndustryType;}
                              let EARAnnualTurnover = EARSection.filter(ele=>ele.CoverId==568|| ele.CoverId=='568')
                              if(EARAnnualTurnover.length!=0){obj['EARAnnualTurnover']=EARAnnualTurnover[0].SumInsured;obj['IndustryType']=null;if(EARAnnualTurnover[0]?.IndustryType!='0')obj['IndustryType']=EARAnnualTurnover[0].IndustryType;}
                              let EARMaximumContract = EARSection.filter(ele=>ele.CoverId==550|| ele.CoverId=='550')
                              if(EARMaximumContract.length!=0){obj['EARMaximumContract']=EARMaximumContract[0].SumInsured;obj['IndustryType']=null;if(EARMaximumContract[0]?.IndustryType!='0')obj['IndustryType']=EARMaximumContract[0].IndustryType;}
                              let EARBuilding = EARSection.filter(ele=>ele.CoverId==105|| ele.CoverId=='105')
                              if(EARBuilding.length!=0){obj['EARBuildingSumInsureds']=EARBuilding[0].SumInsured;obj['IndustryType']=null;if(EARBuilding[0]?.IndustryType!='0')obj['IndustryType']=EARBuilding[0].IndustryType;}
                              let EARConstruction = EARSection.filter(ele=>ele.CoverId==105|| ele.CoverId=='105')
                              if(EARConstruction.length!=0){obj['EARConstructionType']=EARConstruction[0].CategoryId;obj['IndustryType']=null;if(EARConstruction[0]?.IndustryType!='0')obj['IndustryType']=EARConstruction[0].IndustryType;}
                              if(info){ obj['EARDescription']=info[z]?.Description;}
                              if(info){ obj['EARAnnual']=info[z]?.AnnualOpen;}
                              if(info){ obj['EARPrincipal']=info[z]?.PrincipalOwner;}
                              if(info){ obj['EARLocationName']=info[z]?.LocationName;}
                              if(info){ obj['EARStartDate']=info[z]?.StartDate;}
                              if(info){ obj['EARPeriodOfActivity']=info[z]?.PeriodOfActivity;}
                              console.log(obj);
                              obj['filled'] = EARSection.length > 0 ? true : false
                              return obj
                            }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
         
          
          if(entry.EARInland!='0' && entry.EARInland!=null && entry.EARInland!=''  && entry.EARInland!='undefined' && entry.EARInland!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"552",
              "SumInsured": entry.EARInland
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
          if(entry.EAROpentrench!='0' && entry.EAROpentrench!=null && entry.EAROpentrench!='' && entry.EAROpentrench!='undefined' && entry.EAROpentrench!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"554",
              "SumInsured": entry.EAROpentrench
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.EARFireBridge!='0' && entry.EARFireBridge!=null && entry.EARFireBridge!='' && entry.EARFireBridge!='undefined' && entry.EARFireBridge!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"519",
              "SumInsured": entry.EARFireBridge
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.EARDemolition!='0' && entry.EARDemolition!=null && entry.EARDemolition!='' && entry.EARDemolition!='undefined' && entry.EARDemolition!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"558",
              "SumInsured": entry.EARDemolition
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.EARProfessional!='0' && entry.EARProfessional!=null && entry.EARProfessional!='' && entry.EARProfessional!='undefined' && entry.EARProfessional!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"556",
              "SumInsured": entry.EARProfessional
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.EAREscalation!='0' && entry.EAREscalation!=null && entry.EAREscalation!='' && entry.EAREscalation!='undefined' && entry.EAREscalation!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"569",
              "SumInsured": entry.EAREscalation
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.EARDevaluation!='0' && entry.EARDevaluation!=null && entry.EARDevaluation!='' && entry.EARDevaluation!='undefined' && entry.EARDevaluation!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"567",
              "SumInsured": entry.EARDevaluation
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.EARClaimPreparation!='0' && entry.EARClaimPreparation!=null && entry.EARClaimPreparation!=''  && entry.EARClaimPreparation!='undefined' && entry.EARClaimPreparation!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"367",
              "SumInsured": entry.EARClaimPreparation
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.EARSurrounding!='0' && entry.EARSurrounding!=null && entry.EARSurrounding!='' && entry.EARSurrounding!='undefined' && entry.EARSurrounding!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"557",
              "SumInsured": entry.EARSurrounding
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.EAREstimated!='0' && entry.EAREstimated!=null && entry.EAREstimated!='' && entry.EAREstimated!='undefined' && entry.EAREstimated!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"549",
              "SumInsured": entry.EAREstimated
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.EARAnnualTurnover!='0' && entry.EARAnnualTurnover!=null && entry.EARAnnualTurnover!='' && entry.EARAnnualTurnover!='undefined' && entry.EARAnnualTurnover!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"568",
              "SumInsured": entry.EARAnnualTurnover
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
        
          if(entry.EARConstructionType!='0' && entry.EARConstructionType!=null && entry.EARConstructionType!='' && entry.EARBuildingSumInsureds!='0' && entry.EARBuildingSumInsureds!=null && entry.EARBuildingSumInsureds!='' && entry.EARBuildingSumInsureds!='undefined' && entry.EARBuildingSumInsureds!=undefined){
            let subEntry= {
              "SectionId": "233",
              "SectionName":"Erection All Risk",
              "CoverId":"105",
              "SumInsured": entry.EARBuildingSumInsureds,
              "CategoryId":entry.EARConstructionType
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}