import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '@app/_services/shared.service';
import * as Mydatas from '../../../../../../../app-config.json';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HouseHoldersContentsCommercialApiPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/HouseHolders/HouseHolderApi';
import { HouseHoldersContentsCommercialApiBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/HouseHolders/HouseHolderApi';
import { HouseHoldersContentsCommercialApiMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/HouseHolders/HouseHolderApi';
import { HouseHoldersContentsApiSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/HouseHolders/HouseHolderApi';
import { HouseHoldersContentsCommercialApiNamibia } from '../../../models/namibia/CommercialPackagePlus/HouseHolders/HouseHolderApi';
import { FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
// import { FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { HouseHoldersCommercialPhoenix } from '../../../models/phoneix/PhoenixZambia/CommercialPackagePlus/HouseHolders/HouseHoldersPhoenix';
import { HouseHoldersCommercialNamibia } from '../../../models/namibia/CommercialPackagePlus/HouseHolders/HouseHoldersPhoenix';
import { HouseHoldersCommercialBotswana } from '../../../models/phoneix/PhoenixBotswana/CommercialPackagePlus/HouseHolders/HouseHoldersPhoenix';
import { HouseHoldersCommercialMozambique } from '../../../models/phoneix/PhoenixMozambique/CommercialPackagePlus/HouseHolders/HouseHoldersPhoenix';
import { HouseHoldersCommercialSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/CommercialPackagePlus/HouseHolders/HouseHoldersPhoenix';
import { RepeatService } from '../../../Riskpage/repeat.service';
import { HouseHoldersContentsApiBotswana } from '../../../models/phoneix/PhoenixBotswana/HouseHolders/HouseHolderApi';
import { HouseHoldersContentsApiMozambique } from '../../../models/phoneix/PhoenixMozambique/HouseHolders/HouseHolderApi';
import { HouseHoldersContentsApiNamibia } from '../../../models/phoneix/PhoenixNamibia/HouseHolders/HouseHolderApi';
import { HouseHoldersContentsApiPhoenix } from '../../../models/phoneix/PhoenixZambia/HouseHolders/HouseHolderApi';
import { HouseHoldersNamibia } from '../../../models/phoneix/PhoenixNamibia/HouseHolders/HouseHoldersPhoenix';
import { HouseHoldersPhoenix } from '../../../models/phoneix/PhoenixZambia/HouseHolders/HouseHoldersPhoenix';
import { HouseHoldersBotswana } from '../../../models/phoneix/PhoenixBotswana/HouseHolders/HouseHoldersPhoenix';
import { HouseHoldersMozambique } from '../../../models/phoneix/PhoenixMozambique/HouseHolders/HouseHoldersPhoenix';
import { HouseHoldersSwaziland } from '../../../models/phoneix/PhoenixSwazilnd/HouseHolders/HouseHoldersPhoenix';
@Component({
  selector: 'app-house-holders',
  templateUrl: './house-holders.component.html',
  styleUrls: ['./house-holders.component.scss']
})
export class HouseHoldersComponent implements OnInit {
  coversreuired: any = null; userDetails: any = null; insuranceId: any = null; loginId: any = null; productId: any = null; userType: any = null;
  branchCode: any = null; agencyCode: any = null; countryId: any = null; brokerbranchCode: any = null; fields: any[] = [];
  @Input() form: FormGroup; @Input() productItem: any; @Input() locationList: any[] = []; @Input() tabIndex: any = null; @Input() industryTypeList: any[] = [];
  @Output() finalProceed = new EventEmitter<any>(); @Input() locationDetails: any[] = []; @Input() renderType: any = null;
  @Output() skipSection = new EventEmitter<any>();
  @Output() previousSection = new EventEmitter<any>();
  @Output() saveSection = new EventEmitter<any>();
  public AppConfig: any = (Mydatas as any).default; houseHolderContentForm: FormGroup; IndustryError: boolean = false;
  public ApiUrl1: any = this.AppConfig.ApiUrl1; endorsementSection: boolean = false;countryList:any[]=[];
  public MarineApiUrl: any = this.AppConfig.MarineApi;fieldPlant:any[]=[];fieldTrade:any
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;fieldContent:any[]=[];
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;uwQuestionList:any[]=[];fieldHouseHolderContents:any[]=[];
  occupationList: any; quoteNo: any = null;requestReferenceNo:any=null;phonixWallType:any[]=[];
  field1Build:any[]=[];fieldMiscellaneous:any[]=[];constructionTypes:any[]=[];fieldHouseHoldersPhoenix:any[]=[];
  fieldHouseHolders: any[] = [];
  constructor(private sharedService: SharedService, private fb: FormBuilder, private repeatService: RepeatService) {
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
    this.houseHolderContentForm = this.fb.group({ HHContents: this.fb.array([]) });
    this.requestReferenceNo = sessionStorage.getItem('quoteReferenceNo');
    let contentData4: any;
    if (this.productId == '92') {
      if (this.insuranceId == "100046") contentData4 = new HouseHoldersCommercialPhoenix();
      else if (this.insuranceId == '100047') contentData4 = new HouseHoldersCommercialBotswana();
      else if (this.insuranceId == '100048') contentData4 = new HouseHoldersCommercialMozambique();
      else if (this.insuranceId == '100049') contentData4 = new HouseHoldersCommercialSwaziland();
      else if (this.insuranceId == '100050') contentData4 = new HouseHoldersCommercialNamibia();
    }
    else {
      if (this.insuranceId == '100046') contentData4 = new HouseHoldersPhoenix();
      else if (this.insuranceId == '100047') contentData4 = new HouseHoldersBotswana();
      else if (this.insuranceId == '100048') contentData4 = new HouseHoldersMozambique();
      else if (this.insuranceId == '100049') contentData4 = new HouseHoldersSwaziland();
      else if (this.insuranceId == '100050') contentData4 = new HouseHoldersNamibia();
    }
    if (contentData4) this.fieldHouseHolders[0] = contentData4?.policyfields1;
    this.addHHContents()
    this.getOccupationEmployers();
    this.getCountryList();
    this.getUWDetails();
    this.getConstructionTypeList();
  }
  IndustryChanged() {
    this.locationList[this.tabIndex].IndustryId = this.productItem.IndustryId;
  }
  ngOnInit() {
    if (this.locationList.length != 0) {
      this.onEditData();
    }
  }
  onEditData() {
    if (this.renderType == 'Direct') {
      let i = 0;
      for (let obj of this.locationList) {
        if (this.locationDetails[i]) {
          let householdersApi = null,
            subDetails = this.locationDetails[i].SectionList
          console.log("subdetails", subDetails);
          if (this.productId == '92') {
            if (this.insuranceId == '100046') householdersApi = new HouseHoldersContentsCommercialApiPhoenix();
            else if (this.insuranceId == '100047') householdersApi = new HouseHoldersContentsCommercialApiBotswana();
            else if (this.insuranceId == '100048') householdersApi = new HouseHoldersContentsCommercialApiMozambique();
            else if (this.insuranceId == '100049') householdersApi = new HouseHoldersContentsApiSwaziland();
            else if (this.insuranceId == '100050') householdersApi = new HouseHoldersContentsCommercialApiNamibia();
          }
          else {
            if (this.insuranceId == '100046') householdersApi = new HouseHoldersContentsApiPhoenix();
            else if (this.insuranceId == '100047') householdersApi = new HouseHoldersContentsApiBotswana();
            else if (this.insuranceId == '100048') householdersApi = new HouseHoldersContentsApiMozambique();
            else if (this.insuranceId == '100049') householdersApi = new HouseHoldersContentsApiSwaziland();
            else if (this.insuranceId == '100050') householdersApi = new HouseHoldersContentsApiNamibia();
          }
          obj = householdersApi.getEditDetails(subDetails, obj);
          console.log("apiResponse", obj);
          if (obj && this.tabIndex == i) {
            if(obj.contents[0]?.IndustryType){
            this.productItem.HouseAccidentalDamageDesc = obj['HouseAccidentalDamageDesc'];
            this.productItem.HouseAccidentalDamage = obj['HouseAccidentalDamage'];
            this.productItem.AccidentalDamageDesc = obj['AccidentalDamageDesc'];
            this.productItem.AccidentalDamage = obj['AccidentalDamage'];
            this.productItem.PowerSurgeDesc = obj['PowerSurgeDesc'];
            this.productItem.HHPowerSurge = obj['HHPowerSurge'];
            this.productItem.HolderTheftDesc = obj['HolderTheftDesc'];
            this.productItem.HHPowerSurge = obj['HHPowerSurge'];
            this.productItem.HolderTheft = obj['HolderTheft'];
            this.productItem.HolderBreakdownDesc = obj['HolderBreakdownDesc'];
            this.productItem.HolderBreakdown = obj['HolderBreakdown'];
            this.productItem.IndustryId = obj.contents[0].IndustryType;
            }
            if (obj.contents) {
              if (obj?.contents[0]?.IndustryId) this.productItem.IndustryId = obj?.contents[0]?.IndustryId
              console.log("objjj", obj.contents);
              console.log("objjjjSWWW", obj.IndustryType);
              const HHContentsArray = this.houseHolderContentForm.get('HHContents') as FormArray;
              console.log(HHContentsArray);
              HHContentsArray.clear();
              for (let i = 0; i < obj.contents.length; i++) {
                HHContentsArray.push(
                  this.fb.group({
                  HHContentType: obj.contents[i].ContentsType,
                  HHSumInsured: this.CommaFormattedValue(obj.contents[i].ContentInsured),
                  HHDescription: obj.contents[i].ContentDescription
                  })
                );
              }
            }
          }
        }
        i += 1;
      }
    }
    else {
      let i = 0;
      console.log("value settt", this.locationList);
      for (let obj of this.locationList) {
        if (obj && this.tabIndex == i) {
          if (obj.SectionList) {
            let householdersApi = null;
            if (this.productId == '92') {
              if (this.insuranceId == '100046') householdersApi = new HouseHoldersContentsCommercialApiPhoenix();
              else if (this.insuranceId == '100047') householdersApi = new HouseHoldersContentsCommercialApiBotswana();
              else if (this.insuranceId == '100048') householdersApi = new HouseHoldersContentsCommercialApiMozambique();
              else if (this.insuranceId == '100049') householdersApi = new HouseHoldersContentsApiSwaziland();
              else if (this.insuranceId == '100050') householdersApi = new HouseHoldersContentsCommercialApiNamibia();
            }
            else {
              if (this.insuranceId == '100046') householdersApi = new HouseHoldersContentsApiPhoenix();
              else if (this.insuranceId == '100047') householdersApi = new HouseHoldersContentsApiBotswana();
              else if (this.insuranceId == '100048') householdersApi = new HouseHoldersContentsApiMozambique();
              else if (this.insuranceId == '100049') householdersApi = new HouseHoldersContentsApiSwaziland();
              else if (this.insuranceId == '100050') householdersApi = new HouseHoldersContentsApiNamibia();
            }
            obj = householdersApi.getEditDetails(obj.SectionList, obj);
          }
          if(obj?.contents[0]?.IndustryType){
             this.productItem.HouseAccidentalDamageDesc = obj['HouseAccidentalDamageDesc'];
            this.productItem.HouseAccidentalDamage = obj['HouseAccidentalDamage'];
            this.productItem.AccidentalDamageDesc = obj['AccidentalDamageDesc'];
            this.productItem.AccidentalDamage = obj['AccidentalDamage'];
            this.productItem.PowerSurgeDesc = obj['PowerSurgeDesc'];
            this.productItem.HHPowerSurge = obj['HHPowerSurge'];
            this.productItem.HolderTheftDesc = obj['HolderTheftDesc'];
            this.productItem.HHPowerSurge = obj['HHPowerSurge'];
            this.productItem.HolderTheft = obj['HolderTheft'];
            this.productItem.HolderBreakdownDesc = obj['HolderBreakdownDesc'];
            this.productItem.HolderBreakdown = obj['HolderBreakdown'];
            this.productItem.IndustryId = obj['IndustryType']
          }
          if (obj?.contents) {
            // if (obj?.contents[0].IndustryType) this.productItem.IndustryId = obj?.contents[0]?.IndustryType
            console.log("frghjnhgf", obj.contents);
            const HHContentsArray = this.houseHolderContentForm.get('HHContents') as FormArray;
            HHContentsArray.clear();
            for (let i = 0; i < obj.contents.length; i++) {
              HHContentsArray.push(
                this.fb.group({
                  HHContentType: obj.contents[i].ContentsType,
                  HHSumInsured: this.CommaFormattedValue(obj.contents[i].ContentInsured),
                  HHDescription: obj.contents[i].ContentDescription
                })
              );
            }
          }
        }
        i += 1;
      }
    }
  }
  get HHContentsArray(): FormArray {
    return this.houseHolderContentForm.get('HHContents') as FormArray;
  }
  addHHContents() {
    const userGroup = this.fb.group({
      HHContentType: [''],
      HHSumInsured: [''],
      HHDescription: ['']
    });
    this.HHContentsArray.push(userGroup);
  }
  removeHHContents(index: number) {
    this.HHContentsArray.removeAt(index);
  }
  getOccupationEmployers() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId,
      "TitleType": 'I'
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
          // if(this.insuranceId=='100040' || this.insuranceId=='100042'){
          this.occupationList = defaultRow.concat(data.Result);
        }
      },
      (err) => { },
    );
  }
  getCountryList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.countryList = data.Result;
          let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
          this.countryList = defaultRow.concat(this.countryList);
        }
      });
  }
  getUWDetails() {
    let ReqObj = {
      "Limit": "0",
      "Offset": "100",
      "ProductId": this.productId,
      "LoginId": this.loginId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "SectionId": "99999"
    }
    let urlLink = `${this.CommonApiUrl}master/getactiveuwquestions`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          if (res.length != 0) {
            let i = 0;
            for (let ques of res) {
              if (ques['HiddenYN'] == undefined) ques['HiddenYN'] = 'N';
              if (ques.Options != null && ques.Options.length != 0) {
                let j = 0;
                for (let option of ques.Options) {
                  if (option.DependentYn == 'Y') {
                    let uwQues = this.uwQuestionList.find(ele => ele.UwQuestionId == option.DependentUnderwriterId);
                    if (uwQues) uwQues['HiddenYN'] = 'Y';
                  }
                  j += 1;
                  if (j == ques.Options.length) {
                    i += 1; if (i == res.length) {
                      let section = [], i = 0;
                      for (let entry of res) {
                        if (!section.some(ele => ele == entry.SectionId)) section.push(entry.SectionId);
                        i += 1;
                        if (i == res.length) {
                          let j = 0, finalList = [];
                          for (let obj of section) {
                            let subObj = {
                              "SectionId": obj,
                              "SectionName": res.find(ele => ele.SectionId == obj)?.SectionName,
                              "UWQuestionsList": res.filter(ele => ele.SectionId == obj)
                            }
                            finalList.push(subObj);
                            j += 1;
                            if (j == section.length) { this.uwQuestionList = finalList; this.getEditUwQuestions(); }
                          }
                        }
                      }
                    }
                    //this.getEditUwQuestions();
                  }
                }
              }
              else {
                i += 1; if (i == res.length) {
                  let section = [], i = 0;
                  for (let entry of res) {
                    if (!section.some(ele => ele == entry.SectionId)) section.push(entry.SectionId);
                    i += 1;
                    if (i == res.length) {
                      let j = 0, finalList = [];
                      for (let obj of section) {
                        let subObj = {
                          "SectionId": obj,
                          "SectionName": res.find(ele => ele.SectionId == obj)?.SectionName,
                          "UWQuestionsList": res.filter(ele => ele.SectionId == obj)
                        }
                        finalList.push(subObj);
                        j += 1;
                        if (j == section.length) { this.uwQuestionList = finalList; this.getEditUwQuestions(); }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        else {
        }
      },
      (err) => { },
    );
  }
  getConstructionTypePhonix() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "WALL_TYPE"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.phonixWallType = defaultObj.concat(data.Result);
        for (let i = 0; i < this.phonixWallType.length; i++) {
          this.phonixWallType[i].label = this.phonixWallType[i]['CodeDesc'];
          this.phonixWallType[i].value = this.phonixWallType[i]['Code'];
          if (i == this.phonixWallType.length - 1) {
            if (this.field1Build.length != 0) {
              let fields = this.field1Build[0].fieldGroup[0].fieldGroup;
              for (let field of fields) { if (field.key == 'WallType') { field.props.options = this.phonixWallType; console.log("Final Field Building", this.field1Build) } }
            }
            if (this.fieldContent.length != 0) {
              let fieldContent = this.fieldContent[0].fieldGroup[0].fieldGroup;
              for (let field of fieldContent) { if (field.key == 'ContentConstructionType') { field.props.options = this.phonixWallType; } }
            }
            if (this.fieldPlant.length != 0) {
              let fieldPlant = this.fieldPlant[0].fieldGroup[0].fieldGroup;
              for (let field of fieldPlant) { if (field.key == 'PlantConstructionType') { field.props.options = this.phonixWallType; } }
            }
            if (this.fieldTrade.length != 0) {
              let fieldTrade = this.fieldTrade[0].fieldGroup[0].fieldGroup;
              for (let field of fieldTrade) { if (field.key == 'TradeConstructionType') { field.props.options = this.phonixWallType; } }
            }
            if (this.fieldMiscellaneous.length != 0) {
              let fieldMiscellaneous = this.fieldMiscellaneous[0].fieldGroup[0].fieldGroup;
              for (let field of fieldMiscellaneous) { if (field.key == 'MiscellaneousConstructionType') { field.props.options = this.phonixWallType; } }
            }
          }
        }
      })
  }
  getEditUwQuestions() {
    throw new Error('Method not implemented.');
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
  onProceedData(type) {
    console.log("Final Location List", this.locationList)
    let i = 0;
    if (this.productItem?.IndustryId == '' || this.productItem?.IndustryId == null || this.productItem?.IndustryId == undefined || this.productItem?.IndustryId == '0') { i += 1; this.IndustryError = true; }
    else { this.IndustryError = false; }
    let locationList = [];
    if (i == 0 || type == 'Previous') {
      let j = 0;
      for (let entry of this.locationList) {
        if (entry.BuildingOwnerYn == null) entry.BuildingOwnerYn = 'Y';
        if (entry.CoversRequired == null) entry.CoversRequired = 'BC';
        let obj = {
          "LocationId": j + 1,
          "LocationName": entry.LocationName,
          "CoversRequired": entry.CoversRequired,
          "BuildingOwnerYn": entry.BuildingOwnerYn,
          "Address": entry.BuildingAddress,
          "BuildingAddress": entry.BuildingAddress,
          "SectionList": []
        }
        if (j == this.tabIndex) {
          entry['HHContents'] = this.houseHolderContentForm.value.HHContents;
          entry['IndustryType'] = this.productItem.IndustryId;
          entry['HouseAccidentalDamageDesc'] = this.productItem.HouseAccidentalDamageDesc;
          entry['HouseAccidentalDamage'] = this.productItem.HouseAccidentalDamage;
          entry['AccidentalDamageDesc'] = this.productItem.AccidentalDamageDesc;
          entry['AccidentalDamage'] = this.productItem.AccidentalDamage;
          entry['PowerSurgeDesc'] = this.productItem.PowerSurgeDesc
          entry['HHPowerSurge'] = this.productItem.HHPowerSurge;
          entry['HolderTheftDesc'] = this.productItem.HolderTheftDesc;
          entry['HolderTheft'] = this.productItem.HolderTheft;
          entry['HolderBreakdownDesc'] = this.productItem.HolderBreakdownDesc;
          entry['HolderBreakdown'] = this.productItem.HolderBreakdown;
        }
        if (entry['IndustryType'] != undefined) {
          let householdersApi = null;
          if (this.productId == '92') {
            if (this.insuranceId == '100046') householdersApi = new HouseHoldersContentsCommercialApiPhoenix();
            else if (this.insuranceId == '100047') householdersApi = new HouseHoldersContentsCommercialApiBotswana();
            else if (this.insuranceId == '100048') householdersApi = new HouseHoldersContentsCommercialApiMozambique();
            else if (this.insuranceId == '100049') householdersApi = new HouseHoldersContentsApiSwaziland();
            else if (this.insuranceId == '100050') householdersApi = new HouseHoldersContentsCommercialApiNamibia();
          }
          else {
            if (this.insuranceId == '100046') householdersApi = new HouseHoldersContentsApiPhoenix();
            else if (this.insuranceId == '100047') householdersApi = new HouseHoldersContentsApiBotswana();
            else if (this.insuranceId == '100048') householdersApi = new HouseHoldersContentsApiMozambique();
            else if (this.insuranceId == '100049') householdersApi = new HouseHoldersContentsApiSwaziland();
            else if (this.insuranceId == '100050') householdersApi = new HouseHoldersContentsApiNamibia();
          }
          let householderList: any = householdersApi.getSaveDetails(entry, this.constructionTypes, this.productItem.IndustryId, this.industryTypeList, obj, entry['HHContents'])
          if (householderList) { 
              let list =[];
              if(entry.SectionList) list = entry.SectionList.filter(ele=>ele.SectionId!='228');
                if(householderList.SectionList) householderList.SectionList = householderList.SectionList.concat(list)
                obj = householderList 
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
          console.log("Final Object", res);
          if (type == 'packageData') {
            this.saveSection.emit(res);
          }
          else {
            this.finalProceed.emit(res)
          }
        }
      }
    }
  }
  CommaFormattedValue(data) {
    if (data) data = String(data).replace(/[^0-9.]|(?<=\-..*)\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return data
  }
  skip() {
    this.skipSection.emit('House Holders');
  }
  previous() {
    this.previousSection.emit(true);
  }
  getConstructionTypeList() {
    let type = "wall_type";
    // if (this.productId == '84') { type = "ERECTION ALL RISKS" }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": type
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
        this.constructionTypes = defaultObj.concat(data.Result);
        let i = 0
        for (let entry of this.constructionTypes) {
          entry['label'] = entry.CodeDesc; entry['value'] = entry.Code;
          i += 1;
          if (i == this.constructionTypes.length) {
            let fieldList = [];
            if (this.productId == '78') fieldList = this.fieldHouseHoldersPhoenix[0]?.fieldGroup[0]?.fieldGroup;
            else fieldList = this.fieldHouseHolders[0]?.fieldGroup[0]?.fieldGroup;
            if (this.productId == '78' || this.productId == 78) fieldList = this.fieldHouseHolderContents[0]?.fieldArray?.fieldGroup[0].fieldGroup;
          }
        }
      });
  }
  addContent() {
    console.log('add content clicked');
    setTimeout(() => {
      this.repeatService.requestAdd();
    }, 100);
  }
}
