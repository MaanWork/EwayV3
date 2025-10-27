import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@app/layout/service/layout.service';
import { SharedService } from '@app/shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-agriculture-master',
  templateUrl: './agriculture-master.component.html',
  styleUrls: ['./agriculture-master.component.scss']
})
export class AgricultureMasterComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  public MotorApiUrl: any = this.AppConfig.MotorApiUrl;
  ProductId: any;
  UserType: any;
  userDetails: any;
  MenuMasterList: any;
  activeMenu: string;
  insuranceId: string;
  columnHeader: any;
  loginId: any;
  agricultureList: any[] = [];
  companyId: any;
  insuranceList: { Code: string; CodeDesc: string; }[];
  branchList: any[] = [];
  branchValue: any

  constructor(private router: Router, private sharedService: SharedService, private layoutService: LayoutService,

    private datePipe: DatePipe,/*private toastrService:NbToastrService,*/) {

    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.activeMenu = "Agriculture Master";
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log(this.userDetails,"this.userDetailsthis.userDetails");
    
    const user = this.userDetails?.Result;
    this.UserType = this.userDetails?.Result?.UserType;
    this.ProductId = this.userDetails?.Result?.ProductId;
    if (this.userDetails?.Result?.MenuMasterList) this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
    else {
      this.MenuMasterList = this.userDetails?.Result?.menuList.find(ele => ele.title == "Masters")?.children;
    }
    // console.log(this.userDetails?.Result?.MenuMasterList);

    //  console.log("MMListMMListMMList",this.MMList)
    this.loginId = user?.LoginId;
    if (user.AttachedCompanies) {
      if (user.AttachedCompanies.length != 0) this.insuranceId = user.AttachedCompanies[0];
    }
    //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
  }

  ngOnInit() {
    this.columnHeader = [

      'Province', 'District', 'Crop', 'Cost', 'CoreAppCode',
      'Effective Date Start', 'Effective Date End', 'Status', 'Action'
    ];
    this.getCompanyList();
  }
  getAllList() {
    // let ReqObj = {
    //   "InsuranceId": this.companyId,
    //   "BranchCode": this.branchValue,
    // }
    // let urlLink = `${this.CommonApiUrl1}agriculture/getAll/${this.companyId}/${this.branchValue}`;
    let urlLink = `${this.MotorApiUrl}agriculture/getAll/${this.companyId}/104`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.agricultureList = data?.Result;
          // console.log("BankData", this.BankData);

        }
      },
      (err) => { },
    );
  }
  getMenu(rowData) {
    //  // alert(rowData);
    this.layoutService.setMaster(rowData);
  }

  onAddSection() {
    let ReqObj = {
      "BranchCode": this.branchValue,
      "CompanyId": this.companyId
    }

    sessionStorage.setItem('Agriculture', (this.companyId));
    let sno = ''
    sessionStorage.setItem('sno', JSON.stringify(sno));
    this.router.navigate(['/Admin/agricultureMaster/agriculture-form'])
  }
  getBranchList(type) {
    if (type == 'change') {
      this.branchValue = null;
      this.agricultureList = [];
    }

    let ReqObj = {
      "InsuranceId": this.companyId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ Code: "99999", CodeDesc: "ALL" }];
          this.branchList = obj.concat(data?.Result);
          if (!this.branchValue) { this.branchValue = "99999"; this.getAllList() }
          else { this.getAllList() }
        }
      },
      (err) => { },

    );
  }

  getCompanyList() {
    let ReqObj = {
      "BrokerCompanyYn": "",
      "LoginId": this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{ "Code": "99999", "CodeDesc": "ALL" }]
          this.insuranceList = defaultObj.concat(data.Result);
          // this.companyId =
          if(sessionStorage.getItem('Agriculture')){this.companyId=sessionStorage.getItem('Agriculture')} 
          else this.companyId = this.userDetails.Result?.LoginBranchDetails[0]?.InsuranceId;
          if (this.companyId) this.getBranchList('direct');
        }

      },
      (err) => { },
    );
  }

  onEditSection(data) {
    let sno = data.sno
    sessionStorage.setItem('sno', JSON.stringify(sno));
    sessionStorage.setItem('EditData', JSON.stringify(data));
    let value = 'edit'
    this.router.navigate(['/Admin/agricultureMaster/agriculture-form'], { queryParams: { value } })
  }
}
