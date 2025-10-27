import { FormlyFieldConfig } from "@ngx-formly/core";


export class PackagePlusApiPhoenix{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    BIFireListError1: boolean=false;
    BIFireListError: boolean=false;
    CorpErrorMessage:any;
    BurglarySIError:boolean=false;
    constructor() {
      
    }
    getEditDetails(subDetails,obj){
        let GlassSection  = subDetails.filter(ele=>ele['SectionId']=='222');
        if(GlassSection.length!=0){
          let glassReinstate = GlassSection.filter(ele=>ele.CoverId==429|| ele.CoverId=='429')
          if(glassReinstate.length!=0){obj['SpecialReinstatement']=glassReinstate[0].SumInsured;obj['IndustryType']=null;if(glassReinstate[0]?.IndustryType!='0')obj['IndustryType']=glassReinstate[0].IndustryType;}
          let glassInternal = GlassSection.filter(ele=>ele.CoverId==489|| ele.CoverId=='489')
          if(glassInternal.length!=0){obj['InternalGlass']=glassInternal[0].SumInsured;obj['IndustryType']=null;if(glassInternal[0]?.IndustryType!='0')obj['IndustryType']=glassInternal[0].IndustryType;}
          let glassExternal = GlassSection.filter(ele=>ele.CoverId==490|| ele.CoverId=='490')
          if(glassExternal.length!=0){obj['ExternalGlass']=glassExternal[0].SumInsured;obj['IndustryType']=null;if(glassExternal[0]?.IndustryType!='0')obj['IndustryType']=glassExternal[0].IndustryType;}
          let glassClaims = GlassSection.filter(ele=>ele.CoverId==372|| ele.CoverId=='372')
          if(glassClaims.length!=0){obj['GlassClaimsPreparationCosts']=glassClaims[0].CategoryId;obj['IndustryType']=null;if(glassClaims[0]?.IndustryType!='0')obj['IndustryType']=glassClaims[0].IndustryType;} 
          return obj
        }
    }
    getSaveDetails(entry,fireContentList,PackageIndustryType,FireIndustryList,PackageCategoryId,
        industryOcupationList,BILossRatioList,productItem,GoodsUsageList,GoodsContentList,GoodsOccupationList,
        PlateGlassType,machineryContentList,equipmentList,fidelityContentList,fidelityOccupationList,
        publicLiabilityList,groupPeriodList,occupationList,stockAddOnCoverList,addOnCoverList,employeeOccupationList,obj){
            let error =0;let x=0;
            if(entry.FireList.length!=0){
              for(let fire of entry.FireList){
                if(fire.BuildingUsageId && fire.WallType!=null && fire.RoofType!=null && fire.SumInsured!=null){
                  let subEntry = {
                    "SectionId": "40","SectionName": "Fire And Allied Perills",
                    "CoverId":"401",
                    "RiskId": null,
                    "BuildingUsageId":fire.BuildingUsageId,
                    "BuildingUsageDesc": fireContentList.find(ele=>ele.Code==fire.BuildingUsageId)?.CodeDesc,
                    "IndustryType":PackageIndustryType,
                    "IndustryTypeDesc":FireIndustryList.find(ele=>ele.Code==PackageIndustryType)?.CodeDesc,
                    "CategoryId":PackageCategoryId,
                    "CategoryDesc":industryOcupationList.find(ele=>ele.Code==PackageCategoryId)?.CodeDesc,
                    "WallType":fire.WallType,"RoofType":fire.RoofType,
                    //"AllriskSumInsured": String(entry.AllRiskSI).replaceAll(',',''),
                    "SumInsured": String(fire.SumInsured).replaceAll(',',''),
                    "DescriptionOfRisk":fire.DescriptionOfRisk,
                  }
                  // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                  obj.SectionList.push(subEntry);
                }
              }
            }
            if(entry.BIFireList.length!=0){
              let IndemityPeriodDesc;
              this.BIFireListError = false;
              let error;
              for(let fire of entry.BIFireList){
                let j=0;
                  console.log(entry,"entry");
                  this.BIFireListError=false;this.BIFireListError1=false;
                  // if(entry.IndemityPeriod!=undefined ||entry.IndemityPeriod!=null || entry.SumInsured!=0 || entry.SumInsured!='0' || entry.SumInsured!=null || entry.SumInsured!=undefined){
                  //   if(entry.IndemityPeriod==null){j+=1;error+=1;this.BIFireListError=true;this.CorpErrorMessage="Select Indemnity Period"}
                  //   else if(entry.SumInsured==0 || entry.SumInsured=='0' || entry.SumInsured==null || entry.SumInsured==undefined){j+=1;error+=1;this.BIFireListError=false;this.CorpErrorMessage="Enter Sum Insured"}
                  // }
                  // if(!this.isSumInsuredEnabled || !)
                  if(fire.IndemityPeriod!=null){
                    IndemityPeriodDesc = BILossRatioList.find(ele=>ele.Code==fire.IndemityPeriod)?.CodeDesc;
                    if(!fire.sumInsured && IndemityPeriodDesc){
                      j+=1;error+=1;this.BIFireListError=true;this.CorpErrorMessage="Enter Sum Insured"
                    } 
                    }
                  if(fire.SumInsured!=null && fire.IndemityPeriod!=null ){
                    this.BIFireListError=false;this.BIFireListError1=false;
                    j=0;error=0
                    let subEntry = {
                      "SectionId": "75","SectionName": "Business Interruption",
                      "CoverId":"107",
                      "RiskId": null,
                      "IndemityPeriod":fire.IndemityPeriod,
                      "IndemnityTypeDesc":IndemityPeriodDesc,
                      "DescriptionOfRisk":fire.DescriptionOfRisk,
                      "SumInsured": String(fire.SumInsured).replaceAll(',','')
                    }
                    // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                    obj.SectionList.push(subEntry);
                }
                

              }
            }
            if(entry.GoodsCategoryId!=null && entry.GoodsCategoryId!='' && entry.GoodsBuildingUsage!=null && entry.GoodsBuildingUsage!='' && 
              entry.GoodsOccupationType!=null && entry.GoodsOccupationType!='' && entry.GoodsSi!=null && entry.GoodsSi!='0' && entry.GoodsSi!='' && x==0){
              let subEntry = {
                "SectionId": "46",
                "SectionName": "Goods In Transit",
                "CoverId":"469",
                "ContentDesc": productItem.GoodsLimit,
                "RiskId": null,
                "CategoryId":entry.GoodsCategoryId,"OccupationId":entry.GoodsOccupationType,
                "CategoryDesc": GoodsUsageList.find(ele=>ele.Code==entry.GoodsCategoryId)?.CodeDesc,
                "OccupationDesc": GoodsContentList.find(ele=>ele.Code==entry.GoodsOccupationType)?.CodeDesc,
                "BuildingUsageId": entry.GoodsBuildingUsage,
                "BuildingUsageDesc": GoodsOccupationList.find(ele=>ele.Code==entry.GoodsBuildingUsage)?.CodeDesc,
                //"AllriskSumInsured": String(entry.AllRiskSI).replaceAll(',',''),
                "SumInsured": String(entry.GoodsSi).replaceAll(',','')
              }
              // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                obj.SectionList.push(subEntry);
            }
      //       if (entry.MoneyAnnualEstimate) this.productItem.Estimatedannualcashcarryings = String(entry.MoneyAnnualEstimate);
      // if (entry.MoneyCollector) this.productItem.MoneyCollector = entry.MoneyCollector;
      // if (entry.MoneyDirectorResidence) this.productItem.MoneyDirectorResidence = entry.MoneyDirectorResidence;
      // if (entry.MoneySafeLimit) this.productItem.MoneySafeLimit = entry.MoneySafeLimit;
      // if (entry.StrongroomSi) this.productItem.MoneyInSafe = entry.StrongroomSi;
      // if (entry.MoneyOutofSafe) this.productItem.MoneyOutofSafe = entry.MoneyOutofSafe;
      // if (entry.MoneyMajorLoss) this.productItem.MoneyinTransit = entry.MoneyMajorLoss;
            if((entry.MoneyInSafe!=null && entry.MoneyInSafe!='' && entry.MoneyInSafe!='0')){
              let subEntry = {
                "SectionId": "42",
                "SectionName": "Money",
                "CoverId":"77",
                "StrongroomSi": entry.MoneyInSafe,
                "SumInsured": entry.MoneyInSafe,
                "DescriptionOfRisk": entry.MoneyInSafeDesc
              }
              obj.SectionList.push(subEntry);
            }
            if((entry.MoneyAnnualEstimate!=null && entry.MoneyAnnualEstimate!='' && entry.MoneyAnnualEstimate!='0')){
              let subEntry = {
                "SectionId": "42",
                "SectionName": "Money",
                "CoverId":"79",
                "MoneyAnnualEstimate": entry.MoneyAnnualEstimate,
                "SumInsured": entry.MoneyAnnualEstimate,
                "DescriptionOfRisk": entry.MoneyAnnualEstimateDesc
              }
              obj.SectionList.push(subEntry);
            }
            if((entry.MoneySafeLimit!=null && entry.MoneySafeLimit!='' && entry.MoneySafeLimit!='0')){
              let subEntry = {
                "SectionId": "42",
                "SectionName": "Money",
                "CoverId":"81",
                "MoneySafeLimit": entry.MoneySafeLimit,
                "SumInsured": entry.MoneySafeLimit,
                "DescriptionOfRisk": entry.MoneySafeLimitDesc
              }
              obj.SectionList.push(subEntry);
            }
            if((entry.MoneyOutofSafe!=null && entry.MoneyOutofSafe!='' && entry.MoneyOutofSafe!='0')){
              let subEntry = {
                "SectionId": "42",
                "SectionName": "Money",
                "CoverId":"82",
                "MoneyOutofSafe": entry.MoneyOutofSafe,
                "SumInsured": entry.MoneyOutofSafe,
                "DescriptionOfRisk": entry.MoneyOutofSafeDesc
              }
              obj.SectionList.push(subEntry);
            }
            if((entry.MoneyCollector!=null && entry.MoneyCollector!='' && entry.MoneyCollector!='0')){
              let subEntry = {
                "SectionId": "42",
                "SectionName": "Money",
                "CoverId":"76",
                "MoneyCollector": entry.MoneyCollector,
                "SumInsured": entry.MoneyDirectorResidence,
                "DescriptionOfRisk": entry.MoneyCollectorDesc
              }
              obj.SectionList.push(subEntry);
            }
            if((entry.MoneyDirectorResidence!=null && entry.MoneyDirectorResidence!='' && entry.MoneyDirectorResidence!='0')){
              let subEntry = {
                "SectionId": "42",
                "SectionName": "Money",
                "CoverId":"83",
                "MoneyDirectorResidence": entry.MoneyDirectorResidence,
                "SumInsured": entry.MoneyDirectorResidence,
                "DescriptionOfRisk": entry.MoneyDirectorResidenceDesc
              }
              obj.SectionList.push(subEntry);
            }
            if((entry.MoneyinTransit!=null && entry.MoneyinTransit!='' && entry.MoneyinTransit!='0')){
              let subEntry = {
                "SectionId": "42",
                "SectionName": "Money",
                "CoverId":"75",
                "MoneyMajorLoss": entry.MoneyinTransit,
                "SumInsured": entry.MoneyinTransit,
                "DescriptionOfRisk": entry.MoneyinTransitDesc
              }
              obj.SectionList.push(subEntry);
            }
            if(entry.PlateGlassList.length!=0){
              for(let plate of entry.PlateGlassList){
                if(plate.CategoryId!=null && plate.CategoryId!='' && plate.SumInsured!=0 && plate.SumInsured!=null){
                  let subEntry = {
                    "SectionId": "53","SectionName": "Plate Glass",
                    "RiskId": null,
                    "CoverId":"386",
                    "CategoryId": plate.CategoryId,
                    "DescriptionOfRisk": plate.DescriptionOfRisk,
                    "CategoryDesc": PlateGlassType.find(ele=>ele.Code==plate.CategoryId)?.CodeDesc,
                    //"AllriskSumInsured": String(entry.AllRiskSI).replaceAll(',',''),
                    "SumInsured": String(plate.SumInsured).replaceAll(',','')
                  }
                  obj.SectionList.push(subEntry);
                }
              }
            }
            if(entry.TableRowAllRisk[0].SumInsured!=null && entry.TableRowAllRisk[0].SumInsured!='' && entry.TableRowAllRisk[0].SumInsured!='0' && entry.TableRowAllRisk[0].ContentDesc!='' && entry.TableRowAllRisk[0].ContentDesc!=null){
              if(entry.TableRowAllRisk.length!=0){
                for(let item of entry.TableRowAllRisk){                
                  let subEntry = {
                "SectionId": "69","SectionName": "Business All Risk",
                "RiskId": null,"CoverId":"385",
                "ContentDesc": item.ContentDesc,
                //"AllriskSumInsured": String(entry.AllRiskSI).replaceAll(',',''),
                "SumInsured": String(item.SumInsured).replaceAll(',','')
              }
              // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
              //if(entry['OriginalRiskId']!=null && entry['OriginalRiskId']!=undefined) subEntry['RiskId']=entry['OriginalRiskId']
              obj.SectionList.push(subEntry);
              }
              }
            }
            if(entry.MachineryList.length!=0){
              let CategoryDesc=null;
              for(let elec of entry.MachineryList){
                if(elec.ContentId!=null && elec.ContentId!='8'){
                  CategoryDesc = machineryContentList.find(ele=>ele.Code==elec.ContentId).CodeDesc;
                }
                else{ CategoryDesc = elec.ContentDesc;}
                if(elec.ContentId!=null && elec.SumInsured!=null && CategoryDesc!=null){
                  
                  let subEntry = {
                    "SectionId": "41","SectionName": "Machinery Breakdown","CoverId":"5",
                    "RiskId": null,"ContentId":elec.ContentId,"ContentDesc":CategoryDesc,
                    "DescriptionOfRisk":elec.DescriptionOfRisk,
                    //"AllriskSumInsured": String(entry.AllRiskSI).replaceAll(',',''),
                    "SumInsured": String(elec.SumInsured).replaceAll(',','')
                  }
                  // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                  obj.SectionList.push(subEntry);
                }
              }
            }
            if(entry.ElecEquipList.length!=0){
              for(let elec of entry.ElecEquipList){
                console.log("Entered Entry",elec,entry)
                let CategoryDesc=null;
                if(elec.ContentId!=null && elec.ContentId!='7'){
                  CategoryDesc = equipmentList.find(ele=>ele.Code==elec.ContentId).CodeDesc;
                }
                else CategoryDesc = elec.ContentDesc;
                if(elec.ContentId!=null && elec.SumInsured!=null && CategoryDesc!=null){
                  let subEntry = {
                    "SectionId": "76","SectionName": "Electronic Equipment",
                    "RiskId": null,"ContentId":elec.ContentId,"CoverId":"5",
                    "ContentDesc": CategoryDesc,
                    "DescriptionOfRisk":elec.DescriptionOfRisk,
                    //"AllriskSumInsured": String(entry.AllRiskSI).replaceAll(',',''),
                    "SumInsured": String(elec.SumInsured).replaceAll(',','')
                  }
                  // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                  obj.SectionList.push(subEntry);
                }
              }
            }
            if(entry.AccidentalSumInsured!=null && entry.AccidentalSumInsured!='' && entry.AccidentalSumInsured!='0'){
              let subEntry = {
                "SectionId": "56","SectionName": "Accidental Damage",
                "DescriptionOfRisk":entry.DescriptionAcc,"CoverId":"386",
                "RiskId": null,
                //"AllriskSumInsured": String(entry.AllRiskSI).replaceAll(',',''),
                "SumInsured": String(entry.AccidentalSumInsured).replaceAll(',','')
              }
              // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
              //if(entry['OriginalRiskId']!=null && entry['OriginalRiskId']!=undefined) subEntry['RiskId']=entry['OriginalRiskId']
              obj.SectionList.push(subEntry);
            }
              if(entry.FidelityList.length!=0 ){
                for(let item of entry.FidelityList){
                  if(item.SumInsured!=null && item.SumInsured!=0 && item.SumInsured!='' && item.OccupationId!='' && item.OccupationId!=null && item.Count!=null && item.Count!='' && item.Count!=0){
                    let subEntry = {
                      "SectionId": "43",
                      "SectionName": "Fidelity","CoverId":"5",
                      "SumInsured": fidelityContentList.find(ele=>ele.Code==item.SumInsured)?.Code,
                      "CategoryId": fidelityOccupationList.find(ele=>ele.Code==item.OccupationId)?.CategoryId,
                      "CategoryDesc": fidelityOccupationList.find(ele=>ele.Code==item.OccupationId)?.CategoryDesc,
                      "OccupationId": item.OccupationId,
                      "OccupationDesc":fidelityOccupationList.find(ele=>ele.Code==item.OccupationId)?.CodeDesc,
                      "Count": item.Count,
                      "DescriptionOfRisk": item.DescriptionOfRisk
                    }
                    // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                    obj.SectionList.push(subEntry);
                  }
                }
              }
            if(entry.EmployersList.length!=0 ){
              console.log(entry.EmployersList);
              
                for(let item of entry.EmployersList){
                  if(item.SumInsured!=null && item.SumInsured!=0 && item.SumInsured!='' && item.OccupationId!='' && item.OccupationId!=null && item.Count!=null && item.Count!='' && item.Count!=0){
                        let subEntry = {
                          "SectionId": "45",
                          "SectionName": "Employers Liability","CoverId":"5",
                          "SumInsured": String(item.SumInsured).replaceAll(',',''),
                          "CategoryId": employeeOccupationList.find(ele=>ele.Code==item.OccupationId)?.TitleType,
                          "CategoryDesc": "Category "+String(employeeOccupationList.find(ele=>ele.Code==item.OccupationId)?.TitleType),
                          "OccupationId": item.OccupationId,
                          "OccupationDesc":employeeOccupationList.find(ele=>ele.Code==item.OccupationId)?.CodeDesc,
                          "Count": item.Count,
                          "DescriptionOfRisk": item.DescriptionOfRisk
                        }
                        // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                        obj.SectionList.push(subEntry);
                  }
                }
              }
            if(entry.LiabilityList.length!=0){
              for(let liability of entry.LiabilityList){
                if(liability.CategoryId!=null && liability.SumInsured!=null){
                  let subEntry = {
                    "SectionId": "54", "SectionName": "Public Liabilty",
                    "RiskId": null,"CategoryId":liability.CategoryId,"CoverId":"5",
                    "CategoryDesc": publicLiabilityList.find(ele=>ele.Code==liability.CategoryId)?.CodeDesc,
                    //"AllriskSumInsured": String(entry.AllRiskSI).replaceAll(',',''),
                    "SumInsured": String(liability.SumInsured).replaceAll(',',''),
                    "DescriptionOfRisk": liability.DescriptionOfRisk
                  }
                  // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                  obj.SectionList.push(subEntry);
                }
              }
            }
            if(entry.GPAList[0].SumInsured !='' && entry.GPAList[0].SumInsured !=null && entry.GPAList[0].SumInsured !=0 && entry.GPAList[0].SumInsured !=undefined){
              if(entry.GPAList.length!=0){
              for(let item of entry.GPAList){
                  let subEntry = {
                    "SectionId": "182",
                    "SectionName": "Group Personal Accident",
                    "Count":item.Count,"CoverId":"123",
                    "IndemnityType":item.IndemnityType,
                    "IndemnityTypeDesc": groupPeriodList.find(ele=>ele.Code==item.IndemnityType)?.CodeDesc,
                    "SumInsured": String(item.SumInsured).replaceAll(',',''),
                    "CategoryId": occupationList.find(ele=>ele.Code==item.OccupationType)?.CategoryId,
                    "CategoryDesc": occupationList.find(ele=>ele.Code==item.OccupationType)?.CategoryDesc,
                    "OccupationId": item.OccupationType,
                    "OccupationDesc":fidelityOccupationList.find(ele=>ele.Code==item.OccupationType)?.CodeDesc
                  }
                  // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                  obj.SectionList.push(subEntry);
                }
                
              }
              
            }
            if(addOnCoverList.length!=0){
              console.log(addOnCoverList);
              
              for(let fire of addOnCoverList){
                if(fire.CoverId!=null && fire.SumInsured!=null && fire.CoverId!='' && fire.SumInsured!='' && fire.SumInsured!='0' && fire.SumInsured!=0){
                  let subEntry = {
                    "SectionId": "217",
                    "SectionName": "Fire Add On",
                    "RiskId": null,
                    "IndustryType":PackageIndustryType,
                    "IndustryTypeDesc":FireIndustryList.find(ele=>ele.Code==PackageIndustryType)?.CodeDesc,
                    "CategoryId":PackageCategoryId,
                    "CategoryDesc":industryOcupationList.find(ele=>ele.Code==PackageCategoryId)?.CodeDesc,
                    "CoverId":fire.CoverId,
                    "SumInsured": String(fire.SumInsured).replaceAll(',',''),
                  }
                  // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                  obj.SectionList.push(subEntry);
                }
              }
            }
            if(stockAddOnCoverList.length!=0){
              for(let fire of stockAddOnCoverList){
                if(fire.CoverId!=null && fire.SumInsured!=null && fire.CoverId!='' && fire.SumInsured!='' && fire.SumInsured!='0' && fire.SumInsured!=0){
                  let subEntry = {
                    "SectionId": "218",
                    "SectionName": "Stock Add On",
                    "RiskId": null,
                    "IndustryType":PackageIndustryType,
                    "IndustryTypeDesc":FireIndustryList.find(ele=>ele.Code==PackageIndustryType)?.CodeDesc,
                    "CategoryId":PackageCategoryId,
                    "CategoryDesc":industryOcupationList.find(ele=>ele.Code==PackageCategoryId)?.CodeDesc,
                    "CoverId":fire.CoverId,
                    "SumInsured": String(fire.SumInsured).replaceAll(',',''),
                  }
                  // if(this.productId=='19'){ subEntry['CoveringDetails'] = this.productItem.CoveringDetails;subEntry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;}
                  obj.SectionList.push(subEntry);
                }
              }
            }
            console.log("Obj",entry)
            let burglaryList = entry.BurglaryList;
            if(burglaryList.length!=0){
              for(let row of burglaryList){
                if(row.SumInsured!=0 && row.SumInsured!=null && row.DescriptionOfRisk!=null && row.DescriptionOfRisk!='' && row.FirstLossPercentId!=null && row.FirstLossPercentId!=''){
                    let subEntry = {
                    "SectionId": "52",
                    "CoverId":"5",
                    "SectionName": "Burglary / Theft",
                    "SumInsured": String(row.SumInsured).replaceAll(',',''),
                    "FirstLossPercentId":row.FirstLossPercentId,
                    "DescriptionOfRisk": row.DescriptionOfRisk,
                  }
                  obj.SectionList.push(subEntry);
                }
              }
            }
            let officeList = entry.OfficeContentList;
            if(officeList.length!=0){
              let officeContentList = officeList.filter(ele=>ele.SumInsured!=null && ele.SumInsured!=0 && ele.DescriptionOfRisk!=null && ele.DescriptionOfRisk!='')
              if(officeContentList.length!=0){
                for(let row of officeContentList){
                  let subEntry = {
                    "SectionId": "198",
                    "SectionName": "Office Contents","CoverId":"383",
                    "SumInsured": String(row.SumInsured).replaceAll(',',''),
                    "DescriptionOfRisk": row.DescriptionOfRisk,
                  }
                  obj.SectionList.push(subEntry);
                }
              }
            }
            // if(entry.OfficeContentsSumInsured!=null && entry.OfficeContentsSumInsured!='' && entry.OfficeContentsSumInsured!=null && entry.OfficeContentsSumInsured!='0'){
            //   let subEntry = {
            //     "SectionId": "198",
            //     "SectionName": "Office Contents","CoverId":"383",
            //     "SumInsured": entry.OfficeContentsSumInsured,
            //     "DescriptionOfRisk": entry.DescriptionOfice,
            //   }
            //   obj.SectionList.push(subEntry);
            // }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}