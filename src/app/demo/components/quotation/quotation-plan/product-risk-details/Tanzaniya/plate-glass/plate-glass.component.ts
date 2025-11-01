import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
@Component({
  selector: 'plate-glass-tza',
  templateUrl: './plate-glass.component.html',
  styleUrl: './plate-glass.component.scss'
})
export class PlateGlassTZAComponent {
      userType: any = null;
      productId: any = null;
      
      @Input() form: any; coversreuired: any = null; insuranceId: any = null;buildingContactorTypes: any[]=[];
      @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
      @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
      @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
      @Output() skipSection = new EventEmitter<any>();@Input() engineerData: any;
      @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
      branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
      IndustryError: boolean;plateGlassForm: FormGroup;
        public AppConfig: any = (Mydatas as any).default;
      public ApiUrl1: any = this.AppConfig.ApiUrl1;
      public MarineApiUrl: any = this.AppConfig.MarineApi;
      public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
      constructor(private sharedService: SharedService,private fb:FormBuilder){
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
          this.plateGlassForm = this.fb.group({ plateglass: this.fb.array([]) });
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
              }
              else if(entry?.SectionList){obj['SectionList']=entry?.SectionList;}
                locationList.push(JSON.parse(JSON.stringify(obj)));
                  j += 1;
                  if (j == this.locationList.length) {console.log("Final Obj", JSON.parse(JSON.stringify(obj)), locationList);this.finalRedirect(locationList,type)}
            }
          }
      }
      get PlateGlassArray(): FormArray {
        return this.plateGlassForm.get('plateglass') as FormArray;
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
