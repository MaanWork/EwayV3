import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
import { AccidentalDamageTanzaniya } from '../../../models/Tanzaniya/AccidentalDamage/AccidentalDamage';
import { AccidentalDamageApiTanzaniya } from '../../../models/Tanzaniya/AccidentalDamage/AccidentalDamageApi';
@Component({
  selector: 'accidental-damage-tza',
  templateUrl: './accidental-damage.component.html',
  styleUrl: './accidental-damage.component.scss'
})
export class AccidentalDamageTZAComponent {
      userType: any = null;
      productId: any = null;
      form2 = new FormGroup({});fieldAccidentalDamage:any[]=[];claimCostList:any[]=[];
      showExtensions = false;carrierlegalliabilityFields:any[]=[];fieldsCARPrimaryupto:any[]=[];
      @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
      @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
      @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
      @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
      @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;
      @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
      branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
      IndustryError: boolean;fieldsCARupto:any[]=[];
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
          let contentData4: any;
          if (this.insuranceId == "100002" && this.productId != '19') contentData4 = new AccidentalDamageTanzaniya();
          this.fieldAccidentalDamage[0] = contentData4?.fields; this.getClaimPreparationList();
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
              let subDetails = null;
              if(obj.SectionList){
                subDetails=obj.SectionList;
                let accidentalApi = null;
                if (this.insuranceId == '100002') accidentalApi = new AccidentalDamageApiTanzaniya();
                obj = accidentalApi.getEditDetails(subDetails, obj);
              }
              if(this.tabIndex==i && obj?.SectionList){
                this.productItem.AccidentalPhysicalLossDamage = obj['AccidentalPhysicalLossDamage'];
                this.productItem.Accidentaloilandchemical = obj['Accidentaloilandchemical'];
                this.productItem.MaximumLimitperOccurrence = obj['MaximumLimitperOccurrence'];
                this.productItem.AccidentalPhysicalLossDamageDesc = obj['AccidentalPhysicalLossDamageDesc'];
                this.productItem.AccidentaloilandchemicalDesc = obj['AccidentaloilandchemicalDesc'];
                this.productItem.MaximumLimitperOccurrenceDesc = obj['MaximumLimitperOccurrenceDesc'];
                this.productItem.AccidentalAdditionalclaimsPreparationCosts = obj['AccidentalAdditionalclaimsPreparationCosts'];
                this.productItem.IndustryId = obj['IndustryType']
              }
              i+=1;
          }
      }
      getClaimPreparationList() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ItemType": "CLAIM_COST"
        }
        let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
            this.claimCostList = defaultObj.concat(data.Result);
            console.log(this.claimCostList);
            for (let i = 0; i < this.claimCostList.length; i++) {
              this.claimCostList[i].label = this.claimCostList[i]['CodeDesc'];
              this.claimCostList[i].value = this.claimCostList[i]['Code'];
              if (i == this.claimCostList.length - 1) {
                if (this.productId != '85') {
                  let field12 = this.fieldAccidentalDamage[0]?.fieldGroup[0]?.fieldGroup[0]?.fieldGroup[1]?.fieldGroup;
                  if (field12) {
                    for (let i = 0; i < field12.length; i++) {
                      for (let j = 0; j < field12[i].fieldGroup.length; j++) {
                        if (field12[i].fieldGroup[j].key == 'AccidentalAdditionalclaimsPreparationCosts') { field12[i].fieldGroup[j].templateOptions.options = this.claimCostList; }
                      }
                    }
                  }
                }
              }
            }
          })
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
                    obj['AccidentalPhysicalLossDamage']=entry['AccidentalPhysicalLossDamage'] = this.productItem.AccidentalPhysicalLossDamage;
                    obj['Accidentaloilandchemical']=entry['Accidentaloilandchemical'] = this.productItem.Accidentaloilandchemical;
                    obj['MaximumLimitperOccurrence']=entry['MaximumLimitperOccurrence'] = this.productItem.MaximumLimitperOccurrence;
                    obj['AccidentalPhysicalLossDamageDesc']=entry['AccidentalPhysicalLossDamageDesc'] = this.productItem.AccidentalPhysicalLossDamageDesc;
                    obj['AccidentaloilandchemicalDesc']=entry['AccidentaloilandchemicalDesc'] = this.productItem.AccidentaloilandchemicalDesc;
                    obj['MaximumLimitperOccurrenceDesc']=entry['MaximumLimitperOccurrenceDesc'] = this.productItem.MaximumLimitperOccurrenceDesc;
                    obj['AccidentalAdditionalclaimsPreparationCosts']=entry['AccidentalAdditionalclaimsPreparationCosts'] = this.productItem.AccidentalAdditionalclaimsPreparationCosts;
                    obj['IndustryType']=entry['IndustryType'] = this.productItem.IndustryId;
                    let accidentalApi = null;
                     accidentalApi = new AccidentalDamageApiTanzaniya();
                     let accidentalApilist: any = accidentalApi.getSaveDetails(entry, this.claimCostList, this.industryTypeList, obj,this.productItem.IndustryId, this.industryTypeList)
                      if (accidentalApilist) { 
                        let list =[];
                        if(entry.SectionList) list = entry.SectionList.filter(ele=>ele.SectionId!='56');
                          if(accidentalApilist.SectionList) accidentalApilist.SectionList = accidentalApilist.SectionList.concat(list)
                          obj = accidentalApilist
                        }
                      
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
