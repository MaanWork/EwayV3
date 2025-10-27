import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductData } from '../../../models/product';
import { FirePhoenix } from '../../../models/phoneix/PhoenixZambia/Fire';
import { FireBotswana } from '../../../models/phoneix/PhoenixBotswana/Fire/Fire';
import { FireMozambique } from '../../../models/phoneix/PhoenixMozambique/Fire/Fire';
import { FireSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/Fire/Fire';
import { FireNamibia } from '../../../models/phoneix/PhoenixNamibia/Fire/Fire';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '@app/_services/shared.service';
import { FireApiPhoenix } from '../../../models/phoneix/PhoenixZambia/Fire/FireApi';
import { FireBotswanaApi } from '../../../models/phoneix/PhoenixBotswana/Fire/FireApi';
import { FireMozambiqueApi } from '../../../models/phoneix/PhoenixMozambique/Fire/FireApi';
import { FireNamibiaApi } from '../../../models/phoneix/PhoenixNamibia/Fire/FireApi';
import { FireSwazilandApi } from '../../../models/phoneix/PhoenixSwazilnd/Fire/FireApi';
import { FireCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/Fire/Fire';
import { FireCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/Fire/Fire';
import { FireCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/Fire/Fire';
import { FireCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/Fire/Fire';
import { FireCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/Fire/Fire';
import { FireNamibiaCommercialApi } from '../../../models/namibia/CommercialPackagePlus/Fire/FireApi';
@Component({
  selector: 'app-fire',
  standalone: false,
  templateUrl: './fire.component.html',
  styleUrls: ['./fire.component.scss']
})
export class FireComponent {
    showInterruptions:boolean=false;showExtensionToggle:boolean=false;showExtensions:boolean=false;groupedFields:any[]=[];
    primaryfields:any[]=[];doublefields:any[]=[];BIList = [{ Code: 'Y', CodeDesc: 'Yes' }, { Code: 'N', CodeDesc: 'No' }];
    BIValue:any='N';EValue:any='N';extensionfields:any[]=[];extensionTablefields:any[]=[];interruptionfields:any[]=[];
    coversreuired:any=null;userDetails:any=null;insuranceId:any=null;loginId:any=null;productId:any=null;userType:any=null;
    branchCode:any=null;agencyCode:any=null;countryId:any=null;brokerbranchCode:any=null;fields:any[]=[];
    @Input() form:FormGroup;@Input() productItem:any;@Input() locationList:any[]=[];@Input() tabIndex:any=null;@Input() industryTypeList:any[]=[];
    @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails:any[]=[];@Input() renderType:any=null;
    @Output() skipSection = new EventEmitter<any>();
          @Output() previousSection = new EventEmitter<any>();
          @Output() saveSection = new EventEmitter<any>();
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public MarineApiUrl: any = this.AppConfig.MarineApi; 
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;IndustryError:boolean=false;
    public motorApiUrl: any = this.AppConfig.MotorApiUrl;BuildingextensionTablefields:any[]=[];
    constructionTypes:any[]=[];fireLeakage: any[]=[];UtilitiesList: any[]=[];suppliersList:any[]=[];
    phonixInfalation: any[]=[];fireCoverList: any[]=[];
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
      this.form = this.fb.group({});
      let fireData = null;
      if (this.productId == '92') {
        if (this.insuranceId == "100046") fireData = new FireCommercialPhoenix();
        else if (this.insuranceId == '100047') fireData = new FireCommercialBotswana();
        else if (this.insuranceId == '100048') fireData = new FireCommercialMozambique();
        else if (this.insuranceId == '100049') fireData = new FireCommercialSwaziland();
        else if (this.insuranceId == '100050') fireData = new FireCommercialNamibia();
      }
      else{
        if (this.insuranceId == '100046') fireData = new FirePhoenix();
        else if (this.insuranceId == '100047') fireData = new FireBotswana();
        else if (this.insuranceId == '100048') fireData = new FireMozambique();
        else if (this.insuranceId == '100049') fireData = new FireSwaziland();
        else if (this.insuranceId == '100050') fireData = new FireNamibia();
      }
      if(fireData){
          this.fields = fireData.policyfields.fieldGroup;
          this.primaryfields = fireData.primaryfields.fieldGroup;
          console.log("Primary Fields",this.primaryfields)
          this.extensionfields = fireData.extensionfields.fieldGroup;
          this.extensionTablefields = fireData.extensionTablefields.fieldGroup;
          this.interruptionfields = fireData.interruptionfields.fieldGroup;
          this.doublefields[0] = fireData.fields;
          this.productItem = new ProductData();
          this.addControlsToFormFire();this.setExtensions();
          this.setLeakageExtensionOptions();
          this.getLeakageFire();
          this.groupedFields = this.groupFields(this.fields);
          this.getConstructionTypeList();this.getCoverListFire();
          this.getPublicUtiltiesList();this.getIndeminityPhonix()
          this.getCommonSuppliersList();this.getInfalationPhonix();
      }
      console.log("Primary Fields",this.primaryfields,this.doublefields)
    }
    ngOnInit(){
      if(this.locationList.length!=0){
        this.onEditData();
      }
    }
    onEditData(){
        if(this.renderType=='Direct'){
          let i=0;
          for(let obj of this.locationList){
              if(this.locationDetails[i]){
                let fireApi = null,subDetails=this.locationDetails[i].SectionList;
                  if(this.productId=='92') fireApi = new FireNamibiaCommercialApi();
                  else{
                      if (this.insuranceId == '100046') fireApi = new FireApiPhoenix();
                      if (this.insuranceId == '100047') fireApi = new FireBotswanaApi();
                      if (this.insuranceId == '100048') fireApi = new FireMozambiqueApi();
                      if (this.insuranceId == '100049') fireApi = new FireSwazilandApi();
                      if (this.insuranceId == '100050') fireApi = new FireNamibiaApi();
                  }
                let finalObj = fireApi.getEditDetails(subDetails, obj, this.BIValue, this.EValue, this.showInterruptions, this.showExtensionToggle, this.showExtensions);
                if (finalObj) {
                  obj = finalObj?.Obj; this.EValue = finalObj?.EValue;
                  this.BIValue = finalObj?.BIValue; this.showExtensions = finalObj?.showExtensions;
                  this.showInterruptions = finalObj?.showInterruptions; this.showExtensionToggle = finalObj?.showExtensionToggle;
                  if(obj && this.tabIndex==i){
                      if (obj?.fireBuildingSumInsured) this.productItem.fireSumInsured = obj?.fireBuildingSumInsured;
                      if (obj?.AdditonalInflation) this.productItem.AdditonalInflation = obj?.AdditonalInflation;
                      if (obj?.firecontents != null && obj?.firecontents != "[object Object]" && obj?.firecontents != undefined && obj?.firecontents != '') this.productItem.firecontents = obj?.firecontents;
                      if(obj?.plantMachinery) this.productItem.plantMachinery = obj?.plantMachinery;
                      if (obj?.stockInTrade) this.productItem.stockInTrade = obj?.stockInTrade;
                      if (obj?.miscellaneous) this.productItem.miscellaneous = obj?.miscellaneous;
                      if (obj?.powerSurge) this.productItem.powerSurge = obj?.powerSurge;
                      if (obj?.hailDamage) this.productItem.hailDamage = obj?.hailDamage;
                      if (obj?.rentReceivable) this.productItem.rentReceivable = obj?.rentReceivable;
                      if (obj?.leakageExtension) this.productItem.leakageExtension = obj?.leakageExtension;
                      if (obj?.leakageExtensionSumInsured) this.productItem.leakageExtensionSumInsured = obj?.leakageExtensionSumInsured;
                      if (obj?.GeyserInhouse) this.productItem.GeyserInhouse = this.CommaFormattedValue(obj?.GeyserInhouse);
                      if (obj?.GeyserSolar) this.productItem.GeyserSolar = this.CommaFormattedValue(obj?.GeyserSolar);
                      if (obj?.PreventionofAccess) this.productItem.PreventionofAccess = this.CommaFormattedValue(obj?.PreventionofAccess);
                      if (obj?.PublicTelecommuncationSI) this.productItem.PublicTelecommuncationSI = this.CommaFormattedValue(obj?.PublicTelecommuncationSI);
                      if (obj?.PublicTelecommuncation) this.productItem.PublicTelecommuncation = obj?.PublicTelecommuncation;
                      if (obj?.PublicUtilitiesSI) this.productItem.PublicUtilitiesSI = this.CommaFormattedValue(obj?.PublicUtilitiesSI);
                      if (obj?.PublicUtilities) this.productItem.PublicUtilities = obj?.PublicUtilities;
                      if (obj?.CustomerSupplierSI) this.productItem.CustomerSupplierSI = this.CommaFormattedValue(obj?.CustomerSupplierSI);
                      if (obj?.CustomerSupplier) this.productItem.CustomerSupplier = obj?.CustomerSupplier;
                      if (obj?.ConstructionType) this.productItem.ConstructionType = obj?.ConstructionType;
                      if (obj?.IndeminityPeriod) this.productItem.IndeminityPeriod = obj?.IndeminityPeriod;
                      if (obj?.BISumInsured) this.productItem.BISumInsured = obj?.BISumInsured;
                      if (obj?.Cover) this.productItem.Cover = obj?.Cover;
                      if (obj?.AccidentalSumInsured) this.productItem.AccidentalSumInsured = obj?.AccidentalSumInsured;
                      if (obj?.ClaimPreparationCost) this.productItem.ClaimPreparationCost = obj?.ClaimPreparationCost;
                      if (obj?.UnspecifiedSupplier) this.productItem.UnspecifiedSupplier = obj?.UnspecifiedSupplier;
                      if (obj?.GrossRentals) this.productItem.GrossRentals = obj?.GrossRentals;
                      if (obj?.IndustryType) this.productItem.IndustryId = obj?.IndustryType;
                  }
                }
                i+=1;
              }
          }
          if(this.locationDetails.length!=0){
          }
        }
        else{
          let i=0;
          for(let loc of this.locationList){
            if(loc && this.tabIndex==i){
              console.log("On Next Loc",loc)
              if(loc['fireBuildingSumInsured']!=undefined || loc['AdditonalInflation']!=undefined || loc['firecontents']!=undefined || 
                loc['plantMachinery']!=undefined || loc['stockInTrade']!=undefined  || loc['miscellaneous']!=undefined  || loc['powerSurge']!=undefined || loc['hailDamage']!=undefined 
                || loc['rentReceivable']!=undefined || loc['leakageExtension']!=undefined  || loc['leakageExtensionSumInsured']!=undefined  || loc['GeyserInhouse']!=undefined || loc['GeyserSolar']!=undefined  ||
                loc['PreventionofAccess']!=undefined  || loc['PublicTelecommuncationSI']!=undefined || loc['PublicTelecommuncation']!=undefined  || loc['PublicUtilitiesSI']!=undefined  || loc['PublicUtilities']!=undefined 
                || loc['CustomerSupplierSI']!=undefined || loc['CustomerSupplier']!=undefined ){
                  setTimeout(() => {
                      if (loc?.fireBuildingSumInsured) this.productItem.fireSumInsured = loc?.fireBuildingSumInsured;
                      if (loc?.AdditonalInflation) this.productItem.AdditonalInflation = loc?.AdditonalInflation;
                      if (loc?.firecontents != null && loc?.firecontents != "[object Object]" && loc?.firecontents != undefined && loc?.firecontents != '') this.form.controls['firecontents'].setValue(loc?.firecontents);
                      if(loc?.plantMachinery) this.productItem.plantMachinery = loc?.plantMachinery;
                      if (loc?.stockInTrade) this.productItem.stockInTrade = loc?.stockInTrade;
                      if (loc?.miscellaneous) this.productItem.miscellaneous = loc?.miscellaneous;
                      if (loc?.powerSurge) this.productItem.powerSurge = loc?.powerSurge;
                      if (loc?.hailDamage) this.productItem.hailDamage = loc?.hailDamage;
                      if (loc?.rentReceivable) this.productItem.rentReceivable = loc?.rentReceivable;
                      if (loc?.leakageExtension) this.productItem.leakageExtension = loc?.leakageExtension;
                      if (loc?.leakageExtensionSumInsured) this.productItem.leakageExtensionSumInsured = loc?.leakageExtensionSumInsured;
                      if (loc?.GeyserInhouse) this.productItem.GeyserInhouse = this.CommaFormattedValue(loc?.GeyserInhouse);
                      if (loc?.GeyserSolar) this.productItem.GeyserSolar = this.CommaFormattedValue(loc?.GeyserSolar);
                      if (loc?.PreventionofAccess) this.productItem.PreventionofAccess = this.CommaFormattedValue(loc?.PreventionofAccess);
                      if (loc?.PublicTelecommuncationSI) this.productItem.PublicTelecommuncationSI = this.CommaFormattedValue(loc?.PublicTelecommuncationSI);
                      if (loc?.PublicTelecommuncation) this.productItem.PublicTelecommuncation = loc?.PublicTelecommuncation;
                      if (loc?.PublicUtilitiesSI) this.productItem.PublicUtilitiesSI = this.CommaFormattedValue(loc?.PublicUtilitiesSI);
                      if (loc?.PublicUtilities) this.productItem.PublicUtilities = loc?.PublicUtilities;
                      if (loc?.CustomerSupplierSI) this.productItem.CustomerSupplierSI = this.CommaFormattedValue(loc?.CustomerSupplierSI);
                      if (loc?.CustomerSupplier) this.productItem.CustomerSupplier = loc?.CustomerSupplier;
                      if (loc?.IndeminityPeriod) this.productItem.IndeminityPeriod = loc?.IndeminityPeriod;
                      if (loc?.BISumInsured) this.productItem.BISumInsured = loc?.BISumInsured;
                      if (loc?.Cover) this.productItem.Cover = loc?.Cover;
                      if (loc?.AccidentalSumInsured) this.productItem.AccidentalSumInsured = loc?.AccidentalSumInsured;
                      if (loc?.ClaimPreparationCost) this.productItem.ClaimPreparationCost = loc?.ClaimPreparationCost;
                      if (loc?.UnspecifiedSupplier) this.productItem.UnspecifiedSupplier = loc?.UnspecifiedSupplier;
                      if (loc?.GrossRentals) this.productItem.GrossRentals = loc?.GrossRentals;
                      if (loc?.IndustryType) this.productItem.IndustryId = loc?.IndustryType;
                    }, 500);
              }
              else if(loc.SectionList){
                if(loc.SectionList.length!=0){
                  let fireApi = new FireApiPhoenix(),subDetails=loc.SectionList;
                  let finalObj = fireApi.getEditDetails(subDetails, loc, this.BIValue, this.EValue, this.showInterruptions, this.showExtensionToggle, this.showExtensions);
                  if (finalObj) {
                    loc = finalObj;
                    if(loc['fireBuildingSumInsured']!=undefined || loc['AdditonalInflation']!=undefined || loc['firecontents']!=undefined || 
                      loc['plantMachinery']!=undefined || loc['stockInTrade']!=undefined  || loc['miscellaneous']!=undefined  || loc['powerSurge']!=undefined || loc['hailDamage']!=undefined 
                      || loc['rentReceivable']!=undefined || loc['leakageExtension']!=undefined  || loc['leakageExtensionSumInsured']!=undefined  || loc['GeyserInhouse']!=undefined || loc['GeyserSolar']!=undefined  ||
                      loc['PreventionofAccess']!=undefined  || loc['PublicTelecommuncationSI']!=undefined || loc['PublicTelecommuncation']!=undefined  || loc['PublicUtilitiesSI']!=undefined  || loc['PublicUtilities']!=undefined 
                      || loc['CustomerSupplierSI']!=undefined || loc['CustomerSupplier']!=undefined ){
                        setTimeout(() => {
                            if (loc?.fireBuildingSumInsured) this.productItem.fireSumInsured = loc?.fireBuildingSumInsured;
                            if (loc?.AdditonalInflation) this.productItem.AdditonalInflation = loc?.AdditonalInflation;
                            if (loc?.firecontents != null && loc?.firecontents != "[object Object]" && loc?.firecontents != undefined && loc?.firecontents != '') this.productItem.firecontents = loc?.firecontents;
                            if(loc?.plantMachinery) this.productItem.plantMachinery = loc?.plantMachinery;
                            if (loc?.stockInTrade) this.productItem.stockInTrade = loc?.stockInTrade;
                            if (loc?.miscellaneous) this.productItem.miscellaneous = loc?.miscellaneous;
                            if (loc?.powerSurge) this.productItem.powerSurge = loc?.powerSurge;
                            if (loc?.hailDamage) this.productItem.hailDamage = loc?.hailDamage;
                            if (loc?.rentReceivable) this.productItem.rentReceivable = loc?.rentReceivable;
                            if (loc?.leakageExtension) this.productItem.leakageExtension = loc?.leakageExtension;
                            if (loc?.leakageExtensionSumInsured) this.productItem.leakageExtensionSumInsured = loc?.leakageExtensionSumInsured;
                            if (loc?.GeyserInhouse) this.productItem.GeyserInhouse = this.CommaFormattedValue(loc?.GeyserInhouse);
                            if (loc?.GeyserSolar) this.productItem.GeyserSolar = this.CommaFormattedValue(loc?.GeyserSolar);
                            if (loc?.PreventionofAccess) this.productItem.PreventionofAccess = this.CommaFormattedValue(loc?.PreventionofAccess);
                            if (loc?.PublicTelecommuncationSI) this.productItem.PublicTelecommuncationSI = this.CommaFormattedValue(loc?.PublicTelecommuncationSI);
                            if (loc?.PublicTelecommuncation) this.productItem.PublicTelecommuncation = loc?.PublicTelecommuncation;
                            if (loc?.PublicUtilitiesSI) this.productItem.PublicUtilitiesSI = this.CommaFormattedValue(loc?.PublicUtilitiesSI);
                            if (loc?.PublicUtilities) this.productItem.PublicUtilities = loc?.PublicUtilities;
                            if (loc?.CustomerSupplierSI) this.productItem.CustomerSupplierSI = this.CommaFormattedValue(loc?.CustomerSupplierSI);
                            if (loc?.CustomerSupplier) this.productItem.CustomerSupplier = loc?.CustomerSupplier;
                            if (loc?.IndeminityPeriod) this.productItem.IndeminityPeriod = loc?.IndeminityPeriod;
                            if (loc?.BISumInsured) this.productItem.BISumInsured = loc?.BISumInsured;
                            if (loc?.Cover) this.productItem.Cover = loc?.Cover;
                            if (loc?.AccidentalSumInsured) this.productItem.AccidentalSumInsured = loc?.AccidentalSumInsured;
                            if (loc?.ClaimPreparationCost) this.productItem.ClaimPreparationCost = loc?.ClaimPreparationCost;
                            if (loc?.UnspecifiedSupplier) this.productItem.UnspecifiedSupplier = loc?.UnspecifiedSupplier;
                            if (loc?.GrossRentals) this.productItem.GrossRentals = loc?.GrossRentals;
                            if (loc?.IndustryType) this.productItem.IndustryId = loc?.IndustryType;
                          }, 500);
                    }
                  }
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
                    if (field.key == 'IndeminityPeriod') { field.props.options = this.phonixInfalation; }
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
            }
          }
        })
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
              if (i == this.phonixInfalation.length - 1) {
                let fields3 = this.groupedFields[0];
                if (fields3) {
                  for (let field of fields3) {
                    if (field.key == 'AdditonalInflation') { field.props.options = this.phonixInfalation; }
                  }
                }
              }
            }
          })
      }
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
              if (fields3) { for (let field of fields3) { if (field.key == 'Cover') { field.props.options = this.fireCoverList; } } }
            }
          }
        })
    }
    //Fire
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
                let fieldLeakage = this.groupedFields[5];
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
                if (this.productId == '66' || this.productId == '67' || this.productId=='92') { fieldList = this.primaryfields[0].fieldGroup; }
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
        console.log("Locations",this.locationList,this.productItem)
        let i=0;
        if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
        else { this.IndustryError = false; }
        let locationList = [];
        if (i == 0) {let j=0;
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
              if(j==this.tabIndex){
                if(this.productItem.contents!=null && this.productItem.contents!=undefined) entry['contents'] = String(this.productItem.contents).replaceAll(',', '');
                if(this.productItem.firecontents!=null && this.productItem.firecontents!=undefined) entry['firecontents'] = String(this.productItem.firecontents).replaceAll(',', '');
                if(this.productItem.plantMachinery!=null && this.productItem.plantMachinery!=undefined) entry['plantMachinery'] = String(this.productItem.plantMachinery).replaceAll(',', '');
                if(this.productItem.stockInTrade!=null && this.productItem.stockInTrade!=undefined) entry['stockInTrade'] = String(this.productItem.stockInTrade).replaceAll(',', '');
                if(this.productItem.miscellaneous!=null && this.productItem.miscellaneous!=undefined) entry['miscellaneous'] = String(this.productItem.miscellaneous).replaceAll(',', '');
                if(this.productItem.powerSurge!=null && this.productItem.powerSurge!=undefined) entry['powerSurge'] = String(this.productItem.powerSurge).replaceAll(',', '');
                if(this.productItem.hailDamage!=null && this.productItem.hailDamage!=undefined) entry['hailDamage'] = String(this.productItem.hailDamage).replaceAll(',', '');
                if(this.productItem.rentReceivable!=null && this.productItem.rentReceivable!=undefined) entry['rentReceivable'] = String(this.productItem.rentReceivable).replaceAll(',', '');
                if(this.productItem.GeyserInhouse!=null && this.productItem.GeyserInhouse!=undefined) entry['GeyserInhouse'] = String(this.productItem.GeyserInhouse).replaceAll(',', '');
                if(this.productItem.GeyserSolar!=null && this.productItem.GeyserSolar!=undefined) entry['GeyserSolar'] = String(this.productItem.GeyserSolar).replaceAll(',', '');
                if(this.productItem.leakageExtension!=null && this.productItem.leakageExtension!=undefined) entry['leakageExtension'] = String(this.productItem.leakageExtension).replaceAll(',', '');
                if(this.productItem.leakageExtensionSumInsured!=null && this.productItem.leakageExtensionSumInsured!=undefined) entry['leakageExtensionSumInsured'] = String(this.productItem.leakageExtensionSumInsured).replaceAll(',', '');
                if(this.productItem.IndeminityPeriod!=null && this.productItem.IndeminityPeriod!=undefined) entry['IndeminityPeriod'] = String(this.productItem.IndeminityPeriod).replaceAll(',', '');
                if(this.productItem.Cover!=null && this.productItem.Cover!=undefined) entry['Cover'] = String(this.productItem.Cover).replaceAll(',', '');
                if(this.productItem.BISumInsured!=null && this.productItem.BISumInsured!=undefined) entry['BISumInsured'] = String(this.productItem.BISumInsured).replaceAll(',', '');
                if(this.productItem.GrossRentals!=null && this.productItem.GrossRentals!=undefined) entry['GrossRentals'] = String(this.productItem.GrossRentals).replaceAll(',', '');
                if(this.productItem.AccidentalSumInsured!=null && this.productItem.AccidentalSumInsured!=undefined) entry['AccidentalSumInsured'] = String(this.productItem.AccidentalSumInsured).replaceAll(',', '');
                if(this.productItem.ClaimPreparationCost!=null && this.productItem.ClaimPreparationCost!=undefined) entry['ClaimPreparationCost'] = String(this.productItem.ClaimPreparationCost).replaceAll(',', '');
                if(this.productItem.UnspecifiedSupplier!=null && this.productItem.UnspecifiedSupplier!=undefined) entry['UnspecifiedSupplier'] = String(this.productItem.UnspecifiedSupplier).replaceAll(',', '');
                if(this.productItem.PublicTelecommuncation!=null && this.productItem.PublicTelecommuncation!=undefined) entry['PublicTelecommuncation'] = String(this.productItem.PublicTelecommuncation).replaceAll(',', '');
                if(this.productItem.PublicTelecommuncationSI!=null && this.productItem.PublicTelecommuncationSI!=undefined) entry['PublicTelecommuncationSI'] = String(this.productItem.PublicTelecommuncationSI).replaceAll(',', '');
                if(this.productItem.PublicUtilities!=null && this.productItem.PublicUtilities!=undefined) entry['PublicUtilities'] = String(this.productItem.PublicUtilities).replaceAll(',', '');
                if(this.productItem.PublicUtilitiesSI!=null && this.productItem.PublicUtilitiesSI!=undefined) entry['PublicUtilitiesSI'] =String(this.productItem.PublicUtilitiesSI).replaceAll(',', '');
                if(this.productItem.CustomerSupplier!=null && this.productItem.CustomerSupplier!=undefined) entry['CustomerSupplier'] = String(this.productItem.CustomerSupplier).replaceAll(',', '');
                if(this.productItem.CustomerSupplierSI!=null && this.productItem.CustomerSupplierSI!=undefined) entry['CustomerSupplierSI'] =String(this.productItem.CustomerSupplierSI).replaceAll(',', '');
                if(this.productItem.PreventionofAccess!=null && this.productItem.PreventionofAccess!=undefined) entry['PreventionofAccess'] = String(this.productItem.PreventionofAccess).replaceAll(',', '');
                if(this.productItem.ConstructionType!=null && this.productItem.ConstructionType!=undefined) entry['ConstructionType'] = this.productItem.ConstructionType;
                if(this.productItem.AdditonalInflation!=null && this.productItem.AdditonalInflation!=undefined) entry['AdditonalInflation'] = this.productItem.AdditonalInflation;
              if(this.productItem.fireSumInsured!=null && this.productItem.fireSumInsured!=undefined) entry['fireBuildingSumInsured'] = String(this.productItem.fireSumInsured).replaceAll(',', '');
               if(this.productItem.OfficePowerSurge!=null && this.productItem.OfficePowerSurge!=undefined) entry['OfficePowerSurge'] = String(this.productItem.OfficePowerSurge).replaceAll(',', '');
              if(this.productItem.plantMachineryDesc!=null && this.productItem.plantMachineryDesc!=undefined) entry['plantMachineryDesc'] = String(this.productItem.plantMachineryDesc).replaceAll(',', '');
              if(this.productItem.contentsDesc!=null && this.productItem.contentsDesc!=undefined) entry['contentsDesc'] = String(this.productItem.contentsDesc).replaceAll(',', '');
              if(this.productItem.stockInTradeDesc!=null && this.productItem.stockInTradeDesc!=undefined) entry['stockInTradeDesc'] = String(this.productItem.stockInTradeDesc).replaceAll(',', '');
              if(this.productItem.miscellaneousDesc!=null && this.productItem.miscellaneousDesc!=undefined) entry['miscellaneousDesc'] = String(this.productItem.miscellaneousDesc).replaceAll(',', '');
              if(this.productItem.powerSurgeDesc!=null && this.productItem.powerSurgeDesc!=undefined) entry['powerSurgeDesc'] = String(this.productItem.powerSurgeDesc).replaceAll(',', '');
              if(this.productItem.hailDamageDesc!=null && this.productItem.hailDamageDesc!=undefined) entry['hailDamageDesc'] = String(this.productItem.hailDamageDesc).replaceAll(',', '');
              if(this.productItem.leakageExtensionDesc!=null && this.productItem.leakageExtensionDesc!=undefined) entry['leakageExtensionDesc'] = this.productItem.leakageExtensionDesc;
              if(this.productItem.leakageExtensionSumInsuredDesc!=null && this.productItem.leakageExtensionSumInsuredDesc!=undefined) entry['leakageExtensionSumInsuredDesc'] = String(this.productItem.leakageExtensionSumInsuredDesc).replaceAll(',', '');
              if(this.productItem.rentReceivableDesc!=null && this.productItem.rentReceivableDesc!=undefined) entry['rentReceivableDesc'] = String(this.productItem.rentReceivableDesc).replaceAll(',', '');
              if(this.productItem.IndustryId!=null && this.productItem.IndustryId!=undefined) entry['IndustryType']= String(this.productItem.IndustryId).replaceAll(',', '');
              
              }
              if(entry['IndustryType']!=undefined){
                  let fireApi = null;
                  if(this.productId=='92') fireApi = new FireNamibiaCommercialApi();
                  else{
                      if (this.insuranceId == '100046') fireApi = new FireApiPhoenix();
                      if (this.insuranceId == '100047') fireApi = new FireBotswanaApi();
                      if (this.insuranceId == '100048') fireApi = new FireMozambiqueApi();
                      if (this.insuranceId == '100049') fireApi = new FireSwazilandApi();
                      if (this.insuranceId == '100050') fireApi = new FireNamibiaApi();
                  }
                  
                  let fireList: any = fireApi.getSaveDetails(entry, entry.IndustryType, this.industryTypeList, obj)
                  if (fireList) { 
                    let list =[];
                    if(entry.SectionList) list = entry.SectionList.filter(ele=>ele.SectionId!='4');
                    if(fireList.SectionList) fireList.SectionList = fireList.SectionList.concat(list)
                    obj = fireList
                  }
              }
              else if(entry.SectionList){obj.SectionList=entry['SectionList']}
              // if (obj.SectionList.length != 0) {
              // }
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
        //this.finalProceed.emit(obj);
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
            return inputElement.value;
          
        }
      }
      onDynamicChange(event, field) {
        this.productItem[field] = event.value;
      }
      IndustryChanged() {
          this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
      }
      skip() {

        this.skipSection.emit('Fire');
      }
      previous() {
        this.previousSection.emit('Fire');
      }
}
