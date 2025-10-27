import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { TheftPhoenix } from '../../../models/Theft';
import { TheftBotswana } from '../../../models/phoneix/PhoenixBotswana/Theft/Theft';
import { TheftMozambique } from '../../../models/phoneix/PhoenixMozambique/Theft/Theft';
import { TheftSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Theft/Theft';
import { TheftNamibia } from '../../../models/phoneix/PhoenixNamibia/Theft/Theft';
import { TheftApiPhoenix } from '../../../models/phoneix/PhoenixZambia/Theft/TheftApi';
import { TheftApiBotswana } from '../../../models/phoneix/PhoenixBotswana/Theft/TheftApi';
import { TheftApiMozambique } from '../../../models/phoneix/PhoenixMozambique/Theft/TheftApi';
import { TheftApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Theft/TheftApi';
import { TheftApiNamibia } from '../../../models/phoneix/PhoenixNamibia/Theft/TheftApi';
@Component({
    selector: 'app-theft',
    templateUrl: './theft.component.html',
    standalone: false,
    styleUrls: ['./theft.component.scss']
})
export class TheftComponent implements OnInit {
    @Input() form: any; coversreuired: any = null; insuranceId: any = null;
    @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
    @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
    @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];@Output() skipSection = new EventEmitter<any>();
    @Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
    branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
    IndustryError: boolean;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    TheftClaimCost: any[] = [];
    productId: any;
    userType: any;
    fieldTheft: any[] = [];
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
        let contentData = null;
        if (this.productId == '92') {
            if (this.insuranceId == '100046') contentData = new TheftPhoenix();
            else if (this.insuranceId == '100047') contentData = new TheftBotswana();
            else if (this.insuranceId == '100048') contentData = new TheftMozambique();
            else if (this.insuranceId == '100049') contentData = new TheftSwaziland();
            else if (this.insuranceId == '100050') contentData = new TheftNamibia();
            this.fieldTheft[0] = contentData?.fields;
            console.log(this.fieldTheft[0]);
        } else {
            if (this.insuranceId == '100046') contentData = new TheftPhoenix();
            else if (this.insuranceId == '100047') contentData = new TheftBotswana();
            else if (this.insuranceId == '100048') contentData = new TheftMozambique();
            else if (this.insuranceId == '100049') contentData = new TheftSwaziland();
            else if (this.insuranceId == '100050') contentData = new TheftNamibia();
            this.fieldTheft[0] = contentData?.fields;
            console.log("contentdata=", contentData);
        }
        this.getClaimPreparationList();
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
                    let theft = null, subDetails = this.locationDetails[i].SectionList;
                    if (this.productId == '71') {
                        if (this.insuranceId == '100046') theft = new TheftApiPhoenix();
                        else if (this.insuranceId == '100047') theft = new TheftApiBotswana();
                        else if (this.insuranceId == '100048') theft = new TheftApiMozambique();
                        else if (this.insuranceId == '100049') theft = new TheftApiSwaziland();
                        else if (this.insuranceId == '100050') theft = new TheftApiNamibia();
                    }
                    else {
                        if (this.insuranceId == '100046') theft = new TheftApiPhoenix();
                        else if (this.insuranceId == '100047') theft = new TheftApiBotswana();
                        else if (this.insuranceId == '100048') theft = new TheftApiMozambique();
                        else if (this.insuranceId == '100049') theft = new TheftApiSwaziland();
                        else if (this.insuranceId == '100050') theft = new TheftApiNamibia();
                    }
                    obj = theft.getEditDetails(subDetails, obj);
                    if (obj && this.tabIndex == i) {
                        this.productItem.LocksandKeysDesc = obj['LocksandKeysDesc'];
                        this.productItem.LocksandKeys = obj['LocksandKeys'];
                        this.productItem.LossDamagetoPersonalEffectsDesc = obj['LossDamagetoPersonalEffectsDesc'];
                        this.productItem.LossDamagetoPersonalEffects = obj['LossDamagetoPersonalEffects'];
                        this.productItem.FuelinAbovegroundtanks = obj['FuelinAbovegroundtanks'];
                        this.productItem.FuelinAbovegroundtanksDesc = obj['FuelinAbovegroundtanksDesc'];
                        this.productItem.FuelinUndergroundtanksDesc = obj['FuelinUndergroundtanksDesc'];
                        this.productItem.FuelinUndergroundtanks = obj['FuelinUndergroundtanks'];
                        this.productItem.FirstLossLimitDesc = obj['FirstLossLimitDesc'];
                        this.productItem.FirstLossLimit = obj['FirstLossLimit'];
                        this.productItem.VehiclesintheOpenDesc = obj['VehiclesintheOpenDesc'];
                        this.productItem.VehiclesintheOpen = obj['VehiclesintheOpen'];
                        this.productItem.DamagetoBuildingscausedbyThievesDesc = obj['DamagetoBuildingscausedbyThievesDesc'];
                        this.productItem.DamagetoBuildingscausedbyThieves = obj['DamagetoBuildingscausedbyThieves'];
                        this.productItem.TheftAdditionalClaimsPreparationCosts = obj['TheftAdditionalClaimsPreparationCosts'];
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
                    if (loc['LocksandKeys'] != undefined && loc['LossDamagetoPersonalEffects'] != undefined && loc['FuelinAbovegroundtanks'] != undefined && loc['IndustryType'] != undefined) {
                        this.productItem.LocksandKeysDesc = loc['LocksandKeysDesc'];
                        this.productItem.LocksandKeys = loc['LocksandKeys'];
                        this.productItem.LossDamagetoPersonalEffectsDesc = loc['LossDamagetoPersonalEffectsDesc'];
                        this.productItem.LossDamagetoPersonalEffects = loc['LossDamagetoPersonalEffects'];
                        this.productItem.FuelinAbovegroundtanks = loc['FuelinAbovegroundtanks'];
                        this.productItem.FuelinAbovegroundtanksDesc = loc['FuelinAbovegroundtanksDesc'];
                        this.productItem.FuelinUndergroundtanksDesc = loc['FuelinUndergroundtanksDesc'];
                        this.productItem.FuelinUndergroundtanks = loc['FuelinUndergroundtanks'];
                        this.productItem.FirstLossLimitDesc = loc['FirstLossLimitDesc'];
                        this.productItem.FirstLossLimit = loc['FirstLossLimit'];
                        this.productItem.VehiclesintheOpenDesc = loc['VehiclesintheOpenDesc'];
                        this.productItem.VehiclesintheOpen = loc['VehiclesintheOpen'];
                        this.productItem.DamagetoBuildingscausedbyThievesDesc = loc['DamagetoBuildingscausedbyThievesDesc'];
                        this.productItem.DamagetoBuildingscausedbyThieves = loc['DamagetoBuildingscausedbyThieves'];
                        this.productItem.TheftAdditionalClaimsPreparationCosts = loc['TheftAdditionalClaimsPreparationCosts'];
                        this.productItem.IndustryId = loc['IndustryType']
                    }
                    else if (loc.SectionList) {
                        if (loc.SectionList.length != 0) {
                            let theft = null, subDetails = this.locationDetails[i].SectionList;
                            if (this.insuranceId == '100046') theft = new TheftApiPhoenix();
                            else if (this.insuranceId == '100047') theft = new TheftApiBotswana();
                            else if (this.insuranceId == '100048') theft = new TheftApiMozambique();
                            else if (this.insuranceId == '100049') theft = new TheftApiSwaziland();
                            else if (this.insuranceId == '100050') theft = new TheftApiNamibia();
                            loc = theft.getEditDetails(subDetails, loc);
                            if (loc['LocksandKeys'] != undefined && loc['LossDamagetoPersonalEffects'] != undefined && loc['FuelinAbovegroundtanks'] != undefined && loc['IndustryType'] != undefined) {
                                this.productItem.LocksandKeysDesc = loc['LocksandKeysDesc'];
                                this.productItem.LocksandKeys = loc['LocksandKeys'];
                                this.productItem.LossDamagetoPersonalEffectsDesc = loc['LossDamagetoPersonalEffectsDesc'];
                                this.productItem.LossDamagetoPersonalEffects = loc['LossDamagetoPersonalEffects'];
                                this.productItem.FuelinAbovegroundtanks = loc['FuelinAbovegroundtanks'];
                                this.productItem.FuelinAbovegroundtanksDesc = loc['FuelinAbovegroundtanksDesc'];
                                this.productItem.FuelinUndergroundtanksDesc = loc['FuelinUndergroundtanksDesc'];
                                this.productItem.FuelinUndergroundtanks = loc['FuelinUndergroundtanks'];
                                this.productItem.FirstLossLimitDesc = loc['FirstLossLimitDesc'];
                                this.productItem.FirstLossLimit = loc['FirstLossLimit'];
                                this.productItem.VehiclesintheOpenDesc = loc['VehiclesintheOpenDesc'];
                                this.productItem.VehiclesintheOpen = loc['VehiclesintheOpen'];
                                this.productItem.DamagetoBuildingscausedbyThievesDesc = loc['DamagetoBuildingscausedbyThievesDesc'];
                                this.productItem.DamagetoBuildingscausedbyThieves = loc['DamagetoBuildingscausedbyThieves'];
                                this.productItem.TheftAdditionalClaimsPreparationCosts = loc['TheftAdditionalClaimsPreparationCosts'];
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
    getClaimPreparationList() {
        let ReqObj = {
            "InsuranceId": this.insuranceId,
            "ItemType": "CLAIM_COST"
        }
        let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
                let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
                this.TheftClaimCost = defaultObj.concat(data.Result);
                for (let i = 0; i < this.TheftClaimCost.length; i++) {
                    this.TheftClaimCost[i].label = this.TheftClaimCost[i]['CodeDesc'];
                    this.TheftClaimCost[i].value = this.TheftClaimCost[i]['Code'];
                    if (i == this.TheftClaimCost.length - 1) {
                        if (this.productId == '92' || this.productId == '71') {
                            let fieldCostClaim = this.fieldTheft[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[7].fieldGroup;
                            if (fieldCostClaim) {
                                for (let field of fieldCostClaim) { 
                                    if (field.key == 'TheftAdditionalClaimsPreparationCosts') { 
                                        field.props.options = this.TheftClaimCost; } 
                                    }
                            }
                        }
                        else {
                            let fieldLeakage = this.fieldTheft[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[7].fieldGroup;
                            for (let field of fieldLeakage) { if (field.key == 'TheftAdditionalClaimsPreparationCosts') { field.props.options = this.TheftClaimCost; } }
                        }
                    }
                }
            })
    }
    //Industry Change
    IndustryChanged() {
        this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
    }
    onProceedData(type) {
        console.log("Locations", this.locationList)
        let i = 0;
        if ((this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') && type!='Previous') { i += 1; this.IndustryError = true; }
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
                    entry['LocksandKeysDesc'] = this.productItem.LocksandKeysDesc;
                    entry['LocksandKeys'] = this.productItem.LocksandKeys;
                    entry['LossDamagetoPersonalEffectsDesc'] = this.productItem.LossDamagetoPersonalEffectsDesc;
                    entry['LossDamagetoPersonalEffects'] = this.productItem.LossDamagetoPersonalEffects;
                    entry['FuelinAbovegroundtanksDesc'] = this.productItem.FuelinAbovegroundtanksDesc;
                    entry['FuelinAbovegroundtanks'] = this.productItem.FuelinAbovegroundtanks;
                    entry['FuelinUndergroundtanksDesc'] = this.productItem.FuelinUndergroundtanksDesc;
                    entry['FuelinUndergroundtanks'] = this.productItem.FuelinUndergroundtanks;
                    entry['FirstLossLimitDesc'] = this.productItem.FirstLossLimitDesc;
                    entry['FirstLossLimit'] = this.productItem.FirstLossLimit;
                    entry['VehiclesintheOpenDesc'] = this.productItem.VehiclesintheOpenDesc;
                    entry['VehiclesintheOpen'] = this.productItem.VehiclesintheOpen;
                    entry['DamagetoBuildingscausedbyThievesDesc'] = this.productItem.DamagetoBuildingscausedbyThievesDesc;
                    entry['DamagetoBuildingscausedbyThieves'] = this.productItem.DamagetoBuildingscausedbyThieves;
                    entry['TheftAdditionalClaimsPreparationCosts'] = this.productItem.TheftAdditionalClaimsPreparationCosts;
                    entry['IndustryType'] = this.productItem.IndustryId;
                }
                let theft = null;
                if (this.insuranceId == '100046') theft = new TheftApiPhoenix();
                else if (this.insuranceId == '100047') theft = new TheftApiBotswana();
                else if (this.insuranceId == '100048') theft = new TheftApiMozambique();
                else if (this.insuranceId == '100049') theft = new TheftApiSwaziland();
                else if (this.insuranceId == '100050') theft = new TheftApiNamibia();
                if (entry['LocksandKeys'] != undefined && entry['FirstLossLimit'] != undefined && entry['IndustryType'] != undefined) {
                    let theftApilist: any = theft.getSaveDetails(entry, this.TheftClaimCost, this.productItem.IndustryId, this.industryTypeList, obj)
                    if (theftApilist) { 
                        let list =[];
                        if (this.productId == '92') {  if(entry.SectionList){list = entry.SectionList.filter(ele=>ele.SectionId!='220');}}
                        if(theftApilist.SectionList) theftApilist.SectionList = theftApilist.SectionList.concat(list)
                        obj= theftApilist;
                    }
                }
                else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
                // if (obj.SectionList.length != 0) {
                // }
                locationList.push(obj);
                 j += 1;
                if (j == this.locationList.length) {
                    let res = {
                        "locationList": locationList,
                        "type": type
                    }
                    if (type == 'packageData') {this.saveSection.emit(res);}
                    else { this.finalProceed.emit(res) }
                }
            }
        }
    }
    //this.finalProceed.emit(obj);
    skip() {
        this.skipSection.emit('Office contents');
    }
    previous() {
        this.previousSection.emit(true);
    }
}
