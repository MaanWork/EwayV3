import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PipesModule } from '@app/_pipes/pipes.module';
import { DirectivesModule, SharedService } from '@app/_services';
import { LayoutService } from '@app/layout/service/layout.service';
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
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
   selector: 'app-api-flowfields-form',
    templateUrl: './api-flowfields-form.component.html',
  styleUrls: ['./api-flowfields-form.component.scss']
})
export class ApiFlowfieldsFormComponent implements OnInit {
  ApiData : any;
  KeyData : any;
  apiType : any;
  FlowfiledsDetails : FormGroup;
  HeaderKeyList : any[] = [];
  dataTypeList : any[] = [];
  queryIdList : any[] = [];
  messages: Message[] = [];
  
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private layoutService : LayoutService,private fb: FormBuilder,private sharedService: SharedService,private router: Router){}
  ngOnInit() {
    this.initializeForm();
    this.ApiData = JSON.parse(sessionStorage.getItem('ApiIntegrationCode'));
    this.KeyData = JSON.parse(sessionStorage.getItem('flowFieldsKeyId'));
    this.ApiData.apiType ? this.apiType = this.ApiData.apiType : this.apiType = ''
    this.getheaderKey();
    this.getDataType();
    this.getQueyId();
    if(this.KeyData.KeyId){
      this.getFlowFieldsData()
    }
  }

  ongetBack() {
    this.router.navigate(['/Admin/apiIntegMaster/flow_field_details'])
  }
  onProceed() {
    // if (this.FlowfiledsDetails.valid) {
      let ReqObj = {
        "companyId": this.ApiData.CompanyId,
        "productId": this.ApiData.ProductId,
        "integType": this.apiType,
        "keyId": this.KeyData.KeyId,
        "jsonKey": this.FlowfiledsDetails.controls['jsonKey']?.value,
        "isHeader": this.FlowfiledsDetails.controls['isHeader']?.value,
        "headerKeyId": this.FlowfiledsDetails.controls['headerKeyId']?.value,
        "isArray": this.FlowfiledsDetails.controls['isArray']?.value,
        "dataType": this.FlowfiledsDetails.controls['dataType']?.value,
        "pattern": this.FlowfiledsDetails.controls['pattern']?.value,
        "defaultYn": this.FlowfiledsDetails.controls['defaultYn']?.value,
        "defaultValue": this.FlowfiledsDetails.controls['defaultValue']?.value,
        "status": this.FlowfiledsDetails.controls['status']?.value,
        "queryId": this.FlowfiledsDetails.controls['queryId']?.value,
        "queryCol": this.FlowfiledsDetails.controls['queryCol']?.value,
        "queryAlias": this.FlowfiledsDetails.controls['queryAlias']?.value
      }
      let urlLink = `${this.ApiUrl1}admin/save-flowfield-details`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          this.router.navigate(['/Admin/apiIntegMaster/flow_field_details'])
        }
      )
    // } else {
    //   this.messages = [
    //     {
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Fill All Fields',
    //     },
    //   ];
    // }
  }
  getFlowFieldsData() {
    let ReqObj = {
      "companyId": this.ApiData.CompanyId,
      "productId": this.ApiData.ProductId,
      "integType": this.apiType,
      "keyId": this.KeyData.KeyId
    }
    let urlLink = `${this.ApiUrl1}admin/get-flowfield-details`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let formValue = data?.Result;
        this.FlowfiledsDetails.patchValue({
          keyId :  formValue.keyId,
          jsonKey: formValue.jsonKey,
          isHeader: formValue.isHeader,
          headerKeyId: formValue.headerKeyId,
          isArray: formValue.isArray,
          dataType: formValue.dataType,
          pattern: formValue.pattern,
          defaultYn: formValue.defaultYn,
          defaultValue: formValue.defaultValue,
          status: formValue.status,
          queryId: formValue.queryId,
          queryCol: formValue.queryCol,
          queryAlias: formValue.queryAlias
        })
      }
    )
  }
  getheaderKey(){
    let ReqObj = {
      "companyId": this.ApiData.CompanyId,
      "productId": this.ApiData.ProductId,
      "integType": this.apiType,
    }
    let urlLink = `${this.ApiUrl1}dropdown/flowfield-header-keys`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.HeaderKeyList = data?.Result
      }
    )
  }
  getDataType(){
    let urlLink = `${this.ApiUrl1}dropdown/flowfield-datatypes`;
    this.sharedService.onGetMethod(urlLink).subscribe(
      (data: any) => {
        this.dataTypeList = data?.Result
      }
    )
  }
  getQueyId(){
    let urlLink = `${this.ApiUrl1}dropdown/fieldquery-queryid`;
    this.sharedService.onGetMethod(urlLink).subscribe(
      (data: any) => {
        this.queryIdList = data?.Result
      }
    )
  }


  checkValidaiton(){
    if(this.FlowfiledsDetails.get('defaultYn').value == 'Y'){
      return true}else{
      return false
    }
  }

  // form validation check
  initializeForm() {
    this.FlowfiledsDetails = this.fb.group({
      keyId: [null],
      jsonKey: [null, Validators.required],
      isHeader: [null, Validators.required],
      headerKeyId: [null, Validators.required],
      isArray: [null],
      dataType: [null],
      pattern: [null],
      defaultYn: [null, Validators.required],
      defaultValue: [null],
      status: [null, Validators.required],
      queryId: [null],
      queryCol: [null],
      queryAlias: [null]
    });
  }

  // defaultYn Condition check
  checkDefaultYn(){
    this.FlowfiledsDetails.get('defaultYn')?.valueChanges.subscribe(value => {
      if (value === 'Y') {
        this.FlowfiledsDetails.get('defaultValue')?.setValidators([Validators.required]);
        this.FlowfiledsDetails.get('queryId')?.clearValidators();
        this.FlowfiledsDetails.get('queryCol')?.clearValidators();
        this.FlowfiledsDetails.get('queryAlias')?.clearValidators();
      } else  {
        this.FlowfiledsDetails.get('defaultValue')?.clearValidators();
        this.FlowfiledsDetails.get('queryId')?.setValidators([Validators.required]);
        this.FlowfiledsDetails.get('queryCol')?.setValidators([Validators.required]);
        this.FlowfiledsDetails.get('queryAlias')?.setValidators([Validators.required]);
      }
      this.FlowfiledsDetails.get('defaultValue')?.updateValueAndValidity();
      this.FlowfiledsDetails.get('queryId')?.updateValueAndValidity();
      this.FlowfiledsDetails.get('queryCol')?.updateValueAndValidity();
      this.FlowfiledsDetails.get('queryAlias')?.updateValueAndValidity();
    });
  }

}