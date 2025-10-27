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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BankListRoutingModule } from '../../Bank/bank-list/bank-list-routing.module';
import * as Mydatas from '../../../../../../app-config.json';
import { Router } from '@angular/router';
import { LayoutService } from '@app/layout/service/layout.service';
import { queryForm } from './queryForm';
@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.scss']
})
export class QueryFormComponent implements OnInit {
  activeMenu: any;
  userDetails: any;
  MenuMasterList: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  QueryFomrDetails: any = {};
  QueryData : any;
  QueryId : any = null;

  constructor(private layoutService: LayoutService, private sharedService: SharedService, private router: Router) { }
  

  ngOnInit() {
    this.QueryFomrDetails = new queryForm();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.QueryData = JSON.parse(sessionStorage.getItem('queryListData'));
    this.QueryId = this.QueryData?.queryId;
    if(this.QueryId){
      this.QueryFomrDetails = this.QueryData
    }else{
      this.QueryFomrDetails = new queryForm();
    }
    this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
    this.activeMenu = 'FieldQuery TableQuery Master';
  }
  getMenu(rowData: any) {
    this.layoutService.setMaster(rowData);
  }
  ongetBack() {
    this.router.navigate(['/Admin/queryMaster'])
  }
  onProceed() {
    let ReqObj = this.QueryFomrDetails
    let urlLink = `${this.ApiUrl1}admin/save-fieldquery-tablequery`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.router.navigate(['/Admin/queryMaster'])
        }
      }
    )
  }

}
