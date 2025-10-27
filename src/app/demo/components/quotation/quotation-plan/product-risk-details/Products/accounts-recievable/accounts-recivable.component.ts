import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { AccountsRecievablePhoenix } from '../../../models/AccountsRecievable';
import { AccountsRecievableBotswana } from '../../../models/phoneix/PhoenixBotswana/AccountsRecievable/AccountsRecievable';
import { AccountsRecievableMozambique } from '../../../models/phoneix/PhoenixMozambique/AccountsRecievable/AccountsRecievable';
import { AccountsRecievableSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/AccountsRecievable/AccountsRecievable';
import { AccountsRecievableNamibia } from '../../../models/phoneix/PhoenixNamibia/AccountsRecievable/AccountsRecievable';
import { AccountsRecievableApiPhoenix } from '../../../models/phoneix/PhoenixZambia/AccountsRecievable/AccountsRecievableApi';
import { AccountsRecievableBotswanaApi } from '../../../models/phoneix/PhoenixBotswana/AccountsRecievable/AccountsRecievableApi';
import { AccountsRecievableMozambiqueApi } from '../../../models/phoneix/PhoenixMozambique/AccountsRecievable/AccountsRecievableApi';
import { AccountsRecievableSwazilandApi } from '../../../models/phoneix/PhoenixSwazilnd/AccountsRecievable/AccountsRecievableApi';
import { AccountsRecievableNamibiaApi } from '../../../models/phoneix/PhoenixNamibia/AccountsRecievable/AccountsRecievableApi';
import { AccidentalDamageCommercialNamibiaApi } from '../../../models/namibia/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageCommercialBotswanaApi } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageCommercialMozambiqueApi } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageCommercialSwazilandApi } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
import { AccidentalDamageCommercialPhoenixApi } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/AccidentalDamage/AccidentalDamageApi';
@Component({
    selector: 'app-accounts-recivable',
    standalone: false,
    templateUrl: './accounts-recivable.component.html',
    styleUrls: ['./accounts-recivable.component.scss'],
})
export class AccountsRecivableComponent implements OnInit {
    @Input() form: any; coversreuired: any = null; insuranceId: any = null;
    @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
    @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
    @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
    @Output() skipSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
    @Output() previousSection = new EventEmitter<any>();
    @Input() IsPackage: boolean;
    branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
    IndustryError: boolean;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    AccountsRecivableClaimCost: any[] = [];
    productId: any;
    userType: any;
    fieldAccountsRecievable: any[] = [];
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
        let accountsRecievableApi = null;
        if (this.productId == '92') {
            if (this.insuranceId == '100046') accountsRecievableApi = new AccountsRecievablePhoenix();
            else if (this.insuranceId == '100047') accountsRecievableApi = new AccountsRecievableBotswana();
            else if (this.insuranceId == '100048') accountsRecievableApi = new AccountsRecievableMozambique();
            else if (this.insuranceId == '100049') accountsRecievableApi = new AccountsRecievableSwaziland();
            else if (this.insuranceId == '100050') accountsRecievableApi = new AccountsRecievableNamibia();
            this.fieldAccountsRecievable[0] = accountsRecievableApi?.fields;
            console.log(this.fieldAccountsRecievable[0]);
        } else {
            if (this.insuranceId == '100046') accountsRecievableApi = new AccountsRecievablePhoenix();
            else if (this.insuranceId == '100047') accountsRecievableApi = new AccountsRecievableBotswana();
            else if (this.insuranceId == '100048') accountsRecievableApi = new AccountsRecievableMozambique();
            else if (this.insuranceId == '100049') accountsRecievableApi = new AccountsRecievableSwaziland();
            else if (this.insuranceId == '100050') accountsRecievableApi = new AccountsRecievableNamibia();
            this.fieldAccountsRecievable[0] = accountsRecievableApi?.fields;
            console.log('fieldAccountsRecievable', this.fieldAccountsRecievable[0]);
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
                    let accountsRecievableApi = null, subDetails = this.locationDetails[i].SectionList;
                    if (this.productId == '92') {
                        if (this.insuranceId == '100046') accountsRecievableApi = new AccountsRecievableApiPhoenix();
                        else if (this.insuranceId == '100047') accountsRecievableApi = new AccountsRecievableBotswanaApi();
                        else if (this.insuranceId == '100048') accountsRecievableApi = new AccountsRecievableMozambiqueApi();
                        else if (this.insuranceId == '100049') accountsRecievableApi = new AccountsRecievableSwazilandApi();
                        else if (this.insuranceId == '100050') accountsRecievableApi = new AccountsRecievableNamibiaApi();
                    }
                    else {
                        if (this.insuranceId == '100046') accountsRecievableApi = new AccountsRecievableApiPhoenix();
                        else if (this.insuranceId == '100047') accountsRecievableApi = new AccountsRecievableBotswanaApi();
                        else if (this.insuranceId == '100048') accountsRecievableApi = new AccountsRecievableMozambiqueApi();
                        else if (this.insuranceId == '100049') accountsRecievableApi = new AccountsRecievableSwazilandApi();
                        else if (this.insuranceId == '100050') accountsRecievableApi = new AccountsRecievableNamibiaApi();
                    }
                    obj = accountsRecievableApi.getEditDetails(subDetails, obj);
                    if (obj && this.tabIndex == i) {
                        this.productItem.OutstandingDebitBalances = obj['OutstandingDebitBalances'];
                        this.productItem.TransitExtension = obj['TransitExtension'];
                        this.productItem.ClaimsPreparationCosts = obj['ClaimsPreparationCosts'];
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
                    if (loc['ClaimsPreparationCosts'] && loc['IndustryType']) {
                        this.productItem.OutstandingDebitBalances = loc['OutstandingDebitBalances'];
                        this.productItem.TransitExtension = loc['TransitExtension'];
                        this.productItem.ClaimsPreparationCosts = loc['ClaimsPreparationCosts'];
                        this.productItem.IndustryId = loc['IndustryType']
                    }
                    else if (loc.SectionList) {
                        if (loc.SectionList.length != 0) {
                            let theft = null, subDetails = this.locationDetails[i].SectionList;
                            if (this.insuranceId == '100046') theft = new AccountsRecievableApiPhoenix();
                            else if (this.insuranceId == '100047') theft = new AccountsRecievableBotswanaApi();
                            else if (this.insuranceId == '100048') theft = new AccountsRecievableMozambiqueApi();
                            else if (this.insuranceId == '100049') theft = new AccountsRecievableSwazilandApi();
                            else if (this.insuranceId == '100050') theft = new AccountsRecievableNamibiaApi();
                            loc = theft.getEditDetails(subDetails, loc);
                            if (loc['ClaimsPreparationCosts'] && loc['IndustryType']) {
                                this.productItem.OutstandingDebitBalances = loc['OutstandingDebitBalances'];
                                this.productItem.TransitExtension = loc['TransitExtension'];
                                this.productItem.ClaimsPreparationCosts = loc['ClaimsPreparationCosts'];
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
                this.AccountsRecivableClaimCost = defaultObj.concat(data.Result);
                for (let i = 0; i < this.AccountsRecivableClaimCost.length; i++) {
                    this.AccountsRecivableClaimCost[i].label = this.AccountsRecivableClaimCost[i]['CodeDesc'];
                    this.AccountsRecivableClaimCost[i].value = this.AccountsRecivableClaimCost[i]['Code'];
                    // delete this.roofMaterialList[i].CodeDesc;
                    if (i == this.AccountsRecivableClaimCost.length - 1) {
                        if (this.productId == '92' || this.productId == '69') {
                            let fieldCostClaim = this.fieldAccountsRecievable[0].fieldGroup[0].fieldGroup;
                            console.log('fieldCostClaim', fieldCostClaim);
                            if (fieldCostClaim) {
                                for (let field of fieldCostClaim) { if (field.key == 'ClaimsPreparationCosts') { field.props.options = this.AccountsRecivableClaimCost; } }
                            }
                        }
                        else {
                            let fieldLeakage = this.fieldAccountsRecievable[0].fieldGroup[0].fieldGroup;
                            for (let field of fieldLeakage) { if (field.key == 'ClaimsPreparationCosts') { field.props.options = this.AccountsRecivableClaimCost; } }
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
                    entry['OutstandingDebitBalances'] = this.productItem.OutstandingDebitBalances;
                    entry['TransitExtension'] = this.productItem.TransitExtension;
                    entry['ClaimsPreparationCosts'] = this.productItem.ClaimsPreparationCosts;
                    entry['IndustryType'] = this.productItem.IndustryId;
                }
                let accountsrecivable = null;
                    if (this.insuranceId == '100046') accountsrecivable = new AccountsRecievableApiPhoenix();
                    else if (this.insuranceId == '100047') accountsrecivable = new AccountsRecievableBotswanaApi();
                    else if (this.insuranceId == '100048') accountsrecivable = new AccountsRecievableMozambiqueApi();
                    else if (this.insuranceId == '100049') accountsrecivable = new AccountsRecievableSwazilandApi();
                    else if (this.insuranceId == '100050') accountsrecivable = new AccountsRecievableNamibiaApi();
                if (entry['ClaimsPreparationCosts'] && entry['IndustryType']) {
                    let accountsrecivableApilist: any = accountsrecivable.getSaveDetails(entry, this.AccountsRecivableClaimCost, this.industryTypeList, obj)
                    if (accountsrecivableApilist) {
                        let list = [];
                        if (entry.SectionList) list = entry.SectionList.filter(ele => ele.SectionId != '219');
                        if (accountsrecivableApilist.SectionList) accountsrecivableApilist.SectionList = accountsrecivableApilist.SectionList.concat(list)
                        obj = accountsrecivableApilist
                }
                }
                else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
                locationList.push(obj);
                j += 1;
                if (j == this.locationList.length) {
                    let res = { "locationList": locationList, "type": type}
                    console.log("Final Object", res)
                     if (type == 'packageData') {
                        this.saveSection.emit(res);
                    }
                    else { this.finalProceed.emit(res) }
                }
            }
        }
    }
    skip() {
        this.skipSection.emit('Accounts Recievable');
    }
    previous() {
        this.previousSection.emit(true);
    }
}