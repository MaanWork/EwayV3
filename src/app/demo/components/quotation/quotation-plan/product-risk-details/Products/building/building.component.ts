import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../../app-config.json';
import { SharedService } from '@app/_services/shared.service';
import { BuildingCombinedCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/BuildingCombined/BuildingCombined';
import { BuildingCombinedCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/BuildingCombined/BuildingCombined';
import { BuildingCombinedCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/BuildingCombined/BuildingCombined';
import { BuildingCombinedCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/BuildingCombined/BuildingCombined';
import { BuildingCombinedCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/BuildingCombined/BuildingCombined';
import { ProductData } from '../../../models/product';
import { BuildingCombinedCommercialNamibiaApi } from '../../../models/namibia/CommercialPackagePlus/BuildingCombined/BuildingCombinedApi';
import { BuildingCombinedPhoenix } from '../../../models/phoneix/PhoenixZambia/BuildingCombined/BuildingCombined';
import { BuildingCombinedBotswana } from '../../../models/phoneix/PhoenixBotswana/BuildingCombined/BuildingCombined';
import { BuildingCombinedMozambique } from '../../../models/phoneix/PhoenixMozambique/BuildingCombined/BuildingCombined';
import { BuildingCombinedSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/BuildingCombined/BuildingCombined';
import { BuildingCombinedNamibia } from '../../../models/phoneix/PhoenixNamibia/BuildingCombined/BuildingCombined';
@Component({
  selector: 'app-building',
  standalone: false,
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent {
  primaryfields:any[]=[];groupedFields:any;endorsementSection:boolean=false;BIValue:any='N';EValue:any='N';
  showInterruptions:boolean=false;interruptionfields:any[]=[];showExtensionToggle:boolean=false;extensionfields:any[]=[];
  showExtensions:boolean=false;BIList = [{ Code: 'Y', CodeDesc: 'Yes' }, { Code: 'N', CodeDesc: 'No' }];extensionTablefields:any[]=[];
  coversreuired:any=null;userDetails:any=null;insuranceId:any=null;loginId:any=null;productId:any=null;userType:any=null;
  branchCode:any=null;agencyCode:any=null;countryId:any=null;brokerbranchCode:any=null;fields:any[]=[];
  @Input() form:FormGroup;@Input() productItem:any;@Input() locationList:any[]=[];@Input() tabIndex:any=null;@Input() industryTypeList:any[]=[];
   @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails:any[]=[];@Input() renderType:any=null;
   @Output() skipSection = new EventEmitter<any>();@Output() previousSection = new EventEmitter<any>();@Output() saveSection = new EventEmitter<any>();
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi; 
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    public motorApiUrl: any = this.AppConfig.MotorApiUrl;constructionTypes: any[]=[];
    Buildingprimaryfields: any[]=[];suppliersList: any[]=[];BuildingextensionTablefields: any[]=[];
    UtilitiesList: any[]=[];requestReferenceNo: any=null;phonixInfalation: any[]=[];fireLeakage: any[]=[];
    fireCoverList: any[]=[];Buildinginterruptionfields: any[]=[];
  finalizeYN: any=null;enableFieldsList: any[]=[];subuserType: any=null;IndustryError: boolean=false;
    constructor(private sharedService: SharedService,private fb: FormBuilder,){
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
          this.form = this.fb.group({
          });
          let fireData = null;
          if(this.productId=='92'){
              if (this.insuranceId == "100046") fireData = new BuildingCombinedCommercialPhoenix();
              else if (this.insuranceId == '100047') fireData = new BuildingCombinedCommercialBotswana();
              else if (this.insuranceId == '100048') fireData = new BuildingCombinedCommercialMozambique();
              else if (this.insuranceId == '100049') fireData = new BuildingCombinedCommercialSwaziland();
              else if (this.insuranceId == '100050') fireData = new BuildingCombinedCommercialNamibia();
          }
          else{
              if (this.insuranceId == '100046') fireData = new BuildingCombinedPhoenix();
              else if (this.insuranceId == '100047') fireData = new BuildingCombinedBotswana();
              else if (this.insuranceId == '100048') fireData = new BuildingCombinedMozambique();
              else if (this.insuranceId == '100049') fireData = new BuildingCombinedSwaziland();
              else if (this.insuranceId == '100050') fireData = new BuildingCombinedNamibia();
          }
          this.fields = fireData.policyfields.fieldGroup;
          this.primaryfields = fireData.primaryfields.fieldGroup;
          this.extensionfields = fireData.extensionfields.fieldGroup;
          this.extensionTablefields = fireData.extensionTablefields.fieldGroup;
          this.interruptionfields = fireData.interruptionfields.fieldGroup;
          let j = 0
          for (let field of this.fields) {
            if (field?.key) {
              this.form.addControl(field.key, new FormControl(''));
            }
            j += 1; if (j == this.fields.length) {
              this.productItem = new ProductData();
              this.addControlsToFormFire();
              this.setExtensions();
              this.setLeakageExtensionOptions();
              this.groupedFields = this.groupFields(this.fields);
              this.getConstructionTypeList();
              this.getPublicUtiltiesList();
              this.getInfalationPhonix();
              this.getCommonSuppliersList(); this.getLeakageFire();
              this.getIndeminityPhonix(); this.getCoverListFire()
            }
          }
    }
    ngOnInit(){
      if(this.locationList.length!=0){
        this.onEditData();
      }
    }
    onEditData(){
      console.log("Edit Location Details",this.locationDetails,this.locationList)
        if(this.renderType=='Direct'){
          let i=0;
          for(let obj of this.locationList){
              if(this.locationDetails[i]){
                let buildingcombinedApi = new BuildingCombinedCommercialNamibiaApi(),subDetails=this.locationDetails[i].SectionList;
                const buildingcombinedResult = buildingcombinedApi.getEditDetails(subDetails, obj, this.BIValue, this.EValue, this.showInterruptions, this.showExtensionToggle, this.showExtensions);
                if (buildingcombinedResult !== undefined) {
                  obj = buildingcombinedResult?.Obj; this.EValue = buildingcombinedResult?.EValue; this.BIValue = buildingcombinedResult?.BIValue;
                  this.showExtensionToggle = buildingcombinedResult?.showExtensionToggle; this.showExtensions = buildingcombinedResult?.showExtensions;
                  this.showInterruptions = buildingcombinedResult?.showInterruptions;
                  if(obj && this.tabIndex==i){
                      //setTimeout(() => {
                      if(obj?.IndustryType) this.productItem.IndustryId = obj['IndustryType'];

                      if (obj?.HouseAccidentalDamage) this.productItem.HouseAccidentalDamage = obj['HouseAccidentalDamage'];
                      if (obj?.HouseAccidentalDamageDesc) this.productItem.HouseAccidentalDamageDesc = obj['HouseAccidentalDamageDesc'];
                      if (obj?.fireBuildingSumInsuredBC) this.productItem.fireBuildingSumInsuredBC = obj['fireBuildingSumInsuredBC'];
                      if (obj?.ConstructionTypeBC) this.productItem.ConstructionTypeBC = obj['ConstructionTypeBC'];
                      if (obj?.AdditonalInflationBC) this.productItem.AdditonalInflationBC = obj['AdditonalInflationBC'];
                      if (obj?.IndeminityPeriodBC) this.productItem.IndeminityPeriodBC = obj['IndeminityPeriodBC'];
                      if (obj?.BISumInsuredBC) this.productItem.BISumInsuredBC = obj['BISumInsuredBC'];
                      if (obj?.CoverBC) this.productItem.CoverBC = obj['CoverBC'];
                      if (obj?.AccidentalDamageBC) this.productItem.AccidentalDamageBC = obj['AccidentalDamageBC'];
                      if (obj?.ClaimPreparationCostBC) this.productItem.ClaimPreparationCostBC = obj['ClaimPreparationCostBC'];
                      if (obj?.UnspecifiedSupplierBC) this.productItem.UnspecifiedSupplierBC = obj['UnspecifiedSupplierBC'];
                      if (obj?.PreventionofAccessBC) this.productItem.PreventionofAccessBC = obj['PreventionofAccessBC'];
                      if (obj?.PublicTelecommuncationSIBC) this.productItem.PublicTelecommuncationSIBC = this.CommaFormattedValue(obj['PublicTelecommuncationSIBC']);
                      if (obj?.PublicUtilitiesSIBC) this.productItem.PublicUtilitiesSIBC = this.CommaFormattedValue(obj['PublicUtilitiesSIBC']);
                      if (obj?.PublicUtilitiesBC) this.productItem.PublicUtilitiesBC = obj['PublicUtilitiesBC'];
                      if (obj?.PublicTelecommuncationBC) this.productItem.PublicTelecommuncationBC = obj['PublicTelecommuncationBC'];
                      if (obj?.CustomerSupplierSIBC) this.productItem.CustomerSupplierSIBC = this.CommaFormattedValue(obj['CustomerSupplierSIBC']);
                      if (obj?.CustomerSupplierBC) this.productItem.CustomerSupplierBC = obj['CustomerSupplierBC'];
                      if (obj?.GeyserSolarBC) this.productItem.GeyserSolarBC = this.CommaFormattedValue(obj['GeyserSolarBC']);
                      if (obj?.GeyserInhouseBC) this.productItem.GeyserInhouseBC = this.CommaFormattedValue(obj['GeyserInhouseBC']);
                      if (obj?.EscalationBC) this.productItem.EscalationBC = this.CommaFormattedValue(obj['EscalationBC']);
                      if (obj?.IndeminityPeriodBC) this.productItem.IndeminityPeriodBC = obj['IndeminityPeriodBC'];
                      if (obj?.CoverBC) this.productItem.CoverBC = obj['CoverBC'];
                      if (obj?.BISumInsuredBC) this.productItem.BISumInsuredBC = obj['BISumInsuredBC'];
                      if (obj?.GrossRentalsBC) this.productItem.GrossRentalsBC = obj['GrossRentalsBC'];
                      if (obj?.AccidentalDamageBC) this.productItem.AccidentalDamageBC = obj['AccidentalDamageBC'];
                      if (obj?.ClaimPreparationCostBC) this.productItem.ClaimPreparationCostBC = obj['ClaimPreparationCostBC'];
                      if (obj?.UnspecifiedSupplierBC) this.productItem.UnspecifiedSupplierBC = obj['UnspecifiedSupplierBC'];
                      
                    //}, 100)
                  }
                }
              }
            }
        }
        else{
        let i=0;
        for(let loc of this.locationList){
          if(loc['SectionList']){
              let buildingcombinedApi = new BuildingCombinedCommercialNamibiaApi(),subDetails=this.locationDetails[i].SectionList;
                const buildingcombinedResult = buildingcombinedApi.getEditDetails(subDetails, loc, this.BIValue, this.EValue, this.showInterruptions, this.showExtensionToggle, this.showExtensions);
                if (buildingcombinedResult !== undefined) {
                  loc = buildingcombinedResult?.Obj;
                  if(loc && this.tabIndex==i){
                      this.EValue = buildingcombinedResult?.EValue; this.BIValue = buildingcombinedResult?.BIValue;
                      this.showExtensionToggle = buildingcombinedResult?.showExtensionToggle; this.showExtensions = buildingcombinedResult?.showExtensions;
                      this.showInterruptions = buildingcombinedResult?.showInterruptions;
                      if (loc?.HouseAccidentalDamage) this.productItem.HouseAccidentalDamage = loc['HouseAccidentalDamage'];
                      if (loc?.HouseAccidentalDamageDesc) this.productItem.HouseAccidentalDamageDesc = loc['HouseAccidentalDamageDesc'];
                      if (loc?.fireBuildingSumInsuredBC) this.productItem.fireBuildingSumInsuredBC = loc['fireBuildingSumInsuredBC'];
                      if (loc?.ConstructionTypeBC) this.productItem.ConstructionTypeBC = loc['ConstructionTypeBC'];
                      if (loc?.AdditonalInflationBC) this.productItem.AdditonalInflationBC = loc['AdditonalInflationBC'];
                      if (loc?.IndeminityPeriodBC) this.productItem.IndeminityPeriodBC = loc['IndeminityPeriodBC'];
                      if (loc?.BISumInsuredBC) this.productItem.BISumInsuredBC = loc['BISumInsuredBC'];
                      if (loc?.CoverBC) this.productItem.CoverBC = loc['CoverBC'];
                      if (loc?.AccidentalDamageBC) this.productItem.AccidentalDamageBC = loc['AccidentalDamageBC'];
                      if (loc?.ClaimPreparationCostBC) this.productItem.ClaimPreparationCostBC = loc['ClaimPreparationCostBC'];
                      if (loc?.UnspecifiedSupplierBC) this.productItem.UnspecifiedSupplierBC = loc['UnspecifiedSupplierBC'];
                      if (loc?.PreventionofAccessBC) this.productItem.PreventionofAccessBC = this.CommaFormattedValue(loc['PreventionofAccessBC']);
                      if (loc?.PublicTelecommuncationSIBC) this.productItem.PublicTelecommuncationSIBC = this.CommaFormattedValue(loc['PublicTelecommuncationSIBC']);
                      if (loc?.PublicUtilitiesSIBC) this.productItem.PublicUtilitiesSIBC = this.CommaFormattedValue(loc['PublicUtilitiesSIBC']);
                      if (loc?.PublicUtilitiesBC) this.productItem.PublicUtilitiesBC = loc['PublicUtilitiesBC'];
                      if (loc?.PublicTelecommuncationBC) this.productItem.PublicTelecommuncationBC = loc['PublicTelecommuncationBC'];
                      if (loc?.CustomerSupplierSIBC) this.productItem.CustomerSupplierSIBC = this.CommaFormattedValue(loc['CustomerSupplierSIBC']);
                      if (loc?.CustomerSupplierBC) this.productItem.CustomerSupplierBC = loc['CustomerSupplierBC'];
                      if (loc?.GeyserSolarBC) this.productItem.GeyserSolarBC = this.CommaFormattedValue(loc['GeyserSolarBC']);
                      if (loc?.GeyserInhouseBC) this.productItem.GeyserInhouseBC = this.CommaFormattedValue(loc['GeyserInhouseBC']);
                      if (loc?.EscalationBC) this.productItem.EscalationBC = this.CommaFormattedValue(loc['EscalationBC']);
                      if (loc?.IndeminityPeriodBC) this.productItem.IndeminityPeriodBC = loc['IndeminityPeriodBC'];
                      if (loc?.CoverBC) this.productItem.CoverBC = loc['CoverBC'];
                      if (loc?.BISumInsuredBC) this.productItem.BISumInsuredBC = loc['BISumInsuredBC'];
                      if (loc?.GrossRentalsBC) this.productItem.GrossRentalsBC = loc['GrossRentalsBC'];
                      if (loc?.AccidentalDamageBC) this.productItem.AccidentalDamageBC = loc['AccidentalDamageBC'];
                      if (loc?.ClaimPreparationCostBC) this.productItem.ClaimPreparationCostBC = loc['ClaimPreparationCostBC'];
                      if (loc?.UnspecifiedSupplierBC) this.productItem.UnspecifiedSupplierBC = loc['UnspecifiedSupplierBC'];
                      if(loc?.IndustryType) this.productItem.IndustryId = loc['IndustryType'];
                  }
                }
              
          }
          i+=1;
        }
      }
    }
    CommaFormattedValue(data){
      if (data) data = String(data).replace(/[^0-9.]|(?<=\-..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return data
    }
     getCoverListFire() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ItemType": "COVER_DETAILS"
        }
        let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
            this.fireCoverList = defaultObj.concat(data.Result);
            for (let i = 0; i < this.fireCoverList.length; i++) {
              this.fireCoverList[i].label = this.fireCoverList[i]['CodeDesc'];
              this.fireCoverList[i].value = this.fireCoverList[i]['Code'];
              // delete this.roofMaterialList[i].CodeDesc;
              if (i == this.fireCoverList.length - 1) {
                let fields3 = this.interruptionfields[0]?.fieldGroup;
                if (fields3) { for (let field of fields3) { if (field.key == 'Cover' || field.key == 'CoverBC') { field.props.options = this.fireCoverList; } } }
                let fields4 = this.Buildinginterruptionfields[0]?.fieldGroup;
                if (fields4) { for (let field of fields4) { if (field.key == 'Cover' || field.key == 'CoverBC') { field.props.options = this.fireCoverList; } } }
              }
            }
          })
      }
      getIndeminityPhonix() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ItemType": "Indeminity_Period"
        }
        let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
            this.phonixInfalation = defaultObj.concat(data.Result);
            if (this.productId != '74') {
              for (let i = 0; i < this.phonixInfalation.length; i++) {
                this.phonixInfalation[i].label = this.phonixInfalation[i]['CodeDesc'];
                this.phonixInfalation[i].value = this.phonixInfalation[i]['Code'];
                // delete this.roofMaterialList[i].CodeDesc;
                if (i == this.phonixInfalation.length - 1) {
                  let fields3 = this.interruptionfields[0]?.fieldGroup
                  if (fields3) {
                    for (let field of fields3) {
                      if (field.key == 'IndeminityPeriod' || field.key == 'IndeminityPeriodBC') { field.props.options = this.phonixInfalation; }
                    }
                  }
                  let fields4 = this.Buildinginterruptionfields[0]?.fieldGroup
                  if (fields4) {
                    for (let field of fields4) {
                      if (field.key == 'IndeminityPeriod' || field.key == 'IndeminityPeriodBC') { field.props.options = this.phonixInfalation; }
                    }
                  }
                  //let fieldLeakage = this.fieldLeakage[0].fieldGroup[0].fieldGroup;
                  //  for(let field of fieldLeakage){
                  //   if(field.key=='FirstLossBasis'){
                  //     field.props.options = this.roofMaterialList;
                  //   }
                  //  }
                }
              }
            }
          })
      }
    getLeakageFire() {
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ItemType": "LEAKAGE_TYPE"
      }
      let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
          this.fireLeakage = defaultObj.concat(data.Result);
          for (let i = 0; i < this.fireLeakage.length; i++) {
            this.fireLeakage[i].label = this.fireLeakage[i]['CodeDesc'];
            this.fireLeakage[i].value = this.fireLeakage[i]['Code'];
            // delete this.roofMaterialList[i].CodeDesc;
            if (i == this.fireLeakage.length - 1) {
              if (this.productId == '67' || this.productId == '66' || this.productId == '92') {
                let fieldLeakage = this.groupedFields[7];
                console.log("Final Fields", fieldLeakage)
                if (fieldLeakage) {
                  for (let field of fieldLeakage) { if (field.key == 'leakageExtension') { field.props.options = this.fireLeakage; } }
                }
              }
              else {
                let fieldLeakage = this.primaryfields[0].fieldGroup;
                for (let field of fieldLeakage) { if (field.key == 'leakageExtension') { field.props.options = this.fireLeakage; } }
              }
            }
          }
        })
      console.log(this.primaryfields);
    }
    getInfalationPhonix() {
      if (this.productId != '74') {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ItemType": "ADDITIONAL_INFLATION"
        }
        let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
            this.phonixInfalation = defaultObj.concat(data.Result);
            for (let i = 0; i < this.phonixInfalation.length; i++) {
              this.phonixInfalation[i].label = this.phonixInfalation[i]['CodeDesc'];
              this.phonixInfalation[i].value = this.phonixInfalation[i]['Code'];
              // delete this.roofMaterialList[i].CodeDesc;
              if (i == this.phonixInfalation.length - 1) {
                let fields3 = this.groupedFields[0];
                if (fields3) {
                  for (let field of fields3) {
                    if (field.key == 'AdditonalInflation') { field.props.options = this.phonixInfalation; }
                  }
                }//let fieldLeakage = this.fieldLeakage[0].fieldGroup[0].fieldGroup;
                //  for(let field of fieldLeakage){
                //   if(field.key=='FirstLossBasis'){
                //     field.props.options = this.roofMaterialList;
                //   }
                //  }
              }
            }
          })
      }
    }
    getPublicUtiltiesList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "Public Telecommunications"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.UtilitiesList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.UtilitiesList.length; i++) {
          this.UtilitiesList[i].label = this.UtilitiesList[i]['CodeDesc'];
          this.UtilitiesList[i].value = this.UtilitiesList[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.UtilitiesList.length - 1) {
            if (this.productId == '66' || this.productId == '67' || this.productId == '92') {
              console.log("Extension Table Fields", this.extensionTablefields)
              let fieldLeakage = this.extensionTablefields;
              for (let field of fieldLeakage) { if (field.key == 'PublicTelecommuncation' || field.key == 'PublicTelecommuncationBC' || field.key == 'PublicUtilities' || field.key == 'PublicUtilitiesBC') { field.props.options = this.UtilitiesList; } }
            }
            if (this.productId == '92') {
              console.log("Extension Table Fields", this.extensionTablefields)
              let fieldLeakage = this.BuildingextensionTablefields;
              for (let field of fieldLeakage) { if (field.key == 'PublicTelecommuncation' || field.key == 'PublicTelecommuncationBC' || field.key == 'PublicUtilities' || field.key == 'PublicUtilitiesBC' || field.key == 'PreventionofAccessBC') { field.props.options = this.UtilitiesList; } }
            }
          }
        }
      })
  }
  getCommonSuppliersList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "CUSTOMER_SUPPILER_SUBCONTRACTORS"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.suppliersList = defaultObj.concat(data.Result);
        for (let i = 0; i < this.suppliersList.length; i++) {
          this.suppliersList[i].label = this.suppliersList[i]['CodeDesc'];
          this.suppliersList[i].value = this.suppliersList[i]['Code'];
          // delete this.roofMaterialList[i].CodeDesc;
          if (i == this.suppliersList.length - 1) {
            if (this.productId == '66' || this.productId == '67' || this.productId == '92') {
              let fieldLeakage = this.extensionTablefields;
              for (let field of fieldLeakage) { if (field.key == 'CustomerSupplier' || field.key == 'CustomerSupplierBC') { field.props.options = this.suppliersList; } }
            }
            if (this.productId == '92') {
              let fieldLeakage = this.BuildingextensionTablefields;
              for (let field of fieldLeakage) { if (field.key == 'CustomerSupplier' || field.key == 'CustomerSupplierBC') { field.props.options = this.suppliersList; } }
            }
          }
        }
      })
  }
    getConstructionTypeList() {
      let type = "wall_type";
      if (this.productId == '84') { type = "ERECTION ALL RISKS" }
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ItemType": type
      }
      let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
          this.constructionTypes = defaultObj.concat(data.Result);
          if (this.productId == '76' || this.productId == '78' || this.productId == '66' || this.productId == '67' || this.productId == '79' || this.productId == '84' || this.productId == '82' || this.productId == '83' || this.productId == '93' || this.productId == '85' || this.productId == '92') {
            let i = 0
            for (let entry of this.constructionTypes) {
              entry['label'] = entry.CodeDesc; entry['value'] = entry.Code;
              i += 1;
              if (i == this.constructionTypes.length) {
                let fieldList = [], fieldList4 = [];
                if (this.productId == '66' || this.productId == '67' || this.productId == '92') { fieldList = this.primaryfields[0].fieldGroup; }
                else if (this.productId == '92') {
                  fieldList = this.Buildingprimaryfields[0].fieldGroup;
                  fieldList4 = this.primaryfields[0].fieldGroup;
                }
                if (this.constructionTypes?.length > 0 && fieldList && this.productId != '93') {
                  for (let field of fieldList) {
                    if (field.key == 'CategoryId') {
                      field.templateOptions.options = [...this.constructionTypes];
                    } else if (field.key == 'ConstructionType' || field.key == 'ConstructionTypeBC' || field.key == 'EARConstructionType' || field.key == 'ContentsType') { field.props.options = this.constructionTypes; }
                  }
                  for (let field of fieldList4) {
                    if (field.key == 'CategoryId') {
                      field.templateOptions.options = [...this.constructionTypes];
                    } else if (field.key == 'ConstructionType' || field.key == 'ContentsType') { field.props.options = this.constructionTypes; }
                  }
                  //this.cdr.detectChanges();  
                }
              }
            }
          }
        });
    }
    private groupFields(fields: any[]): any[] {
      const grouped: any[] = [];
      const visibleFields = fields.filter(field => !field.hide);
      const newLineFields = ['IndemnityPeriod']; // Fields that must always start a new line
      let tempGroup: any[] = [];
      for (let i = 0; i < visibleFields.length; i++) {
        const field = visibleFields[i];
        if (newLineFields.includes(field.key)) {
          // Push any existing group before adding new-line field
          if (tempGroup.length > 0) {
            grouped.push(tempGroup);
            tempGroup = [];
          }
          grouped.push([field]); // Push IndemnityPeriod alone
        } else {
          // Pair fields together
          if (tempGroup.length === 0 || tempGroup.length === 1) {
            tempGroup.push(field);
          }
          if (tempGroup.length === 2) {
            grouped.push(tempGroup);
            tempGroup = [];
          }
        }
      }
      // Push remaining group if not empty
      if (tempGroup.length > 0) {
        grouped.push(tempGroup);
      }
      console.log(grouped);
      return grouped;
    }
    setExtensions() {
      const confirmField = this.fields.find(field => field.key === 'extensions');
      if (confirmField) {
        confirmField.props.options = [
          { value: 'N', label: 'No' },
          { value: 'Y', label: 'Yes' },
        ];
        confirmField.defaultValue = 'N';
      }
    }
    setLeakageExtensionOptions() {
      // Setting options dynamically for the leakageExtension field
      const leakageExtensionField = this.fields.find(field => field.key === 'leakageExtension');
      if (leakageExtensionField) {
        leakageExtensionField.props.options = [
        ];
      }
    }
    private addControlsToFormFire() {
      const addControls = (fields: any[]) => {
        fields.forEach((field) => {
          if (field?.key) {
            this.form.addControl(field.key, new FormControl(''));
          }
          if (field?.fieldGroup) {
            addControls(field.fieldGroup);
          }
        });
      };
      if (this.productId == '66' || this.productId == '92') addControls(this.extensionTablefields)
      if (this.productId == '66' || this.productId == '92') addControls(this.fields);
      addControls(this.primaryfields)
      if (this.productId == '66') addControls(this.extensionfields)
      if (this.productId == '67' || this.productId == '92') {
        addControls(this.extensionTablefields)
        addControls(this.primaryfields)
        addControls(this.extensionfields)
        addControls(this.interruptionfields)
        addControls(this.fields)
      }
    }
   change(type) {
      // console.log(event.target.innerText, type);
      if (this.BIValue == 'Y' && type == 'isConfirmed') {
        this.showInterruptions = true;
        this.showExtensionToggle = true;
      }
      else if (this.BIValue == 'N' && type == 'isConfirmed') {
        this.showExtensions = false;
        this.showInterruptions = false;
        this.showExtensionToggle = false;
      }
      else if (this.EValue == 'Y' && type == 'extensions') {
        this.showExtensions = true;
        this.showExtensionToggle = true;
      }
      else if (this.EValue == 'N' && type == 'extensions') this.showExtensions = false;
    }
    onProceedData(type){
        console.log("Locations",this.productItem)
       let i=0;
        if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
        else { this.IndustryError = false; }
        let locationList = [];
        if (i == 0) {let j=0;
        for (let entry of this.locationList) {
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
          if(j==this.tabIndex){
              if(this.productItem.GeyserInhouseBC!=null && this.productItem.GeyserInhouseBC!=undefined) entry['GeyserInhouseBC'] = this.productItem.GeyserInhouseBC;
              if(this.productItem.GeyserSolarBC!=null && this.productItem.GeyserSolarBC!=undefined) entry['GeyserSolarBC'] = this.productItem.GeyserSolarBC;
              if(this.productItem.EscalationBC!=null && this.productItem.EscalationBC!=undefined) entry['EscalationBC'] = this.productItem.EscalationBC;
              if(this.productItem.IndeminityPeriodBC!=null && this.productItem.IndeminityPeriodBC!=undefined) entry['IndeminityPeriodBC'] = this.productItem.IndeminityPeriodBC;
              if(this.productItem.CoverBC!=null && this.productItem.CoverBC!=undefined) entry['CoverBC'] = this.productItem.CoverBC
              if(this.productItem.BISumInsuredBC!=null && this.productItem.BISumInsuredBC!=undefined) entry['BISumInsuredBC'] = this.productItem.BISumInsuredBC
              if(this.productItem.GrossRentalsBC!=null && this.productItem.GrossRentalsBC!=undefined) entry['GrossRentalsBC'] = this.productItem.GrossRentalsBC
              if(this.productItem.AccidentalDamageBC!=null && this.productItem.AccidentalDamageBC!=undefined) entry['AccidentalDamageBC'] = this.productItem.AccidentalDamageBC;
              if(this.productItem.UnspecifiedSupplierBC!=null && this.productItem.UnspecifiedSupplierBC!=undefined) entry['UnspecifiedSupplierBC'] = this.productItem.UnspecifiedSupplierBC;
              if(this.productItem.ClaimPreparationCostBC!=null && this.productItem.ClaimPreparationCostBC!=undefined) entry['ClaimPreparationCostBC'] = this.productItem.ClaimPreparationCostBC;
              if(this.productItem.ConstructionTypeBC!=null && this.productItem.ConstructionTypeBC!=undefined) entry['ConstructionTypeBC'] = this.productItem.ConstructionTypeBC;
              if(this.productItem.fireBuildingSumInsuredBC!=null && this.productItem.fireBuildingSumInsuredBC!=undefined) entry['fireBuildingSumInsuredBC'] = this.productItem.fireBuildingSumInsuredBC;
              if(this.productItem.PublicTelecommuncationBC!=null && this.productItem.PublicTelecommuncationBC!=undefined) entry['PublicTelecommuncationBC'] = this.productItem.PublicTelecommuncationBC;
              if(this.productItem.PublicTelecommuncationSIBC!=null && this.productItem.PublicTelecommuncationSIBC!=undefined) entry['PublicTelecommuncationSIBC'] = this.productItem.PublicTelecommuncationSIBC;
              if(this.productItem.PublicUtilitiesBC!=null && this.productItem.PublicUtilitiesBC!=undefined) entry['PublicUtilitiesBC'] = this.productItem.PublicUtilitiesBC;
              if(this.productItem.PublicUtilitiesSIBC!=null && this.productItem.PublicUtilitiesSIBC!=undefined) entry['PublicUtilitiesSIBC'] = this.productItem.PublicUtilitiesSIBC;
              if(this.productItem.CustomerSupplierBC!=null && this.productItem.CustomerSupplierBC!=undefined) entry['CustomerSupplierBC'] = this.productItem.CustomerSupplierBC;
              if(this.productItem.CustomerSupplierSIBC!=null && this.productItem.CustomerSupplierSIBC!=undefined) entry['CustomerSupplierSIBC'] = this.productItem.CustomerSupplierSIBC;
              if(this.productItem.PreventionofAccessBC!=null && this.productItem.PreventionofAccessBC!=undefined) entry['PreventionofAccessBC'] = this.productItem.PreventionofAccessBC;
              entry['IndustryType']=this.productItem?.IndustryId;
          }
          if(entry['IndustryType']!=undefined){
              let buildingcombinedApi = new BuildingCombinedCommercialNamibiaApi();
              let buildingCombinedList: any = buildingcombinedApi.getSaveDetails(entry, entry.IndustryId, this.industryTypeList, obj)
              if (buildingCombinedList) { 
                  let list =[];
                  if(entry.SectionList) list = entry.SectionList.filter(ele=>ele.SectionId!='1');
                    if(buildingCombinedList.SectionList) buildingCombinedList.SectionList = buildingCombinedList.SectionList.concat(list)
                    obj = buildingCombinedList
              }
          }
          else if(entry.SectionList){obj.SectionList=entry['SectionList']}
           locationList.push(obj);
              j += 1;
              if (j == this.locationList.length) {
                let res={
                  "locationList":locationList,
                  "type":type
                }
                if (type == 'packageData') {
                  this.saveSection.emit(res);
                }
                else { this.finalProceed.emit(res) }
              }
        }
      }
   }
   checkDisable(fieldName) {
    this.finalizeYN = sessionStorage.getItem('FinalizeYN');
    if (this.endorsementSection) {
      let entry = this.enableFieldsList.some(ele => ele == fieldName);
      return !entry;
    }
    else if (this.subuserType == 'low') return this.finalizeYN == 'Y';
    else return false;
  }
  onKeyDown(event: KeyboardEvent, field) {
    const inputElement = event.target as HTMLInputElement;
    let maxLength = 0;
    maxLength = 19;
    if (inputElement.value.length >= maxLength) {
      event.preventDefault();
    }
  }
  CommaFormattedDynamic(event: KeyboardEvent, name: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      const numericValue = inputElement.value.replace(/[^0-9.]/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      inputElement.value = formattedValue;
      if (!name || !this.form.controls[name]) {
        return inputElement.value;
      }
      else this.form.controls[name].setValue(inputElement.value, { emitEvent: false });
    }
  }
  IndustryChanged() {
          this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  skip() {
    this.skipSection.emit('Building');
  }
  previous() {
    this.previousSection.emit(true);
  }
  onDynamicChange(event, field) {
        this.productItem[field] = event.value;
      }
}
