import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { Bond } from '../../../models/Tanzaniya/Bond/bond';
import { BondApiTanzaniya } from '../../../models/Tanzaniya/Bond/bondApi';
@Component({
  selector: 'bond-tza',
  templateUrl: './bond.component.html',
  styleUrl: './bond.component.scss'
})
export class BondTZAComponent {
    userType: any = null;
      productId: any = null;
      form2 = new FormGroup({});fieldAccidentalDamage:any[]=[];claimCostList:any[]=[];
      showExtensions = false;carrierlegalliabilityFields:any[]=[];fieldsCARPrimaryupto:any[]=[];
      @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
      @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
      @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
      @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
      @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;bondfields:any[]=[];
      @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
      branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
      IndustryError: boolean;yearsList:any[]=[];BondTypeList:any[]=[];
        public AppConfig: any = (Mydatas as any).default;
      public ApiUrl1: any = this.AppConfig.ApiUrl1;
      public MarineApiUrl: any = this.AppConfig.MarineApi;
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
          let contentData4 = new Bond();
                  this.bondfields = contentData4.fields;
                  this.getNOYears(); this.getBondType();
      }
      ngOnInit() {
        if (this.locationList.length !== 0) {
          this.onEditData();
        }
      }
      onEditData() {
        let i = 0;
        for (let obj of this.locationList) {
            let subDetails = null;
            if(obj.SectionList){
              subDetails=obj.SectionList;
              let Api = null;
              if (this.insuranceId == '100002') Api = new BondApiTanzaniya();
              let result = Api.getEditDetails(subDetails, obj);
              if (result) obj = result;
            }
            if(this.tabIndex==i && subDetails){
              this.productItem.TypeOfBond = obj['TypeOfBond'];
              this.productItem.NoOfYears = obj['NoOfYears'];
              this.productItem.CoveringDetails = obj['CoveringDetails'];
              this.productItem.DescriptionOfRisk = obj['DescriptionOfRisk'];
              this.productItem.BondSI = obj['BondSI'];
              this.productItem.IndustryId = obj['IndustryType'];
            }
            i += 1;
          }
      }
      getNOYears() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ItemType": "BOND_YEAR"
        }
        let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              let defaultObj = [{ 'label': '-Select-', 'value': null }]
              this.yearsList = data.Result;
              console.log("this.yearsList", this.yearsList);
              for (let i = 0; i < this.yearsList.length; i++) {
                this.yearsList[i].label = this.yearsList[i]['CodeDesc'];
                this.yearsList[i].value = this.yearsList[i]['Code'];
                if (this.yearsList.length != 0) {
                  let fields = this.bondfields[0].fieldGroup[0].fieldGroup;
                  for (let field of fields) { if (field.key == 'NoOfYears') { field.props.options = this.yearsList; } }
                }
              }
            }
          },
          (err) => { },
        );
      }
      getBondType() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId,
          "BranchCode": this.branchCode
        }
        let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              let defaultObj = [{ 'label': '-Select-', 'value': null }]
              this.BondTypeList = data.Result;
              for (let i = 0; i < this.BondTypeList.length; i++) {
                this.BondTypeList[i].label = this.BondTypeList[i]['CodeDesc'];
                this.BondTypeList[i].value = this.BondTypeList[i]['Code'];
                if (this.BondTypeList.length != 0) {
                  let fields = this.bondfields[0].fieldGroup[0].fieldGroup;
                  for (let field of fields) { if (field.key == 'TypeOfBond') { field.props.options = this.BondTypeList; } }
                }
              }
            }
          },
          (err) => { },
        );
      }
      onProceedData(type){
            console.log("Locations", this.locationList)
          let i = 0;
          if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
          else { this.IndustryError = false; }
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
                  obj['TypeOfBond'] = entry['TypeOfBond'] = this.productItem.TypeOfBond;
                  obj['NoOfYears'] = entry['NoOfYears'] = this.productItem.NoOfYears;
                  obj['CoveringDetails'] = entry['CoveringDetails'] = this.productItem.CoveringDetails;
                  obj['DescriptionOfRisk'] = entry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;
                  obj['BondSI'] = entry['BondSI'] = String(this.productItem.BondSI).replaceAll(',', '');
                  obj['IndustryType'] = entry['IndustryType'] = this.productItem.IndustryId;
                  let Api = null;
                  Api = new BondApiTanzaniya();
                  let list: any = Api.getSaveDetails(entry, this.BondTypeList, this.industryTypeList, obj)
                  if (list) { obj = list; }
              }
              else if(entry?.SectionList){obj['SectionList']=entry?.SectionList;}
                locationList.push(JSON.parse(JSON.stringify(obj)));
                  j += 1;
                  if (j == this.locationList.length) {console.log("Final Obj", JSON.parse(JSON.stringify(obj)), locationList);this.finalRedirect(locationList,type)}
            }
          }
      }
      finalRedirect(locationList,type){
        console.log("Received Obj",locationList)
          let res = {
            "locationList": locationList,
            "type": type
          }
          console.log("Final Object", res)
          this.finalProceed.emit(res)
      }
      //Industry Change
      IndustryChanged() {
        this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
      }
      previous() {
      let res = {
          "locationList": this.locationList,
          "type": 'Previous'
        }
      this.previousSection.emit(res);
      }
}
