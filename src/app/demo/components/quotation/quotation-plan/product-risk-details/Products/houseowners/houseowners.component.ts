import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services';
import { HouseOwnerCommercialApiPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/HouseOwner/HouseOwnerApi';
import { HouseOwnerCommercialApiBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/HouseOwner/HouseOwnerApi';
import { HouseOwnerCommercialApiMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/HouseOwner/HouseOwnerApi';
import { HouseOwnerCommercialApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/HouseOwner/HouseOwnerApi';
import { HouseOwnerCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/HouseOwner/HouseOwnerPhoenix';
import { HouseOwnerCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/HouseOwner/HouseOwnerPhoenix';
import { HouseOwnerCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/HouseOwner/HouseOwnerPhoenix';
import { HouseOwnerCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/HouseOwner/HouseOwnerPhoenix';
import { HouseOwnerCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/HouseOwner/HouseOwnerPhoenix';
import { HouseOwnerPhoenix } from '../../../models/phoneix/PhoenixZambia/HouseOwnerPhoenix';
import { HouseOwnerBotswana } from '../../../models/phoneix/PhoenixBotswana/HouseOwner/HouseOwnerPhoenix';
import { HouseOwnerMozambique } from '../../../models/phoneix/PhoenixMozambique/HouseOwner/HouseOwnerPhoenix';
import { HouseOwnerSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/HouseOwner/HouseOwnerPhoenix';
import { HouseOwnerNamibia } from '../../../models/phoneix/PhoenixNamibia/HouseOwner/HouseOwnerPhoenix';
import { HouseOwnerApiPhoenix } from '../../../models/phoneix/PhoenixZambia/HouseOwner/HouseOwnerApi';
import { HouseOwnerApiBotswana } from '../../../models/phoneix/PhoenixBotswana/HouseOwner/HouseOwnerApi';
import { HouseOwnerApiMozambique } from '../../../models/phoneix/PhoenixMozambique/HouseOwner/HouseOwnerApi';
import { HouseOwnerApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/HouseOwner/HouseOwnerApi';
import { HouseOwnerApiNamibia } from '../../../models/phoneix/PhoenixNamibia/HouseOwner/HouseOwnerApi';
import { FormGroup } from '@angular/forms';
import { HouseOwnerCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/HouseOwner/HouseOwnerApi';
@Component({
  selector: 'app-houseowners',
  standalone: false,
  templateUrl: './houseowners.component.html',
  styleUrls: ['./houseowners.component.scss']
})
export class HouseownersComponent implements OnInit {
  userType: any = null;
  productId: any = null;
  @Input() form: FormGroup; coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>(); @Output() saveSection = new EventEmitter<any>();
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  fieldHouseowner: any[] = [];
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  houseownerClaimCost: any[] = [];
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
      let contentData = null;
      if (this.insuranceId == "100046") contentData = new HouseOwnerCommercialPhoenix();
      else if (this.insuranceId == '100047') contentData = new HouseOwnerCommercialBotswana();
      else if (this.insuranceId == '100048') contentData = new HouseOwnerCommercialMozambique();
      else if (this.insuranceId == '100049') contentData = new HouseOwnerCommercialSwaziland();
      else if (this.insuranceId == '100050') contentData = new HouseOwnerCommercialNamibia();
      this.fieldHouseowner = contentData.policyfields1.fieldGroup;
    } else {
      if (this.insuranceId == '100046') contentData = new HouseOwnerPhoenix();
      else if (this.insuranceId == '100047') contentData = new HouseOwnerBotswana();
      else if (this.insuranceId == '100048') contentData = new HouseOwnerMozambique();
      else if (this.insuranceId == '100049') contentData = new HouseOwnerSwaziland();
      else if (this.insuranceId == '100050') contentData = new HouseOwnerNamibia();
      this.fieldHouseowner = contentData?.policyfields1.fieldGroup;
    }
    this.getPhoenixListItem();
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
          let houseownersApi = null, subDetails = this.locationDetails[i].SectionList;
          if (this.productId == '92') {
            if (this.insuranceId == "100046") houseownersApi = new HouseOwnerCommercialApiPhoenix();
            else if (this.insuranceId == '100047') houseownersApi = new HouseOwnerCommercialApiBotswana();
            else if (this.insuranceId == '100048') houseownersApi = new HouseOwnerCommercialApiMozambique();
            else if (this.insuranceId == '100049') houseownersApi = new HouseOwnerCommercialApiSwaziland();
            else if (this.insuranceId == '100050') houseownersApi = new HouseOwnerCommercialApiNamibia();
          }
          else {
            if (this.insuranceId == "100046") houseownersApi = new HouseOwnerApiPhoenix();
            else if (this.insuranceId == '100047') houseownersApi = new HouseOwnerApiBotswana();
            else if (this.insuranceId == '100048') houseownersApi = new HouseOwnerApiMozambique();
            else if (this.insuranceId == '100049') houseownersApi = new HouseOwnerApiSwaziland();
            else if (this.insuranceId == '100050') houseownersApi = new HouseOwnerApiNamibia();
          }
          obj = houseownersApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.BuildingSumInsuredFullcoverDesc = obj['BuildingSumInsuredFullcoverDesc'];
            this.productItem.BuildingSumInsuredFullcover = obj['BuildingSumInsuredFullcover'];
            this.productItem.AccidentalDamageToMachineryDesc = obj['AccidentalDamageToMachineryDesc'];
            this.productItem.AccidentalDamageToMachinery = obj['AccidentalDamageToMachinery'];
            this.productItem.SolarGeyserDesc = obj['SolarGeyserDesc'];
            this.productItem.SolarGeyser = obj['SolarGeyser'];
            this.productItem.InHouseGeyserDesc = obj['InHouseGeyserDesc'];
            this.productItem.InHouseGeyser = obj['InHouseGeyser'];
            this.productItem.PowersurgeDesc = obj['PowersurgeDesc'];
            this.productItem.Powersurge = obj['Powersurge'];
            this.productItem.SubsidenceAndLandslipDesc = obj['SubsidenceAndLandslipDesc'];
            this.productItem.SubsidenceAndLandslip = obj['SubsidenceAndLandslip'];
            this.productItem.NoClaimBonusDesc = obj['NoClaimBonusDesc'];
            this.productItem.NoClaimBonus = obj['NoClaimBonus'];
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
          if (
            loc['IndustryType'] && loc['BuildingSumInsuredFullcover'] &&
            loc['AccidentalDamageToMachinery'] && loc['NoClaimBonus']
          ) {
            this.productItem.BuildingSumInsuredFullcoverDesc = loc['BuildingSumInsuredFullcoverDesc'];
            this.productItem.BuildingSumInsuredFullcover = loc['BuildingSumInsuredFullcover'];
            this.productItem.AccidentalDamageToMachineryDesc = loc['AccidentalDamageToMachineryDesc'];
            this.productItem.AccidentalDamageToMachinery = loc['AccidentalDamageToMachinery'];
            this.productItem.SolarGeyserDesc = loc['SolarGeyserDesc'];
            this.productItem.SolarGeyser = loc['SolarGeyser'];
            this.productItem.InHouseGeyserDesc = loc['InHouseGeyserDesc'];
            this.productItem.InHouseGeyser = loc['InHouseGeyser'];
            this.productItem.PowersurgeDesc = loc['PowersurgeDesc'];
            this.productItem.Powersurge = loc['Powersurge'];
            this.productItem.SubsidenceAndLandslipDesc = loc['SubsidenceAndLandslipDesc'];
            this.productItem.SubsidenceAndLandslip = loc['SubsidenceAndLandslip'];
            this.productItem.NoClaimBonusDesc = loc['NoClaimBonusDesc'];
            this.productItem.NoClaimBonus = loc['NoClaimBonus'];
            this.productItem.IndustryId = loc['IndustryType']
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let houseownersApi = null, subDetails = this.locationDetails[i].SectionList;
              if (this.productId == '92') {
                if (this.insuranceId == "100046") houseownersApi = new HouseOwnerCommercialApiPhoenix();
                else if (this.insuranceId == '100047') houseownersApi = new HouseOwnerCommercialApiBotswana();
                else if (this.insuranceId == '100048') houseownersApi = new HouseOwnerCommercialApiMozambique();
                else if (this.insuranceId == '100049') houseownersApi = new HouseOwnerCommercialApiSwaziland();
                else if (this.insuranceId == '100050') houseownersApi = new HouseOwnerCommercialApiNamibia();
              }
              else {
                if (this.insuranceId == "100046") houseownersApi = new HouseOwnerApiPhoenix();
                else if (this.insuranceId == '100047') houseownersApi = new HouseOwnerApiBotswana();
                else if (this.insuranceId == '100048') houseownersApi = new HouseOwnerApiMozambique();
                else if (this.insuranceId == '100049') houseownersApi = new HouseOwnerApiSwaziland();
                else if (this.insuranceId == '100050') houseownersApi = new HouseOwnerApiNamibia();
              }
              loc = houseownersApi.getEditDetails(subDetails, loc);
                this.productItem.BuildingSumInsuredFullcoverDesc = loc['BuildingSumInsuredFullcoverDesc'];
                this.productItem.BuildingSumInsuredFullcover = loc['BuildingSumInsuredFullcover'];
                this.productItem.AccidentalDamageToMachineryDesc = loc['AccidentalDamageToMachineryDesc'];
                this.productItem.AccidentalDamageToMachinery = loc['AccidentalDamageToMachinery'];
                this.productItem.SolarGeyserDesc = loc['SolarGeyserDesc'];
                this.productItem.SolarGeyser = loc['SolarGeyser'];
                this.productItem.InHouseGeyserDesc = loc['InHouseGeyserDesc'];
                this.productItem.InHouseGeyser = loc['InHouseGeyser'];
                this.productItem.PowersurgeDesc = loc['PowersurgeDesc'];
                this.productItem.Powersurge = loc['Powersurge'];
                this.productItem.SubsidenceAndLandslipDesc = loc['SubsidenceAndLandslipDesc'];
                this.productItem.SubsidenceAndLandslip = loc['SubsidenceAndLandslip'];
                this.productItem.NoClaimBonusDesc = loc['NoClaimBonusDesc'];
                this.productItem.NoClaimBonus = loc['NoClaimBonus'];
                // this.productItem.IndustryId = loc['IndustryType'];
            }
          }
        }
        i += 1;
      }
    }
    console.log("loggg", this.productItem);
    console.log("Final Location", this.locationList)
  }
  getPhoenixListItem() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "NO_CLAIM_BONUS"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.houseownerClaimCost = defaultObj.concat(data.Result);
        for (let i = 0; i < this.houseownerClaimCost.length; i++) {
          this.houseownerClaimCost[i].label = this.houseownerClaimCost[i]['CodeDesc'];
          this.houseownerClaimCost[i].value = this.houseownerClaimCost[i]['Code'];
          if (i == this.houseownerClaimCost.length - 1) {
            if (this.productId == '92' || this.productId == '76') {
              let fieldCostClaim = this.fieldHouseowner;
              console.log('fieldCostClaim', fieldCostClaim);
              if (fieldCostClaim) {
                for (let field of fieldCostClaim) { if (field.key == 'NoClaimBonus') { field.props.options = this.houseownerClaimCost; } }
              }
            }
            else {
              let fieldLeakage = this.fieldHouseowner;
              for (let field of fieldLeakage) { if (field.key == 'NoClaimBonus') { field.props.options = this.houseownerClaimCost; } }
            }
          }
        }
      })
  }
  //Industry Change
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  onTextArea(event,name){
    this.productItem[name]=event?.target?.value;
  }
  onProceedData(type) {
    let locationList = [];
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
          console.log("Final ProductIem",this.productItem)
          entry['BuildingSumInsuredFullcoverDesc'] = this.productItem.BuildingSumInsuredFullcoverDesc;
          entry['BuildingSumInsuredFullcover'] = this.productItem.BuildingSumInsuredFullcover;
          entry['AccidentalDamageToMachineryDesc'] = this.productItem.AccidentalDamageToMachineryDesc;
          entry['AccidentalDamageToMachinery'] = this.productItem.AccidentalDamageToMachinery;
          entry['SolarGeyserDesc'] = this.productItem.SolarGeyserDesc;
          entry['SolarGeyser'] = this.productItem.SolarGeyser;
          entry['InHouseGeyserDesc'] = this.productItem.InHouseGeyserDesc;
          entry['InHouseGeyser'] = this.productItem.InHouseGeyser;
          entry['PowersurgeDesc'] = this.productItem.PowersurgeDesc;
          entry['Powersurge'] = this.productItem.Powersurge;
          entry['SubsidenceAndLandslip'] = this.productItem.SubsidenceAndLandslip;
          entry['NoClaimBonusDesc'] = this.productItem.NoClaimBonusDesc ?? '';
          entry['NoClaimBonus'] = this.productItem.NoClaimBonus;
        }
        let houseownersApi = null;
        if (this.productId == '92') {
          if (this.insuranceId == "100046") houseownersApi = new HouseOwnerCommercialApiPhoenix();
          else if (this.insuranceId == '100047') houseownersApi = new HouseOwnerCommercialApiBotswana();
          else if (this.insuranceId == '100048') houseownersApi = new HouseOwnerCommercialApiMozambique();
          else if (this.insuranceId == '100049') houseownersApi = new HouseOwnerCommercialApiSwaziland();
          else if (this.insuranceId == '100050') houseownersApi = new HouseOwnerCommercialApiNamibia();
        }
        else {
          if (this.insuranceId == "100046") houseownersApi = new HouseOwnerApiPhoenix();
          else if (this.insuranceId == '100047') houseownersApi = new HouseOwnerApiBotswana();
          else if (this.insuranceId == '100048') houseownersApi = new HouseOwnerApiMozambique();
          else if (this.insuranceId == '100049') houseownersApi = new HouseOwnerApiSwaziland();
          else if (this.insuranceId == '100050') houseownersApi = new HouseOwnerApiNamibia();
        }
        if (
          entry['NoClaimBonus'] || entry['BuildingSumInsuredFullcover'] || entry['AccidentalDamageToMachinery'] ||
          entry['Powersurge'] || entry['InHouseGeyser'] || entry['SubsidenceAndLandslip'] ||
          entry['SolarGeyser']
        ) { 
          let houseOwnerApilist: any = houseownersApi.getSaveDetails(entry, this.houseownerClaimCost, obj)
          if (houseOwnerApilist) { 
              let list =[];
              if(entry.SectionList) list = entry.SectionList.filter(ele=>ele.SectionId!='227');
                if(houseOwnerApilist.SectionList) houseOwnerApilist.SectionList = houseOwnerApilist.SectionList.concat(list)
                obj = houseOwnerApilist 
          }
          console.log("Final Obj",obj)
        }
        else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        locationList.push(obj);
        j += 1;
        if (j == this.locationList.length) {
          let res = {
            "locationList": locationList,
            "type": type
          }
          console.log("Final Object", res)
          if (type == 'packageData') {
            this.saveSection.emit(res);
          }
          else {
            this.finalProceed.emit(res)
          }
        }
      }
  }
  //this.finalProceed.emit(obj);
  skip() {
    this.skipSection.emit('House Owners');
  }
  previous() {
    this.previousSection.emit(true);
  }
  onKeyDown(event: KeyboardEvent, field) {
    const inputElement = event.target as HTMLInputElement;
    let maxLength = 0;
    maxLength = 19;
    if (inputElement.value.length >= maxLength) {
      event.preventDefault();
    }
  }
}
