import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SharedService } from 'src/app/_services/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TreeNode } from 'primeng/api';
import { el } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-co-insurance-details',
  standalone: false,
  templateUrl: './co-insurance-details.component.html',
  styleUrls: ['./co-insurance-details.component.scss']
})
export class CoInsuranceDetailsComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  userDetails: any;
  userType: any;
  agencyCode: any;
  branchCode: any;
  branchList: any;
  productId: any;
  productName: any;
  insuranceId: any;
  quoteNo: any;
  headerDetails: any;
  companyList: any;
  coInsurance: any;
  reInsurance: any
  applyToAllCover: any
  applyToAllRisk: any
  tabIndex: any
  selectedRiBasis: string | null = null;
  facPercentage: number | null = null;
  dropCompanyList: any[] = []
  riBasisOptionsList: any[] = [
    {

      "Code": "1",
      "CodeDesc": "Policy Basis",

    },
    {

      "Code": "2",
      "CodeDesc": "Risk Basis",

    }
  ]
  riCategoryList: any[] = [
    {

      "Code": "1",
      "CodeDesc": "Category C",

    },
    {

      "Code": "2",
      "CodeDesc": "Category D",

    }
  ]
  roleList: any[] = [
    {

      "Code": "Follow",
      "CodeDesc": "Follow",

    },
    {

      "Code": "Leader",
      "CodeDesc": "Leader",

    }
  ]
  sidebarVisible2: boolean = false
  coInsuranceForm!: FormGroup;
  lang: any;

  tableList: any
  loginId: any;
  Sno: any;
  constructor(private router: Router, private sharedService: SharedService, private messageService: MessageService,
    private translate: TranslateService, private appComp: AppComponent, private datePipe: DatePipe, private route: ActivatedRoute, private fb: FormBuilder
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName = this.userDetails.Result.ProductName;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId
    let QuoteNo = sessionStorage.getItem('quoteNo');
    this.quoteNo = QuoteNo;
    this.coInsurance = 'No'
    this.reInsurance = 'No'
    this.appComp.getLanguage().subscribe((res: any) => {
      if (res) this.lang = res;
      else this.lang = 'en';
      this.translate.setDefaultLang(this.lang);
    });
    if (!this.lang) {
      if (sessionStorage.getItem('language')) this.lang = sessionStorage.getItem('language');
      else this.lang = 'en';
      sessionStorage.setItem('language', this.lang)
      this.translate.setDefaultLang(sessionStorage.getItem('language'));
    }
  }

  ngOnInit() {
    this.gethederDetails();
    this.getReInsurance();
    this.coInsuranceForm = this.fb.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      commissionPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.getCoInsurance();
  }

  gethederDetails() {
    let ReqObj = {

      "QuoteNo": this.quoteNo
    }

    let urlLink = `${this.CommonApiUrl}Coinsurance/insertCoinsuranceHeader`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.headerDetails = data.Result;
          console.log(this.headerDetails, "this.headerDetails");

        }
      });
  }

  onAddNewItem() {
    this.Sno = null;
    this.sidebarVisible2 = true
    this.getCompanyList();
  }

  getCompanyList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "CO_INSURURANCE"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        // let defaultObj = [{ "Code": null, "CodeDesc": "--Select--" }]
        this.dropCompanyList = data.Result;
      })
  }

  onSubmit(): void {
    if (this.coInsuranceForm.valid) {
      let d
      let strDate
      let endDate
      if (this.coInsuranceForm.controls.company.value) {
        d = this.dropCompanyList.filter(e => e.Code == this.coInsuranceForm.controls.company.value);
      }
      strDate = this.datePipe.transform(this.headerDetails.PolicyStartDate, 'yyyy-mm-dd');
      // strDate = this.datePipe.transform(this.headerDetails.PolicyStartDate, 'dd/MM/yyyy');
      // endDate = this.datePipe.transform(this.headerDetails.PolicyEndDate, 'dd/MM/yyyy');
      endDate = this.datePipe.transform(this.headerDetails.PolicyEndDate, 'yyyy-mm-dd');
      let ReqObj = {
        "Sno": this.Sno ? this.Sno : null,
        "QuoteNo": this.headerDetails?.QuoteNo,
        "InsuranceCompanyId": this.coInsuranceForm.controls.company.value,
        "InsuranceCompanyDesc": d[0].CodeDesc,
        "SharePrecentage": this.coInsuranceForm.controls.percentage.value,
        "CoInsuranceRole": this.coInsuranceForm.controls.role.value,
        "commissionPre": this.coInsuranceForm.controls.commissionPercentage.value,
        "PolicyStartDate": strDate,
        "PolicyEndDate": endDate
      }
      let urlLink = `${this.CommonApiUrl}Coinsurance/insertCoinsuranceDetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result && data?.IsError != true) {
            Swal.fire({
              title: 'Success!',
              text: 'Your policy has been saved successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.getCoInsurance();
            this.coInsuranceForm.reset()
            this.sidebarVisible2 = false
          }
          else {
            if (data?.IsError == true) {
              Swal.fire({
                title: 'Error!',
                text: data.Message,
                icon: 'error',
                confirmButtonText: 'Retry'
              });
            }
          }
        });

    } else {
      this.coInsuranceForm.markAllAsTouched();
    }
  }

  getReInsurance() {
    this.tabIndex = 1
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}reinsurance/viewReInsuranceDetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.tableList = data.Result;
        if (this.tableList?.RiBasisId && this.tableList?.FACPerc) {
          setTimeout(() => {
            this.selectedRiBasis = this.tableList?.RiBasisId;
            this.facPercentage = this.tableList?.FACPerc;
            if(this.facPercentage){
              this.reInsurance = 'Yes'
              this.tabIndex =1
            }
          }, 100);
        }


      })
  }
  getCoInsurance() {
    this.tabIndex = 1
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}Coinsurance/getCoinsuranceDetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {

        this.companyList = data.Result
        if (this.companyList.length != 0) {
          this.coInsurance = 'Yes'
          this.tabIndex = 0
          this.getCompanyList();
        }
        else {
          this.tabIndex = -1
        }
      })
  }
  getTotal(field: string): number {
    if (!this.companyList || this.companyList.length === 0) {
      return 0;
    }
    return this.companyList
      .map(item => Number(item[field]) || 0)
      .reduce((a, b) => a + b, 0);
  }

  back() {
    this.router.navigate(['/quotation/plan/premium-details'])

  }
  nextPage() {
    this.router.navigate(['/quotation/plan/main/document-info'])
  }

  CoverPMLCalculate(risk: any, cover: any) {
    const pmlPerc = Number(risk.PMLPerc) || 0;

    if (risk.CoverDetails && risk.CoverDetails.length > 0) {
      risk.CoverDetails.forEach((c: any) => {
        const sumInsured = Number(c.SumInsured) || 0;
        c.PMLSumInsured = ((sumInsured * pmlPerc) / 100).toFixed(2);
      });
    }
  }

  CoverFacCalculate(risk: any, cover: any, changed: string) {
    let facPerc = Number(cover.FACPerc) || 0;
    let sumInsured = Number(cover.SumInsured) || 0;
    let pmlSumInsured = Number(cover.PMLSumInsured) || 0;
    let premium = Number(cover.Premium) || 0;

    if (changed === 'perc') {
      cover.FACSumInsured = ((sumInsured * facPerc) / 100).toFixed(2);
      cover.FACPML = ((pmlSumInsured * facPerc) / 100).toFixed(2);
      cover.FACPermium = ((premium * facPerc) / 100).toFixed(2);
    } else if (changed === 'sumInsured') {

      facPerc = (Number(cover.FACSumInsured) / sumInsured) * 100 || 0;
      cover.FACPerc = facPerc.toFixed(2);
      cover.FACPML = ((pmlSumInsured * facPerc) / 100).toFixed(2);
      cover.FACPermium = ((premium * facPerc) / 100).toFixed(2);
    } else if (changed === 'pml') {
      facPerc = (Number(cover.FACPML) / pmlSumInsured) * 100 || 0;
      cover.FACPerc = facPerc.toFixed(2);
      cover.FACSumInsured = ((sumInsured * facPerc) / 100).toFixed(2);
      cover.FACPermium = ((premium * facPerc) / 100).toFixed(2);
    } else if (changed === 'premium') {
      facPerc = (Number(cover.FACPermium) / premium) * 100 || 0;
      cover.FACPerc = facPerc.toFixed(2);
      cover.FACSumInsured = ((sumInsured * facPerc) / 100).toFixed(2);
      cover.FACPML = ((pmlSumInsured * facPerc) / 100).toFixed(2);
    }
  }

  onApplyAllCover(risk: any) {
    let facPerc = Number(risk.CoverFACPerc) || 0;
    if (!risk.CoverDetails || risk.CoverDetails.length === 0) {
      return;
    }
    risk.CoverDetails.forEach((cover: any) => {
      cover.FACPerc = facPerc;

      let sumInsured = Number(cover.SumInsured) || 0;
      let pmlSumInsured = Number(cover.PMLSumInsured) || 0;
      let premium = Number(cover.Premium) || 0;
      cover.FACSumInsured = ((sumInsured * facPerc) / 100).toFixed(2);
      cover.FACPML = ((pmlSumInsured * facPerc) / 100).toFixed(2);
      cover.FACPermium = ((premium * facPerc) / 100).toFixed(2);
    });
  }
  save(data) {
    if (this.selectedRiBasis && this.facPercentage) {
      let d = this.riBasisOptionsList.filter((d) => d.Code == this.selectedRiBasis)
      console.log(d, "ddd");

      let ReqObj = {
        "QuoteNo": this.quoteNo,
        "PolicyFrom": this.datePipe.transform(this.headerDetails?.PolicyStartDate, "dd/MM/yyyy"),
        "PolicyTo": this.datePipe.transform(this.headerDetails?.PolicyEndDate, "dd/MM/yyyy"),
        "ProductId": this.productId,
        "ProductName": this.productName,
        "EndtFromDate": null,
        "EndtToDate": null,
        "Currency": this.headerDetails?.CurrencyId,
        "RiBasisId": d[0].Code,
        "RiBasisName": d[0].CodeDesc,
        // "FACPerc": data?.CoverDetails?.[0]?.FACPerc || data?.FACPerc || null,
        "FACPerc": this.facPercentage,
        "CreatedBy": this.loginId,
        "RiskList": [
          {
            "RiskId": data?.RiskId,
            "LocationName": data?.LocationName,
            "SectionId": data?.SectionId,
            "SectionName": data?.SectionName,
            "RiskRefNo": data?.RiskRefNo,
            "PMLPerc": data?.PMLPerc,
            "RiskCategory": data?.RiskCategory,
            // "DAFTreartyPerc": data?.DAFTreartyPerc,
            "CoverFACPerc": data?.CoverFACPerc,
            "CoverDetails": data?.CoverDetails?.map((cover: any) => ({
              "CoverId": cover.CoverId,
              "CoverName": cover.CoverName,
              "SumInsured": cover.SumInsured,
              "PMLSumInsured": cover.PMLSumInsured,
              "Premium": cover.Premium,
               "DAFTreartyPerc": cover?.DAFTreartyPerc,
              "FACPerc": cover.FACPerc,
              "FACSumInsured": cover.FACSumInsured,
              "FACPML": cover.FACPML,
              "FACPermium": cover.FACPermium
            }))
          }
        ]
      };
      let urlLink = `${this.CommonApiUrl}reinsurance/updateReInsurance`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.IsError != true) {
            Swal.fire({
              title: 'Success!',
              text: data?.Message,
              icon: 'success',
              confirmButtonText: 'OK'
            })
            this.getReInsurance()
          }

        })
    }
    else {
      Swal.fire({
        title: 'Validation',
        text: 'Invalid Form',
        icon: 'info',
        confirmButtonText: 'OK'
      })
    }

  }

  EditCoInsurance(data: any) {

    this.coInsuranceForm.patchValue({
      company: data.CompanyId,
      role: data.CoInsuranceRole,
      percentage: Number( data.SharePrecentage || 0),
      commissionPercentage:Number( data.CommissionPercentage || 0)
    });
    this.sidebarVisible2 = true;
    this.Sno = data?.SNo
  }
  CoInsurance() {
    if (this.coInsurance == 'Yes') {
      this.tabIndex = 0;
      this.getCompanyList();
    }
    else {
      this.tabIndex = -1;
    }

  }
}
