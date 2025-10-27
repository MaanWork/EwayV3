import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class GPAApiNamibia {
  customerDetails: any;
  commonDetails: any[] = [];
  endorsementSection: boolean = false; subuserType: any = null;
  enableFieldsList: any[] = []; finalizeYN: any = 'N';
  policyfields: FormlyFieldConfig;
  policyfields1: FormlyFieldConfig;
  extendsfields: FormlyFieldConfig
  constructor() {

  }
  getEditDetails(subDetails, obj,index) {
    let GPASection = subDetails.filter(ele => ele['SectionId'] == '182');
    obj.list = [];
    GPASection.forEach(item => {
      let existingEntry = obj.list.find(entry => entry.OtherOccupation === item.OtherOccupation);

      if (existingEntry) {
        if (item.CoverId == '126') {
          existingEntry.NumberofEmployees = item.TotalNoOfEmployees;
          existingEntry.occupation = item.CategoryId;
          existingEntry.Coverage = item.IndemnityType;
          existingEntry.MedicalExpenses = item.SumInsured;
        }
        if (item.CoverId == '123') {
          existingEntry.AnnualRemuneration = item.SumInsured;
        }
        if (item.CoverId == '50') {
          existingEntry.TemporaryDisablement = item.SumInsured;
        }
      }
      else {
        obj.list.push({
          "LocationIndex":index,
          'OtherOccupation': item.OtherOccupation,
          'NumberofEmployees': item.CoverId == '126' ? item.TotalNoOfEmployees : null,
          'occupation': item.CoverId == '126' ? item.CategoryId : null,
          'AnnualRemuneration': item.CoverId == '123' ? item.SumInsured : null,
          'TemporaryDisablement': item.CoverId == '50' ? item.SumInsured : null,
          'Coverage': item.CoverId == '126' ? item.IndemnityType : null,
          'MedicalExpenses': item.CoverId == '126' ? item.SumInsured : null
        });
      }
    });

    return obj;

  }
  getSaveDetails(entry, constructionList, IndustryId, industryTypeList, obj, list) {
    // for(let i =0; i < obj.length; i++){
    //           let subEntry= {
    //             "SectionId": "228",
    //             "SectionName":"House Holders",
    //             "CoverId":"290",
    //             "CategoryId": constructionList.find(ele=>ele.Code==list[i].ContentsType)?.Code,
    //             "SumInsured": list[i].ContentInsured,
    //             "DescriptionOfRisk":list[i].ContentDescription,
    //             "IndustryType": IndustryId
    //           }
    //           obj.SectionList.push(subEntry);      
    // } 
    for (let i = 0; i < list.length; i++) {
      if (list[i].MedicalExpenses != null && list[i].MedicalExpenses != '' && list[i].MedicalExpenses != undefined) {
        let subEntry = {
          "SectionId": "182",
          "SectionName": "Group Personal Accident",
          "CoverId": "126",
          "SumInsured": list[i].MedicalExpenses,
          "TotalNoOfEmployees": list[i].NumberofEmployees,
          "IndemnityType": list[i].Coverage,
          "CategoryId": list[i].occupation,
          "Status": "Y",
          "OtherOccupation": i
        }

        obj.SectionList.push(subEntry);
      }
      if (list[i].AnnualRemuneration != null && list[i].AnnualRemuneration != '' && list[i].AnnualRemuneration != undefined) {
        let subEntry = {
          "SectionId": "182",
          "SectionName": "Group Personal Accident",
          "CoverId": "123",
          "SumInsured": list[i].AnnualRemuneration,
          "TotalNoOfEmployees": list[i].NumberofEmployees,
          "IndemnityType": list[i].Coverage,
          "CategoryId": list[i].occupation,
          "Status": "Y",
          "OtherOccupation": i
        }

        obj.SectionList.push(subEntry);
      }
      if (list[i].TemporaryDisablement != null && list[i].TemporaryDisablement != '' && list[i].TemporaryDisablement != undefined) {
        let subEntry = {
          "SectionId": "182",
          "SectionName": "Group Personal Accident",
          "CoverId": "50",
          "SumInsured": list[i].TemporaryDisablement,
          "TotalNoOfEmployees": list[i].NumberofEmployees,
          "IndemnityType": list[i].Coverage,
          "CategoryId": list[i].occupation,
          "Status": "Y",
          "OtherOccupation": i
        }

        obj.SectionList.push(subEntry);
      }
    }


    return obj;
  }
  fields: FormlyFieldConfig;

}