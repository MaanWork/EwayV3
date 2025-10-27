import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { PersonalAllRiskPhoenix } from '../../../models/phoneix/PhoenixZambia/PersonalAllRisk/personalRisk';
import { PersonalAllRiskApiPhoenix } from '../../../models/phoneix/PhoenixZambia/PersonalAllRisk/personalRiskApi';
import { PersonalAllRiskApiBotswana } from '../../../models/phoneix/PhoenixBotswana/PersonalAllRisk/personalRiskApi';
import { PersonalAllRiskApiMozambique } from '../../../models/phoneix/PhoenixMozambique/PersonalAllRisk/personalRiskApi';
import { PersonalAllRiskApiNamibia } from '../../../models/phoneix/PhoenixNamibia/PersonalAllRisk/personalRiskApi';
import { PersonalAllRiskApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/PersonalAllRisk/personalRiskApi';

@Component({
    selector: 'app-personal-all-risks',
    templateUrl: './personal-all-risks.component.html',
    styleUrls: ['./personal-all-risks.component.scss'],
})
export class PersonalAllRisksComponent {
    userType: any = null;
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
    @Output() saveSection = new EventEmitter<any>();
    branchCode: any = null;
    agencyCode: any = null;
    countryId: any = null;
    brokerbranchCode: any = null;
    fieldsBAR: any[] = [];
    IndustryError: boolean;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    personalAllRiskClaimCost: any[] = [];

    constructor() {
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
        let PersonalAllrisk = null;
        PersonalAllrisk = new PersonalAllRiskPhoenix();
        this.fieldsBAR[0] = PersonalAllrisk?.fields;
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
                    let subDetails = this.locationDetails[i]?.SectionList;

                    let personalAllriskApi = null;

                    if (this.insuranceId == '100046') personalAllriskApi = new PersonalAllRiskApiPhoenix();
                    else if (this.insuranceId == '100047') personalAllriskApi = new PersonalAllRiskApiBotswana();
                    else if (this.insuranceId == '100048') personalAllriskApi = new PersonalAllRiskApiMozambique();
                    else if (this.insuranceId == '100049') personalAllriskApi = new PersonalAllRiskApiSwaziland();
                    else if (this.insuranceId == '100050') personalAllriskApi = new PersonalAllRiskApiNamibia();

                    obj = personalAllriskApi.getEditDetails(subDetails, obj);
                    if (obj && this.tabIndex == i) {
                        this.productItem.ClothingAndPersonalEffectsPhoenixDesc =
                            obj['ClothingAndPersonalEffectsPhoenixDesc'];
                        this.productItem.ClothingAndPersonalEffectsPhoenix =
                            obj['ClothingAndPersonalEffectsPhoenix'];
                        this.productItem.CampingEquipmentPhoenixDesc =
                            obj['CampingEquipmentPhoenixDesc'];
                        this.productItem.CampingEquipmentPhoenix =
                            obj['CampingEquipmentPhoenix'];
                        this.productItem.SportingEquipmentPhoenixDesc =
                            obj['SportingEquipmentPhoenixDesc'];
                        this.productItem.SportingEquipmentPhoenix =
                            obj['SportingEquipmentPhoenix'];
                        this.productItem.JewelleryPhoenixDesc =
                            obj['JewelleryPhoenixDesc'];
                        this.productItem.JewelleryPhoenix =
                            obj['JewelleryPhoenix'];
                        this.productItem.MobilephoneDesc =
                            obj['MobilephoneDesc'];
                        this.productItem.Mobilephone = obj['Mobilephone'];
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
                    if (loc['ClothingAndPersonalEffectsPhoenix'] &&
                        loc['JewelleryPhoenix'] &&
                        loc['MobilephoneDesc'] &&
                        loc['Mobilephone'] &&
                        loc['IndustryType']
                    ) {
                        this.productItem.ClothingAndPersonalEffectsPhoenixDesc =
                            loc['ClothingAndPersonalEffectsPhoenixDesc'];
                        this.productItem.ClothingAndPersonalEffectsPhoenix =
                            loc['ClothingAndPersonalEffectsPhoenix'];
                        this.productItem.CampingEquipmentPhoenixDesc =
                            loc['CampingEquipmentPhoenixDesc'];
                        this.productItem.CampingEquipmentPhoenix =
                            loc['CampingEquipmentPhoenix'];
                        this.productItem.SportingEquipmentPhoenixDesc =
                            loc['SportingEquipmentPhoenixDesc'];
                        this.productItem.SportingEquipmentPhoenix =
                            loc['SportingEquipmentPhoenix'];
                        this.productItem.JewelleryPhoenixDesc =
                            loc['JewelleryPhoenixDesc'];
                        this.productItem.JewelleryPhoenix =
                            loc['JewelleryPhoenix'];
                        this.productItem.MobilephoneDesc =
                            loc['MobilephoneDesc'];
                        this.productItem.Mobilephone = loc['Mobilephone'];
                        this.productItem.IndustryId = loc['IndustryType'];
                    } else if (loc.SectionList) {
                        if (loc.SectionList.length != 0) {
                            let personalAllriskApi = null,
                                subDetails =
                                    this.locationDetails[i]?.SectionList;
                            if (this.productId == '93') {
                                if (this.insuranceId == '100046') personalAllriskApi = new PersonalAllRiskApiPhoenix();
                                else if (this.insuranceId == '100047') personalAllriskApi = new PersonalAllRiskApiBotswana();
                                else if (this.insuranceId == '100048') personalAllriskApi = new PersonalAllRiskApiMozambique();
                                else if (this.insuranceId == '100049') personalAllriskApi = new PersonalAllRiskApiSwaziland();
                                else if (this.insuranceId == '100050') personalAllriskApi = new PersonalAllRiskApiNamibia();
                            }
                            else {
                                personalAllriskApi = new PersonalAllRiskApiPhoenix();
                            }

                            loc = personalAllriskApi.getEditDetails(
                                subDetails,
                                loc,
                            );
                            if (loc['ClothingAndPersonalEffectsPhoenix'] &&
                                loc['JewelleryPhoenix'] &&
                                loc['MobilephoneDesc'] &&
                                loc['Mobilephone'] &&
                                loc['IndustryType']
                            ) {
                                this.productItem.ClothingAndPersonalEffectsPhoenixDesc =
                                    loc[
                                    'ClothingAndPersonalEffectsPhoenixDesc'
                                    ];
                                this.productItem.ClothingAndPersonalEffectsPhoenix =
                                    loc['ClothingAndPersonalEffectsPhoenix'];
                                this.productItem.CampingEquipmentPhoenixDesc =
                                    loc['CampingEquipmentPhoenixDesc'];
                                this.productItem.CampingEquipmentPhoenix =
                                    loc['CampingEquipmentPhoenix'];
                                this.productItem.SportingEquipmentPhoenixDesc =
                                    loc['SportingEquipmentPhoenixDesc'];
                                this.productItem.SportingEquipmentPhoenix =
                                    loc['SportingEquipmentPhoenix'];
                                this.productItem.JewelleryPhoenixDesc =
                                    loc['JewelleryPhoenixDesc'];
                                this.productItem.JewelleryPhoenix =
                                    loc['JewelleryPhoenix'];
                                this.productItem.MobilephoneDesc =
                                    loc['MobilephoneDesc'];
                                this.productItem.Mobilephone =
                                    loc['Mobilephone'];
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

    IndustryChanged() {
        this.locationList[this.tabIndex].IndustryId =
            this.productItem.IndustryId;
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
                    LocationId: j + 1,
                    LocationName: entry.LocationName,
                    CoversRequired: entry.CoversRequired,
                    BuildingOwnerYn: entry.BuildingOwnerYn,
                    Address: entry.BuildingAddress,
                    SectionList: [],
                };
                if (j == this.tabIndex) {
                    entry['ClothingAndPersonalEffectsPhoenixDesc'] =
                        this.productItem.ClothingAndPersonalEffectsPhoenixDesc;
                    entry['ClothingAndPersonalEffectsPhoenix'] =
                        this.productItem.ClothingAndPersonalEffectsPhoenix;
                    entry['CampingEquipmentPhoenixDesc'] =
                        this.productItem.CampingEquipmentPhoenixDesc;
                    entry['CampingEquipmentPhoenix'] =
                        this.productItem.CampingEquipmentPhoenix;
                    entry['SportingEquipmentPhoenixDesc'] =
                        this.productItem.SportingEquipmentPhoenixDesc;
                    entry['SportingEquipmentPhoenix'] =
                        this.productItem.SportingEquipmentPhoenix;
                    entry['JewelleryPhoenixDesc'] =
                        this.productItem.JewelleryPhoenixDesc;
                    entry['JewelleryPhoenix'] =
                        this.productItem.JewelleryPhoenix;
                    entry['MobilephoneDesc'] = this.productItem.MobilephoneDesc;
                    entry['Mobilephone'] = this.productItem.Mobilephone;
                    entry['IndustryType'] = this.productItem.IndustryId;
                }
                let PersonalAllrisk = null;
                PersonalAllrisk = new PersonalAllRiskApiPhoenix();


                if (
                    entry['ClothingAndPersonalEffectsPhoenix'] != undefined &&
                    entry['CampingEquipmentPhoenix'] != undefined &&
                    entry['SportingEquipmentPhoenix'] != undefined &&
                    entry['JewelleryPhoenix'] != undefined &&
                    entry['Mobilephone'] != undefined &&
                    entry['IndustryType'] != undefined
                ) {
                    let personalAllRiskApilist: any =
                        PersonalAllrisk.getSaveDetails(
                            entry,
                            this.personalAllRiskClaimCost,
                            this.productItem.IndustryId,
                            this.industryTypeList,
                            obj,
                        );
                    if (personalAllRiskApilist) {
                        let list = [];
                        if (entry.SectionList) list = entry.SectionList.filter(ele => ele.SectionId != '230');
                        if (personalAllRiskApilist.SectionList) personalAllRiskApilist.SectionList = personalAllRiskApilist.SectionList.concat(list)
                        obj = personalAllRiskApilist
                    }
                } else if (entry.SectionList) {
                    obj.SectionList = entry['SectionList'];
                }
                locationList.push(obj);
                j += 1;
                if (j == this.locationList.length) {
                    let res = {
                        locationList: locationList,
                        type: type,
                    };
                    if (type == 'packageData') {
                        if (this.tabIndex == this.locationList.length - 1) { res.type = 'Submit'; this.finalProceed.emit(res) }
                        else { res.type = 'Next'; this.finalProceed.emit(res) }
                    }
                    else { this.finalProceed.emit(res) }
                }
            }
        }
    }

    skip() {
        this.skipSection.emit(true);
    }

    previous() {
        this.previousSection.emit(true);
    }
}
