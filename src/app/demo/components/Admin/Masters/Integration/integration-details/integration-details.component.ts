import { Component } from '@angular/core';
import * as Mydatas from '../../../../../../app-config.json';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from '@app/layout/service/layout.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Industry } from '../../industry/industry-details/industry-details';

@Component({
  selector: 'app-integration-details',
  templateUrl: './integration-details.component.html',
  styleUrls: ['./integration-details.component.scss']
})
export class IntegrationDetailsComponent {
  public activeMenu:any='Integration Mapping Master';
  public Industrydetails:any;minDate:Date;
   public branchList:any[]=[];
   MenuMasterList: any[]=[];
   public AppConfig: any = (Mydatas as any).default;
   public ApiUrl1: any = this.AppConfig.ApiUrl1;
   public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
   productId: string;
   loginId: any;
   Sno: any;
   branchValue: any;
   IntegrationId: any;
   BranchCode: any;
   IndustryId: any;
   CategoryList:any[]=[];
   CategoryValue: any;
  productList: any;
  sectionValue: any;
  productValue: any;
  WarrantyData: any[];
  sectionYn: string;
  sectionList: any[];
  insuranceList: any[]=[];
  Remarks:any;
  Status:any='Y';
  EffectiveDate:any;
  SectionDesc:any;
  SectionCode:any;
  ProductDesc:any;
  ProductCode:any;
  policyTypeList: any;
  policyType: any;
 
   constructor(private router:Router,private sharedService:SharedService,private datePipe:DatePipe,private layoutService:LayoutService ) {
     this.minDate = new Date();
     //this.CategoryValue = sessionStorage.getItem('insuranceConfigureId');
     this.productId = sessionStorage.getItem('companyProductId');
     console.log("pppppp", this.productId)
     let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
     this.MenuMasterList = userDetails?.Result?.MenuMasterList;
 
     if (userDetails) {
       this.loginId = userDetails?.Result?.LoginId;
     }
     // this.CategoryValue = userDetails.Result.LoginBranchDetails[0].InsuranceId;
     this.Industrydetails = new Industry();
 
 
   }
 
   ngOnInit(): void {
 
     let tinyurl: any = JSON.parse(sessionStorage.getItem('IntegrationId'));
 
       console.log("Sno Obj", tinyurl)
       this.IntegrationId = tinyurl?.IntegrationId;
       this.productValue = tinyurl?.ProductId;
       this.sectionValue = tinyurl?.SectionId;
       this.CategoryValue = tinyurl?.InsuranceId;
       this.policyType = tinyurl?.policyType;
 
       this.productId=tinyurl?.ProductId;
 
     if(this.IntegrationId!=null && this.IntegrationId!=undefined){
       this.getEditIndustryDetails()
     }
     else{
 
       this.Industrydetails = new Industry();
       this.branchValue = tinyurl?.BranchCode;
       this.productId=tinyurl?.ProductId;
       this.IndustryId =null;
       if(this.Industrydetails?.Status==null) this.Industrydetails.Status = 'N';
 
       this.Industrydetails.CreatedBy = this.loginId;
     }
     this.getCatogery();
     this.getCompanyProductList('direct');
   }
   getMenu(rowData){
     this.layoutService.setMaster(rowData);
  }
   getEditIndustryDetails(){
     let ReqObj = {
       //"BranchCode":this.branchValue,
       "CompanyId":this.CategoryValue,
      // "ProductId": this.productId,
       "IntegrationId":this.IntegrationId,
      //  "SectionId":this.sectionValue,
      //  "PolicyTypeId":this.policyType
     }
     let urlLink = `${this.CommonApiUrl}master/getintegrationmapping`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
         console.log(data);
         let res: any = data;
         if (res.Result) {
           let IntegrationData = res.Result;
          this.ProductCode=IntegrationData.CoreProductCode;
          this.ProductDesc=IntegrationData.CoreProductDesc;
          this.SectionCode=IntegrationData.CoreSectionCode;
          this.SectionDesc=IntegrationData.CoreSectionDesc;
          this.EffectiveDate=IntegrationData.EffectiveDateStart;
          this.Status=IntegrationData.Status;

         }
       },
       (err) => { },
     );
   }
   getSectionList() {
    let ReqObj = {
      "InsuranceId": this.CategoryValue,
      "ProductId": this.productValue,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.sectionList = obj.concat(data?.Result);
          //let secObj = JSON.parse(sessionStorage.getItem('IntegrationId'))
          let secObj = JSON.parse(sessionStorage.getItem('IntegrationId'))
          if (secObj) {
            this.sectionValue = secObj?.SectionId;

          }
          else{
            this.sectionValue = '99999';
          }

          //this.getExistingWarranty()
        }
      },
      (err) => { },
    );
  }
   getCompanyProductList(type) {
    if(type=='change'){this.WarrantyData=[];this.productValue=null;this.sectionYn='N';this.sectionValue=null;}
    else {
      this.getSectionList();
    }
    let ReqObj = {
      "InsuranceId": this.CategoryValue,
    }
    let urlLink = `${this.ApiUrl1}master/getallcompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.productList = data?.Result;
          let obj = []
          this.productList = obj.concat(data?.Result)

          let docObj = JSON.parse(sessionStorage.getItem('IntegrationId'))
          if(docObj){ this.sectionValue = docObj?.SectionId;
            this.productValue = docObj?.ProductId;
            console.log('LLLLLLLLLL',this.sectionValue);
           // this.getSectionList(); this.getExistingWarranty() }
          }
        }

      },
      (err) => { },
    );
  }
   onDateFormatInEdit(date) {
     console.log(date);
     if (date) {
       let format = date.split('-');
       if (format.length > 1) {
         var NewDate = new Date(new Date(format[0], format[1], format[2]));
         NewDate.setMonth(NewDate.getMonth() - 1);
         return NewDate;
       }
       else {
         format = date.split('/');
         if (format.length > 1) {
           // var NewDate = new Date(new Date(format[2], format[1], format[0]));
           // NewDate.setMonth(NewDate.getMonth() - 1);
           let NewDate = format[2]+'-'+format[1]+'-'+format[0];
           return NewDate;
         }
       }
 
     }
   }
   getCatogery(){
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
          if(this.CategoryValue){ this.getCompanyProductList('direct');}
          else{this.CategoryValue='99999'; this.getCompanyProductList('direct');}
        }
  
      },
      (err) => { },
    );
   }
   getBranchList() {
     let ReqObj = {
      "InsuranceId": this.CategoryValue
     }
     let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
         if (data.Result) {
           let obj = [{ Code: "99999", CodeDesc: "ALL" }];
           this.branchList = obj.concat(data?.Result);
 
           let secObj = JSON.parse(sessionStorage.getItem('IntegrationId'))
           if (secObj) {
             this.BranchCode = secObj?.BranchCode;
           }
           else{ this.BranchCode= '99999'; }
 
 
 
         }
       },
       (err) => { },
     );
   }
   onProceed(){
       let startDate;
       if(String(this.EffectiveDate).includes('/')) startDate = this.EffectiveDate
       else startDate = this.datePipe.transform(this.EffectiveDate,'dd/MM/yyyy');
      let IntegrationId
      if(this.IntegrationId){
        IntegrationId=this.IntegrationId
      }
      else{
        IntegrationId=null;
      }
     let ReqObj = {
     "CompanyId": this.CategoryValue,
     "SectionId": this.sectionValue,
     "ProductId": this.productValue,
     "PolicyTypeId": this.policyType,
     "IntegrationId": IntegrationId,
     "CoreSectionCode": this.SectionCode,
     "CoreSectionDesc": this.SectionDesc,
     "CoreProductCode": this.ProductCode,
     "CoreProductDesc":this.ProductDesc,
     "EffectiveDateStart": startDate,
     "CreatedBy":this.loginId,
     "Status": this.Status,
     }
     let urlLink = `${this.CommonApiUrl}master/saveintegrationmapping`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
           console.log(data);
           let res:any=data;
           if(data.Result){
               this.router.navigate(['/Admin/integrationDetails'])
           }
 
         },
         (err) => { },
       );
   }
   ongetBack(){
     this.router.navigate(['/Admin/integrationDetails'])
   }
   getPolicyTypeList() {
  
    let ReqObj = {
      "InsuranceId": this.CategoryValue,
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
   onRedirect(value){
     if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
     if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails'])
     if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails'])
     if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails'])
     if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
     if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails'])
     if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
     if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
     if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList'])
     if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
     if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata'])
     if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
     if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
     if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
     if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
   }
}
