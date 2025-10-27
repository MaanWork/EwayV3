import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
@Component({
  selector: 'app-commercial-package',
  standalone: false,
  templateUrl: './commercial-package.component.html',
  styleUrls: ['./commercial-package.component.scss']
})
export class CommercialPackageComponent {
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
  commercialpackageplusMenus: any;
  currentCommercial: string;
  currentPackagePlus: string;
  packageplusMenus: any[] = [];
  coverMenuVisible: boolean;
  productName: any;
  constructor(private sharedService: SharedService) {
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || null);
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
    if (this.productId == '92') {
      this.commercialpackageplusMenus = ['Fire','BuildingCombined','Accidental Damage','Accounts Recievable','Business All Risk','Goods In Transit','House Holders','House Owners','Machinery Breakdown','Deterioration','Electronic Equipment','Money','Theft','Glass','Office contents','Stated Benefits','Group Personal Accident','Public Liability','Employers Liability','Fidelity'].map(menu => ({ menu, filled: false }));
      this.currentCommercial = 'Fire';
    }
  }
  onSkipSectionByService() {
    this.skip(this.currentCommercial);
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
    if (type == 'CommercialPackagePlus') {
      if (id != undefined) {
        this.currentCommercial = this.commercialpackageplusMenus[id].menu;
      }
      else {
        let index = this.commercialpackageplusMenus.findIndex(item => item.menu === this.currentCommercial);
        this.commercialpackageplusMenus[index].filled = true;
        if (id) this.currentCommercial = this.commercialpackageplusMenus[id].menu;
        else { if (this.currentCommercial != undefined) this.currentCommercial = this.commercialpackageplusMenus[++index]?.menu; }
      }
    }
  }
  skip(res: any) {
    if (res) {
      let index = this.commercialpackageplusMenus.findIndex(item => item.menu === res);
      this.currentCommercial = this.commercialpackageplusMenus[++index]?.menu;
    }
  }
  getCurrentPackagePlusIndex(): number {
    return this.packageplusMenus?.findIndex(menuObj => menuObj.menu === this.currentPackagePlus);
  }
  Previous(res: any) {
    if (res) {
      let index = this.commercialpackageplusMenus.findIndex(item => item.menu === this.currentCommercial);
      this.currentCommercial = this.commercialpackageplusMenus[--index].menu;
    }
  }
  packageSave(res: any) {
    if (res) {
      res.currentCommercial = this.currentCommercial;
      console.log("Submit",res?.locationList)
      this.finalProceed.emit(res);
    }
  }
}
