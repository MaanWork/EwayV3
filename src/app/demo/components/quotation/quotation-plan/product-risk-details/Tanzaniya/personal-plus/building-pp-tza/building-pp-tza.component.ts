import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
@Component({
  selector: 'building-pp-tza',
  templateUrl: './building-pp-tza.component.html',
  styleUrl: './building-pp-tza.component.scss'
})
export class BuildingPPTZAComponent {
  productId: any = null;
  form2 = new FormGroup({});
  showExtensions = false;userType:any=null;
  @Input() form: any; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any;@Input() CoversRequired: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();IndustryError: boolean;BuildingList:any[]=[];
  @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  public AppConfig: any = (Mydatas as any).default;columnHeaderBuilding:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;wallMaterialList:any[]=[];roofMaterialList:any[]=[];
  public MarineApiUrl: any = this.AppConfig.MarineApi;orgCountryList:any[]=[];bankList:any[]=[];
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
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
      this.columnHeaderBuilding = ['Construction (Wall)', 'Construction (Roof)', 'Construction (No of years)', 'First Loss Payee', 'Sum Insured', 'Description']
      this.getWallMaterialList();this.getRoofMaterialList();this.getFirstLossPayeeList();this.addBuildingList();
  }
  ngOnInit(){
    if (this.locationList.length != 0) {
      this.onEditData();
    }
  }
  onEditData() {
    console.log("Locations On Edit", this.locationList);
      let i = 0;
      for (let obj of this.locationList) {
        if(obj?.BuildingList && this.tabIndex==i){
            this.BuildingList = obj.BuildingList;
        }
      }
  }
  addBuildingList() {
    let subEntry = { "WallType": null, "RoofType": null, "FirstLossPayee": null, "BuildingYear": null, "BuildingSumInsured": null, "BuildingDescription": null }
    this.BuildingList.push(subEntry);
  }
  onDeleteBuilding(index) {this.BuildingList.splice(index, 1);}
  getWallMaterialList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/walltypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
          this.wallMaterialList = defaultObj.concat(data.Result);
        }
      },
      (err) => { },
    );
  }
  getRoofMaterialList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/rooftypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          if (res.length != 0) {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
            this.roofMaterialList = defaultObj.concat(data.Result);
          }
        }
      },
      (err) => { },
    );
  }
  getFirstLossPayeeList() {
    let branchCode = '';
    if ((this.userType != 'Broker' && this.userType != 'User')) {
      branchCode = this.branchCode
    }
    else {
      branchCode = this.brokerbranchCode
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let obj = [{ "Code": "None", CodeDesc: "None" }]
        this.bankList = obj.concat(data.Result);
      })
  }
  listProceed(type) {
    if(this.BuildingList.length!=0){
      let i=0,j=0;
      for(let build of this.BuildingList){
          if (build.WallType == null || build.WallType == '') { build['WallTypeError'] = true; i += 1 } else { build['WallTypeError'] = false; }
          if (build.RoofType == null || build.RoofType == '') { build['RoofTypeError'] = true; i += 1 } else { build['RoofTypeError'] = false; }
          if (build.BuildingYear == null || build.BuildingYear == '') { build['BuildingYearError'] = true; i += 1 } else { build['BuildingYearError'] = false; }
          if (build.FirstLossPayee == null || build.FirstLossPayee == '') { build['FirstLossPayeeError'] = true; i += 1 } else { build['FirstLossPayeeError'] = false; }
          if (build.BuildingSumInsured == null || build.BuildingSumInsured == '' || build.BuildingSumInsured == 0) { build['SumInsuredError'] = true; i += 1 } else { build['SumInsuredError'] = false; }
          j+=1;
          if(i==0 && this.BuildingList.length==j){
            this.locationList[this.tabIndex]['BuildingList']=this.BuildingList;
            let res = {
                "locationList": this.locationList,
                "type": type
              }
              this.finalProceed.emit(res)
          }
      }
    }
  }
}
