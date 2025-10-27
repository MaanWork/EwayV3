import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { LayoutService } from '@app/layout/service/layout.service';
@Component({
   selector: 'app-api-flow-list',
   templateUrl: './api-flow-list.component.html',
  styleUrls: ['./api-flow-list.component.scss']
})
export class ApiFlowListComponent implements OnInit {

  activeMenu: any;
  MenuMasterList: any[] = [];
  companyId: any;
  public insuranceId:any;
  productList: any;
  productValue: any;
  public flowFieldsData:any []=[];
  public columnHeader: any[] = [];
  userDetails:any;
  loginId: any;
  ApiData : any;
  apiType : any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  insuranceList: { Code: string; CodeDesc: string; }[];

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.ApiData = JSON.parse(sessionStorage.getItem('ApiIntegrationCode'));
    this.ApiData.apiType ? this.apiType = this.ApiData.apiType : this.apiType = ''
    if(this.userDetails?.Result?.MenuMasterList) this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
    else{
      this.MenuMasterList = this.userDetails?.Result?.menuList.find(ele=>ele.title=="Masters")?.children;
    }
    this.activeMenu = 'API Integration Master';
    this.columnHeader = [
      'Key Id',
      'Json Key',
      'Header KeyId',
      'Default Yn',
      'Default Value',
      'Query Alias',
      'Status',
      'Edit'
    ]
    this.getflowFields()
  }
  constructor(private layoutService : LayoutService,private sharedService: SharedService,private router: Router){}
  

  getflowFields() {
    let ReqObj = {
      "companyId": this.ApiData.CompanyId,
      "productId": this.ApiData.ProductId,
      "integType": this.ApiData.apiType
    }
    let urlLink = `${this.ApiUrl1}admin/getall-flowfield-details`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.flowFieldsData = data.Result;
        }
      }
    )
  }

  onAddSection() {
    let ReqObj = {
      "KeyId": null
    }
    sessionStorage.setItem('flowFieldsKeyId',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/apiIntegMaster/flow_field_details_form'])
  }

  onEditSection(event) {
    let ReqObj = {
      "KeyId": event.keyId
    }
    sessionStorage.setItem('flowFieldsKeyId',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/apiIntegMaster/flow_field_details_form'])
  }

  ongetBack() {
    this.router.navigate(['/Admin/apiIntegMaster'])
  }

  getMenu(rowData: any) {
    this.layoutService.setMaster(rowData);
  }

}
