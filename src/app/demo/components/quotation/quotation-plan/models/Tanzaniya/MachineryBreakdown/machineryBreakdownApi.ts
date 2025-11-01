import { FormlyFieldConfig } from "@ngx-formly/core";

export class MachineryBreakdownApiTanzaniya{
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
      let BusineessSection = subDetails.filter(ele => ele['CoverId'] == '337');
      let MachinerySection = subDetails.filter(ele => ele['CoverId'] == '339');
      console.log(BusineessSection);
      console.log(MachinerySection);
      
      
        if(BusineessSection.length!=0 || MachinerySection.length!=0 ){
          obj['PowerPlantSi']=MachinerySection[0].SumInsured;obj['ContentId']=MachinerySection[0].ContentId;
          obj['CoveringDetails']=MachinerySection[0].CoveringDetails;obj['DescriptionOfRisk']=MachinerySection[0].DescriptionOfRisk;
          obj['BusinessSI']=BusineessSection[0].SumInsured;obj['BusinessName']=BusineessSection[0].BusinessInterruption;
          obj['CoveringDetailsBI']=BusineessSection[0].CoveringDetails;obj['DescriptionOfRiskBI']=BusineessSection[0].DescriptionOfRisk;
       
          
          return obj
      }
    }
    getSaveDetails(entry,dropList,IndustryId,obj,MachineryTanzaniyaList,busineesslist?){   
      if(MachineryTanzaniyaList.length != 0){
        for(let i =0; i < MachineryTanzaniyaList.length;i++){
          if(MachineryTanzaniyaList[i].PowerPlantSi!=null && MachineryTanzaniyaList[i].PowerPlantSi!='' && MachineryTanzaniyaList[i].PowerPlantSi!='0'){
            let subEntry = {
              "SectionId": "41",
              "SectionName": "Machinery Breakdown",
              "SerialNo": MachineryTanzaniyaList[i].SerialNo,
              "CoveringDetails": MachineryTanzaniyaList[i].CoveringDetails,
              "DescriptionOfRisk": MachineryTanzaniyaList[i].DescriptionOfRisk,
              "CategoryId": MachineryTanzaniyaList[i].ContentId,
              "ContentId": MachineryTanzaniyaList[i].ContentId,
              "ContentDesc": dropList.find(ele=>ele.value==MachineryTanzaniyaList[i].ContentId)?.label,
              "CategoryDesc": dropList.find(ele=>ele.value==MachineryTanzaniyaList[i].ContentId)?.label,
              "MachinerySi": MachineryTanzaniyaList[i].PowerPlantSi,
              "SumInsured": MachineryTanzaniyaList[i].PowerPlantSi,
              'BusinessInterruption': MachineryTanzaniyaList[i].BusinessName,
              "IndustryId": IndustryId,
              "IndustryType": IndustryId,
              "CoverId": "339",
              'BusinessNameDesc': this.getBusinessNameDesc(MachineryTanzaniyaList[i].BusinessName,dropList),
              'BuildingSumInsured': MachineryTanzaniyaList[i].BusinessSI,
              
              "RiskId": null
            }
            obj.SectionList.push(subEntry);
            if(subEntry.BusinessInterruption!=0 && subEntry.BusinessInterruption!='0'){
              let sectionName = busineesslist.find(ele=>ele.Code==MachineryTanzaniyaList[i].BusinessName)?.CodeDesc;
              let subData = {
                "SectionId": MachineryTanzaniyaList[i].BusinessName,
                "SectionName": sectionName,
                "SerialNo": MachineryTanzaniyaList[i].SerialNo,
                "CoveringDetails": MachineryTanzaniyaList[i].CoveringDetails,
                "DescriptionOfRisk": MachineryTanzaniyaList[i].DescriptionOfRisk,
                "CategoryId": MachineryTanzaniyaList[i].ContentId,
                "ContentId": MachineryTanzaniyaList[i].ContentId,
                "ContentDesc": dropList.find(ele=>ele.value==MachineryTanzaniyaList[i].ContentId)?.label,
                "CategoryDesc": dropList.find(ele=>ele.value==MachineryTanzaniyaList[i].ContentId)?.label,
                "MachinerySi": MachineryTanzaniyaList[i].PowerPlantSi,
                "SumInsured": MachineryTanzaniyaList[i].BusinessSI,
                'BusinessInterruption': MachineryTanzaniyaList[i].BusinessName,
                'BusinessNameDesc': this.getBusinessNameDesc(MachineryTanzaniyaList[i].BusinessName,dropList),
                'BuildingSumInsured': MachineryTanzaniyaList[i].BusinessSI,
                "IndustryId": IndustryId,
                "IndustryType": IndustryId,
                "RiskId": null,
                "CoverId": "337"
              }
              obj.SectionList.push(subData);
            }
            
        }
        }
         return obj;
      }
    }
  fields:FormlyFieldConfig;
  getBusinessNameDesc(val,dropList){
    if(val!=null && val!='' && val!=undefined) return dropList.find(ele=>ele.Code==val)?.CodeDesc;
    else return '';
}
}