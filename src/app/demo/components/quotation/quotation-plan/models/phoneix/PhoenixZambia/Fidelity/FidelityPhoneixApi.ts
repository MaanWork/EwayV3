import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../../../personal-quote-details/personal-quote-details.component";

export class FidelityPhoenixApi{
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
        let Section  = subDetails.filter(ele=>ele['SectionId']=='43');
        console.log(Section);
          if (Section.length != 0) {
            obj['entries'] = [];         
                        let houseData =  {
                            AdditionalClaimsPreparationCosts: Section.find(ele => ele.CoverId == '372' || ele.CoverId == 372).SumInsured ,
                            Limitofindemnity: Section.find(ele => ele.CoverId == '293' || ele.CoverId == 293).SumInsured
                          };
                    console.log(houseData);
                    
                          obj['entries'].push(houseData);
                  
                
            return obj;
        }
      }
     
    fields:FormlyFieldConfig;
      
}