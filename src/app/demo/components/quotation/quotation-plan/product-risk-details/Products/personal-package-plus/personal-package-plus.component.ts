import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
@Component({
  selector: 'app-personal-package-plus',
  standalone: false,
  templateUrl: './personal-package-plus.component.html',
  styleUrls: ['./personal-package-plus.component.scss']
})
export class PersonalPackagePlusComponent {
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
  personalpackageplusMenus: any;
  currentPersonalPackage: string;
  currentPackagePlus: string;
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
    if (this.productId == '93') { 
      //'Umbrella Liability'
      this.personalpackageplusMenus = ['Electronic Equipment','House Holders','Houseowners','Personal All Risk'].map(menu => ({ menu, filled: false }));
      this.currentPersonalPackage = 'Electronic Equipment';
    }
  }
  onSkipSectionByService() {
    this.skip(this.currentPersonalPackage);
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
    if (type == 'PersonalPackagePlus') {
      if (id != undefined) {
        this.currentPersonalPackage = this.personalpackageplusMenus[id].menu;
      }
      else {
        let index = this.personalpackageplusMenus.findIndex(item => item.menu === this.currentPersonalPackage);
        this.personalpackageplusMenus[index].filled = true;
        if (id) this.currentPersonalPackage = this.personalpackageplusMenus[id].menu;
        else {
          if (this.currentPersonalPackage != 'Personal All Risk') this.currentPersonalPackage = this.personalpackageplusMenus[++index]?.menu;
        }
      }
    }
  }
  skip(res: any) {
    if (res) {
      let index = this.personalpackageplusMenus.findIndex(item => item.menu === res);
      this.currentPersonalPackage = this.personalpackageplusMenus[++index]?.menu;
    }
  }
  getCurrentPackagePlusIndex(): number {
    return this.packageplusMenus?.findIndex(menuObj => menuObj.menu === this.currentPackagePlus);
  }
  Previous(res: any) {
    if (res) {
      let index = this.personalpackageplusMenus.findIndex(item => item.menu === this.currentPersonalPackage);
      this.currentPersonalPackage = this.personalpackageplusMenus[--index].menu;
    }
  }
  packageSave(res: any) {
    if (res) {
      res.currentPersonalPackage = this.currentPersonalPackage;
      console.log("Submit",res?.locationList)
      this.finalProceed.emit(res);
    }
  }
}
