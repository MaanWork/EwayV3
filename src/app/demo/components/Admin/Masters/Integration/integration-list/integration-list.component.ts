import { Component } from '@angular/core';
import * as Mydatas from '../../../../../../app-config.json';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LayoutService } from '@app/layout/service/layout.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-integration-list',
  templateUrl: './integration-list.component.html',
  styleUrls: ['./integration-list.component.scss']
})
export class IntegrationListComponent {

  public tableData:any []=[];
  CountryList:any;
  CountryValue:any;
  public activeMenu:any='Integration Mapping Master';
  public columnHeader: any[] = [];
  public AppConfig:any =(Mydatas as any).default;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public ApiUrl1:any = this.AppConfig.ApiUrl1;
  public IntegrationId:any;
  public insuranceId:any;
  public IntegrationData:any[]=[];sectionYn:any='N';
  public branchList:any;branchValue:any;
  BranchCode: any;productList:any;productValue:any=null;
  userDetails: any;
  sectionValue: any=null;
  sectionList: any[];
  insuranceList: { Code: string; CodeDesc: string; }[];
  loginId: any;
  MenuMasterList: any[]=[];
  ProductId: any=null;
  UserType: any;
  insuranceName: string;
  policyType:any=null; 
  policyTypeList: any[]=[];
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,private layoutService:LayoutService ) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;

      const user = this.userDetails?.Result;
      this.UserType = this.userDetails?.Result?.UserType;
      this.ProductId = this.userDetails?.Result?.ProductId;
      this.loginId = user?.LoginId;
      // this.insuranceId = user.LoginBranchDetails[0].InsuranceId;

     }

  ngOnInit(): void {
    this.columnHeader = [
     'SectionName' ,'ProductName',
     'Effective Date Start' ,
     'Status' ,'Action',
    ];
    let obj =  JSON.parse(sessionStorage.getItem('IntegrationId'));
      if(obj){
        this.insuranceId=obj.InsuranceId
        this.branchValue=obj.BranchCode
        this.productValue=obj.ProductId
        this.sectionValue=obj.SectionId
        if(this.sectionValue){
          this.getSectionList()
        }
        this.policyType=obj.policyType
        if(this.sectionValue=='99999'){
          this.sectionYn='N'
        }
        else{
          this.sectionYn='Y'
        }
      }
      this.getCompanyList();
  }
  onAddSection(){
    let ReqObj = {
      "IntegrationId":null,
       "InsuranceId":this.insuranceId,
       "BranchCode": this.branchValue,
       "ProductId": this.productValue,
       "SectionId": this.sectionValue,
       "policyType":this.policyType,
    }
    sessionStorage.setItem('IntegrationId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/integrationDetails/integrationNewDetails'])
  }

  getBranchList(type){
    if(type=='change'){this.IntegrationData=[];this.branchValue=null;this.productValue=null;this.sectionYn='N';this.sectionValue=null;}
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        //this.getSectionList();
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(!this.branchValue){ this.branchValue = "99999"; this.getCompanyProductList('change')}
      }
    },
    (err) => { },
  );
  }
  onChangeSectionYn(){
   if(this.sectionYn!='Y'){
      this.sectionValue= '99999';
    }
    else{
      this.sectionValue = null;
      this.IntegrationData = [];

    }
  }
  getCompanyProductList(type){
    if(type=='change'){this.IntegrationData=[];this.productValue=null;this.sectionYn='N';this.sectionValue=null;}
    let ReqObj ={
      "InsuranceId":this.insuranceId,
      "Limit":"0",
      "Offset":"100000"
    }
    let urlLink = `${this.ApiUrl1}master/getallcompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
       this.productList = data?.Result;
       let obj =[{"ProductId":null,"ProductDesc":"---Select---"}]
       this.productList = obj.concat(data?.Result);
       let docObj = JSON.parse(sessionStorage.getItem('IntegrationId'));
       if(type=='change'){
         if(docObj){ this.sectionValue = docObj?.SectionId;
           this.productValue = docObj?.ProductId;
           console.log('LLLLLLLLLL',this.sectionValue);
            this.getExistingClauses();  }
         else{ this.productValue=this.productList[0].ProductId;  this.getExistingClauses()  }
       }
      //  if(!this;.productValue){ this.productValue = "5";
      //  this.getSectionList();
      //  this.getExistingClauses() }
       }

      },
      (err) => { },
    );
  }
  getExistingClauses(){

    // if(this.sectionYn=='N'){
    //   //this.productValue="99999";
    //   this.sectionValue="99999"
    // }
    let ReqObj = {
      "CompanyId":this.insuranceId,
     //"BranchCode":this.branchValue,
     "ProductId":this.productValue,
     "SectionId":this.sectionValue
    }
    let urlLink = `${this.CommonApiUrl1}master/getallintegrationmapping`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          //this.getSectionList();
            this.IntegrationData = data?.Result;
        }
      },
      (err) => { },
    );
  }

  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"",
      "LoginId": this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
          this.insuranceList = defaultObj.concat(data.Result);
          if(this.insuranceId){ this.getCompanyProductList('direct');}
          else{this.insuranceId='99999'; this.getCompanyProductList('direct');}
        }
  
      },
      (err) => { },
    );
  }
  EditStatus(event){
    let ReqObj = {
      "IntegrationId":event.IntegrationId,
      "InsuranceId":this.insuranceId,
      "BranchCode":this.branchValue,
      "ProductId": this.productValue,
      "SectionId":this.sectionValue,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangedEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}master/clauses/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
      },
      (err) => { },
    );
  }
  getSectionList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productValue,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        this.getPolicyTypeList();
        this.getExistingClauses();
        let obj = [{Code:"",CodeDesc:"---Select---"}];
        this.sectionList = obj.concat(data?.Result);
      //   let secObj = JSON.parse(sessionStorage.getItem('IntegrationId'))
      //   if (secObj) {
      //     this.sectionValue = secObj?.SectionId;
      //   }
      //  else {
      //   this.sectionValue = '99999';
      //  }
      }
    },
    (err) => { },
  );
  }
  onEditClauses(rowdata) {

    let ReqObj = {
      "IntegrationId":rowdata.IntegrationId,
       "InsuranceId":this.insuranceId,
        "BranchCode":this.branchValue,
        "ProductId":this.productValue,
        "SectionId":this.sectionValue,
        "policyType":this.policyType,

    }
    sessionStorage.setItem('IntegrationId', JSON.stringify(ReqObj));
    this.router.navigateByUrl('/Admin/integrationDetails/integrationNewDetails');
  }

  onAddSectionList(){
    let ReqObj = {
      "IntegrationId":null,
       "InsuranceId":this.insuranceId,
        "BranchCode":this.branchValue,
        "ProductId":this.productValue,
        "SectionId":this.sectionValue,
        "policyType":this.policyType,
    }
    sessionStorage.setItem('IntegrationId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/integration/integrationDetails'])
  }
  getMenu(rowData){
    this.layoutService.setMaster(rowData);
 }

 getPolicyTypeList() {
  
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ProductId": this.productValue,
    "BranchCode": this.BranchCode,
    "LoginId": this.loginId
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data.Result) {
        this.policyTypeList = data.Result;
    }
  },
    (err) => { },
  );
}
}
