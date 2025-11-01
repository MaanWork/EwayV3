import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services';
import { GoodsInTransitTanzaniya } from '../../../models/Tanzaniya/GoodsInTransit/GoodsInTransit';
import { GoodsInTransitApiTanzaniya } from '../../../models/Tanzaniya/GoodsInTransit/GoodsInTransitApi';
@Component({
  selector: 'goods-in-transit-tanz',
  standalone: false,
  templateUrl: './goods-in-transit.component.html',
  styleUrls: ['./goods-in-transit.component.scss']
})
export class GoodsInTransitTZAComponent {
  userType: any = null;
  productId: any = null;
  form2 = new FormGroup({});
  showExtensions = false;
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
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;GoodsContentList:any[]=[];
  goodsClaimCost: any[] = [];goodsTransit: any[] = [];GoodsInTransitList: any[] = [];sectionDropdownList: any[]=[];GoodsOccupationList:any[]=[];
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
    let contentData = null;
      let fireData = null;
      fireData = new GoodsInTransitTanzaniya();this.GoodsinTransitTZA = true;
      if(fireData){
        this.fieldGoodsTransit[0] = fireData.fields;
        this.getSectionList();
        this.getGoodsContentList(); this.getOrgCountryList();
      }
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
          let subDetails = obj?.SectionList;
          let GoodsTransitList = subDetails;
          console.log("Filtered Sections",GoodsTransitList)
          if (GoodsTransitList.length != 0) {
           obj['GoodsInTransitSumInsured'] = GoodsTransitList[0].SumInsured; 
            obj['GoodsOccupationType'] = GoodsTransitList[0].BuildingUsageId; 
            obj['GoodsBuildingUsage'] = GoodsTransitList[0].SectionId; 
            // obj['RegionCode'] = TransitCoverage[0].RegionCode; 
            // obj['DistrictCode'] = TransitCoverage[0].DistrictCode; 
            obj['RegionCode'] = GoodsTransitList[0].WallType; 
            obj['DistrictCode'] = GoodsTransitList[0].RoofType; 
            obj['DescriptionOfRisk'] = GoodsTransitList[0].DescriptionOfRisk; 
             obj['RegionCode'] = GoodsTransitList[0].GeographicalCoverage;
             obj['DistrictCode'] = GoodsTransitList[0].ModeOfTransport;
          }
          if (subDetails && this.tabIndex == i) {
            if (obj.GoodsInTransitSumInsured) this.productItem['GoodsInTransitSumInsured'] = obj.GoodsInTransitSumInsured
            if (obj.GoodsOccupationType) this.productItem['GoodsOccupationType'] = obj.GoodsOccupationType;
            if (obj.GoodsBuildingUsage) this.productItem['GoodsBuildingUsage'] = obj.GoodsBuildingUsage;
            if (obj.RegionCode) this.productItem['RegionCode'] = obj.RegionCode
            if (obj.DistrictCode) this.productItem['DistrictCode'] = obj.DistrictCode
            if (obj.DescriptionOfRisk) this.productItem['DescriptionOfRisk'] = obj.DescriptionOfRisk
          }
          i += 1;
      }
    console.log("loggg", this.productItem);
    console.log("Final Location", this.locationList)
  }
  getSectionList() {
      if (this.productId != '66' && this.productId != '67') {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId
        }
        let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data.Result) {
              let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }];
              this.sectionDropdownList = defaultObj.concat(data.Result);
              this.getSectionCoverList()
              this.setGoodsTransitValue();
            }
          });
      }
  }
  getSectionCoverList(){
    if(this.sectionDropdownList.length!=0){
      for(let n of this.sectionDropdownList){
        if(n.Code!=''){
             let ReqObj = {
                "Limit": "",
                "Offset": "100",
                "InsuranceId": this.insuranceId,
                "ProductId": this.productId,
                "SectionId": n.Code
              }
            let urlLink = `${this.ApiUrl1}master/getallsectioncoverdetails`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                n['CoverList'] = data.Result;
              });
        }
        else n['CoverList']=[]
      }
    }
  }
  setGoodsTransitValue() {
    if (this.sectionDropdownList.length != 0) {
      let fieldList = this.fieldGoodsTransit[0].fieldGroup[0].fieldGroup;
      let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
      let List: any[] = defaultObj.concat(this.sectionDropdownList);
      this.GoodsOccupationList = defaultObj.concat(this.sectionDropdownList);
      for (let i = 0; i < List.length; i++) {
        List[i].label = List[i]['CodeDesc'];
        List[i].value = List[i]['Code'];
        if (i == List.length - 1) {
          for (let field of fieldList) {
            if (field.key == 'GoodsBuildingUsage') {
              if (field.props) field.props.options = List
            }
          }
        }
      }
    }
  }
  getGoodsContentList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "COMMODITY"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.GoodsContentList = defaultObj.concat(data.Result);
        let List: any[] = defaultObj.concat(data.Result);
        for (let i = 0; i < List.length; i++) {
          List[i].label = List[i]['CodeDesc'];
          List[i].value = List[i]['Code'];
          if (i == List.length - 1) {
            let fieldList = [];
            if (this.insuranceId == '100002') fieldList = this.fieldGoodsTransit[0].fieldGroup[0].fieldGroup;
            for (let field of fieldList) {
              if (field.key == 'GoodsOccupationType') {
                if (field.props) field.props.options = List
              }
            }
          }
        }
      })
  }
  getOrgCountryList() {
    const urlLink = `${this.CommonApiUrl}master/dropdown/originationcountry`;
    const reqData = {
      'BranchCode': "01",
      'ProductId': this.productId,
      'OriginationCountryCode': this.userDetails?.Result?.CountryId,
      'OpenCoverNo': null
    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          let defaultObj = [{ 'Nationality': '-Select-', 'CountryId': null }]
          this.orgCountryList = defaultObj.concat(data.Result);
          let i = 0;
        }
      });
  }
  //Industry Change
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryType = this.productItem.IndustryType;
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
            if (this.productItem.GoodsInTransitSumInsured) entry['GoodsInTransitSumInsured'] = this.productItem['GoodsInTransitSumInsured'];
            if (this.productItem.GoodsOccupationType) entry['GoodsOccupationType'] = this.productItem['GoodsOccupationType'];
            if (this.productItem.GoodsBuildingUsage) entry['GoodsBuildingUsage'] = this.productItem['GoodsBuildingUsage'];
            if (this.productItem.RegionCode) entry['RegionCode'] = this.productItem['RegionCode'];
            if (this.productItem.DistrictCode) entry['DistrictCode'] = this.productItem['DistrictCode'];
            if (this.productItem.DescriptionOfRisk) entry['DescriptionOfRisk'] = this.productItem['DescriptionOfRisk'];
            let goodsApi = null,goodsList=null;
            console.log("Entry",entry,this.sectionDropdownList)
            if (this.insuranceId == '100002') goodsApi = new GoodsInTransitApiTanzaniya()
            goodsList = goodsApi.getSaveDetails(entry, this.sectionDropdownList, this.industryTypeList, obj)
            if (goodsList) { obj = goodsList }
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
