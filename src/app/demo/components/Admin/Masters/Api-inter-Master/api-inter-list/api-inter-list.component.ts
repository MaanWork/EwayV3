import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@app/_pipes/pipes.module';
import { DirectivesModule, SharedService } from '@app/_services';
import { MaterialModule } from '@app/shared/material/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import * as Mydatas from '../../../../../../app-config.json';
import { LayoutService } from '@app/layout/service/layout.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-api-inter-list',
   templateUrl: './api-inter-list.component.html',
  styleUrls: ['./api-inter-list.component.scss']
})
export class ApiInterListComponent implements OnInit {

  activeMenu: any;
  MenuMasterList: any[] = [];
  companyId: any;
  public insuranceId:any;
  productList: any;
  productValue: any;
  ApiIntegrationCode:any;
  public ApiIntegrationData:any []=[];
  public columnHeader: any[] = [];
  userDetails:any;
  loginId: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  insuranceList: { Code: string; CodeDesc: string; }[];


  ngOnInit(){
    this.columnHeader = [
      'API Type',
      'API Desc',
      'Status',
      'API Url',
      'Flow Count',
      'Edit',
      'Action'
    ] 
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.ApiIntegrationCode = JSON.parse(sessionStorage.getItem('ApiIntegrationCode')) || null;
    if(this.userDetails?.Result?.MenuMasterList) this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
    else{
      this.MenuMasterList = this.userDetails?.Result?.menuList.find(ele=>ele.title=="Masters")?.children;
    }
    const user = this.userDetails?.Result;
    this.activeMenu = 'API Integration Master';
    this.loginId = user?.LoginId;
    if(this.userDetails!=undefined && this.userDetails!=null && this.userDetails!="undefined"){
      this.companyId = this.userDetails?.Result.InsuranceId;
      // this.branchValue = bankObj?.BranchCode
    }
    else this.companyId = this.insuranceId
    this.getCompanyList();
  }
  constructor(private layoutService : LayoutService,private sharedService: SharedService,private router: Router){}
  
  onAddSection() {
    let ReqObj = {
      "ProductId": this.productValue,
      "CompanyId": this.companyId
    }
    sessionStorage.setItem('ApiIntegrationCode',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/apiIntegMaster/new_Api_Integration_Details']);
  }
  onEditSection(event){
    let ReqObj = {
      "apiType" : event.apiType,
      "ProductId": this.productValue,
      "CompanyId": this.companyId
    }
    sessionStorage.setItem('ApiIntegrationCode',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/apiIntegMaster/new_Api_Integration_Details'])
  }
  onflowSection(event){
   let ReqObj = {
      "apiType" : event.apiType,
      "ProductId": this.productValue,
      "CompanyId": this.companyId
    }
    sessionStorage.setItem('ApiIntegrationCode',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/apiIntegMaster/flow_field_details'])
  }
  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"",
      "LoginId": this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          // let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
          this.insuranceList = data.Result;
          if(this.companyId) this.getProductList();
        }
  
      },
      (err) => { },
    );
  }
  getProductList(arg0?: string) {
    if (arg0 == 'change') {
      this.productValue = null;
      this.ApiIntegrationData = [];
    }
    let ReqObj = {
      "InsuranceId": this.companyId
    }
    let urlLink = `${this.ApiUrl1}master/getallcompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.productList = data?.Result;
          if (!this.productValue) { 
            this.ApiIntegrationCode.ProductId ? 
            this.productValue =  this.ApiIntegrationCode.ProductId : 
            this.productValue = this.productList[0]?.ProductId; 
            this.getExistingApi() 
          } else { 
            
            this.getExistingApi() 
          }
        }
      },
      (err) => { },

    );
  }
  getExistingApi() {
    let ReqObj = {
      "companyId": this.companyId,
      "productId": this.productValue
    }
    let urlLink = `${this.ApiUrl1}admin/getall-api-integ-master`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ApiIntegrationData = data?.Result;
            console.log("BankData",this.ApiIntegrationData);
        }
      }, 
      (err) => { },    
    );
    // throw new Error('Method not implemented.');
  }

  getMenu(rowData: any) {
    this.layoutService.setMaster(rowData);
  }

}
