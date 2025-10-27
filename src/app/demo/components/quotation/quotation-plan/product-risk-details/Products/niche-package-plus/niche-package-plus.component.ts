import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
@Component({
  selector: 'app-niche-package-plus',
  standalone: false,
  templateUrl: './niche-package-plus.component.html',
  styleUrls: ['./niche-package-plus.component.scss']
})
export class NichePackagePlusComponent {
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  fieldGlass: any[] = [];
  IndustryError: boolean=false;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  glassClaimCost: any[] = [];
  productId: any;
  userType: any;
  nichepackageplusMenus: any;
  currentNichePackage: string;
  currentNichePackagePlus: string;
  packageplusMenus: any[] = [];
  coverMenuVisible: boolean;
  productName: any;
  constructor(private sharedService: SharedService) {
    this.coversreuired = sessionStorage.getItem('coversRequired');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productName = this.userDetails.Result.ProductName;
    this.sharedService.skipSectionMethod$.subscribe(() => {
      this.skip(this.sharedService.packageType);
    });
    if (this.productId == '102') {
      this.nichepackageplusMenus = ['Directors & Officers','Pension Fund Trustee','Kidnap & Ransom','Cash In Transit','Professional Indeminity'].map(menu => ({ menu, filled: false }));
      this.currentNichePackage = 'Directors & Officers';
    }
  }
  onSkipSectionByService() {
    this.skip(this.currentNichePackage);
  }
  ngOnInit() {
    if (this.locationList.length != 0) {this.onEditData();}
  }
  onEditData() { }
  //Industry Change
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  onProceedData(type) {
    let res={"locationList":this.locationList,"type":type}
    this.finalProceed.emit(res);
  }
  listProceed(type: any, id, event?) {
    this.coverMenuVisible = false;
    if (type == 'NichePackagePlus') {
      if (id != undefined) {
        this.currentNichePackage = this.nichepackageplusMenus[id].menu;
      }
      else {
        let index = this.nichepackageplusMenus.findIndex(item => item.menu === this.currentNichePackage);
        this.nichepackageplusMenus[index].filled = true;
        if (id) this.currentNichePackage = this.nichepackageplusMenus[id].menu;
        else { 
          if (this.currentNichePackage != 'Professional Indeminity') this.currentNichePackage = this.nichepackageplusMenus[++index]?.menu; }
      }
    }
  }
  skip(res: any) {
    if (res) {
      let index = this.nichepackageplusMenus.findIndex(item => item.menu === res);
      this.currentNichePackage = this.nichepackageplusMenus[++index]?.menu;
    }
  }
  getCurrentPackagePlusIndex(): number {
    return this.packageplusMenus?.findIndex(menuObj => menuObj.menu === this.currentNichePackagePlus);
  }
  Previous(res: any) {
    if (res) {
      let index = this.nichepackageplusMenus.findIndex(item => item.menu === this.currentNichePackage);
      this.currentNichePackage =null;
      setTimeout(()=>{
          this.currentNichePackage = this.nichepackageplusMenus[--index].menu;
      },100)
    }
  }
  packageSave(res: any) {
    if (res) {
      res.currentNichePackage = this.currentNichePackage;
      this.locationList = res?.locationList;
      this.finalProceed.emit(res);
    }
  }
}
