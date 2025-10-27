import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-claim-intimate',
  templateUrl: './claim-intimate.component.html',
  styleUrls: ['./claim-intimate.component.scss']
})
export class ClaimIntimateComponent {
  items: MenuItem[] | undefined;
  tabIndex:any=0;lang:any=null;userDetails:any=null;brokerCode:any=null;
  loginId:any=null;agencyCode:any=null;brokerbranchCode:any=null;documentList:any[]=[];
  branchCode:any=null;productId:any=null;userType:any=null;insuranceId:any=null;claimSearchValue:any=null;
  gridSection:boolean=true;thirdPartyList:any[]=[];columns:any[]=[];columns2:any[]=[];columns3:any[]=[];
  existingClaimList:any[]=[];existingClaimList2:any[]=[];claimRefNo: any=null;viewStatus: boolean=false;
  claimStatusValue:any=null;statusList:any[]=[];partyInvolvedList:any[]=[];isThirdPartyYN:any='Y';
  constructor(private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate: TranslateService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.claimSearchValue='CLM-980451';
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
      sessionStorage.removeItem('loadingType');
      sessionStorage.removeItem('firstLoad');
      sessionStorage.removeItem('VechileDetails');
      this.partyInvolvedList=[
        {"Code":"Y","CodeDesc":"Yes"},{"Code":"N","CodeDesc":"No"}
      ]
      this.columns = [ 'Driver Name','License No','Nationality','Mobile No','DriverLiability','Vehicle Insurer','Make', 'Model','Plate No','Third Party Reference','ThirdParty Type','Actions'];
      this.columns2 = ['Document','Format','Name','Document Type']
      this.columns3 = ['Claim No','Claim Type','Loss Name','Loss Date','Accident Number','View Status'];
      this.existingClaimList2=[
        {
          "ClaimNo":"CLM-980451",
          "ClaimType":"At Fault",
          "LossName":"Own Damage",
          "LossDate":"15/09/2024",
          "AccidentNo": "783475888763"
        }
      ]
      this.existingClaimList=[
        {
          "ClaimNo":"CLM-980451",
          "ClaimType":"At Fault",
          "LossName":"Own Damage",
          "LossDate":"15/09/2024",
          "AccidentNo": "783475888763"
        },
        {
          "ClaimNo":"CLM-45678",
          "ClaimType":"Not At Fault",
          "LossName":"Own Damage",
          "LossDate":"11/08/2024",
          "AccidentNo": "59348753454"
        },
        {
          "ClaimNo":"CLM-45679",
          "ClaimType":"At Fault",
          "LossName":"Own Damage",
          "LossDate":"10/06/2024",
          "AccidentNo": "59348756939"
        }
      ]
      this.thirdPartyList = [
        {
          "TPDriverLiability": 0,
          "TPDriverLicenceNo": 0,
          "TPDriverName": 0,
          "TPDriverNationalityCode": "India",
          "TPDriverTrafficNo": 0,
          "TPMobileNumber": "758495622",
          "TPVehicleCurrentInsurer": "Steve",
          "TPVehicleMake": "AUDI",
          "TPVehicleMakeCode": "AUDI",
          "TPVehicleModel": "X5",
          "TPVehicleModelCode": "X5",
          "TPVehiclePlateCode": "493685934",
          "TPVehiclePlateNo": 89854632,
          "TPVehiclePlateTypeCode": 0,
          "ThirdPartyReference": "Ram",
          "ThirdPartyType": 0
        }
      ];
      this.statusList=[
        {"Code":null,"CodeDesc":"---Select---"},
        {"Code":"01","CodeDesc":"Pending Loss Created"},
        {"Code":"02","CodeDesc":"Supplementary Loss Finalised"},
        {"Code":"03","CodeDesc":"Appraisal Submitted"}
      ]
      this.documentList=[
        {
          "DocumentData": "",
          "DocumentFormat": "",
          "DocumentId": "",
          "DocumentName": "",
          "DocumentRefNo": "",
          "DocumentType": "",
          "DocumentURL": ""
        }
      ]
   }
  ngOnInit() {
    
    this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
		  });
		if(!this.lang){
      if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));}
  }
  viewClaimStatus(rowData){
      this.claimRefNo = rowData.ClaimNo;
      this.viewStatus = true;
  }
  addTPRow(){
    this.thirdPartyList.push({
      "TPDriverLiability": 0,
      "TPDriverLicenceNo": 0,
      "TPDriverName": 0,
      "TPDriverNationalityCode": "India",
      "TPDriverTrafficNo": 0,
      "TPMobileNumber": "",
      "TPVehicleCurrentInsurer": "",
      "TPVehicleMake": "",
      "TPVehicleMakeCode": "",
      "TPVehicleModel": "",
      "TPVehicleModelCode": "",
      "TPVehiclePlateCode": "",
      "TPVehiclePlateNo": 0,
      "TPVehiclePlateTypeCode": 0,
      "ThirdPartyReference": "",
      "ThirdPartyType": 0
    })
  }
  addDocument(){
    this.documentList.push(
      {
        "DocumentData": "",
        "DocumentFormat": "",
        "DocumentId": "",
        "DocumentName": "",
        "DocumentRefNo": "",
        "DocumentType": "",
        "DocumentURL": ""
      }
    );
  }
  deleteTP(index){this.thirdPartyList.splice(index);}
  deleteDocument(index){this.documentList.splice(index);}
  onTabClicked(event){
    console.log("Event",event)
    let index = event.index;
    this.tabIndex = index;
   if(this.tabIndex==0){}
   if(this.tabIndex==1){}
   if(this.tabIndex==2){}
   if(this.tabIndex==3){}
  }
}
