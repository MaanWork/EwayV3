import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@app/_pipes/pipes.module';
import { DirectivesModule, SharedService } from '@app/_services';
import { MaterialModule } from '@app/shared/material/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import * as Mydatas from '../../../../../../app-config.json';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BankListRoutingModule } from '../../Bank/bank-list/bank-list-routing.module';
import { Router } from '@angular/router';
import { LayoutService } from '@app/layout/service/layout.service';
import { apiInter } from './api-interModel';
@Component({
   selector: 'app-api-inter-form',
   templateUrl: './api-inter-form.component.html',
  styleUrls: ['./api-inter-form.component.scss']
})
export class ApiInterFormComponent implements OnInit {

  activeMenu: any;
  MenuMasterList: any[] = [];
  ApiIntegrationDetails: any = {};
  userDetails: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  ApiData: any;
  ApiType: any;
  apiTypeDisable : boolean = false;
  constructor(private layoutService: LayoutService, private sharedService: SharedService, private router: Router) { }


  ngOnInit() {
    this.ApiIntegrationDetails = new apiInter();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.ApiData = JSON.parse(sessionStorage.getItem('ApiIntegrationCode'));
     if(this.userDetails?.Result?.MenuMasterList) this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
     else{
      this.MenuMasterList = this.userDetails?.Result?.menuList.find(ele=>ele.title=="Masters")?.children;
    }
    this.activeMenu = 'API Integration Master';
    if (this.ApiData.apiType) {
      this.ApiType = this.ApiData.apiType;
      this.apiTypeDisable = true
      this.getApiData();
    }
  }
  getMenu(rowData: any) {
    this.layoutService.setMaster(rowData);
  }
  getApiData() {
    let ReqObj = {
      "companyId": this.ApiData.CompanyId,
      "productId": this.ApiData.ProductId,
      "apiType": this.ApiType,
    }
    let urlLink = `${this.ApiUrl1}admin/get-api-integ-master`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.ApiIntegrationDetails = data?.Result
      }
    )
  }
  ongetBack() {
    this.router.navigate(['/Admin/apiIntegMaster'])
  }
  onProceed() {
    let ReqObj = {
      "companyId": this.ApiData.CompanyId,
      "productId": this.ApiData.ProductId,
      "apiType": this.ApiIntegrationDetails.apiType,
      "status": this.ApiIntegrationDetails.status,
      "apiDesc": this.ApiIntegrationDetails.apiDesc,
      "apiUrl": this.ApiIntegrationDetails.apiUrl
    }
    let urlLink = `${this.ApiUrl1}admin/save-api-integ-master`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.router.navigate(['/Admin/apiIntegMaster'])
        }
      }
    )
  }
}