import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
import { CarrierLegalLiability } from '../../../models/Tanzaniya/CarrierlegalLiability/carrierlegalliability';
import { CarrierLegalLiabilityApi } from '../../../models/Tanzaniya/CarrierlegalLiability/carrierlegalliabilityApi';
@Component({
  selector: 'carrier-legal-liability',
  templateUrl: './carrier-legal-liability.component.html',
  styleUrl: './carrier-legal-liability.component.scss'
})
export class CarrierLegalLiabilityComponent {
  userType: any = null;
  productId: any = null;
  form2 = new FormGroup({});
  showExtensions = false;carrierlegalliabilityFields:any[]=[];
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  IndustryError: boolean;GoodsinTransitTZA:boolean=false;fieldGoodsTransit:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;orgCountryList:any[]=[];
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  constructor(private sharedService: SharedService){
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
     let contentData4 = new CarrierLegalLiability();
    this.carrierlegalliabilityFields = contentData4.fields;
  }
  ngOnInit() {
    if (this.locationList.length != 0) {
      this.onEditData();
    }
  }
  onEditData() {
    console.log("Locations On Edit", this.locationList);
      let i = 0;
      for (let obj of this.locationList) {
          let subDetails = null,Api =new CarrierLegalLiabilityApi();
          if(obj.SectionList){
            subDetails = obj.SectionList;
            let result = Api.getEditDetails(subDetails, obj);
            if (result) obj = result;
          }
          if(subDetails && this.tabIndex==i){
             if(obj['CommodityDesc'])this.productItem.CommodityDesc = obj['CommodityDesc'];
              if(obj['TerritorialLimits']) this.productItem.TerritorialLimits = obj['TerritorialLimits'];
              if(obj['LiablitySumInsured']) this.productItem.LiablitySumInsured = obj['LiablitySumInsured'];
              if(obj['IndeminitySumInsured']) this.productItem.IndeminitySumInsured = obj['IndeminitySumInsured'];
          }
          i+=1;
      }
  }
  onProceedData(type) {
      console.log("Locations", this.locationList)
      let i = 0;
      // if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
      // else { this.IndustryError = false; }
      let locationList = [];
      if (i == 0) {
        let j = 0;
        for (let entry of this.locationList) {
          let i = 0;
          if (entry.BuildingOwnerYn == null) entry.BuildingOwnerYn = 'Y';
          if (entry.CoversRequired == null) entry.CoversRequired = 'BC';
          let obj = {
            "LocationId": j + 1,
            "LocationName": entry.LocationName,
            "CoversRequired": entry.CoversRequired,
            "BuildingOwnerYn": entry.BuildingOwnerYn,
            "Address": entry.BuildingAddress,
            "SectionList": []
          }
          if (j == this.tabIndex) {
              if(this.productItem.CommodityDesc) entry['CommodityDesc'] = this.productItem.CommodityDesc;
              if(this.productItem.TerritorialLimits) entry['TerritorialLimits'] = this.productItem.TerritorialLimits;
              if(this.productItem.LiablitySumInsured) entry['LiablitySumInsured'] = String(this.productItem.LiablitySumInsured).replaceAll(',', '');
              if(this.productItem.IndeminitySumInsured) entry['IndeminitySumInsured'] = String(this.productItem.IndeminitySumInsured).replaceAll(',', '');
              let Api = new CarrierLegalLiabilityApi();
              let list: any = Api.getSaveDetails(entry, obj)
              if (list) { obj = list; }
          }
          else if(entry?.SectionList){obj['SectionList']=entry?.SectionList}
          locationList.push(obj);
          j += 1;
          if (j == this.locationList.length) {
            let res = {
              "locationList": locationList,
              "type": type
            }
            console.log("Final Object", res)
           if (type == 'packageData') {
              this.saveSection.emit(res);
            }
            else {
              this.finalProceed.emit(res)
            }
          }
        }
      }
    }
    //this.finalProceed.emit(obj);
    skip() {
      this.skipSection.emit(true);
    }
    previous() {
      let res = {
          "locationList": this.locationList,
          "type": 'Previous'
        }
      this.previousSection.emit(res);
    }
    onExtensionToggle() {
      if (!this.showExtensions) {
        this.form2.reset();
      }
    }
}
