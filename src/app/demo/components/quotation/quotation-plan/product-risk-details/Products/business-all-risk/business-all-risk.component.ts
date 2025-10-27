import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { BusinessAllRiskPhoenix } from '../../../models/phoneix/PhoenixZambia/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskTanzaniya } from '../../../models/Tanzaniya/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskBotswana } from '../../../models/phoneix/PhoenixBotswana/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskApiBotswana } from '../../../models/phoneix/PhoenixBotswana/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskMozambique } from '../../../models/phoneix/PhoenixMozambique/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskApiMozambique } from '../../../models/phoneix/PhoenixMozambique/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskNamibia } from '../../../models/phoneix/PhoenixNamibia/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskApiNamibia } from '../../../models/phoneix/PhoenixNamibia/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskApiPhoenix } from '../../../models/phoneix/PhoenixZambia/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskApiTanzaniya } from '../../../models/Tanzaniya/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/BusinessAllRisk/BusinessAllRisk';
import { BusinessAllRiskCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskCommercialApiBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskCommercialApiMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskCommercialApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/BusinessAllRisk/BusinessAllRiskApi';
import { BusinessAllRiskCommercialApiPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/BusinessAllRisk/BusinessAllRiskApi';
@Component({
  selector: 'app-business-all-risk',
  standalone: false,
  templateUrl: './business-all-risk.component.html',
  styleUrls: ['./business-all-risk.component.scss']
})
export class BusinessAllRiskComponent implements OnInit {
  @Input() form: any;
  @Input() productItem: any;
  @Input() renderType: any = null;
  @Input() locationList: any[] = [];
  @Input() tabIndex: any = null;
  @Input() industryTypeList: any[] = [];
  @Input() locationDetails: any[] = [];
  @Input() IsPackage: boolean;
  @Output() saveSection = new EventEmitter<any>();
  @Output() finalProceed = new EventEmitter<any>();
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  coversreuired: any = null;
  insuranceId: any = null;
  userDetails: any = null;
  loginId: any = null;
  branchCode: any = null;
  agencyCode: any = null;
  countryId: any = null;
  brokerbranchCode: any = null;
  IndustryError: boolean;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  BusinessAllRiskClaimCost: any[] = [];
  productId: any;
  userType: any;
  fieldBusinessAllRisk: any[] = [];
  constructor(private sharedService: SharedService) {
    const homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || '{}');
    this.coversreuired = sessionStorage.getItem('coversRequired');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails') || '{}');
    if (this.userDetails?.Result) {
      this.insuranceId = this.userDetails.Result.InsuranceId;
      this.loginId = this.userDetails.Result.LoginId;
      this.productId = this.userDetails.Result.ProductId;
      this.userType = this.userDetails.Result.UserType;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.countryId = this.userDetails.Result.CountryId;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    }
    let businessallriskApi = null;
    if (this.productId == '92') {
      if (this.insuranceId == "100046") businessallriskApi = new BusinessAllRiskCommercialPhoenix();
      else if (this.insuranceId == '100047') businessallriskApi = new BusinessAllRiskCommercialBotswana();
      else if (this.insuranceId == '100048') businessallriskApi = new BusinessAllRiskCommercialMozambique();
      else if (this.insuranceId == '100049') businessallriskApi = new BusinessAllRiskCommercialSwaziland();
      else if (this.insuranceId == '100050') businessallriskApi = new BusinessAllRiskCommercialNamibia();
    }
    else {
      if (this.insuranceId == '100046') businessallriskApi = new BusinessAllRiskPhoenix();
      else if (this.insuranceId == '100002') businessallriskApi = new BusinessAllRiskTanzaniya();
      else if (this.insuranceId == '100047') businessallriskApi = new BusinessAllRiskBotswana();
      else if (this.insuranceId == '100048') businessallriskApi = new BusinessAllRiskMozambique();
      else if (this.insuranceId == '100049') businessallriskApi = new BusinessAllRiskSwaziland();
      else if (this.insuranceId == '100050') businessallriskApi = new BusinessAllRiskNamibia();
    }
    this.fieldBusinessAllRisk[0] = businessallriskApi?.fields;
    this.getClaimPreparationList();
  }
  ngOnInit() {
    if (this.locationList.length !== 0) {
      this.onEditData();
    }
  }
  onEditData() {
    console.log('Locations On Edit', this.locationList);
    if (this.renderType === 'Direct') {
      let i = 0;
      for (let obj of this.locationList) {
        if (this.locationDetails[i]) {
          let businessallriskApi = null;
          const subDetails = this.locationDetails[i].SectionList;
          if (this.productId == '92') {
            if (this.insuranceId == "100046") businessallriskApi = new BusinessAllRiskCommercialApiPhoenix();
            else if (this.insuranceId == '100047') businessallriskApi = new BusinessAllRiskCommercialApiBotswana();
            else if (this.insuranceId == '100048') businessallriskApi = new BusinessAllRiskCommercialApiMozambique();
            else if (this.insuranceId == '100049') businessallriskApi = new BusinessAllRiskCommercialApiSwaziland();
            else if (this.insuranceId == '100050') businessallriskApi = new BusinessAllRiskCommercialApiNamibia();
          } else {
            if (this.insuranceId == '100046') businessallriskApi = new BusinessAllRiskApiPhoenix();
            else if (this.insuranceId == '100002') businessallriskApi = new BusinessAllRiskApiTanzaniya();
            else if (this.insuranceId == '100047') businessallriskApi = new BusinessAllRiskApiBotswana();
            else if (this.insuranceId == '100048') businessallriskApi = new BusinessAllRiskApiMozambique();
            else if (this.insuranceId == '100049') businessallriskApi = new BusinessAllRiskApiSwaziland();
            else if (this.insuranceId == '100050') businessallriskApi = new BusinessAllRiskApiNamibia();
          }
          obj = businessallriskApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex === i) {
            this.productItem.ClothingAndPersonalEffectsPhoenixDesc = obj['ClothingAndPersonalEffectsPhoenixDesc'];
            this.productItem.ClothingAndPersonalEffectsPhoenix = obj['ClothingAndPersonalEffectsPhoenix'];
            this.productItem.ArticlesKeptOnPremisesPhoenixDesc = obj['ArticlesKeptOnPremisesPhoenixDesc'];
            this.productItem.ArticlesKeptOnPremisesPhoenix = obj['ArticlesKeptOnPremisesPhoenix'];
            this.productItem.ElectronicEquipmentPhoenixDesc = obj['ElectronicEquipmentPhoenixDesc'];
            this.productItem.ElectronicEquipmentPhoenix = obj['ElectronicEquipmentPhoenix'];
            this.productItem.CellularPhonesPhoenixDesc = obj['CellularPhonesPhoenixDesc'];
            this.productItem.CellularPhonesPhoenix = obj['CellularPhonesPhoenix'];
            this.productItem.CampingEquipmentPhoenixDesc = obj['CampingEquipmentPhoenixDesc'];
            this.productItem.CampingEquipmentPhoenix = obj['CampingEquipmentPhoenix'];
            this.productItem.SportingEquipmentPhoenixDesc = obj['SportingEquipmentPhoenixDesc'];
            this.productItem.SportingEquipmentPhoenix = obj['SportingEquipmentPhoenix'];
            this.productItem.JewelleryPhoenixDesc = obj['JewelleryPhoenixDesc'];
            this.productItem.JewelleryPhoenix = obj['JewelleryPhoenix'];
            this.productItem.IndustryId = obj['IndustryType'];
          }
          i += 1;
        }
      }
    } else {
      let i = 0;
      for (let loc of this.locationList) {
        if (loc && this.tabIndex === i) {
          if (
            loc['ClothingAndPersonalEffectsPhoenix'] !== undefined &&
            loc['CellularPhonesPhoenix'] !== undefined &&
            loc['IndustryType'] !== undefined
          ) {
            this.productItem.ClothingAndPersonalEffectsPhoenixDesc = loc['ClothingAndPersonalEffectsPhoenixDesc'];
            this.productItem.ClothingAndPersonalEffectsPhoenix = loc['ClothingAndPersonalEffectsPhoenix'];
            this.productItem.ArticlesKeptOnPremisesPhoenixDesc = loc['ArticlesKeptOnPremisesPhoenixDesc'];
            this.productItem.ArticlesKeptOnPremisesPhoenix = loc['ArticlesKeptOnPremisesPhoenix'];
            this.productItem.ElectronicEquipmentPhoenixDesc = loc['ElectronicEquipmentPhoenixDesc'];
            this.productItem.ElectronicEquipmentPhoenix = loc['ElectronicEquipmentPhoenix'];
            this.productItem.CellularPhonesPhoenixDesc = loc['CellularPhonesPhoenixDesc'];
            this.productItem.CellularPhonesPhoenix = loc['CellularPhonesPhoenix'];
            this.productItem.CampingEquipmentPhoenixDesc = loc['CampingEquipmentPhoenixDesc'];
            this.productItem.CampingEquipmentPhoenix = loc['CampingEquipmentPhoenix'];
            this.productItem.SportingEquipmentPhoenixDesc = loc['SportingEquipmentPhoenixDesc'];
            this.productItem.SportingEquipmentPhoenix = loc['SportingEquipmentPhoenix'];
            this.productItem.JewelleryPhoenixDesc = loc['JewelleryPhoenixDesc'];
            this.productItem.JewelleryPhoenix = loc['JewelleryPhoenix'];
            this.productItem.IndustryId = loc['IndustryType'];
          } else if (loc.SectionList && loc.SectionList.length !== 0) {
            let businessallriskApi = null;
            const subDetails = this.locationDetails[i]?.SectionList;
            if (this.productId == '92') {
              if (this.insuranceId == "100046") businessallriskApi = new BusinessAllRiskCommercialApiPhoenix();
              else if (this.insuranceId == '100047') businessallriskApi = new BusinessAllRiskCommercialApiBotswana();
              else if (this.insuranceId == '100048') businessallriskApi = new BusinessAllRiskCommercialApiMozambique();
              else if (this.insuranceId == '100049') businessallriskApi = new BusinessAllRiskCommercialApiSwaziland();
              else if (this.insuranceId == '100050') businessallriskApi = new BusinessAllRiskCommercialApiNamibia();
            } else {
              if (this.insuranceId == '100046') businessallriskApi = new BusinessAllRiskApiPhoenix();
              else if (this.insuranceId == '100002') businessallriskApi = new BusinessAllRiskApiTanzaniya();
              else if (this.insuranceId == '100047') businessallriskApi = new BusinessAllRiskApiBotswana();
              else if (this.insuranceId == '100048') businessallriskApi = new BusinessAllRiskApiMozambique();
              else if (this.insuranceId == '100049') businessallriskApi = new BusinessAllRiskApiSwaziland();
              else if (this.insuranceId == '100050') businessallriskApi = new BusinessAllRiskApiNamibia();
            }
            loc = businessallriskApi.getEditDetails(subDetails, loc);
            if (
              loc['ClothingAndPersonalEffectsPhoenix'] !== undefined &&
              loc['CellularPhonesPhoenix'] !== undefined &&
              loc['IndustryType'] !== undefined
            ) {
              this.productItem.ClothingAndPersonalEffectsPhoenixDesc = loc['ClothingAndPersonalEffectsPhoenixDesc'];
              this.productItem.ClothingAndPersonalEffectsPhoenix = loc['ClothingAndPersonalEffectsPhoenix'];
              this.productItem.ArticlesKeptOnPremisesPhoenixDesc = loc['ArticlesKeptOnPremisesPhoenixDesc'];
              this.productItem.ArticlesKeptOnPremisesPhoenix = loc['ArticlesKeptOnPremisesPhoenix'];
              this.productItem.ElectronicEquipmentPhoenixDesc = loc['ElectronicEquipmentPhoenixDesc'];
              this.productItem.ElectronicEquipmentPhoenix = loc['ElectronicEquipmentPhoenix'];
              this.productItem.CellularPhonesPhoenixDesc = loc['CellularPhonesPhoenixDesc'];
              this.productItem.CellularPhonesPhoenix = loc['CellularPhonesPhoenix'];
              this.productItem.CampingEquipmentPhoenixDesc = loc['CampingEquipmentPhoenixDesc'];
              this.productItem.CampingEquipmentPhoenix = loc['CampingEquipmentPhoenix'];
              this.productItem.SportingEquipmentPhoenixDesc = loc['SportingEquipmentPhoenixDesc'];
              this.productItem.SportingEquipmentPhoenix = loc['SportingEquipmentPhoenix'];
              this.productItem.JewelleryPhoenixDesc = loc['JewelleryPhoenixDesc'];
              this.productItem.JewelleryPhoenix = loc['JewelleryPhoenix'];
              this.productItem.IndustryId = loc['IndustryType'];
            }
          }
        }
        i += 1;
      }
    }
    console.log('Final Location', this.locationList);
  }
  getClaimPreparationList() {
    const ReqObj = {
      InsuranceId: this.insuranceId,
      ItemType: 'CLAIM_COST',
    };
    const urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
      const defaultObj = [{ CodeDesc: '-Select-', Code: null }];
      this.BusinessAllRiskClaimCost = defaultObj.concat(data.Result || []);
      for (let i = 0; i < this.BusinessAllRiskClaimCost.length; i++) {
        this.BusinessAllRiskClaimCost[i].label = this.BusinessAllRiskClaimCost[i]['CodeDesc'];
        this.BusinessAllRiskClaimCost[i].value = this.BusinessAllRiskClaimCost[i]['Code'];
      }
    });
  }
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  onProceedData(type: any) {
    console.log('Locations', this.locationList);
    let errorCount = 0;
    if (
      !this.productItem?.IndustryId ||
      this.productItem.IndustryId === '0'
    ) {
      this.IndustryError = true;
      errorCount++;
    } else {
      this.IndustryError = false;
    }
    if (errorCount === 0) {
      const locationList: any[] = [];
      this.locationList.forEach((entry, j) => {
        let obj: any = {
          LocationId: j + 1,
          LocationName: entry.LocationName,
          CoversRequired: entry.CoversRequired || 'BC',
          BuildingOwnerYn: entry.BuildingOwnerYn || 'Y',
          Address: entry.BuildingAddress,
          SectionList: [],
        };
        if (j === this.tabIndex) {
          entry['ClothingAndPersonalEffectsPhoenixDesc'] = this.productItem.ClothingAndPersonalEffectsPhoenixDesc;
          entry['ClothingAndPersonalEffectsPhoenix'] = this.productItem.ClothingAndPersonalEffectsPhoenix;
          entry['ArticlesKeptOnPremisesPhoenixDesc'] = this.productItem.ArticlesKeptOnPremisesPhoenixDesc;
          entry['ArticlesKeptOnPremisesPhoenix'] = this.productItem.ArticlesKeptOnPremisesPhoenix;
          entry['ElectronicEquipmentPhoenixDesc'] = this.productItem.ElectronicEquipmentPhoenixDesc;
          entry['ElectronicEquipmentPhoenix'] = this.productItem.ElectronicEquipmentPhoenix;
          entry['CellularPhonesPhoenixDesc'] = this.productItem.CellularPhonesPhoenixDesc;
          entry['CellularPhonesPhoenix'] = this.productItem.CellularPhonesPhoenix;
          entry['CampingEquipmentPhoenixDesc'] = this.productItem.CampingEquipmentPhoenixDesc;
          entry['CampingEquipmentPhoenix'] = this.productItem.CampingEquipmentPhoenix;
          entry['SportingEquipmentPhoenixDesc'] = this.productItem.SportingEquipmentPhoenixDesc;
          entry['SportingEquipmentPhoenix'] = this.productItem.SportingEquipmentPhoenix;
          entry['JewelleryPhoenixDesc'] = this.productItem.JewelleryPhoenixDesc;
          entry['JewelleryPhoenix'] = this.productItem.JewelleryPhoenix;
          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let businessallriskApi: any = null;
        if (this.productId == '92') {
          if (this.insuranceId == "100046") businessallriskApi = new BusinessAllRiskCommercialApiPhoenix();
          else if (this.insuranceId == '100047') businessallriskApi = new BusinessAllRiskCommercialApiBotswana();
          else if (this.insuranceId == '100048') businessallriskApi = new BusinessAllRiskCommercialApiMozambique();
          else if (this.insuranceId == '100049') businessallriskApi = new BusinessAllRiskCommercialApiSwaziland();
          else if (this.insuranceId == '100050') businessallriskApi = new BusinessAllRiskCommercialApiNamibia();
          if (entry['ClothingAndPersonalEffectsPhoenix'] != undefined && entry['IndustryType'] != undefined && entry['CellularPhonesPhoenix'] != undefined) {
            let businessallriskApiList: any = businessallriskApi.getSaveDetails(entry, this.productItem.IndustryId, this.industryTypeList, obj)
            if (businessallriskApiList) {
              let list = [];
              if (this.productId == '92') { if (entry.SectionList) { list = entry.SectionList.filter(ele => ele.SectionId != '223'); } }
              if (businessallriskApiList.SectionList) businessallriskApiList.SectionList = businessallriskApiList.SectionList.concat(list)
              obj = businessallriskApiList;
            }
          }
          else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        } else {
          if (this.insuranceId == '100046') businessallriskApi = new BusinessAllRiskApiPhoenix();
          else if (this.insuranceId == '100002') businessallriskApi = new BusinessAllRiskApiTanzaniya();
          else if (this.insuranceId == '100047') businessallriskApi = new BusinessAllRiskApiBotswana();
          else if (this.insuranceId == '100048') businessallriskApi = new BusinessAllRiskApiMozambique();
          else if (this.insuranceId == '100049') businessallriskApi = new BusinessAllRiskApiSwaziland();
          else if (this.insuranceId == '100050') businessallriskApi = new BusinessAllRiskApiNamibia();
          if (entry['ClothingAndPersonalEffectsPhoenix'] != undefined && entry['IndustryType'] != undefined && entry['CellularPhonesPhoenix'] != undefined) {
            let businessallriskApiList: any = businessallriskApi.getSaveDetails(entry, this.BusinessAllRiskClaimCost, this.industryTypeList, obj)
            if (businessallriskApiList) {
              let list = [];
              if (this.productId == '92') { if (entry.SectionList) { list = entry.SectionList.filter(ele => ele.SectionId != '223'); } }
              if (businessallriskApiList.SectionList) businessallriskApiList.SectionList = businessallriskApiList.SectionList.concat(list)
              obj = businessallriskApiList;
            }
          }
          else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
        }

        locationList.push(obj);
      });
      const res = {
        locationList,
        type,
      };
      if (type == 'packageData') {
        this.saveSection.emit(res);
      }
      else { this.finalProceed.emit(res) }
    }
  }
  skip() {
    this.skipSection.emit('Business All Risk');
  }
  previous() {
    this.previousSection.emit(true);
  }
}
