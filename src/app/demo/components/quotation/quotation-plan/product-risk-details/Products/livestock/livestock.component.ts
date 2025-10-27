import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { LiveStockNamibia } from '../../../models/namibia/LiveStock/LiveStock';
import { LiveStockApiNamibia } from '../../../models/namibia/LiveStock/LiveStockApi';
@Component({
    selector: 'app-livestock',
      standalone: false,
    templateUrl: './livestock.component.html',
    styleUrls: ['./livestock.component.css'],
})
export class LivestockComponent implements OnInit {
    userType: any = null;
    productId: any = null;
   
   @Input() form: any;coversreuired: any = null;insuranceId: any = null;
    @Input() productItem: any; userDetails: any = null;loginId: any = null;
    @Input() renderType: any = null;
    @Input() locationList: any[] = [];
    @Input() tabIndex: any = null;@Input() industryTypeList: any[] = [];
    @Output() finalProceed = new EventEmitter<any>();
    @Input() locationDetails: any[] = [];
    @Output() skipSection = new EventEmitter<any>();
    @Output() previousSection = new EventEmitter<any>();
    branchCode: any = null;
    agencyCode: any = null;
    countryId: any = null;
    brokerbranchCode: any = null;
    fieldsLiveStock: any[] = [];
    IndustryError: boolean;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    liveStockClaimCost: any[] = [];
    constructor(private sharedService: SharedService) {
        let homeObj = JSON.parse(
            sessionStorage.getItem('homeCommonDetails') || null,
        );
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

         
        // let livestockData = new LiveStockNamibia();
        // this.fieldsLiveStock = livestockData?.fields?.fieldGroup || [];
       
    let livestockData = new LiveStockNamibia();
             this.fieldsLiveStock[0] = livestockData?.fields?.fieldGroup ;

             
       } 
  

    ngOnInit() {
        let livestockData = new LiveStockNamibia();
    let allFields = livestockData?.fields?.fieldGroup || [];
    
    // Chunk fields into rows of 2 (since each row has 2 fields = 4 columns)
    this.fieldsLiveStock = [];
    for (let i = 0; i < allFields.length; i += 2) {
        this.fieldsLiveStock.push([
            allFields[i],
            allFields[i + 1] || null  // Handle odd number of fields
        ]);
    }
        if (this.locationList.length != 0) {
            this.onEditData();
        }
    }

    onEditData() {
        console.log('Locations On Edit', this.locationList);
        if (this.renderType == 'Direct') {
            let i = 0;
            for (let obj of this.locationList) {
                if (this.locationDetails[i]) {
                    let liveStockApi = null,
                        subDetails = this.locationDetails[i].SectionList;
                    liveStockApi = new LiveStockApiNamibia();
                    obj = liveStockApi.getEditDetails(subDetails, obj);
                    if (obj && this.tabIndex == i) {
                        this.productItem.LiveStock = obj['LiveStock'];
                        this.productItem.RegionCode = obj['RegionCode'];
                        this.productItem.DistrictCode = obj['DistrictCode'];
                        this.productItem.StockType = obj['StockType'];
                        this.productItem.NooFLiveStock = obj['NooFLiveStock'];
                        this.productItem.StockPrice = obj['StockPrice'];
                        this.productItem.LiveStockSumInsured = obj['LiveStockSumInsured'];
    
                    }
                    i += 1;
                }
            }
            if (this.locationDetails.length != 0) {
            }
        } else {
            let i = 0;
            for (let loc of this.locationList) {
                if (loc && this.tabIndex == i) {
                    console.log('On Next Loc', loc);
                    if (
                        loc['LiveStock'] &&
                        loc['RegionCode'] &&
                        loc['DistrictCode'] &&
                        loc['StockType'] &&
                        loc['NooFLiveStock'] &&
                        loc['StockPrice'] &&
                        loc['LiveStockSumInsured']  
                        
                    ) {
                        this.productItem.LiveStock = loc['LiveStock'];
                        this.productItem.RegionCode = loc['RegionCode'];
                        this.productItem.DistrictCode = loc['DistrictCode'];
                        this.productItem.StockType = loc['StockType'];
                        this.productItem.NooFLiveStock = loc['NooFLiveStock'];
                        this.productItem.StockPrice = loc['StockPrice'];
                        this.productItem.LiveStockSumInsured =loc['LiveStockSumInsured'];

                         this.productItem.IndustryId = loc['IndustryType']
                    } else if (loc.SectionList) {
                        if (loc.SectionList.length != 0) {
                            let liveStockApi = null,
                                subDetails =
                                    this.locationDetails[i].SectionList;
                            liveStockApi = new LiveStockApiNamibia();
                            loc = liveStockApi.getEditDetails(subDetails,loc);
                            if (
                                loc['LiveStock'] &&
                                loc['RegionCode'] &&
                                loc['DistrictCode'] &&
                                loc['StockType'] &&
                                loc['NooFLiveStock'] &&
                                loc['StockPrice'] &&
                                loc['LiveStockSumInsured'] &&
                                loc['IndustryType']
                            ) {
                                this.productItem.LiveStock =
                                    loc['LiveStock'];
                                this.productItem.RegionCode =
                                    loc['RegionCode'];
                                this.productItem.DistrictCode =
                                    loc['DistrictCode'];
                                this.productItem.StockType = loc['StockType'];
                                this.productItem.NooFLiveStock = loc['NooFLiveStock'];
                                this.productItem.StockPrice = loc['StockPrice'];
                                this.productItem.LiveStockSumInsured =
                                    loc['LiveStockSumInsured'];
                                this.productItem.IndustryId =
                                    loc['IndustryType'];
                            }
                        }
                    }
                }
                i += 1;
            }
        }
        console.log('Final Location', this.locationList);
    }




    onProceedData(type) {
        console.log('Locations', this.locationList);
        let i = 0;
        if (
            this.productItem?.IndustryId == '' ||
            this.productItem?.IndustryId == null ||
            this.productItem?.IndustryId == undefined ||
            this.productItem?.IndustryId == '0'
        ) {
            i += 1;
            this.IndustryError = true;
        } else {
            this.IndustryError = false;
        }
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
                    "SectionList": [],
                };
                if (j == this.tabIndex) {
                    entry['LiveStock'] = this.productItem.LiveStock;
                    entry['RegionCode'] = this.productItem.RegionCode;
                    entry['DistrictCode'] = this.productItem.DistrictCode;
                    entry['StockType'] = this.productItem.StockType;
                    entry['NooFLiveStock'] = this.productItem.NooFLiveStock;
                    entry['StockPrice'] = this.productItem.StockPrice;
                    entry['LiveStockSumInsured'] =
                        this.productItem.LiveStockSumInsured;
                    entry['IndustryType'] = this.productItem.IndustryId;
                }
                let liveStockApi = null;
                liveStockApi = new LiveStockApiNamibia();

                if (
                    entry['LiveStock'] != undefined &&
                    entry['RegionCode'] != undefined &&
                    entry['DistrictCode'] != undefined &&
                    entry['StockType'] != undefined &&
                    entry['NooFLiveStock'] != undefined &&
                    entry['LiveStockSumInsured'] != undefined

                ) {
                    let liveStockApilist: any = liveStockApi.getSaveDetails(
                        entry,
                        this.liveStockClaimCost,
                        this.productItem.IndustryId,
                        this.industryTypeList,
                        obj,
                    );
                    if (liveStockApilist) {
                        obj = liveStockApilist;
                    }
                } else if (entry.SectionList) {
                    obj.SectionList = entry['SectionList'];
                }
                // if (obj.SectionList.length != 0) {
                // }
                locationList.push(obj);
              
            }
         
          j += 1;
            if (j == this.locationList.length) {
                let res = {
                    "locationList": locationList,
                    "type": type,
                };
                console.log('Final Object', res);
                this.finalProceed.emit(res);
            }
        }
    }
    //this.finalProceed.emit(obj);
     IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }

    skip() {
        this.skipSection.emit(true);
    }
    previous() {
        this.previousSection.emit(true);
    }
}
