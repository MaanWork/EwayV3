import { FormlyFieldConfig } from "@ngx-formly/core";


export class BuildingCombinedCommercialMozambiqueApi{
  customerDetails: any;
  commonDetails: any[]=[];
  endorsementSection: boolean=false;subuserType:any=null;
  enableFieldsList: any[]=[];finalizeYN:any='N';
policyfields:FormlyFieldConfig;
policyfields1 :FormlyFieldConfig;
extendsfields:FormlyFieldConfig
  constructor() {
    
  }
  getEditDetails(subDetails,obj,BIValue,EValue,showInterruptions,showExtensionToggle,showExtensions){
      let BuildingList  = subDetails.filter(ele=>ele['SectionId']=='1');
                      if(BuildingList.length!=0){
                          let building = BuildingList.filter(ele=>ele.CoverId=='105' || ele.CoverId==105);
                          if(building.length!=0){
                            obj['fireBuildingSumInsuredBC']=building[0].SumInsured;
                            obj['ConstructionTypeBC']=building[0]?.CategoryId;
                            obj['IndustryType'] = building[0]?.IndustryType
                          }
                          let inflation = BuildingList.filter(ele=>ele.CoverId=='360' || ele.CoverId==360);
                          if(inflation.length!=0){
                            obj['fireBuildingSumInsuredBC']=inflation[0].SumInsured;
                            obj['AdditonalInflationBC']=inflation[0].BuildingUsageId;
                            obj['IndustryType'] = inflation[0]?.IndustryType
                          }
                          let indemnity = BuildingList.filter(ele=>ele.CoverId=='495' || ele.CoverId==495);
                          if(indemnity.length!=0){
                            BIValue='Y';showInterruptions = true;showExtensionToggle=true;
                            obj['IndeminityPeriodBC']=indemnity[0]?.CategoryId;
                            obj['BISumInsuredBC']=indemnity[0].SumInsured;
                            obj['IndustryType'] = inflation[0]?.IndustryType
                          }
                          let coverList = BuildingList.filter(ele => ele.CoverId == '470' || ele.CoverId == 470 || ele.CoverId == '492' || ele.CoverId == 492);
                          if (coverList.length != 0) {
                            BIValue = 'Y'; showInterruptions = true; showExtensionToggle = true;
                            obj['IndustryType'] = coverList[0]?.IndustryType
                            obj['CoverBC'] = String(coverList[0]?.CoverId)
                            obj['BISumInsuredBC'] = coverList[0].SumInsured;
                          }
                          let grossRenewalsList = BuildingList.filter(ele=>ele.CoverId=='493' || ele.CoverId==493);
                            if(grossRenewalsList.length!=0){
                              BIValue='Y';showInterruptions = true;showExtensionToggle=true;
                              obj['GrossRentalsBC']=grossRenewalsList[0].SumInsured;obj['IndustryType'] = grossRenewalsList[0]?.IndustryType
                            }
                            let AccidentalDamageList = BuildingList.filter(ele=>ele.CoverId=='156' || ele.CoverId==156);
                            if(AccidentalDamageList.length!=0){
                              BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                              obj['AccidentalDamageBC']=AccidentalDamageList[0].SumInsured;
                              
                            }
                            let ClaimPreparationCost = BuildingList.filter(ele=>ele.CoverId=='372' || ele.CoverId==372);
                            if(ClaimPreparationCost.length!=0){
                              BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                              obj['ClaimPreparationCostBC']=ClaimPreparationCost[0].SumInsured;
                            }
                            let UnspecifiedSupplier = BuildingList.filter(ele=>ele.CoverId=='483' || ele.CoverId==483);
                            if(UnspecifiedSupplier.length!=0){
                              BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                              obj['UnspecifiedSupplierBC']=UnspecifiedSupplier[0].SumInsured;
                            }
                            let PreventionofAccessSI = BuildingList.filter(ele=>ele.CoverId=='494' || ele.CoverId==494);
                            if(PreventionofAccessSI.length!=0){
                              BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                              obj['PreventionofAccessBC']=PreventionofAccessSI[0].SumInsured;
                            }
                            let PublicTelecommuncationSI = BuildingList.filter(ele=>ele.CoverId=='481' || ele.CoverId==481);
                            if(PublicTelecommuncationSI.length!=0){
                              BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                              obj['PublicTelecommuncationSIBC']=PublicTelecommuncationSI[0].SumInsured; obj['PublicTelecommuncationBC']=PublicTelecommuncationSI[0]?.CategoryId;
                            }
                            let PublicUtilitiesSI = BuildingList.filter(ele=>ele.CoverId=='482' || ele.CoverId==482);
                            if(PublicUtilitiesSI.length!=0){
                              BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                              obj['PublicUtilitiesSIBC']=PublicUtilitiesSI[0].SumInsured;obj['PublicUtilitiesBC']=PublicTelecommuncationSI[0]?.CategoryId;
                            }
                            let CustomerSupplierSI = BuildingList.filter(ele => ele.CoverId == '499' || ele.CoverId == 499 || ele.CoverId == '496' || ele.CoverId == 496);
                            if (CustomerSupplierSI.length != 0) {
                              BIValue = 'Y'; EValue = 'Y'; showExtensions = true; showInterruptions = true; showExtensionToggle = true;
                              obj['CustomerSupplierSIBC'] = CustomerSupplierSI[0].SumInsured;obj['CustomerSupplierBC'] = String(CustomerSupplierSI[0].CoverId);
                            }
                            let GeyserSolarList = BuildingList.filter(ele => ele['CoverId'] == 488);
                      if (GeyserSolarList.length != 0) { obj['GeyserSolarBC'] = GeyserSolarList[0].SumInsured; obj['IndustryType'] = GeyserSolarList[0]?.IndustryType; }
                      let GeyserInhouseList = BuildingList.filter(ele => ele['CoverId'] == 364);
                      if (GeyserInhouseList.length != 0) { obj['GeyserInhouseBC'] = GeyserInhouseList[0].SumInsured; obj['IndustryType'] = GeyserInhouseList[0]?.IndustryType; }
                      let EscalationList = BuildingList.filter(ele => ele['CoverId'] == 537);
                      if (EscalationList.length != 0) { obj['EscalationBC'] = EscalationList[0].SumInsured; obj['IndustryType'] = EscalationList[0]?.IndustryType; }
                      }
                      
                      let machineryList  = subDetails.filter(ele=>ele['SectionId']=='1' && ele['CoverId']==353);
                      if(machineryList.length!=0){obj['plantMachineryBC'] = machineryList[0].SumInsured;obj['IndustryType'] = machineryList[0]?.IndustryType;}
                      let stockList  = subDetails.filter(ele=>ele['SectionId']=='1' && ele['CoverId']==354);
                      if(stockList.length!=0){obj['stockInTradeBC'] = stockList[0].SumInsured;obj['IndustryType'] = stockList[0]?.IndustryType;}
                      let miscellaneousList  = subDetails.filter(ele=>ele['SectionId']=='1' && ele['CoverId']==355);
                      if(miscellaneousList.length!=0){obj['miscellaneousBC'] = miscellaneousList[0].SumInsured;obj['IndustryType'] = miscellaneousList[0]?.IndustryType;}
                      let powerSurgeList  = subDetails.filter(ele=>ele['SectionId']=='1' && ele['CoverId']==356);
                      if(powerSurgeList.length!=0){obj['powerSurgeBC'] = powerSurgeList[0].SumInsured;obj['IndustryType'] = powerSurgeList[0]?.IndustryType;}
                      let hailDamageList  = subDetails.filter(ele=>ele['SectionId']=='1' && ele['CoverId']==358);
                      if(hailDamageList.length!=0){obj['hailDamageBC'] = hailDamageList[0].SumInsured;obj['IndustryType'] = hailDamageList[0]?.IndustryType;}
                      let rentReceivableList  = subDetails.filter(ele=>ele['SectionId']=='1' && ele['CoverId']==359);
                      if(rentReceivableList.length!=0){obj['rentReceivableBC'] = rentReceivableList[0].SumInsured;obj['IndustryType'] = rentReceivableList[0]?.IndustryType;}
                      let leakageExtensionList  = subDetails.filter(ele=>ele['SectionId']=='1' && ele['CoverId']==357);
                      if(leakageExtensionList.length!=0){obj['leakageExtensionBC'] = leakageExtensionList[0]?.CategoryId;obj['leakageExtensionSumInsuredBC'] = leakageExtensionList[0].SumInsured;obj['IndustryType'] = leakageExtensionList[0]?.IndustryType;}
                    let finalObj = {
                        "Obj":obj,
                        "EValue":EValue,
                        "BIValue":BIValue,
                        "showExtensions":showExtensions,
                        "showInterruptions":showInterruptions,
                        "showExtensionToggle":showExtensionToggle,
                        "filled":BuildingList.length > 0 ? true: false
                    }
                    return finalObj
    
  }
  getSaveDetails(entry,IndustryId,industryTypeList,obj){
    if(entry.EscalationBC!=null && entry.EscalationBC!=''  && entry.EscalationBC!='null'){
      let sectionId=null;
      sectionId='1';
        let subEntry={
          "SectionId": "1","SectionName":"Building",
          "Status":"Y","SumInsured":String(entry.EscalationBC).replaceAll(',', ''),
          "CategoryId": entry.ConstructionTypeBC,
          "CoverId": "537",
          "DescriptionOfRisk":null
        }
        if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
        obj.SectionList.push(subEntry);
    }
    if(entry.GeyserSolarBC!=null && entry.GeyserSolarBC!='' && entry.GeyserSolarBC!='null'){
      let sectionId=null;
      sectionId='1';
        let subEntry={
          "SectionId": "1","SectionName":"Building",
          "Status":"Y","SumInsured":String(entry.GeyserSolarBC).replaceAll(',', ''),
          "CategoryId": entry.ConstructionTypeBC,
          "CoverId": "488",
          "DescriptionOfRisk":null
        }
        if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
        obj.SectionList.push(subEntry);
    }
    if(entry.GeyserInhouseBC!=null && entry.GeyserInhouseBC!='' && entry.GeyserInhouseBC!='null'){
      let sectionId=null;
      sectionId='1';
        let subEntry={
          "SectionId": "1","SectionName":"Building",
          "Status":"Y","SumInsured":String(entry.GeyserInhouseBC).replaceAll(',', ''),
          "CategoryId": entry.ConstructionTypeBC,
          "CoverId": "364",
          "DescriptionOfRisk":null
        }
        if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
        obj.SectionList.push(subEntry);
    }

    if(entry.plantMachineryBC!=null && entry.plantMachineryBC!='' && entry.plantMachineryBC!='null'){
      let sectionId=null;
        sectionId='1';
        let subEntry={
          "SectionId": sectionId,"SectionName":"Building",
          "Status":"Y","SumInsured":String(entry.plantMachineryBC).replaceAll(',', ''),
          "CoverId": "353",
          "DescriptionOfRisk": null
        }
        if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
        obj.SectionList.push(subEntry);
     }
     if(entry.stockInTradeBC!=null && entry.stockInTradeBC!='' && entry.stockInTradeBC!='null'){
      let sectionId=null;
       sectionId='1';
      let subEntry={
        "SectionId": sectionId,"SectionName":"Building",
        "Status":"Y","SumInsured":String(entry.stockInTradeBC).replaceAll(',', ''),
        "CoverId": "354",
        "DescriptionOfRisk": null
      }
      if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
      obj.SectionList.push(subEntry);
      }
     if(entry.miscellaneousBC!=null && entry.miscellaneousBC!='' && entry.miscellaneousBC!='null'){
        let sectionId=null;
         sectionId='1';
        let subEntry={
          "SectionId": sectionId,"SectionName":"Building",
          "Status":"Y","SumInsured":String(entry.miscellaneousBC).replaceAll(',', ''),
          "CoverId": "355",
          "DescriptionOfRisk": null
        }
        if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
        obj.SectionList.push(subEntry);
     }
                if(entry.hailDamageBC!=null && entry.hailDamageBC!='' && entry.hailDamageBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName": "Building",
                      "Status":"Y","SumInsured":String(entry.hailDamageBC).replaceAll(',', ''),
                      "CoverId": "358",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if (entry.powerSurgeBC != null && entry.powerSurgeBC != 0 && entry.powerSurgeBC != '0' && entry.powerSurgeBC!='null') {
                    let subEntry = {
                      "SectionId": "1","SectionName":"Building",
                      "CoverId": "356",
                      "SumInsured": String(entry.powerSurgeBC).replaceAll(',', ''),
                      "Status": "Y",
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.rentReceivableBC!=null && entry.rentReceivableBC!='' && entry.rentReceivableBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName": "Building",
                      "Status":"Y","SumInsured":String(entry.rentReceivableBC).replaceAll(',', ''),
                      "CoverId": "359",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                 if(entry.leakageExtensionBC!=null && entry.leakageExtensionBC!='' && entry.leakageExtensionSumInsuredBC!=null && entry.leakageExtensionSumInsuredBC!='0' && entry.leakageExtensionSumInsuredBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName": "Building",
                      "Status":"Y","SumInsured":String(entry.leakageExtensionSumInsuredBC).replaceAll(',', ''),
                      "CoverId": "357",
                      "CategoryId": entry.leakageExtensionBC,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                 }
                 if(entry.ConstructionTypeBC!=null && entry.ConstructionTypeBC!='' && entry.fireBuildingSumInsuredBC!=null && entry.fireBuildingSumInsuredBC!='' && entry.fireBuildingSumInsuredBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName": "Building",
                      "Status":"Y","SumInsured":String(entry.fireBuildingSumInsuredBC).replaceAll(',', ''),
                      "CoverId": "105",
                      "CategoryId": entry.ConstructionTypeBC,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                 }
                  if(entry.AdditonalInflationBC!=null && entry.AdditonalInflationBC!='' && entry.fireBuildingSumInsuredBC!=null && entry.fireBuildingSumInsuredBC!='' && entry.fireBuildingSumInsuredBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName": "Building",
                      "Status":"Y","SumInsured":String(entry.fireBuildingSumInsuredBC).replaceAll(',', ''),
                      "CoverId": "360",
                      "BuildingUsageId":entry.AdditonalInflationBC
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.PreventionofAccessBC!=null && entry.PreventionofAccessBC!='' && entry.PreventionofAccessBC!='0' && entry.PreventionofAccessBC!='null' && entry.PreventionofAccessBC!=''){
                                      let subEntry={
                                        "SectionId":"1","SectionName":"Building",
                                        "Status":"Y","SumInsured":String(entry.PreventionofAccessBC).replaceAll(',', ''),
                                        "CoverId": "494",
                                        "DescriptionOfRisk": null
                                      }
                                      if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                                       obj.SectionList.push(subEntry);
                  }
                  if(entry.PublicTelecommuncationSIBC!=null && entry.PublicTelecommuncationSIBC!='' && entry.PublicTelecommuncationSIBC!='0' && entry.PublicTelecommuncationBC!=null && entry.PublicTelecommuncationBC!='' && entry.PublicTelecommuncationBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.PublicTelecommuncationSIBC).replaceAll(',', ''),
                      "CategoryId":entry.PublicTelecommuncationBC,
                      "CoverId": "481",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.PublicUtilitiesSIBC!=null && entry.PublicUtilitiesSIBC!='' && entry.PublicUtilitiesSIBC!='0' && entry.PublicUtilitiesBC!=null && entry.PublicUtilitiesBC!='' && entry.PublicUtilitiesBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.PublicUtilitiesSIBC).replaceAll(',', ''),
                      "CategoryId": entry.PublicUtilitiesBC,
                      "CoverId": "482",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.CustomerSupplierSIBC!=null && entry.CustomerSupplierSIBC!='' && entry.CustomerSupplierSIBC!='0' && entry.CustomerSupplierBC!=null && entry.CustomerSupplierBC!='' && entry.CustomerSupplierBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.CustomerSupplierSIBC).replaceAll(',', ''),
                      "CategoryId": entry.ConstructionTypeBC,
                      "CoverId": entry.CustomerSupplierBC,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
  obj.SectionList.push(subEntry);
                  }
                  
                  if(entry.AccidentalDamageBC!=null && entry.AccidentalDamageBC!='' && entry.AccidentalDamageBC!='0'  && entry.AccidentalDamageBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.AccidentalDamageBC).replaceAll(',', ''),
                      "CoverId": "156",

                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
  obj.SectionList.push(subEntry);
                  }
                  if(entry.ClaimPreparationCostBC!=null && entry.ClaimPreparationCostBC!='' && entry.ClaimPreparationCostBC!='0' && entry.ClaimPreparationCostBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.ClaimPreparationCostBC).replaceAll(',', ''),
                      "CoverId": "372",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.UnspecifiedSupplierBC!=null && entry.UnspecifiedSupplierBC!='' && entry.UnspecifiedSupplierBC!='0' && entry.UnspecifiedSupplierBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.UnspecifiedSupplierBC).replaceAll(',', ''),
                      "CoverId": "483",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.IndeminityPeriodBC!=null && entry.IndeminityPeriodBC!='' && entry.BISumInsuredBC!=null && entry.BISumInsuredBC!='0' && entry.BISumInsuredBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.BISumInsuredBC).replaceAll(',', ''),
                      "CoverId": "495",
                      "CategoryId":entry.IndeminityPeriodBC,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.CoverBC!=null && entry.CoverBC!='' && entry.BISumInsuredBC!=null && entry.BISumInsuredBC!='0' && entry.BISumInsuredBC!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.BISumInsuredBC).replaceAll(',', ''),
                      "CoverId": entry.CoverBC,
                      "CategoryId": entry.ConstructionTypeBC,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
              obj.SectionList.push(subEntry);
                  }
  //                 if(entry.Cover!=null && entry.Cover!='' && entry.BISumInsured!=null && entry.BISumInsured!='0'){
  //                   let coverId=null;
  //                   if(entry.Cover=='1') coverId='470'; else coverId="492"
  //                   let subEntry={
  //                     "SectionId":"1","SectionName":"Building",
  //                     "Status":"Y","SumInsured":entry.BISumInsured,
  //                     "CoverId": coverId,
  //                     "DescriptionOfRisk": null
  //                   }
  //                   if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
  // obj.SectionList.push(subEntry);
  //                 }
  //                 if(entry.IndeminityPeriod!=null && entry.IndeminityPeriod!='' && entry.GrossRentals!=null && entry.GrossRentals!='0'){
                   
  //                   let subEntry={
  //                     "SectionId":"1","SectionName":"Building",
  //                     "Status":"Y","SumInsured":entry.GrossRentals,
  //                     "CoverId": "493",
  //                     "CategoryId":entry.IndeminityPeriod,
  //                     "DescriptionOfRisk": null
  //                   }
  //                   if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
  // obj.SectionList.push(subEntry);
  //                 }

                    if(entry.GrossRentalsBC!=null && entry.GrossRentalsBC!='0' && entry.GrossRentalsBC!='' && entry.GrossRentalsBC!='null'){
                      let subEntry={
                        "SectionId":"1","SectionName":"Building",
                        "Status":"Y","SumInsured":String(entry.GrossRentalsBC).replaceAll(',', ''),
                        "CoverId": "493",
                        "CategoryId": entry.ConstructionTypeBC,
                        "DescriptionOfRisk": null
                      }
                  if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                     obj.SectionList.push(subEntry);
                   }
  
                return obj;
  }
fields:FormlyFieldConfig;
      
}