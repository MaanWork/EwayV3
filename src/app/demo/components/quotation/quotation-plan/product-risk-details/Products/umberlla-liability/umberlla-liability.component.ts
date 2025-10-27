import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { UmbrellaBotswana } from '../../../models/phoneix/PhoenixBotswana/Umbrella/Umbrella';
import { UmbrellaMozambique } from '../../../models/phoneix/PhoenixMozambique/Umbrella/Umbrella';
import { UmbrellaNamibia } from '../../../models/phoneix/PhoenixNamibia/Umbrella/Umbrella';
import { UmbrellaSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Umbrella/Umbrella';
import { UmbrellaPhoenix } from '../../../models/phoneix/PhoenixZambia/Umbrella/Umbrella';
import { UmbrellaCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/Umbrella/Umbrella';
import { UmbrellaApiBotswana } from '../../../models/phoneix/PhoenixBotswana/Umbrella/umbrellaApi';
import { UmbrellaApiMozambique } from '../../../models/phoneix/PhoenixMozambique/Umbrella/umbrellaApi';
import { UmbrellaApiNamibia } from '../../../models/phoneix/PhoenixNamibia/Umbrella/umbrellaApi';
import { UmbrellaApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Umbrella/umbrellaApi';
import { UmbrellaApi } from '../../../models/phoneix/PhoenixZambia/Umbrella/umbrellaApi';
import { UmbrellaCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/Umbrella/umbrellaApi';

@Component({
    selector: 'app-umberlla-liability',
    standalone: false,
    templateUrl: './umberlla-liability.component.html',
    styleUrls: ['./umberlla-liability.component.scss']
})
export class UmbrellaLiablityComponent {
    deteriorationOfStockDescError: boolean = false; userType: any = null;
    deteriorationOfStockError: boolean = false; productId: any = null;
    @Input() form: any; coversreuired: any = null; insuranceId: any = null;
    @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
    @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
    @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
    @Output() skipSection = new EventEmitter<any>();
    @Output() previousSection = new EventEmitter<any>();
    @Output() saveSection = new EventEmitter<any>();
    branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
    fieldUmbrella: any[] = [];
    IndustryError: boolean;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    constructor(private sharedService: SharedService) {
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
        if (this.productId == '92') {
            contentData = new UmbrellaCommercialNamibia(this.sharedService)
            this.fieldUmbrella = contentData.policyfields1.fieldGroup;
        }
        else {
            if (this.insuranceId == '100046') contentData = new UmbrellaPhoenix(this.sharedService)
            else if (this.insuranceId == '100047') contentData = new UmbrellaBotswana(this.sharedService)
            else if (this.insuranceId == '100048') contentData = new UmbrellaMozambique(this.sharedService)
            else if (this.insuranceId == '100049') contentData = new UmbrellaSwaziland(this.sharedService)
            else if (this.insuranceId == '100050') contentData = new UmbrellaNamibia(this.sharedService)
            this.fieldUmbrella = contentData.policyfields1.fieldGroup;
        }
    }

    ngOnInit() {
        if (this.locationList.length != 0) {
            this.onEditData();
        }
    }

    onEditData() {
        console.log("Locations On Edit", this.locationList);
        if (this.renderType == 'Direct') {
            let i = 0;
            for (let obj of this.locationList) {
                if (this.locationDetails[i]) {
                    let umbrellaApi = null, subDetails = this.locationDetails[i]?.SectionList;
                    if (this.productId == '92') {
                        umbrellaApi = new UmbrellaCommercialApiNamibia()
                    }
                    else {
                        if (this.insuranceId == '100046') umbrellaApi = new UmbrellaApi();
                        else if (this.insuranceId == '100047') umbrellaApi = new UmbrellaApiBotswana();
                        else if (this.insuranceId == '100048') umbrellaApi = new UmbrellaApiMozambique();
                        else if (this.insuranceId == '100049') umbrellaApi = new UmbrellaApiSwaziland();
                        else if (this.insuranceId == '100050') umbrellaApi = new UmbrellaApiNamibia();
                    }
                    obj = umbrellaApi.getEditDetails(subDetails, obj);
                    if (obj && this.tabIndex == i) {
                        this.productItem.UmbrellasumInsured = obj['UmbrellasumInsured'];
                        this.productItem.IndustryId = obj['IndustryType']
                    }
                    i += 1;
                }
            }
            if (this.locationDetails.length != 0) {
            }
        }
        else {
            let i = 0;
            for (let loc of this.locationList) {
                if (loc && this.tabIndex == i) {
                    console.log("On Next Loc", loc)
                    if (loc['UmbrellasumInsured'] != undefined && loc['IndustryType'] != undefined) {
                        this.productItem.UmbrellasumInsured = loc['UmbrellasumInsured'];
                        this.productItem.IndustryId = loc['IndustryType']
                    }
                    else if (loc.SectionList) {
                        if (loc.SectionList.length != 0) {
                            let umbrellaApi = null, subDetails = this.locationDetails[i]?.SectionList;
                            if (this.productId == '92') {
                                umbrellaApi = new UmbrellaCommercialApiNamibia()
                            }
                            else {
                                if (this.insuranceId == '100046') umbrellaApi = new UmbrellaApi();
                                else if (this.insuranceId == '100047') umbrellaApi = new UmbrellaApiBotswana();
                                else if (this.insuranceId == '100048') umbrellaApi = new UmbrellaApiMozambique();
                                else if (this.insuranceId == '100049') umbrellaApi = new UmbrellaApiSwaziland();
                                else if (this.insuranceId == '100050') umbrellaApi = new UmbrellaApiNamibia();
                            }
                            loc = umbrellaApi.getEditDetails(subDetails, loc);
                            if (loc['UmbrellasumInsured'] != undefined && loc['IndustryType'] != undefined) {
                                this.productItem.UmbrellasumInsured = loc['UmbrellasumInsured'];
                                this.productItem.IndustryId = loc['IndustryType']
                            }
                        }
                    }
                }
                i += 1;
            }
        }
        console.log("Final Location", this.locationList)
    }

    //Industry Change
    IndustryChanged() {
        this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
    }

    onProceedData(type) {
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
                    entry['UmbrellasumInsured'] = this.productItem.UmbrellasumInsured;
                    entry['IndustryType'] = this.productItem.IndustryId;
                }
                let umbrellaApi = null;
                if (this.productId == '92') {
                    umbrellaApi = new UmbrellaCommercialApiNamibia()
                }
                else {
                    if (this.insuranceId == '100046') umbrellaApi = new UmbrellaApi();
                    else if (this.insuranceId == '100047') umbrellaApi = new UmbrellaApiBotswana();
                    else if (this.insuranceId == '100048') umbrellaApi = new UmbrellaApiMozambique();
                    else if (this.insuranceId == '100049') umbrellaApi = new UmbrellaApiSwaziland();
                    else if (this.insuranceId == '100050') umbrellaApi = new UmbrellaApiNamibia();
                }
                if (entry['UmbrellasumInsured'] != undefined && entry['IndustryType'] != undefined) {
                    let umbrellaApilist: any = umbrellaApi.getSaveDetails(entry, '', this.productItem.IndustryId, this.industryTypeList, obj)
                    if (umbrellaApilist) {
                        let list = [];
                        if (entry.SectionList) list = entry.SectionList.filter(ele => ele.SectionId != '224');
                        if (umbrellaApilist.SectionList) umbrellaApilist.SectionList = umbrellaApilist.SectionList.concat(list)
                        obj = umbrellaApilist
                    }
                }
                else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }

                locationList.push(obj);
                j += 1;
                if (j == this.locationList.length) {
                    let res = {
                        "locationList": locationList,
                        "type": type
                    }
                    if (type == 'packageData') {
                        this.saveSection.emit(res);
                    }
                    else { this.finalProceed.emit(res) }
                }
            }
        }
    }
    CommaFormattedCorp(event: KeyboardEvent, field) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.value) inputElement.value = String(inputElement.value).replace(/[^0-9.]|(?<=\-..*)\./g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return inputElement.value;
    }
    onKeyDown(event: KeyboardEvent, field) {
        const inputElement = event.target as HTMLInputElement;
        let maxLength = 0;
        maxLength = 19;
        if (inputElement.value.length >= maxLength) {
            event.preventDefault();
        }
    }
    skip() {
        this.skipSection.emit('Umbrella Liability');
    }
    previous() {
        this.previousSection.emit(true);
    }
}
