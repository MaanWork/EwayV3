import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonalLiability } from '../../../../models/Tanzaniya/PersonalLiability';
@Component({
  selector: 'owners-liability-pp-tza',
  templateUrl: './owners-liability-pp-tza.component.html',
  styleUrl: './owners-liability-pp-tza.component.scss'
})
export class OwnersLiabilityPpTzaComponent {
  fields3:any[]=[];coversreuired:any=null;userDetails:any=null;insuranceId:any=null;loginId:any=null;
  productId:any=null;userType:any=null;branchCode:any=null;agencyCode:any=null;
  countryId:any=null;brokerbranchCode:any=null;
  @Input() form: any; @Input() productItem: any;  @Input() renderType: any = null;
  @Input() locationList: any[] = [];@Input() CoversRequired:any; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();IndustryError: boolean;
  @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  constructor(){
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || null);
    this.coversreuired = sessionStorage.getItem('coversRequired');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    let contentData4: any;
    contentData4 = new PersonalLiability();
    this.fields3[0] = contentData4?.fields;
  }
  previous(){this.previousSection.emit('AllRisk');}
  skip() {this.skipSection.emit('AllRisk');}
  ngOnInit(){
    console.log("Edit Location list",this.locationList)
    if(this.locationList.length!=0){
      if(this.locationList[this.tabIndex].SectionList){
        let entry = this.locationList[this.tabIndex].SectionList.find(ele=>ele.SectionId=='34')
        if(entry){
              this.productItem.EmpLiabilitySi = entry?.SumInsured;
              this.productItem.EmpDescription = entry?.DescriptionOfRisk;
        }
      }
    }
  }
  listProceed(type){
    let subDetails = null;
    if(this.locationList[this.tabIndex].SectionList){}
      else{this.locationList[this.tabIndex]['SectionList']=[]}
      if(this.productItem.EmpLiabilitySi!=null && this.productItem.EmpLiabilitySi!='' && this.productItem.EmpLiabilitySi!=0){
        if (this.productItem.EmpLiabilitySi != null && this.productItem.EmpLiabilitySi != '' && this.productItem.EmpLiabilitySi != '0') {
          let subEntry = {
            "SectionId": "34", "SectionName": "Employers Liability",
            "TotalNoOfEmployees": "1",
            "CoverId": "593", "DescriptionOfRisk": this.productItem.EmpDescription,
            "SumInsured": this.productItem.EmpLiabilitySi, "Status": "Y"
          }
          this.locationList[this.tabIndex]['SectionList'].push(subEntry);
        }
      }
    let res = {
      "locationList": this.locationList,
      "type": type
    }
    this.finalProceed.emit(res)
  }
}
