import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '@app/_services';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantAllRiskEngineeringNamibia } from '../../../models/namibia/EngineeringPackagePlus/PlantAllRisk/PlantAllRisk';
import { PlantAllRiskZambia } from '../../../models/phoneix/PhoenixZambia/PlantAllRisk/PlantAllRisk';
import { PlantAllRiskZambiaApi } from '../../../models/phoneix/PhoenixZambia/PlantAllRisk/PlantAllRiskApi';
import { PlantAllRiskEngineeringNamibiaApi } from '../../../models/namibia/EngineeringPackagePlus/PlantAllRisk/PlantAllRiskApi';

@Component({
  selector: 'app-plant-all-risk',
  templateUrl: './plant-all-risk.component.html',
  styleUrls: ['./plant-all-risk.component.css']
})
export class PlantAllRiskComponent implements OnInit {


  @Input() form: any; @Input() engineerData:any;coversreuired: any = null; insuranceId: any = null;
  @Input() productItem: any; userDetails: any = null; loginId: any = null; @Input() renderType: any = null;
  @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = [];productId:any=null;
  @Output() skipSection = new EventEmitter<any>();userType:any=null;
  @Output() previousSection = new EventEmitter<any>();
   @Input() IsPackage: boolean; branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null;
  IndustryError: boolean;
  plantAllRiskForm: FormGroup;
  fieldsPlantAllRisk: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public MarineApiUrl: any = this.AppConfig.MarineApi;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  plantAllClaimCost: any[] = [];

  constructor(private sharedService: SharedService,private fb: FormBuilder) {
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
    this.form = this.fb.group({});
  
  //   this.getClaimPreparationList();
  }

ngOnInit() {
    let contentData = null;
    if (this.insuranceId == '100046') contentData = new PlantAllRiskZambia();
    else if (this.insuranceId == '100050') contentData = new PlantAllRiskEngineeringNamibia();
    
    let engineerFieldGroup = contentData?.engineerfields || null;
    let mainFields = contentData?.fields?.fieldGroup || [];
    
    this.fieldsPlantAllRisk = [];
    
    if (engineerFieldGroup) {
        this.fieldsPlantAllRisk.push(engineerFieldGroup);
    }
    
    this.fieldsPlantAllRisk = [...this.fieldsPlantAllRisk, ...mainFields];
    
    if (this.locationList.length != 0) this.onEditData();
}

  onEditData() {
    
    if (this.renderType == 'Direct') {
      let i = 0;
      for (let obj of this.locationList) {
        if (this.locationDetails[i]) {
          let PlantAllriskApi = null, subDetails = this.locationDetails[i].SectionList;
          if (this.productId == '21') {

            if (this.insuranceId == '100046') PlantAllriskApi = new PlantAllRiskZambiaApi();
            else if (this.insuranceId == '100050') PlantAllriskApi = new PlantAllRiskEngineeringNamibiaApi();
          }
          obj = PlantAllriskApi.getEditDetails(subDetails, obj);
          if (obj && this.tabIndex == i) {
            this.productItem.PlantConstructionType = obj['PlantConstructionType'];
            this.productItem.BuildingCover = obj['BuildingCover'];
            this.productItem.Continuinghirecharges = obj['Continuinghirecharges'];
            this.productItem.Temporaryhire = obj['Temporaryhire'];
            this.productItem.PALPPmanufacturer = obj['PALPPmanufacturer'];
            this.productItem.PALPPDescription = obj['PALPPDescription'];
            this.productItem.PALPPLocationName = obj['PALPPLocationName'];
            this.productItem.PALPPmanufactureYear = obj['PALPPmanufactureYear'];
            this.productItem.PALPPEngineNumber = obj['PALPPEngineNumber'];
            this.productItem.PALPPSerialNumber = obj['PALPPSerialNumber'];
            this.productItem.PALPPOwnership = obj['PALPPOwnership'];
            this.productItem.PALPPBasisOfValuation = obj['PALPPBasisOfValuation'];
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
          
          if (loc['PlantConstructionType'] && loc['BuildingCover'] && loc['Continuinghirecharges'] && loc['Temporaryhire'] && loc['PALPPmanufacturer'] && loc['PALPPLocationName'] && loc['IndustryType']) {
            this.productItem.PlantConstructionType = loc['PlantConstructionType'];
            this.productItem.BuildingCover = loc['BuildingCover'];
            this.productItem.Continuinghirecharges = loc['Continuinghirecharges'];
            this.productItem.Temporaryhire = loc['Temporaryhire'];
            this.productItem.PALPPmanufacturer = loc['PALPPmanufacturer'];
            this.productItem.PALPPDescription = loc['PALPPDescription'];
            this.productItem.PALPPLocationName = loc['PALPPLocationName'];
            this.productItem.PALPPmanufactureYear = loc['PALPPmanufactureYear'];
            this.productItem.PALPPEngineNumber = loc['PALPPEngineNumber'];
            this.productItem.PALPPSerialNumber = loc['PALPPSerialNumber'];
            this.productItem.PALPPOwnership = loc['PALPPOwnership'];
            this.productItem.PALPPBasisOfValuation = loc['PALPPBasisOfValuation'];
            this.productItem.IndustryId = loc['IndustryType']
          }
          else if (loc.SectionList) {
            if (loc.SectionList.length != 0) {
              let PlantAllriskApi = null, subDetails = this.locationDetails[i].SectionList;
              if (this.insuranceId == '100046') PlantAllriskApi = new PlantAllRiskZambiaApi();

              else if (this.insuranceId == '100050') PlantAllriskApi = new PlantAllRiskEngineeringNamibiaApi();
              loc = PlantAllriskApi.getEditDetails(subDetails, loc);
              if (loc['PlantConstructionType'] && loc['BuildingCover'] && loc['Continuinghirecharges'] && loc['Temporaryhire'] && loc['PALPPmanufacturer'] && loc['PALPPLocationName'] && loc['IndustryType']) {
                this.productItem.PlantConstructionType = loc['PlantConstructionType'];
                this.productItem.BuildingCover = loc['BuildingCover'];
                this.productItem.Continuinghirecharges = loc['Continuinghirecharges'];
                this.productItem.Temporaryhire = loc['Temporaryhire'];
                this.productItem.PALPPmanufacturer = loc['PALPPmanufacturer'];
                this.productItem.PALPPDescription = loc['PALPPDescription'];
                this.productItem.PALPPLocationName = loc['PALPPLocationName'];
                this.productItem.PALPPmanufactureYear = loc['PALPPmanufactureYear'];
                this.productItem.PALPPEngineNumber = loc['PALPPEngineNumber'];
                this.productItem.PALPPSerialNumber = loc['PALPPSerialNumber'];
                this.productItem.PALPPOwnership = loc['PALPPOwnership'];
                this.productItem.PALPPBasisOfValuation = loc['PALPPBasisOfValuation'];
                this.productItem.IndustryId = loc['IndustryType']
              }
            }
          }
        }
        i += 1;
      }
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
        this.plantAllClaimCost = defaultObj.concat(data.Result);
        for (let i = 0; i < this.plantAllClaimCost.length; i++) {
          this.plantAllClaimCost[i].label = this.plantAllClaimCost[i]['CodeDesc'];
          this.plantAllClaimCost[i].value = this.plantAllClaimCost[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.plantAllClaimCost.length - 1) {
            if (this.productId == '92' || this.productId == '72') {
              let fieldCostClaim = this.fieldsPlantAllRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[3].fieldGroup;
           

              if (fieldCostClaim) {
                for (let field of fieldCostClaim) { if (field.key == 'PALPPLocationName') { field.props.options = this.plantAllClaimCost; } }
              }
            }
            else {
              let fieldLeakage = this.fieldsPlantAllRisk[0].fieldGroup;
              for (let field of fieldLeakage) { if (field.key == 'PALPPLocationName') { field.props.options = this.plantAllClaimCost; } }
            }
          }
        }
      })
  }


  onProceedData(type) {
let j = 0,locationList = [];
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
          entry['PlantConstructionType'] = this.productItem.PlantConstructionType;
          entry['BuildingCover'] = this.productItem.BuildingCover;
          entry['Continuinghirecharges'] = this.productItem.Continuinghirecharges;
          entry['Temporaryhire'] = this.productItem.Temporaryhire;
          entry['PALPPmanufacturer'] = this.productItem.PALPPmanufacturer;
          entry['PALPPDescription'] = this.productItem.PALPPDescription;
          entry['PALPPLocationName'] = this.productItem.PALPPLocationName;
          entry['PALPPmanufactureYear'] = this.productItem.PALPPmanufactureYear;
          entry['PALPPEngineNumber'] = this.productItem.PALPPEngineNumber;
          entry['PALPPSerialNumber'] = this.productItem.PALPPSerialNumber;
          entry['PALPPOwnership'] = this.productItem.PALPPOwnership;
          entry['PALPPBasisOfValuation'] = this.productItem.PALPPBasisOfValuation;

          entry['IndustryType'] = this.productItem.IndustryId;
        }
        let PlantAllriskApi = null;
        if (this.insuranceId == '100046') PlantAllriskApi = new PlantAllRiskZambiaApi();

        else if (this.insuranceId == '100050') PlantAllriskApi = new PlantAllRiskEngineeringNamibiaApi();

        if (entry['BuildingCover'] != undefined && entry['Temporaryhire'] != undefined && entry['PALPPDescription'] != undefined && entry['PALPPLocationName'] != undefined && entry['IndustryType'] != undefined) {
          let PlantAllRisklist = PlantAllriskApi.getSaveDetails(entry, this.plantAllClaimCost, this.industryTypeList, obj)
          if (PlantAllRisklist) { obj = PlantAllRisklist }
        }
        else if (entry.SectionList) { obj.SectionList = entry['SectionList'] }
         locationList.push(obj);
                j += 1;
                if (j == this.locationList.length) {
                    let res = { "locationList": locationList, "type": type }
                    this.finalProceed.emit(res)
      }
    }
  }
  
  //this.finalProceed.emit(obj);
   onDigitLimit(event: Event, num): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, num);
  }

  skip() {
    this.skipSection.emit(true);
  }
  previous() {
    this.previousSection.emit(true);
  }
}
