import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/_services/shared.service';
import { ProductData } from '../../../models/product';
import * as Mydatas from '../../../../../../../app-config.json';
import { PersonalLiabilityApiPhoenix } from '../../../models/phoneix/PhoenixZambia/PersonalLiability/PersonalLiabilityApi';

import { PersonalLiabilityPhoneix } from '../../../models/phoneix/PhoenixZambia/PersonalLiability/PersonalLiability';

@Component({
    selector: 'app-personal-liability',
    templateUrl: './personal-liability.component.html',
    styleUrls: ['./personal-liability.component.scss'],
})
export class PersonalLiabilityComponent implements OnInit {
    @Input() form: any;
    coversreuired: any = null;
    insuranceId: any = null;
    @Input() productItem: any;
    userDetails: any = null;
    loginId: any = null;
    productId: any = null;
    @Input() renderType: any = null;
    @Input() locationList: any[] = [];
    @Input() tabIndex: any = null;
    @Input() industryTypeList: any[] = [];
    @Output() finalProceed = new EventEmitter<any>();
    @Input() locationDetails: any[] = [];
    @Output() skipSection = new EventEmitter<any>();
    @Output() previousSection = new EventEmitter<any>();
    branchCode: any = null;
    agencyCode: any = null;
    countryId: any = null;
    brokerbranchCode: any = null;

    IndustryError: boolean;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    fieldPersonalClaimCost: any[] = [];
    fieldPersonalLiability: any[] = [];

    userType: any = null;
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
        let personalliabilityApi = null;

        personalliabilityApi = new PersonalLiabilityPhoneix();
        this.fieldPersonalLiability = personalliabilityApi?.fields?.fieldGroup;

    }

    ngOnInit() {
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
                    let personalliabilityApi = null,
                        subDetails = this.locationDetails[i].SectionList;
                    if (this.productId == '81') {
                        personalliabilityApi = new PersonalLiabilityApiPhoenix();
                    }
                    obj = personalliabilityApi.getEditDetails(subDetails, obj);
                    if (obj && this.tabIndex == i) {
                        this.productItem.PersonalAccidental =
                            obj['PersonalAccidental'];
                        this.productItem.PersonalWrongful =
                            obj['PersonalWrongful'];

                        this.productItem.IndustryId = obj['IndustryType'];
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
                        loc['PersonalAccidental'] &&
                        loc['PersonalWrongful'] &&
                        loc['IndustryType']
                    ) {
                        this.productItem.PersonalAccidental =
                            loc['PersonalAccidental'];
                        this.productItem.PersonalWrongful =
                            loc['PersonalWrongful'];

                        this.productItem.IndustryId = loc['IndustryType'];
                    } else if (loc.SectionList) {
                        if (loc.SectionList.length != 0) {
                            let personalliabilityApi = null,
                                subDetails =
                                    this.locationDetails[i].SectionList;
                            if (this.insuranceId == '100046')
                                personalliabilityApi =
                                    new PersonalLiabilityPhoneix();

                            loc = personalliabilityApi.getEditDetails(
                                subDetails,
                                loc,
                            );
                            if (
                                loc['PersonalAccidental'] &&
                                loc['PersonalWrongful'] &&
                                loc['IndustryType']
                            ) {
                                this.productItem.PersonalAccidental =
                                    loc['PersonalAccidental'];
                                this.productItem.PersonalWrongful =
                                    loc['PersonalWrongful'];

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
        console.log(this.productItem)
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
                    LocationId: j + 1,
                    LocationName: entry.LocationName,
                    CoversRequired: entry.CoversRequired,
                    BuildingOwnerYn: entry.BuildingOwnerYn,
                    Address: entry.BuildingAddress,
                    SectionList: [],
                };
                if (j == this.tabIndex) {
                    entry['PersonalAccidental'] =
                        this.productItem.PersonalAccidental;
                    entry['PersonalWrongful'] =
                        this.productItem.PersonalWrongful;
                    entry['IndustryType'] = this.productItem.IndustryId;
                }
                let personalLiabilityApi = null;
                personalLiabilityApi = new PersonalLiabilityApiPhoenix();

                if (
                    entry['PersonalAccidental'] != undefined &&
                    entry['PersonalWrongful'] != undefined &&
                    entry['IndustryType'] != undefined
                ) {
                    let personalliabilityApilist =
                        personalLiabilityApi.getSaveDetails(
                            entry,
                            this.fieldPersonalClaimCost,
                            this.productItem.IndustryId,
                            this.industryTypeList,
                            obj,
                        );
                    if (personalliabilityApilist) {
                        obj = personalliabilityApilist;
                    }
                } else if (entry.SectionList) {
                    obj.SectionList = entry['SectionList'];
                }
                // if (obj.SectionList.length != 0) {
                // }
                locationList.push(obj);
                j += 1;
            }

            if (j == this.locationList.length) {
                let res = {
                    locationList: locationList,
                    type: type,
                };
                console.log('Final Object', res);
                this.finalProceed.emit(res);
            }
        }
    }

    IndustryChanged() {
        this.locationList[this.tabIndex].IndustryId =
            this.productItem.IndustryId;
    }

    skip() {
        this.skipSection.emit(true);
    }
    previous() {
        this.previousSection.emit(true);
    }
}
