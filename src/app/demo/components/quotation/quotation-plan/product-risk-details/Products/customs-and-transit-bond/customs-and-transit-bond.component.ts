import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormBuilder, FormControl } from '@angular/forms';
import { CustomTransitPPNamibia } from '../../../models/namibia/GuranteePackagePlus/CustomAndTransit/CustomTransit';
import { CustomTransitNamibia } from '../../../models/namibia/CustomAndTransit/CustomTransit';
import { CustomTransitApiNamibia } from '../../../models/namibia/CustomAndTransit/CustomTransitApi';
@Component({
  selector: 'app-customs-and-transit-bond',
  templateUrl: './customs-and-transit-bond.component.html',
  styleUrls: ['./customs-and-transit-bond.component.css']
})
export class CustomsAndTransitBondComponent implements OnInit {

     @Input() form: any;@Input() engineerData:any;coversreuired: any = null; insuranceId: any = null;
      @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
      @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
      @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];productId:any=null;
      @Output() skipSection = new EventEmitter<any>();userType:any=null;
      @Output() previousSection = new EventEmitter<any>();
      @Input() IsPackage: boolean; branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
      IndustryError: boolean;BidTensionEngineerfields: any[] = [];BidTensionAdditionalfields:any[]=[];  showCustomsaAnd:boolean = false;
      public AppConfig: any = (Mydatas as any).default;
      public ApiUrl1: any = this.AppConfig.ApiUrl1;
      public MarineApiUrl: any = this.AppConfig.MarineApi;
      public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
      PeriodTypeList: any[]=[];CollateralTypeList: any[]=[];
  engineerObj: any;
      constructor(private sharedService: SharedService,private fb: FormBuilder) {
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
          this.form = this.fb.group({});
      }
      ngOnInit(){
         let fireData = null;
          if(this.productId=='97'){
                fireData = new CustomTransitPPNamibia();
          } 
          else{

             fireData = new CustomTransitNamibia();
          } 
          this.addControlsToForm(fireData.BidTensionEngineerfields.fieldGroup);
          this.addControlsToForm(fireData.BidTensionAdditionalfields.fieldGroup);
          this.BidTensionEngineerfields = this.sharedService.groupFields(fireData.BidTensionEngineerfields.fieldGroup);
          this.BidTensionAdditionalfields = this.sharedService.groupFields(fireData.BidTensionAdditionalfields.fieldGroup);
          this.getPeriodTypeList();
          this.getCollateralTypeList();
           if (this.locationList.length != 0) {this.onEditData();}
      }
      onEditData(){
         if (this.renderType == 'Direct') {
            let i = 0;
            for (let obj of this.locationList) {
                if (this.locationDetails[i]) {
                    let BidTensionApi = null,subDetails=this.locationDetails[i].SectionList;
                       BidTensionApi = new CustomTransitApiNamibia();
                    obj = BidTensionApi.getEditDetails(subDetails, obj, this.engineerData);
                    if (obj && this.tabIndex == i) {
                        if (obj['CARPrincipal']) this.form.controls['CARPrincipal'].setValue(obj['CARPrincipal']);
                        if (obj['CARDescription']) this.form.controls['CARDescription'].setValue(obj['CARDescription']);
                        if (obj['PeriodType']) this.form.controls['PeriodType'].setValue(obj['PeriodType']);
                        if (obj['CARPeriodOfActivity']) this.form.controls['CARPeriodOfActivity'].setValue(obj['CARPeriodOfActivity']);
                        if (obj['CARStartDate']) this.form.controls['CARStartDate'].setValue(obj['CARStartDate']);
                        if (obj['ProjectSite']) this.form.controls['ProjectSite'].setValue(obj['ProjectSite']);
                        if (obj['GrossProfitLc']) this.form.controls['GrossProfitLc'].setValue(obj['GrossProfitLc']);
                        if (obj['FirstLossPercentId']) this.form.controls['FirstLossPercentId'].setValue(obj['FirstLossPercentId']);
                        if (obj['BidTensionSumInsured']) this.form.controls['BidTensionSumInsured'].setValue(obj['BidTensionSumInsured']);
                        if (obj['BTCollateralType']) this.form.controls['BTCollateralType'].setValue(obj['BTCollateralType']);
                        if (obj['CollateralName']) this.form.controls['CollateralName'].setValue(obj['CollateralName']);
                    }
                }
                i += 1;
            }
         }
         else {
            let i = 0;
            for (let loc of this.locationList) {
                if (loc && this.tabIndex == i) {
                    this.form.controls['CARPrincipal'].setValue(loc['CARPrincipal']);
                    this.form.controls['CARDescription'].setValue(loc['CARDescription']);
                    this.form.controls['PeriodType'].setValue(loc['PeriodType']);
                    this.form.controls['CARPeriodOfActivity'].setValue(loc['CARPeriodOfActivity']);
                    this.form.controls['CARStartDate'].setValue(loc['CARStartDate']);
                    this.form.controls['ProjectSite'].setValue(loc['ProjectSite']); 
                }
                i += 1;
            }
          }
      }
      private addControlsToForm(fields: any[]) {
        if (fields) {
          fields.forEach((field) => {
            if (field?.key) {
              this.form.addControl(field.key, new FormControl(''));
            }
            if (field?.fieldGroup) {
              this.addControlsToForm(field.fieldGroup);
            }
          });
        }
      }
      getPeriodTypeList() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ItemType": "Project Period"
        }
        let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
              this.PeriodTypeList = defaultObj.concat(data.Result);
            for (let i = 0; i < this.PeriodTypeList.length; i++) {
            this.PeriodTypeList[i].label = this.PeriodTypeList[i]['CodeDesc'];
            this.PeriodTypeList[i].value = this.PeriodTypeList[i]['Code'];
            }
            console.log(this.BidTensionAdditionalfields);
            let fieldlist = this.BidTensionAdditionalfields[2];
            if(fieldlist){
              for (let field of fieldlist) {
                if (field.key == 'BTCollateralType') {
                  field.props.options = this.PeriodTypeList
                }
              }
            }
          })
      }
      getCollateralTypeList() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ItemType": "Collateral Value"
        }
        let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
            this.CollateralTypeList = defaultObj.concat(data.Result);
            for (let i = 0; i < this.CollateralTypeList.length; i++) {
              this.CollateralTypeList[i].label = this.CollateralTypeList[i]['CodeDesc'];
              this.CollateralTypeList[i].value = this.CollateralTypeList[i]['Code'];
            }
            let fieldlist = this.BidTensionAdditionalfields[2];
            console.log("BT F",this.BidTensionAdditionalfields);
            if (fieldlist) {
              for (let field of fieldlist) {
                if (field.key == 'CARStartDate' || field.key == 'CollateralType') {
                  field.props.options = this.CollateralTypeList
                }
              }
            }
          })
      }
      onProceedData(type) {
        let j = 0,locationList = [];
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
                      entry['CARPrincipal'] = this.form.controls['CARPrincipal']?.value;
                      entry['CARDescription'] = this.form.controls['CARDescription']?.value;
                      entry['PeriodType'] = this.form.controls['PeriodType']?.value;
                      entry['CARPeriodOfActivity'] = this.form.controls['CARPeriodOfActivity']?.value;
                      entry['CARStartDate'] = this.form.controls['CARStartDate']?.value;
                      entry['ProjectSite'] = this.form.controls['ProjectSite']?.value;
                      entry['BTCollateralType'] = this.form.controls['PeriodType']?.value;
                      entry['FirstLossPercentId'] = this.form.controls['FirstLossPercentId']?.value;
                      entry['GrossProfitLc'] = this.form.controls['GrossProfitLc']?.value;
                      entry['BidTensionSumInsured'] = this.form.controls['BidTensionSumInsured']?.value;
                      entry['CollateralName'] = this.form.controls['CollateralName']?.value;
                  }
                let bidTenderRisk = null;

                      bidTenderRisk = new CustomTransitApiNamibia();
                if (entry['CARPrincipal'] || entry['CARDescription'] || entry['PeriodType'] || entry['CARPeriodOfActivity'] || entry['CARStartDate'] || entry['ProjectSite']) {
                  let constructionAllRiskList = bidTenderRisk.getSaveDetails(entry, entry.IndustryId, this.industryTypeList, obj)
                  if (constructionAllRiskList) {
                    obj = constructionAllRiskList;
                  }
                }
                else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
                locationList.push(obj);
                j += 1;
                if (j == this.locationList.length) {
                    let res = { "locationList": locationList, "type": type }
                    this.finalProceed.emit(res)
                }
            }
      }
        IndustryChanged() {
        this.locationList[this.tabIndex].IndustryId =
            this.productItem.IndustryId;
    }
  onDigitLimit(event: Event, num): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, num);
  }
     skip() {
        this.skipSection.emit(true);
    }
    previous() {
        this.previousSection.emit(true);
    }

    }
 

