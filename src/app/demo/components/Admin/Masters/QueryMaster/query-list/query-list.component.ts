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
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {

  activeMenu: any;
  MenuMasterList: any[] = [];
  public columnHeader: any[] = [];
  public QueryMasterData: any[] = [];
  userDetails: any;

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  insuranceList: { Code: string; CodeDesc: string; }[];

  ngOnInit() {
    this.columnHeader = ['Query Id', 'Query Name', 'Sql Query', 'Action']
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
    this.activeMenu = 'FieldQuery TableQuery Master';
    this.getQueryList();
  }
  constructor(private layoutService: LayoutService, private sharedService: SharedService, private router: Router) { }

  getQueryList() {
    let urlLink = `${this.ApiUrl1}admin/getall-fieldquery-tablequery`;
    this.sharedService.onGetMethod(urlLink).subscribe(
      (data: any) => {
        if (data.Result) {
          this.QueryMasterData = data.Result;
        }
      }, (err) => { },
    );
  }

  getMenu(rowData: any) {
    this.layoutService.setMaster(rowData);
  }

  onAddSection() {
    sessionStorage.removeItem('queryListData');
    this.router.navigate(['/Admin/queryMaster/new_query_Details']);
  }
  onEditSection(event) {
    sessionStorage.setItem('queryListData', JSON.stringify(event));
    this.router.navigate(['/Admin/queryMaster/new_query_Details']);
  }
}