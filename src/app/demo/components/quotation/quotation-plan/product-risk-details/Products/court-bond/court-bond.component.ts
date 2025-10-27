import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { PersonalLiabilityPhoneix } from '../../../models/phoneix/PhoenixZambia/PersonalLiability/PersonalLiability';

import { FormBuilder,FormControl } from '@angular/forms';
import { CourtBondBondNamibia } from '../../../models/namibia/CourtBond/CourtBond';
import { CourtBondApiNamibia } from '../../../models/namibia/CourtBond/CourtBondApi';
import { CourtBondBondPPNamibia } from '../../../models/namibia/GuranteePackagePlus/CourtBond/CourtBond';
@Component({
  selector: 'app-court-bond',
  templateUrl: './court-bond.component.html',
  styleUrls: ['./court-bond.component.css']
})
export class CourtBondComponent implements OnInit {

   @Input() form: any;@Input() engineerData:any;coversreuired: any = null; insuranceId: any = null;
      @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
      @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
      @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];productId:any=null;
      @Output() skipSection = new EventEmitter<any>();userType:any=null;
      @Output() previousSection = new EventEmitter<any>();
      @Input() IsPackage: boolean; branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
      IndustryError: boolean;CourtBondEngineerfields: any[] = [];CourtBondAdditionalfields:any[]=[];
      public AppConfig: any = (Mydatas as any).default;
      public ApiUrl1: any = this.AppConfig.ApiUrl1;
      public MarineApiUrl: any = this.AppConfig.MarineApi;
      public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
       public motorApiUrl: any = this.AppConfig.MotorApiUrl; 
      PeriodTypeList: any[]=[];CollateralTypeList: any[]=[];
  engineerObj: any;
  occupationList: any;
  requestReferenceNo: string;
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
           let referenceo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceo != undefined && referenceo != 'undefined') {
      this.requestReferenceNo = referenceo;
      
    }
          
       
      }
      ngOnInit(){
            if(this.requestReferenceNo){
      this.getEngineerInfo();
            }
         let fireData = null;
          if(this.productId=='99'){

            fireData = new CourtBondBondPPNamibia();
          } 
          else{
             fireData = new CourtBondBondNamibia();
          } 
          this.addControlsToForm(fireData.CourtBondEngineerfields.fieldGroup);
          this.addControlsToForm(fireData.CourtBondAdditionalfields.fieldGroup);
          this.CourtBondEngineerfields = this.sharedService.groupFields(fireData.CourtBondEngineerfields.fieldGroup);
          this.CourtBondAdditionalfields = this.sharedService.groupFields(fireData.CourtBondAdditionalfields.fieldGroup);
          this.getPeriodTypeList();
          this.getCollateralTypeList();
          this.getOccupationEmployers();
           if (this.locationList.length != 0) {this.onEditData();}
      }
      onEditData(){
         if (this.renderType == 'Direct') {
            let i = 0;
            for (let obj of this.locationList) {
                if (this.locationDetails[i]) {
                    let courtbondApi = null,subDetails=this.locationDetails[i].SectionList;
                        courtbondApi = new CourtBondApiNamibia();
                    obj = courtbondApi.getEditDetails(subDetails, obj, this.engineerData);
                    if (obj && this.tabIndex == i) {
                      if (obj['IndustryType']) this.productItem.IndustryId=obj['IndustryType']; 
                        if (obj['CBPrincipal']) this.form.controls['CBPrincipal'].setValue(obj['CBPrincipal']);
                        if (obj['CBDescription']) this.form.controls['CBDescription'].setValue(obj['CBDescription']);
                        if (obj['CBStartDate']) this.form.controls['CBStartDate'].setValue(obj['CBStartDate']);
                        if (obj['CBCourtBondOccupation']) this.form.controls['CBCourtBondOccupation'].setValue(obj['CBCourtBondOccupation']);
                        if (obj['CBGrossProfitLc']) this.form.controls['CBGrossProfitLc'].setValue(obj['CBGrossProfitLc']);

                    }
                }
                i += 1;
            }
         }
         else {
            let i = 0;
            for (let loc of this.locationList) {
                if (loc && this.tabIndex == i) {
                  if (loc['IndustryType']) this.productItem.IndustryId=loc['IndustryType']; 
                   if (loc['CBPrincipal']) this.form.controls['CBPrincipal'].setValue(loc['CBPrincipal']);
                        if (loc['CBDescription']) this.form.controls['CBDescription'].setValue(loc['CBDescription']);
                        if (loc['CBStartDate']) this.form.controls['CBStartDate'].setValue(loc['CBStartDate']);
                        if (loc['CBCourtBondOccupation']) this.form.controls['CBCourtBondOccupation'].setValue(loc['CBCourtBondOccupation']);
                        if (loc['CBGrossProfitLc']) this.form.controls['CBGrossProfitLc'].setValue(loc['CBGrossProfitLc']);

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
            console.log(this.CourtBondAdditionalfields);
            let fieldlist = this.CourtBondAdditionalfields[2];
            if(fieldlist){
              for (let field of fieldlist) {
                if (field.key == 'BTPeriodType') {
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
            let fieldlist = this.CourtBondAdditionalfields[2];
            console.log("BT F",this.CourtBondAdditionalfields);
            if (fieldlist) {
              for (let field of fieldlist) {
                if (field.key == 'BTCollateralType' || field.key == 'CollateralType') {
                  field.props.options = this.CollateralTypeList
                }
              }
            }
          })
      }

  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }

  CommaFormattedDynamic(event: KeyboardEvent, name: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      const numericValue = inputElement.value.replace(/[^0-9.]/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      inputElement.value = formattedValue;
      if (!name || !this.form.controls[name]) {

        return inputElement.value;
      }
      else this.form.controls[name].setValue(inputElement.value, { emitEvent: false });
    }
  }
      onProceedData(type) {
        console.log(this.form.value);
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
                      entry['CBPrincipal'] = this.form.controls['CBPrincipal']?.value;
                      entry['CBDescription'] = this.form.controls['CBDescription']?.value;
                      entry['CBStartDate'] = this.form.controls['CBStartDate']?.value;
                      entry['CBCourtBondOccupation'] = this.form.controls['CBCourtBondOccupation']?.value;
                      entry['CBGrossProfitLc']=this.form.controls['CBGrossProfitLc']?.value;
                    entry['IndustryType'] = this.productItem.IndustryId;
                    if (entry['IndustryType']) {
                      entry["IndustryTypeDesc"] = this.industryTypeList.find(ele => ele.Code == entry['IndustryType'])?.CodeDesc
                    }
                  }
                let courtbondRisk = null;
 
                courtbondRisk = new CourtBondApiNamibia();
                console.log("ENTRYYYY",entry);
                
                if (entry['CBPrincipal'] || entry['CBDescription'] || entry['CBStartDate'] || entry['CBCourtBondOccupation'] ) {
                             
                  let constructionAllRiskList = courtbondRisk.getSaveDetails(entry, entry.IndustryId, this.industryTypeList, obj)
                  if (constructionAllRiskList) {
                    obj = constructionAllRiskList;
                  }
                }
                else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
                
                
                locationList.push(obj);
                locationList[j]['CBPrincipal']=this.form.controls['CBPrincipal']?.value;
                locationList[j]['CBDescription']=this.form.controls['CBDescription']?.value;
                j += 1;
                if (j == this.locationList.length) {
                  console.log("locationListtt",obj);
                    let res = { "locationList": locationList, "type": type }
                    this.finalProceed.emit(res)
                }
            }
      }
  onDigitLimit(event: Event, num): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, num);
  }

   getOccupationEmployers() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId,
      "TitleType": 'I'
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.occupationList = data.Result;
          let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
          // if(this.insuranceId=='100040' || this.insuranceId=='100042'){
          for (let i = 0; i < this.occupationList.length; i++) {
            this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
            this.occupationList[i].value = this.occupationList[i]['Code'];
            // if (i == this.occupationList.length - 1) {
            //   if (this.productId == '57' || this.productId == '92') {
            //     console.log(this.GroupPersonalForm);
            //     if (this.GroupPersonalForm) {
            //       let fieldList = this.GroupPersonalForm[0].fieldGroup[0].fieldGroup;
            //       if (fieldList) {
            //         for (let field of fieldList) {
            //           if (field.key == 'occupation') {
            //             field.props.options = defaultRow.concat(this.occupationList);
            //             this.checkFieldNames()
            //           }
            //         }
            //       }
            //     }
            //   }
            //   else if (this.productId == '13') {
            //     let fieldList = this.fieldsIPA[0].fieldGroup[0].fieldGroup;
            //     console.log(fieldList);
            //     if (fieldList) {
            //       for (let field of fieldList) {
            //         if (field.key == 'OccupationType') {
            //           field.templateOptions.options = defaultRow.concat(this.occupationList);
            //         }
            //       }
            //     }
            //   }
            //   else {
            //     let fieldList = this.fieldEE[0]?.fieldArray?.fieldGroup[0]?.fieldGroup;
            //     console.log(fieldList);
            //     if (fieldList) {
            //       for (let field of fieldList) {
            //         if (field.key == 'OccupationType') {
            //           field.props.options = defaultRow.concat(this.occupationList);
            //           this.checkFieldNames()
            //         }
            //       }
            //     }
            //     if (this.requestReferenceNo) {
            //       //let fieldList=this.fieldEE[0].fieldGroup[0].fieldGroup[0].fieldGroup;
            //       let fieldArray = this.fieldEE[0]?.fieldGroup;
            //       if (fieldArray) {
            //         for (let fieldList of fieldArray) {
            //           for (let field of fieldList.fieldGroup[0].fieldGroup) {
            //             if (field.key == 'OccupationType') {
            //               field.props.options = defaultRow.concat(this.occupationList);
            //               this.checkFieldNames()
            //             }
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
          }
        }
      },
      (err) => { },
    );
  }

  
  getEngineerInfo(){
    let urlGetLink = `${this.motorApiUrl}api/getEngineerInfo?RequestReferenceno=${this.requestReferenceNo}`;
      const ReqGetObj = { "RequestReferenceNo": this.requestReferenceNo };

  this.sharedService.onPostMethodSync(urlGetLink, ReqGetObj).subscribe(
    (engineerdata: any) => {
       this.engineerData = engineerdata.Result;
      sessionStorage.setItem('EngineerInfo', JSON.stringify(this.engineerData));
        if (this.locationList.length != 0) {
      this.onEditData();
    }
      
    },
    (err) => {
      console.error('Error fetching EngineerInfo', err);
    }
  );
  }

}
