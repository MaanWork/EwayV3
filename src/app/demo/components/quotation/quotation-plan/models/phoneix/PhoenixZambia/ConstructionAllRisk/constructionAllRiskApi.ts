import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class ConstructionAllRiskApiPhoenix{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      
    }
    getEditDetails(subDetails,obj,info){
        let CARSection  = subDetails.filter(ele=>ele['SectionId']=='229');
                            if(CARSection.length!=0){
                              let CARTheft = CARSection.filter(ele=>ele.CoverId==551|| ele.CoverId=='551')
                              if(CARTheft.length!=0){obj['CARTheft']=CARTheft[0].SumInsured;obj['IndustryType']=null;if(CARTheft[0]?.IndustryType!='0')obj['IndustryType']=CARTheft[0].IndustryType;}
                              let CARInland = CARSection.filter(ele=>ele.CoverId==552|| ele.CoverId=='552')
                              if(CARInland.length!=0){obj['CARInland']=CARInland[0].SumInsured;obj['IndustryType']=null;if(CARInland[0]?.IndustryType!='0')obj['IndustryType']=CARInland[0].IndustryType;}
                              let CAROffSite = CARSection.filter(ele=>ele.CoverId==553|| ele.CoverId=='553')
                              if(CAROffSite.length!=0){obj['CAROffSite']=CAROffSite[0].SumInsured;obj['IndustryType']=null;if(CAROffSite[0]?.IndustryType!='0')obj['IndustryType']=CAROffSite[0].IndustryType;}
                              let CAROpentrench = CARSection.filter(ele=>ele.CoverId==554|| ele.CoverId=='554')
                              if(CAROpentrench.length!=0){obj['CAROpentrench']=CAROpentrench[0].SumInsured;obj['IndustryType']=null;if(CAROpentrench[0]?.IndustryType!='0')obj['IndustryType']=CAROpentrench[0].IndustryType;} 
                              let CARFireBridge = CARSection.filter(ele=>ele.CoverId==519|| ele.CoverId=='519')
                              if(CARFireBridge.length!=0){obj['CARFireBridge']=CARFireBridge[0].SumInsured;obj['IndustryType']=null;if(CARFireBridge[0]?.IndustryType!='0')obj['IndustryType']=CARFireBridge[0].IndustryType;}
                              let CARDemolition = CARSection.filter(ele=>ele.CoverId==558|| ele.CoverId=='558')
                              if(CARDemolition.length!=0){obj['CARDemolition']=CARDemolition[0].SumInsured;obj['IndustryType']=null;if(CARDemolition[0]?.IndustryType!='0')obj['IndustryType']=CARDemolition[0].IndustryType;}
                              let CARProfessional = CARSection.filter(ele=>ele.CoverId==556|| ele.CoverId=='556')
                              if(CARProfessional.length!=0){obj['CARProfessional']=CARProfessional[0].SumInsured;obj['IndustryType']=null;if(CARProfessional[0]?.IndustryType!='0')obj['IndustryType']=CARProfessional[0].IndustryType;}
                              let CAREscalation = CARSection.filter(ele=>ele.CoverId==569|| ele.CoverId=='569')
                              if(CAREscalation.length!=0){obj['CAREscalation']=CAREscalation[0].SumInsured;obj['IndustryType']=null;if(CAREscalation[0]?.IndustryType!='0')obj['IndustryType']=CAREscalation[0].IndustryType;} 
                              let CARDevaluation = CARSection.filter(ele=>ele.CoverId==567|| ele.CoverId=='567')
                              if(CARDevaluation.length!=0){obj['CARDevaluation']=CARDevaluation[0].SumInsured;obj['IndustryType']=null;if(CARDevaluation[0]?.IndustryType!='0')obj['IndustryType']=CARDevaluation[0].IndustryType;}
                              let CARClaimPreparation = CARSection.filter(ele=>ele.CoverId==367|| ele.CoverId=='367')
                              if(CARClaimPreparation.length!=0){obj['CARClaimPreparation']=CARClaimPreparation[0].SumInsured;obj['IndustryType']=null;if(CARClaimPreparation[0]?.IndustryType!='0')obj['IndustryType']=CARClaimPreparation[0].IndustryType;}
                              let CARSurrounding = CARSection.filter(ele=>ele.CoverId==557|| ele.CoverId=='557')
                              if(CARSurrounding.length!=0){obj['CARSurrounding']=CARSurrounding[0].SumInsured;obj['IndustryType']=null;if(CARSurrounding[0]?.IndustryType!='0')obj['IndustryType']=CARSurrounding[0].IndustryType;}
                              let CAREstimated = CARSection.filter(ele=>ele.CoverId==549|| ele.CoverId=='549')
                              if(CAREstimated.length!=0){obj['CAREstimated']=CAREstimated[0].SumInsured;obj['IndustryType']=null;if(CAREstimated[0]?.IndustryType!='0')obj['IndustryType']=CAREstimated[0].IndustryType;}
                              let CARAnnualTurnover = CARSection.filter(ele=>ele.CoverId==568|| ele.CoverId=='568')
                              if(CARAnnualTurnover.length!=0){obj['CARAnnualTurnover']=CARAnnualTurnover[0].SumInsured;obj['IndustryType']=null;if(CARAnnualTurnover[0]?.IndustryType!='0')obj['IndustryType']=CARAnnualTurnover[0].IndustryType;}
                              let CarMaximumContract = CARSection.filter(ele=>ele.CoverId==550|| ele.CoverId=='550')
                              if(CarMaximumContract.length!=0){obj['CarMaximumContract']=CarMaximumContract[0].SumInsured;obj['IndustryType']=null;if(CarMaximumContract[0]?.IndustryType!='0')obj['IndustryType']=CarMaximumContract[0].IndustryType;}
                              let CARBuilding = CARSection.filter(ele=>ele.CoverId==105|| ele.CoverId=='105')
                              if(CARBuilding.length!=0){obj['BuildingSumInsureds']=CARBuilding[0].SumInsured;obj['IndustryType']=null;if(CARBuilding[0]?.IndustryType!='0')obj['IndustryType']=CARBuilding[0].IndustryType;}
                              let CARConstruction = CARSection.filter(ele=>ele.CoverId==105|| ele.CoverId=='105')
                              if(CARConstruction.length!=0){obj['ConstructionType']=CARConstruction[0].CategoryId;obj['IndustryType']=null;if(CARConstruction[0]?.IndustryType!='0')obj['IndustryType']=CARConstruction[0].IndustryType;}
                              if(info){ obj['CARDescription']=info[0].Description;}
                              if(info){ obj['CARAnnual']=info[0].AnnualOpen;}
                              if(info){ obj['CARPrincipal']=info[0].PrincipalOwner;}
                              if(info){ obj['CARLocationName']=info[0].LocationName;}
                              if(info){ obj['CARStartDate']=info[0].StartDate;}
                              if(info){ obj['CARPeriodOfActivity']=info[0].PeriodOfActivity;}

                              return obj
                            }
    }
    getSaveDetails(entry,IndustryId,industryTypeList,obj){
        
          if(entry.CARInland!='0' && entry.CARInland!=null && entry.CARInland!=''  && entry.CARInland!='undefined' && entry.CARInland!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"552",
              "SumInsured": entry.CARInland
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
       
          if(entry.CAROpentrench!='0' && entry.CAROpentrench!=null && entry.CAROpentrench!='' && entry.CAROpentrench!='undefined' && entry.CAROpentrench!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"554",
              "SumInsured": entry.CAROpentrench
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.CARFireBridge!='0' && entry.CARFireBridge!=null && entry.CARFireBridge!='' && entry.CARFireBridge!='undefined' && entry.CARFireBridge!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"519",
              "SumInsured": entry.CARFireBridge
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.CARDemolition!='0' && entry.CARDemolition!=null && entry.CARDemolition!=''  && entry.CARDemolition!='undefined' && entry.CARDemolition!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"558",
              "SumInsured": entry.CARDemolition
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.CARProfessional!='0' && entry.CARProfessional!=null && entry.CARProfessional!=''  && entry.CARProfessional!='undefined' && entry.CARProfessional!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"556",
              "SumInsured": entry.CARProfessional
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.CAREscalation!='0' && entry.CAREscalation!=null && entry.CAREscalation!='' && entry.CAREscalation!='undefined' && entry.CAREscalation!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"569",
              "SumInsured": entry.CAREscalation
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.CARDevaluation!='0' && entry.CARDevaluation!=null && entry.CARDevaluation!='' && entry.CARDevaluation!='undefined' && entry.CARDevaluation!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"567",
              "SumInsured": entry.CARDevaluation
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.CARClaimPreparation!='0' && entry.CARClaimPreparation!=null && entry.CARClaimPreparation!='' && entry.CARClaimPreparation!='undefined' && entry.CARClaimPreparation!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"367",
              "SumInsured": entry.CARClaimPreparation
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.CARSurrounding!='0' && entry.CARSurrounding!=null && entry.CARSurrounding!='' && entry.CARSurrounding!='undefined' && entry.CARSurrounding!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"557",
              "SumInsured": entry.CARSurrounding
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.CAREstimated!='0' && entry.CAREstimated!=null && entry.CAREstimated!=''  && entry.CAREstimated!='undefined' && entry.CAREstimated!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"549",
              "SumInsured": entry.CAREstimated
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
          if(entry.CARAnnualTurnover!='0' && entry.CARAnnualTurnover!=null && entry.CARAnnualTurnover!='' && entry.CARAnnualTurnover!='undefined' && entry.CARAnnualTurnover!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"568",
              "SumInsured": entry.CARAnnualTurnover
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
        
          if(entry.ConstructionType!='0' && entry.ConstructionType!=null && entry.ConstructionType!='' && entry.BuildingSumInsureds!='0' && entry.BuildingSumInsureds!=null && entry.BuildingSumInsureds!='' && entry.BuildingSumInsureds!='undefined' && entry.BuildingSumInsureds!=undefined){
            let subEntry= {
              "SectionId": "229",
              "SectionName":"Construction All Risk Section",
              "CoverId":"105",
              "SumInsured": entry.BuildingSumInsureds,
              "CategoryId":entry.ConstructionType
            }
            if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}