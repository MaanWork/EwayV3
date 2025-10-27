import { FormlyFieldConfig } from "@ngx-formly/core";

export class BondApiTanzaniya{
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
        let Section;
        let BidSection = subDetails.filter(ele=>ele['SectionId']=='118');
        if(BidSection.length !=0) Section = BidSection;
        let CustomsSection = subDetails.filter(ele=>ele['SectionId']=='117');
        if(CustomsSection.length !=0) Section = CustomsSection;
        let PerformanceSection = subDetails.filter(ele=>ele['SectionId']=='119');
        if(PerformanceSection.length !=0) Section = PerformanceSection;
        let AdvanceSection = subDetails.filter(ele=>ele['SectionId']=='120');
        if(AdvanceSection.length !=0) Section = AdvanceSection;
        if(Section.length!=0){
          let bondSection = Section;
          if(bondSection.length!=0){obj['BondSI']=bondSection[0].SumInsured;obj['TypeOfBond']=bondSection[0].BondType;obj['NoOfYears']=bondSection[0].BondYear;obj['DescriptionOfRisk']=bondSection[0].DescriptionOfRisk;obj['CoveringDetails']=bondSection[0].CoveringDetails;obj['IndustryType']=null;if(bondSection[0]?.IndustryType!='0')obj['IndustryType']=bondSection[0].IndustryType;}   
          return obj
        }
        
    }
    getSaveDetails(entry,BondTypeList,industryTypeList,obj){  
      console.log(entry);
        
        if(entry.BondSI!='0' && entry.BondSI!=null && entry.BondSI!=''){
            let subEntry= {
              "BondType": entry.TypeOfBond,
              "SectionId": entry.TypeOfBond,
              "SectionName":BondTypeList.find(ele=>ele.Code==entry.TypeOfBond)?.CodeDesc,
              "CoverId": entry.TypeOfBond == 120 ? '258': entry.TypeOfBond == 118 ? '256' : entry.TypeOfBond == 117 ? '255' :  '257' ,
              "SumInsured": entry.BondSI,
              "CoveringDetails":entry.CoveringDetails,
              "DescriptionOfRisk":entry.DescriptionOfRisk,
              "CategoryId":entry.NoOfYears,
              "BondYear":entry.NoOfYears,
              "IndustryType":entry.IndustryType,
              "IndustryTypeDesc":industryTypeList.find(ele=>ele.Code==entry.IndustryType)?.CodeDesc
            }
            
            obj.SectionList.push(subEntry);
          }
        return obj;
    }
  fields:FormlyFieldConfig;
      
}