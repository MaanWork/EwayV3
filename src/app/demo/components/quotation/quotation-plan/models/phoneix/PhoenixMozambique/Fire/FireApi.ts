import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class FireMozambiqueApi{
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
                          obj['fireBuildingSumInsured']=building[0].SumInsured;
                          obj['ConstructionType']=building[0].CategoryId;
                          obj['IndustryType'] = building[0]?.IndustryType
                        }
                        let inflation = BuildingList.filter(ele=>ele.CoverId=='360' || ele.CoverId==360);
                        if(inflation.length!=0){
                          obj['fireBuildingSumInsured']=inflation[0].SumInsured;
                          obj['AdditonalInflation']=inflation[0].BuildingUsageId;
                          obj['IndustryType'] = inflation[0]?.IndustryType
                        }
                        let indemnity = BuildingList.filter(ele=>ele.CoverId=='495' || ele.CoverId==495);
                        if(indemnity.length!=0){
                          BIValue='Y';showInterruptions = true;showExtensionToggle=true;
                          obj['IndeminityPeriod']=indemnity[0].CategoryId;
                          obj['BISumInsured']=indemnity[0].SumInsured;
                          obj['IndustryType'] = inflation[0]?.IndustryType
                        }
                        let coverList = BuildingList.filter(ele => ele.CoverId == '470' || ele.CoverId == 470 || ele.CoverId == '492' || ele.CoverId == 492);
                          if (coverList.length != 0) {
                            BIValue = 'Y'; showInterruptions = true; showExtensionToggle = true;
                            obj['IndustryType'] = coverList[0]?.IndustryType
                            obj['Cover'] = String(coverList[0]?.CoverId)
                            obj['BISumInsured'] = coverList[0].SumInsured;
                          }
                        let grossRenewalsList = BuildingList.filter(ele=>ele.CoverId=='493' || ele.CoverId==493);
                          if(grossRenewalsList.length!=0){
                            BIValue='Y';showInterruptions = true;showExtensionToggle=true;
                            obj['GrossRentals']=grossRenewalsList[0].SumInsured;obj['IndustryType'] = grossRenewalsList[0]?.IndustryType
                          }
                          let AccidentalDamageList = BuildingList.filter(ele=>ele.CoverId=='156' || ele.CoverId==156);
                          if(AccidentalDamageList.length!=0){
                            BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                            obj['AccidentalDamage']=AccidentalDamageList[0].SumInsured;
                          }
                          let ClaimPreparationCost = BuildingList.filter(ele=>ele.CoverId=='372' || ele.CoverId==372);
                          if(ClaimPreparationCost.length!=0){
                            BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                            obj['ClaimPreparationCost']=ClaimPreparationCost[0].SumInsured;
                          }
                          let UnspecifiedSupplier = BuildingList.filter(ele=>ele.CoverId=='483' || ele.CoverId==483);
                          if(UnspecifiedSupplier.length!=0){
                            BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                            obj['UnspecifiedSupplier']=UnspecifiedSupplier[0].SumInsured;
                          }
                          let PreventionofAccessSI = BuildingList.filter(ele=>ele.CoverId=='494' || ele.CoverId==494);
                          if(PreventionofAccessSI.length!=0){
                            BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                            obj['PreventionofAccess']=PreventionofAccessSI[0].SumInsured;
                          }
                          let PublicTelecommuncationSI = BuildingList.filter(ele=>ele.CoverId=='481' || ele.CoverId==481);
                          if(PublicTelecommuncationSI.length!=0){
                            BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                            obj['PublicTelecommuncationSI']=PublicTelecommuncationSI[0].SumInsured;obj['PublicTelecommuncation']=PublicTelecommuncationSI[0].CategoryId;
                          }
                          let PublicUtilitiesSI = BuildingList.filter(ele=>ele.CoverId=='482' || ele.CoverId==482);
                          if(PublicUtilitiesSI.length!=0){
                            BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                            obj['PublicUtilitiesSI']=PublicUtilitiesSI[0].SumInsured;obj['PublicUtilities']=PublicTelecommuncationSI[0].CategoryId;
                          }
                          let CustomerSupplierSI = BuildingList.filter(ele=>ele.CoverId=='499' || ele.CoverId==499 || ele.CoverId=='496' || ele.CoverId==496);
                          if(CustomerSupplierSI.length!=0){
                            BIValue='Y';EValue='Y';showExtensions=true;showInterruptions = true;showExtensionToggle=true;
                            obj['CustomerSupplierSI']=CustomerSupplierSI[0].SumInsured;obj['CustomerSupplier']=String(CustomerSupplierSI[0].CoverId);
                          }
                        }
                        let contentsList  = subDetails.filter(ele=>ele['SectionId']=='47' && ele['CoverId']==290);
                        if(contentsList.length!=0){obj['contents'] = contentsList[0].SumInsured;obj['IndustryType'] = contentsList[0]?.IndustryType;}
                            let GeyserSolarList  = subDetails.filter(ele=>ele['SectionId']=='196' && ele['CoverId']==488);
                        if(GeyserSolarList.length!=0){obj['GeyserSolar'] = GeyserSolarList[0].SumInsured;obj['IndustryType'] = GeyserSolarList[0]?.IndustryType;}
                            let GeyserInhouseList  = subDetails.filter(ele=>ele['SectionId']=='196' && ele['CoverId']==364);
                        if(GeyserInhouseList.length!=0){obj['GeyserInhouse'] = GeyserInhouseList[0].SumInsured;obj['IndustryType'] = GeyserInhouseList[0]?.IndustryType;}
                    let machineryList  = subDetails.filter(ele=>ele['SectionId']=='185' && ele['CoverId']==353);
                    if(machineryList.length!=0){obj['plantMachinery'] = machineryList[0].SumInsured;obj['IndustryType'] = machineryList[0]?.IndustryType;}
                    let stockList  = subDetails.filter(ele=>ele['SectionId']=='186' && ele['CoverId']==354);
                    if(stockList.length!=0){obj['stockInTrade'] = stockList[0].SumInsured;obj['IndustryType'] = stockList[0]?.IndustryType;}
                    let miscellaneousList  = subDetails.filter(ele=>ele['SectionId']=='187' && ele['CoverId']==355);
                    if(miscellaneousList.length!=0){obj['miscellaneous'] = miscellaneousList[0].SumInsured;obj['IndustryType'] = miscellaneousList[0]?.IndustryType;}
                    let powerSurgeList  = subDetails.filter(ele=>ele['SectionId']=='188' && ele['CoverId']==356);
                    if(powerSurgeList.length!=0){obj['powerSurge'] = powerSurgeList[0].SumInsured;obj['IndustryType'] = powerSurgeList[0]?.IndustryType;}
                    let hailDamageList  = subDetails.filter(ele=>ele['SectionId']=='190' && ele['CoverId']==358);
                    if(hailDamageList.length!=0){obj['hailDamage'] = hailDamageList[0].SumInsured;obj['IndustryType'] = hailDamageList[0]?.IndustryType;}
                    let rentReceivableList  = subDetails.filter(ele=>ele['SectionId']=='191' && ele['CoverId']==359);
                    if(rentReceivableList.length!=0){obj['rentReceivable'] = rentReceivableList[0].SumInsured;obj['IndustryType'] = rentReceivableList[0]?.IndustryType;}
                    let leakageExtensionList  = subDetails.filter(ele=>ele['SectionId']=='189' && ele['CoverId']==357);
                    if(leakageExtensionList.length!=0){obj['leakageExtension'] = leakageExtensionList[0].CategoryId;obj['leakageExtensionSumInsured'] = leakageExtensionList[0].SumInsured;obj['IndustryType'] = leakageExtensionList[0]?.IndustryType;}
                    let finalObj = {
                        "Obj":obj,
                        "EValue":EValue,
                        "BIValue":BIValue,
                        "showExtensions":showExtensions,
                        "showInterruptions":showInterruptions,
                        "showExtensionToggle":showExtensionToggle,
                    }
                    return finalObj
  
  }
  getSaveDetails(entry,IndustryId,industryTypeList,obj){
    if(entry.plantMachinery!=null && entry.plantMachinery!='' && entry.plantMachinery!='' && entry.plantMachinery!='null'){
      let sectionId=null;
      sectionId='1';
        let subEntry={
          "SectionId": "185","SectionName":"Plant & Machinery",
          "Status":"Y","SumInsured":String(entry.plantMachinery).replaceAll(',',''),
          "CategoryId": entry.ConstructionType,
          "CoverId": "353",
          "DescriptionOfRisk": null
        }
        if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
        obj.SectionList.push(subEntry);
    }
    if(entry.stockInTrade!=null && entry.stockInTrade!='' && entry.stockInTrade!='null'){
      let sectionId=null;
      sectionId='1';
      let subEntry={
        "SectionId": "186","SectionName":"Stock in Trade",
        "Status":"Y","SumInsured":String(entry.stockInTrade).replaceAll(',',''),
        "CoverId": "354","CategoryId": entry.ConstructionType,
        "DescriptionOfRisk": null
      }
      if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
      obj.SectionList.push(subEntry);
      }
    if(entry.miscellaneous!=null && entry.miscellaneous!='' && entry.miscellaneous!='null'){
        let sectionId=null;
        sectionId='1';
        let subEntry={
          "SectionId": "187","SectionName":"Miscellaneous",
          "Status":"Y","SumInsured":String(entry.miscellaneous).replaceAll(',',''),
          "CoverId": "355","CategoryId": entry.ConstructionType,
          "DescriptionOfRisk": null
        }
        if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
        obj.SectionList.push(subEntry);
    }
                if(entry.hailDamage!=null && entry.hailDamage!='' && entry.hailDamage!='null'){
                    let subEntry={
                      "SectionId":"190","SectionName": "Hail damage to vehicles in the open",
                      "Status":"Y","SumInsured":String(entry.hailDamage).replaceAll(',',''),
                      "CoverId": "358",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if (entry.powerSurge != null && entry.powerSurge != 0 && entry.powerSurge != '0') {
                    let subEntry = {
                      "SectionId": "188","SectionName":"Power Surge",
                      "CoverId": "356","CategoryId": entry.ConstructionType,
                      "SumInsured": String(entry.powerSurge).replaceAll(',',''),
                      "Status": "Y",
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.rentReceivable!=null && entry.rentReceivable!='' && entry.rentReceivable!='null'){
                    let subEntry={
                      "SectionId":"191","SectionName": "Rent Receivable",
                      "Status":"Y","SumInsured":String(entry.rentReceivable).replaceAll(',',''),
                      "CoverId": "359",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                if(entry.leakageExtension!=null && entry.leakageExtension!='' && entry.leakageExtensionSumInsured!=null && entry.leakageExtensionSumInsured!='0' && entry.leakageExtensionSumInsured!='null'){
                    let subEntry={
                      "SectionId":"189","SectionName": "Leakage Extension",
                      "Status":"Y","SumInsured":String(entry.leakageExtensionSumInsured).replaceAll(',',''),
                      "CoverId": "357",
                      "CategoryId": entry.leakageExtension,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                }
                if(entry.ConstructionType!=null && entry.ConstructionType!='' && entry.fireBuildingSumInsured!=null && entry.fireBuildingSumInsured!='' && entry.fireBuildingSumInsured!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName": "Building",
                      "Status":"Y","SumInsured":String(entry.fireBuildingSumInsured).replaceAll(',',''),
                      "CoverId": "105",
                      "CategoryId": entry.ConstructionType,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                }
                  if(entry.AdditonalInflation!=null && entry.AdditonalInflation!='' && entry.fireBuildingSumInsured!=null && entry.fireBuildingSumInsured!='' && entry.fireBuildingSumInsured!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName": "Building",
                      "Status":"Y","SumInsured":String(entry.fireBuildingSumInsured).replaceAll(',',''),
                      "CoverId": "360",
                      "CategoryId": entry.AdditonalInflation,"BuildingUsageId":entry.AdditonalInflation
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.PreventionofAccess!=null && entry.PreventionofAccess!='' && entry.PreventionofAccess!='0' && entry.PreventionofAccess!='null'){
                  
                    let subEntry={
                                        "SectionId":"1","SectionName":"Building",
                                        "Status":"Y","SumInsured":String(entry.PreventionofAccess).replaceAll(',',''),
                                        "CoverId": "494",
                                        "DescriptionOfRisk": null
                                      }
                                      if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                                       obj.SectionList.push(subEntry);
                  }
                  if(entry.PublicTelecommuncationSI!=null && entry.PublicTelecommuncationSI!='' && entry.PublicTelecommuncationSI!='0' && entry.PublicTelecommuncation!=null && entry.PublicTelecommuncation!='' && entry.PublicTelecommuncation!='null' ){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.PublicTelecommuncationSI).replaceAll(',',''),
                      "CategoryId":entry.PublicTelecommuncation,
                      "CoverId": "481",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.PublicUtilitiesSI!=null && entry.PublicUtilitiesSI!='' && entry.PublicUtilitiesSI!='0' && entry.PublicUtilities!=null && entry.PublicUtilities!='' && entry.PublicUtilities!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.PublicUtilitiesSI).replaceAll(',',''),
                      "CategoryId": entry.PublicUtilities,
                      "CoverId": "482",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.contents!=null && entry.contents!='' && entry.contents!='null' ){
                   
                  
                      let subEntry={
                        "SectionId": "47","SectionName":"Contents",
                        "Status":"Y","SumInsured":String(entry.contents).replaceAll(',',''),
                        "CategoryId": entry.ConstructionType,
                        "CoverId": "290",
                        "DescriptionOfRisk":null
                      }
                      if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                      obj.SectionList.push(subEntry);
                  }
                  if(entry.GeyserSolar!=null && entry.GeyserSolar!='' && entry.GeyserSolar!='null' ){
                    let sectionId=null;
                    sectionId='1';
                      let subEntry={
                        "SectionId": "196","SectionName":"Geyser",
                        "Status":"Y","SumInsured":String(entry.GeyserSolar).replaceAll(',',''),
                        "CategoryId": entry.ConstructionType,
                        "CoverId": "488",
                        "DescriptionOfRisk":null
                      }
                      if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                      obj.SectionList.push(subEntry);
                  }
                  if(entry.GeyserInhouse!=null && entry.GeyserInhouse!='' && entry.GeyserInhouse!='null'){
                    let sectionId=null;
                    sectionId='1';
                      let subEntry={
                        "SectionId": "196","SectionName":"Geyser",
                        "Status":"Y","SumInsured":String(entry.GeyserInhouse).replaceAll(',',''),
                        "CategoryId": entry.ConstructionType,
                        "CoverId": "364",
                        "DescriptionOfRisk":null
                      }
                      if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                      obj.SectionList.push(subEntry);
                  }
                  if(entry.CustomerSupplierSI!=null && entry.CustomerSupplierSI!='' && entry.CustomerSupplierSI!='0' && entry.CustomerSupplier!=null && entry.CustomerSupplier!='' && entry.CustomerSupplier!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.CustomerSupplierSI).replaceAll(',',''),
                      "CoverId": entry.CustomerSupplier,
                      "CategoryId": entry.ConstructionType,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
  obj.SectionList.push(subEntry);
                  }
                  if(entry.AccidentalDamage!=null && entry.AccidentalDamage!='' && entry.AccidentalDamage!='0' && entry.AccidentalDamage!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.AccidentalDamage).replaceAll(',',''),
                      "CoverId": "156",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
  obj.SectionList.push(subEntry);
                  }
                  if(entry.ClaimPreparationCost!=null && entry.ClaimPreparationCost!='' && entry.ClaimPreparationCost!='0' && entry.ClaimPreparationCost!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.ClaimPreparationCost).replaceAll(',',''),
                      "CoverId": "372",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.UnspecifiedSupplier!=null && entry.UnspecifiedSupplier!='' && entry.UnspecifiedSupplier!='0' && entry.UnspecifiedSupplier!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.UnspecifiedSupplier).replaceAll(',',''),
                      "CoverId": "483",
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.IndeminityPeriod!=null && entry.IndeminityPeriod!='' && entry.BISumInsured!=null && entry.BISumInsured!='0' && entry.BISumInsured!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.BISumInsured).replaceAll(',',''),
                      "CoverId": "495",
                      "CategoryId":entry.IndeminityPeriod,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.Cover!=null && entry.Cover!='' && entry.BISumInsured!=null && entry.BISumInsured!='0' && entry.BISumInsured!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.BISumInsured).replaceAll(',',''),
                      "CoverId": entry.Cover,
                      "CategoryId": entry.ConstructionType,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
  obj.SectionList.push(subEntry);
                  }
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
                  if(entry.GrossRentals!=null && entry.GrossRentals!='0' && entry.BISumInsured!='' && entry.BISumInsured!='null'){
                    let subEntry={
                      "SectionId":"1","SectionName":"Building",
                      "Status":"Y","SumInsured":String(entry.GrossRentals).replaceAll(',',''),
                      "CoverId": "493",
                      "CategoryId": entry.ConstructionType,
                      "DescriptionOfRisk": null
                    }
                    if(IndustryId){subEntry['IndustryType'] = IndustryId;subEntry["IndustryTypeDesc"]= industryTypeList.find(ele=>ele.Code==IndustryId)?.CodeDesc}
  obj.SectionList.push(subEntry);
                  }
                return obj;
  }
fields:FormlyFieldConfig;
      
}